import { executeQuery } from "../database/database.js";

const getStats = async () => {
  const data = {
    topics: 0,
    questions: 0,
    answers: 0
  };

  const topics = Number((await executeQuery("SELECT COUNT(id) AS count FROM topics;")).rows[0].count);
  data.topics = topics !== undefined ? topics : 0;
  const questions = Number((await executeQuery("SELECT COUNT(id) AS count FROM questions;")).rows[0].count);
  data.questions = questions !== undefined ? questions : 0;
  const answers = Number((await executeQuery("SELECT COUNT(id) AS count FROM question_answers;")).rows[0].count);
  data.answers = answers !== undefined ? answers : 0;

  return data;
};

export { getStats };