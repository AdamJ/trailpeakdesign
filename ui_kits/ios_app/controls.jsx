// Trail Peak iOS — native control components
// Segmented control, stepper, switch, date picker (wheel), slider, search field, action sheet

function ControlsScreen() {
  return (
    <div style={{ background: TP.sand, minHeight: '100%' }}>
      <TPNav
        title="Controls"
        subtitle="Native iOS \u00b7 brand-styled"
        leading={null}
        trailing={null}
      />

      <div style={{ padding: '0 20px 32px', display: 'flex', flexDirection: 'column', gap: 24 }}>
        <ControlSection label="Segmented">
          <SegmentedControl options={['Day', 'Week', 'Month']} value="Week" />
        </ControlSection>

        <ControlSection label="Switch">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4px' }}>
            <span style={{ fontSize: 15, color: TP.soil }}>Billable by default</span>
            <Switch on />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 4px 0' }}>
            <span style={{ fontSize: 15, color: TP.soil }}>Round to 15 min</span>
            <Switch />
          </div>
        </ControlSection>

        <ControlSection label="Stepper">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4px' }}>
            <span style={{ fontSize: 15, color: TP.soil }}>Hourly rate</span>
            <Stepper value="$125" />
          </div>
        </ControlSection>

        <ControlSection label="Slider">
          <Slider value={62} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontFamily: "'Fira Code', monospace", fontSize: 11, color: TP.stone }}>
            <span>0h</span><span>8h</span>
          </div>
        </ControlSection>

        <ControlSection label="Search">
          <SearchField placeholder="Search entries\u2026" />
        </ControlSection>

        <ControlSection label="Date Picker \u00b7 Wheel">
          <DateWheel />
        </ControlSection>

        <ControlSection label="Action Sheet">
          <ActionSheet />
        </ControlSection>
      </div>
    </div>
  );
}

function ControlSection({ label, children }) {
  return (
    <div>
      <div style={{
        fontFamily: "'Fira Code', monospace", fontSize: 10,
        color: TP.stone, textTransform: 'uppercase', letterSpacing: '.12em', marginBottom: 10,
      }}>{label}</div>
      {children}
    </div>
  );
}

// ---------- Segmented ----------
function SegmentedControl({ options, value }) {
  return (
    <div style={{
      display: 'flex',
      background: TP.dune, border: `3px solid ${TP.bark}`,
      borderRadius: 12, padding: 3,
      boxShadow: `3px 3px 0 0 ${TP.bark}`,
    }}>
      {options.map((o) => (
        <div key={o} style={{
          flex: 1, textAlign: 'center', padding: '8px 0',
          fontSize: 14, fontWeight: 600,
          color: o === value ? '#fff' : TP.soil,
          background: o === value ? TP.ember : 'transparent',
          borderRadius: 8, cursor: 'pointer',
          border: o === value ? `2px solid ${TP.bark}` : '2px solid transparent',
        }}>{o}</div>
      ))}
    </div>
  );
}

// ---------- Switch ----------
function Switch({ on }) {
  return (
    <div style={{
      width: 52, height: 30, borderRadius: 15,
      background: on ? TP.moss : TP.tan,
      border: `2px solid ${TP.bark}`,
      position: 'relative', flexShrink: 0,
      transition: 'background .22s cubic-bezier(.22,.61,.36,1)',
    }}>
      <div style={{
        position: 'absolute', top: 2,
        left: on ? 24 : 2,
        width: 22, height: 22, borderRadius: '50%',
        background: TP.sand, border: `1.5px solid ${TP.bark}`,
        transition: 'left .22s cubic-bezier(.22,.61,.36,1)',
      }}/>
    </div>
  );
}

// ---------- Stepper ----------
function Stepper({ value }) {
  const btn = (glyph) => (
    <div style={{
      width: 40, height: 36,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: TP.soil, fontSize: 18, cursor: 'pointer',
    }}>{glyph}</div>
  );
  return (
    <div style={{
      display: 'flex', alignItems: 'center',
      border: `3px solid ${TP.bark}`, borderRadius: 12,
      background: TP.sand, overflow: 'hidden',
      boxShadow: `3px 3px 0 0 ${TP.bark}`,
    }}>
      {btn('\u2212')}
      <div style={{
        borderLeft: `2px solid ${TP.bark}`, borderRight: `2px solid ${TP.bark}`,
        padding: '0 14px', height: 36, display: 'flex', alignItems: 'center',
        fontFamily: "'Fira Code', monospace", fontSize: 14, fontWeight: 600, color: TP.soil,
        minWidth: 60, justifyContent: 'center',
      }}>{value}</div>
      {btn('+')}
    </div>
  );
}

