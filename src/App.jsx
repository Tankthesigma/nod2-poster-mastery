import { useState, useRef, useEffect } from "react";

// Audio plays from /audio/KEY.mp3 files
function playAudio(key) {
  const a = new Audio(`/audio/${key}.mp3`);
  a.playbackRate = 1.0;
  a.play().catch(() => {});
}

const S = {
  bg: "#0a0e1a", bg2: "#111827", bg3: "#1e293b",
  gold: "#f59e0b", red: "#ef4444", green: "#22c55e",
  blue: "#3b82f6", purple: "#a855f7", pink: "#ec4899",
  cyan: "#06b6d4", orange: "#f97316",
  text: "#e2e8f0", dim: "#94a3b8", dimmer: "#64748b", darkdim: "#475569",
};

function Aud({ k, label, phonetic }) {
  const [p, setP] = useState(false);
  return (
    <button onClick={() => { setP(true); playAudio(k); setTimeout(() => setP(false), 2000); }}
      style={{ display:"inline-flex", alignItems:"center", gap:"6px", padding:"5px 12px",
        borderRadius:"20px", fontSize:"13px", fontWeight:600, cursor:"pointer",
        background: p ? "linear-gradient(135deg,#f59e0b,#ef4444)" : S.bg3,
        color: p ? "#fff" : "#fef3c7", border:`1px solid ${p ? "#f59e0b" : "rgba(245,158,11,0.25)"}`,
        transform: p ? "scale(1.05)" : "scale(1)", transition:"all 0.2s",
        boxShadow: p ? "0 0 16px rgba(245,158,11,0.3)" : "none" }}>
      <span style={{fontSize:"14px"}}>{p ? "🔊" : "🔈"}</span>
      <span>{label || k}</span>
      {phonetic && <span style={{opacity:0.6,fontStyle:"italic",fontWeight:400,fontSize:"11px"}}>{phonetic}</span>}
    </button>
  );
}

function Box({ children, title, icon, color = S.gold, border }) {
  return (
    <div style={{ background:"rgba(17,24,39,0.8)", border:`1px solid ${color}25`,
      borderLeft: border ? `3px solid ${color}` : undefined,
      borderRadius:"14px", padding:"20px", marginBottom:"16px", backdropFilter:"blur(8px)" }}>
      {title && <h3 style={{ color, fontSize:"16px", fontWeight:700, margin:"0 0 14px",
        display:"flex", alignItems:"center", gap:"8px",
        fontFamily:"'JetBrains Mono',monospace" }}>
        {icon && <span style={{fontSize:"20px"}}>{icon}</span>}{title}</h3>}
      <div style={{ color:S.text, lineHeight:1.85, fontSize:"14.5px" }}>{children}</div>
    </div>
  );
}

function Expand({ q, a, color = S.red, icon = "🤔", prefix = "What if" }) {
  const [o, setO] = useState(false);
  return (
    <div onClick={() => setO(!o)} style={{ background: o ? `${color}15` : `${color}08`,
      border:`1px solid ${color}30`, borderRadius:"10px", padding:"12px 16px",
      margin:"10px 0", cursor:"pointer", transition:"all 0.2s" }}>
      <div style={{ color:`${color}cc`, fontWeight:600, fontSize:"13px",
        display:"flex", alignItems:"center", gap:"6px" }}>
        <span style={{transition:"transform 0.2s",transform:o?"rotate(90deg)":"rotate(0)",display:"inline-block"}}>▸</span>
        <span>{icon} {prefix}: {q}</span>
      </div>
      {o && <div style={{ color:S.text, marginTop:"10px", paddingLeft:"22px",
        fontSize:"13.5px", lineHeight:1.75, borderLeft:`2px solid ${color}30`,
        paddingTop:"4px",paddingBottom:"2px" }}>{a}</div>}
    </div>
  );
}

function Judge({ q, a }) {
  return <Expand q={q} a={a} color={S.green} icon="👨‍⚖️" prefix="Judge asks" />;
}

function Stat({ label, value, sub, color = S.blue }) {
  return (
    <div style={{ background:`${color}10`, borderRadius:"10px", padding:"14px", textAlign:"center" }}>
      <div style={{ color:`${color}cc`, fontWeight:700, fontSize:"12px", textTransform:"uppercase",
        letterSpacing:"0.5px" }}>{label}</div>
      <div style={{ color, fontSize:"26px", fontWeight:800, fontFamily:"'JetBrains Mono',monospace",
        margin:"4px 0" }}>{value}</div>
      {sub && <div style={{ color:S.dim, fontSize:"11px" }}>{sub}</div>}
    </div>
  );
}

function Step({ n, title, desc, color }) {
  return (
    <div style={{ display:"flex", gap:"12px", alignItems:"flex-start", marginBottom:"8px" }}>
      <div style={{ minWidth:"32px", height:"32px", borderRadius:"50%", background:`${color}20`,
        border:`2px solid ${color}`, display:"flex", alignItems:"center", justifyContent:"center",
        color, fontWeight:800, fontSize:"13px", fontFamily:"'JetBrains Mono',monospace" }}>{n}</div>
      <div style={{ paddingTop:"4px" }}>
        <div style={{ color, fontWeight:700, fontSize:"14px" }}>{title}</div>
        <div style={{ color:S.dim, fontSize:"13px", marginTop:"2px" }}>{desc}</div>
      </div>
    </div>
  );
}

function Code({ children }) {
  return (
    <div style={{ background:"#0d1117", borderRadius:"10px", padding:"14px",
      fontFamily:"'JetBrains Mono',monospace", fontSize:"12px", color:"#c9d1d9",
      lineHeight:1.7, overflowX:"auto", margin:"10px 0", border:"1px solid #21262d" }}>
      {children}
    </div>
  );
}

function Tag({ children, color = S.gold }) {
  return <span style={{ background:`${color}20`, color, padding:"2px 8px",
    borderRadius:"6px", fontSize:"12px", fontWeight:700, fontFamily:"'JetBrains Mono',monospace" }}>{children}</span>;
}

const NAV = [
  { id:"basics", title:"Foundations", icon:"🧬", color:S.blue },
  { id:"disease", title:"Crohn's & NOD2", icon:"🔬", color:S.red },
  { id:"structure", title:"Protein Structure", icon:"🏗️", color:S.cyan },
  { id:"docking", title:"GNINA Docking", icon:"🔑", color:S.gold },
  { id:"ml", title:"NOD2-Scout ML", icon:"🤖", color:S.green },
  { id:"admet", title:"ADMET Filters", icon:"💊", color:S.cyan },
  { id:"md", title:"Molecular Dynamics", icon:"🌊", color:S.pink },
  { id:"fep", title:"FEP", icon:"⚡", color:S.orange },
  { id:"results", title:"Results", icon:"🎯", color:"#10b981" },
  { id:"present", title:"Present", icon:"🎤", color:S.purple },
];

