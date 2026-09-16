const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');
html = html.replace(
  "const p=window.THDC_PLANTS[v];",
  "const p=window.THDC_PLANTS?.[v]||{};"
);
fs.writeFileSync('public/index.html', html);
