BEGIN;

DROP TABLE IF EXISTS users, sessions CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  password TEXT NOT NULL,
  avatar BYTEA NOT NULL
  
);

CREATE TABLE sessions (
   sid TEXT PRIMARY KEY,
   data JSON NOT NULL
);
  
  
INSERT INTO users ( email, name, avatar) VALUES
(
  'test@gmail.com',
  'Initial User',
  'Password123',
  'http://placekitten.com/200/300'
);

INSERT INTO sessions (sid, data) VALUES
(
  '1234',
  '{"test":"testing cookie"}'
);

COMMIT;