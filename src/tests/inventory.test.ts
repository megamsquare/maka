// import { expect } from "chai";
import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../../server";
import mongoose from "mongoose";

const mongoServer = new MongoMemoryServer();

describe("Inventory HTTP Test", () => {
  beforeAll(async () => {
    await mongoServer.start();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
    await mongoServer.stop();
  });

  const testData = [
    { itemId: 1, itemName: "Chair", quantity: 5 },
    { itemId: 2, itemName: "Table", quantity: 5 },
    { itemId: 3, itemName: "Rug", quantity: 5 },
    { itemId: 4, itemName: "TV", quantity: 5 },
  ];

  describe("CreateInventory", () => {
    it("should create an inventory", async () => {
      const inventoryResponse = await request(app)
        .post("/inventory")
        .send(testData);
      expect(inventoryResponse.status).toBe(201);
    });
  });
});

// "test": "mocha --require ts-node/register src/tests/**/*.test.ts"
// describe("Inventory HTTP Test", () => {
//     describe("CreateInventory", () => {
//         it('should create an inventory', async (done) => {
//             const testData = [
//                 { itemId: 1, itemName: "Chair", quantity: 5},
//                 { itemId: 2, itemName: "Table", quantity: 5},
//                 { itemId: 3, itemName: "Rug", quantity: 5},
//                 { itemId: 4, itemName: "TV", quantity: 5},
//             ]
//             const res = await request('http://localhost:3001')
//             .post("/inventory")
//             .send(testData)
//             expect(res.status).to.equal(201)
//             done()
//         }).timeout(10000);
//     })
// });