// ---------- Slider ----------
function Slider({ value }) {
  return (
    <div style={{ position: 'relative', padding: '10px 0' }}>
      <div style={{
        height: 6, background: TP.tan, borderRadius: 3,
        border: `1px solid ${TP.bark}`, position: 'relative',
      }}>
        <div style={{
          position: 'absolute', left: 0, top: -1, bottom: -1,
          width: `${value}%`, background: TP.ember,
          borderRadius: 3, borderRight: `1px solid ${TP.bark}`,
        }}/>
      </div>
      <div style={{
        position: 'absolute', left: `calc(${value}% - 14px)`, top: 2,
        width: 24, height: 24, borderRadius: '50%',
        background: TP.sand, border: `3px solid ${TP.bark}`,
        boxShadow: `2px 2px 0 0 ${TP.bark}`,
      }}/>
    </div>
  );
}

// ---------- Search ----------
function SearchField({ placeholder }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      background: TP.sand, border: `3px solid ${TP.bark}`,
      borderRadius: 12, padding: '10px 14px',
      boxShadow: `3px 3px 0 0 ${TP.bark}`,
    }}>
      <i className="ph ph-magnifying-glass" style={{ fontSize: 16, color: TP.stone }}/>
      <span style={{ fontSize: 15, color: TP.stone, flex: 1 }}>{placeholder}</span>
      <i className="ph-fill ph-microphone" style={{ fontSize: 16, color: TP.stone }}/>
    </div>
  );
}

// ---------- Date Wheel ----------
function DateWheel() {
  const months = ['Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const days = [17, 18, 19, 20, 21];
  const years = [2024, 2025, 2026, 2027, 2028];

  const Column = ({ values, center }) => (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
      gap: 4, padding: '8px 0',
    }}>
      {values.map((v, i) => {
        const dist = Math.abs(i - 2);
        return (
          <div key={v} style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: i === 2 ? 22 : 18,
            fontWeight: i === 2 ? 700 : 400,
            color: i === 2 ? TP.soil : TP.stone,
            opacity: 1 - dist * 0.22,
            lineHeight: 1.2,
          }}>{v}</div>
        );
      })}
    </div>
  );

  return (
    <div style={{
      background: TP.sand, border: `3px solid ${TP.bark}`, borderRadius: 16,
      boxShadow: `4px 4px 0 0 ${TP.bark}`,
      display: 'flex', position: 'relative', overflow: 'hidden',
    }}>
      <Column values={months} center="Apr"/>
      <Column values={days} center={19}/>
      <Column values={years} center={2026}/>
      {/* selection overlay */}
      <div style={{
        position: 'absolute', left: 8, right: 8, top: '50%', transform: 'translateY(-50%)',
        height: 34, border: `2px solid ${TP.ember}`, borderRadius: 8, pointerEvents: 'none',
        background: 'rgba(211, 95, 61, 0.08)',
      }}/>
    </div>
  );
}

// ---------- Action Sheet ----------
function ActionSheet() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{
        background: TP.sand, border: `3px solid ${TP.bark}`, borderRadius: 16,
        boxShadow: `4px 4px 0 0 ${TP.bark}`, overflow: 'hidden',
      }}>
        {['Edit Entry', 'Duplicate', 'Move to\u2026'].map((t, i) => (
          <div key={t} style={{
            padding: '14px 18px',
            borderTop: i === 0 ? 'none' : `2px solid ${TP.tan}`,
            fontSize: 16, color: TP.soil, textAlign: 'center', fontWeight: 500,
          }}>{t}</div>
        ))}
        <div style={{
          padding: '14px 18px', borderTop: `2px solid ${TP.tan}`,
          fontSize: 16, color: TP.ember, textAlign: 'center', fontWeight: 600,
        }}>Delete Entry</div>
      </div>
      <div style={{
        background: TP.sand, border: `3px solid ${TP.bark}`, borderRadius: 16,
        boxShadow: `4px 4px 0 0 ${TP.bark}`,
        padding: '14px 18px', fontSize: 16, color: TP.soil, textAlign: 'center', fontWeight: 700,
      }}>Cancel</div>
    </div>
  );
}

Object.assign(window, { ControlsScreen });
