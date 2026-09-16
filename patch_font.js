const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

const t = ".login-wrap {";
const r = ".login-wrap { font-family: 'Inter', system-ui, -apple-system, sans-serif;";

if(html.includes(t)) {
    html = html.replace(t, r);
    fs.writeFileSync('public/index.html', html);
    console.log("Font added");
}
