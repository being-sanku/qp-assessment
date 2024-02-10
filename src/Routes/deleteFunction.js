const DBConnection = require("../Configs/dbconnection");
const zod = require("zod");
async function deleteFunction(req, res) {
  const client = DBConnection.getDbConnection();
  const itemSchema = zod.string().min(1).max(255);
  try {
    client.connect(DBConnection.dbConnectStatus);
    const itemName = req.params.item_name;
    itemSchema.parse(itemName);
    const values = [itemName];
    const deleteQuery = "Delete from public.grocerylist where item_name = $1";
    await client.query(deleteQuery, values);
    res.json({ message: "deleted successfully" });
  } catch (error) {
    console.log(error);
    res.sendStatus(500).send(error);
  } finally {
    await client.end();
  }
}

module.exports = deleteFunction;
