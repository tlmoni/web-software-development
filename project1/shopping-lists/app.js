import { serve, configure } from "./deps.js";
import * as listController from "./controllers/listController.js";

configure({
  views: `${Deno.cwd()}/views/`,
});

const handleRequest = async (request) => {
  const url = new URL(request.url);
  // Collect an item
  if (request.method === "POST" && url.pathname.includes("collect")) {
    const shoppingListId = url.pathname.split("/")[2];
    const itemId = url.pathname.split("/")[4]
    return await listController.collectItem(request, shoppingListId, itemId);
  }
  // Add an item to shopping list
  else if (request.method === "POST" && url.pathname.includes("items")) {
    const id = url.pathname.split("/")[2];
    return await listController.addItem(request, id);
  }
  // Deactivate a shopping list
  else if (request.method === "POST" && url.pathname.includes("deactivate")) {
    const id = url.pathname.split("/")[2];
    return await listController.deactivateList(request, id);
  }
  // Add a new shopping list
  else if (request.method === "POST" && url.pathname.startsWith("/lists")) {
    return await listController.addList(request);
  }
  // Get items of a shopping list
  else if (request.method === "GET" && url.pathname.startsWith("/lists/")) {
    const id = url.pathname.split("/")[2];
    return await listController.getItems(request, id);
  }
  // Get existing active shopping lists
  else if (request.method === "GET" && url.pathname.startsWith("/lists")) {
    return await listController.getLists(request);
  }
  // Main page
  else {
    return await listController.mainPage(request);
  }
};

serve(handleRequest, { port: 7777 });
