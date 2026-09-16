const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

const t = "  <div class=\"login-authority\" id=\"loginAuthorityBox\">GRID / SETTLEMENT AUTHORITY: <b>${authority}</b><span style=\"float:right\">${plant.capacity} MW</span></div>";
console.log(html.includes(t));

