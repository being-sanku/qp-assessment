const express = require("express");
const app = express();
const port = 3000;

const addFunction = require("../GroceryBookingAPI/src/Routes/addFunction");
const deleteFunction = require("../GroceryBookingAPI/src/Routes/deleteFunction");
const listFunction = require("../GroceryBookingAPI/src/Routes/listFunction");
const updateFunction = require("../GroceryBookingAPI/src/Routes/updateFunction");
const orderGrocery = require("../GroceryBookingAPI/src/Routes/orderGrocery");

app.use(express.json());

app.post("/grocery/add", addFunction);
app.delete("/grocery/remove/:item_name", deleteFunction);
app.put("/grocery/update", updateFunction);
app.get("/list", listFunction);
app.post("/orderGrocery", orderGrocery);

app.listen(port, () => {
  console.log("Grocery Server started");
});
