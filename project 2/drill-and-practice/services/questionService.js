import { executeQuery } from "../database/database.js";

const getQuestions = async (topicId) => {
  const res = await executeQuery(
    "SELECT * FROM questions WHERE topic_id = $id;",
    { id: topicId }
  );
  return res.rows;
};

const getQuestionById = async (id) => {
  const res = await executeQuery(
    "SELECT * FROM question WHERE id = $id;",
    { id: id }
  );
  return res.rows[0];
};

const addQuestion = async (userId, topicId, questionText) => {
  await executeQuery(
    "INSERT INTO questions (user_id, topic_id, question_text) VALUES ($userId, $topicId, $questionText)",
    { userId: userId, topicId: topicId, questionText: questionText }
  );
};

export { getQuestions, getQuestionById, addQuestion };
