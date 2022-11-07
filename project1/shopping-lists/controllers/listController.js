import { renderFile } from "../deps.js";
import * as listService from "../services/listService.js";

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const redirectTo = (path) => {
  return new Response(`Redirecting to ${path}.`, {
    status: 303,
    headers: {
      "Location": path,
    },
  });
};

const mainPage = async (request) => {
  const data = {
    stats: await listService.getStats(),
  };

  return new Response(await renderFile("index.eta", data), responseDetails);
};

const getLists = async (request) => {
  const data = {
    lists: await listService.getLists(),
  };

  return new Response(await renderFile("lists.eta", data), responseDetails);
};

const getItems = async (request, id) => {
  const data = {
    list: await listService.getList(id),
    items: await listService.getItems(id),
    postPath: `/lists/${id}/items`
  };

  return new Response(await renderFile("items.eta", data), responseDetails);
};

const addList = async (request) => {
  const formData = await request.formData();
  const name = formData.get("name");
  await listService.addList(name);

  return redirectTo("/lists");
};

const addItem = async (request, shoppingListId) => {
  const formData = await request.formData();
  const name = formData.get("name");
  await listService.addItem(name, shoppingListId);

  return redirectTo(`/lists/${shoppingListId}`);
};

const deactivateList = async (request, id) => {
  await listService.deactivateList(id);

  return redirectTo("/lists");
};

const collectItem = async (request, shoppingListId, itemId) => {
  await listService.collectItem(itemId);

  return redirectTo(`/lists/${shoppingListId}`);
};

export { mainPage, getLists, getItems, addList, addItem, deactivateList, collectItem };
