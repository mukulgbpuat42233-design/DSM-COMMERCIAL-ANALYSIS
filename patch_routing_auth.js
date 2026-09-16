const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

const sIdx = html.indexOf('<div style="background:#ECFDF5;');
const eIdx = html.indexOf('<div style="background:#08245b; padding:24px; text-align:center; color:white; margin-top:auto;">');

if(sIdx === -1 || eIdx === -1) {
    console.error("Could not find bounds.");
    process.exit(1);
}

const replacement = `<div style="background:#ECFDF5; border:1px solid #6EE7B7; border-radius:12px; padding:24px; display:flex; align-items:center; justify-content:space-between; gap:24px; box-shadow:0 4px 15px rgba(0,0,0,0.02);">
        <div style="display:flex; align-items:center; gap:20px;">
            <div style="width:48px; height:48px; border-radius:50%; background:#10B981; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
            <svg width="24" height="24" fill="none" stroke="white" stroke-width="2"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <div>
            <h4 style="margin:0; font-size:16px; font-weight:900; color:#065F46;">SMART ROUTING</h4>
            <div style="font-size:13px; color:#065F46; font-weight:600; margin-top:4px; line-height:1.5;">
                UPSLDC will be used for Khurja STPP (1320 MW) and Khurja Floating Solar (11 MW).<br>
                NRPC will be used for Tehri HPP (1000 MW) and Koteshwar HEP (400 MW).
            </div>
            </div>
        </div>
        
        <div style="display:flex; flex-direction:column; gap:12px; min-width:320px;">
            <div style="display:flex; align-items:center; gap:12px;">
                <div style="background:#E0E7FF; border:1px solid #A5B4FC; border-radius:6px; padding:8px 12px; font-size:10px; font-weight:800; color:#3730A3; flex:1;">
                    Khurja STPP (1320 MW)<br>Khurja Floating Solar (11 MW)
                </div>
                <svg width="24" height="24" fill="none" stroke="#3730A3" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"></path></svg>
                <div style="background:#E0E7FF; border:1px solid #A5B4FC; border-radius:6px; padding:8px 16px; font-size:12px; font-weight:900; color:#3730A3;">UPSLDC</div>
            </div>
            <div style="display:flex; align-items:center; gap:12px;">
                <div style="background:#DCFCE7; border:1px solid #86EFAC; border-radius:6px; padding:8px 12px; font-size:10px; font-weight:800; color:#166534; flex:1;">
                    Tehri HPP (1000 MW)<br>Koteshwar HEP (400 MW)
                </div>
                <svg width="24" height="24" fill="none" stroke="#166534" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"></path></svg>
                <div style="background:#DCFCE7; border:1px solid #86EFAC; border-radius:6px; padding:8px 16px; font-size:12px; font-weight:900; color:#166534;">NRPC</div>
            </div>
        </div>
      </div>

      <div style="background:#08245B; border-radius:12px; padding:24px; display:flex; align-items:center; justify-content:space-between; gap:24px; color:white; box-shadow:0 10px 25px rgba(8,36,91,0.2);">
         <div>
            <div style="font-size:18px; font-weight:900; letter-spacing:0.02em;">ACCESS WORKSPACE</div>
            <div style="font-size:13px; color:#93C5FD; margin-top:4px;">Enter your registered mobile number to proceed.</div>
         </div>
         <div style="width:400px;">
           <div id="loginStep1">
              <div style="display:flex; gap:8px;">
                <input class="login-input" type="tel" id="loginMobile" placeholder="10-digit mobile" maxlength="10" style="flex:1; margin:0; padding:12px 16px; border:2px solid #1E3A8A; border-radius:8px; font-weight:bold; font-size:16px; color:#0F172A; min-width:0; background:white;">
                <button onclick="sendOtp()" style="background:#3B82F6; color:white; border:none; border-radius:8px; padding:0 24px; font-weight:bold; cursor:pointer; flex-shrink:0; font-size:14px; transition:all 0.2s;">Send OTP</button>
              </div>
              <div id="loginErr" class="err-msg" style="display:none; font-size:13px; color:#FCA5A5; margin-top:8px;"></div>
           </div>
           <div id="loginStep2" style="display:none;">
              <div class="otp-banner" id="otpDisplay" style="font-size:13px; font-weight:bold; color:#A7F3D0; margin-bottom:8px;"></div>
              <div style="display:flex; gap:8px;">
                <input class="login-input" type="tel" id="loginOtpInput" placeholder="6-digit OTP" maxlength="6" style="flex:1; margin:0; padding:12px 16px; border:2px solid #1E3A8A; border-radius:8px; font-weight:bold; font-size:16px; color:#0F172A; min-width:0; background:white;">
                <button onclick="verifyOtp()" style="background:#10B981; color:white; border:none; border-radius:8px; padding:0 24px; font-weight:bold; cursor:pointer; flex-shrink:0; font-size:14px; transition:all 0.2s;">Verify &amp; Login</button>
              </div>
              <div id="otpErr" class="err-msg" style="display:none; font-size:13px; color:#FCA5A5; margin-top:8px;"></div>
           </div>
         </div>
      </div>
      
    </div>

    `;

html = html.substring(0, sIdx) + replacement + html.substring(eIdx);
fs.writeFileSync('public/index.html', html);
console.log("Applied replacement");
