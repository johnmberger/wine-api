DROP DATABASE IF EXISTS wine_cellar;
CREATE DATABASE wine_cellar;

\c wine_cellar;

CREATE TABLE wines (
  id serial PRIMARY KEY,
  name varchar,
  region varchar,
  year numeric(4),
  price numeric(7,2),
  notes varchar,
  rating integer
);
