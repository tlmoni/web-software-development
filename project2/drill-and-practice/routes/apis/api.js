import * as topicService from "../../services/topicService.js";
import * as questionService from "../../services/questionService.js";
import * as answerService from "../../services/answerService.js";

const getRandomQuestion = async ({ request, response }) => {
  /*
    {
      "questionId": 1,
      "questionText": "How much is 1+1?",
      "answerOptions": [
        { "optionId": 1, "optionText": "2" },
        { "optionId": 2, "optionText": "4" },
        { "optionId": 3, "optionText": "6" },
      ]
    }
  */
};

export { getRandomQuestion };