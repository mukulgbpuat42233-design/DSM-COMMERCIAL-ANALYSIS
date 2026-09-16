const fs = require('fs');
const html = fs.readFileSync('public/index.html', 'utf8');

const sIdx = html.indexOf('function renderLogin(){');
const eIdx = html.indexOf('async function loginPlantChanged(v){');
if(sIdx !== -1 && eIdx !== -1) {
    fs.writeFileSync('login_fn.txt', html.substring(sIdx, eIdx));
    console.log("Extracted renderLogin to login_fn.txt");
}
