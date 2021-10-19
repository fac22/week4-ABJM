BEGIN;

DROP TABLE IF EXISTS users, sessions, recipes CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  password TEXT NOT NULL
  -- avatar BYTEA
  
);

CREATE TABLE sessions (
   sid TEXT PRIMARY KEY,
   data JSON NOT NULL
);
  

CREATE TABLE recipes (
   pid SERIAL PRIMARY KEY,
   title TEXT NOT NULL,
   ingredients TEXT NOT NULL,
   instructions TEXT NOT NULL,
   user_id INTEGER REFERENCES users(id)
);

INSERT INTO users ( email, name, password) VALUES
(
  'test@gmail.com',
  'Initial User',
  'Password123'
  -- 'http://placekitten.com/200/300'
);

INSERT INTO sessions (sid, data) VALUES
(
  '1234',
  '{"test":"testing cookie"}'
);

INSERT INTO recipes (title, ingredients, instructions, user_id) VALUES
(
  'Strawberry Jam',
  '1kg strawberries, 1kg jam sugar',
  'Cut up the strawberries, mix with the jam sugar. Boil for 5 minutes. 
  Take a setting test on a cold plate. Fill jam into sterilised jars and close immediately.',
  1
);

COMMIT;