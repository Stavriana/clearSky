-- ENUM types
CREATE TYPE user_role AS ENUM ('STUDENT', 'INSTRUCTOR', 'INST_REP', 'ADMIN');
CREATE TYPE auth_provider AS ENUM ('LOCAL', 'GOOGLE', 'INSTITUTION');

-- Institution table
CREATE TABLE institution (
    id              SERIAL PRIMARY KEY,
    name            VARCHAR(50)  NOT NULL,
    email           VARCHAR(80)  NOT NULL UNIQUE,
    credits_balance INTEGER      NOT NULL DEFAULT 0,
    created_at      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Users table
CREATE TABLE users (
    id             SERIAL PRIMARY KEY,
    username       VARCHAR(30)   NOT NULL UNIQUE,
    email          VARCHAR(80)   NOT NULL UNIQUE,
    full_name      VARCHAR(80)   NOT NULL,
    role           user_role     NOT NULL,
    external_id    INTEGER,
    am             INTEGER,
    institution_id INTEGER,
    created_at     TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_users_am UNIQUE (am),
    CONSTRAINT fk_user_institution FOREIGN KEY (institution_id)
        REFERENCES institution(id) ON UPDATE CASCADE ON DELETE RESTRICT
);
CREATE UNIQUE INDEX uq_users_external_id ON users (external_id) WHERE external_id IS NOT NULL;
CREATE UNIQUE INDEX uq_one_rep_per_inst_idx
    ON users (institution_id)
    WHERE role = 'INST_REP';

-- Auth account table
CREATE TABLE auth_account (
    id              SERIAL PRIMARY KEY,
    user_id         INTEGER       NOT NULL,
    provider        auth_provider NOT NULL,
    provider_uid    VARCHAR(128)  NOT NULL,
    password_hash   VARCHAR(255),
    password_salt   VARCHAR(255),
    created_at      TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_login      TIMESTAMP,
    CONSTRAINT fk_auth_user FOREIGN KEY (user_id)
        REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT uq_provider_uid UNIQUE (provider, provider_uid)
);
CREATE INDEX idx_auth_user ON auth_account (user_id);

CREATE TABLE course (
    id             SERIAL PRIMARY KEY,
    code           VARCHAR(10)  NOT NULL UNIQUE,
    title          VARCHAR(50)  NOT NULL,
    exam_period    VARCHAR(20),
    description    TEXT,
    instructor_id  INTEGER      NOT NULL,
    institution_id INTEGER      NOT NULL,
    created_at     TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_course_instructor  FOREIGN KEY (instructor_id)  REFERENCES users(id),
    CONSTRAINT fk_course_institution FOREIGN KEY (institution_id) REFERENCES institution(id)
);
