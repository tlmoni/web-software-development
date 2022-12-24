import { validasaur } from "../../deps.js";
import * as topicService from "../../services/topicService.js";
import * as questionService from "../../services/questionService.js";
import * as answerService from "../../services/answerService.js";

const getAnswerOptions = async ({ params, render, state }) => {
  const data = {
    user: await state.session.get("user"),
    topic: await topicService.getTopicById(params.id),
    question: await questionService.getQuestionById(params.qId),
    answerOptions: await answerService.getAnswerOptions(params.qId),
    optionText: "",
    isCorrect: false,
    errors: [],
  };
  render("question.eta", data);
};

const addAnswerOption = async ({ params, render, request, response, state }) => {
  const body = request.body({ type: "form" });
  const values = await body.value;

  const user = await state.session.get("user");

  const data = {
    user: user,
    topic: await topicService.getTopicById(params.id),
    question: await questionService.getQuestionById(params.qId),
    answerOptions: await answerService.getAnswerOptions(params.qId),
    optionText: values.get("option_text"),
    isCorrect: values.get("is_correct"),
    errors: [],
  };

  const validationRules = {
    optionText: [validasaur.required, validasaur.minLength(1)]
  };

  const [passes, errors] = await validasaur.validate(data, validationRules);

  if (!passes) {
    data.errors = errors;
    data.questions = await answerService.getAnswerOptions(params.qId);
    render("question.eta", data);
  }
  else {
    // Data validation successful, add entry to database
    var isCorrect = data.isCorrect === "True" ? true : false;
    await answerService.addAnswerOption(
      data.question.id,
      data.optionText,
      isCorrect,
    );
    response.redirect(`/topics/${params.id}/questions/${params.qId}`);
  }
};

const deleteAnswerOption = async ({ params, response }) => {
  await answerService.deleteAnswerOption(params.oId);
  response.redirect(`/topics/${params.id}/questions/${params.qId}`);
};

export { getAnswerOptions, addAnswerOption, deleteAnswerOption };
