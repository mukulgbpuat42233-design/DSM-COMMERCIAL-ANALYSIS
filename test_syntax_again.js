const fs = require('fs');
const html = fs.readFileSync('public/index.html', 'utf8');

const regex = /<script>([\s\S]*?)<\/script>/gi;
let match;
while ((match = regex.exec(html)) !== null) {
    try {
        new Function(match[1]);
    } catch (e) {
        console.error('Error parsing script:', e);
        process.exit(1);
    }
}
console.log('Valid');
