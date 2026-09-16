const regex = /<script>([\s\S]*?)<\/script>/gi;
const html = require('fs').readFileSync('public/index.html', 'utf8');
let m = regex.exec(html); // first match
try {
  new Function(m[1]);
  console.log("Passed!");
} catch(e) {
  console.log(e);
}
