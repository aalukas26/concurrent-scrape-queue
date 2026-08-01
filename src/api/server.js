require('dotenv').config();
const express = require('express');
const pool = require('../db/pool');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/stats', async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT status, COUNT(*)::int AS count FROM jobs GROUP BY status`
    );

    const stats = {};
    for (const row of rows) {
      stats[row.status] = row.count;
    }

    res.json(stats);
  } catch (err) {
    console.error('Failed to fetch stats:', err);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
