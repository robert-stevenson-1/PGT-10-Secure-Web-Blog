-- Create a POSTS table for all the posts that users of the site will make
CREATE TABLE posts (
  ID SERIAL PRIMARY KEY,
  account_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (account_id) REFERENCES accounts (ID)
);
