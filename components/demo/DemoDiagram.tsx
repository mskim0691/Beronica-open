interface DemoDiagramProps {
  featureId: 'contactMgmt' | 'localPrivacy'
}

function WindowChrome() {
  return (
    <div className="flex items-center gap-1.5 border-b border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2">
      <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: '#FF5F57' }} />
      <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: '#FFBD2E' }} />
      <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: '#27C93F' }} />
    </div>
  )
}

function ContactMgmtDiagram() {
  // Center at (140, 90), surrounding nodes at radius ~65
  const center = { x: 140, y: 90 }
  const r = 65
  const nodes = [
    { name: '김팀장', angle: -90 },
    { name: '이대리', angle: -30 },
    { name: '박과장', angle: 30 },
    { name: '최인턴', angle: 150 },
    { name: '정부장', angle: 210 },
  ]

  const toRad = (deg: number) => (deg * Math.PI) / 180

  return (
    <div className="flex flex-1 flex-col items-center justify-center p-4">
      <svg viewBox="0 0 280 200" className="w-full max-w-[280px]">
        {/* Lines from center to each node */}
        {nodes.map((node) => {
          const x = center.x + r * Math.cos(toRad(node.angle))
          const y = center.y + r * Math.sin(toRad(node.angle))
          return (
            <line
              key={node.name}
              x1={center.x}
              y1={center.y}
              x2={x}
              y2={y}
              stroke="var(--color-primary)"
              strokeOpacity={0.2}
              strokeWidth={1}
            />
          )
        })}

        {/* Center node */}
        <circle cx={center.x} cy={center.y} r={22} fill="var(--color-primary)" fillOpacity={0.2} />
        <circle cx={center.x} cy={center.y} r={22} stroke="var(--color-primary)" strokeWidth={1} fill="none" strokeOpacity={0.3} />
        <text x={center.x} y={center.y} textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight="bold" fill="var(--color-text)">
          나
        </text>

        {/* Surrounding nodes */}
        {nodes.map((node) => {
          const x = center.x + r * Math.cos(toRad(node.angle))
          const y = center.y + r * Math.sin(toRad(node.angle))
          return (
            <g key={node.name}>
              <circle cx={x} cy={y} r={16} fill="var(--color-surface)" stroke="var(--color-border)" strokeWidth={1} />
              <text x={x} y={y} textAnchor="middle" dominantBaseline="central" fontSize={8} fill="var(--color-text-secondary)">
                {node.name}
              </text>
            </g>
          )
        })}

        {/* Bottom label */}
        <text x={140} y={188} textAnchor="middle" fontSize={10} fill="var(--color-text-muted)">
          지난 30일 연락
        </text>
      </svg>
    </div>
  )
}

function LocalPrivacyDiagram() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center p-4">
      <svg viewBox="0 0 280 200" className="w-full max-w-[280px]">
        {/* Device (center rounded rect) */}
        <rect x={100} y={45} width={80} height={90} rx={8} fill="var(--color-surface)" stroke="var(--color-primary)" strokeWidth={1.5} />
        {/* Shield icon inside device */}
        <path
          d="M140 62 L150 67 L150 78 C150 85 145 90 140 92 C135 90 130 85 130 78 L130 67 Z"
          fill="var(--color-primary)"
          fillOpacity={0.2}
          stroke="var(--color-primary)"
          strokeWidth={1}
        />
        <text x={140} y={110} textAnchor="middle" fontSize={9} fontWeight="500" fill="var(--color-text)">
          내 기기
        </text>

        {/* Left items with arrows going INTO device */}
        {['노트', '일정', '연락처'].map((item, i) => {
          const y = 55 + i * 25
          return (
            <g key={item}>
              <rect x={10} y={y - 8} width={45} height={16} rx={4} fill="var(--color-surface)" stroke="var(--color-border)" strokeWidth={0.5} />
              <text x={32} y={y + 1} textAnchor="middle" dominantBaseline="central" fontSize={8} fill="var(--color-text-secondary)">
                {item}
              </text>
              {/* Arrow pointing right into device */}
              <line x1={58} y1={y} x2={96} y2={y} stroke="var(--color-success)" strokeWidth={1.5} />
              <polygon points={`96,${y - 3} 102,${y} 96,${y + 3}`} fill="var(--color-success)" />
            </g>
          )
        })}

        {/* Right side: cloud with X */}
        {/* Cloud shape */}
        <ellipse cx={230} cy={75} rx={30} ry={20} fill="var(--color-surface)" stroke="var(--color-border)" strokeWidth={1} />
        <text x={230} y={73} textAnchor="middle" dominantBaseline="central" fontSize={8} fill="var(--color-text-muted)">
          외부 서버
        </text>

        {/* X through connection */}
        <line x1={183} y1={75} x2={196} y2={75} stroke="var(--color-error)" strokeWidth={1.5} strokeDasharray="3,2" />
        {/* X mark */}
        <line x1={191} y1={68} x2={199} y2={82} stroke="var(--color-error)" strokeWidth={2} strokeLinecap="round" />
        <line x1={199} y1={68} x2={191} y2={82} stroke="var(--color-error)" strokeWidth={2} strokeLinecap="round" />

        {/* Bottom label */}
        <text x={140} y={188} textAnchor="middle" fontSize={10} fontWeight="600" fill="var(--color-primary)">
          100% 로컬 저장
        </text>
      </svg>
    </div>
  )
}

export default function DemoDiagram({ featureId }: DemoDiagramProps) {
  return (
    <div className="flex h-full flex-col">
      <WindowChrome />
      {featureId === 'contactMgmt' ? <ContactMgmtDiagram /> : <LocalPrivacyDiagram />}
    </div>
  )
}
