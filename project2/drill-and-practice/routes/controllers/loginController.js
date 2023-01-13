import { bcrypt } from "../../deps.js";
import * as userService from "../../services/userService.js";

const processLogin = async ({ render, request, response, state }) => {
  const body = request.body({ type: "form" });
  const params = await body.value;

  const data = {
    user: await state.session.get("user"),
    email: params.get("email"),
    password: params.get("password"),
    errors: [],
  };

  const userFromDatabase = await userService.getUserByEmail(
    params.get("email"),
  );

  if (userFromDatabase.length != 1) {
    data.errors.push({ user: "Wrong email or password" })
    render("login.eta", data);
    return;
  }

  const user = userFromDatabase[0];
  const passwordMatches = await bcrypt.compare(
    params.get("password"),
    user.password,
  );

  if (!passwordMatches) {
    data.errors.push({ user: "Wrong email or password" })
    render("login.eta", data);
    return;
  }

  // Login successful, store user to session
  await state.session.set("user", user);
  response.redirect("/topics");
};

const showLoginForm = ({ render }) => {
  const data = {
    email: "",
    password: "",
    errors: [],
  };
  render("login.eta", data);
};

const logout = async ({ response, state }) => {
  await state.session.set("user", null);
  response.redirect("/");
};

export { processLogin, showLoginForm, logout };
