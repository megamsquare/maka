import { expect } from "chai";
import Services from "../services";
import { NewInventory } from "../cases/inventory.case";
import request from "supertest";

describe("Inventory HTTP Test", () => {
    describe("CreateInventory", () => {
        it('should create an inventory', async (done) => {
            const testData = [
                { itemId: 1, itemName: "Chair", quantity: 5},
                { itemId: 2, itemName: "Table", quantity: 5},
                { itemId: 3, itemName: "Rug", quantity: 5},
                { itemId: 4, itemName: "TV", quantity: 5},
            ]
            const res = await request('http://localhost:3001')
            .post("/inventory")
            .send(testData)
            expect(res.status).to.equal(201)
            done()
        }).timeout(10000);
    })
});