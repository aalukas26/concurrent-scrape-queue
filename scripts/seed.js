const { enqueueMany } = require('../src/queue/enqueue');
const pool = require('../src/db/pool');

const urls = [
  'https://example.com/',

  'https://books.toscrape.com/',
  'https://books.toscrape.com/catalogue/page-2.html',
  'https://books.toscrape.com/catalogue/page-3.html',
  'https://books.toscrape.com/catalogue/category/books/mystery_3/index.html',
  'https://books.toscrape.com/catalogue/category/books/travel_2/index.html',

  'https://quotes.toscrape.com/',
  'https://quotes.toscrape.com/page/2/',
  'https://quotes.toscrape.com/page/3/',
  'https://quotes.toscrape.com/tag/love/',
  'https://quotes.toscrape.com/tag/inspirational/',

  'https://httpbin.org/html',
  'https://httpbin.org/status/200',
  'https://httpbin.org/links/10',
  'https://httpbin.org/anything',
];

async function seed() {
  const jobs = await enqueueMany(urls);
  console.log(`Enqueued ${jobs.length} jobs across ${new Set(jobs.map((j) => j.domain)).size} domains.`);
}

seed()
  .catch((err) => {
    console.error('Seeding failed:', err);
    process.exitCode = 1;
  })
  .finally(() => pool.end());
