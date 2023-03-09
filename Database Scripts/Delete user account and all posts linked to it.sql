BEGIN;
-- Delete all posts associated with the user account
DELETE FROM posts
WHERE account_id = account_id_to_delete; -- account_id_to_delete: The ID of the user we want to delete

-- Delete the account
DELETE FROM accounts
WHERE ID = account_id_to_delete;

COMMIT;
