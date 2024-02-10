const DBConnection = require("../Configs/dbconnection");
const zod = require("zod");

async function updateFunction(req, res) {
  const client = DBConnection.getDbConnection();
  const itemSchema = zod.object({
    itemName: zod.string().min(1).max(255), // a string with length between 1 and 255
    price: zod.number().positive(), // a positive number
    category: zod.string().min(1).max(100), //  a string with length between 1 and 100
    quantity: zod.number().int().positive(), //a positive integer
  });
  try {
    itemSchema.parse(req.body);
    client.connect(DBConnection.dbConnectStatus);
    const itemName = req.body.itemName;
    const newPrice = req.body.price;
    const newQuantity = req.body.quantity;
    const newCategory = req.body.category;
    const updateQuery =
      "UPDATE public.grocerylist SET price =$1, quantity =$2, category=$3  where item_name =$4";
    await client.query(updateQuery, [
      newPrice,
      newQuantity,
      newCategory,
      itemName,
    ]);
    res.send(201);
  } catch (error) {
    res.status(500).send("Server Error");
  } finally {
    await client.end();
  }
}

module.exports = updateFunction;
