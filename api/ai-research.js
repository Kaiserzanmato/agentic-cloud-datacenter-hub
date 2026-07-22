const COUNTRY_REGISTRY = [
  { id: 'USA', name: 'United States', region: 'North America', sovereignAiStatus: 'Active Strategy', dataCenterCapacityMW: 18500, gridReadinessScore: 82, activeProjectsCount: 142, enabled: true },
  { id: 'CAN', name: 'Canada', region: 'North America', sovereignAiStatus: 'Active Strategy', dataCenterCapacityMW: 1400, gridReadinessScore: 91, activeProjectsCount: 18, enabled: true },
  { id: 'MEX', name: 'Mexico', region: 'Latin America', sovereignAiStatus: 'Developing Policy', dataCenterCapacityMW: 620, gridReadinessScore: 68, activeProjectsCount: 12, enabled: true },
  { id: 'PHL', name: 'Philippines', region: 'Southeast Asia', sovereignAiStatus: 'Developing Policy', dataCenterCapacityMW: 450, gridReadinessScore: 71, activeProjectsCount: 16, enabled: true },
  { id: 'SGP', name: 'Singapore', region: 'Southeast Asia', sovereignAiStatus: 'Active Strategy', dataCenterCapacityMW: 1100, gridReadinessScore: 96, activeProjectsCount: 22, enabled: true },
  { id: 'MYS', name: 'Malaysia', region: 'Southeast Asia', sovereignAiStatus: 'Emerging Hub', dataCenterCapacityMW: 1350, gridReadinessScore: 84, activeProjectsCount: 28, enabled: true },
  { id: 'IDN', name: 'Indonesia', region: 'Southeast Asia', sovereignAiStatus: 'Developing Policy', dataCenterCapacityMW: 780, gridReadinessScore: 74, activeProjectsCount: 19, enabled: true },
  { id: 'VNM', name: 'Viet Nam', region: 'Southeast Asia', sovereignAiStatus: 'Emerging Hub', dataCenterCapacityMW: 310, gridReadinessScore: 69, activeProjectsCount: 9, enabled: true },
  { id: 'THA', name: 'Thailand', region: 'Southeast Asia', sovereignAiStatus: 'Developing Policy', dataCenterCapacityMW: 520, gridReadinessScore: 78, activeProjectsCount: 14, enabled: true },
  { id: 'JPN', name: 'Japan', region: 'East Asia', sovereignAiStatus: 'Active Strategy', dataCenterCapacityMW: 2900, gridReadinessScore: 92, activeProjectsCount: 38, enabled: true },
  { id: 'KOR', name: 'Korea, Republic of', region: 'East Asia', sovereignAiStatus: 'Active Strategy', dataCenterCapacityMW: 1650, gridReadinessScore: 94, activeProjectsCount: 26, enabled: true },
  { id: 'TWN', name: 'Taiwan', region: 'East Asia', sovereignAiStatus: 'Active Strategy', dataCenterCapacityMW: 980, gridReadinessScore: 88, activeProjectsCount: 21, enabled: true },
  { id: 'CHN', name: 'China', region: 'East Asia', sovereignAiStatus: 'Active Strategy', dataCenterCapacityMW: 14200, gridReadinessScore: 86, activeProjectsCount: 110, enabled: true },
  { id: 'DEU', name: 'Germany', region: 'Europe', sovereignAiStatus: 'Active Strategy', dataCenterCapacityMW: 2400, gridReadinessScore: 89, activeProjectsCount: 34, enabled: true },
  { id: 'GBR', name: 'United Kingdom', region: 'Europe', sovereignAiStatus: 'Active Strategy', dataCenterCapacityMW: 2150, gridReadinessScore: 87, activeProjectsCount: 31, enabled: true },
  { id: 'IRL', name: 'Ireland', region: 'Europe', sovereignAiStatus: 'Constrained', dataCenterCapacityMW: 1300, gridReadinessScore: 65, activeProjectsCount: 15, enabled: true },
  { id: 'FRA', name: 'France', region: 'Europe', sovereignAiStatus: 'Active Strategy', dataCenterCapacityMW: 1750, gridReadinessScore: 95, activeProjectsCount: 24, enabled: true },
  { id: 'NLD', name: 'Netherlands', region: 'Europe', sovereignAiStatus: 'Constrained', dataCenterCapacityMW: 1200, gridReadinessScore: 78, activeProjectsCount: 12, enabled: true },
  { id: 'NOR', name: 'Norway', region: 'Europe', sovereignAiStatus: 'Emerging Hub', dataCenterCapacityMW: 650, gridReadinessScore: 98, activeProjectsCount: 11, enabled: true },
  { id: 'ARE', name: 'United Arab Emirates', region: 'Middle East', sovereignAiStatus: 'Active Strategy', dataCenterCapacityMW: 920, gridReadinessScore: 93, activeProjectsCount: 23, enabled: true },
  { id: 'SAU', name: 'Saudi Arabia', region: 'Middle East', sovereignAiStatus: 'Active Strategy', dataCenterCapacityMW: 850, gridReadinessScore: 90, activeProjectsCount: 27, enabled: true },
  { id: 'IND', name: 'India', region: 'South Asia', sovereignAiStatus: 'Active Strategy', dataCenterCapacityMW: 1850, gridReadinessScore: 79, activeProjectsCount: 45, enabled: true },
  { id: 'BRA', name: 'Brazil', region: 'Latin America', sovereignAiStatus: 'Developing Policy', dataCenterCapacityMW: 980, gridReadinessScore: 81, activeProjectsCount: 17, enabled: true },
  { id: 'ZAF', name: 'South Africa', region: 'Africa', sovereignAiStatus: 'Emerging Hub', dataCenterCapacityMW: 420, gridReadinessScore: 62, activeProjectsCount: 8, enabled: true },
  { id: 'KEN', name: 'Kenya', region: 'Africa', sovereignAiStatus: 'Developing Policy', dataCenterCapacityMW: 190, gridReadinessScore: 73, activeProjectsCount: 5, enabled: true },
  { id: 'AUS', name: 'Australia', region: 'Oceania', sovereignAiStatus: 'Active Strategy', dataCenterCapacityMW: 1620, gridReadinessScore: 89, activeProjectsCount: 29, enabled: true },
];

