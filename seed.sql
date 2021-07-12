INSERT INTO Flags(title, description, is_active) VALUES ('LOGIN_MICROSERVICE', 'Redirects users to the login microservice', FALSE)
INSERT INTO Strategies(flagId, percentage) VALUES (1, 0.1)
INSERT INTO Logs(flagId, description) VALUES (1, 'Created new flag: LOGIN_MICROSERVICE')