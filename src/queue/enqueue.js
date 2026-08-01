const pool = require('../db/pool');

async function enqueue(url) {
  const domain = new URL(url).hostname;

  const { rows } = await pool.query(
    `INSERT INTO jobs (url, domain, status)
     VALUES ($1, $2, 'pending')
     RETURNING *`,
    [url, domain]
  );

  return rows[0];
}

async function enqueueMany(urls) {
  const jobs = [];
  for (const url of urls) {
    jobs.push(await enqueue(url));
  }
  return jobs;
}

module.exports = { enqueue, enqueueMany };
