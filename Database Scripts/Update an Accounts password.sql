UPDATE accounts
SET password = 'new_password' -- this is where the new password value for the account would be
WHERE id = account_id; -- account_id: specify which account we are updating the password for
