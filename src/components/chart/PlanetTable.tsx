import React, { useState } from 'react';
import type { ChartData, PlanetPosition } from '../../astrology/types/chart';
import { ArrowUpDown, Search } from 'lucide-react';

interface PlanetTableProps {
  chartData: ChartData;
}

type SortField = 'name' | 'sign' | 'degreeInSign' | 'house' | 'nakshatra';
type SortOrder = 'asc' | 'desc';

export const PlanetTable: React.FC<PlanetTableProps> = ({ chartData }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('house');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const allItems: PlanetPosition[] = [
    chartData.ascendant,
    ...chartData.planets,
  ];

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const filteredItems = allItems.filter((p) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      p.name.toLowerCase().includes(term) ||
      p.sanskritName.toLowerCase().includes(term) ||
      p.signName.toLowerCase().includes(term) ||
      p.signSanskrit.toLowerCase().includes(term) ||
      p.nakshatra.name.toLowerCase().includes(term) ||
      `house ${p.house}`.includes(term)
    );
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    let comparison = 0;
    if (sortField === 'name') {
      comparison = a.name.localeCompare(b.name);
    } else if (sortField === 'sign') {
      comparison = a.sign - b.sign;
    } else if (sortField === 'degreeInSign') {
      comparison = a.degreeInSign - b.degreeInSign;
    } else if (sortField === 'house') {
      comparison = a.house - b.house;
    } else if (sortField === 'nakshatra') {
      comparison = a.nakshatra.name.localeCompare(b.nakshatra.name);
    }
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {/* Table Control Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ position: 'relative', width: '200px' }}>
          <Search
            size={13}
            style={{
              position: 'absolute',
              left: '9px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-subtle)',
            }}
          />
          <input
            type="text"
            className="form-input"
            style={{
              paddingLeft: '28px',
              paddingTop: '5px',
              paddingBottom: '5px',
              fontSize: '12px',
            }}
            placeholder="Search planets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
          {sortedItems.length} celestial positions
        </div>
      </div>

      {/* Desktop Data Table */}
      <div
        style={{
          overflowX: 'auto',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-sm)',
          backgroundColor: 'var(--bg-surface)',
        }}
      >
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            textAlign: 'left',
            fontSize: '12.5px',
          }}
        >
          <thead>
            <tr
              style={{
                borderBottom: '1px solid var(--border-medium)',
                backgroundColor: 'var(--bg-surface-subtle)',
              }}
            >
              <th
                onClick={() => handleSort('name')}
                style={{
                  padding: '8px 12px',
                  fontWeight: 600,
                  color: 'var(--text-heading)',
                  cursor: 'pointer',
                  userSelect: 'none',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>Graha / Planet</span>
                  <ArrowUpDown size={11} style={{ opacity: sortField === 'name' ? 1 : 0.3 }} />
                </div>
              </th>
              <th
                onClick={() => handleSort('sign')}
                style={{
                  padding: '8px 12px',
                  fontWeight: 600,
                  color: 'var(--text-heading)',
                  cursor: 'pointer',
                  userSelect: 'none',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>Rashi (Sign)</span>
                  <ArrowUpDown size={11} style={{ opacity: sortField === 'sign' ? 1 : 0.3 }} />
                </div>
              </th>
              <th
                onClick={() => handleSort('degreeInSign')}
                style={{
                  padding: '8px 12px',
                  fontWeight: 600,
                  color: 'var(--text-heading)',
                  cursor: 'pointer',
                  userSelect: 'none',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>Degree</span>
                  <ArrowUpDown size={11} style={{ opacity: sortField === 'degreeInSign' ? 1 : 0.3 }} />
                </div>
              </th>
              <th
                onClick={() => handleSort('house')}
                style={{
                  padding: '8px 12px',
                  fontWeight: 600,
                  color: 'var(--text-heading)',
                  cursor: 'pointer',
                  userSelect: 'none',
                  textAlign: 'center',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                  <span>Bhava</span>
                  <ArrowUpDown size={11} style={{ opacity: sortField === 'house' ? 1 : 0.3 }} />
                </div>
              </th>
              <th
                onClick={() => handleSort('nakshatra')}
                style={{
                  padding: '8px 12px',
                  fontWeight: 600,
                  color: 'var(--text-heading)',
                  cursor: 'pointer',
                  userSelect: 'none',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>Janma Nakshatra</span>
                  <ArrowUpDown size={11} style={{ opacity: sortField === 'nakshatra' ? 1 : 0.3 }} />
                </div>
              </th>
              <th style={{ padding: '8px 12px', fontWeight: 600, color: 'var(--text-heading)' }}>
                Motion
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedItems.map((planet) => {
              const isAscendant = planet.id === 'Ascendant';
              return (
                <tr
                  key={planet.id}
                  style={{
                    borderBottom: '1px solid var(--border-subtle)',
                    backgroundColor: isAscendant ? '#fbf8f2' : 'transparent',
                    transition: 'background-color 0.1s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = isAscendant ? '#f5eee0' : 'var(--bg-surface-subtle)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = isAscendant ? '#fbf8f2' : 'transparent';
                  }}
                >
                  {/* Planet */}
                  <td style={{ padding: '9px 12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontWeight: 600, color: isAscendant ? 'var(--accent-bronze-dark)' : 'var(--text-heading)' }}>
                        {planet.name}
                      </span>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                        ({planet.sanskritName})
                      </span>
                    </div>
                  </td>

                  {/* Sign */}
                  <td style={{ padding: '9px 12px' }}>
                    <span style={{ fontWeight: 500, color: 'var(--text-heading)' }}>
                      {planet.signName}
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginLeft: '4px' }}>
                      ({planet.signSanskrit})
                    </span>
                  </td>

                  {/* Degree */}
                  <td style={{ padding: '9px 12px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '12px',
                        color: 'var(--text-heading)',
                      }}
                    >
                      {planet.degreeFormatted}
                    </span>
                  </td>

                  {/* House */}
                  <td style={{ padding: '9px 12px', textAlign: 'center' }}>
                    <span
                      style={{
                        fontWeight: 600,
                        fontSize: '11.5px',
                        color: planet.house === 1 ? 'var(--accent-bronze-dark)' : 'var(--text-heading)',
                      }}
                    >
                      H{planet.house}
                    </span>
                  </td>

                  {/* Nakshatra */}
                  <td style={{ padding: '9px 12px' }}>
                    <span>{planet.nakshatra.name}</span>
                    <span style={{ color: 'var(--accent-bronze)', fontSize: '11px', fontWeight: 600, marginLeft: '4px' }}>
                      (Pada {planet.nakshatra.pada})
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginLeft: '4px' }}>
                      • {planet.nakshatra.lord}
                    </span>
                  </td>

                  {/* Motion */}
                  <td style={{ padding: '9px 12px' }}>
                    {planet.isRetrograde ? (
                      <span style={{ fontSize: '11px', color: '#b91c1c', fontWeight: 600 }}>
                        Retrograde (R)
                      </span>
                    ) : (
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                        Direct
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
