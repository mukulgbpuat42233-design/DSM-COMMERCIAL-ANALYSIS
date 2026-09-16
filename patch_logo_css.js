const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

const oldCss = `.thdc-login-logo {
    max-width: 320px;
    margin-bottom: 24px;
}`;

const newCss = `.thdc-login-logo {
    display: block;
    width: min(100%, 570px);
    max-width: 400px;
    height: auto;
    max-height: 145px;
    object-fit: contain;
    object-position: left center;
    margin-bottom: 28px;
    border-radius: 6px;
}`;

if (html.includes(oldCss)) {
    html = html.replace(oldCss, newCss);
    fs.writeFileSync('public/index.html', html);
    console.log("Logo CSS updated.");
} else {
    console.log("Logo CSS not found.");
}
