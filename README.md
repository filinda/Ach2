# Ach2
Simple node service.
To run this you need to set up mysql server, install nodejs and npm
create table in shema:

CREATE TABLE `used_vars` (
  `variable` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

configure db.js with your sql server params

POST request example:

Content-Type: application/json
body:
{
    "newVal": "36"
}
