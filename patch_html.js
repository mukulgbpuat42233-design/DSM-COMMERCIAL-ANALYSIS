const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

const t = "  <div class=\"login-authority\" id=\"loginAuthorityBox\">GRID / SETTLEMENT AUTHORITY: <b>${authority}</b><span style=\"float:right\">${plant.capacity} MW</span></div>";
const r = "  <div class=\"login-authority\" id=\"loginAuthorityBox\">GRID / SETTLEMENT AUTHORITY: <b>${authority||''}</b><span style=\"float:right\">${plant?plant.capacity:''} MW</span></div>";

html = html.replace(t, r);
fs.writeFileSync('public/index.html', html);
