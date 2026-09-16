const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

const t = '<div class="project-title-row"><h1 style="font-family:var(--display);font-size:23px;font-weight:700;margin:0;">${state.projectMeta.plant || state.projectMeta.name}</h1></div>\n        <div class="sub" style="font-size:12.5px;color:var(--muted);margin-top:3px;">${state.projectMeta.plant} · CERC DSM Regulations 2024</div>';
const r = '<div class="project-title-row"><h1 style="font-family:var(--display);font-size:24px;font-weight:900;margin:0;color:#0F172A;">Dashboard Overview</h1></div>\n        <div class="sub" style="font-size:13px;color:#475569;margin-top:4px;"><b>CERC DSM Regulations 2024</b> · Multi-Week Analytics</div>';

if (html.includes(t)) {
    html = html.replace(t, r);
    fs.writeFileSync('public/index.html', html);
    console.log("Home hero updated.");
} else {
    console.log("Not found.");
}
