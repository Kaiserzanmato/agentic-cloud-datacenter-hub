import { COUNTRY_REGISTRY } from '../src/data/countryRegistry';

const MAX_QUESTION_LENGTH = 1200;
const VALID_TABS = new Set([
  'dashboard',
  'research',
  'map',
  'countries',
  'projects',
  'power',
  'audit',
  'export',
]);

function sendJson(response, statusCode, payload) {
  response.statusCode = statusCode;
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  response.setHeader('Cache-Control', 'no-store');
  response.end(JSON.stringify(payload));
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = '';
    request.on('data', (chunk) => {
      body += chunk;
      if (body.length > 16_384) {
        reject(new Error('Request body is too large.'));
        request.destroy();
      }
    });
    request.on('end', () => resolve(body));
    request.on('error', reject);
  });
}

function parsePayload(rawBody) {
  let payload;
  try {
    payload = rawBody ? JSON.parse(rawBody) : {};
  } catch {
    return { ok: false, status: 400, error: 'Request body must be valid JSON.' };
  }

  const question = typeof payload.question === 'string' ? payload.question.trim() : '';
  const tab = typeof payload.tab === 'string' ? payload.tab.trim() : 'dashboard';
  const region = typeof payload.region === 'string' ? payload.region.trim() : 'All Regions';

  if (!question) {
    return { ok: false, status: 400, error: 'question is required.' };
  }

  if (question.length > MAX_QUESTION_LENGTH) {
    return { ok: false, status: 400, error: `question must be ${MAX_QUESTION_LENGTH} characters or fewer.` };
  }

  if (!VALID_TABS.has(tab)) {
    return { ok: false, status: 400, error: 'tab is not supported.' };
  }

  return { ok: true, question, tab, region };
}

function selectCountries(region) {
  if (!region || region === 'All Regions') {
    return COUNTRY_REGISTRY.filter((country) => country.enabled);
  }

  return COUNTRY_REGISTRY.filter(
    (country) => country.enabled && country.region.toLowerCase() === region.toLowerCase(),
  );
}

function buildAnswer({ question, tab, region }) {
  const scopedCountries = selectCountries(region);
  const countries = scopedCountries.length > 0 ? scopedCountries : COUNTRY_REGISTRY.filter((country) => country.enabled);
  const ranked = [...countries]
    .sort((a, b) => {
      const capacityDelta = b.dataCenterCapacityMW - a.dataCenterCapacityMW;
      if (capacityDelta !== 0) return capacityDelta;
      return b.activeProjectsCount - a.activeProjectsCount;
    })
    .slice(0, 5);

  const constrained = countries
    .filter((country) => country.gridReadinessScore < 75 || country.sovereignAiStatus === 'Constrained')
    .sort((a, b) => a.gridReadinessScore - b.gridReadinessScore)
    .slice(0, 4);

  const totalCapacity = countries.reduce((sum, country) => sum + country.dataCenterCapacityMW, 0);
  const totalProjects = countries.reduce((sum, country) => sum + country.activeProjectsCount, 0);
  const topList = ranked
    .map(
      (country, index) =>
        `${index + 1}. ${country.name} (${country.region}) - ${country.dataCenterCapacityMW.toLocaleString()} MW, ${country.activeProjectsCount} active projects, grid readiness ${country.gridReadinessScore}/100`,
    )
    .join('\n');
  const riskList = constrained.length
    ? constrained
        .map(
          (country) =>
            `- ${country.name}: ${country.sovereignAiStatus}; grid readiness ${country.gridReadinessScore}/100`,
        )
        .join('\n')
    : '- No low-grid-readiness countries in the selected scope.';

  return {
    answer:
      `For ${region || 'All Regions'} on the ${tab} view, the closest attention should go to markets where capacity, active project count, and grid readiness pressure intersect. The current registry scope covers ${countries.length} countries, ${totalCapacity.toLocaleString()} MW of data-center capacity, and ${totalProjects} active projects.\n\n` +
      `Priority watchlist:\n${topList}\n\n` +
      `Infrastructure and policy pressure points:\n${riskList}\n\n` +
      `Interpretation for the question "${question}": prioritize the highest-capacity hubs for investment monitoring, then cross-check constrained or lower-grid-readiness countries before making deployment, sourcing, or policy decisions. Treat this as platform intelligence, not external live research.`,
    citations: [
      {
        title: 'ISO country registry and data-center readiness dataset',
        source: 'src/data/countryRegistry.ts',
      },
      {
        title: 'AI research dashboard context',
        source: 'dashboard tab context and selected region filter',
      },
    ],
    context: {
      tab,
      region,
      countryCount: countries.length,
      totalCapacityMW: totalCapacity,
      activeProjectsCount: totalProjects,
    },
  };
}

export default async function handler(request, response) {
  if (request.method === 'OPTIONS') {
    response.statusCode = 204;
    response.end();
    return;
  }

  if (request.method !== 'POST') {
    sendJson(response, 405, { error: 'Method not allowed. Use POST.' });
    return;
  }

  try {
    const rawBody = await readBody(request);
    const payload = parsePayload(rawBody);

    if (!payload.ok) {
      sendJson(response, payload.status, { error: payload.error });
      return;
    }

    sendJson(response, 200, buildAnswer(payload));
  } catch (error) {
    sendJson(response, 500, {
      error: 'AI research request failed.',
      detail: error instanceof Error ? error.message : 'Unknown server error.',
    });
  }
}
