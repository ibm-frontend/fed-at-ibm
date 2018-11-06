const compression = require("compression");
const express = require("express");
const fs = require("fs");
const https = require("https");
const { join } = require("path");
const next = require("next");

const contentful = require("./contentful");
const keys = require("../.keys.js");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;
const certOptions = {
  key: fs.readFileSync("certs/key.pem"),
  cert: fs.readFileSync("certs/cert.pem"),
  passphrase: keys.certPassphrase
};

app
  .prepare()
  .then(() => {
    const server = express();

    // Forward requests to secure connections
    server.enable("trust proxy");
    server.use(compression());
    server.use(function(req, res, next) {
      if (req.secure) {
        next();
      } else {
        res.redirect(`https://${req.headers.host}${req.url}`);
      }
    });

    // Proxy all requests at /contentful to the endpoints in ./contentful.js
    contentful(server);

    // Handle page requests with a trailing slash added
    server.use((req, res, next) => {
      const test = /\?[^]*\//.test(req.url);
      if (req.url.substr(-1) === "/" && req.url.length > 1 && !test) {
        app.render(req, res, req.path.slice(0, -1));
      } else {
        next();
      }
    });

    // Pages dynamically rendered from API response
    // need to be server-side rendered
    server.get("/feducation/:id", (req, res) => {
      const queryParams = { id: req.params.id };
      app.render(req, res, "/feducation", queryParams);
    });

    // Service worker route for offline support
    server.use("/service-worker.js", (req, res) => {
      app.serveStatic(req, res, join(__dirname, "../.next/service-worker.js"));
    });

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    const finalServer = dev ? https.createServer(certOptions, server) : server;

    finalServer.listen(port, err => {
      if (err) throw err;
      console.log(`> Ready on https://localhost:${port}/`);
      console.log("> Remember that https is required!");
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
