const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

const t = ".login-card {";
const r = `@keyframes slideUpFade {
    0% { opacity: 0; transform: translateY(30px); }
    100% { opacity: 1; transform: translateY(0); }
}

@keyframes slideRightFade {
    0% { opacity: 0; transform: translateX(-30px); }
    100% { opacity: 1; transform: translateX(0); }
}

.thdc-login-brand {
    animation: slideRightFade 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.login-card {
    animation: slideUpFade 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;`;

if(html.includes(t)) {
    html = html.replace(t, r);
    fs.writeFileSync('public/index.html', html);
    console.log("Animation added");
}
