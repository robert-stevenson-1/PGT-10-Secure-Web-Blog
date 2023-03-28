CREATE TABLE accounts (
  ID SERIAL PRIMARY KEY, -- ID: auto-incrementing values as the primary key
  username VARCHAR(50) NOT NULL, -- username: A required string of max 50 characters long that reprisents the user's username
  password VARCHAR(512) NOT NULL, -- password: A required string of max 512 characters long that reprisents the user's password in a hashed format
  email VARCHAR(100) NOT NULL, -- email: A store the string of max 100 characters long of email that the user signed up with
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- created_at: The timestamp when the user account was created
  UNIQUE (username), -- make the username unique
  UNIQUE (email) -- make the email unique
);

-- Create a POSTS table for all the posts that users of the site will make
CREATE TABLE posts (
  ID SERIAL PRIMARY KEY,
  account_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (account_id) REFERENCES accounts (ID)
);

--load some fake account data
INSERT INTO accounts (username, password, email) VALUES
  ('johndoe', 'password123', 'johndoe@example.com'),
  ('janedoe', 'qwerty', 'janedoe@example.com'),
  ('bobsmith', 'mypassword', 'bobsmith@example.com'),
  ('maryjones', 'letmein', 'maryjones@example.com'),
  ('samjohnson', 'password1234', 'samjohnson@example.com');
-- 'ID' and 'created_at' will be automatically filled when inserted

INSERT INTO posts (account_id, title, content) VALUES
  (1, 'My first post', 'This is the content of my first post.'),
  (1, 'My second post', 'This is the content of my second post.'),
  (2, 'Why I love programming', 'Programming has always been a passion of mine. Here are some reasons why...'),
  (3, 'The benefits of exercise', 'Exercise is not only good for your physical health, but also your mental wellbeing.'),
  (4, 'My travel adventures', 'I''ve been lucky enough to visit some amazing places. Here are some of my favorite travel experiences.');
