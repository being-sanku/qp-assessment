const DBConnection = require("../Configs/dbconnection");
const zod = require("zod");

async function orderGrocery(req, res) {
  const client = DBConnection.getDbConnection();
  const itemSchema = zod.object({
    customer_name: zod.string().min(1).max(255), // a string with length between 1 and 255
    orders: zod.array, // a positive number
  });
  try {
    client.connect(DBConnection.dbConnectStatus);

    const orders = req.body.orders;
    const itemIds = orders.map((item) => {
      return item.item_id;
    });
    console.log(itemIds.toString());

    const selectQuery = `SELECT * from public.grocerylist`;
    console.log(selectQuery);

    const result = await client.query(selectQuery);

    const allAvailableItems = result.rows;
    console.log(allAvailableItems);

    const confirmOrder = allAvailableItems.map((items) => {
      return orders.find(
        (order) =>
          order.item_id === items.item_id && order.quantity <= items.quantity
      );
    });
    const filteredOrders = confirmOrder.filter((order) => order); // to remove nulls
    let orderConfirmation = {
      message: "Following orders are available and confirmed",
      orders: [...filteredOrders],
    };
    res.json(orderConfirmation);
  } catch (error) {
    res.status(500).send("Server Error");
  } finally {
    await client.end();
  }
}
module.exports = orderGrocery;
