DROP DATABASE IF EXISTS `burgers2_db`;
CREATE DATABASE `burgers2_db`;
USE `burgers2_db`;

CREATE TABLE `burgers`
(
    id INT NOT NULL AUTO_INCREMENT,
	burger_name varchar(255) NOT NULL,
	devoured BOOLEAN DEFAULT FALSE,
	PRIMARY KEY (id)
);

SELECT * FROM burgers;