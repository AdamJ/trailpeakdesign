// Trail Peak iOS screens — applies brand tokens to native iOS patterns

// ---------- Shared styles (Trail Peak tokens inline for iOS context) ----------
const TP = {
  sand: '#F5F1E8',
  dune: '#E8DCC8',
  tan: '#D4C4A8',
  bark: '#4A3426',
  soil: '#2D1F12',
  stone: '#8A7560',
  clay: '#D35F3D',
  ember: '#C4472A',
  moss: '#5A6B4F',
  sage: '#8FA085',
  shadowDeep: 'rgba(45, 31, 18, 0.85)',
};

// Signature Trail Peak card (earth-sand bg, bark border, offset shadow)
const tpCard = {
  background: TP.sand,
  border: `1px solid ${TP.bark}`,
  borderRadius: 20,
  boxShadow: `6px 6px 0 0 ${TP.shadowDeep}`,
  padding: 16,
};

const tpCardTight = {
  background: TP.sand,
  border: `1px solid ${TP.bark}`,
  borderRadius: 16,
  boxShadow: `4px 4px 0 0 ${TP.shadowDeep}`,
};

// ---------- Custom Trail Peak nav header (replaces glass pills) ----------
function TPNav({ title, leading, trailing, subtitle }) {
  return (
    <div style={{ padding: '62px 20px 16px', background: TP.sand, position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <div>{leading}</div>
        <div>{trailing}</div>
      </div>
      <div style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: 36, fontWeight: 700, color: TP.soil,
        lineHeight: 1, letterSpacing: -0.5,
      }}>{title}</div>
      {subtitle && (
        <div style={{
          fontFamily: "'Fira Code', monospace", fontSize: 11, color: TP.stone,
          textTransform: 'uppercase', letterSpacing: '.1em', marginTop: 6,
        }}>{subtitle}</div>
      )}
    </div>
  );
}

function NavPillBtn({ icon, onClick, primary }) {
  return (
    <button onClick={onClick} style={{
      width: 40, height: 40, borderRadius: '50%',
      border: `4px solid ${TP.bark}`,
      background: primary ? TP.ember : TP.sand,
      color: primary ? '#fff' : TP.soil,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: `3px 3px 0 0 ${TP.bark}`,
      cursor: 'pointer', padding: 0,
    }}>
      <i className={`ph ${icon}`} style={{ fontSize: 16 }}></i>
    </button>
  );
}