export default function App() {
  const [sec, setSec] = useState("basics");
  const ref = useRef(null);
  useEffect(() => { if(ref.current) ref.current.scrollTop = 0; }, [sec]);

  return (
    <div style={{ minHeight:"100vh", background:S.bg, fontFamily:"'Segoe UI',system-ui,sans-serif",
      display:"flex", flexDirection:"column" }}>
      <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700;800&display=swap" rel="stylesheet"/>
      <style>{`*{margin:0;padding:0;box-sizing:border-box} body{background:${S.bg}} ::-webkit-scrollbar{width:6px} ::-webkit-scrollbar-track{background:transparent} ::-webkit-scrollbar-thumb{background:#334155;border-radius:3px}`}</style>

      {/* Header */}
      <div style={{ padding:"16px 20px 12px", borderBottom:"1px solid rgba(245,158,11,0.12)",
        background:"rgba(10,14,26,0.95)", backdropFilter:"blur(20px)", position:"sticky", top:0, zIndex:50 }}>
        <h1 style={{ fontSize:"20px", fontWeight:800, fontFamily:"'JetBrains Mono',monospace",
          background:"linear-gradient(135deg,#f59e0b,#ef4444,#a855f7)",
          WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
          NOD2 POSTER MASTERY</h1>
        <p style={{ color:S.dimmer, fontSize:"11px", marginTop:"3px" }}>
          🔈 Tap audio buttons for real pronunciation • Click colored cards to expand • {NAV.length} deep-dive lessons</p>
      </div>

      {/* Nav */}
      <div style={{ display:"flex", gap:"5px", padding:"10px 12px", overflowX:"auto",
        background:"rgba(10,14,26,0.6)", borderBottom:"1px solid rgba(255,255,255,0.04)" }}>
        {NAV.map(n => (
          <button key={n.id} onClick={() => setSec(n.id)}
            style={{ whiteSpace:"nowrap", padding:"7px 12px", borderRadius:"8px",
              border: sec===n.id ? `2px solid ${n.color}` : "2px solid transparent",
              background: sec===n.id ? `${n.color}18` : "rgba(30,41,59,0.4)",
              color: sec===n.id ? n.color : S.dimmer, fontSize:"11px", fontWeight:700,
              cursor:"pointer", transition:"all 0.15s", fontFamily:"'JetBrains Mono',monospace" }}>
            {n.icon} {n.title}
          </button>
        ))}
      </div>

      {/* Content */}
      <div ref={ref} style={{ flex:1, overflow:"auto", padding:"16px 14px 100px",
        maxWidth:"740px", margin:"0 auto", width:"100%" }}>

{sec === "basics" && <div>
  <Box title="What Is DNA?" icon="🧬" color={S.blue}>
    <p><strong style={{color:"#60a5fa"}}>DNA (Deoxyribonucleic Acid)</strong> is a molecule in every cell. Shaped like a twisted ladder (double helix). The rungs are 4 chemical letters: <Tag color={S.red}>A</Tag> <Tag color={S.blue}>T</Tag> <Tag color={S.green}>G</Tag> <Tag color={S.gold}>C</Tag></p>
    <p style={{marginTop:"10px"}}>Your genome = 3 billion letters. Scattered throughout are ~20,000 <strong style={{color:"#60a5fa"}}>genes</strong> — instructions for making one protein each.</p>
    <p style={{marginTop:"10px"}}><strong style={{color:"#60a5fa"}}>NOD2 is one gene</strong> on chromosome 16. It builds the NOD2 protein (1,040 amino acids).</p>
    <div style={{background:S.bg3,borderRadius:"10px",padding:"14px",marginTop:"12px",fontFamily:"'JetBrains Mono',monospace",fontSize:"12px",lineHeight:2.2}}>
      <span style={{color:S.dimmer}}>DNA</span> <span style={{color:"#475569"}}>→</span> <span style={{color:"#a78bfa"}}>Gene</span> <span style={{color:"#475569"}}>→ transcribe →</span> <span style={{color:"#60a5fa"}}>mRNA</span> <span style={{color:"#475569"}}>→ translate →</span> <span style={{color:"#34d399"}}>Amino acid chain</span> <span style={{color:"#475569"}}>→ folds →</span> <span style={{color:"#fbbf24"}}>3D Protein</span> <span style={{color:"#475569"}}>→ has →</span> <span style={{color:"#f87171"}}>Binding pocket</span>
    </div>
  </Box>

  <Box title="What Is a Mutation?" icon="🔀" color={S.gold}>
    <p>A mutation = one DNA letter changed → one amino acid changed in the protein.</p>
    <Code>
      <div><span style={{color:"#86efac"}}>Normal at position 702:</span> ...C<span style={{color:"#86efac",fontWeight:800}}>C</span>G... → <strong style={{color:"#86efac"}}>Arginine (R)</strong> charge: +1</div>
      <div style={{marginTop:"4px"}}><span style={{color:"#fca5a5"}}>YOUR gene at position 702:</span> ...C<span style={{color:"#fca5a5",fontWeight:800}}>T</span>G... → <strong style={{color:"#fca5a5"}}>Tryptophan (W)</strong> charge: 0</div>
      <div style={{marginTop:"8px",color:"#fbbf24",fontWeight:700}}>Shorthand: R702W — position 702, Arg→Trp</div>
    </Code>
    <div style={{display:"flex",flexWrap:"wrap",gap:"8px",marginTop:"12px"}}>
      <Aud k="R702W" label="R702W" />
      <Aud k="arginine" label="Arginine" phonetic="ar-juh-neen" />
      <Aud k="tryptophan" label="Tryptophan" phonetic="trip-toe-fan" />
    </div>
    <p style={{marginTop:"12px"}}><strong>Arginine</strong> has +1 charge. <strong>Tryptophan</strong> has 0 charge. This charge loss breaks electrostatic networks spanning the entire protein.</p>
    <p style={{marginTop:"10px",color:S.gold,fontWeight:600}}>⚠️ You're NOT fixing the gene or protein. You're finding drugs that BIND the protein to restore function.</p>
  </Box>

  <Box title="Gene vs Protein — The #1 Confusion" icon="⚠️" color={S.red}>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px",marginTop:"6px"}}>
      <div style={{background:S.bg3,borderRadius:"10px",padding:"14px"}}>
        <div style={{color:S.dim,fontWeight:700,fontSize:"13px",marginBottom:"6px"}}>GENE (DNA)</div>
        <div style={{fontSize:"13px"}}>Flat string of ATCG. Lives in nucleus. Can't dock drugs to it. Not what PyMOL shows.</div>
      </div>
      <div style={{background:"rgba(34,197,94,0.1)",border:"1px solid rgba(34,197,94,0.2)",borderRadius:"10px",padding:"14px"}}>
        <div style={{color:S.green,fontWeight:700,fontSize:"13px",marginBottom:"6px"}}>PROTEIN ✓</div>
        <div style={{fontSize:"13px"}}>3D folded shape with pockets. Lives in cell cytoplasm. This is what PyMOL shows. This is what drugs bind.</div>
      </div>
    </div>
  </Box>

  <Box title="What IS Drug Binding?" icon="💊" color={S.pink}>
    <p>A drug = small molecule (200-500 atoms) that sits in a protein pocket, held by forces:</p>
    <div style={{display:"grid",gap:"8px",marginTop:"12px"}}>
      {[["🤝","Hydrogen bonds","Shared H atom between O/N atoms. ~2-5 kcal/mol each. Like molecular velcro."],
        ["⚡","Electrostatic","+ attracts −. Strongest at ~5-10 kcal/mol. Febuxostat's primary strategy."],
        ["🫧","Hydrophobic","Greasy parts pressed together avoiding water. Bufadienolide's strategy."],
        ["🧲","Van der Waals","Weak (~0.5 kcal/mol) but numerous. Any atom near any atom."]
      ].map(([e,name,desc]) => (
        <div key={name} style={{background:S.bg3,borderRadius:"8px",padding:"12px",display:"flex",gap:"10px",alignItems:"flex-start"}}>
          <span style={{fontSize:"20px",marginTop:"2px"}}>{e}</span>
          <div><div style={{color:"#f9a8d4",fontWeight:700,fontSize:"13px"}}>{name}</div>
            <div style={{color:S.dim,fontSize:"12px",marginTop:"2px"}}>{desc}</div></div>
        </div>
      ))}
    </div>
    <p style={{marginTop:"14px"}}>Sum of ALL forces = <strong style={{color:"#f9a8d4"}}>binding free energy (ΔG)</strong>. More negative = tighter binding = better drug.</p>
  </Box>

  <Box title="🔊 Master Pronunciation Guide" icon="" color={S.cyan}>
    <p style={{marginBottom:"12px",color:S.dim}}>Google Text-to-Speech — tap each to hear correct pronunciation:</p>
    <div style={{display:"flex",flexWrap:"wrap",gap:"6px"}}>
      <Aud k="NOD2" label="NOD2"/>
      <Aud k="muramyl_dipeptide" label="Muramyl Dipeptide" phonetic="myoor-uh-mil"/>
      <Aud k="NF_kappa_B" label="NF-κB" phonetic="en-eff kap-uh bee"/>
      <Aud k="LRR" label="LRR" phonetic="leucine rich repeat"/>
      <Aud k="allosteric" label="Allosteric"/>
      <Aud k="angstrom" label="Ångström" phonetic="ang-strum"/>
      <Aud k="GNINA" label="GNINA" phonetic="guh-nee-nuh"/>
      <Aud k="febuxostat" label="Febuxostat"/>
      <Aud k="bufadienolide" label="Bufadienolide"/>
      <Aud k="peptidoglycan" label="Peptidoglycan"/>
      <Aud k="cytokine" label="Cytokine"/>
      <Aud k="enthalpy" label="Enthalpy"/>
      <Aud k="entropy" label="Entropy"/>
      <Aud k="ADMET" label="ADMET"/>
      <Aud k="FEP" label="FEP"/>
      <Aud k="MBAR" label="MBAR"/>
      <Aud k="RMSD" label="RMSD"/>
      <Aud k="pLDDT" label="pLDDT"/>
      <Aud k="lipinski" label="Lipinski"/>
      <Aud k="TPSA" label="TPSA"/>
      <Aud k="MM_GBSA" label="MM-GBSA"/>
      <Aud k="lennard_jones" label="Lennard-Jones"/>
      <Aud k="scaffold_split" label="Scaffold Split"/>
      <Aud k="bioavailability" label="Bioavailability"/>
      <Aud k="precision_medicine" label="Precision Medicine"/>
      <Aud k="pi_stacking" label="π-stacking"/>
      <Aud k="desolvation" label="Desolvation"/>
      <Aud k="homeostasis" label="Homeostasis"/>
      <Aud k="epithelium" label="Epithelium"/>
      <Aud k="pharmacokinetic" label="Pharmacokinetic"/>
      <Aud k="sigma" label="Sigma (σ)"/>
      <Aud k="delta_delta_G" label="ΔΔG"/>
      <Aud k="gibbs_free_energy" label="Gibbs Free Energy"/>
      <Aud k="TNF_alpha" label="TNF-α"/>
      <Aud k="SPR" label="SPR"/>
      <Aud k="ASP1011" label="ASP1011"/>
      <Aud k="RIPK2" label="RIPK2"/>
      <Aud k="TAK1" label="TAK1"/>
      <Aud k="AlphaFold" label="AlphaFold2"/>
      <Aud k="XGBoost" label="XGBoost"/>
      <Aud k="crohns" label="Crohn's Disease"/>
      <Aud k="interleukin" label="Interleukin"/>
    </div>
  </Box>
</div>}

{sec === "disease" && <div>
  <Box title="Crohn's Disease — The Biology" icon="🩺" color={S.red}>
    <div style={{display:"flex",flexWrap:"wrap",gap:"6px",marginBottom:"14px"}}><Aud k="crohns" label="Crohn's"/><Aud k="epithelium" label="Epithelium"/><Aud k="homeostasis" label="Homeostasis"/></div>
    <p>Your gut = tube lined by <strong style={{color:"#fca5a5"}}>intestinal epithelium</strong>. One side: body. Other side: trillions of bacteria. Immune system patrols 24/7, maintaining <strong style={{color:"#fca5a5"}}>homeostasis</strong> — killing bad bacteria while leaving good ones.</p>
    <p style={{marginTop:"10px"}}><strong style={{color:"#fca5a5"}}>Crohn's</strong> = balance breaks. Immune system attacks the gut wall → chronic inflammation → ulcers → strictures → fistulas → pain. <strong>Incurable. 1 million Americans.</strong></p>
  </Box>

  <Box title="NOD2 — Your Target Protein" icon="🎯" color={S.gold}>
    <div style={{display:"flex",flexWrap:"wrap",gap:"6px",marginBottom:"14px"}}><Aud k="NOD2" label="NOD2"/><Aud k="muramyl_dipeptide" label="MDP"/><Aud k="peptidoglycan" label="Peptidoglycan"/></div>
    <p>NOD2 sits inside intestinal cells. It's a <strong style={{color:"#fbbf24"}}>pattern recognition receptor</strong> — molecular alarm system. Detects bacteria by grabbing <strong>MDP (muramyl dipeptide)</strong>, a fragment from bacterial cell walls (<strong>peptidoglycan</strong>).</p>
    <p style={{marginTop:"10px",color:"#fbbf24",fontWeight:600}}>NOD2 = strongest genetic risk factor for Crohn's. ~40% of patients carry a variant. R702W = 2-3× risk per copy. NO APPROVED DRUGS TARGET NOD2 DIRECTLY.</p>
  </Box>

  <Box title="The Full Signaling Pathway (Figures 1-9)" icon="⚡" color={S.green}>
    <div style={{display:"flex",flexWrap:"wrap",gap:"6px",marginBottom:"14px"}}><Aud k="RIPK2" label="RIPK2"/><Aud k="NF_kappa_B" label="NF-κB"/><Aud k="cytokine" label="Cytokine"/><Aud k="TNF_alpha" label="TNF-α"/></div>
    {[["🦠","Bacteria invade gut wall",S.red],["🧩","Cell walls break → MDP released",S.orange],["🎯","MDP binds NOD2's LRR domain — key fits lock",S.gold],["🔓","NOD2 shape changes → CARD domains exposed","#84cc16"],["⚡","CARD recruits RIPK2 (kinase = adds phosphate groups)",S.green],["🔗","RIPK2 activates TAK1 (signal amplification)","#14b8a6"],["💥","TAK1→IKK→destroys IκBα (NF-κB's lock is removed)",S.cyan],["🏛️","NF-κB enters nucleus — master switch reaches DNA",S.blue],["📢","Turns on cytokine genes: IL-8, TNF-α, IL-6, IL-1β",S.purple],["🛡️","Immune cells recruited → bacteria cleared → resolves","#a855f7"]
    ].map(([e,t,c],i) => (
      <div key={i} style={{display:"flex",alignItems:"flex-start",marginBottom:"4px"}}>
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",marginRight:"12px",minWidth:"34px"}}>
          <div style={{width:"34px",height:"34px",borderRadius:"50%",background:`${c}20`,border:`2px solid ${c}`,
            display:"flex",alignItems:"center",justifyContent:"center",fontSize:"15px"}}>{e}</div>
          {i<9 && <div style={{width:"2px",height:"12px",background:c}}/>}
        </div>
        <div style={{paddingTop:"5px"}}><div style={{color:c,fontWeight:700,fontSize:"13px"}}>{i+1}. {t}</div></div>
      </div>
    ))}
    <p style={{marginTop:"10px",color:"#86efac",fontWeight:600}}>Left side of poster (Fig 2,4,6,8) = working. Right side (Fig 3,5,7,9) = R702W breaking each step.</p>
  </Box>

  <Box title="The R702W Paradox 🤯" icon="💡" color={S.gold}>
    <p style={{fontWeight:700,fontSize:"15px"}}>"If R702W makes NOD2 WEAKER, shouldn't there be LESS inflammation?"</p>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px",marginTop:"14px"}}>
      <div style={{background:"rgba(34,197,94,0.08)",border:"1px solid rgba(34,197,94,0.2)",borderRadius:"10px",padding:"14px"}}>
        <div style={{color:S.green,fontWeight:700,marginBottom:"6px"}}>✅ Working NOD2 (WT)</div>
        <div style={{fontSize:"13px"}}>Bacteria → NOD2 detects fast → controlled response → cleared quickly. <strong>Small fire → caught early → done.</strong></div>
      </div>
      <div style={{background:"rgba(239,68,68,0.08)",border:"1px solid rgba(239,68,68,0.2)",borderRadius:"10px",padding:"14px"}}>
        <div style={{color:S.red,fontWeight:700,marginBottom:"6px"}}>❌ Broken NOD2 (R702W)</div>
        <div style={{fontSize:"13px"}}>Bacteria → NOD2 barely responds → bacteria overgrow → backup systems overreact → MASSIVE damage. <strong>Broken smoke detector → inferno.</strong></div>
      </div>
    </div>
    <Judge q="Why does less NOD2 cause MORE inflammation?" a="NOD2 provides early, proportional bacterial detection. Without it, bacteria overgrow until backup immune pathways activate disproportionately. The compensatory inflammation is excessive and sustained — that's Crohn's pathology." />
  </Box>

  <Box title="79.4 Å — The Allosteric Effect" icon="📏" color={S.purple}>
    <div style={{display:"flex",flexWrap:"wrap",gap:"6px",marginBottom:"14px"}}><Aud k="allosteric" label="Allosteric"/><Aud k="angstrom" label="Ångström"/></div>
    <p>Mutation (HD2) is <strong style={{color:"#c4b5fd"}}>79.4 Å (~8 nm)</strong> from drug binding site (LRR). <strong>Allosteric</strong> = change at one site affects distant site.</p>
    <Code>[CARD]——[NBD]——[HD1]——[<span style={{color:S.red,fontWeight:800}}>HD2 ← R702W</span>]——[<span style={{color:S.green,fontWeight:800}}>LRR ← DRUGS</span>]<br/><span style={{color:S.dimmer}}>←————— 79.4 Å apart —————→</span></Code>
    <p style={{marginTop:"10px"}}>R702W removes +1 charge → breaks salt bridges → disrupts HD2-LRR interface → pocket <strong style={{color:"#c4b5fd"}}>rigidifies</strong>. Less flexible = some drugs can't fit.</p>
  </Box>
</div>}

{sec === "structure" && <div>
  <Box title="Why AlphaFold2?" icon="🏗️" color={S.cyan}>
    <div style={{display:"flex",flexWrap:"wrap",gap:"6px",marginBottom:"14px"}}><Aud k="AlphaFold" label="AlphaFold2"/><Aud k="pLDDT" label="pLDDT"/></div>
    <p>No complete crystal structure of NOD2 exists (only partial 5IRM). <strong style={{color:"#22d3ee"}}>AlphaFold2</strong> (DeepMind, 2020) predicts 3D structures from amino acid sequence. Trained on ~170,000 known structures.</p>
    <p style={{marginTop:"10px"}}>Your structure: UniProt <Tag color={S.cyan}>Q9HC29</Tag>, all 1,040 residues. LRR region <strong style={{color:"#22d3ee"}}>pLDDT {">"} 90</strong> = very high confidence (backbone within ~1 Å of true position).</p>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:"6px",marginTop:"12px"}}>
      {[["90-100","Very high","#22c55e"],["70-90","Confident","#3b82f6"],["50-70","Low","#f59e0b"],["<50","Unreliable","#ef4444"]].map(([r,l,c])=>(
        <div key={r} style={{background:`${c}15`,borderRadius:"6px",padding:"8px",textAlign:"center"}}>
          <div style={{color:c,fontWeight:700,fontSize:"13px"}}>{r}</div><div style={{color:S.dim,fontSize:"11px"}}>{l}</div></div>
      ))}
    </div>
  </Box>

  <Box title="How You Made PyMOL Figures" icon="🖼️" color={S.purple}>
    <Code>
      1. Downloaded AF-Q9HC29-F1-model_v4.pdb from UniProt<br/>
      2. File → Open in PyMOL<br/>
      3. Colored by domain: CARD(red), NBD(orange), HD1(yellow), HD2(green), LRR(blue)<br/>
      4. R702W: Wizard → Mutagenesis → resi 702 → R→W<br/>
      5. show spheres, resi 702 (highlight mutation)<br/>
      6. bg_color white → ray 2400, 1800 → export PNG
    </Code>
    <p style={{marginTop:"10px"}}>Figures 4-9 (RIPK2, TAK1, NF-κB): same process with PDB crystal structures (4C8B, 2EVA, 1VKX).</p>
    <Judge q="How did you make these images?" a="PyMOL visualization of AlphaFold2-predicted structures downloaded from UniProt, since no complete crystal structure exists. Colored by domain, highlighted the mutation site, rendered at high resolution. Downstream proteins used experimental crystal structures from PDB." />
  </Box>
</div>}

{sec === "docking" && <div>
  <Box title="What Is Molecular Docking?" icon="🔑" color={S.gold}>
    <div style={{display:"flex",flexWrap:"wrap",gap:"6px",marginBottom:"14px"}}><Aud k="GNINA" label="GNINA"/><Aud k="CNN" label="CNN"/></div>
    <p>Computationally testing how a drug fits in a protein pocket. Like trying every way a key could sit in a lock, scoring each arrangement.</p>
    <Step n="1" title="Place drug randomly in search box" desc="Random position + orientation inside 30×30×30 Å cube" color={S.gold}/>
    <Step n="2" title="Calculate energy" desc="H-bonds + electrostatics = good; atom overlaps = bad" color={S.gold}/>
    <Step n="3" title="Optimize by wiggling toward lower energy" desc="Gradient descent on energy surface" color={S.gold}/>
    <Step n="4" title="Repeat 32 random starts (exhaustiveness)" desc="32 independent attempts to find best pose" color={S.gold}/>
    <Step n="5" title="CNN rescores top 9 poses" desc="Neural network evaluates patterns from 20,000+ real complexes" color={S.gold}/>
  </Box>

  <Box title="CNN (GNINA) vs Classical (Vina)" icon="🧠" color={S.blue}>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"}}>
      <div style={{background:S.bg3,borderRadius:"10px",padding:"14px"}}>
        <div style={{color:S.dim,fontWeight:700,fontSize:"13px",marginBottom:"6px"}}>Vina (Classical)</div>
        <div style={{fontSize:"13px"}}>Hand-written equation: "H-bond = X pts." Fixed weights. Like a rulebook — works for known situations.</div>
      </div>
      <div style={{background:"rgba(59,130,246,0.1)",border:"1px solid rgba(59,130,246,0.2)",borderRadius:"10px",padding:"14px"}}>
        <div style={{color:S.blue,fontWeight:700,fontSize:"13px",marginBottom:"6px"}}>GNINA (CNN) ✓</div>
        <div style={{fontSize:"13px"}}>Trained on 20,000+ real crystal structures. LEARNED binding patterns. Like a ref who watched 20,000 games.</div>
      </div>
    </div>
    <Code>gnina -r receptor.pdbqt -l ligand.pdbqt \<br/>{"  "}--center_x -35.0 --center_y -11.8 --center_z 24.2 \<br/>{"  "}--size_x 30 --size_y 30 --size_z 30 \<br/>{"  "}--exhaustiveness 32 --cnn_scoring rescore -o output.sdf</Code>
  </Box>

  <Box title="Every Parameter — WHY" icon="⚙️" color={S.gold}>
    {[["Box: 30×30×30 Å","Pocket ~15-20 Å. 30 Å gives 5 Å margin. Too small = miss edge binding. Too big = noise from irrelevant surface."],
      ["Exhaustiveness: 32","Default=8 (15% miss rate). At 32: ~3%. 4× default because LRR pocket is large and irregular."],
      ["9 poses per compound","Top 9 orientations kept. #1 used downstream; having 9 checks for alternative binding modes."],
      ["CNN affinity: 2.47-7.34 kcal/mol","Predicted binding strength. RELATIVE (good for ranking) not ABSOLUTE. That's why MD and FEP are needed."]
    ].map(([p,w]) => (
      <div key={p} style={{background:S.bg3,borderRadius:"10px",padding:"14px",marginBottom:"8px"}}>
        <div style={{color:"#fbbf24",fontWeight:700,fontSize:"13px"}}>{p}</div>
        <div style={{color:S.dim,fontSize:"13px",marginTop:"4px",lineHeight:1.7}}>{w}</div>
      </div>
    ))}
    <Expand q="Exhaustiveness was 8 (default)?" a="~15% miss rate. Across 9,566 compounds = ~1,400 potentially missed leads. The 4× compute cost of 32 is well worth the improved accuracy." />
  </Box>

  <Box title="Docking Results" icon="📊" color={S.gold} border>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"8px"}}>
      <Stat label="Docked" value="9,566" sub="all compounds" color={S.gold}/>
      <Stat label="Mean CNN" value="4.57" sub="kcal/mol" color={S.gold}/>
      <Stat label="Range" value="2.5-7.3" sub="kcal/mol" color={S.gold}/>
    </div>
    <p style={{marginTop:"12px"}}>But docking has ~50% false positive rate. That's why ML (next step) gives a second opinion.</p>
  </Box>
</div>}

