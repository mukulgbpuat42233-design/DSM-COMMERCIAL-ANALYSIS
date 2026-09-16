const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

// 1. Remove the yellow box
const boxStart = '<div style="margin-top:8px;padding:8px 10px;background:#FFFDF7;border:1px solid #F1E1B8;border-radius:6px;font-size:8px;color:#5E4A17">';
const boxEnd = 'Changing the plant does not mix source data between plants.</div>';
const boxFull = boxStart + '<b>Plant-wise data isolation:</b> Schedule, Actual, Frequency, UPSLDC/SLDC statement and revisions should be uploaded for the selected plant. ' + boxEnd;

if (html.includes(boxFull)) {
    html = html.replace(boxFull, '');
    console.log("Yellow box removed.");
} else {
    // try softer match
    const b1 = html.indexOf(boxStart);
    if(b1 !== -1) {
        const b2 = html.indexOf('</div>', b1);
        if(b2 !== -1) {
            html = html.substring(0, b1) + html.substring(b2 + 6);
            console.log("Yellow box removed via substring.");
        }
    } else {
        console.log("Yellow box NOT found.");
    }
}

// 2. Replace the login screen branding
const oldBrandStart = '<section class="thdc-login-brand">';
const oldBrandEnd = '</section>\n  <section class="login-card">';

const idx1 = html.indexOf(oldBrandStart);
const idx2 = html.indexOf(oldBrandEnd);

if (idx1 !== -1 && idx2 !== -1) {
    const oldBrand = html.substring(idx1, idx2 + '</section>'.length);
    const newBrand = `<section class="thdc-login-brand">
   <div style="display:flex;align-items:center;gap:16px;margin-bottom:12px;">
     <div style="background:linear-gradient(135deg, #062E73 0%, #084399 100%);width:54px;height:54px;border-radius:14px;display:flex;align-items:center;justify-content:center;box-shadow:0 10px 20px rgba(6,46,115,0.2);flex-shrink:0;">
       <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
     </div>
     <div>
       <h2 style="margin:0;font-size:32px;font-weight:900;color:#0F172A;letter-spacing:-0.03em;">THDC</h2>
       <div style="font-size:12px;font-weight:800;color:#0073CF;letter-spacing:0.1em;margin-top:-2px;">INDIA LIMITED</div>
     </div>
   </div>
   <div style="font-size:15px;font-weight:700;color:#0F172A;margin-bottom:24px;border-left:3px solid #0073CF;padding-left:12px;letter-spacing:0.02em;">Generating Power... Transmitting Prosperity</div>
   <div class="thdc-login-kicker" style="color:#64748B;font-weight:800;font-size:11px;letter-spacing:0.15em;margin-bottom:8px;">POWER MANAGEMENT · DSM · RECONCILIATION</div>
   <h1 class="thdc-login-heading" style="font-size:42px;font-weight:900;color:#0F172A;line-height:1.1;letter-spacing:-0.03em;margin:0 0 16px 0;">DSM Calculator &amp;<br><span style="color:#0073CF;">Reconciliation Portal</span></h1>
   <div class="thdc-login-lead" style="font-size:16px;color:#475569;line-height:1.5;margin-bottom:32px;">A plant-wise analytical workspace for schedule, deviation, settlement, frequency response and reconciliation.</div>
   
   <div class="thdc-feature-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:32px;">
    <div class="thdc-feature">
      <b style="color:#0F172A;font-size:14px;display:block;margin-bottom:4px;">⚡ 96-Block Precision</b>
      <span style="color:#64748B;font-size:13px;line-height:1.4;">Automated injection &amp; frequency alignment.</span>
    </div>
    <div class="thdc-feature">
      <b style="color:#0F172A;font-size:14px;display:block;margin-bottom:4px;">📊 Data Quality Checks</b>
      <span style="color:#64748B;font-size:13px;line-height:1.4;">Identifies missing rows and calculation errors.</span>
    </div>
    <div class="thdc-feature">
      <b style="color:#0F172A;font-size:14px;display:block;margin-bottom:4px;">📄 Excel &amp; PDF Reports</b>
      <span style="color:#64748B;font-size:13px;line-height:1.4;">Professional calculation and reconciliation reports.</span>
    </div>
    <div class="thdc-feature">
      <b style="color:#0F172A;font-size:14px;display:block;margin-bottom:4px;">🔐 Plant-wise Data</b>
      <span style="color:#64748B;font-size:13px;line-height:1.4;">Each project's workspace is independently preserved.</span>
    </div>
   </div>
   <div class="thdc-save-note" style="background:#F1F5F9;padding:12px 16px;border-radius:8px;font-size:12px;color:#475569;font-weight:600;border-left:4px solid #94A3B8;">● Data is saved separately for each selected plant</div>
  </section>`;
    html = html.substring(0, idx1) + newBrand + html.substring(idx2);
    console.log("Login branding updated.");
} else {
    console.log("Login branding NOT found.");
}

// 3. Remove the const logo line entirely as it's large and no longer used (optional, but good for cleanup)
const logoRegex = /const logo='data:image\/png;base64,.*?';\n/g;
if(html.match(logoRegex)) {
    html = html.replace(logoRegex, '');
    console.log("Base64 logo variable removed.");
}

fs.writeFileSync('public/index.html', html);
