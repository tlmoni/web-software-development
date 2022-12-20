import { executeQuery } from "../database/database.js";

const addUser = async (email, password) => {
  await executeQuery(
    "INSERT INTO users (email, password) VALUES ($email, $password)",
    { email: email, password: password }
  );
};

const getUserByEmail = async (email) => {
  const result = await executeQuery(
    "SELECT * FROM users WHERE email = $email",
    { email: email }
  );

  return result.rows;
};

export { addUser, getUserByEmail };
