const { test, expect } = require("@playwright/test");

const question = `Question ${Math.random()}`;
const option = `Option ${Math.random()}`;

// Test for registration
test("It is possible to register and the user is redirected to login", async ({ page }) => {
  await page.goto("/auth/register");
  await page.locator("input[type=email]").fill("test@user.com");
  await page.locator("input[type=password]").fill("password1234");
  await page.locator("#register-btn").click();
  await expect(page.locator(`h1 >> text="Login"`)).toBeVisible();
});

// Test for logging in
test("It is possible to log in", async ({ page }) => {
  await page.goto("/auth/login");
  await page.locator("input[type=email]").fill("test@user.com");
  await page.locator("input[type=password]").fill("password1234");
  await page.locator("input[type=submit]").click();
  await expect(page.locator('a >> text=Logout')).toBeVisible();
});

// Test for viewing topics after logging in
test("It is possible to view topics after logging in", async ({ page }) => {
  await page.goto("/topics");
  await expect(page.getByText("Current topics")).toBeVisible();
});

// Test for viewing a topic and adding a question to it
test("It is possible to view a topic and add a question to it", async ({ page }) => {
  await page.goto("/topics/1");
  await page.locator("[name=question_text]").fill(question);
  await page.locator("input[type=submit]").click();
  await expect(page.getByText(question)).toBeVisible();
});

// Test for viewing a question and adding an answer option
test("It is possible to view a question and add an answer option to it", async ({ page }) => {
  await page.goto("/topics/1/questions/1");
  await page.locator("[name=option_text]").type(option);
  await page.check("[name=is_correct]");
  await page.locator("input[type=submit]").click();
  await expect(page.locator("ul li:nth-child(1)")).toContainText(option);
});

// Test for deleting an answer option
test("It is possible to delete an answer option", async ({ page }) => {
  await page.goto("/topics/1/questions/1");
  await page.locator('input[type=submit]:has-text("Delete option")').click();
  await expect(page.locator("ul li:nth-child(1)")).not.toContainText(option);
});

// Test for deleting a question and verifying it's not listed anymore
test("It is possible to delete a question with no answer options", async ({ page }) => {
  await page.goto("/topics/1/questions/1");
  await page.locator('input[type=submit]:has-text("Delete question")').click();
  await expect(page.locator("ul li:nth-child(1)")).not.toContainText(question);
});

// Test for viewing quiz topics
test("It is possible to view quiz topics", async ({ page }) => {
  await page.goto("/quiz");
  await expect(page.locator('h1 >> text="Quiz"')).toBeVisible();
});

// Test for choosing a quiz topic
test("It is possible to enter a quiz on a topic", async ({ page }) => {
  await page.goto("/quiz/1");
  await expect(page.getByText("Choose")).toBeVisible();
});

// Test for logging out
test("It is possible to logout", async ({ page }) => {
  await page.goto("/");
  await page.locator('a >> text=Logout').click();
  await expect(page.getByText('h1 >> text="Drill and practice"')).toBeVisible();
});
