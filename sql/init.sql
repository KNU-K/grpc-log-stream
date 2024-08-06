-- 데이터베이스 생성
CREATE DATABASE SERVER_LOG;

-- 데이터베이스 사용
\c SERVER_LOG

-- TimescaleDB 확장 활성화
CREATE EXTENSION IF NOT EXISTS timescaledb;

drop table logs;
-- 테이블 생성
CREATE TABLE logs (
    id BIGSERIAL PRIMARY KEY,
    node TEXT,
    timestamp TIMESTAMPTZ,
    level TEXT,
    message TEXT
);

-- 하이퍼테이블 생성
SELECT create_hypertable('logs', 'id');
