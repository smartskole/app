const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors()); // using cors as middleware
// app.set("trust proxy", true); // allow grab request IP

const port = 8001; // arbitrary
app.get("/source/*", (req, res) => {
  fetch(req.params[0])
    .then((res) => res.text()) // get response text from fetching RSS URL
    .then((contents) => {
      // process fetched RSS data
      res.set("Content-Type", "application/xml");
      res.send(contents);
      console.log(
        `Request proxied! ✅\nRequest from: ${req.ip} 📶, to proxy: ${req.params[0]}`
      );
    })
    .catch((e) => {
      console.error(e + "❌");
    });
});

app.listen(port, () => {
  console.log(`CORS RSS proxy running on port ${port}`);
});