{sec === "ml" && <div>
  <Box title="Why ML After Docking?" icon="🤖" color={S.green}>
    <div style={{display:"flex",flexWrap:"wrap",gap:"6px",marginBottom:"14px"}}><Aud k="XGBoost" label="XGBoost"/><Aud k="scaffold_split" label="Scaffold Split"/><Aud k="AUC" label="AUC"/></div>
    <p>Docking ~50% false positives. Protein frozen, water ignored, scoring approximate, entropy underestimated. NOD2-Scout gives a <strong style={{color:"#86efac"}}>second opinion</strong> using 2,050 molecular features.</p>
  </Box>

  <Box title="How XGBoost Works" icon="🌲" color={S.green}>
    <p>A <strong>decision tree</strong> = flowchart with yes/no questions. One tree is weak.</p>
    <p style={{marginTop:"8px"}}><strong style={{color:"#86efac"}}>XGBoost: 100 trees in sequence</strong> (gradient boosting):</p>
    <Step n="1" title="Tree 1 predicts all compounds" desc="Gets some right, some wrong" color={S.green}/>
    <Step n="2" title="Tree 2 focuses on Tree 1's MISTAKES" desc="Learns patterns first tree missed" color={S.green}/>
    <Step n="3" title="Tree 3 fixes what 1+2 still miss" desc="Further refinement" color={S.green}/>
    <Step n="..." title="...repeat 100 times..." desc="Each tree corrects previous ensemble's errors" color={S.green}/>
    <Step n="✓" title="Final = weighted vote of all 100 trees" desc="Far more accurate than any single tree" color={S.green}/>
    <p style={{marginTop:"10px"}}><strong>Your setup:</strong> 100 trees, depth=6, learning rate=0.05 (slow learning prevents overfitting).</p>
    <Expand q="Used a neural network instead?" a="858 examples is FAR too few. Neural nets need thousands-millions. With 858, it would memorize perfectly and fail on new compounds. XGBoost is specifically designed for small tabular datasets." />
  </Box>

  <Box title="Your 2,050 Features" icon="🔢" color={S.green}>
    <p><strong style={{color:"#86efac"}}>Morgan fingerprints (2,040 bits):</strong> Each bit = a molecular substructure. Two similar drugs share many 1-bits.</p>
    <p style={{marginTop:"8px"}}><strong style={{color:"#86efac"}}>10 descriptors:</strong> MW, LogP, TPSA, HBD, HBA, rotatable bonds, rings, aromatic rings, FrCSP3, heavy atoms.</p>
    <p style={{marginTop:"8px"}}><strong>Pseudo-labels:</strong> Top 25% CNN scores → "binder." Bottom 25% → "non-binder." 858 labeled (728 train, 128 test).</p>
  </Box>

  <Box title="🚨 Scaffold Leakage Story" icon="🔍" color={S.red}>
    <p>First model: AUC = <strong style={{color:"#fca5a5",fontSize:"18px"}}>0.998</strong>. RED FLAG.</p>
    <Code>Drug A: benzimidazole, score 6.2 → BINDER<br/>Drug B: benzimidazole, score 6.5 → BINDER<br/><br/><span style={{color:"#fca5a5"}}>Random split: A in train, B in test.</span><br/>Model memorized "benzimidazole=binder" not chemistry.</Code>
    <p style={{marginTop:"10px"}}><strong style={{color:"#86efac"}}>Fix: Scaffold split</strong> — all same-scaffold molecules in same fold. Forces genuine generalization.</p>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"8px",marginTop:"12px"}}>
      <Stat label="Before (fake)" value="0.998" sub="memorization" color={S.red}/>
      <Stat label="After (honest)" value="0.89" sub="generalization" color={S.green}/>
      <Stat label="Shuffled ctrl" value="0.50" sub="proves real signal" color={S.dim}/>
    </div>
    <Judge q="AUC dropped from 0.998 to 0.89 — why is lower better?" a="0.998 was memorization of scaffolds, not chemistry. 0.89 on scaffold-split means genuine generalization to unseen structures. Discovering and fixing leakage was one of the project's most important decisions." />
  </Box>
