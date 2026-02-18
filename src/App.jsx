import { useState, useRef, useEffect } from "react";

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
  text: "#e2e8f0", dim: "#94a3b8", dimmer: "#64748b",
};

function Aud({ k, label, phonetic }) {
  const [p, setP] = useState(false);
  return (
    <button onClick={(e) => { e.stopPropagation(); setP(true); playAudio(k); setTimeout(() => setP(false), 2500); }}
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
      borderRadius:"14px", padding:"20px", marginBottom:"16px" }}>
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
      <div style={{ color:`${color}cc`, fontWeight:700, fontSize:"12px", textTransform:"uppercase", letterSpacing:"0.5px" }}>{label}</div>
      <div style={{ color, fontSize:"26px", fontWeight:800, fontFamily:"'JetBrains Mono',monospace", margin:"4px 0" }}>{value}</div>
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
      lineHeight:1.7, overflowX:"auto", margin:"10px 0", border:"1px solid #21262d", whiteSpace:"pre-wrap" }}>
      {children}
    </div>
  );
}

function Tag({ children, color = S.gold }) {
  return <span style={{ background:`${color}20`, color, padding:"2px 8px",
    borderRadius:"6px", fontSize:"12px", fontWeight:700, fontFamily:"'JetBrains Mono',monospace" }}>{children}</span>;
}

function Versus({ left, right, leftColor = S.dim, rightColor = S.green, leftLabel, rightLabel }) {
  return (
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px",marginTop:"12px"}}>
      <div style={{background:`${leftColor}08`,border:`1px solid ${leftColor}20`,borderRadius:"10px",padding:"14px"}}>
        <div style={{color:leftColor,fontWeight:700,fontSize:"13px",marginBottom:"6px"}}>{leftLabel}</div>
        <div style={{color:S.dim,fontSize:"13px",lineHeight:1.6}}>{left}</div>
      </div>
      <div style={{background:`${rightColor}08`,border:`1px solid ${rightColor}20`,borderRadius:"10px",padding:"14px"}}>
        <div style={{color:rightColor,fontWeight:700,fontSize:"13px",marginBottom:"6px"}}>{rightLabel}</div>
        <div style={{color:S.dim,fontSize:"13px",lineHeight:1.6}}>{right}</div>
      </div>
    </div>
  );
}

function DetailCard({ title, items, color }) {
  return (
    <div style={{background:S.bg3,borderRadius:"10px",padding:"14px",marginBottom:"8px"}}>
      <div style={{color:color||S.gold,fontWeight:700,fontSize:"13px",marginBottom:"8px"}}>{title}</div>
      {items.map(([k,v],i) => (
        <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"3px 0",borderBottom:i<items.length-1?`1px solid ${S.bg}`:undefined}}>
          <span style={{color:S.dim,fontSize:"12px"}}>{k}</span>
          <span style={{color:S.text,fontSize:"12px",fontWeight:600,fontFamily:"'JetBrains Mono',monospace"}}>{v}</span>
        </div>
      ))}
    </div>
  );
}

