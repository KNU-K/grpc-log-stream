-- 데이터베이스 생성
CREATE DATABASE SERVER_LOG;

-- 데이터베이스 사용
\c SERVER_LOG

-- TimescaleDB 확장 활성화
CREATE EXTENSION IF NOT EXISTS timescaledb;

-- 기존 테이블 삭제 (이미 존재하는 경우)
DROP TABLE IF EXISTS logs;

-- 테이블 생성
CREATE TABLE logs (
    sequence_id BIGSERIAL,
    timestamp TIMESTAMPTZ NOT NULL,
    node TEXT,
    level TEXT,
    message TEXT,
    PRIMARY KEY (timestamp, sequence_id)
);

-- 하이퍼테이블 생성
SELECT create_hypertable('logs', 'timestamp');
