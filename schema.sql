CREATE DATABASE qnzrky2vg4n4sjmn;

USE qnzrky2vg4n4sjmn;

-- CREATE TABLE users (
-- 	id INT(11) NOT NULL,
--     username VARCHAR(255) NOT NULL,
--     password VARCHAR(255) NOT NULL,
--     PRIMARY KEY (id)
-- );

-- CREATE TABLE events (
-- 	id INT(11) NOT NULL AUTO_INCREMENT,
--     info JSON NOT NULL,
--     PRIMARY KEY (id)
-- );

-- CREATE TABLE reviews (
-- 	id INT(11) NOT NULL AUTO_INCREMENT,
--     score INT(11) NOT NULL,
--     review TEXT,
--     user_id INT(11) NOT NULL,
--     event_id INT(11) NOT NULL,
--     PRIMARY KEY (id),
--     FOREIGN KEY (user_id)
-- 		REFERENCES users(id)
--         ON UPDATE CASCADE
--         ON DELETE CASCADE,
-- 	FOREIGN KEY (event_id)
-- 		REFERENCES events(id)
--         ON UPDATE CASCADE
--         ON DELETE CASCADE
-- );

-- CREATE TABLE favorites (
--  id INT(11) NOT NULL AUTO_INCREMENT,
--  user_id INT(11) NOT NULL,
--  event_id INT(11) NOT NULL,
--  PRIMARY KEY (id),
--  FOREIGN KEY (user_id)
-- 	REFERENCES users(id)
--     ON UPDATE CASCADE
--     ON DELETE CASCADE,
-- FOREIGN KEY (id)
-- 	REFERENCES events(id)
-- 	ON UPDATE CASCADE
--     ON DELETE CASCADE
--     );
