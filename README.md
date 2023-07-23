# Fashion & Beauty Platform - Inventory Management API

This API supports the premier platform for finding out about and buying the latest fashion & beauty items. It allows content creators to manage inventory and record sales during live selling shows.

### Setup and Installation
Make sure you have your docker running, because this api runs on Docker for database and environment control

to initiate this api, run 

```bash
docker-compose up -d
```

it will run on http://localhost:3001

## API Endpoints

### POST /inventory

Add or update item inventory in stock right now.

#### Request
This takes an array for data:

- Method: POST
- Path: /inventory
- Request Body: List of one or more items

Example URL: 
```text
http://localhost:3001/inventory
```

Example Request Body:
```json
[
  { "itemID": 12345, "itemName": "Fancy Dress", "quantity": 10 },
  { "itemID": 67890, "itemName": "Handbag", "quantity": 5 }
]
```

Response

Status Code: 201 (CREATED)
Response Body: Created Successfully


### POST /show/:show_ID/buy_item/:item_ID

Buy a single item during a show.

#### Request

- Method: POST
- Path: /show/:show_ID/buy_item/:item_ID
- Request Body: the quantity you want to remove

Example URL: 
```text
http://localhost:3001/show/1/buy_item/1
```

Response

Status Code: 200 (OK) if the item is successfully bought
Status Code: 404 (Not Found) if the show or item is not found
Status Code: 409 (Conflict) if there is insufficient inventory
Response Body: [itemName] sold


### GET /show/:show_ID/sold_items/:item_id

Get the name and quantity of an item sold by a specific show.

#### Request

- Method: GET
- Path: /show/:show_ID/sold_items/:item_id

Response

Status Code: 200 (OK)
Response Body: Information about the item sold
Example Response Body:
{ "itemID": 12345, "itemName": "Fancy Dress", "quantity_sold": 4 }

### Testing
To test, you need to run the below syntax in your terminal:

```bash
npm test
```

### Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- Dotenv
- Http-status
- Typescript
- Chai
- Mocha
- Supertest
- Ts-node