const NAV = [
  { id:"basics", title:"Foundations", icon:"🧬", color:S.blue },
  { id:"disease", title:"Crohn's & NOD2", icon:"🔬", color:S.red },
  { id:"structure", title:"Structure", icon:"🏗️", color:S.cyan },
  { id:"docking", title:"Docking", icon:"🔑", color:S.gold },
  { id:"ml", title:"ML", icon:"🤖", color:S.green },
  { id:"admet", title:"ADMET", icon:"💊", color:S.cyan },
  { id:"md", title:"MD", icon:"🌊", color:S.pink },
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

      <div style={{ padding:"16px 20px 12px", borderBottom:"1px solid rgba(245,158,11,0.12)",
        background:"rgba(10,14,26,0.95)", backdropFilter:"blur(20px)", position:"sticky", top:0, zIndex:50 }}>
        <h1 style={{ fontSize:"20px", fontWeight:800, fontFamily:"'JetBrains Mono',monospace",
          background:"linear-gradient(135deg,#f59e0b,#ef4444,#a855f7)",
          WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
          NOD2 POSTER MASTERY</h1>
        <p style={{ color:S.dimmer, fontSize:"11px", marginTop:"3px" }}>
          🔈 Tap buttons for Google TTS pronunciation • Click cards to expand • Complete ISEF prep</p>
      </div>

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

      <div ref={ref} style={{ flex:1, overflow:"auto", padding:"16px 14px 100px",
        maxWidth:"780px", margin:"0 auto", width:"100%" }}>

{/* =================== FOUNDATIONS =================== */}
{sec === "basics" && <div>
  <Box title="DNA → Gene → Protein → Drug Target" icon="🧬" color={S.blue}>
    <p><strong style={{color:"#60a5fa"}}>DNA</strong> = double helix molecule in every cell. 3 billion letters: <Tag color={S.red}>A</Tag> <Tag color={S.blue}>T</Tag> <Tag color={S.green}>G</Tag> <Tag color={S.gold}>C</Tag>. Most is non-coding. ~20,000 <strong style={{color:"#60a5fa"}}>genes</strong> = stretches that code for proteins.</p>
    <p style={{marginTop:"10px"}}><strong style={{color:"#60a5fa"}}>Gene → Protein:</strong> Cell reads gene → transcribes to mRNA → ribosome translates mRNA into a chain of amino acids (20 types) → chain folds into 3D shape with pockets, grooves, surfaces.</p>
    <div style={{background:S.bg3,borderRadius:"10px",padding:"14px",marginTop:"12px",fontFamily:"'JetBrains Mono',monospace",fontSize:"12px",lineHeight:2.2}}>
      DNA <span style={{color:"#475569"}}>→</span> <span style={{color:"#a78bfa"}}>Gene (NOD2, chr16)</span> <span style={{color:"#475569"}}>→</span> <span style={{color:"#60a5fa"}}>mRNA</span> <span style={{color:"#475569"}}>→</span> <span style={{color:"#34d399"}}>1,040 amino acids</span> <span style={{color:"#475569"}}>→</span> <span style={{color:"#fbbf24"}}>3D protein</span> <span style={{color:"#475569"}}>→</span> <span style={{color:"#f87171"}}>Has binding pockets</span>
    </div>
    <p style={{marginTop:"12px",color:S.gold,fontWeight:600}}>⚠️ CRITICAL: PyMOL shows PROTEINS (3D folded machines). NOT genes (flat DNA text). Drugs bind PROTEINS, not genes. You are NOT doing gene therapy.</p>
  </Box>

  <Box title="Mutations — What R702W Actually Means" icon="🔀" color={S.gold}>
    <div style={{display:"flex",flexWrap:"wrap",gap:"6px",marginBottom:"12px"}}><Aud k="R702W" label="R702W"/><Aud k="arginine" label="Arginine"/><Aud k="tryptophan" label="Tryptophan"/></div>
    <p>A <strong>point mutation</strong> = one DNA letter changed → one amino acid changed in the folded protein.</p>
    <Code>
      <span style={{color:"#86efac"}}>Normal:</span>  DNA codon C<span style={{color:"#86efac",fontWeight:800}}>C</span>G → Amino acid #702 = <span style={{color:"#86efac",fontWeight:800}}>Arginine (R)</span>  charge: <span style={{color:"#86efac"}}>+1</span>{"\n"}<span style={{color:"#fca5a5"}}>Yours:</span>   DNA codon C<span style={{color:"#fca5a5",fontWeight:800}}>T</span>G → Amino acid #702 = <span style={{color:"#fca5a5",fontWeight:800}}>Tryptophan (W)</span> charge: <span style={{color:"#fca5a5"}}>0</span>{"\n"}{"\n"}<span style={{color:"#fbbf24"}}>R702W = "position 702, Arginine → Tryptophan"</span>
    </Code>
    <p style={{marginTop:"12px"}}><strong>Why charge matters:</strong> Arginine's +1 charge forms <strong>salt bridges</strong> (electrostatic bonds with negatively charged residues). Tryptophan is large, flat, and uncharged. Losing +1 charge at position 702 breaks an electrostatic network that spans HD2 → LRR (79.4 Å). This is why a mutation FAR from the binding site still affects drug binding.</p>
    <p style={{marginTop:"10px"}}><strong>23andMe found you carry R702W.</strong> rs2066844 heterozygous. 2-3× increased Crohn's risk per copy. ~8% of European descent carry at least one copy.</p>
  </Box>

  <Box title="What IS Drug Binding? (The Physics)" icon="💊" color={S.pink}>
    <p>A drug = small organic molecule (200-500 atoms, MW 150-500 Da) that physically occupies a protein pocket. Held in place by non-covalent forces:</p>
    <div style={{display:"grid",gap:"8px",marginTop:"12px"}}>
      {[["⚡","Electrostatic (Coulombic)","Charge-charge attraction. +1 attracts -1. Strongest long-range force. E = kq₁q₂/r. Falls off as 1/r. Febuxostat relies on this (ASP1011 = negative charge).","~3-10 kcal/mol"],
        ["🤝","Hydrogen bonds","Donor (N-H or O-H) shares H with acceptor (N or O lone pair). Directional — angle matters. 2.8-3.2 Å distance. Most important for specificity.","~2-5 kcal/mol"],
        ["🫧","Hydrophobic effect","Nonpolar groups pressed together, releasing ordered water. NOT attraction — it's water's preference. Biggest contributor to binding by total energy. Bufadienolide's steroid ring uses this.","~1-2 kcal/mol per group"],
        ["🧲","Van der Waals (dispersion)","Transient electron cloud fluctuations create instant dipoles. Any atom near any atom. Individually tiny, collectively huge. Follows Lennard-Jones potential.","~0.5-1 kcal/mol each"],
        ["🔄","π-stacking","Aromatic rings stack face-to-face or edge-to-face. Partial charge distribution on flat rings creates attraction. Tryptophan's indole ring does this.","~1-3 kcal/mol"]
      ].map(([e,name,desc,energy]) => (
        <div key={name} style={{background:S.bg3,borderRadius:"8px",padding:"12px",display:"flex",gap:"10px",alignItems:"flex-start"}}>
          <span style={{fontSize:"20px",marginTop:"2px"}}>{e}</span>
          <div style={{flex:1}}><div style={{color:"#f9a8d4",fontWeight:700,fontSize:"13px",display:"flex",justifyContent:"space-between"}}><span>{name}</span><Tag color={S.pink}>{energy}</Tag></div>
            <div style={{color:S.dim,fontSize:"12px",marginTop:"4px",lineHeight:1.6}}>{desc}</div></div>
        </div>
      ))}
    </div>
    <p style={{marginTop:"14px"}}>Sum of ALL forces = <strong style={{color:"#f9a8d4"}}>binding free energy (ΔG)</strong>. More negative ΔG = tighter binding. ΔG = -10 kcal/mol is a strong drug. ΔG = -6 is moderate. ΔG = 0 means no preference.</p>
    <p style={{marginTop:"8px"}}>Fold-change from ΔΔG: <Tag color={S.pink}>K_ratio = e^(ΔΔG/RT)</Tag> where RT = 0.616 kcal/mol at 310 K. So ΔΔG = +2.34 → e^(2.34/0.616) ≈ <strong>44-fold weaker</strong> (~50×).</p>
  </Box>

  <Box title="🔊 Complete Pronunciation Guide" icon="" color={S.cyan}>
    <p style={{marginBottom:"12px",color:S.dim}}>All 94 terms with Google Text-to-Speech. Tap to hear:</p>
    <p style={{color:S.gold,fontWeight:700,fontSize:"12px",marginBottom:"6px"}}>KEY TERMS</p>
    <div style={{display:"flex",flexWrap:"wrap",gap:"6px",marginBottom:"14px"}}>
      <Aud k="NOD2" label="NOD2"/><Aud k="crohns" label="Crohn's"/><Aud k="R702W" label="R702W"/><Aud k="muramyl_dipeptide" label="MDP"/><Aud k="NF_kappa_B" label="NF-κB"/><Aud k="RIPK2" label="RIPK2"/><Aud k="TAK1" label="TAK1"/><Aud k="cytokine" label="Cytokine"/><Aud k="TNF_alpha" label="TNF-α"/><Aud k="peptidoglycan" label="Peptidoglycan"/><Aud k="epithelium" label="Epithelium"/><Aud k="homeostasis" label="Homeostasis"/>
    </div>
    <p style={{color:S.gold,fontWeight:700,fontSize:"12px",marginBottom:"6px"}}>METHODS</p>
    <div style={{display:"flex",flexWrap:"wrap",gap:"6px",marginBottom:"14px"}}>
      <Aud k="GNINA" label="GNINA"/><Aud k="XGBoost" label="XGBoost"/><Aud k="ADMET" label="ADMET"/><Aud k="FEP" label="FEP"/><Aud k="MBAR" label="MBAR"/><Aud k="RMSD" label="RMSD"/><Aud k="RMSF" label="RMSF"/><Aud k="AlphaFold" label="AlphaFold2"/><Aud k="CNN" label="CNN"/><Aud k="pLDDT" label="pLDDT"/><Aud k="AUC" label="AUC"/><Aud k="ROC" label="ROC"/><Aud k="scaffold_split" label="Scaffold Split"/><Aud k="MM_GBSA" label="MM-GBSA"/>
    </div>
    <p style={{color:S.gold,fontWeight:700,fontSize:"12px",marginBottom:"6px"}}>CHEMISTRY</p>
    <div style={{display:"flex",flexWrap:"wrap",gap:"6px",marginBottom:"14px"}}>
      <Aud k="febuxostat" label="Febuxostat"/><Aud k="bufadienolide" label="Bufadienolide"/><Aud k="arginine" label="Arginine"/><Aud k="tryptophan" label="Tryptophan"/><Aud k="allosteric" label="Allosteric"/><Aud k="angstrom" label="Ångström"/><Aud k="lipinski" label="Lipinski"/><Aud k="TPSA" label="TPSA"/><Aud k="LogP" label="LogP"/><Aud k="PAINS" label="PAINS"/><Aud k="desolvation" label="Desolvation"/><Aud k="bioavailability" label="Bioavailability"/><Aud k="pi_stacking" label="π-stacking"/><Aud k="lennard_jones" label="Lennard-Jones"/>
    </div>
    <p style={{color:S.gold,fontWeight:700,fontSize:"12px",marginBottom:"6px"}}>PHYSICS & MATH</p>
    <div style={{display:"flex",flexWrap:"wrap",gap:"6px",marginBottom:"14px"}}>
      <Aud k="gibbs_free_energy" label="Gibbs Free Energy"/><Aud k="enthalpy" label="Enthalpy"/><Aud k="entropy" label="Entropy"/><Aud k="delta_delta_G" label="ΔΔG"/><Aud k="sigma" label="Sigma (σ)"/><Aud k="lambda" label="Lambda (λ)"/><Aud k="thermodynamic" label="Thermodynamic"/><Aud k="boltzmann" label="Boltzmann"/><Aud k="hamiltonian" label="Hamiltonian"/><Aud k="perturbation" label="Perturbation"/><Aud k="equilibration" label="Equilibration"/><Aud k="femtosecond" label="Femtosecond"/><Aud k="nanosecond" label="Nanosecond"/>
    </div>
    <p style={{color:S.gold,fontWeight:700,fontSize:"12px",marginBottom:"6px"}}>SIMULATION</p>
    <div style={{display:"flex",flexWrap:"wrap",gap:"6px"}}>
      <Aud k="AMBER" label="AMBER14"/><Aud k="OpenFF" label="OpenFF Sage"/><Aud k="TIP3P" label="TIP3P-FB"/><Aud k="NPT" label="NPT"/><Aud k="NVT" label="NVT"/><Aud k="force_field" label="Force Field"/><Aud k="soft_core" label="Soft Core"/><Aud k="implicit_solvent" label="Implicit Solvent"/><Aud k="explicit_solvent" label="Explicit Solvent"/><Aud k="induced_fit" label="Induced Fit"/><Aud k="precision_medicine" label="Precision Medicine"/><Aud k="SPR" label="SPR"/><Aud k="ASP1011" label="ASP1011"/><Aud k="ARG1034" label="ARG1034"/><Aud k="minimization" label="Minimization"/>
    </div>
  </Box>
</div>}

{/* =================== DISEASE =================== */}
{sec === "disease" && <div>
  <Box title="Crohn's Disease — Deep Dive" icon="🩺" color={S.red}>
    <div style={{display:"flex",flexWrap:"wrap",gap:"6px",marginBottom:"14px"}}><Aud k="crohns" label="Crohn's"/><Aud k="epithelium" label="Epithelium"/><Aud k="homeostasis" label="Homeostasis"/></div>
    <p>Your gut = a 30-foot tube. Inner wall = single layer of cells called <strong style={{color:"#fca5a5"}}>intestinal epithelium</strong>. One side: sterile body. Other side: ~38 trillion bacteria (microbiome). The immune system maintains <strong style={{color:"#fca5a5"}}>homeostasis</strong> — controlled defense without self-damage.</p>
    <p style={{marginTop:"10px"}}><strong style={{color:"#fca5a5"}}>Crohn's disease:</strong> homeostasis breaks. Immune system attacks the gut wall itself. Chronic, incurable, affects <strong>1 million Americans</strong>. Cycles of remission → flare-up. Can affect any part of GI tract (mouth to anus), most common in terminal ileum.</p>
    <p style={{marginTop:"10px",fontWeight:700}}>Pathology:</p>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px",marginTop:"6px"}}>
      {[["Transmural inflammation","Full-thickness wall involvement, unlike UC (mucosal only)"],["Skip lesions","Patches of disease between normal tissue"],["Granulomas","Clusters of immune cells — diagnostic hallmark"],["Fistulas","Abnormal tunnels between organs"],["Strictures","Scarred, narrowed sections causing obstruction"],["Abscesses","Pockets of infection in bowel wall"]].map(([t,d])=>(
        <div key={t} style={{background:S.bg3,borderRadius:"8px",padding:"10px 12px"}}>
          <div style={{color:"#fca5a5",fontWeight:700,fontSize:"12px"}}>{t}</div>
          <div style={{color:S.dim,fontSize:"11px",marginTop:"2px"}}>{d}</div>
        </div>
      ))}
    </div>
    <p style={{marginTop:"12px"}}>Current treatments: biologics (anti-TNF), immunosuppressants, steroids. ALL treat symptoms. NONE target the genetic cause. That's the gap your project fills.</p>
  </Box>

  <Box title="NOD2 — The Molecular Alarm System" icon="🎯" color={S.gold}>
    <div style={{display:"flex",flexWrap:"wrap",gap:"6px",marginBottom:"14px"}}><Aud k="NOD2" label="NOD2"/><Aud k="muramyl_dipeptide" label="MDP"/><Aud k="peptidoglycan" label="Peptidoglycan"/><Aud k="LRR" label="LRR"/></div>
    <p><strong style={{color:"#fbbf24"}}>NOD2</strong> = Nucleotide-binding Oligomerization Domain-containing protein 2. An <strong>intracellular</strong> pattern recognition receptor (PRR) — lives inside cells, not on the surface.</p>
    <p style={{marginTop:"10px"}}><strong>What it detects:</strong> All bacteria have cell walls made of <strong>peptidoglycan</strong>. When bacteria die (constantly), cell walls break into fragments. One specific fragment = <strong>MDP (muramyl dipeptide)</strong>. MDP is the smallest peptidoglycan fragment that can activate NOD2.</p>
    <p style={{marginTop:"10px"}}><strong>Protein architecture (1,040 amino acids):</strong></p>
    <Code>
      <span style={{color:S.red}}>CARD</span> (1-127) — recruits RIPK2{"\n"}<span style={{color:S.orange}}>NBD</span> (128-434) — binds ATP for activation{"\n"}<span style={{color:S.gold}}>HD1</span> (435-538) — helical linker{"\n"}<span style={{color:S.green}}>HD2</span> (539-743) — <span style={{color:S.red}}>R702W MUTATION HERE</span>{"\n"}<span style={{color:S.blue}}>LRR</span> (744-1040) — <span style={{color:S.green}}>MDP BINDING + DRUG DOCKING HERE</span>
    </Code>
    <p style={{marginTop:"10px",color:"#fbbf24",fontWeight:600}}>NOD2 = strongest single-gene risk factor for Crohn's. R702W = most common variant (~40% of Crohn's patients carry a NOD2 variant). 2-3× risk per copy. Homozygous = 20-40× risk.</p>
  </Box>

  <Box title="Complete Signaling Pathway" icon="⚡" color={S.green}>
    <div style={{display:"flex",flexWrap:"wrap",gap:"6px",marginBottom:"14px"}}><Aud k="RIPK2" label="RIPK2"/><Aud k="TAK1" label="TAK1"/><Aud k="NF_kappa_B" label="NF-κB"/><Aud k="IKK" label="IKK"/><Aud k="IkBa" label="IκBα"/><Aud k="cytokine" label="Cytokine"/><Aud k="TNF_alpha" label="TNF-α"/><Aud k="interleukin" label="Interleukin"/></div>
    <p>This pathway is on your poster (Figures 1-9). Each step activates the next:</p>
    {[["🦠","Bacteria invade through epithelial barrier","Constant in the intestine — your body is never truly sterile",S.red],
      ["🧩","Bacteria die → peptidoglycan fragments → MDP released","MDP = N-acetylmuramyl-L-alanyl-D-isoglutamine",S.orange],
      ["🎯","MDP binds NOD2 LRR domain","Direct physical binding — induces conformational change",S.gold],
      ["🔓","NOD2 oligomerizes → CARD domains exposed","Self-association brings CARD domains together","#84cc16"],
      ["⚡","CARD-CARD interaction recruits RIPK2","RIPK2 = Receptor Interacting Protein Kinase 2",S.green],
      ["🔗","RIPK2 auto-phosphorylates → activates TAK1","TAK1 = Transforming growth factor beta-Activated Kinase 1","#14b8a6"],
      ["💥","TAK1 activates IKK complex → IKK phosphorylates IκBα → proteasome destroys IκBα","IκBα was holding NF-κB captive in the cytoplasm",S.cyan],
      ["🏛️","NF-κB (p65/p50) translocates to nucleus","Free NF-κB enters nucleus and binds DNA",S.blue],
      ["📢","Activates cytokine genes: TNF-α, IL-8, IL-6, IL-1β","These are immune signaling molecules",S.purple],
      ["🛡️","Neutrophils + macrophages recruited → bacteria cleared → inflammation resolves","Proportional response — just enough to handle the threat","#a855f7"]
    ].map(([e,t,d,c],i) => (
      <div key={i} style={{display:"flex",alignItems:"flex-start",marginBottom:"6px"}}>
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",marginRight:"12px",minWidth:"34px"}}>
          <div style={{width:"34px",height:"34px",borderRadius:"50%",background:`${c}20`,border:`2px solid ${c}`,
            display:"flex",alignItems:"center",justifyContent:"center",fontSize:"15px"}}>{e}</div>
          {i<9 && <div style={{width:"2px",height:"14px",background:c}}/>}
        </div>
        <div style={{paddingTop:"5px"}}><div style={{color:c,fontWeight:700,fontSize:"13px"}}>{i+1}. {t}</div>
          <div style={{color:S.dim,fontSize:"12px"}}>{d}</div></div>
      </div>
    ))}
  </Box>

  <Box title="The R702W Paradox — #1 Judge Question" icon="🤯" color={S.gold}>
    <p style={{fontWeight:700,fontSize:"15px",marginBottom:"8px"}}>"If R702W makes NOD2 WEAKER, why MORE inflammation?"</p>
    <Versus leftLabel="✅ Working NOD2 (WT)" rightLabel="❌ Broken NOD2 (R702W)" leftColor={S.green} rightColor={S.red}
      left="Bacteria arrive → NOD2 detects instantly → measured cytokine release → targeted neutrophil response → bacteria cleared in hours → inflammation resolves. Small fire → smoke detector beeps → extinguisher → done."
      right="Bacteria arrive → NOD2 barely responds → bacteria multiply unchecked for days → massive bacterial load → TLR2/4, NLRP3 inflammasome activate → FLOODING of TNF-α, IL-1β → tissue destruction → chronic inflammation → Crohn's. Broken smoke detector → small fire → building fire → 5 fire trucks." />
    <p style={{marginTop:"12px"}}><strong>The paradox resolves:</strong> NOD2 isn't just pro-inflammatory. It's a <strong>CALIBRATOR</strong>. It provides early, proportional detection. Without it, you get late, disproportionate backup responses. Loss of function → gain of uncontrolled inflammation.</p>
    <Judge q="Why does less NOD2 cause MORE inflammation?" a="NOD2 provides calibrated early detection. Without it, bacteria overgrow until cruder backup pathways — TLR2/4, the NLRP3 inflammasome — activate with disproportionate force. The resulting inflammatory cascade is excessive and sustained. This loss-of-function-leads-to-gain-of-inflammation paradox is well-established in the Crohn's literature and is central to why NOD2 variants increase disease risk." />
  </Box>

  <Box title="79.4 Å Allosteric Effect" icon="📏" color={S.purple}>
    <div style={{display:"flex",flexWrap:"wrap",gap:"6px",marginBottom:"14px"}}><Aud k="allosteric" label="Allosteric"/><Aud k="angstrom" label="Ångström"/></div>
    <Code>[CARD]——[NBD]——[HD1]——[<span style={{color:S.red,fontWeight:800}}>HD2 ← R702W</span>]——[<span style={{color:S.green,fontWeight:800}}>LRR ← DRUGS BIND</span>]{"\n"}<span style={{color:S.dimmer}}>←————————— 79.4 Å (7.94 nm) ————————→</span></Code>
    <p style={{marginTop:"10px"}}><strong style={{color:"#c4b5fd"}}>Allosteric</strong> = perturbation at one site propagates to a distant site through the protein structure. The mechanism:</p>
    <Step n="1" title="R702 (Arg, +1) → W702 (Trp, 0)" desc="Positive charge disappears" color={S.purple}/>
    <Step n="2" title="Salt bridges in HD2 break" desc="R702 formed electrostatic bonds with nearby negative residues" color={S.purple}/>
    <Step n="3" title="HD2-LRR interface destabilized" desc="Network of interactions connecting HD2 to LRR disrupted" color={S.purple}/>
    <Step n="4" title="LRR pocket behavior changes" desc="Your MD shows: rigidification, not destabilization" color={S.purple}/>
    <Step n="5" title="Drug binding affected differentially" desc="Electrostatic drugs (Febuxostat) hurt. Hydrophobic drugs (Bufadienolide) unaffected." color={S.purple}/>
    <p style={{marginTop:"10px"}}><strong>This is your novel mechanistic contribution.</strong> Previous literature assumed R702W simply destabilizes. Your MD shows it <em>rigidifies</em> — a qualitatively different mechanism.</p>
  </Box>
</div>}

{/* =================== STRUCTURE =================== */}
{sec === "structure" && <div>
  <Box title="The Structure Problem" icon="🏗️" color={S.cyan}>
    <p>To dock drugs computationally, you need <strong style={{color:"#22d3ee"}}>exact 3D coordinates of every atom</strong> in the protein. Where are the pockets? Where are charged residues? Where can hydrogen bonds form?</p>
    <p style={{marginTop:"10px"}}><strong>Problem:</strong> No complete experimental structure of human NOD2 exists. Only PDB: <Tag color={S.cyan}>5IRM</Tag> — a partial crystal covering ~30% of the protein. Missing most of the LRR domain where you need to dock.</p>
  </Box>

  <Box title="AlphaFold2 — What, How, Why" icon="🤖" color={S.cyan}>
    <div style={{display:"flex",flexWrap:"wrap",gap:"6px",marginBottom:"14px"}}><Aud k="AlphaFold" label="AlphaFold2"/><Aud k="pLDDT" label="pLDDT"/></div>
    <p><strong>What:</strong> AI system by DeepMind (2020) that predicts protein 3D structure from amino acid sequence. Won CASP14 competition with unprecedented accuracy. Revolution in structural biology — made ~200M structures freely available.</p>
    <p style={{marginTop:"10px"}}><strong>How it works:</strong> Takes amino acid sequence → searches for evolutionary relatives (MSA) → feeds through Evoformer neural network (attention mechanism over sequence + structure) → iteratively refines 3D coordinates → outputs PDB file with confidence scores.</p>
    <p style={{marginTop:"10px"}}><strong>Why AlphaFold2 over alternatives:</strong></p>
    <Versus leftLabel="❌ Alternatives" rightLabel="✅ AlphaFold2" leftColor={S.dim} rightColor={S.green}
      left="Homology modeling (SWISS-MODEL): needs >30% sequence identity template. NOD2 has no close homolog with full coverage. RoseTTAFold: good but lower accuracy for large multi-domain proteins."
      right="Handles multi-domain proteins. No template needed. pLDDT >90 in your LRR region = very high confidence. Validated against partial crystal 5IRM where overlap exists." />
    <DetailCard title="Your Structure Setup" color={S.cyan} items={[
      ["UniProt ID","Q9HC29"],["Species","Homo sapiens"],["Total residues","1,040"],["AlphaFold version","v4"],
      ["LRR pLDDT",">90 (very high)"],["CARD pLDDT","65-80 (moderate)"],["File","AF-Q9HC29-F1-model_v4.pdb"],
    ]}/>
    <p style={{marginTop:"10px"}}><strong>For R702W:</strong> Used PyMOL mutagenesis wizard to swap Arg→Trp at position 702. Then energy-minimized the local environment to resolve steric clashes.</p>
    <Judge q="Why not use an experimental structure?" a="No complete experimental structure of human NOD2 exists. PDB 5IRM covers only a fragment and lacks the full LRR domain where drug binding occurs. AlphaFold2 provides the complete 1,040-residue structure with pLDDT >90 in the LRR region, indicating high confidence. I validated the prediction against 5IRM where they overlap — backbone RMSD within 1.5 Å." />
  </Box>
</div>}

{/* =================== DOCKING =================== */}
{sec === "docking" && <div>
  <Box title="What Is Molecular Docking? (From Scratch)" icon="🔑" color={S.gold}>
    <div style={{display:"flex",flexWrap:"wrap",gap:"6px",marginBottom:"14px"}}><Aud k="GNINA" label="GNINA"/><Aud k="CNN" label="CNN"/><Aud k="convolutional" label="Convolutional"/><Aud k="voxelized" label="Voxelized"/></div>
    <p><strong>Molecular docking</strong> = computationally predicting how a small molecule (ligand) binds to a protein (receptor). You try millions of orientations and score each one.</p>
    <p style={{marginTop:"10px",fontWeight:700}}>The physics of each evaluation:</p>
    <Step n="1" title="Place drug in random position + orientation" desc="6 degrees of freedom: x,y,z translation + 3 rotation angles. Plus internal torsions (rotatable bonds)." color={S.gold}/>
    <Step n="2" title="Calculate interaction energy" desc="Sum: H-bond energy + electrostatic energy + hydrophobic contacts + van der Waals − steric clashes − desolvation penalty" color={S.gold}/>
    <Step n="3" title="Move drug slightly, recalculate" desc="Gradient descent: compute ∂E/∂x for each coordinate, move in the direction that lowers energy" color={S.gold}/>
    <Step n="4" title="Repeat until converged (local minimum)" desc="When no small movement improves the score — you've found a local optimum" color={S.gold}/>
    <Step n="5" title="Restart from new random position (Monte Carlo)" desc="Different starting point → different local minimum. You need MANY restarts to find the GLOBAL minimum." color={S.gold}/>
    <p style={{marginTop:"12px"}}>The fundamental challenge: the energy landscape has thousands of local minima. Finding the TRUE best pose = NP-hard problem. More restarts (exhaustiveness) = better chance of finding it.</p>
  </Box>

  <Box title="Why GNINA Over Other Docking Programs?" icon="🧠" color={S.blue}>
    <p>There are many docking programs. Here's why GNINA:</p>
    {[["AutoDock Vina","Most popular. Fast. BUT: hand-crafted scoring function with fixed weights. Works well for common targets but can't adapt to novel pockets like NOD2 (no known ligands exist). Miss rate ~15-25%.","❌ No NOD2-specific training"],
      ["Glide (Schrödinger)","Commercial, expensive ($50K+/year). Very accurate for drug-like molecules. BUT: requires a license and not reproducible in open science.","❌ Commercial/not accessible"],
      ["AutoDock-GPU","GPU-accelerated AutoDock 4. Uses older force field. Faster but less accurate than Vina for scoring.","❌ Older scoring"],
      ["GNINA ✅","Built ON TOP of Vina's search algorithm (same efficient sampling). ADDS a convolutional neural network (CNN) trained on 20,000+ crystal structures from PDB. CNN learns 3D patterns of good binding from real data. Best of both: Vina's search + learned scoring.","✅ CNN scoring + open source"]
    ].map(([name,desc,verdict]) => (
      <div key={name} style={{background:S.bg3,borderRadius:"10px",padding:"14px",marginBottom:"8px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{color:S.gold,fontWeight:700,fontSize:"13px"}}>{name}</span>
          <span style={{fontSize:"11px",color:verdict.startsWith("✅")?S.green:S.dim}}>{verdict}</span>
        </div>
        <div style={{color:S.dim,fontSize:"12px",marginTop:"4px",lineHeight:1.6}}>{desc}</div>
      </div>
    ))}
  </Box>

  <Box title="How GNINA's CNN Scoring Works" icon="🧠" color={S.blue}>
    <p><strong>Classical Vina scoring:</strong> Hand-written equation: E = w₁(gauss) + w₂(repulsion) + w₃(hydrophobic) + w₄(H-bond) + w₅(torsion). 5 terms, fixed weights. Like a recipe that never changes.</p>
    <p style={{marginTop:"10px"}}><strong style={{color:"#60a5fa"}}>GNINA CNN scoring:</strong></p>
    <Step n="1" title="Voxelize the complex" desc="Convert protein-drug 3D structure into a grid of tiny cubes (0.5 Å). Each voxel stores: atom type, charge, hydrophobicity." color={S.blue}/>
    <Step n="2" title="Feed through CNN" desc="3D convolutions detect spatial patterns: 'H-bond donor near acceptor at 2.8Å' or 'aromatic ring parallel to another'" color={S.blue}/>
    <Step n="3" title="Trained on 20,000+ real PDB complexes" desc="Positive examples: real crystal structures. Negative: decoys (wrong poses). Network LEARNED what good binding looks like." color={S.blue}/>
    <Step n="4" title="Output: CNN score + CNN affinity" desc="Score = probability of being a real binding pose (0-1). Affinity = predicted binding strength (kcal/mol)." color={S.blue}/>
    <p style={{marginTop:"12px"}}>For NOD2 (no known ligands), the CNN generalizes from structural similarity to other protein-ligand complexes. Vina can't do this — it uses the same equation regardless of target.</p>
  </Box>

  <Box title="Your Exact Setup + Every Parameter" icon="⚙️" color={S.gold}>
    <Code>gnina -r NOD2_WT.pdbqt -l compound.pdbqt \{"\n"}  --center_x -35.0 --center_y -11.8 --center_z 24.2 \{"\n"}  --size_x 30 --size_y 30 --size_z 30 \{"\n"}  --exhaustiveness 32 --num_modes 9 \{"\n"}  --cnn_scoring rescore \{"\n"}  -o docked_output.sdf</Code>
    {[["Search box center: (-35.0, -11.8, 24.2)","Geometric center of the LRR binding pocket. Found by: loading AlphaFold structure → selecting LRR residues 744-1040 → computing center of mass → manual adjustment to center the deepest pocket."],
      ["Box size: 30 × 30 × 30 Å","LRR pocket is ~15-20 Å across. 30 Å gives 5-7 Å margin on each side. Margin ensures drugs at the pocket edge aren't cut off. Too small (15 Å) = edge drugs penalized. Too big (50 Å) = drugs dock to random surface patches."],
      ["Exhaustiveness: 32","Number of independent random starts. Default = 8 (~15% miss rate for best pose). At 32 = ~3% miss rate. At 64 = ~1% but 8× compute. You chose 32 as optimal cost/accuracy balance for a large irregular pocket."],
      ["num_modes: 9","Keep top 9 poses by energy. Pose #1 feeds downstream analysis. Having 9 lets you check for alternative binding modes (allosteric sites, secondary pockets)."],
      ["cnn_scoring: rescore","Strategy: use Vina's search engine to GENERATE poses (fast, efficient sampling). Then RESCORE each pose with the CNN (accurate evaluation). Alternative 'all' uses CNN during search too — 10× slower with marginal improvement."],
      ["Input: 9,566 compounds","6,758 from e-Drug3D (FDA-approved drug 3D structures) + 2,808 from COCONUT (natural products database). Diverse chemical space covering drugs + natural compounds."]
    ].map(([p,w]) => (
      <div key={p} style={{background:S.bg3,borderRadius:"10px",padding:"14px",marginBottom:"8px"}}>
        <div style={{color:"#fbbf24",fontWeight:700,fontSize:"13px"}}>{p}</div>
        <div style={{color:S.dim,fontSize:"13px",marginTop:"6px",lineHeight:1.7}}>{w}</div>
      </div>
    ))}
    <div style={{display:"flex",flexWrap:"wrap",gap:"6px",marginTop:"10px"}}><Aud k="eDrug3D" label="e-Drug3D"/><Aud k="COCONUT" label="COCONUT"/></div>
  </Box>

  <Box title="Docking Results" icon="📊" color={S.gold} border>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:"8px"}}>
      <Stat label="Compounds" value="9,566" sub="docked" color={S.gold}/>
      <Stat label="Mean CNN" value="4.57" sub="kcal/mol" color={S.gold}/>
      <Stat label="Min" value="2.47" sub="weakest" color={S.dim}/>
      <Stat label="Max" value="7.34" sub="strongest" color={S.green}/>
    </div>
    <p style={{marginTop:"12px"}}>CNN affinities are <strong>relative</strong> (good for ranking) not <strong>absolute</strong> (don't trust exact kcal/mol values). Docking has ~50% false positive rate — that's why ML gives a second opinion, MD tests stability, and FEP quantifies exact energies.</p>
    <Expand q="Docking only without ML/MD/FEP?" a="You'd have ~4,783 false positives mixed with ~4,783 true positives. No way to tell them apart. Experimental testing of all 9,566 would cost ~$500K and take 2+ years. The computational pipeline reduces this to 2 experimentally testable candidates." />
  </Box>
</div>}

{/* =================== ML =================== */}
{sec === "ml" && <div>
  <Box title="Why ML After Docking?" icon="🤖" color={S.green}>
    <div style={{display:"flex",flexWrap:"wrap",gap:"6px",marginBottom:"14px"}}><Aud k="XGBoost" label="XGBoost"/><Aud k="gradient_boosting" label="Gradient Boosting"/></div>
    <p>Docking scores alone have ~50% false positive rate because:</p>
    {[["Protein frozen","Real proteins breathe and flex. Docking treats them as rigid statues."],
      ["Water ignored","Water mediates 60% of protein-drug interactions. Docking deletes all water."],
      ["Scoring approximate","CNN improves on Vina but still can't capture everything (entropy, dynamics)."],
      ["Entropy underestimated","Freezing a flexible drug into one pose costs energy that docking barely accounts for."],
      ["No protein response","Drug binding changes protein shape (induced fit). Docking can't see this."]
    ].map(([t,d]) => (
      <div key={t} style={{background:S.bg3,borderRadius:"8px",padding:"8px 12px",marginBottom:"4px"}}>
        <span style={{color:"#86efac",fontWeight:700,fontSize:"12px"}}>{t}: </span>
        <span style={{color:S.dim,fontSize:"12px"}}>{d}</span></div>
    ))}
    <p style={{marginTop:"10px"}}>NOD2-Scout reanalyzes each compound using <strong style={{color:"#86efac"}}>2,050 chemical features</strong> instead of just one docking score. It catches patterns docking misses.</p>
  </Box>

  <Box title="Why XGBoost Over Other ML Methods?" icon="🌲" color={S.green}>
    {[["Random Forest","Builds trees independently in parallel (bagging). Each tree sees random subset. Good but doesn't focus on hard examples. XGBoost focuses each tree on previous mistakes (boosting) → better performance.","Close second"],
      ["Neural Network / Deep Learning","Learns complex patterns. BUT: needs thousands-millions of examples. You have 858. A neural net would MEMORIZE training data perfectly (AUC=1.0) and fail on new compounds. Massive overfitting.","Way too few examples"],
      ["SVM (Support Vector Machine)","Good for small datasets. BUT: doesn't handle 2,050 mixed features (binary fingerprints + continuous descriptors) as well. No built-in feature importance.","Decent but worse"],
      ["Logistic Regression","Simple, interpretable. BUT: assumes linear decision boundaries. Drug binding is highly non-linear — a drug needs MW < 500 AND LogP < 5 AND the right substructures. Can't capture AND logic.","Too simple"],
      ["XGBoost ✅","Gradient boosted trees. Designed for small tabular datasets. Built-in L1/L2 regularization prevents overfitting. Handles mixed feature types. Each tree corrects previous mistakes. Naturally captures non-linear interactions.","Best for 858 examples"]
    ].map(([name,desc,verdict]) => (
      <div key={name} style={{background:S.bg3,borderRadius:"10px",padding:"14px",marginBottom:"8px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{color:S.green,fontWeight:700,fontSize:"13px"}}>{name}</span>
          <span style={{fontSize:"11px",color:name.includes("✅")?S.green:S.dim}}>{verdict}</span>
        </div>
        <div style={{color:S.dim,fontSize:"12px",marginTop:"4px",lineHeight:1.6}}>{desc}</div>
      </div>
    ))}
  </Box>

  <Box title="How XGBoost Works (Step by Step)" icon="🔧" color={S.green}>
    <p>A <strong>decision tree</strong> splits data with yes/no questions at each node. Like 20 questions.</p>
    <p style={{marginTop:"10px"}}><strong style={{color:"#86efac"}}>Gradient Boosting:</strong> Build trees SEQUENTIALLY. Each new tree focuses specifically on what previous trees got WRONG:</p>
    <Step n="1" title="Initialize: predict mean for everyone" desc="Starting point = average probability across all compounds" color={S.green}/>
    <Step n="2" title="Compute residuals (errors)" desc="For each compound: actual label minus current prediction" color={S.green}/>
    <Step n="3" title="Fit Tree 1 to the RESIDUALS" desc="Learn patterns that predict the errors, not the original labels" color={S.green}/>
    <Step n="4" title="Update predictions: old + learning_rate × Tree 1" desc="Add a small fraction (5%) of Tree 1's correction" color={S.green}/>
    <Step n="5" title="Compute new residuals, fit Tree 2 to those" desc="Tree 2 focuses on what Tree 1 still gets wrong" color={S.green}/>
    <Step n="..." title="Repeat 100 times" desc="Each tree reduces remaining error by a tiny amount" color={S.green}/>
    <Step n="✓" title="Final = sum of all 100 trees' contributions" desc="Ensemble far more accurate than any single tree" color={S.green}/>
    <DetailCard title="Your Hyperparameters" color={S.green} items={[
      ["n_estimators","100 trees"],["max_depth","6 levels per tree"],["learning_rate","0.05 (slow, prevents overfitting)"],
      ["subsample","0.8 (each tree sees 80% of data)"],["colsample_bytree","0.8 (each tree sees 80% of features)"],
      ["reg_alpha","0.1 (L1 regularization)"],["reg_lambda","1.0 (L2 regularization)"],
    ]}/>
  </Box>

  <Box title="Your 2,050 Features — Every Detail" icon="🔢" color={S.green}>
    <div style={{display:"flex",flexWrap:"wrap",gap:"6px",marginBottom:"14px"}}><Aud k="morgan_fingerprint" label="Morgan Fingerprint"/><Aud k="TPSA" label="TPSA"/><Aud k="LogP" label="LogP"/></div>
    <p style={{color:"#86efac",fontWeight:700}}>Morgan Fingerprints (2,040 bits):</p>
    <p>For EACH atom in the molecule: look at all atoms within radius 2 bonds → hash the local chemical environment → map to one of 2,040 bit positions → set that bit to 1. Each bit represents a specific substructure pattern. Two structurally similar drugs share many 1-bits. This is how the model learns "this substructure = binder."</p>
    <p style={{marginTop:"10px",color:"#86efac",fontWeight:700}}>10 Global Descriptors:</p>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"6px",marginTop:"8px"}}>
      {[["MW (Da)","Molecular weight — overall size"],["LogP","Lipophilicity — greasiness (octanol/water partition)"],
        ["TPSA (Å²)","Total polar surface — absorption predictor"],["HBD","H-bond donors (NH, OH groups)"],
        ["HBA","H-bond acceptors (N, O atoms)"],["RotBonds","Rotatable bonds — flexibility"],
        ["Rings","Total ring count"],["AromRings","Aromatic ring count"],
        ["FrCSP3","Fraction sp3 carbons — 3D character"],["HeavyAtoms","Non-hydrogen atom count"]
      ].map(([n,d])=>(
        <div key={n} style={{background:S.bg3,borderRadius:"6px",padding:"6px 10px",display:"flex",justifyContent:"space-between"}}>
          <span style={{color:"#86efac",fontWeight:700,fontSize:"12px"}}>{n}</span>
          <span style={{color:S.dim,fontSize:"11px"}}>{d}</span></div>
      ))}
    </div>
    <p style={{marginTop:"12px"}}><strong>Why both?</strong> Fingerprints = LOCAL patterns (substructures). Descriptors = GLOBAL properties. Model needs both: "this substructure is good, BUT only if MW {"<"} 500 and LogP {"<"} 3."</p>
  </Box>

  <Box title="Training Data — Pseudo-Labeling" icon="🏷️" color={S.gold}>
    <p>You have NO experimental binding data for NOD2. So where do labels come from?</p>
    <Step n="1" title="Rank all 9,566 by CNN affinity score" desc="Sorted highest to lowest" color={S.gold}/>
    <Step n="2" title="Top 25% → label BINDER (positive)" desc="~2,391 compounds" color={S.green}/>
    <Step n="3" title="Bottom 25% → label NON-BINDER (negative)" desc="~2,391 compounds" color={S.red}/>
    <Step n="4" title="Middle 50% → EXCLUDED (ambiguous)" desc="~4,783 compounds too uncertain to label" color={S.dim}/>
    <Step n="5" title="Train/test split: 858 total (728 train, 130 test)" desc="After scaffold-based stratification" color={S.gold}/>
    <Expand q="These labels are fake — model is garbage?" a="Labels are approximate but NOT random. Top-scoring compounds ARE more likely to be real binders. The ML model learns which molecular FEATURES distinguish high-scorers from low-scorers — effectively denoising docking's imperfect scores. The scaffold-split AUC of 0.89 (vs 0.50 shuffled control) proves the model learned REAL chemical patterns, not artifacts." />
  </Box>

  <Box title="🚨 Scaffold Leakage — The Story" icon="🔍" color={S.red}>
    <div style={{display:"flex",flexWrap:"wrap",gap:"6px",marginBottom:"14px"}}><Aud k="scaffold_split" label="Scaffold Split"/><Aud k="AUC" label="AUC"/><Aud k="ROC" label="ROC"/></div>
    <p>First model: <strong style={{color:"#fca5a5",fontSize:"18px"}}>AUC = 0.998</strong>. Alarm bells. In drug discovery, AUC {">"} 0.95 almost always means data leakage.</p>
    <Code><span style={{color:"#86efac"}}>Training set:</span>{"\n"}  Drug A: benzimidazole scaffold → score 6.2 → BINDER{"\n"}  Drug C: quinoline scaffold → score 2.1 → NON-BINDER{"\n"}{"\n"}<span style={{color:"#fca5a5"}}>Test set:</span>{"\n"}  Drug B: benzimidazole scaffold → score 6.5 → BINDER{"\n"}{"\n"}<span style={{color:"#fca5a5"}}>Problem:</span> Model learned "benzimidazole = binder" from Drug A.{"\n"}Sees Drug B in test → "benzimidazole!" → correct!{"\n"}But it memorized a SCAFFOLD, not binding chemistry.{"\n"}For a NEW scaffold it's never seen → random guessing.</Code>
    <p style={{marginTop:"12px",color:"#86efac",fontWeight:700}}>Fix: Scaffold Split Cross-Validation</p>
    <p>ALL molecules sharing the same Murcko scaffold (core ring system) stay in the SAME fold. If benzimidazoles are in training, NO benzimidazoles can be in test. Forces the model to learn from actual chemical PROPERTIES, not scaffold recognition.</p>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"8px",marginTop:"12px"}}>
      <Stat label="Random split" value="0.998" sub="MEMORIZATION" color={S.red}/>
      <Stat label="Scaffold split" value="0.89" sub="GENERALIZATION ✓" color={S.green}/>
      <Stat label="Shuffled labels" value="0.50" sub="RANDOM (control)" color={S.dim}/>
    </div>
    <p style={{marginTop:"12px"}}><strong>Scaffold-split range across folds: 0.85-0.93.</strong> Consistent across all CV folds = robust signal. The shuffled control (AUC = 0.50) proves 0.89 is real — if features were random noise, AUC would be 0.50.</p>
    <p style={{marginTop:"8px"}}><strong>ROC curve:</strong> Plots True Positive Rate vs False Positive Rate at every classification threshold. AUC = area under this curve. 1.0 = perfect. 0.5 = random coin flip. 0.89 = strong discrimination — at 80% sensitivity, ~15% false positive rate.</p>
    <Judge q="AUC dropped from 0.998 to 0.89 — why is lower better?" a="0.998 was scaffold memorization — the model recognized ring systems it had seen, not binding chemistry. 0.89 on scaffold-split means genuine generalization to unseen chemical structures. Discovering and fixing this leakage was one of the most important methodological decisions in the project. The shuffled control at 0.50 confirms the signal is real." />
  </Box>

  <Box title="ML Results Summary" icon="📊" color={S.green} border>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:"8px"}}>
      <Stat label="AUC (scaffold)" value="0.89" sub="± 0.03" color={S.green}/>
      <Stat label="CV range" value="0.85-0.93" sub="across folds" color={S.green}/>
      <Stat label="Shuffled" value="0.50" sub="control" color={S.dim}/>
      <Stat label="Predicted binders" value="2,129" sub="→ ADMET" color={S.gold}/>
    </div>
    <p style={{marginTop:"12px"}}><strong>Top features by importance:</strong> Morgan bit 1847 (aromatic N-heterocycle), LogP, Morgan bit 892 (carboxylate), HBA, MW. The model learned: moderate-sized, moderately lipophilic molecules with specific heterocyclic patterns bind best.</p>
  </Box>
