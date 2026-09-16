const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

const sIdx = html.indexOf('function renderLogin(){');
const pIdx = html.indexOf('function sendOtp(){');

if(sIdx === -1 || pIdx === -1) {
    console.error("Could not find bounds.");
    process.exit(1);
}

const newLoginFn = `function renderLogin(){ 
  const app = document.getElementById('app'); 
  const ctx = window.currentPlantContext || 'Khurja Floating Solar'; 
  const plant = window.THDC_PLANTS?.[ctx] || {name:'Khurja Floating Solar',capacity:11,type:'Floating Solar Power Plant', unit:'MW'};  
  
  if (!state.projectMeta) state.projectMeta = {};  
  state.projectMeta.plant = plant?.name + ' — ' + plant?.capacity + ' MW';  
  state.projectMeta.name = plant?.name; 
  
  const authority = window.THDC_GRID_SOURCES?.[ctx]?.authority || ((plant?.name==='Tehri HPP'||plant?.name==='Tehri PSP'||plant?.name==='Koteshwar HEP')?'NRPC':'UPSLDC');  
  
  const isUpsldc = authority === 'UPSLDC';
  const isNrpc = authority === 'NRPC';

  const thdcSvg = \`
  <svg width="70" height="70" viewBox="0 0 120 120" fill="none">
    <g transform="translate(60,60)">
        <g id="blade">
            <path d="M-5,-5 C-35,-45 -65,-20 -50,15 C-40,-5 -25,-5 -5,-5 Z" fill="#0619C4"/>
            <path d="M-50,15 C-65,30 -40,55 -20,55 C-45,45 -55,30 -50,15 Z" fill="#00D4FF"/>
        </g>
        <use href="#blade" transform="rotate(120)" />
        <use href="#blade" transform="rotate(240)" />
    </g>
  </svg>\`;

  const headerBg = \`<svg preserveAspectRatio="none" style="position:absolute; right:0; top:0; width:45%; height:100%; z-index:0;" viewBox="0 0 500 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M500 0H0C100 0 200 100 500 100V0Z" fill="#0A2E7A" opacity="0.9"/>
    <path d="M500 0H50C150 0 250 100 500 100V0Z" fill="#0A2E7A"/>
    <path d="M500 0H100C200 0 300 100 500 100V0Z" fill="#0073CF" opacity="0.3"/>
  </svg>\`;

  const plantOptions = Object.keys(window.THDC_PLANTS || {}).map(k => {
    const p = window.THDC_PLANTS[k];
    const sel = (k === ctx) ? 'selected' : '';
    return \`<option value="\${k}" \${sel}>\${p.name} — \${p.capacity} \${p.unit||'MW'}</option>\`;
  }).join('');

  app.innerHTML = \`
  <div style="background:#F3F4F6; min-height:100vh; font-family:'Inter', sans-serif; display:flex; flex-direction:column;">
    
    <div style="background:white; height:120px; display:flex; align-items:center; padding:0 40px; position:relative; overflow:hidden; box-shadow:0 4px 20px rgba(0,0,0,0.05);">
      \${headerBg}
      <div style="display:flex; align-items:center; gap:20px; position:relative; z-index:1;">
        \${thdcSvg}
        <div style="display:flex; flex-direction:column; gap:2px;">
          <h1 style="margin:0; font-size:42px; font-weight:900; color:#0A2E7A; letter-spacing:-0.03em; line-height:1;">THDC</h1>
          <h2 style="margin:0; font-size:18px; font-weight:800; color:#0A2E7A; letter-spacing:0.02em;">THDC INDIA LIMITED</h2>
          <div style="font-size:13px; color:#475569; font-weight:600; margin-top:4px;">Schedule • Deviation • Settlement • Reconciliation</div>
        </div>
      </div>
    </div>

    <div style="max-width:1200px; width:100%; margin:32px auto; padding:0 20px; flex:1; display:flex; flex-direction:column; gap:24px;">
      
      <div style="background:white; border-radius:12px; overflow:hidden; box-shadow:0 4px 15px rgba(0,0,0,0.03);">
        <div style="background:#08245b; padding:16px 24px; color:white; display:flex; align-items:center; gap:12px;">
          <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z"></path></svg>
          <div>
            <div style="font-size:16px; font-weight:800; letter-spacing:0.05em;">GRID / SETTLEMENT DATA SOURCE</div>
            <div style="font-size:12px; opacity:0.8; margin-top:2px;">Select the grid / regional settlement authority whose statement you want to use for reconciliation.</div>
          </div>
        </div>
        <div style="padding:24px; display:grid; grid-template-columns:1fr 1fr; gap:20px; background:#F8FAFC;">
          <div style="border:2px solid \${isUpsldc ? '#0073CF' : '#E2E8F0'}; background:white; border-radius:8px; padding:20px; display:flex; align-items:center; gap:16px; transition:all 0.2s;">
            <div style="width:24px; height:24px; border-radius:50%; border:\${isUpsldc ? '6px' : '2px'} solid \${isUpsldc ? '#0073CF' : '#CBD5E1'}; flex-shrink:0;"></div>
            <div style="flex:1;">
              <h3 style="margin:0; font-size:24px; font-weight:900; color:\${isUpsldc ? '#0A2E7A' : '#475569'};">UPSLDC</h3>
              <div style="font-size:13px; color:\${isUpsldc ? '#0F172A' : '#475569'}; font-weight:600; margin-top:4px;">Uttar Pradesh State Load Despatch Centre</div>
              <div style="font-size:12px; color:#64748B; margin-top:4px;">For Uttar Pradesh Region Plants</div>
            </div>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="\${isUpsldc ? '#0073CF' : '#94A3B8'}" stroke-width="1.5"><path d="M12 2v20M5 22h14M8 6h8M6 14h12M9 2l-4 20M15 2l4 20"></path></svg>
          </div>
          <div style="border:2px solid \${isNrpc ? '#0073CF' : '#E2E8F0'}; background:white; border-radius:8px; padding:20px; display:flex; align-items:center; gap:16px; transition:all 0.2s;">
            <div style="width:24px; height:24px; border-radius:50%; border:\${isNrpc ? '6px' : '2px'} solid \${isNrpc ? '#0073CF' : '#CBD5E1'}; flex-shrink:0;"></div>
            <div style="flex:1;">
              <h3 style="margin:0; font-size:24px; font-weight:900; color:\${isNrpc ? '#0A2E7A' : '#475569'};">NRPC</h3>
              <div style="font-size:13px; color:\${isNrpc ? '#0F172A' : '#475569'}; font-weight:600; margin-top:4px;">Northern Regional Power Committee</div>
              <div style="font-size:12px; color:#64748B; margin-top:4px;">For Northern Region Plants</div>
            </div>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="\${isNrpc ? '#10B981' : '#94A3B8'}" stroke-width="1.5"><path d="M12 2v20M5 22h14M8 6h8M6 14h12M9 2l-4 20M15 2l4 20"></path></svg>
          </div>
        </div>
      </div>

      <div style="background:white; border-radius:12px; overflow:hidden; box-shadow:0 4px 15px rgba(0,0,0,0.03); border:1px solid #E2E8F0;">
        <div style="padding:24px; display:flex; flex-direction:column; gap:20px;">
          <div style="display:flex; align-items:center; gap:12px;">
            <div style="background:#0A2E7A; width:40px; height:40px; border-radius:50%; display:flex; align-items:center; justify-content:center;">
              <svg width="20" height="20" fill="none" stroke="white" stroke-width="2"><path d="M3 21h18M4 21V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16M9 21v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4"></path></svg>
            </div>
            <div>
              <div style="font-size:16px; font-weight:800; color:#0A2E7A; letter-spacing:0.05em;">PLANT</div>
              <div style="font-size:12px; color:#64748B; margin-top:2px;">Select the plant for which you want to run DSM calculations and reconciliation.</div>
            </div>
          </div>
          
          <select id="heroPlantSelect" onchange="loginPlantChanged(this.value)" style="width:100%; font-size:32px; font-weight:900; color:#0F172A; padding:20px; border:2px solid #CBD5E1; border-radius:12px; appearance:none; background:url('data:image/svg+xml;utf8,<svg width=\\"24\\" height=\\"24\\" fill=\\"none\\" stroke=\\"%230F172A\\" stroke-width=\\"2\\" viewBox=\\"0 0 24 24\\"><path d=\\"M6 9l6 6 6-6\\"/></svg>') no-repeat right 20px center; background-color:white; cursor:pointer;">
            \${plantOptions}
          </select>

          <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:16px; margin-top:8px;">
            <div style="background:#F8FAFC; border:1px solid #E2E8F0; padding:16px; border-radius:12px; display:flex; align-items:center; gap:16px;">
              <div style="width:40px; height:40px; border-radius:50%; background:#1D4ED8; display:flex; align-items:center; justify-content:center; flex-shrink:0;"><svg width="20" height="20" fill="none" stroke="white" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg></div>
              <div>
                <div style="font-size:11px; font-weight:800; color:#1D4ED8; letter-spacing:0.05em;">CAPACITY</div>
                <div style="font-size:16px; font-weight:900; color:#0F172A; margin-top:2px;">\${plant.capacity} \${plant.unit||'MW'}</div>
              </div>
            </div>
            <div style="background:#F8FAFC; border:1px solid #E2E8F0; padding:16px; border-radius:12px; display:flex; align-items:center; gap:16px;">
              <div style="width:40px; height:40px; border-radius:50%; background:#1D4ED8; display:flex; align-items:center; justify-content:center; flex-shrink:0;"><svg width="20" height="20" fill="none" stroke="white" stroke-width="2"><path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6zM4 10h16M10 4v16M14 4v16"></path></svg></div>
              <div>
                <div style="font-size:11px; font-weight:800; color:#1D4ED8; letter-spacing:0.05em;">PLANT TYPE</div>
                <div style="font-size:14px; font-weight:700; color:#0F172A; margin-top:2px; line-height:1.2;">\${plant.type}</div>
              </div>
            </div>
            <div style="background:#F8FAFC; border:1px solid #E2E8F0; padding:16px; border-radius:12px; display:flex; align-items:center; gap:16px;">
              <div style="width:40px; height:40px; border-radius:50%; background:#1D4ED8; display:flex; align-items:center; justify-content:center; flex-shrink:0;"><svg width="20" height="20" fill="none" stroke="white" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg></div>
              <div>
                <div style="font-size:11px; font-weight:800; color:#1D4ED8; letter-spacing:0.05em;">DSM ENGINE</div>
                <div style="font-size:13px; font-weight:600; color:#0F172A; margin-top:2px; line-height:1.2;">Same DSM engine<br>plant-specific Excel mapping.</div>
              </div>
            </div>
            <div style="background:#F8FAFC; border:1px solid #E2E8F0; padding:16px; border-radius:12px; display:flex; align-items:center; gap:16px;">
              <div style="width:40px; height:40px; border-radius:50%; background:#1D4ED8; display:flex; align-items:center; justify-content:center; flex-shrink:0;"><svg width="20" height="20" fill="none" stroke="white" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg></div>
              <div>
                <div style="font-size:11px; font-weight:800; color:#1D4ED8; letter-spacing:0.05em;">DATE FORMAT</div>
                <div style="font-size:16px; font-weight:900; color:#0F172A; margin-top:2px;">DD-MM-YYYY</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style="background:#ECFDF5; border:1px solid #6EE7B7; border-radius:12px; padding:24px; display:flex; align-items:center; gap:24px; box-shadow:0 4px 15px rgba(0,0,0,0.02);">
        <div style="width:48px; height:48px; border-radius:50%; background:#10B981; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
          <svg width="24" height="24" fill="none" stroke="white" stroke-width="2"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        </div>
        <div style="flex:1;">
          <h4 style="margin:0; font-size:16px; font-weight:900; color:#065F46;">SMART ROUTING</h4>
          <div style="font-size:14px; color:#065F46; font-weight:600; margin-top:6px; line-height:1.5;">
            UPSLDC will be used for Khurja STPP (1320 MW) and Khurja Floating Solar (11 MW).<br>
            NRPC will be used for Tehri HPP (1000 MW) and Koteshwar HEP (400 MW).
          </div>
        </div>
        
        <div style="background:white; border-radius:8px; padding:16px; border:1px solid #A7F3D0; width:350px;">
           <div id="loginStep1">
              <label style="font-size:11px; font-weight:800; color:#065F46; letter-spacing:0.05em; display:block; margin-bottom:8px;">VERIFY MOBILE TO ACCESS WORKSPACE</label>
              <div style="display:flex; gap:8px;">
                <input class="login-input" type="tel" id="loginMobile" placeholder="10-digit mobile" maxlength="10" style="flex:1; margin:0; padding:10px; border:1px solid #D1D5DB; border-radius:6px; font-weight:bold; font-size:14px; color:#0F172A; min-width:0;">
                <button onclick="sendOtp()" style="background:#0A2E7A; color:white; border:none; border-radius:6px; padding:0 16px; font-weight:bold; cursor:pointer; flex-shrink:0;">Send OTP</button>
              </div>
              <div id="loginErr" class="err-msg" style="display:none; font-size:12px; color:#DC2626; margin-top:8px;"></div>
           </div>
           <div id="loginStep2" style="display:none;">
              <div class="otp-banner" id="otpDisplay" style="font-size:12px; font-weight:bold; color:#065F46; margin-bottom:8px;"></div>
              <div style="display:flex; gap:8px;">
                <input class="login-input" type="tel" id="loginOtpInput" placeholder="6-digit OTP" maxlength="6" style="flex:1; margin:0; padding:10px; border:1px solid #D1D5DB; border-radius:6px; font-weight:bold; font-size:14px; color:#0F172A; min-width:0;">
                <button onclick="verifyOtp()" style="background:#10B981; color:white; border:none; border-radius:6px; padding:0 16px; font-weight:bold; cursor:pointer; flex-shrink:0;">Verify</button>
              </div>
              <div id="otpErr" class="err-msg" style="display:none; font-size:12px; color:#DC2626; margin-top:8px;"></div>
           </div>
        </div>
      </div>
      
    </div>

    <div style="background:#08245b; padding:24px; text-align:center; color:white; margin-top:auto;">
      <h3 style="margin:0; font-size:18px; font-weight:800; letter-spacing:0.05em;">THDC INDIA LIMITED</h3>
      <div style="font-size:14px; color:#93C5FD; font-style:italic; margin-top:4px;">Powering Progress... Lighting Lives</div>
    </div>
  </div>\`;
}
async function loginPlantChanged(v){
  if(!window.THDC_PLANTS?.[v]) return;
  if(window.THDC_LOAD_PLANT) await window.THDC_LOAD_PLANT(v);
  else { window.currentPlantContext=v; localStorage.setItem('thdc-plant-context',v); }
  renderLogin();
}
`;

html = html.substring(0, sIdx) + newLoginFn + html.substring(pIdx);
fs.writeFileSync('public/index.html', html);
console.log("Applied replacement");
