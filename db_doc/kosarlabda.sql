CREATE DATABASE kosarlabda
	CHARACTER SET utf8
	COLLATE utf8_hungarian_ci;


CREATE TABLE kosarlabda.players (
  id INT(11) NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  positionId INT(11) NOT NULL,
  teamId INT(11) DEFAULT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB;


CREATE TABLE kosarlabda.`position` (
  id INT(11) NOT NULL AUTO_INCREMENT,
  posName VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB;



CREATE TABLE kosarlabda.teams (
  id INT(11) NOT NULL AUTO_INCREMENT,
  teamName VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB;

INSERT `position`
  (id, posName)
  VALUES
  (1,'Point guard'), (2,'Shooting guard'), (3, 'Small forward'), (4,'Power forward'), (5, 'Center');



SELECT * FROM `position`;
 

INSERT teams 
  (id, teamName)
  VALUES
  (1,'Chicago Bulls'), (2, 'Boston Celtics'), (3, 'Los Angeles Lakers' ), (4 , 'Golden State Warriors'), (5, 'Miami Heat');
 
SELECT * FROM teams;

INSERT players
  (name, positionId, teamId)
  VALUES
  ('Lonzo Ball', 1, 1), ('Patrick Beverley', 2, 1), ('	Alex Caruso', 3, 1), ('DeMar DeRozan', 4, 1), ('Ayo Dosunmu', 5, 1),
  ('Malcolm Brogdon', 1, 2), ('Jaylen Brown', 2, 2), ('JD Davison', 3, 2), ('Danilo Gallinari', 4, 2), ('	Blake Griffin', 5, 2),
  ('LeBron James', 1, 3), ('Mo Bamba', 2, 3), ('Malik Beasley', 3, 3), ('Troy Brown Jr', 4, 3), ('	Max Christie', 5, 3),
  ('Stephen Curry', 1, 4), ('Ryan Rollins', 2, 4), ('Patrick Baldwin Jr.', 3, 4), ('Draymond Green', 4, 4), ('Kevon Looney', 5, 4),
  ('Orlando Robinson', 1, 5), ('Bam Adebayo', 2, 5), ('	Jamal Cain', 3, 5), ('Jimmy Butler', 4, 5), ('Duncan Robinson', 5, 5);

SELECT * FROM players p
INNER JOIN teams t on p.teamId = t.id;


DELETE FROM players;





