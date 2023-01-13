import { executeQuery } from "../database/database.js";

const getAnswerOptions = async (questionId) => {
  const res = await executeQuery(
    "SELECT * FROM question_answer_options WHERE question_id = $id;",
    { id: questionId }
  );
  return res.rows;
};

const getAnswerOptionById = async (optionId) => {
  const res = await executeQuery(
    "SELECT * FROM question_answer_options WHERE id = $id;",
    { id: optionId }
  );
  return res.rows[0];
};

const getCorrectAnswerOption = async (questionId) => {
  const res = await executeQuery(
    "SELECT * FROM question_answer_options WHERE question_id = $id AND is_correct;",
    { id: questionId }
  );
  return res.rows[0];
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

const addAnswer = async (userId, questionId, optionId) => {
  await executeQuery(
    "INSERT INTO question_answers (user_id, question_id, question_answer_option_id) VALUES ($uId, $qId, $oId)",
    { uId: userId, qId: questionId, oId: optionId }
  );
};

export { getAnswerOptions, getAnswerOptionById, getCorrectAnswerOption, addAnswerOption, deleteAnswerOption, addAnswer };
