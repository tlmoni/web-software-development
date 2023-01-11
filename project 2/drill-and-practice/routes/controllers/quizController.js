import { validasaur } from "../../deps.js";
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
  const randomQuestion = await questionService.getQuestionById(1 + (Math.floor(Math.random() * (await questionService.getQuestions(params.tId)).length)));
  if (randomQuestion) {
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

const getQuestionAnswerOptions = async ({ params, render, response }) => {
  const data = {
    user: await state.session.get("user"),
    topic: await topicService.getTopicById(params.tId),
    question: await topicService.getQuestionById(params.qId),
    options: await answerService.getAnswerOptions(params.qId),
  };
  render("quiz_question.eta", data);
};

export { getTopics, getTopicQuestion, getQuestionAnswerOptions };
