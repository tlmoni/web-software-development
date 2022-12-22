import { executeQuery } from "../database/database.js";

const getQuestions = async (topic_id) => {
  const res = await executeQuery(
    "SELECT * FROM questions WHERE topic_id = $id;",
    { id: topic_id }
  );
  return res.rows;
};

const addQuestion = async (userId, topicId, questionText) => {
  await executeQuery(
    "INSERT INTO questions (user_id, topic_id, question_text) VALUES ($userId, $topicId, $questionText)",
    { userId: userId, topicId: topicId, questionText: questionText }
  );
};

export { getQuestions, addQuestion };
