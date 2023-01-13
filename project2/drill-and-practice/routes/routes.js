import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as topicController from "./controllers/topicController.js";
import * as questionController from "./controllers/questionController.js";
import * as answerController from "./controllers/answerController.js";
import * as quizController from "./controllers/quizController.js";
import * as api from "./apis/api.js";
import * as registrationController from "./controllers/registrationController.js"
import * as loginController from "./controllers/loginController.js";

const router = new Router();

router.get("/", mainController.showMain);

// Topic related routes
router.get("/topics", topicController.getTopics);
router.post("/topics", topicController.addTopic);
router.post("/topics/:id/delete", topicController.deleteTopic);

// Question related routes
router.get("/topics/:id", questionController.getQuestions);
router.post("/topics/:id/questions", questionController.addQuestion);
router.post("/topics/:id/questions/:qId/delete", questionController.deleteQuestion);

// Answer related routes
router.get("/topics/:id/questions/:qId", answerController.getAnswerOptions);
router.post("/topics/:id/questions/:qId/options", answerController.addAnswerOption);
router.post("/topics/:id/questions/:qId/options/:oId/delete", answerController.deleteAnswerOption);

// Quiz related routes
router.get("/quiz", quizController.getTopics);
router.get("/quiz/:tId", quizController.getTopicQuestion);
router.get("/quiz/:tId/questions/:qId", quizController.getQuestionAnswerOptions);
router.post("/quiz/:tId/questions/:qId/options/:oId", quizController.addAnswer);
router.get("/quiz/:tId/questions/:qId/correct", quizController.correctAnswer);
router.get("/quiz/:tId/questions/:qId/incorrect", quizController.incorrectAnswer);

// API
router.get("/api/questions/random", api.getRandomQuestion);

// Registration related routes
router.get("/auth/register", registrationController.showRegistrationForm);
router.post("/auth/register", registrationController.registerUser);

// Login related routes
router.get("/auth/login", loginController.showLoginForm);
router.post("/auth/login", loginController.processLogin);
router.get("/auth/logout", loginController.logout);

export { router };
