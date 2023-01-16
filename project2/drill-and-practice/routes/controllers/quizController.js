import * as topicService from "../../services/topicService.js";
import * as questionService from "../../services/questionService.js";
import * as answerService from "../../services/answerService.js";

const getTopics = async ({ render, state }) => {
  const data = {
    user: await state.session.get("user"),
    topics: await topicService.getTopics(),
  };
  render("quiz.eta", data);
};

const getTopicQuestion = async ({ params, render, response, state }) => {
  const questions = await questionService.getQuestions(params.tId);
  if (questions && questions.length > 0) {
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    response.redirect(`/quiz/${params.tId}/questions/${randomQuestion.id}`);
  }
  else {
    const data = {
      user: await state.session.get("user"),
      topic: await topicService.getTopicById(params.tId),
    };
    render("quiz_empty_topic.eta", data);
  }
};

const getQuestionAnswerOptions = async ({ params, render, state }) => {
  const data = {
    user: await state.session.get("user"),
    topic: await topicService.getTopicById(params.tId),
    question: await questionService.getQuestionById(params.qId),
    options: await answerService.getAnswerOptions(params.qId),
  };
  render("quiz_question.eta", data);
};

const addAnswer = async ({ params, response, state }) => {
  const user = await state.session.get("user");
  const option = await answerService.getAnswerOptionById(params.oId);

  await answerService.addAnswer(user.id, params.qId, params.oId); // Record answer

  if (option.is_correct) {
    response.redirect(`/quiz/${params.tId}/questions/${params.qId}/correct`);
  }
  else {
    response.redirect(`/quiz/${params.tId}/questions/${params.qId}/incorrect`);
  }
};

const correctAnswer = async ({ params, render, state }) => {
  const data = {
    user: await state.session.get("user"),
    topic: await topicService.getTopicById(params.tId),
    question: await questionService.getQuestionById(params.qId),
  };

  render("correct.eta", data);
};

const incorrectAnswer = async ({ params, render, state }) => {
  const data = {
    user: await state.session.get("user"),
    topic: await topicService.getTopicById(params.tId),
    question: await questionService.getQuestionById(params.qId),
    correctOption: await answerService.getCorrectAnswerOption(params.qId),
  };

  render("incorrect.eta", data);
};

export { getTopics, getTopicQuestion, getQuestionAnswerOptions, addAnswer, correctAnswer, incorrectAnswer };
