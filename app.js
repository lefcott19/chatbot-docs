const express = require("express");
const fs = require("fs");
const hljs = require("highlight.js");
const md = require("markdown-it")({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre class="hljs"><code>' +
          hljs.highlight(lang, str, true).value +
          "</code></pre>"
        );
      } catch (__) {}
    }

    return (
      '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + "</code></pre>"
    );
  },
});
const app = express();

app.get("/", (req, res) => {
  res.status(200).send(fs.readFileSync(`${__dirname}/index.html`).toString());
});

const define = (utility) => {
  const keys = Object.keys(utility);
  for (let k = 0; k < keys.length; k += 1) {
    const key = keys[k];
    app.get(`/${key}`, (req, res) => {
      res.status(200).sendFile(`${__dirname}/md/${key}.html`);
    });
    utility[key].forEach(
      (t) =>
        console.log(key, t) ||
        app.get(`/${key}/${t}`, (req, res) => {
          res.status(200).send(
            `<html>
               <head>
                 <title>${key} - ${t}</title>
                 <link rel='shortcut icon' href='/favicon.png'>
                 <link href="https://fonts.googleapis.com/css?family=Jost&display=swap" rel="stylesheet">
                 <style>
                   body {
                     background-color: #cdd;
                     font-family: "Jost";
                   }
                   ${fs.readFileSync(`${__dirname}/markdown.css`).toString()}
                   ${fs.readFileSync(`${__dirname}/hsjs.css`).toString()}
                 </style>
               </head>
               <body>
               ${md.render(
                 fs.readFileSync(`${__dirname}/md/${key}/${t}.md`).toString()
               )}
               </body>
               </html>`
          );
        })
    );
  }
};
app.get("/style.css", (req, res) => res.sendFile(`${__dirname}/md/style.css`));
app.get("/favicon.png", (req, res) => res.sendFile(`${__dirname}/favicon.png`));
const t = {
  camuzzi: ["saldo", "tarifa-social"],
  edenor: ["saldo", "consumo", "reclamos", "recarga-mide"],
  edelap: ["saldo", "descarga-factura", "reclamo-tecnico"],
  eden: ["saldo", "ultima-factura"],
  edes: ["saldo", "nises", "ultima-factura"],
  "notifications-mailer": ["emails", "templates", "deliveries", "model-template"],
};
define(t);
app.listen(process.env.PORT || 1500);