</div>}

{/* =================== ADMET =================== */}
{sec === "admet" && <div>
  <Box title="Why ADMET Matters" icon="💊" color={S.cyan}>
    <div style={{display:"flex",flexWrap:"wrap",gap:"6px",marginBottom:"14px"}}><Aud k="ADMET" label="ADMET"/><Aud k="pharmacokinetic" label="Pharmacokinetic"/><Aud k="bioavailability" label="Bioavailability"/><Aud k="desolvation" label="Desolvation"/></div>
    <p>NOD2 is <strong style={{color:"#22d3ee"}}>intracellular</strong> — in the cytoplasm, NOT on the cell surface. A drug must survive an entire journey:</p>
    <Step n="1" title="Survive stomach acid (pH 1.5-3.5)" desc="Must be chemically stable at extreme pH" color={S.cyan}/>
    <Step n="2" title="Dissolve in intestinal fluid" desc="Must have adequate aqueous solubility" color={S.cyan}/>
    <Step n="3" title="Cross intestinal epithelium" desc="Passive diffusion through lipid bilayer OR active transport" color={S.cyan}/>
    <Step n="4" title="Survive first-pass liver metabolism" desc="CYP450 enzymes try to destroy it. Many drugs fail here." color={S.cyan}/>
    <Step n="5" title="Distribute through bloodstream" desc="Must not bind too tightly to plasma proteins (albumin)" color={S.cyan}/>
    <Step n="6" title="Cross cell membrane to reach cytoplasm" desc="Must be balanced: lipophilic enough to cross, hydrophilic enough to dissolve" color={S.cyan}/>
    <Step n="7" title="Bind NOD2 in cytoplasm" desc="Finally reaches target — IF it survived everything above" color={S.cyan}/>
  </Box>

  <Box title="Every Filter — The Science Behind Each Cutoff" icon="🧮" color={S.cyan}>
    <div style={{display:"flex",flexWrap:"wrap",gap:"6px",marginBottom:"14px"}}><Aud k="lipinski" label="Lipinski"/><Aud k="PAINS" label="PAINS"/><Aud k="Brenk" label="Brenk"/></div>
    {[["MW ≤ 500 Da (Lipinski)","Cell membranes = lipid bilayers ~4 nm thick. Passive diffusion requires the drug to dissolve IN the membrane. Larger molecules have more surface area that must be desolvated (stripped of water). Above ~500 Da, the desolvation energy exceeds the diffusion driving force. Like pushing increasingly large balls through a net.","Febuxostat: 316 Da ✓"],
      ["LogP ≤ 5 (Lipinski)","LogP = log₁₀(concentration in octanol / concentration in water). LogP 5 = 100,000× preference for oil. TOO greasy: sequesters in fat tissue, terrible aqueous solubility, can't dissolve in blood. Too low (LogP < 0) = too polar, can't cross membranes. Sweet spot: 1-3.","Febuxostat: 1.81 ✓"],
      ["HBD ≤ 5 (Lipinski)","Every NH or OH group forms H-bonds with water. To cross a membrane, each must BREAK its water bonds (desolvation penalty ~4-5 kcal/mol per H-bond). More than 5 = too much energy cost to cross.","Febuxostat: 1 ✓"],
      ["HBA ≤ 10 (Lipinski)","N and O atoms accept H-bonds from water. Same desolvation logic. More polar groups = harder to cross the nonpolar membrane interior.","Febuxostat: 4 ✓"],
      ["TPSA ≤ 140 Å² (Veber)","Total polar surface area = sum of all N, O, and attached H atomic surfaces. Above 140 Å² → essentially zero oral absorption (validated across >1,100 drugs). Correlates with paracellular transport barrier.","Febuxostat: 98 Å² ✓"],
      ["Rotatable bonds ≤ 10 (Veber)","Flexible molecules lose more entropy when binding (each frozen rotatable bond costs ~0.5 kcal/mol). Also: flexible drugs have poor oral absorption — they adopt extended conformations that can't cross membranes efficiently.","Febuxostat: 3 ✓"],
      ["PAINS substructures (Baell & Holloway)","~400 known 'promiscuous' substructures that show activity in EVERY assay regardless of target. Examples: quinones (redox cycling), rhodanines (metal chelation), catechols (aggregate formation). These are chemical liars — they seem active but bind everything non-specifically.","2 compounds flagged"],
      ["Brenk alerts > 2","Known toxic or reactive substructures: epoxides (DNA alkylation → mutagenic), alkyl halides (liver damage), nitro groups (reduced to toxic metabolites), Michael acceptors (covalent protein modification). Having > 2 = too risky.","0 flagged"]
    ].map(([rule,why,result]) => (
      <div key={rule} style={{background:S.bg3,borderRadius:"10px",padding:"14px",marginBottom:"8px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{color:"#22d3ee",fontWeight:700,fontSize:"13px"}}>{rule}</span>
          <span style={{color:S.green,fontSize:"11px",fontFamily:"'JetBrains Mono',monospace"}}>{result}</span>
        </div>
        <div style={{color:S.dim,fontSize:"12px",marginTop:"6px",lineHeight:1.7}}>{why}</div>
      </div>
    ))}
  </Box>

  <Box title="ADMET Results" icon="✅" color={S.cyan} border>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"8px"}}>
      <Stat label="Tested" value="150" sub="top candidates" color={S.cyan}/>
      <Stat label="Passed" value="148" sub="98.7%" color={S.green}/>
      <Stat label="Failed" value="2" sub="Brenk alerts" color={S.red}/>
    </div>
    <p style={{marginTop:"12px"}}>High pass rate because: (1) FDA drugs (e-Drug3D) already survived clinical safety testing — they're inherently drug-like, (2) ML pipeline naturally favored drug-like molecules (the training data was enriched for drug-like compounds).</p>
  </Box>
</div>}

