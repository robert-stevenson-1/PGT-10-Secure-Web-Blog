--load some fake account data
INSERT INTO accounts (username, password, email) VALUES
  ('johndoe', 'password123', 'johndoe@example.com'),
  ('janedoe', 'qwerty', 'janedoe@example.com'),
  ('bobsmith', 'mypassword', 'bobsmith@example.com'),
  ('maryjones', 'letmein', 'maryjones@example.com'),
  ('samjohnson', 'password1234', 'samjohnson@example.com');
-- 'ID' and 'created_at' will be automatically filled when inserted