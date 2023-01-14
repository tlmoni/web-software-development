import * as questionService from "../../services/questionService.js";
import * as answerService from "../../services/answerService.js";

const getRandomQuestion = async ({ response }) => {
  const questions = await questionService.getAllQuestions();
  const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
  const options = await answerService.getAnswerOptions(randomQuestion.id);
  const data = {
    questionId: randomQuestion.id,
    questionText: randomQuestion.question_text,
    answerOptions: [],
  };
  options.forEach(option => {
    data.answerOptions.push({ optionId: option.id, optionText: option.option_text })
  });

  response.body = data;
};

const processAnswer = async ({ request, response }) => {
  const body = request.body({ type: "json" });
  const document = await body.value;

  const isCorrect = (await answerService.getAnswerOptionById(document.optionId)).is_correct;

  response.body = { correct: isCorrect };
};

export { getRandomQuestion, processAnswer };
