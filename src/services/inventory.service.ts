import { NewInventory } from "../cases/inventory.case";
import Model from "../models";


async function createInventory(newInventory: NewInventory[]) {
    try {
        const result = await Promise.all(newInventory.map(async (item) => {
            const filter = {itemId: item.itemId};
            const update = {
                $set: {itemName: item.itemName},
                $inc: {"quantity": item.quantity}
            };
            const options = { upsert: true, new: true }

            return await Model.Inventory.updateOne(filter, update, options);
        }));

        return result;
    } catch (error) {
        return error as Error
    }
}

const InventoryService = {
    createInventory
}

export default InventoryService;