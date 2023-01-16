import { validasaur } from "../../deps.js";
import * as topicService from "../../services/topicService.js";
import * as questionService from "../../services/questionService.js";
import * as answerService from "../../services/answerService.js";

const getTopics = async ({ render, state }) => {
  const data = {
    user: await state.session.get("user"),
    topics: await topicService.getTopics(),
    name: "",
  };
  render("topics.eta", data);
};

const getTopicById = async (id) => {
  return await topicService.getTopicById(id);
};

const addTopic = async ({ render, request, response, state }) => {
  const body = request.body({ type: "form" });
  const params = await body.value;

  const user = await state.session.get("user");

  const data = {
    user: user,
    name: params.get("name"),
    id: await state.session.get("user").id,
    errors: [],
  };

  const validationRules = {
    name: [validasaur.required, validasaur.minLength(1)]
  };

  const [passes, errors] = await validasaur.validate(data, validationRules);

  if (!passes || !user.admin) {
    data.errors = errors;
    data.topics = await topicService.getTopics();
    render("topics.eta", data);
  }
  else {
    // Data validation successful, add entry to database
    await topicService.addTopic(
      data.id,
      data.name
    );
    response.redirect("/topics");
  }
};

const deleteTopic = async ({ params, response, state }) => {
  // Delete related questions, answers etc.!!!
  if (await state.session.get("user").admin) {
    const questions = await questionService.getQuestions(params.id);
    questions.forEach(async question => {
      const answerOptions = await answerService.getAnswerOptions(question.id);
      answerOptions.forEach(async option => {
        await answerService.deleteAnswers(option.id);
        await answerService.deleteAnswerOption(option.id);
      });
      await questionService.deleteQuestion(question.id);
    });
    await topicService.deleteTopic(params.id);
  }
  response.redirect("/topics");
};

export { getTopics, getTopicById, addTopic, deleteTopic };
