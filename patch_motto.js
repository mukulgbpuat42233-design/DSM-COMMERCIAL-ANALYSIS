const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

// Replace motto
const oldMotto = '<div class="thdc-motto">Generating Power Transmitting Prosperity</div>';
const newMotto = '<div class="thdc-motto">Powering Progress... Lighting Lives</div>';
if (html.includes(oldMotto)) {
    html = html.replace(oldMotto, newMotto);
    console.log("Motto updated.");
}

// Remove old CSS blocks and insert new ultra premium CSS
const styleBlock1Regex = /<style id="plant-lock-and-premium-login">[\s\S]*?<\/style>/;
const styleBlock2Regex = /<style id="thdc-premium-login-v2">[\s\S]*?<\/style>/;

const newCSS = `<style id="thdc-ultra-premium-login">
.login-wrap {
    min-height: 100vh!important;
    padding: 40px 6vw!important;
    box-sizing: border-box!important;
    display: grid!important;
    grid-template-columns: minmax(400px, 1.2fr) minmax(400px, 1fr)!important;
    gap: 60px!important;
    align-items: center!important;
    justify-content: center!important;
    background: linear-gradient(135deg, #F0F6FF 0%, #FFFFFF 100%)!important;
    position: relative!important;
    overflow: hidden!important;
}

.login-wrap:after {
    content: "";
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 45%;
    background: linear-gradient(160deg, #003399 0%, #0073CF 100%);
    clip-path: polygon(15% 0, 100% 0, 100% 100%, 0% 100%);
    z-index: 1;
}

.thdc-login-brand {
    position: relative;
    z-index: 2;
    padding-right: 40px;
}

.thdc-login-logo {
    max-width: 320px;
    margin-bottom: 24px;
}

.thdc-motto {
    font-size: 18px;
    font-weight: 800;
    color: #003399;
    letter-spacing: 0.05em;
    margin-bottom: 20px;
}

.thdc-login-kicker {
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.15em;
    color: #64748B;
    margin-bottom: 16px;
    display: inline-block;
    padding: 6px 12px;
    background: #E2E8F0;
    border-radius: 6px;
}

.thdc-login-heading {
    font-size: 42px;
    line-height: 1.1;
    font-weight: 900;
    color: #0F172A;
    letter-spacing: -0.02em;
    margin: 0 0 20px;
}

.thdc-login-heading span {
    color: #0073CF;
}

.thdc-login-lead {
    font-size: 16px;
    line-height: 1.6;
    color: #475569;
    max-width: 500px;
    margin-bottom: 30px;
}

.thdc-feature-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
    max-width: 450px;
}

.thdc-feature {
    display: flex;
    flex-direction: column;
    padding: 16px 20px;
    background: #FFFFFF;
    border-left: 4px solid #0073CF;
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.04);
}

.thdc-feature b {
    color: #0F172A;
    font-size: 15px;
    margin-bottom: 4px;
}

.thdc-feature span {
    color: #64748B;
    font-size: 13px;
}

.login-card {
    position: relative;
    z-index: 3;
    width: 100%;
    max-width: 520px;
    padding: 48px;
    border-radius: 24px;
    background: #FFFFFF!important;
    box-shadow: 0 30px 60px rgba(0, 51, 153, 0.15)!important;
    border: none!important;
    margin: auto;
}

.login-brandline {
    font-size: 12px!important;
    font-weight: 800!important;
    letter-spacing: 0.1em!important;
    color: #0073CF!important;
    margin-bottom: 8px!important;
    text-transform: uppercase;
}

.login-card h2 {
    font-size: 32px!important;
    color: #0F172A!important;
    font-weight: 900!important;
    margin: 0 0 8px!important;
}

.login-card .sub {
    font-size: 15px!important;
    color: #64748B!important;
    margin-bottom: 32px!important;
}

.login-section-label {
    display: block!important;
    font-size: 12px!important;
    font-weight: 800!important;
    color: #334155!important;
    margin: 0 0 12px!important;
    letter-spacing: 0.05em;
    text-transform: uppercase;
}

.smart-plant-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 24px;
}

.smart-plant-card {
    border: 2px solid #E2E8F0;
    border-radius: 12px;
    padding: 16px;
    cursor: pointer;
    background: #F8FAFC;
    transition: all 0.2s ease;
}

.smart-plant-card:hover {
    border-color: #CBD5E1;
    background: #F1F5F9;
}

.smart-plant-card.active {
    border-color: #0073CF;
    background: #F0F6FF;
    box-shadow: 0 4px 12px rgba(0, 115, 207, 0.1);
}

.spc-type {
    font-size: 11px;
    text-transform: uppercase;
    color: #64748B;
    font-weight: 700;
    margin-bottom: 4px;
}

.spc-name {
    font-size: 16px;
    font-weight: 800;
    color: #0F172A;
    margin-bottom: 4px;
}

.spc-cap {
    font-size: 13px;
    color: #0073CF;
    font-weight: 700;
}

.login-authority {
    margin: 0 0 24px!important;
    padding: 16px!important;
    border-radius: 12px!important;
    background: #F8FAFC!important;
    border: 1px dashed #CBD5E1!important;
    color: #334155!important;
    font-size: 13px!important;
    font-weight: 700!important;
}

.login-prefix {
    display: flex!important;
    border: 2px solid #E2E8F0!important;
    border-radius: 12px!important;
    overflow: hidden!important;
    background: #FFFFFF!important;
    transition: all 0.2s ease!important;
}

.login-prefix:focus-within {
    border-color: #0073CF!important;
    box-shadow: 0 0 0 4px rgba(0, 115, 207, 0.1)!important;
}

.login-prefix span {
    padding: 0 16px!important;
    display: flex!important;
    align-items: center!important;
    background: #F8FAFC!important;
    border-right: 2px solid #E2E8F0!important;
    color: #475569!important;
    font-weight: 700!important;
}

.login-input {
    flex: 1!important;
    border: none!important;
    height: 54px!important;
    padding: 0 16px!important;
    font-size: 16px!important;
    font-weight: 600!important;
    color: #0F172A!important;
    outline: none!important;
    margin: 0!important;
}

.login-btn {
    width: 100%!important;
    height: 56px!important;
    border: none!important;
    border-radius: 12px!important;
    background: #003399!important;
    color: #FFFFFF!important;
    font-size: 16px!important;
    font-weight: 800!important;
    cursor: pointer!important;
    transition: all 0.2s ease!important;
    margin-top: 16px!important;
}

.login-btn:hover {
    background: #002266!important;
    transform: translateY(-2px)!important;
    box-shadow: 0 8px 20px rgba(0, 51, 153, 0.3)!important;
}

.login-footnote {
    margin-top: 24px!important;
    text-align: center!important;
    font-size: 12px!important;
    color: #64748B!important;
}

.thdc-save-note {
    margin-top: 24px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 16px;
    border-radius: 8px;
    background: #F8FAFC;
    border: 1px solid #E2E8F0;
    color: #475569;
    font-size: 12px;
    font-weight: 700;
}

@media (max-width: 980px) {
    .login-wrap {
        grid-template-columns: 1fr!important;
        padding: 40px 20px!important;
    }
    .login-wrap:after { display: none; }
    .thdc-login-brand { display: none; }
}
</style>`;

let replaced = false;

if (styleBlock1Regex.test(html)) {
    html = html.replace(styleBlock1Regex, newCSS);
    replaced = true;
    console.log("Replaced first style block.");
}

if (styleBlock2Regex.test(html)) {
    html = html.replace(styleBlock2Regex, ''); // Remove the second one
    console.log("Removed second style block.");
}

if (replaced) {
    fs.writeFileSync('public/index.html', html);
    console.log("CSS successfully updated.");
} else {
    console.log("CSS block not found.");
}
