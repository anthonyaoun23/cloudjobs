const express = require("express");
const app = express();

var redis = require("redis"),
  client = redis.createClient();
const { promisify } = require("util");
const getAsync = promisify(client.get).bind(client);

app.get("/jobs", async function(req, res) {
  const jobs = await getAsync("github");
  console.log(jobs)
  return res.send(jobs);
});

app.listen(3001, () => console.log("Listening on port 3001"));
