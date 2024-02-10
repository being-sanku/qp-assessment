1./grocery/add : Add new grocery items to the system
sample request Body :
{
"itemName" : "Goku",
"price" : 100,
"category" : "Food",
"quantity" : 5
}

2./grocery/remove/:item_name : Remove grocery items from the system
Item name to be passed in params (Preffered to do it using item_name rather id)
3./grocery/update : Update existing grocery items
sample request Body : {
"price" :1000,
"itemName": "Goku",
"quantity": 100,
"category": "soehting"
}
4./list : View existing grocery items
Simple Get Request
5./orderGrocery: book multiple grocery items in a single order
sample request Body :{
"customer_name": "Sanket",
"orders": [
{
"item_id": 21,
"quantity": 1
},
{
"item_id": 12,
"quantity": 1
},
{
"item_id": 13,
"quantity": 1
}
]
}
