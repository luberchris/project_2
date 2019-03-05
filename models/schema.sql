CREATE TABLE users (
	id INT(11) NOT NULL,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE events (
	id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    date DATETIME NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE reviews (
	id INT(11) NOT NULL AUTO_INCREMENT,
    score INT(11) NOT NULL,
    review TEXT,
    user_id INT(11) NOT NULL,
    event_id INT(11) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id)
		REFERENCES users(id),
	FOREIGN KEY (event_id)
		REFERENCES events(id)
);