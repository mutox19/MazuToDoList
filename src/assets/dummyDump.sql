CREATE TABLE IF NOT EXISTS Users(id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE,userName TEXT,email TEXT,password TEXT);
CREATE TABLE IF NOT EXISTS Todo(id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE,name TEXT, email TEXT);
INSERT INTO Users(userName, email, password) VALUES ('dlo', 'dan@hot.com', 'danilo');
INSERT INTO Users(userName, email, password) VALUES ('Mazu', 'mazu@mazu.com', 'mazu');
INSERT INTO Todo(name, email) VALUES ('Grocery Shopping', 'dan@hot.com');
INSERT INTO Todo(name, email) VALUES ('Recruitment', 'mazu@mazu.com');
INSERT INTO Todo(name, email) VALUES ('Recruitment', 'dan@hot.com');
