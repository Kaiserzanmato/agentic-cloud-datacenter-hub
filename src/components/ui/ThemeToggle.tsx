import { Sun, Moon, Monitor } from 'lucide-react';
import type { ThemeMode } from '@/hooks/useTheme';

interface ThemeToggleProps {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
}

const OPTIONS: Array<{ mode: ThemeMode; icon: typeof Sun; label: string }> = [
  { mode: 'light', icon: Sun, label: 'Light theme' },
  { mode: 'dark', icon: Moon, label: 'Dark theme' },
  { mode: 'system', icon: Monitor, label: 'Match system theme' },
];

export function ThemeToggle({ mode, setMode }: ThemeToggleProps) {
  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className="flex items-center space-x-0.5 rounded-xl border border-slate-300/60 dark:border-slate-700/60 bg-slate-100/90 dark:bg-slate-900/90 p-0.5"
    >
      {OPTIONS.map(({ mode: optionMode, icon: Icon, label }) => {
        const isActive = mode === optionMode;
        return (
          <button
            key={optionMode}
            type="button"
            role="radio"
            aria-checked={isActive}
            title={label}
            aria-label={label}
            onClick={() => setMode(optionMode)}
            className={`p-1.5 rounded-lg transition-all cursor-pointer ${
              isActive
                ? 'bg-cyan-500/20 border border-cyan-500/50 text-cyan-600 dark:text-cyan-300'
                : 'border border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
          </button>
        );
      })}
    </div>
  );
}
