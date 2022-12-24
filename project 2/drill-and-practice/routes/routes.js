import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as topicController from "./controllers/topicController.js";
import * as questionController from "./controllers/questionController.js";
import * as answerController from "./controllers/answerController.js";
import * as registrationController from "./controllers/registrationController.js"
import * as loginController from "./controllers/loginController.js";

const router = new Router();

router.get("/", mainController.showMain);

router.get("/topics", topicController.getTopics);
router.post("/topics", topicController.addTopic);
router.post("/topics/:id/delete", topicController.deleteTopic);

router.get("/topics/:id", questionController.getQuestions);
router.post("/topics/:id/questions", questionController.addQuestion);
router.get("/topics/:id/questions/:qId", answerController.getAnswerOptions);

router.get("/auth/register", registrationController.showRegistrationForm);
router.post("/auth/register", registrationController.registerUser);

router.get("/auth/login", loginController.showLoginForm);
router.post("/auth/login", loginController.processLogin);
router.get("/auth/logout", loginController.logout);

export { router };
