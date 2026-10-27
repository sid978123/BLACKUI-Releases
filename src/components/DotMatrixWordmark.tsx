import React from 'react';

const GLYPHS: Record<string, string[]> = {
  B: ["11110", "10001", "10001", "11110", "10001", "10001", "11110"],
  L: ["10000", "10000", "10000", "10000", "10000", "10000", "11111"],
  A: ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
  C: ["01111", "10000", "10000", "10000", "10000", "10000", "01111"],
  K: ["10001", "10010", "10100", "11000", "10100", "10010", "10001"],
  U: ["10001", "10001", "10001", "10001", "10001", "10001", "01110"],
  I: ["11111", "00100", "00100", "00100", "00100", "00100", "11111"],
};

interface DotMatrixWordmarkProps {
  dotSize?: number;
  gap?: number;
  charSpacing?: number;
  activeColor?: string;
  inactiveColor?: string;
  showTextLabel?: boolean;
  className?: string;
}

export const DotMatrixWordmark: React.FC<DotMatrixWordmarkProps> = ({
  dotSize = 2.4,
  gap = 1.2,
  charSpacing = 4.5,
  activeColor = "#F5F5F6",
  inactiveColor = "rgba(255, 255, 255, 0.05)",
  showTextLabel = false,
  className = "",
}) => {
  const word = "BLACKUI";
  const rows = 7;
  const cols = 5;

  const charWidth = cols * dotSize + (cols - 1) * gap;
  const totalWidth = word.length * charWidth + (word.length - 1) * charSpacing;
  const totalHeight = rows * dotSize + (rows - 1) * gap;

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Dot matrix rendered wordmark */}
      <svg
        width={totalWidth}
        height={totalHeight}
        viewBox={`0 0 ${totalWidth} ${totalHeight}`}
        aria-label="BLACKUI Wordmark"
        role="img"
        className="overflow-visible"
      >
        {word.split("").map((char, charIdx) => {
          const glyph = GLYPHS[char] || GLYPHS["B"];
          const startX = charIdx * (charWidth + charSpacing);

          return (
            <g key={charIdx} transform={`translate(${startX}, 0)`}>
              {glyph.map((rowStr, rowIdx) => {
                return rowStr.split("").map((dot, colIdx) => {
                  const isActive = dot === "1";
                  const cx = colIdx * (dotSize + gap) + dotSize / 2;
                  const cy = rowIdx * (dotSize + gap) + dotSize / 2;

                  return (
                    <circle
                      key={`${rowIdx}-${colIdx}`}
                      cx={cx}
                      cy={cy}
                      r={dotSize / 2}
                      fill={isActive ? activeColor : inactiveColor}
                    />
                  );
                });
              })}
            </g>
          );
        })}
      </svg>

      {showTextLabel && (
        <span className="font-mono-code text-[11px] tracking-[0.2em] uppercase text-[#A0A3AB]">
          Media Utility
        </span>
      )}
    </div>
  );
};

export const DotMatrixBadge: React.FC<{ label: string; activeColor?: string }> = ({
  label,
  activeColor = "#C6B6FF"
}) => {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono-code tracking-wider uppercase bg-[#121419] border border-white/[0.09] text-[#A0A3AB]">
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: activeColor }} />
      {label}
    </span>
  );
};