{/* =================== MD =================== */}
{sec === "md" && <div>
  <Box title="What Is MD? (The Physics Engine)" icon="🌊" color={S.pink}>
    <p>Docking = frozen photo. <strong style={{color:"#f9a8d4"}}>Molecular Dynamics = a movie</strong>. You turn on physics and watch everything move for nanoseconds.</p>
    <p style={{marginTop:"10px"}}>At EVERY timestep (2 femtoseconds = 0.000000000000002 seconds), for EVERY atom (~217,986):</p>
    <Code>For each atom i (i = 1 to 217,986):{"\n"}  F_i = Σ F_bond + Σ F_angle + Σ F_torsion + Σ F_vdW + Σ F_electrostatic{"\n"}  a_i = F_i / m_i          (Newton's second law){"\n"}  v_i(t+Δt) = v_i(t) + a_i × Δt    (velocity update){"\n"}  x_i(t+Δt) = x_i(t) + v_i(t+Δt) × Δt   (position update){"\n"}{"\n"}Repeat 10,000,000 times → 20 ns of simulation{"\n"}Total force calculations: ~2 × 10¹² per run{"\n"}GPU (NVIDIA H200): ~35 min per 20 ns</Code>
  </Box>

  <Box title="Why MD Over Alternatives?" icon="⚖️" color={S.pink}>
    {[["Docking alone","Protein frozen. No dynamics. ~50% false positive. Can't tell if drug STAYS bound or floats away in 1 nanosecond.","Can't assess stability"],
      ["MM-GBSA (post-docking)","Takes docking poses, minimizes, estimates binding energy. Better than docking score alone BUT: uses implicit solvent (no real water). Endpoint method (only start and end, no path).","Faster but less accurate"],
      ["Normal Mode Analysis","Estimates protein flexibility. Very fast. BUT: assumes harmonic (spring-like) motion — real proteins are anharmonic. Can't capture drug dissociation.","Too simplified"],
      ["MD ✅","Explicit water, explicit ions, full Newtonian dynamics. Captures: induced fit, water-mediated binding, protein breathing, drug dissociation. Gold standard for binding stability.","Full physics simulation"]
    ].map(([name,desc,verdict]) => (
      <div key={name} style={{background:S.bg3,borderRadius:"10px",padding:"14px",marginBottom:"8px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{color:"#f9a8d4",fontWeight:700,fontSize:"13px"}}>{name}</span>
          <span style={{fontSize:"11px",color:name.includes("✅")?S.green:S.dim}}>{verdict}</span>
        </div>
        <div style={{color:S.dim,fontSize:"12px",marginTop:"4px",lineHeight:1.6}}>{desc}</div>
      </div>
    ))}
  </Box>

  <Box title="Your System — What's in the Box" icon="🧪" color={S.pink}>
    <DetailCard title="Simulation Contents" color={S.pink} items={[
      ["NOD2 protein","1,040 residues, ~16,000 atoms"],["Drug molecule","200-500 atoms (varies)"],
      ["Water molecules","~65,000 (TIP3P-FB, ~195,000 atoms)"],["Na⁺ ions","~80 (neutralize + 0.15 M)"],
      ["Cl⁻ ions","~75 (0.15 M NaCl = physiological)"],["TOTAL","~217,986 atoms"],
      ["Box type","Truncated octahedron"],["Box padding","12 Å from protein surface"],
    ]}/>
  </Box>

  <Box title="Force Fields — Why These Three" icon="📐" color={S.pink}>
    <div style={{display:"flex",flexWrap:"wrap",gap:"6px",marginBottom:"14px"}}><Aud k="AMBER" label="AMBER14"/><Aud k="OpenFF" label="OpenFF Sage"/><Aud k="TIP3P" label="TIP3P-FB"/><Aud k="force_field" label="Force Field"/><Aud k="lennard_jones" label="Lennard-Jones"/></div>
    <p>A <strong>force field</strong> = set of equations + parameters describing how every atom interacts with every other atom. Like the rules of a physics engine.</p>
    {[["AMBER ff14SB — Protein","Developed at UCSF over 30 years. Parameters fitted to reproduce NMR J-couplings, chemical shifts, and order parameters. Best-validated for protein backbone φ/ψ dihedral sampling and side-chain rotamer populations. '14' = 2014 revision, 'SB' = side-chain balanced. WHY NOT CHARMM36m? Both excellent — AMBER14 has slightly better compatibility with OpenFF for mixed systems."],
      ["OpenFF 2.1.0 Sage — Drug molecules","Uses machine learning fitted to high-level quantum mechanical calculations (B3LYP-D3BJ/DZVP). Handles diverse scaffolds including unusual chemistry: Bufadienolide's steroid ring, Febuxostat's thiazole-carboxylate. WHY NOT GAFF2? GAFF2 has known issues with exotic heterocycles — parameterized from older, limited QM data. OpenFF was specifically designed for drug-like diversity."],
      ["TIP3P-FB — Water","3-site water model (O + 2H). 'FB' = Force Balance re-optimization for correct density (0.997 g/mL at 298K) and self-diffusion coefficient. WHY NOT TIP4P? TIP4P is more accurate for some properties but 33% more expensive (extra virtual site) and compatibility issues with AMBER14."]
    ].map(([t,d]) => (
      <div key={t} style={{background:S.bg3,borderRadius:"10px",padding:"14px",marginBottom:"8px"}}>
        <div style={{color:"#f9a8d4",fontWeight:700,fontSize:"13px"}}>{t}</div>
        <div style={{color:S.dim,fontSize:"12px",marginTop:"6px",lineHeight:1.7}}>{d}</div>
      </div>
    ))}
  </Box>

  <Box title="Protocol — Every Step with WHY" icon="📋" color={S.pink}>
    <div style={{display:"flex",flexWrap:"wrap",gap:"6px",marginBottom:"14px"}}><Aud k="minimization" label="Minimization"/><Aud k="NVT" label="NVT"/><Aud k="NPT" label="NPT"/><Aud k="equilibration" label="Equilibration"/><Aud k="femtosecond" label="Femtosecond"/><Aud k="nanosecond" label="Nanosecond"/></div>
    <Step n="1" title="Energy Minimization (1000 steps steepest descent)" desc="Remove atom overlaps from initial placement. Without this → forces spike to infinity → immediate crash. Steepest descent follows energy gradient downhill." color={S.pink}/>
    <Step n="2" title="NVT Heating (100 ps, 10K→310K)" desc="Constant Volume + Temperature. Protein heavy atoms restrained (1000 kJ/mol/nm²). Water settles around protein. Temperature ramped linearly. Like slowly heating a bath before you get in." color={S.pink}/>
    <Step n="3" title="NPT Equilibration (500 ps, 310K, 1 atm)" desc="Constant Pressure + Temperature. Restraints reduced 10×. Box adjusts volume to reach 1 atm. System finds natural density." color={S.pink}/>
    <Step n="4" title="NPT Production (20 ns × 3 replicates, 310K)" desc="ALL restraints removed. Everything moves freely. Save coordinates every 10 ps = 2,000 frames per run. THIS is your data." color={S.pink}/>
    {[["🌡️ 310 K = 37°C","Body temperature. Drug must work inside a living human. 300K (room temp) gives different dynamics — protein is slightly less flexible."],
      ["🧂 0.15 M NaCl","Physiological salt. Na⁺/Cl⁻ screen electrostatic interactions to realistic distances. Without ions → artificially strong charge-charge forces."],
      ["⏱️ 2 fs timestep","H atoms vibrate at ~10 fs period (fastest motion). Nyquist theorem: timestep must be < ½ × fastest period. Started at 4 fs → simulation exploded (NaN). 2 fs is the safe standard with SHAKE constraints on H bonds."],
      ["🔁 3 replicates","Different random velocities (seeds) each time. If drug stays bound in 3/3 → robust. If 1/3 → borderline. Captures stochastic variation."],
      ["⏳ 20 ns each","Long enough to see: binding stability, major conformational changes, drug dissociation. Short enough to be practical (~35 min/run on H200). Total: 60 ns per compound × 3 compounds + apo = 520 ns total."]
    ].map(([p,w]) => (
      <div key={p} style={{background:S.bg3,borderRadius:"8px",padding:"10px 14px",marginBottom:"6px"}}>
        <div style={{color:"#f9a8d4",fontWeight:700,fontSize:"13px"}}>{p}</div>
        <div style={{color:S.dim,fontSize:"12px",marginTop:"2px",lineHeight:1.6}}>{w}</div>
      </div>
    ))}
    <Expand q="Vacuum (no water)?" a="Protein collapses into a ball within 1 ns. Hydrophobic core inverts. No biological relevance. Water mediates ~60% of protein-drug interactions, creates the hydrophobic effect, screens electrostatics. Removing water is like studying a fish without the ocean." />
    <Expand q="4 fs timestep (what you tried)?" a="H atoms vibrate at ~10 fs. With 4 fs timestep, you can't resolve these oscillations. Energy accumulates in high-frequency modes → numerical instability → coordinates become NaN → simulation crashes. This happened to you on January 1st. Fixed by dropping to 2 fs." />
    <Expand q="1 replicate instead of 3?" a="MD has stochastic elements (random initial velocities). One run might show the drug staying bound purely by chance. Three replicates with different seeds: if 3/3 agree, the result is robust. If 1/3 disagrees, there's a problem. Statistical rigor demands ≥3." />
  </Box>

  <Box title="🤯 Apo Discovery: Rigidification (Novel Finding)" icon="📊" color={S.purple}>
    <div style={{display:"flex",flexWrap:"wrap",gap:"6px",marginBottom:"14px"}}><Aud k="RMSD" label="RMSD"/><Aud k="RMSF" label="RMSF"/></div>
    <p><strong>Apo simulations</strong> = protein alone (no drug). WT vs R702W. 20 ns × 3 replicates each.</p>
    <p style={{marginTop:"8px"}}><strong>RMSD</strong> = Root Mean Square Deviation. Measures how far protein moves from starting structure over time. Higher = more flexible.</p>
    <p style={{marginTop:"8px"}}><strong>RMSF</strong> = Root Mean Square Fluctuation. Per-residue flexibility. Shows WHICH parts move most.</p>
    <p style={{marginTop:"8px"}}>Literature says R702W <em>destabilizes</em> NOD2. <strong style={{color:"#c4b5fd",fontSize:"16px"}}>Your data shows the OPPOSITE.</strong></p>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px",marginTop:"14px"}}>
      <div style={{background:"rgba(59,130,246,0.08)",border:"1px solid rgba(59,130,246,0.2)",borderRadius:"12px",padding:"16px",textAlign:"center"}}>
        <div style={{color:S.blue,fontWeight:700,marginBottom:"8px"}}>Wild-Type (WT)</div>
        <div style={{color:S.blue,fontSize:"36px",fontWeight:800,fontFamily:"'JetBrains Mono',monospace"}}>4.05 Å</div>
        <div style={{color:S.dim,fontSize:"11px"}}>Average RMSD</div>
        <div style={{color:S.blue,fontSize:"24px",fontWeight:800,marginTop:"8px"}}>12.6%</div>
        <div style={{color:S.dim,fontSize:"11px"}}>Frames exceeding 5 Å</div>
        <div style={{color:S.blue,fontSize:"14px",fontWeight:600,marginTop:"8px"}}>FLEXIBLE ↕</div>
      </div>
      <div style={{background:"rgba(239,68,68,0.08)",border:"1px solid rgba(239,68,68,0.2)",borderRadius:"12px",padding:"16px",textAlign:"center"}}>
        <div style={{color:S.red,fontWeight:700,marginBottom:"8px"}}>R702W Mutant</div>
        <div style={{color:S.red,fontSize:"36px",fontWeight:800,fontFamily:"'JetBrains Mono',monospace"}}>3.27 Å</div>
        <div style={{color:S.dim,fontSize:"11px"}}>Average RMSD</div>
        <div style={{color:S.red,fontSize:"24px",fontWeight:800,marginTop:"8px"}}>0%</div>
        <div style={{color:S.dim,fontSize:"11px"}}>Frames exceeding 5 Å</div>
        <div style={{color:S.red,fontSize:"14px",fontWeight:600,marginTop:"8px"}}>RIGID 🔒</div>
      </div>
    </div>
    <p style={{marginTop:"14px"}}><strong style={{color:"#c4b5fd"}}>R702W makes NOD2 MORE RIGID, not destabilized.</strong> Protein gets locked. Can't flex for induced-fit binding. RMSF shows the entire LRR region has reduced fluctuations in the mutant. This rigidification propagates 79.4 Å from the mutation site — a novel allosteric mechanism that's UNPUBLISHED.</p>
    <p style={{marginTop:"8px"}}>This explains the differential drug response: drugs requiring pocket flexibility (Febuxostat) are hurt. Drugs that fit a rigid pocket (Bufadienolide's flat steroid) are fine.</p>
  </Box>

  <Box title="MD Results — Drug Binding Stability" icon="✅" color={S.green} border>
    <p><strong>Pocket occupancy</strong> = % of frames where drug center-of-mass is within 5 Å of pocket geometric center. Higher = drug stays more stably.</p>
    <div style={{display:"grid",gap:"10px",marginTop:"12px"}}>
      {[["Febuxostat (WT)","70%","~2 H-bonds/frame avg. Primary contact: ASP1011 (67% occupancy). Secondary: LEU987 (45%), PHE1004 (38%). Electrostatic + H-bond driven binding.",S.green,"Stable binder"],
        ["Bufadienolide (WT)","80%","7 contacts >50% each. Primary: ARG1034 (82%), ARG1037 (81%). Hydrophobic + π-stacking driven. More contacts = more stable = higher occupancy.",S.green,"Very stable binder"],
        ["Cysteamine (WT) — NEGATIVE CONTROL","0%","Ranked #2,056/2,129 by ML. Left pocket within first 500 ps in ALL 3 replicates. Zero sustained contacts. Validates entire pipeline — low-ranked compounds genuinely don't bind.",S.red,"Validates assay"]
      ].map(([n,v,d,c,tag]) => (
        <div key={n} style={{background:`${c}08`,border:`1px solid ${c}20`,borderRadius:"12px",padding:"16px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px"}}>
            <div style={{color:c,fontWeight:700,fontSize:"14px"}}>{n}</div>
            <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
              <Tag color={c}>{tag}</Tag>
              <div style={{color:c,fontSize:"28px",fontWeight:800,fontFamily:"'JetBrains Mono',monospace"}}>{v}</div>
            </div>
          </div>
          <div style={{color:S.dim,fontSize:"12px",lineHeight:1.7}}>{d}</div>
        </div>
      ))}
    </div>
    <DetailCard title="Total Simulation Statistics" color={S.pink} items={[
      ["Total simulation time","520+ nanoseconds"],["Total atoms simulated","~217,986 per system"],
      ["Total force calculations","~2 × 10¹³ across all runs"],["Replicates per condition","3"],
      ["Frames analyzed","~31,200 total (2,000/run × ~15 runs)"],["GPU","NVIDIA H200"],
    ]}/>
  </Box>
</div>}

{/* =================== FEP =================== */}
{sec === "fep" && <div>
  <Box title="What FEP Answers — And Why You Need It" icon="⚡" color={S.orange}>
    <div style={{display:"flex",flexWrap:"wrap",gap:"6px",marginBottom:"14px"}}><Aud k="FEP" label="FEP"/><Aud k="perturbation" label="Perturbation"/><Aud k="gibbs_free_energy" label="Gibbs Free Energy"/></div>
    <p>MD showed "drugs stay bound." But <strong>HOW MUCH</strong> does R702W change binding? You need:</p>
    <p style={{marginTop:"8px"}}>1. A <strong>number</strong> (ΔΔG in kcal/mol) — not just "stays" or "leaves"</p>
    <p>2. <strong>Error bars</strong> (± uncertainty) — is the difference real or noise?</p>
    <p>3. <strong>Statistical significance</strong> (how many σ from zero?) — could this be random?</p>
    <p style={{marginTop:"10px"}}><strong style={{color:"#fb923c"}}>FEP = Free Energy Perturbation</strong>. The gold standard for computing binding energy changes. Used by Schrödinger ($60K/year software), Pfizer, Merck, and top academic labs. Industry accuracy: ΔΔG within ~1 kcal/mol of experiment for 80% of cases.</p>
  </Box>

  <Box title="Why FEP Over Alternatives?" icon="⚖️" color={S.orange}>
    {[["MM-GBSA","Endpoint method: take start/end structures, minimize, compute energy with implicit solvent. Fast (~minutes). BUT: implicit solvent CANNOT model water reorganization around charge changes (Arg+→Trp⁰). Gave OPPOSITE answer for Febuxostat.","WRONG for charge mutations"],
      ["MM-PBSA","Same as GBSA but Poisson-Boltzmann solvent. More accurate but still implicit. Same fundamental limitation: no explicit water dynamics.","Still implicit solvent"],
      ["TI (Thermodynamic Integration)","Computes ∂G/∂λ at each window, then integrates. Similar accuracy to FEP but requires smooth ∂G/∂λ curve. More sensitive to window spacing.","Good alternative"],
      ["FEP + MBAR ✅","Computes ΔG using ALL data from ALL windows simultaneously (MBAR estimator). Most statistically efficient. Handles non-smooth energy landscapes better. Gold standard.","Most accurate + efficient"]
    ].map(([name,desc,verdict]) => (
      <div key={name} style={{background:S.bg3,borderRadius:"10px",padding:"14px",marginBottom:"8px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{color:S.orange,fontWeight:700,fontSize:"13px"}}>{name}</span>
          <span style={{fontSize:"11px",color:name.includes("✅")?S.green:S.dim}}>{verdict}</span>
        </div>
        <div style={{color:S.dim,fontSize:"12px",marginTop:"4px",lineHeight:1.6}}>{desc}</div>
      </div>
    ))}
  </Box>

  <Box title="Free Energy — The Math From Scratch" icon="📐" color={S.orange}>
    <div style={{display:"flex",flexWrap:"wrap",gap:"6px",marginBottom:"14px"}}><Aud k="enthalpy" label="Enthalpy"/><Aud k="entropy" label="Entropy"/><Aud k="delta_delta_G" label="ΔΔG"/><Aud k="boltzmann" label="Boltzmann"/></div>
    <p><strong style={{color:"#fb923c"}}>Gibbs free energy (G)</strong> determines whether a process happens spontaneously:</p>
    <div style={{background:S.bg3,borderRadius:"10px",padding:"16px",marginTop:"12px",textAlign:"center"}}>
      <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"22px",color:S.orange,fontWeight:800}}>G = H − TS</div>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px",marginTop:"12px"}}>
      <div style={{background:S.bg3,borderRadius:"10px",padding:"14px"}}>
        <div style={{color:S.orange,fontWeight:700}}>H = Enthalpy</div>
        <div style={{color:S.dim,fontSize:"12px",marginTop:"4px"}}>Energy of molecular interactions. H-bonds, electrostatics, vdW. More bonds formed = lower H = favorable. When drug binds, it forms new interactions → H decreases.</div>
      </div>
      <div style={{background:S.bg3,borderRadius:"10px",padding:"14px"}}>
        <div style={{color:S.orange,fontWeight:700}}>S = Entropy</div>
        <div style={{color:S.dim,fontSize:"12px",marginTop:"4px"}}>Number of accessible states. More freedom = higher S = favorable. When drug binds, it loses freedom (frozen in pocket) → S decreases → −TS increases → UNFAVORABLE. Binding always costs entropy.</div>
      </div>
    </div>
    <p style={{marginTop:"14px"}}><strong>ΔG of binding:</strong> Drug binds if ΔH (good interactions) outweighs −TΔS (entropy cost). ΔG = ΔH − TΔS {"<"} 0 = spontaneous binding.</p>
    <p style={{marginTop:"10px"}}><strong>ΔΔG = ΔG(R702W) − ΔG(WT):</strong></p>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"8px",marginTop:"8px"}}>
      <div style={{background:S.bg3,borderRadius:"8px",padding:"10px",textAlign:"center"}}><div style={{color:S.red,fontWeight:700,fontSize:"12px"}}>ΔΔG {">"} 0</div><div style={{color:S.dim,fontSize:"11px"}}>Mutation WEAKENS binding</div></div>
      <div style={{background:S.bg3,borderRadius:"8px",padding:"10px",textAlign:"center"}}><div style={{color:S.dim,fontWeight:700,fontSize:"12px"}}>ΔΔG ≈ 0</div><div style={{color:S.dim,fontSize:"11px"}}>Mutation has NO effect</div></div>
      <div style={{background:S.bg3,borderRadius:"8px",padding:"10px",textAlign:"center"}}><div style={{color:S.green,fontWeight:700,fontSize:"12px"}}>ΔΔG {"<"} 0</div><div style={{color:S.dim,fontSize:"11px"}}>Mutation STRENGTHENS</div></div>
    </div>
    <p style={{marginTop:"12px"}}><strong>Fold-change:</strong> <Tag color={S.orange}>K_ratio = e^(ΔΔG / RT)</Tag> where RT = 0.616 kcal/mol at 310K. So ΔΔG = +2.34 → e^(2.34/0.616) = e^3.8 ≈ <strong>44-fold</strong> (~50×) weaker.</p>
  </Box>

  <Box title="The Thermodynamic Cycle" icon="🔄" color={S.orange}>
    <p>You CAN'T compute ΔG_binding directly (it's a high-dimensional integral over ~650,000 coordinates). FEP uses a trick — the thermodynamic cycle:</p>
    <Code>{"                    ΔG_bind(WT)"}{"\n"}{"Drug + WT-NOD2  ──────────────→  Drug:WT complex"}{"\n"}{"      │                                    │"}{"\n"}{"      │ ΔG_mutate(free)                    │ ΔG_mutate(bound)"}{"\n"}{"      ↓                                    ↓"}{"\n"}{"Drug + R702W    ──────────────→  Drug:R702W complex"}{"\n"}{"                    ΔG_bind(R702W)"}{"\n"}{"\n"}<span style={{color:"#fb923c",fontWeight:700}}>ΔΔG = ΔG_mutate(bound) − ΔG_mutate(free)</span></Code>
    <p style={{marginTop:"12px"}}>Instead of computing absolute binding (impossible), compute the energy of MUTATING the protein — once with drug, once without. The difference tells you how the mutation changes binding. This cancels out most systematic errors.</p>
  </Box>

  <Box title="Lambda Windows — The Alchemy" icon="🧪" color={S.orange}>
    <div style={{display:"flex",flexWrap:"wrap",gap:"6px",marginBottom:"14px"}}><Aud k="lambda" label="Lambda"/><Aud k="MBAR" label="MBAR"/><Aud k="alchemical" label="Alchemical"/><Aud k="soft_core" label="Soft Core"/></div>
    <p>You can't flip Arg→Trp instantly (infinite energy). Morph <strong>gradually</strong> using coupling parameter <strong style={{color:"#fb923c"}}>λ</strong>:</p>
    <div style={{background:S.bg3,borderRadius:"10px",padding:"14px",marginTop:"10px",fontFamily:"'JetBrains Mono',monospace",fontSize:"12px"}}>
      {[0,0.05,0.1,0.2,0.35,0.5,0.65,0.8,0.9,0.95,1.0].map(l => (
        <div key={l} style={{display:"flex",gap:"8px",marginBottom:"3px",alignItems:"center"}}>
          <span style={{color:S.orange,minWidth:"55px"}}>λ={l.toFixed(2)}</span>
          <div style={{flex:1,height:"14px",borderRadius:"4px",overflow:"hidden",display:"flex",background:"#0d1117"}}>
            <div style={{width:`${(1-l)*100}%`,background:"#22c55e40"}}/>
            <div style={{width:`${l*100}%`,background:"#ef444440"}}/>
          </div>
          <span style={{color:S.dim,fontSize:"11px",minWidth:"120px"}}>{Math.round((1-l)*100)}% Arg / {Math.round(l*100)}% Trp</span>
        </div>
      ))}
    </div>
    <p style={{marginTop:"12px"}}>At λ=0.5: residue 702 is a ghost hybrid — half Arg, half Trp. Doesn't exist in nature. But it's a mathematical tool for smoothly connecting the two endpoints.</p>
    <DetailCard title="Your FEP Setup" color={S.orange} items={[
      ["Windows per leg","20 (λ = 0.0, 0.05, 0.10 ... 0.95, 1.0)"],
      ["Legs","3 per drug (WT complex, R702W complex, solvent)"],
      ["Drugs tested","2 (Febuxostat, Bufadienolide)"],
      ["Total windows","120 (20 × 3 × 2)"],
      ["MD per window","1 ns production + 500 ps equilibration"],
      ["Total FEP compute","~180 ns"],
      ["Estimator","MBAR (Multistate Bennett Acceptance Ratio)"],
      ["Energy analysis","pymbar + alchemlyb packages"],
    ]}/>
  </Box>

  <Box title="💥 13 Window Crashes + Fix" icon="🔧" color={S.red}>
    <div style={{display:"flex",flexWrap:"wrap",gap:"6px",marginBottom:"14px"}}><Aud k="lennard_jones" label="Lennard-Jones"/><Aud k="soft_core" label="Soft Core"/></div>
    <p><strong>Problem:</strong> Windows 15-19 (λ = 0.75-0.95) crashed repeatedly.</p>
    <p style={{marginTop:"8px"}}><strong>Root cause — Endpoint catastrophe:</strong></p>
    <Code>At λ = 0.85:{"\n"}  Arg atoms = 15% "real" (ghost-like, barely interact){"\n"}  Trp atoms = 85% "real" (almost fully present){"\n"}{"\n"}Trp's indole ring OCCUPIES space where other atoms exist.{"\n"}Normal vdW (Lennard-Jones): V = 4ε[(σ/r)¹² - (σ/r)⁶]{"\n"}At r→0: V → INFINITY{"\n"}{"\n"}At 85% coupling, the Trp-neighbor repulsion is scaled{"\n"}but not eliminated. Atoms partially overlap →{"\n"}energy spikes → forces → ∞ → coords → NaN → CRASH</Code>
    <p style={{marginTop:"12px",color:"#86efac",fontWeight:700}}>Your fix — Sequential Seeding Protocol:</p>
    <Step n="1" title="Chain windows" desc="Window 14's final coordinates → Window 15's starting point. Each window pre-equilibrated at nearby λ." color={S.green}/>
    <Step n="2" title="Halve timestep" desc="2 fs → 1 fs for windows 15-20. Smaller steps = less energy accumulation per step." color={S.green}/>
    <Step n="3" title="5× longer equilibration" desc="500 ps → 2.5 ns for problematic windows. Atoms have time to relax away from overlaps." color={S.green}/>
    <Step n="4" title="Increase friction coefficient" desc="Stronger thermostat coupling removes excess kinetic energy faster." color={S.green}/>
    <p style={{marginTop:"10px",color:"#86efac"}}>Result: All 120 windows converged after this protocol. 13 recovered.</p>
    <Judge q="How did you handle FEP convergence?" a="Thirteen windows at high lambda (0.75-0.95) failed due to the endpoint catastrophe — partial atomic overlaps during the Arg-to-Trp alchemical transformation cause Lennard-Jones energy divergence. I developed a sequential seeding protocol where each window initializes from the previous window's final coordinates, combined with halving the timestep to 1 femtosecond and extending equilibration five-fold. All 120 windows converged after implementation." />
  </Box>
</div>}

{/* =================== RESULTS =================== */}
{sec === "results" && <div>
  <Box title="THE Key Finding — Figure 16" icon="🎯" color="#10b981">
    <div style={{display:"flex",flexWrap:"wrap",gap:"6px",marginBottom:"14px"}}><Aud k="febuxostat" label="Febuxostat"/><Aud k="bufadienolide" label="Bufadienolide"/><Aud k="ASP1011" label="ASP1011"/><Aud k="ARG1034" label="ARG1034"/></div>
    <p style={{textAlign:"center",fontWeight:700,color:"#6ee7b7",fontSize:"16px",marginBottom:"14px"}}>Same protein. Same pocket. Same mutation. Two completely different outcomes.</p>

    <div style={{background:"rgba(239,68,68,0.08)",border:"1px solid rgba(239,68,68,0.2)",borderRadius:"14px",padding:"18px",marginBottom:"14px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"10px"}}>
        <div style={{color:S.red,fontWeight:800,fontSize:"18px"}}>Febuxostat</div><Tag color={S.red}>MUTATION-SENSITIVE</Tag>
      </div>
      <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"13px",lineHeight:2.2}}>
        <div>ΔG(WT)   = <span style={{color:S.green}}>-10.36</span> ± 0.18 kcal/mol <span style={{color:S.dim}}>← strong binding</span></div>
        <div>ΔG(R702W) = <span style={{color:S.red}}>-8.02</span> ± 0.19 kcal/mol <span style={{color:S.dim}}>← significantly weaker</span></div>
        <div style={{marginTop:"4px",color:"#fbbf24",fontWeight:700,fontSize:"15px"}}>ΔΔG = +2.34 ± 0.26 kcal/mol</div>
        <div style={{color:S.dim}}>Fold-change: e^(2.34/0.616) ≈ <strong style={{color:S.red}}>~50× weaker</strong></div>
        <div style={{color:"#86efac"}}>Significance: 2.34/0.26 = <strong>8.0 σ</strong> → p {"<"} 0.001</div>
      </div>
      <p style={{marginTop:"12px",fontSize:"13px"}}><strong>Clinical meaning:</strong> An R702W patient would need ~50× higher dose. That's not a dose adjustment — it's a fundamentally different drug response. This drug doesn't work for YOUR genotype.</p>
      <p style={{marginTop:"8px",fontSize:"13px",color:"#fca5a5",fontWeight:600}}>WHY it fails:</p>
      <Step n="1" title="Primary contact: ASP1011 (67%)" desc="Aspartate = negatively charged. Forms salt bridge + H-bond with Febuxostat's carboxylate." color={S.red}/>
      <Step n="2" title="ASP1011 orientation depends on R702's charge network" desc="R702 (+1) anchors an electrostatic network through HD2 that positions ASP1011." color={S.red}/>
      <Step n="3" title="R702→W702 removes +1 charge" desc="Salt bridge network breaks. ASP1011 repositions ~0.8 Å." color={S.red}/>
      <Step n="4" title="H-bond with Febuxostat weakens" desc="Distance increases from 2.9 → 3.4 Å. H-bond strength drops exponentially with distance." color={S.red}/>
      <Step n="5" title="Pocket rigidification (apo discovery)" desc="Rigid pocket can't adapt via induced fit to compensate for the repositioning." color={S.red}/>
    </div>

    <div style={{background:"rgba(34,197,94,0.08)",border:"1px solid rgba(34,197,94,0.2)",borderRadius:"14px",padding:"18px",marginBottom:"14px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"10px"}}>
        <div style={{color:S.green,fontWeight:800,fontSize:"18px"}}>Bufadienolide</div><Tag color={S.green}>MUTATION-RESISTANT ✓</Tag>
      </div>
      <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"13px",lineHeight:2.2}}>
        <div>ΔG(WT)   = <span style={{color:S.green}}>-15.22</span> ± 0.26 kcal/mol <span style={{color:S.dim}}>← very strong</span></div>
        <div>ΔG(R702W) = <span style={{color:S.green}}>-15.66</span> ± 0.26 kcal/mol <span style={{color:S.dim}}>← still very strong</span></div>
        <div style={{marginTop:"4px",color:"#86efac",fontWeight:700,fontSize:"15px"}}>ΔΔG = -0.44 ± 0.37 kcal/mol</div>
        <div style={{color:S.dim}}>Significance: 0.44/0.37 = <strong>1.2σ</strong> → p = 0.23 → <strong>NOT significant</strong></div>
      </div>
      <p style={{marginTop:"12px",fontSize:"13px"}}><strong>Clinical meaning:</strong> Works equally well for WT and R702W patients. This is a <strong>precision medicine candidate</strong> — effective regardless of genotype.</p>
      <p style={{marginTop:"8px",fontSize:"13px",color:"#86efac",fontWeight:600}}>WHY it survives:</p>
      <Step n="1" title="DIFFERENT contacts: ARG1034 (82%), ARG1037 (81%)" desc="Different residues from Febuxostat — not in R702W's disrupted network." color={S.green}/>
      <Step n="2" title="Steroid scaffold = large, flat, hydrophobic" desc="Bound by hydrophobic effect + π-stacking, NOT electrostatics." color={S.green}/>
      <Step n="3" title="R702W's charge change doesn't propagate to these contacts" desc="ARG1034/1037 are in a different part of the LRR domain." color={S.green}/>
      <Step n="4" title="Flat scaffold fits rigid pocket fine" desc="Doesn't need induced-fit flexibility — already complementary shape." color={S.green}/>
    </div>

    <div style={{background:"rgba(245,158,11,0.1)",border:"1px solid rgba(245,158,11,0.3)",borderRadius:"12px",padding:"16px",textAlign:"center"}}>
      <div style={{color:S.gold,fontWeight:800,fontSize:"18px"}}>💡 MUTATION EFFECTS ARE LIGAND-DEPENDENT</div>
      <div style={{color:"#fef3c7",fontSize:"14px",marginTop:"8px"}}>Same mutation. Same pocket. One drug loses 50× binding. Another is unaffected. The BINDING MECHANISM determines sensitivity, not just the mutation itself. This is the precision medicine insight.</div>
    </div>
  </Box>

  <Box title="MM-GBSA vs FEP — Why They Disagree" icon="⚖️" color={S.gold}>
    <div style={{display:"flex",flexWrap:"wrap",gap:"6px",marginBottom:"14px"}}><Aud k="MM_GBSA" label="MM-GBSA"/><Aud k="implicit_solvent" label="Implicit"/><Aud k="explicit_solvent" label="Explicit"/></div>
    <p>MM-GBSA predicted Febuxostat binds <strong style={{color:S.red}}>BETTER</strong> in R702W. FEP says <strong>WEAKER</strong>. Opposite conclusions.</p>
    <Versus leftLabel="❌ MM-GBSA (WRONG here)" rightLabel="✅ FEP (CORRECT)" leftColor={S.red} rightColor={S.green}
      left={<span>Replaces ~65,000 water molecules with a single equation (Generalized Born). Cannot model how individual water molecules reorganize when Arg(+1)→Trp(0). Endpoint method — only sees start and end states. Estimated error: ±3-5 kcal/mol for charge mutations.</span>}
      right={<span>Every water molecule simulated explicitly. Captures water reorganization, dielectric response, bridge waters. Samples full thermodynamic path across 20 λ windows. Error: ±0.2-0.3 kcal/mol. Gold standard for charge-changing mutations.</span>} />
    <p style={{marginTop:"12px"}}><strong>Methodological contribution:</strong> For charge-changing mutations (Arg→Trp, Glu→Ala, etc.), MM-GBSA is unreliable. Future NOD2 studies MUST use FEP. This disagreement is itself a publishable finding.</p>
  </Box>

  <Box title="All Hypotheses Supported" icon="🏆" color="#10b981" border>
    <div style={{display:"grid",gap:"8px"}}>
      <div style={{background:"rgba(34,197,94,0.08)",borderRadius:"10px",padding:"14px",fontSize:"13px"}}>
        <strong style={{color:S.green}}>H1:</strong> CNN docking + ML can identify NOD2 binder candidates → <strong style={{color:S.green}}>SUPPORTED</strong>. AUC 0.89 scaffold-split (0.50 shuffled control). 9,566 → 150 → 148 drug-like candidates.
      </div>
      <div style={{background:"rgba(34,197,94,0.08)",borderRadius:"10px",padding:"14px",fontSize:"13px"}}>
        <strong style={{color:S.green}}>H2:</strong> MD confirms binding stability → <strong style={{color:S.green}}>SUPPORTED</strong>. 70-80% pocket occupancy for leads vs 0% for negative control. 520+ ns total simulation. 3 replicates consistent.
      </div>
      <div style={{background:"rgba(34,197,94,0.08)",borderRadius:"10px",padding:"14px",fontSize:"13px"}}>
        <strong style={{color:S.green}}>H3:</strong> FEP quantifies mutation effects → <strong style={{color:S.green}}>SUPPORTED</strong>. Febuxostat: ΔΔG = +2.34 (50× weaker, 8σ). Bufadienolide: ΔΔG = -0.44 (unchanged, NS). Mutation effects are ligand-dependent.
      </div>
    </div>
    <div style={{background:"rgba(16,185,129,0.1)",border:"1px solid rgba(16,185,129,0.25)",borderRadius:"10px",padding:"14px",marginTop:"12px"}}>
      <p style={{color:"#6ee7b7",fontWeight:700,fontSize:"14px",fontStyle:"italic",textAlign:"center",margin:0}}>
        "First FEP study quantifying how Crohn's-associated NOD2 mutations affect drug binding. Demonstrates ligand-dependent mutation effects — a precision medicine insight."
      </p>
    </div>
  </Box>

  <Box title="Limitations (Own Them)" icon="⚠️" color={S.gold}>
    {[["Needs experimental validation","SPR (Surface Plasmon Resonance) binding assay to confirm computed ΔG values. NF-κB reporter assay to confirm functional activation. You're a high school student without wet lab access — next step if funding obtained."],
      ["Only R702W tested","G908R (frameshift-adjacent) and L1007fs (frameshift, truncates protein) not tested. Each would need 60 more FEP windows. You prioritized R702W: you carry it + it's the most common variant."],
      ["AlphaFold prediction","No complete crystal structure exists. Mitigated: pLDDT >90 in LRR + validated against partial crystal 5IRM where available. Future: cryo-EM structure would be ideal."],
      ["FEP convergence warnings","13 windows initially failed. Fixed with sequential seeding. Febuxostat result at 8σ is robust — even with 2× larger error bars, still >4σ significant."],
      ["2 compounds only","Full FEP is computationally expensive. Ideally test top 10-20 candidates. This is a proof-of-concept demonstrating the pipeline works."]
    ].map(([t,d]) => (
      <div key={t} style={{background:S.bg3,borderRadius:"8px",padding:"12px 14px",marginBottom:"6px"}}>
        <div style={{color:S.gold,fontWeight:700,fontSize:"13px"}}>{t}</div>
        <div style={{color:S.dim,fontSize:"12px",marginTop:"4px",lineHeight:1.7}}>{d}</div>
      </div>
    ))}
    <p style={{color:"#86efac",fontWeight:600,marginTop:"8px"}}>All limitations are ON your poster. If a judge raises one: "Yes, I acknowledged that in my discussion section — here's how I'd address it."</p>
  </Box>
</div>}

{/* =================== PRESENT =================== */}
{sec === "present" && <div>
  <Box title="3-Minute Pitch" icon="🎤" color={S.purple}>
    <p style={{color:S.gold,fontWeight:700,marginBottom:"14px"}}>DON'T MEMORIZE WORD-FOR-WORD. Know the structure. Let words come naturally.</p>
    {[["🎣 HOOK (20s)","Eye contact. NO poster yet. Personal connection.",`"Last year, 23andMe told me I carry R702W — one of the strongest genetic risk factors for Crohn's disease. My doctor said there's no way to target the mutation directly, just manage symptoms. That stuck with me. So I asked: can we find drugs that target NOD2, and does MY specific mutation change how they work?"`,S.pink],
      ["⚗️ PIPELINE (60s)","Turn to poster. Point to Figure 10 (funnel). Walk the funnel.",`"I built a computational drug discovery pipeline. Started with 9,566 compounds from FDA drugs and natural products databases. Docked every one with GNINA — that's a neural-network-enhanced docking program. Filtered with an XGBoost classifier I built called NOD2-Scout, AUC 0.89 on scaffold-split cross-validation. Applied ADMET drug-likeness filters. Then the heavy computation: 520 nanoseconds of molecular dynamics to test binding stability. And finally, Free Energy Perturbation — the gold standard — across 120 lambda windows to quantify exactly how R702W changes binding."`,S.purple],
      ["🎯 RESULT (40s)","Point to Figure 16. SLOW DOWN on numbers. This is the money shot.",`"Two lead compounds survived the full pipeline. Febuxostat: delta-delta-G of plus 2.34 kcal/mol — that translates to roughly 50-fold weaker binding in the R702W mutant. Eight sigma significance, p less than 0.001. Bufadienolide: delta-delta-G of negative 0.44 — not statistically significant. The mutation doesn't affect it at all. [PAUSE] Same pocket. Same mutation. One drug fails. One doesn't."`,S.green],
      ["🏁 CLOSE (20s)","Turn back to judge. Pause. Let it land. Confident.",`"The key insight: mutation effects are ligand-dependent. You can't just find strong binders — you need to screen for mutation-RESISTANT binders. That's precision medicine. And as far as we can determine, this is the first Free Energy Perturbation study ever conducted on NOD2 mutations."`,S.gold]
    ].map(([t,n,txt,c]) => (
      <div key={t} style={{background:`${c}10`,border:`1px solid ${c}25`,borderRadius:"10px",padding:"14px",marginTop:"10px"}}>
        <div style={{color:c,fontWeight:700}}>{t}</div>
        <div style={{color:S.dimmer,fontSize:"11px",marginBottom:"6px"}}>{n}</div>
        <div style={{fontSize:"13px",fontStyle:"italic",lineHeight:1.7}}>{txt}</div>
      </div>
    ))}
  </Box>

  <Box title="Body Language" icon="🧍" color={S.cyan}>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"}}>
      <div><div style={{color:S.green,fontWeight:700,fontSize:"13px",marginBottom:"8px"}}>✅ DO</div>
        {["Stand to SIDE of poster, never block it","Point with open palm, not finger","Eye contact when saying numbers","Speak SLOWLY on ΔΔG values","Pause 2 seconds after key findings","Ask judge's background FIRST","Say 'that's a great question' to buy time"].map(t=>(<div key={t} style={{fontSize:"12px",marginBottom:"4px"}}>• {t}</div>))}
      </div>
      <div><div style={{color:S.red,fontWeight:700,fontSize:"13px",marginBottom:"8px"}}>❌ DON'T</div>
        {["Read from the poster","Turn your back to the judge","Say 'um', 'like', 'you know'","Rush through results section","Apologize for anything ever","Fidget, cross arms, or pocket hands","Say 'I'm just a high school student'"].map(t=>(<div key={t} style={{fontSize:"12px",marginBottom:"4px"}}>• {t}</div>))}
      </div>
    </div>
  </Box>

  <Box title="📋 Emergency Cheat Sheet" icon="" color={S.gold}>
    <Code><span style={{color:S.red}}>HOOK:</span>  23andMe → R702W → doctor said no fix → what if?{"\n"}<span style={{color:S.purple}}>PIPE:</span>  9,566 → GNINA CNN → XGBoost (AUC 0.89) → ADMET → MD (520ns) → FEP (120λ){"\n"}<span style={{color:S.green}}>KEY:</span>   Feb: ΔΔG +2.34, 50× weaker, 8σ. Buf: ΔΔG -0.44, NS.{"\n"}<span style={{color:S.gold}}>WHY:</span>   Mutation effects = ligand-dependent → screen for resistant binders{"\n"}<span style={{color:S.cyan}}>NOVEL:</span> First FEP on NOD2. Novel rigidification mechanism. MM-GBSA disagrees.{"\n"}<span style={{color:S.pink}}>LIMIT:</span> Needs SPR validation. Only R702W. AlphaFold not crystal.</Code>
  </Box>
</div>}

      </div>
    </div>
  );
}
