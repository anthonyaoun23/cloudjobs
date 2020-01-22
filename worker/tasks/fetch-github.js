var fetch = require("node-fetch");
var redis = require("redis"),
  client = redis.createClient();
const { promisify } = require("util");
// const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

const baseUrl = "https://jobs.github.com/positions.json";

async function fetchGithub() {
  let count = 1,
    onPage = 0;
  const allJobs = [];
  while (count > 0) {
    const res = await fetch(`${baseUrl}?page=${onPage}`);
    const jobs = await res.json();
    allJobs.push(...jobs);
    count = jobs.length;
    console.log("Found " + count + " jobs.");
    onPage++;
  }

  const jrJobs = allJobs.filter(job => {
    const jobTitle = job.title.toLowerCase();
    if (
      jobTitle.includes("senior") ||
      jobTitle.includes("manager") ||
      jobTitle.includes("sr.") ||
      jobTitle.includes("architect")
    ) {
      return false;
    }
    return true;
  });

  console.log("Filtered down to " + jrJobs.length + " jobs.");

  console.log("Found a total of " + allJobs.length + " jobs");
  const success = await setAsync("github", JSON.stringify(jrJobs));
  console.log(success);
}

module.exports = fetchGithub;
