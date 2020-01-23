const express = require("express");
const cors = require("cors");
const app = express();

var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

var redis = require("redis"),
  client = redis.createClient();
const { promisify } = require("util");
const getAsync = promisify(client.get).bind(client);

app.get("/api/jobs", cors(corsOptions), async function(req, res) {
  const jobs = await getAsync("github");
  res.header();
  return res.send(jobs);
});

app.listen(3001, () => console.log("Listening on port 3001"));
