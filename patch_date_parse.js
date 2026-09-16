const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

const t = "} else dateStr = String(dateVal||'').slice(0,10);";
const r = `} else {
          let s = String(dateVal||'').trim().slice(0,10);
          let m = s.match(/^(\\d{2})[-/](\\d{2})[-/](\\d{4})$/);
          if (m) {
             dateStr = m[3] + '-' + m[2] + '-' + m[1];
          } else {
             dateStr = s;
          }
        }`;

if (html.includes(t)) {
    html = html.replace(t, r);
    fs.writeFileSync('public/index.html', html);
    console.log("Date parser in scanForDays updated.");
} else {
    console.log("Target line not found.");
}
