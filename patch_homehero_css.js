const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

const t = ".home-hero{background:linear-gradient(115deg,#fff,#F2F7FD)!important;border:1px solid #D4DFEA!important;border-radius:12px!important;box-shadow:0 5px 20px rgba(8,35,70,.06)!important}";
const r = ".home-hero{background:linear-gradient(115deg,#fff,#F8FAFC)!important;border:1px solid #E2E8F0!important;border-radius:16px!important;box-shadow:0 4px 15px rgba(0,0,0,.03)!important; padding: 20px 24px!important; margin-bottom: 24px!important;}";

if (html.includes(t)) {
    html = html.replace(t, r);
    fs.writeFileSync('public/index.html', html);
    console.log("Home hero CSS updated.");
} else {
    console.log("Not found.");
}
