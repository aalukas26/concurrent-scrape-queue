const cheerio = require('cheerio');

const TIMEOUT_MS = 10000;
const USER_AGENT = 'ConcurrentScrapeQueueBot/1.0 (+https://github.com/aalukas26/concurrent-scrape-queue)';

async function scrape(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  let response;
  try {
    response = await fetch(url, {
      headers: { 'User-Agent': USER_AGENT },
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }

  if (!response.ok) {
    throw new Error(`Request to ${url} failed with status ${response.status}`);
  }

  const html = await response.text();
  const $ = cheerio.load(html);

  const title = $('title').first().text().trim();
  const h1s = $('h1').map((_, el) => $(el).text().trim()).get();
  const linkCount = $('a').length;
  const textLength = $('body').text().trim().length;

  return { title, h1s, linkCount, textLength };
}

module.exports = { scrape };
