export function PoweredByBar() {
  return (
    <div className="w-full bg-slate-950 py-2 text-center">
      <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-slate-400">
        <span className="text-slate-600">•</span>{' '}
        POWERED BY{' '}
        <a
          href="https://docypherlabs.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80 transition-opacity"
        >
          <span className="text-amber-400 font-semibold">DocypherLabs</span>
          <span className="text-slate-500"> | </span>
          <span className="text-slate-300">Research &amp; Intelligence</span>
        </a>{' '}
        <span className="text-slate-600">•</span>
      </p>
    </div>
  );
}
