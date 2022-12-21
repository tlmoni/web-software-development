import { executeQuery } from "../database/database.js";

const addTopic = async (userId, name ) => {
  await executeQuery(
    "INSERT INTO topics (user_id, name) VALUES ($userId, $name)",
    { userId: userId, name: name }
  );
};

const getTopics = async () => {
  const res = await executeQuery(
    "SELECT * FROM topics ORDER BY name;"
  );
  return res.rows;
};

const deleteTopic = async (id) => {
  await executeQuery(
    "DELETE FROM topics WHERE id = $id;",
    { id: id }
  );
};

export { addTopic, getTopics, deleteTopic };