const DEEPSEEK_URL = 'https://api.deepseek.com/chat/completions';
const DEEPSEEK_MODEL = 'deepseek-v4-flash';
const DATA_VERSION = 'country-registry-2026-07-22';
const MAX_QUESTION_LENGTH = 1200;
const VALID_TABS = new Set([
  'dashboard',
  'research',
  'map',
  'countries',
  'projects',
  'tech',
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

function getRegistrySnapshot(region) {
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

  return {
    countries,
    ranked,
    constrained,
    totalCapacity,
    totalProjects,
  };
}

function buildDeterministicAnswer({ question, tab, region }) {
  const { countries, ranked, constrained, totalCapacity, totalProjects } = getRegistrySnapshot(region);
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
    citations: getCitations(),
    context: getContext({ tab, region, countries, totalCapacity, totalProjects, model: 'registry-fallback' }),
  };
}

function getCitations() {
  return [
    {
      title: 'ISO country registry and data-center readiness dataset',
      source: 'src/data/countryRegistry.ts',
    },
    {
      title: 'AI research dashboard context',
      source: 'dashboard tab context and selected region filter',
    },
  ];
}

function getContext({ tab, region, countries, totalCapacity, totalProjects, model }) {
  return {
    tab,
    region,
    model,
    dataVersion: DATA_VERSION,
    countryCount: countries.length,
    totalCapacityMW: totalCapacity,
    activeProjectsCount: totalProjects,
  };
}

function parseModelJson(text) {
  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) return null;
    try {
      return JSON.parse(match[0]);
    } catch {
      return null;
    }
  }
}

function validateModelPayload(payload) {
  if (!payload || typeof payload.answer !== 'string') {
    return null;
  }

  return {
    answer: payload.answer.slice(0, 5000),
    citations: Array.isArray(payload.citations)
      ? payload.citations
          .filter(
            (citation) =>
              citation &&
              typeof citation.title === 'string' &&
              typeof citation.source === 'string',
          )
          .slice(0, 5)
      : getCitations(),
  };
}

async function callDeepSeek({ question, tab, region }) {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    return null;
  }

  const { countries, ranked, constrained, totalCapacity, totalProjects } = getRegistrySnapshot(region);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 18_000);

  try {
    const response = await fetch(DEEPSEEK_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: DEEPSEEK_MODEL,
        temperature: 0.2,
        max_tokens: 900,
        response_format: { type: 'json_object' },
        messages: [
          {
            role: 'system',
            content:
              'You are the Aethel Global AI Research Agent. Use only the supplied registry context. Do not invent live external facts. Return strict JSON with keys answer and citations. citations must be an array of {title, source}.',
          },
          {
            role: 'user',
            content: JSON.stringify({
              question,
              tab,
              region,
              modelAlignment: DEEPSEEK_MODEL,
              dataVersion: DATA_VERSION,
              registrySummary: {
                countryCount: countries.length,
                totalCapacityMW: totalCapacity,
                activeProjectsCount: totalProjects,
                topCapacityCountries: ranked,
                constrainedCountries: constrained,
              },
            }),
          },
        ],
      }),
    });

    if (!response.ok) {
      return null;
    }

    const completion = await response.json();
    const content = completion?.choices?.[0]?.message?.content;
    if (typeof content !== 'string') {
      return null;
    }

    const parsedPayload = validateModelPayload(parseModelJson(content));
    if (!parsedPayload) {
      return null;
    }

    return {
      ...parsedPayload,
      context: getContext({
        tab,
        region,
        countries,
        totalCapacity,
        totalProjects,
        model: DEEPSEEK_MODEL,
      }),
    };
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
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

    const modelAnswer = await callDeepSeek(payload);
    sendJson(response, 200, modelAnswer ?? buildDeterministicAnswer(payload));
  } catch (error) {
    sendJson(response, 500, {
      error: 'AI research request failed.',
      detail: error instanceof Error ? error.message : 'Unknown server error.',
    });
  }
}
