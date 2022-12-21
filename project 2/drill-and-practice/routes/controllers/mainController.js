import * as statsService from "../../services/statsService.js"

const showMain = async ({ render }) => {
  const data = await statsService.getStats();
  render("main.eta", data);
};

export { showMain };
