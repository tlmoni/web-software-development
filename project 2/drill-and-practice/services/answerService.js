import { executeQuery } from "../database/database.js";

const getAnswerOptions = async (questionId) => {
  const res = await executeQuery(
    "SELECT * FROM question_answer_options WHERE question_id = $id;",
    { id: questionId }
  );
  return res.rows;
};

const addAnswerOption = async (questionId, optionText, isCorrect) => {
  await executeQuery(
    "INSERT INTO question_answer_options (question_id, option_text, is_correct) VALUES ($questionId, $optionText, $isCorrect)",
    { questionId: questionId, optionText: optionText, isCorrect: isCorrect }
  );
};

const deleteAnswerOption = async (id) => {
  await executeQuery(
    "DELETE FROM question_answer_options WHERE id = $id;",
    { id: id }
  );
};

export { getAnswerOptions, addAnswerOption, deleteAnswerOption };
