import React, { useEffect, useRef, useState } from 'react';
import { Layers, ChevronDown, Check } from 'lucide-react';
import { MAP_VIEW_OPTIONS, type MapViewId } from './mapStyles';

interface MapViewSelectorProps {
  value: MapViewId;
  onChange: (id: MapViewId) => void;
  className?: string;
}

export const MapViewSelector: React.FC<MapViewSelectorProps> = ({ value, onChange, className }) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const current = MAP_VIEW_OPTIONS.find((o) => o.id === value) ?? MAP_VIEW_OPTIONS[0];

  // `className` (e.g. "absolute bottom-3 right-3") is applied to this outer
  // wrapper for placement over the map; a separate inner `relative` div
  // anchors the dropdown so the two positioning contexts never collide.
  return (
    <div ref={containerRef} className={className}>
      <div className="relative inline-block">
        {/* Dropdown card opens upward, above the trigger button */}
        {open && (
          <div className="absolute bottom-full right-0 mb-2 w-48 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden py-1 z-20">
            {MAP_VIEW_OPTIONS.map((option) => {
              const isSelected = option.id === value;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => {
                    onChange(option.id);
                    setOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-500 text-white font-medium'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <span>{option.label}</span>
                  {isSelected && <Check className="w-4 h-4" />}
                </button>
              );
            })}
          </div>
        )}

        {/* Trigger pill */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-haspopup="listbox"
          aria-expanded={open}
          className="flex items-center space-x-2 pl-3 pr-2.5 py-1.5 rounded-full bg-slate-50/95 dark:bg-slate-900/95 backdrop-blur-md border border-indigo-400/60 dark:border-indigo-500/50 shadow-lg text-sm font-medium text-slate-800 dark:text-slate-200 cursor-pointer"
        >
          <Layers className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
          <span>{current.label}</span>
          <ChevronDown className={`w-3.5 h-3.5 text-slate-500 dark:text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
      </div>
    </div>
  );
};
