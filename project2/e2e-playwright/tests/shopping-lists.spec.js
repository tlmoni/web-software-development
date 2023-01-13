const { test, expect } = require("@playwright/test");

const listName = `List ${Math.random()}`;
const itemName = `Item ${Math.random()}`;

// Test for adding and listing shoppings lists
test("It is possible to add a shopping list and it is listed on /lists", async ({ page }) => {
  await page.goto("/lists");
  await page.locator("input[type=text]").type(listName);
  await page.getByRole("button", { name: "Submit!" }).click();
  await expect(page.locator(`a >> text=${listName}`)).toBeVisible();
});

// Test for showing a single shopping list
test("It is possible to show a single shopping list", async ({ page }) => {
  await page.goto("/lists");
  await page.locator(`a >> text=${listName}`).click();
  await expect(page.getByRole("heading", { name: listName })).toBeVisible();
});

// Test for adding and listing items for a single shopping list
test("It is possible to add items to a shopping list and they are listed on /lists/{id}", async ({ page }) => {
  await page.goto("/lists/1");
  await page.locator("input[type=text]").type(itemName);
  await page.getByRole("button", { name: "Submit!" }).click();
  await expect(page.getByText(itemName)).toBeVisible();
});

// Test for marking items in the shopping list as collected
test("It is possible to collect an item on a shopping list", async ({ page }) => {
  await page.goto("/lists/1");
  await page.getByText("Mark collected!").first().click();
  await expect(page.locator("del").first()).toBeVisible();
});

// Test for deactivating shopping lists
test("It is possible to deactivate a shopping list", async ({ page }) => {
  await page.goto("/lists");
  await page.getByText("Deactivate list!").click();
  await expect(await page.locator("li").count()).toEqual(0);
});
