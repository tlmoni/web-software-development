import * as statsService from "../../services/statsService.js"

const showMain = async ({ render, state }) => {
  const data = await statsService.getStats();
  data.user = await state.session.get("user");
  render("main.eta", data);
};

export { showMain };
