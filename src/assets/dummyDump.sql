CREATE TABLE IF NOT EXISTS Users(id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE,userName VARCHAR(32),email VARCHAR(32),password VARCHAR(32));
CREATE TABLE IF NOT EXISTS Todo(id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE,name VARCHAR(32), email VARCHAR(32));
INSERT INTO Users(userName, email, password) VALUES ('dlo', 'dan@hot.com', 'danilo');
INSERT INTO Users(userName, email, password) VALUES ('Mazu', 'mazu@mazu.com', 'mazu');
INSERT INTO Todo(name, email) VALUES ('Grocery Shopping', 'dan@hot.com');
INSERT INTO Todo(name, email) VALUES ('Recruitment', 'mazu@mazu.com');
INSERT INTO Todo(name, email) VALUES ('Recruitment', 'dan@hot.com');

