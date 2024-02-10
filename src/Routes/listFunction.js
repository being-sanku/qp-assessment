const DBConnection = require("../Configs/dbconnection");
const zod = require("zod");
async function listFunction(req, res) {
  const client = DBConnection.getDbConnection();
  try {
    client.connect(DBConnection.dbConnectStatus);
    const result = await client.query("SELECT * from public.grocerylist");
    res.send(result.rows);
  } catch (error) {
    res.sendStatus(500).send("Server Error");
  } finally {
    await client.end();
  }
}

module.exports = listFunction;
