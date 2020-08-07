import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import { ServerLocation } from "@reach/router";
import fs from "fs";
import App from "../src/App";

const PORT = process.env.PORT || 3000;

const html = fs.readFileSync("dist/index.html").toString();

const app = express();

app.use("/public", express.static("dist"));

app.use((req, res) => {
  const reactMarkup = (
    <ServerLocation url={req.url}>
      <App />
    </ServerLocation>
  );
  res.send(html.replace("not rendered", renderToString(reactMarkup)));
  res.end();
});

console.log("listenig on " + PORT);
app.listen(PORT);
