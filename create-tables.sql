CREATE TABLE IF NOT EXISTS users (
    id SERIAL NOT NULL UNIQUE,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS maps (
    id SERIAL NOT NULL UNIQUE,
    user_id INT REFERENCES users(id),
    mapname TEXT NOT NULL,
    fc_mapstate JSON NOT NULL
);

CREATE TABLE IF NOT EXISTS favmaps (
    id SERIAL NOT NULL UNIQUE,
    user_id INT REFERENCES users(id),
    map_id INT REFERENCES maps(id)
);