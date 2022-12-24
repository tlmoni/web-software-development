import { bcrypt, validasaur } from "../../deps.js";
import * as userService from "../../services/userService.js";

const registerUser = async ({ render, request, response, state }) => {
  const body = request.body({ type: "form" });
  const params = await body.value;

  const data = {
    user: state.session.get("user"),
    email: params.get("email"),
    password: params.get("password"),
    errors: [],
  };

  const validationRules = {
    email: [validasaur.required, validasaur.isEmail],
    password: [validasaur.required, validasaur.minLength(4)],
  };

  const [passes, errors] = await validasaur.validate(data, validationRules);
  const userExistsAlready = (await userService.getUserByEmail(data.email)).length != 0 ? true : false;

  if (userExistsAlready) {
    data.errors = errors;
    data.errors.user = { email: "A user with that email already exists" };
    render("registration.eta", data);
  }
  else if (!passes) {
    data.errors = errors;
    render("registration.eta", data);
  }
  else {
    // Data validation successful, add entry to database
    await userService.addUser(
      data.email,
      await bcrypt.hash(data.password),
    );

    response.redirect("/auth/login");
  }
};

const showRegistrationForm = ({ render }) => {
  const data = {
    email: "",
    password: "",
    errors: [],
  };
  render("registration.eta", data);
};

export { registerUser, showRegistrationForm };
