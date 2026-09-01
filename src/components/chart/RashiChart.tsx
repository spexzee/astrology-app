import React, { useState } from 'react';
import type { ChartData, HouseInfo } from '../../astrology/types/chart';

interface RashiChartProps {
  chartData: ChartData;
  selectedHouseNumber?: number | null;
  onSelectHouse?: (house: HouseInfo) => void;
}

interface HouseCoord {
  number: number;
  signPos: { x: number; y: number };
  contentPos: { x: number; y: number };
}

const HOUSE_COORDS: Record<number, HouseCoord> = {
  1: { number: 1, signPos: { x: 200, y: 170 }, contentPos: { x: 200, y: 90 } },
  2: { number: 2, signPos: { x: 100, y: 70 }, contentPos: { x: 100, y: 40 } },
  3: { number: 3, signPos: { x: 60, y: 100 }, contentPos: { x: 50, y: 140 } },
  4: { number: 4, signPos: { x: 130, y: 200 }, contentPos: { x: 100, y: 200 } },
  5: { number: 5, signPos: { x: 60, y: 300 }, contentPos: { x: 50, y: 260 } },
  6: { number: 6, signPos: { x: 100, y: 330 }, contentPos: { x: 100, y: 360 } },
  7: { number: 7, signPos: { x: 200, y: 240 }, contentPos: { x: 200, y: 310 } },
  8: { number: 8, signPos: { x: 300, y: 330 }, contentPos: { x: 300, y: 360 } },
  9: { number: 9, signPos: { x: 340, y: 300 }, contentPos: { x: 350, y: 260 } },
  10: { number: 10, signPos: { x: 270, y: 200 }, contentPos: { x: 300, y: 200 } },
  11: { number: 11, signPos: { x: 340, y: 100 }, contentPos: { x: 350, y: 140 } },
  12: { number: 12, signPos: { x: 300, y: 70 }, contentPos: { x: 300, y: 40 } },
};

export const RashiChart: React.FC<RashiChartProps> = ({
  chartData,
  onSelectHouse,
}) => {
  const [, setHoveredHouse] = useState<number | null>(null);

  const getHouseInfo = (hNum: number): HouseInfo | undefined => {
    return chartData.houses.find((h) => h.houseNumber === hNum);
  };

  return (
    <div
      style={{
        width: '100%',
        backgroundColor: 'var(--color-surface-container-lowest)',
        border: '1px solid rgba(212, 196, 183, 0.4)',
        padding: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        borderRadius: '2px',
      }}
    >
      <svg
        viewBox="0 0 400 400"
        style={{
          width: '100%',
          maxWidth: '560px',
          height: 'auto',
          filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.04))',
        }}
        fill="none"
        stroke="currentColor"
      >
        {/* Diamond Chart Lines matching user template */}
        <g stroke="var(--color-on-surface-variant)" strokeWidth="1.5">
          {/* Outer Box */}
          <rect x="10" y="10" width="380" height="380" />
          {/* Diagonals */}
          <line x1="10" y1="10" x2="390" y2="390" />
          <line x1="390" y1="10" x2="10" y2="390" />
          {/* Midpoint Lines */}
          <line x1="200" y1="10" x2="10" y2="200" />
          <line x1="10" y1="200" x2="200" y2="390" />
          <line x1="200" y1="390" x2="390" y2="200" />
          <line x1="390" y1="200" x2="200" y2="10" />
        </g>

        {/* House Sign Numbers */}
        <g fill="var(--color-on-surface-variant)" opacity="0.45" fontSize="12" fontFamily="var(--font-body)">
          {Object.values(HOUSE_COORDS).map((hc) => {
            const hData = getHouseInfo(hc.number);
            return (
              <text key={hc.number} textAnchor="middle" x={hc.signPos.x} y={hc.signPos.y}>
                {hData?.sign ?? hc.number}
              </text>
            );
          })}
        </g>

        {/* Interactive House Placements */}
        {Object.values(HOUSE_COORDS).map((hc) => {
          const houseData = getHouseInfo(hc.number);
          if (!houseData) return null;

          const isLagna = hc.number === 1;
          const planetsInHouse = houseData.planets;

          return (
            <g
              key={hc.number}
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setHoveredHouse(hc.number)}
              onMouseLeave={() => setHoveredHouse(null)}
              onClick={() => onSelectHouse?.(houseData)}
            >
              {/* Lagna (Asc) placement in House 1 */}
              {isLagna && (
                <text
                  textAnchor="middle"
                  x={hc.contentPos.x}
                  y={hc.contentPos.y}
                  fill="var(--color-primary)"
                  fontSize="13"
                  fontWeight="600"
                  fontFamily="var(--font-body)"
                >
                  As {chartData.ascendant.degreeFormatted.split(' ')[0]}
                </text>
              )}

              {/* Planets */}
              {planetsInHouse.length > 0 && (
                <g fill="var(--color-on-surface)" fontSize="13" fontFamily="var(--font-body)">
                  {planetsInHouse.map((planet, pIdx) => {
                    const startY = isLagna ? hc.contentPos.y + (pIdx + 1) * 18 : hc.contentPos.y + (pIdx - (planetsInHouse.length - 1) / 2) * 18;
                    return (
                      <text
                        key={planet.id}
                        textAnchor="middle"
                        x={hc.contentPos.x}
                        y={startY}
                        fontWeight="500"
                      >
                        {planet.shortCode} {Math.floor(planet.degreeInSign)}°
                        {planet.isRetrograde && (
                          <tspan fill="var(--color-error)" fontSize="10">
                            {' '}(R)
                          </tspan>
                        )}
                      </text>
                    );
                  })}
                </g>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};
