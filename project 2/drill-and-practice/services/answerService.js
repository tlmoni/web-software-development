import { executeQuery } from "../database/database.js";

const getAnswerOptions = async (questionId) => {
  const res = await executeQuery(
    "SELECT * FROM question_answer_options WHERE question_id = $id;",
    { id: questionId }
  );
  return res.rows;
};

const addAnswerOption = async (questionId, optionText) => {
  await executeQuery(
    "INSERT INTO question_answer_options (question_id, option_text) VALUES ($questionId, $optionText)",
    { questionId: questionId, optionText: optionText }
  );
};

export { getAnswerOptions, addAnswerOption };
