import { executeQuery } from "../database/database.js";

const getStats = async () => {
  var lists = await executeQuery("SELECT * FROM shopping_lists;");
  var items = await executeQuery("SELECT * FROM shopping_list_items;");
  const stats = {
    lists: lists.rows.length,
    items: items.rows.length
  };

  return stats;
};

const getLists = async () => {
  var result = await executeQuery("SELECT id, name, active FROM shopping_lists WHERE active = TRUE ORDER BY id;");
  return result.rows;
};

const getList = async (id) => {
  var result = await executeQuery(
    "SELECT id, name, active FROM shopping_lists WHERE id = $id;",
    { id: id }
  );
  return result.rows[0];
};

const getItems = async (id) => {
  var result = await executeQuery(
    "SELECT * FROM shopping_list_items WHERE shopping_list_id = $shopping_list_id ORDER BY collected ASC, name ASC;",
    { shopping_list_id: id }
  );
  return result.rows;
};

const addList = async (name) => {
  await executeQuery(
    "INSERT INTO shopping_lists (name) VALUES ($name);",
    { name: name }
  );
};

const addItem = async (name, id) => {
  await executeQuery(
    "INSERT INTO shopping_list_items (name, shopping_list_id) VALUES ($name, $shopping_list_id);",
    { name: name, shopping_list_id: id }
  );
};

const deactivateList = async (id) => {
  await executeQuery(
    "UPDATE shopping_lists SET active = FALSE WHERE id = $id;",
    { id: id },
  );
};

const collectItem = async (id) => {
  await executeQuery(
    "UPDATE shopping_list_items SET collected = TRUE WHERE id = $id;",
    { id: id }
  );
};

export { getStats, getLists, getList, getItems, addList, addItem, deactivateList, collectItem };
