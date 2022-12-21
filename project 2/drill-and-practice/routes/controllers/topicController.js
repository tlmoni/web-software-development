import { validasaur } from "../../deps.js";
import * as topicService from "../../services/topicService.js";

const addTopic = async ({ render, request, response, state }) => {
  const body = request.body({ type: "form" });
  const params = await body.value;

  const data = {
    name: params.get("name"),
    id: await state.session.get("user").id,
    errors: []
  };

  const validationRules = {
    name: [validasaur.required, validasaur.minLength(1)]
  };

  const [passes, errors] = await validasaur.validate(data, validationRules);

  if (!passes) {
    data.errors = errors;
    data.topics = await topicService.getTopics();
    data.user = state.session.get("user");
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

const getTopics = async ({ render, state }) => {
  const data = {
    topics: await topicService.getTopics(),
    user: state.session.get("user"),
    name: "",
  };
  render("topics.eta", data);
};

const deleteTopic = async ({ params, response, state }) => {
  // Delete related questions, answers etc.!!!
  if (await state.session.get("user").admin) {
    await topicService.deleteTopic(params.id);
  }
  response.redirect("/topics");
};

export { addTopic, getTopics, deleteTopic };
