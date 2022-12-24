import { validasaur } from "../../deps.js";
import * as topicService from "../../services/topicService.js";
import * as questionService from "../../services/questionService.js";
import * as answerService from "../../services/answerService.js";

const getAnswerOptions = async ({ params, render, state }) => {
  const data = {
    user: await state.session.get("user"),
    topic: await topicService.getTopicById(params.id),
    questions: await questionService.getQuestions(params.id),
    questionText: "",
  };
  render("question.eta", data);
};

const addAnswerOption = async ({ params, render, request, response, state }) => {
  const body = request.body({ type: "form" });
  const values = await body.value;

  const user = await state.session.get("user");

  const data = {
    user: user,
    questionText: values.get("question_text"),
    topic: await topicService.getTopicById(params.id),
    errors: []
  };

  const validationRules = {
    questionText: [validasaur.required, validasaur.minLength(1)]
  };

  const [passes, errors] = await validasaur.validate(data, validationRules);

  if (!passes) {
    data.errors = errors;
    data.questions = await questionService.getQuestions(params.id);
    render("question.eta", data);
  }
  else {
    // Data validation successful, add entry to database
    await questionService.addQuestion(
      data.user.id,
      data.topic.id,
      data.questionText,
    );
    response.redirect(`/topics/${data.topic.id}`);
  }
};

export { getAnswerOptions, addAnswerOption };