CREATE TABLE accounts (
  ID SERIAL PRIMARY KEY, -- ID: auto-incrementing values as the primary key
  username VARCHAR(50) NOT NULL, -- username: A required string of max 50 characters long that reprisents the user's username
  password VARCHAR(512) NOT NULL, -- password: A required string of max 512 characters long that reprisents the user's password in a hashed format
  email VARCHAR(100) NOT NULL, -- email: A store the string of max 100 characters long of email that the user signed up with
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- created_at: The timestamp when the user account was created
  UNIQUE (username), -- make the username unique
  UNIQUE (email) -- make the email unique
);