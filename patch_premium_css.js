const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

const regex = /<style id="thdc-premium-page-style">[\s\S]*?<\/style>/;
const newCss = `<style id="thdc-premium-page-style">
:root{--ink:#0F172A;--navy:#062E73;--blue:#0B63CE;--line:#E2E8F0;--soft:#F8FAFC}
html,body{background:#E2E8F0!important;color:#0F172A!important}
body{font-family:'Inter',system-ui,-apple-system,sans-serif;-webkit-font-smoothing:antialiased}
.app{padding: 24px 40px 90px!important; width: 100%; box-sizing: border-box;}
.topbar{position:sticky;top:0;z-index:40;margin:0 -40px 24px!important;padding:16px 40px!important;background:rgba(255,255,255,.95);backdrop-filter:blur(12px);border-bottom:1px solid #E2E8F0;box-shadow:0 10px 30px rgba(0,0,0,.03)}
.topbar-left h1, .topbar-left h2{font-size:24px!important;font-weight:900!important;color:#0F172A!important;letter-spacing:-.02em!important}
.topbar-left .sub{font-size:13px!important;color:#475569!important}
.nav-tabs{background:#F1F5F9!important;border:1px solid #E2E8F0!important;border-radius:10px!important;padding:4px!important;}
.nav-tab{font-size:13px!important;font-weight:800!important;color:#64748B!important;border-radius:8px!important;padding:8px 16px!important;}
.nav-tab.active{background:#003399!important;color:#fff!important;box-shadow:0 4px 10px rgba(0,51,153,.2)!important;}
.week-select-wrap{border:1px solid #E2E8F0!important;border-radius:10px!important;background:#F8FAFC!important;padding:0 4px!important;height:38px!important;}
.week-select-wrap label{color:#475569!important;font-weight:800!important;font-size:11px!important;padding-left:12px!important;}
.week-select-wrap select{color:#0F172A!important;font-weight:800!important;}
.btn{border:1px solid #CBD5E1!important;background:#fff!important;color:#334155!important;border-radius:10px!important;font-weight:800!important;box-shadow:0 2px 4px rgba(0,0,0,.02)!important;transition:all 0.2s ease!important;height:38px!important;padding:0 16px!important;}
.btn:hover{background:#F8FAFC!important;border-color:#94A3B8!important;transform:translateY(-1px)!important;}
.btn-primary{background:linear-gradient(180deg,#0073CF,#005BB5)!important;border:none!important;color:#fff!important;box-shadow:0 4px 12px rgba(0,115,207,.25)!important;}
.btn-primary:hover{background:linear-gradient(180deg,#005BB5,#004A99)!important;border:none!important;}
.btn-danger{background:#EF4444!important;border:none!important;color:#fff!important;box-shadow:0 4px 12px rgba(239,68,68,.2)!important;}
button.btn.btn-primary[onclick="exportPDF()"]{background:#EF4444!important;box-shadow:0 4px 12px rgba(239,68,68,.25)!important;}
button.btn.btn-primary[onclick="exportPDF()"]:hover{background:#DC2626!important;}
.user-chip{background:#F8FAFC!important;border:1px solid #E2E8F0!important;color:#334155!important;border-radius:10px!important;padding:0 12px!important;}
.user-chip b{color:#0F172A!important}
.panel,.rev-panel,.recon-panel,.ins-card,.freq-card,.frday-card,.fr-visual,.fr-timeline{background:#fff!important;border:1px solid #E2E8F0!important;border-radius:16px!important;box-shadow:0 10px 30px rgba(0,0,0,.03)!important}
.panel{padding:24px!important}
.panel-title,.recon-title,.rev-title,.ins-title,.freq-title,.frday-title{color:#0F172A!important;font-weight:900!important;font-size:18px!important;}
.panel-title .n,.recon-sub,.rev-sub,.ins-sub,.freq-sub,.frday-sub{color:#64748B!important;font-size:13px!important;margin-top:4px!important;}
.kpi-card{border:1px solid #E2E8F0!important;border-top:5px solid #0073CF!important;border-radius:14px!important;background:#fff!important;box-shadow:0 10px 25px rgba(0,0,0,.04)!important;padding:20px!important;min-height:100px!important}
.kpi-card.c-green{border-top-color:#10B981!important}
.kpi-card.c-red{border-top-color:#EF4444!important}
.kpi-card.c-amber{border-top-color:#F59E0B!important}
.kpi-label{font-size:12px!important;color:#64748B!important;font-weight:800!important;letter-spacing:0.05em!important;text-transform:uppercase!important;margin-bottom:8px!important;}
.kpi-value{font-size:26px!important;color:#0F172A!important;font-weight:900!important;}
.kpi-value .unit{font-size:13px!important;color:#94A3B8!important;margin-left:6px!important;}
.kpi-sub{font-size:11px!important;color:#64748B!important;margin-top:6px!important;}
.home-hero{background:linear-gradient(115deg,#fff,#F8FAFC)!important;border:1px solid #E2E8F0!important;border-radius:16px!important;box-shadow:0 4px 15px rgba(0,0,0,.03)!important; padding: 24px!important; margin-bottom: 24px!important;}
.home-week-card {background: #fff; border: 1px solid #E2E8F0; border-radius: 12px; padding: 16px; box-shadow: 0 4px 10px rgba(0,0,0,.02); transition: all 0.2s;}
.home-week-card:hover {transform: translateY(-2px); box-shadow: 0 10px 25px rgba(0,0,0,.05); border-color: #CBD5E1;}
.home-week-card .wk-num {font-size: 16px; font-weight: 900; color: #0F172A;}
.home-week-card .wk-stat {font-size: 12px; color: #64748B; margin-top: 4px;}
.home-week-card .wk-charge {font-size: 16px; font-weight: 800; margin-top: 8px;}
.home-week-card.empty-week {background: #F8FAFC; border: 1px dashed #CBD5E1; opacity: 0.8;}
.thdc-save-controls { display: flex; align-items: center; gap: 8px; }
.thdc-save-status { font-size: 11px; font-weight: 700; color: #64748B; background: #F1F5F9; padding: 6px 10px; border-radius: 8px; border: 1px solid #E2E8F0; }
</style>`;

if (regex.test(html)) {
    html = html.replace(regex, newCss);
    fs.writeFileSync('public/index.html', html);
    console.log("Premium styles updated.");
} else {
    console.log("Not found.");
}
