const express = require("express");
const app = express();
const helmet = require("helmet");
app.use(helmet.hidePoweredBy());

app.use(
  helmet.frameguard({
    action: "deny",
  }),
  helmet.xssFilter(),
  helmet.noSniff(),
  helmet.ieNoOpen(),
  helmet.hsts({
    maxAge: 90 * 24 * 60 * 60,
    force: true,
  }),
  helmet.dnsPrefetchControl(),
  helmet.noCache(),
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "trusted-cdn.com"],
    },
  })
);

module.exports = app;
const api = require("./server.js");
app.use(express.static("public"));
app.disable("strict-transport-security");
app.use("/_api", api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + "/views/index.html");
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
