CREATE TABLE IF NOT EXISTS jobs (
    id SERIAL PRIMARY KEY,
    url TEXT NOT NULL,
    domain TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    attempts INTEGER NOT NULL DEFAULT 0,
    max_attempts INTEGER NOT NULL DEFAULT 5,
    next_attempt_at TIMESTAMP NOT NULL DEFAULT NOW(),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    completed_at TIMESTAMP,
    result JSONB,
    error_message TEXT
);

CREATE INDEX IF NOT EXISTS idx_jobs_status_next_attempt_at ON jobs (status, next_attempt_at);
CREATE INDEX IF NOT EXISTS idx_jobs_domain_status ON jobs (domain, status);
