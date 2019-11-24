INSERT INTO burgers (burger_name, devoured, createdAt, updatedAt)
VALUES ("Bacon Cheese Burger", false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ("Quarter Pounder with Cheese", true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ("Big Mac", false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ("Whopper with Cheese", true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ("BBQ Western Burger", false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
       
SELECT * FROM burgers;