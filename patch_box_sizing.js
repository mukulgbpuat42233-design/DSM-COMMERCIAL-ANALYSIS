const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

const t = 'border-bottom: 4px solid #F59E0B;">';
const r = 'border-bottom: 4px solid #F59E0B; box-sizing: border-box;">';

if (html.includes(t)) {
    html = html.replace(t, r);
    fs.writeFileSync('public/index.html', html);
    console.log("box-sizing added.");
}
