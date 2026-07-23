import { useMemo, useState } from 'react';
import { Bot, Loader2, RotateCcw, Send, X } from 'lucide-react';

interface AIResearchAgentProps {
  activeTab: string;
  selectedRegion: string;
}

interface ResearchCitation {
  title: string;
  source: string;
}

interface ResearchResponse {
  answer: string;
  citations?: ResearchCitation[];
}

interface AgentMessage {
  role: 'assistant' | 'user';
  content: string;
  citations: ResearchCitation[];
}

const starterQuestion = 'Which projects or regions deserve the closest attention?';

const presetQuestions = [
  'Which countries combine high AI capacity with grid or policy risk?',
  'Where should hyperscaler CapEx monitoring focus this quarter?',
  'Which regions are best positioned for sovereign AI infrastructure?',
  'What power and cooling constraints deserve executive attention?',
];

const initialMessages: AgentMessage[] = [
  {
    role: 'assistant',
    content: starterQuestion,
    citations: [],
  },
];

export function AIResearchAgent({ activeTab, selectedRegion }: AIResearchAgentProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<AgentMessage[]>(initialMessages);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const contextLabel = useMemo(
    () => `${selectedRegion} • ${activeTab}`,
    [activeTab, selectedRegion],
  );

  const clearChat = () => {
    setMessages(initialMessages);
    setQuestion('');
    setError(null);
  };

  const submitQuestion = async (nextQuestion = question) => {
    const trimmedQuestion = nextQuestion.trim();

    if (!trimmedQuestion || isLoading) {
      return;
    }

    setMessages((currentMessages) => [
      ...currentMessages,
      { role: 'user', content: trimmedQuestion, citations: [] },
    ]);
    setQuestion('');
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai-research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: trimmedQuestion,
          tab: activeTab,
          region: selectedRegion,
        }),
      });

      const contentType = response.headers.get('content-type') ?? '';
      const payload = contentType.includes('application/json')
        ? ((await response.json()) as Partial<ResearchResponse> & { error?: string })
        : { error: await response.text() };

      if (!response.ok) {
        throw new Error(payload.error || `AI request failed with status ${response.status}`);
      }

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          role: 'assistant',
          content: typeof payload.answer === 'string' ? payload.answer : 'No answer was returned.',
          citations: Array.isArray(payload.citations) ? payload.citations : [],
        },
      ]);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'AI request failed.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open AI Research Agent"
        className="fixed bottom-6 right-6 z-[70] flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/40 bg-cyan-500 text-white shadow-2xl shadow-cyan-500/30 transition hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-300"
      >
        <Bot className="h-6 w-6" />
      </button>
    );
  }

  return (
    <aside
      className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-md flex-col border-l border-slate-800 bg-slate-950 text-slate-100 shadow-2xl sm:w-[420px]"
      aria-label="AI Research Agent"
    >
      <header className="flex items-start gap-4 border-b border-slate-800 px-6 py-5">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-cyan-500/15 text-cyan-300 ring-1 ring-cyan-400/20">
          <Bot className="h-6 w-6" />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-bold tracking-tight text-white">AI Research Agent</h2>
          <p className="text-sm text-slate-400">AI, cloud & data-center infrastructure</p>
          <p className="mt-1 truncate text-xs font-medium text-cyan-300">Context: {contextLabel}</p>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={clearChat}
            aria-label="Clear chat"
            title="Clear chat"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            <RotateCcw className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close AI Research Agent"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </header>

      <div className="border-b border-amber-500/30 bg-amber-950/20 px-6 py-4 text-sm leading-6 text-slate-300">
        AI-generated answers use this platform&apos;s available data and may be incomplete. Verify important
        claims before making decisions.
      </div>

      <div className="border-b border-slate-800 px-6 py-4">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Pre-defined questions
        </p>
        <div className="flex flex-wrap gap-2">
          {presetQuestions.map((presetQuestion) => (
            <button
              key={presetQuestion}
              type="button"
              onClick={() => void submitQuestion(presetQuestion)}
              disabled={isLoading}
              className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5 text-left text-xs leading-5 text-slate-300 transition hover:border-cyan-500/60 hover:text-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-400/40 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {presetQuestion}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto px-6 py-6">
        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={
              message.role === 'user'
                ? 'ml-auto max-w-[88%] rounded-2xl bg-cyan-600 px-4 py-3 text-sm leading-6 text-white'
                : 'max-w-[92%] rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-sm leading-6 text-slate-100'
            }
          >
            <p className="whitespace-pre-wrap">{message.content}</p>
            {message.citations.length > 0 && (
              <div className="mt-3 space-y-1 border-t border-slate-700 pt-3 text-xs text-slate-400">
                {message.citations.map((citation) => (
                  <p key={`${citation.title}-${citation.source}`}>
                    {citation.title}: {citation.source}
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex max-w-[92%] items-center gap-2 rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-sm text-slate-300">
            <Loader2 className="h-4 w-4 animate-spin text-cyan-300" />
            Researching platform data...
          </div>
        )}
      </div>

      <footer className="border-t border-slate-800 px-6 py-4">
        {error && <p className="mb-3 text-sm text-amber-300">{error}</p>}
        <div className="flex items-end gap-3">
          <textarea
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                void submitQuestion();
              }
            }}
            placeholder="Ask about projects, countries, power, cooling, or risk..."
            maxLength={1200}
            rows={2}
            className="min-h-12 flex-1 resize-none rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
          />
          <button
            type="button"
            onClick={() => void submitQuestion()}
            disabled={isLoading || !question.trim()}
            aria-label="Send research question"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-600 text-white transition hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
          </button>
        </div>
        <p className="mt-2 text-right text-xs text-slate-500">{question.length}/1200</p>
      </footer>
    </aside>
  );
}
