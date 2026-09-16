const fs = require('fs');
const html = fs.readFileSync('public/index.html', 'utf8');

const regex = /<script>([\s\S]*?)<\/script>/gi;
let match;
let i = 0;
while ((match = regex.exec(html)) !== null) {
    const scriptContent = match[1];
    fs.writeFileSync(`script_test_${i}.js`, scriptContent);
    i++;
}