</div>}

{sec === "admet" && <div>
  <Box title="Why ADMET?" icon="💊" color={S.cyan}>
    <div style={{display:"flex",flexWrap:"wrap",gap:"6px",marginBottom:"14px"}}><Aud k="ADMET" label="ADMET"/><Aud k="pharmacokinetic" label="Pharmacokinetic"/><Aud k="bioavailability" label="Bioavailability"/></div>
    <p>NOD2 is <strong style={{color:"#22d3ee"}}>intracellular</strong> — drugs must survive stomach → absorb from gut → enter blood → cross cell membrane → reach cytoplasm.</p>
    <p style={{marginTop:"8px"}}><strong>A</strong>bsorption • <strong>D</strong>istribution • <strong>M</strong>etabolism • <strong>E</strong>xcretion • <strong>T</strong>oxicity</p>
  </Box>

  <Box title="Every Filter — WHY That Number" icon="🧮" color={S.cyan}>
    {[["MW ≤ 500 Da","Cell membranes have size cutoff for passive diffusion. >500 can't wiggle through lipid bilayer.","Lipinski"],
      ["LogP ≤ 5","LogP 5 = 100,000× more in oil. TOO greasy. Gets stuck in fat. Ideal: 1-3. Febuxostat: 1.81 ✓","Lipinski"],
      ["HBD ≤ 5 / HBA ≤ 10","Each polar group costs energy to cross membranes (desolvation penalty). Too many = can't cross.","Lipinski"],
      ["TPSA ≤ 140 Å²","Total polar surface. >140 = zero oral absorption from gut.","Veber"],
      ["Rotatable bonds ≤ 10","Flexible molecules have entropy cost + poor absorption.","Veber"],
      ["PAINS","~400 chemical liar substructures that show activity in EVERY assay. False positives.","Filter"],
      ["Brenk > 2 alerts","Known toxic substructures: mutagens, liver toxins. Reject.","Filter"]
    ].map(([r,w,s]) => (
      <div key={r} style={{background:S.bg3,borderRadius:"10px",padding:"14px",marginBottom:"8px"}}>
        <div style={{display:"flex",justifyContent:"space-between"}}><span style={{color:"#22d3ee",fontWeight:700,fontSize:"13px"}}>{r}</span><Tag color={S.dimmer}>{s}</Tag></div>
        <div style={{color:S.dim,fontSize:"13px",marginTop:"4px",lineHeight:1.7}}>{w}</div>
      </div>
    ))}
    <p style={{marginTop:"8px"}}><strong style={{color:"#22d3ee"}}>Result: 148/150 passed</strong> (98.7%). High because FDA drugs are already drug-like.</p>
  </Box>
</div>}

