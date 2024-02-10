const DBConnection = require("../Configs/dbconnection");
const zod = require("zod");

async function addFunction(req, res) {
  const client = DBConnection.getDbConnection();
  const itemSchema = zod.object({
    itemName: zod.string().min(1).max(255), // a string with length between 1 and 255
    price: zod.number().positive(), // a positive number
    category: zod.string().min(1).max(100), //  a string with length between 1 and 100
    quantity: zod.number().int().positive(), //a positive integer
  });

  try {
    client.connect(DBConnection.dbConnectStatus);

    itemSchema.parse(req.body); // data validation

    itemName = req.body.itemName;
    price = req.body.price;
    category = req.body.category;
    quantity = req.body.quantity;

    const insertQuery =
      "INSERT into public.grocerylist(item_name,price,quantity,category) values ($1,$2,$3,$4)";
    const values = [itemName, price, quantity, category];
    await client.query(insertQuery, values);
    res.send(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500).send("Server Error");
  } finally {
    await client.end();
  }
}

module.exports = addFunction;
