# Concurrent Scraper Task Queue

Fault-tolerant, concurrent web scraping task queue with a hand-rolled worker pool, retry/backoff, and per-domain rate limiting. Queue mechanics implemented directly on PostgreSQL rather than delegated to a job queue library.


## Status
In progress

## Plan
- Concurrent worker pool pulling jobs from a Postgres-backed queue
- Per-domain rate limiting (only one worker per domain at a time)
- Exponential backoff retry logic for failed jobs
- Dead-letter handling for jobs that exceed max retries
- Simple status dashboard (queue depth, in-progress, completed, failed)

## Stack
Node.js, Express, PostgreSQL
