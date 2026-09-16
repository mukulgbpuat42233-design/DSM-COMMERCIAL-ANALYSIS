const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

// Insert a wrapper around the hardcoded DOM elements and #app
if (!html.includes('id="main-layout-wrapper"')) {
    html = html.replace('<body>', '<body>\n<div id="main-layout-wrapper" style="max-width: 1480px; margin: 0 auto; background: #fff; box-shadow: 0 0 40px rgba(0,0,0,0.05); min-height: 100vh;">');
    html = html.replace('</body>', '</div>\n</body>');
    fs.writeFileSync('public/index.html', html);
    console.log("Wrapper added.");
}