// ============================================================
// Screen 1 — Projects list
// ============================================================
function ProjectsScreen({ onOpen }) {
  const projects = [
    { name: 'Time Tracker Pro', client: 'Personal', hours: 18.5, active: true, color: TP.ember },
    { name: 'PatternFly Tokens', client: 'Red Hat', hours: 32.0, active: false, color: TP.moss },
    { name: 'Magic Collection', client: 'Personal', hours: 6.25, active: false, color: TP.clay },
    { name: 'Studio Jolicoeur', client: 'Internal', hours: 4.0, active: false, color: TP.sage },
    { name: 'Chore Tracker', client: 'Personal', hours: 2.5, active: false, color: TP.tan },
  ];
  const total = projects.reduce((a, p) => a + p.hours, 0);

  return (
    <div style={{ background: TP.sand, minHeight: '100%' }}>
      <TPNav
        title="Projects"
        subtitle="Week 16 · Apr 13–19"
        leading={null}
        trailing={<NavPillBtn icon="ph-plus" primary />}
      />

      {/* Week total card */}
      <div style={{ padding: '0 20px 16px' }}>
        <div style={{ ...tpCard, padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 10, color: TP.stone, textTransform: 'uppercase', letterSpacing: '.1em' }}>This week</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 700, color: TP.soil, lineHeight: 1, marginTop: 4 }}>{total.toFixed(1)}<span style={{ fontSize: 22, color: TP.stone, marginLeft: 4 }}>hrs</span></div>
          </div>
          <div style={{
            background: TP.moss, color: TP.sand, borderRadius: 12,
            padding: '8px 12px', border: `2px solid ${TP.bark}`,
            fontSize: 12, fontWeight: 600,
            boxShadow: `3px 3px 0 0 ${TP.bark}`,
          }}>
            <i className="ph-fill ph-trend-up" style={{ marginRight: 6 }}></i>+4.5h
          </div>
        </div>
      </div>

      {/* List */}
      <div style={{ padding: '0 20px 32px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {projects.map((p, i) => (
          <div key={i} onClick={p.active ? onOpen : undefined} style={{
            ...tpCardTight,
            padding: '14px 16px',
            display: 'flex', alignItems: 'center', gap: 12,
            cursor: p.active ? 'pointer' : 'default',
            background: p.active ? TP.dune : TP.sand,
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10,
              background: p.color, border: `2px solid ${TP.bark}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <i className={`ph-fill ${p.active ? 'ph-timer' : 'ph-folder'}`} style={{ fontSize: 18, color: TP.sand }}></i>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 600, color: TP.soil, lineHeight: 1.2 }}>{p.name}</div>
              <div style={{ fontSize: 12, color: TP.stone, marginTop: 2 }}>{p.client}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 15, fontWeight: 600, color: TP.soil }}>{p.hours.toFixed(1)}h</div>
              {p.active && (
                <div style={{ fontSize: 10, color: TP.ember, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.08em', marginTop: 2 }}>
                  <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: TP.ember, marginRight: 4, verticalAlign: 'middle' }}></span>
                  Active
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// Screen 2 — Timer (active session)
// ============================================================
function TimerScreen({ onBack, onNew }) {
  const [seconds] = React.useState(2847); // 47:27
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');

  return (
    <div style={{ background: TP.sand, minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
      <TPNav
        title="Timer"
        subtitle="Time Tracker Pro · Personal"
        leading={<NavPillBtn icon="ph-arrow-left" onClick={onBack} />}
        trailing={<NavPillBtn icon="ph-dots-three" />}
      />

      {/* Big display */}
      <div style={{ padding: '24px 20px 0', textAlign: 'center' }}>
        <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 11, color: TP.stone, textTransform: 'uppercase', letterSpacing: '.12em', marginBottom: 8 }}>Current session</div>
        <div style={{
          fontFamily: "'Pirata One', serif",
          fontSize: 96, fontWeight: 400, color: TP.soil,
          lineHeight: .9, letterSpacing: 2,
        }}>
          {h}:{m}:<span style={{ color: TP.ember }}>{s}</span>
        </div>
        <div style={{ fontSize: 14, color: TP.stone, marginTop: 8 }}>Started at 2:14 PM · Today</div>
      </div>

      {/* Controls */}
      <div style={{ padding: '32px 20px 0', display: 'flex', gap: 12, justifyContent: 'center' }}>
        <button style={{
          width: 60, height: 60, borderRadius: '50%',
          background: TP.sand, border: `4px solid ${TP.bark}`,
          boxShadow: `3px 3px 0 0 ${TP.bark}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', padding: 0,
        }}><i className="ph-fill ph-arrow-counter-clockwise" style={{ fontSize: 20, color: TP.soil }}></i></button>

        <button style={{
          width: 84, height: 84, borderRadius: '50%',
          background: TP.ember, border: `4px solid ${TP.bark}`, color: '#fff',
          boxShadow: `4px 4px 0 0 ${TP.bark}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', padding: 0,
        }}><i className="ph-fill ph-pause" style={{ fontSize: 32 }}></i></button>

        <button onClick={onNew} style={{
          width: 60, height: 60, borderRadius: '50%',
          background: TP.moss, border: `4px solid ${TP.bark}`, color: TP.sand,
          boxShadow: `3px 3px 0 0 ${TP.bark}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', padding: 0,
        }}><i className="ph-fill ph-check" style={{ fontSize: 22 }}></i></button>
      </div>

      {/* Notes card */}
      <div style={{ padding: '32px 20px 0' }}>
        <div style={{
          fontFamily: "'Fira Code', monospace", fontSize: 10,
          color: TP.stone, textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 8,
        }}>Notes</div>
        <div style={{ ...tpCardTight, padding: 14, fontSize: 14, color: TP.soil, lineHeight: 1.55 }}>
          Refactoring the settings flow — extracted the pickers into their own sheet, wired up haptics.
        </div>
      </div>

      {/* Today's entries */}
      <div style={{ padding: '20px 20px 0', flex: 1 }}>
        <div style={{
          fontFamily: "'Fira Code', monospace", fontSize: 10,
          color: TP.stone, textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 8,
        }}>Earlier today</div>
        {[
          ['Design review · Figma', '1:08'],
          ['Icon exploration', '0:42'],
        ].map(([t, d], i) => (
          <div key={i} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '12px 0', borderBottom: i === 0 ? `1px solid ${TP.tan}` : 'none',
          }}>
            <div style={{ fontSize: 14, color: TP.soil }}>{t}</div>
            <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 13, color: TP.stone }}>{d}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// Screen 3 — New manual entry
// ============================================================
function NewEntryScreen({ onBack }) {
  return (
    <div style={{ background: TP.sand, minHeight: '100%' }}>
      <TPNav
        title="New Entry"
        leading={<NavPillBtn icon="ph-x" onClick={onBack} />}
        trailing={
          <button style={{
            padding: '8px 16px', borderRadius: 999,
            background: TP.ember, color: '#fff',
            border: `3px solid ${TP.bark}`,
            boxShadow: `3px 3px 0 0 ${TP.bark}`,
            fontSize: 13, fontWeight: 600, fontFamily: 'inherit',
            cursor: 'pointer',
          }}>Save</button>
        }
      />

      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 18 }}>
        {/* Project */}
        <Field label="Project">
          <Picker value="Time Tracker Pro" accent={TP.ember} />
        </Field>

        {/* Duration */}
        <Field label="Duration">
          <div style={{
            ...tpCardTight, padding: '14px 18px',
            display: 'flex', alignItems: 'baseline', gap: 8,
          }}>
            <span style={{ fontFamily: "'Fira Code', monospace", fontSize: 28, fontWeight: 600, color: TP.soil }}>2</span>
            <span style={{ fontSize: 14, color: TP.stone }}>hrs</span>
            <span style={{ fontFamily: "'Fira Code', monospace", fontSize: 28, fontWeight: 600, color: TP.soil, marginLeft: 12 }}>15</span>
            <span style={{ fontSize: 14, color: TP.stone }}>min</span>
          </div>
        </Field>

        {/* Date */}
        <Field label="Date">
          <Picker value="Today · Apr 19" />
        </Field>

        {/* Notes */}
        <Field label="Notes">
          <div style={{
            ...tpCardTight, padding: 14, minHeight: 80,
            fontSize: 14, color: TP.soil,
          }}>
            Finishing the invoice<span style={{ background: TP.ember, display: 'inline-block', width: 2, height: 16, verticalAlign: 'middle', marginLeft: 2, animation: 'blink 1s infinite' }}></span>
          </div>
        </Field>

        {/* Billable toggle */}
        <div style={{
          ...tpCardTight, padding: '14px 16px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 600, color: TP.soil }}>Billable</div>
            <div style={{ fontSize: 12, color: TP.stone, marginTop: 2 }}>Include in invoice total</div>
          </div>
          <div style={{
            width: 50, height: 30, borderRadius: 15,
            background: TP.moss, border: `2px solid ${TP.bark}`,
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute', top: 2, right: 2,
              width: 22, height: 22, borderRadius: '50%',
              background: TP.sand, border: `1.5px solid ${TP.bark}`,
            }}/>
          </div>
        </div>
      </div>
      <style>{`@keyframes blink { 50% { opacity: 0; } }`}</style>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <div style={{
        fontFamily: "'Fira Code', monospace", fontSize: 10,
        color: TP.stone, textTransform: 'uppercase', letterSpacing: '.12em', marginBottom: 6,
      }}>{label}</div>
      {children}
    </div>
  );
}

function Picker({ value, accent }) {
  return (
    <div style={{
      ...tpCardTight, padding: '14px 16px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {accent && <div style={{ width: 12, height: 12, borderRadius: 3, background: accent, border: `1px solid ${TP.bark}` }}/>}
        <span style={{ fontSize: 15, color: TP.soil, fontWeight: 500 }}>{value}</span>
      </div>
      <i className="ph ph-caret-down" style={{ fontSize: 14, color: TP.stone }}></i>
    </div>
  );
}

Object.assign(window, { ProjectsScreen, TimerScreen, NewEntryScreen, TP, TPNav, NavPillBtn });