{sec === "md" && <div>
  <Box title="What MD Computes" icon="🌊" color={S.pink}>
    <p>Docking = frozen snapshot. MD = <strong style={{color:"#f9a8d4"}}>turn on physics</strong>. For ~217,986 atoms, every 2 femtoseconds:</p>
    <Code>1. Calculate ALL forces (bonds, angles, electrostatics, vdW)<br/>2. F = ma → acceleration<br/>3. v = v + a × Δt<br/>4. x = x + v × Δt<br/>5. Repeat 10,000,000 times (= 20 ns)</Code>
    <p style={{marginTop:"10px"}}>~2 trillion force calculations per run. GPU (H200) does it in ~35 min.</p>
  </Box>

  <Box title="Settings — WHY Each One" icon="⚙️" color={S.pink}>
    <div style={{display:"flex",flexWrap:"wrap",gap:"6px",marginBottom:"14px"}}><Aud k="AMBER" label="AMBER14"/><Aud k="OpenFF" label="OpenFF Sage"/><Aud k="lennard_jones" label="Lennard-Jones"/><Aud k="NVT" label="NVT"/><Aud k="NPT" label="NPT"/></div>
    {[["🌡️ 310 K","37°C = body temp. Must work inside a living human."],
      ["🧂 0.15 M NaCl","Physiological salt. Matches human blood."],
      ["⏱️ 2 fs timestep","H vibrates at ~10 fs. Started at 4 fs → CRASHED (NaN). 2 fs is stable."],
      ["🔁 3 replicates × 20 ns","Different starting velocities. If drug stays in 3/3, robust."],
      ["💧 TIP3P-FB water","3-point model optimized for density. Water mediates drug-protein interactions."],
      ["📐 AMBER14 protein","Best-validated for protein dynamics. Fitted to NMR data."],
      ["🧪 OpenFF Sage drugs","ML-fitted to quantum calculations. Handles exotic scaffolds (steroids, thiazoles)."]
    ].map(([p,w]) => (
      <div key={p} style={{background:S.bg3,borderRadius:"8px",padding:"10px 14px",marginBottom:"6px"}}>
        <div style={{color:"#f9a8d4",fontWeight:700,fontSize:"13px"}}>{p}</div>
        <div style={{color:S.dim,fontSize:"12px",marginTop:"2px"}}>{w}</div>
      </div>
    ))}
    <Expand q="Vacuum (no water)?" a="Protein collapses into a ball. No biological relevance. Water mediates binding, fills pocket, creates desolvation penalties. Like simulating a fish without the ocean." />
    <Expand q="4 fs timestep (what you tried first)?" a="H atoms vibrate too fast. Energy builds up → numerical instability → NaN → crash. Your simulation exploded Jan 1. Fixed by dropping to 2 fs + softening restraints 10×." />
  </Box>

  <Box title="🤯 Apo Discovery: Rigidification" icon="📊" color={S.purple}>
    <div style={{display:"flex",flexWrap:"wrap",gap:"6px",marginBottom:"14px"}}><Aud k="RMSD" label="RMSD"/></div>
    <p>Ran protein alone. Textbook says R702W destabilizes NOD2. <strong style={{color:"#c4b5fd"}}>Your data says the OPPOSITE.</strong></p>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px",marginTop:"12px"}}>
      <div style={{background:"rgba(59,130,246,0.08)",border:"1px solid rgba(59,130,246,0.2)",borderRadius:"12px",padding:"16px",textAlign:"center"}}>
        <div style={{color:S.blue,fontWeight:700}}>Wild-Type</div>
        <div style={{color:S.blue,fontSize:"32px",fontWeight:800,fontFamily:"'JetBrains Mono',monospace"}}>4.05 Å</div>
        <div style={{color:S.dim,fontSize:"11px"}}>RMSD (flexible)</div>
        <div style={{color:S.blue,fontSize:"22px",fontWeight:800,marginTop:"6px"}}>12.6%</div>
        <div style={{color:S.dim,fontSize:"11px"}}>frames {">"} 5 Å</div>
      </div>
      <div style={{background:"rgba(239,68,68,0.08)",border:"1px solid rgba(239,68,68,0.2)",borderRadius:"12px",padding:"16px",textAlign:"center"}}>
        <div style={{color:S.red,fontWeight:700}}>R702W</div>
        <div style={{color:S.red,fontSize:"32px",fontWeight:800,fontFamily:"'JetBrains Mono',monospace"}}>3.27 Å</div>
        <div style={{color:S.dim,fontSize:"11px"}}>RMSD (rigid)</div>
        <div style={{color:S.red,fontSize:"22px",fontWeight:800,marginTop:"6px"}}>0%</div>
        <div style={{color:S.dim,fontSize:"11px"}}>frames {">"} 5 Å</div>
      </div>
    </div>
    <p style={{marginTop:"12px"}}>R702W = <strong style={{color:"#c4b5fd"}}>MORE RIGID</strong>. Locked conformation. Can't flex for induced-fit. Novel unpublished finding.</p>
  </Box>

  <Box title="MD Results — Pocket Occupancy" icon="✅" color={S.green} border>
    <div style={{display:"grid",gap:"8px"}}>
      {[["Febuxostat","70%","~2 H-bonds/frame. Contact: ASP1011 (67%)",S.green],
        ["Bufadienolide","80%","7 contacts >50% each. ARG1034 (82%), ARG1037 (81%)",S.green],
        ["Cysteamine (control)","0%","Left immediately in all 3 replicates. VALIDATES assay.",S.red]
      ].map(([n,v,d,c]) => (
        <div key={n} style={{background:`${c}08`,border:`1px solid ${c}20`,borderRadius:"10px",padding:"14px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div><div style={{color:c,fontWeight:700}}>{n}</div><div style={{color:S.dim,fontSize:"12px"}}>{d}</div></div>
          <div style={{color:c,fontSize:"28px",fontWeight:800,fontFamily:"'JetBrains Mono',monospace"}}>{v}</div>
        </div>
      ))}
    </div>
  </Box>
</div>}

{sec === "fep" && <div>
  <Box title="What FEP Answers" icon="⚡" color={S.orange}>
    <div style={{display:"flex",flexWrap:"wrap",gap:"6px",marginBottom:"14px"}}><Aud k="FEP" label="FEP"/><Aud k="gibbs_free_energy" label="Gibbs Free Energy"/><Aud k="delta_delta_G" label="ΔΔG"/></div>
    <p>MD showed drugs stay bound. FEP gives <strong style={{color:"#fb923c"}}>HOW MUCH R702W changes binding</strong> — a number (ΔΔG in kcal/mol) with error bars and significance.</p>
  </Box>

  <Box title="Free Energy — From Scratch" icon="📐" color={S.orange}>
    <div style={{display:"flex",flexWrap:"wrap",gap:"6px",marginBottom:"14px"}}><Aud k="enthalpy" label="Enthalpy"/><Aud k="entropy" label="Entropy"/></div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"}}>
      <div style={{background:S.bg3,borderRadius:"10px",padding:"14px"}}>
        <div style={{color:S.orange,fontWeight:700}}>Enthalpy (H)</div>
        <div style={{color:S.dim,fontSize:"13px"}}>Energy of interactions. More H-bonds = lower H = better.</div>
      </div>
      <div style={{background:S.bg3,borderRadius:"10px",padding:"14px"}}>
        <div style={{color:S.orange,fontWeight:700}}>Entropy (S)</div>
        <div style={{color:S.dim,fontSize:"13px"}}>Freedom of movement. Binding freezes drug = costs entropy.</div>
      </div>
    </div>
    <div style={{background:S.bg3,borderRadius:"10px",padding:"14px",marginTop:"12px",textAlign:"center",fontFamily:"'JetBrains Mono',monospace",fontSize:"20px",color:S.orange,fontWeight:800}}>G = H − TS</div>
    <p style={{marginTop:"12px"}}>ΔG negative = binds spontaneously. More negative = stronger. <strong>ΔΔG</strong> = how mutation changes ΔG.</p>
  </Box>

  <Box title="Lambda Windows — The Alchemy" icon="🧪" color={S.orange}>
    <p>Morph Arg→Trp gradually across 20 steps. At each λ, run 1 ns MD:</p>
    <div style={{background:S.bg3,borderRadius:"10px",padding:"14px",marginTop:"10px",fontFamily:"'JetBrains Mono',monospace",fontSize:"12px"}}>
      {[0,0.25,0.5,0.75,1.0].map(l => (
        <div key={l} style={{display:"flex",gap:"8px",marginBottom:"4px"}}>
          <span style={{color:S.orange,minWidth:"55px"}}>λ={l.toFixed(2)}</span>
          <div style={{flex:1,height:"16px",borderRadius:"4px",overflow:"hidden",display:"flex",background:"#0d1117"}}>
            <div style={{width:`${(1-l)*100}%`,background:"#22c55e40"}}/>
            <div style={{width:`${l*100}%`,background:"#ef444440"}}/>
          </div>
          <span style={{color:S.dim,fontSize:"11px",minWidth:"110px"}}>{Math.round((1-l)*100)}% Arg / {Math.round(l*100)}% Trp</span>
        </div>
      ))}
    </div>
    <p style={{marginTop:"12px"}}>20 windows × 3 legs × 2 compounds = <strong style={{color:"#fb923c"}}>120 total</strong>. <Aud k="MBAR" label="MBAR"/> combines all data → ΔG.</p>
  </Box>

  <Box title="💥 13 Window Crashes" icon="🔧" color={S.red}>
    <div style={{display:"flex",flexWrap:"wrap",gap:"6px",marginBottom:"14px"}}><Aud k="lennard_jones" label="Lennard-Jones"/></div>
    <p>At high λ (0.75-0.95): Trp atoms almost real but not quite → partial overlap with neighbors → Lennard-Jones energy → infinity → NaN → crash. <strong style={{color:"#fca5a5"}}>Endpoint catastrophe.</strong></p>
    <p style={{marginTop:"10px",color:"#86efac",fontWeight:700}}>Fix: Sequential seeding — chain windows. Each starts from previous window's final coordinates. + halved timestep + 5× longer equilibration.</p>
    <Judge q="How did you handle FEP convergence?" a="Thirteen windows at high lambda failed due to the endpoint catastrophe — partial overlaps during Arg-to-Trp transformation. I developed sequential seeding where each window initializes from the previous window's final coordinates, halved the timestep, and extended equilibration. All 60 windows converged." />
  </Box>
</div>}

{sec === "results" && <div>
  <Box title="THE Key Finding (Figure 16)" icon="🎯" color="#10b981">
    <p style={{textAlign:"center",fontWeight:700,color:"#6ee7b7",fontSize:"15px",marginBottom:"14px"}}>Same protein. Same pocket. Same mutation. Two different outcomes.</p>
    <div style={{display:"grid",gap:"14px"}}>
      <div style={{background:"rgba(239,68,68,0.08)",border:"1px solid rgba(239,68,68,0.2)",borderRadius:"14px",padding:"18px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"10px"}}>
          <div style={{color:S.red,fontWeight:800,fontSize:"17px"}}>Febuxostat</div><Tag color={S.red}>MUTATION-SENSITIVE</Tag>
        </div>
        <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"13px",lineHeight:2}}>
          <div>ΔG(WT) = <span style={{color:S.green}}>-10.36</span> ± 0.18 kcal/mol</div>
          <div>ΔG(R702W) = <span style={{color:S.red}}>-8.02</span> ± 0.19 kcal/mol</div>
          <div style={{marginTop:"4px",color:"#fbbf24",fontWeight:700}}>ΔΔG = +2.34 → ~50× weaker (8σ, p{"<"}0.001)</div>
        </div>
        <p style={{marginTop:"8px",fontSize:"13px"}}>R702W patient needs ~50× more drug. Clinically useless difference.</p>
        <p style={{marginTop:"6px",fontSize:"13px"}}><strong>WHY:</strong> Primary contact ASP1011 (67%) depends on R702's +1 charge network. Charge gone → ASP1011 shifts → H-bond weakens + pocket rigidifies.</p>
      </div>
      <div style={{background:"rgba(34,197,94,0.08)",border:"1px solid rgba(34,197,94,0.2)",borderRadius:"14px",padding:"18px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"10px"}}>
          <div style={{color:S.green,fontWeight:800,fontSize:"17px"}}>Bufadienolide</div><Tag color={S.green}>MUTATION-RESISTANT ✓</Tag>
        </div>
        <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"13px",lineHeight:2}}>
          <div>ΔG(WT) = <span style={{color:S.green}}>-15.22</span> ± 0.26 kcal/mol</div>
          <div>ΔG(R702W) = <span style={{color:S.green}}>-15.66</span> ± 0.26 kcal/mol</div>
          <div style={{marginTop:"4px",color:"#86efac",fontWeight:700}}>ΔΔG = -0.44 → unchanged (1.8σ, NS)</div>
        </div>
        <p style={{marginTop:"8px",fontSize:"13px"}}>Works equally regardless of genotype. Precision medicine candidate.</p>
        <p style={{marginTop:"6px",fontSize:"13px"}}><strong>WHY:</strong> Uses DIFFERENT contacts — ARG1034 (82%), ARG1037 (81%). Hydrophobic steroid binding, NOT electrostatic. R702W charge change doesn't reach these residues.</p>
      </div>
    </div>
    <div style={{background:"rgba(245,158,11,0.1)",border:"1px solid rgba(245,158,11,0.25)",borderRadius:"12px",padding:"16px",marginTop:"14px",textAlign:"center"}}>
      <div style={{color:S.gold,fontWeight:800,fontSize:"16px"}}>💡 Mutation effects are LIGAND-DEPENDENT</div>
      <div style={{color:"#fef3c7",fontSize:"13px",marginTop:"6px"}}>Different drug → different contacts → different sensitivity to same mutation → <strong>precision medicine</strong></div>
    </div>
  </Box>

  <Box title="MM-GBSA vs FEP Disagreement" icon="⚖️" color={S.gold}>
    <div style={{display:"flex",flexWrap:"wrap",gap:"6px",marginBottom:"14px"}}><Aud k="MM_GBSA" label="MM-GBSA"/></div>
    <p>MM-GBSA gave <strong style={{color:S.red}}>OPPOSITE answer</strong> (Febuxostat better in R702W). FEP says weaker.</p>
    <p style={{marginTop:"8px"}}>MM-GBSA uses <strong>implicit solvent</strong> (math equation replaces water). Can't model water reorganization around Arg(+1)→Trp(0) charge change. FEP simulates every water molecule. For charge-changing mutations, <strong style={{color:S.green}}>FEP wins</strong>.</p>
  </Box>

  <Box title="Limitations" icon="⚠️" color={S.gold}>
    {[["Needs experimental validation","SPR binding + NF-κB reporter assays. Next step."],
      ["Only R702W tested","G908R, L1007fs excluded. Each needs 60 more FEP windows."],
      ["AlphaFold prediction","No crystal exists. Mitigated: pLDDT >90 + validated vs 5IRM."],
      ["FEP convergence warnings","13 failed windows fixed. 8σ signal survives imperfect convergence."]
    ].map(([t,d]) => (
      <div key={t} style={{background:S.bg3,borderRadius:"8px",padding:"10px 14px",marginBottom:"6px"}}>
        <div style={{color:S.gold,fontWeight:700,fontSize:"13px"}}>{t}</div>
        <div style={{color:S.dim,fontSize:"12px",marginTop:"2px"}}>{d}</div>
      </div>
    ))}
  </Box>

  <Box title="Conclusions — All 3 Hypotheses Supported" icon="🏆" color="#10b981" border>
    <div style={{display:"grid",gap:"6px"}}>
      {["✅ CNN docking + ML identified binder candidates (AUC 0.89, scaffold-split)",
        "✅ MD confirmed stable binding (70-80% occupancy vs 0% control, 520 ns)",
        "✅ FEP quantified mutation effects (50× weaker vs unchanged, 8σ)"
      ].map(h => <div key={h} style={{background:"rgba(34,197,94,0.08)",borderRadius:"8px",padding:"10px 14px",fontSize:"13px"}}>{h}</div>)}
    </div>
    <div style={{background:"rgba(16,185,129,0.1)",border:"1px solid rgba(16,185,129,0.25)",borderRadius:"10px",padding:"14px",marginTop:"12px"}}>
      <p style={{color:"#6ee7b7",fontWeight:700,fontSize:"14px",fontStyle:"italic",textAlign:"center",margin:0}}>
        "First FEP study on NOD2 mutations. Mutation effects are ligand-dependent — a precision medicine insight for Crohn's treatment."
      </p>
    </div>
  </Box>
</div>}

{sec === "present" && <div>
  <Box title="3-Minute Pitch Structure" icon="🎤" color={S.purple}>
    <p style={{color:S.gold,fontWeight:700,marginBottom:"14px"}}>DON'T MEMORIZE. Know the structure. Let words come naturally.</p>
    {[["🎣 HOOK (20s)","Eye contact. No poster yet.","Last year, 23andMe told me I carry R702W — strongest genetic risk factor for Crohn's. Doctor said can't target the mutation. That stuck with me. Can we find drugs that target NOD2, and does MY mutation change how they work?","#f9a8d4"],
      ["⚗️ PIPELINE (60s)","Turn to poster. Point to Figure 10.","9,566 compounds → GNINA CNN docking → NOD2-Scout ML (AUC 0.89, scaffold-split) → ADMET → 520 ns MD → 120-window FEP.","#c4b5fd"],
      ["🎯 RESULT (40s)","Point to Figure 16. SLOW on numbers.","Febuxostat: ΔΔG +2.34, roughly 50× weaker in R702W. Eight sigma. Bufadienolide: ΔΔG -0.44, not significant. Same pocket, same mutation — one fails, one doesn't.","#86efac"],
      ["🏁 CLOSE (20s)","Turn to judge. Pause.","Mutation effects are ligand-dependent. Screen mutation-RESISTANT binders, not just strong ones. That's precision medicine. First FEP on NOD2 ever.","#fbbf24"]
    ].map(([t,n,txt,c]) => (
      <div key={t} style={{background:`${c}10`,border:`1px solid ${c}25`,borderRadius:"10px",padding:"14px",marginTop:"8px"}}>
        <div style={{color:c,fontWeight:700}}>{t}</div>
        <div style={{color:S.dimmer,fontSize:"11px",marginBottom:"6px"}}>{n}</div>
        <div style={{fontSize:"13px",fontStyle:"italic",lineHeight:1.7}}>"{txt}"</div>
      </div>
    ))}
  </Box>

  <Box title="Body Language" icon="🧍" color={S.cyan}>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"}}>
      <div><div style={{color:S.green,fontWeight:700,fontSize:"13px",marginBottom:"8px"}}>✅ DO</div>
        {["Stand to SIDE of poster","Point with whole hand","Eye contact on key points","Speak SLOWLY on numbers","Pause after key findings","Ask judge's background"].map(t=>(<div key={t} style={{fontSize:"13px",marginBottom:"4px"}}>• {t}</div>))}
      </div>
      <div><div style={{color:S.red,fontWeight:700,fontSize:"13px",marginBottom:"8px"}}>❌ DON'T</div>
        {["Read from poster","Turn back to judge","Say um, like, you know","Rush through results","Apologize for anything","Fidget or cross arms"].map(t=>(<div key={t} style={{fontSize:"13px",marginBottom:"4px"}}>• {t}</div>))}
      </div>
    </div>
  </Box>

  <Box title="📋 Cheat Sheet (tape inside logbook)" icon="" color={S.gold}>
    <Code>
      <span style={{color:S.red}}>HOOK:</span>  23andMe → R702W → can't fix → what if?<br/>
      <span style={{color:S.purple}}>PIPE:</span>  9,566→GNINA→ML→ADMET→MD(520ns)→FEP(120λ)<br/>
      <span style={{color:S.green}}>KEY:</span>   Feb: 50× weaker (8σ). Buf: unaffected (NS).<br/>
      <span style={{color:S.gold}}>WHY:</span>   Ligand-dependent mutation effects → precision med<br/>
      <span style={{color:S.cyan}}>NOVEL:</span> First FEP on NOD2. Novel rigidification mechanism.
    </Code>
  </Box>
</div>}

      </div>
    </div>
  );
}
