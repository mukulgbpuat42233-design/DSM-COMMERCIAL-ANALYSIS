const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

const oldMedia = `@media (max-width: 980px) {
    .login-wrap {
        grid-template-columns: 1fr!important;
        padding: 40px 20px!important;
    }
    .login-wrap:after { display: none; }
    .thdc-login-brand { display: none; }
}`;

const newMedia = `@media (max-width: 980px) {
    .login-wrap {
        grid-template-columns: 1fr!important;
        padding: 40px 20px!important;
        gap: 30px!important;
    }
    .login-wrap:after { display: none; }
    .thdc-login-brand {
        padding-right: 0;
        text-align: center;
    }
    .thdc-login-logo {
        margin: 0 auto 16px;
    }
    .thdc-login-heading {
        font-size: 32px;
    }
    .thdc-feature-grid {
        display: none; /* Hide heavy features on mobile to save space */
    }
}`;

if (html.includes(oldMedia)) {
    html = html.replace(oldMedia, newMedia);
    fs.writeFileSync('public/index.html', html);
    console.log("Mobile CSS updated");
} else {
    console.log("Not found");
}
