const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

// Update renderWeekView topbar
const weekViewTopbarOld = `<div class="topbar-left">
        <div class="project-title-row"><h1>\${state.projectMeta.plant || state.projectMeta.name}</h1></div>
        <div class="sub">\${state.projectMeta.plant} · <b>CERC DSM Regulations 2024</b> · 7 Days · 672 Blocks / week</div>
      </div>`;
const weekViewTopbarNew = `<div class="topbar-left">
        <div class="project-title-row"><h2 style="font-size: 20px; font-weight: 800; color: #062E73; margin: 0;">Weekly Analytics</h2></div>
        <div class="sub" style="font-size: 12px; color: #475569; margin-top: 4px;"><b>CERC DSM Regulations 2024</b> · 7 Days · 672 Blocks / week</div>
      </div>`;
html = html.replace(weekViewTopbarOld, weekViewTopbarNew);

// Update renderHome topbar
const homeTopbarOldRegex = /<div class="topbar-left">\s*<div class="project-title-row"><h1[^>]*>\$\{state\.projectMeta\.plant \|\| state\.projectMeta\.name\}<\/h1><\/div>\s*<div class="sub">\$\{state\.projectMeta\.plant\} · <b>CERC DSM Regulations 2024<\/b><\/div>\s*<\/div>/;
const homeTopbarNew = `<div class="topbar-left">
        <div class="project-title-row"><h2 style="font-size: 20px; font-weight: 800; color: #062E73; margin: 0;">Dashboard Overview</h2></div>
        <div class="sub" style="font-size: 12px; color: #475569; margin-top: 4px;"><b>CERC DSM Regulations 2024</b> · Plant Summary</div>
      </div>`;

if (homeTopbarOldRegex.test(html)) {
    html = html.replace(homeTopbarOldRegex, homeTopbarNew);
    console.log("Home topbar replaced.");
} else {
    console.log("Home topbar not found.");
}

// Ensure the layout wrapper covers everything cleanly.
// Also add some styling to make the app background consistent and buttons colored better.
// The user asked for it to be "colored".
const oldBodyBg = `background:linear-gradient(180deg,#F7F9FC,#F2F6FA)!important`;
const newBodyBg = `background:#E2E8F0!important`;
if (html.includes(oldBodyBg)) {
    html = html.replace(oldBodyBg, newBodyBg);
    console.log("Body background updated.");
}

fs.writeFileSync('public/index.html', html);
