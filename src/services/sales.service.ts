import { GetSales, NewSales } from "../cases/sales.case";
import Model from "../models";

async function getSalesByShowId(showInfo: GetSales) {
    try {
        const itemExist = await Model.Inventory.findOne({ itemId: showInfo.itemId })
        if (!itemExist) {
            return new Error("Invalid Item Id")
        };

        const sales = await Model.Sales.find({ showId: showInfo.showId, InventoryId: itemExist._id })
            .populate({
                path: "InventoryId",
                select: "itemName itemId"
            })
            .exec();

            const totalQuantity = sales.reduce((total, item) => total + item.quantity, 0)

            const result = {
                itemID: itemExist._id,
                itemName: itemExist.itemName,
                quantity_sold: totalQuantity
            }

        return result;
    } catch (error) {
        return error as Error
    }
}

async function createSale(newSale: NewSales) {
    try {
        const itemExist = await Model.Inventory.findOne({ itemId: newSale.itemId })
        if (!itemExist) {
            return new Error("Invalid Item Id")
        };

        if (newSale.quantity > itemExist.quantity) {
            return new Error("Insufficient stock")
        };

        itemExist.quantity -= newSale.quantity;

        await itemExist.save();

        const sale = new Model.Sales({
            InventoryId: itemExist._id,
            showId: newSale.showId,
            quantity: newSale.quantity
        })

        await sale.save();

        const result = {
            showId: sale.showId,
            itemId: itemExist.itemId,
            itemName: itemExist.itemName,
            soldQuantity: sale.quantity
        }

        return result;

    } catch (error) {
        return error as Error
    }
}

const SalesService = {
    getSalesByShowId,
    createSale
}

export default SalesService;