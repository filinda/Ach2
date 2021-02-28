# Ach2
Simple node service.
To run this you need to set up mysql server, install nodejs and npm
create table in shema:

CREATE TABLE `used_vars` (
  `variable` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

configure db.js with your sql server params

API: https://www.postman.com/docking-module-astronomer-71571303/workspace/ach2publicworkspace/api/69a4cf00-ba68-46dc-94a3-b08c73038eb8?version=2e1f8e43-e137-4128-9a05-fd7d3ddb684b&tab=overview
