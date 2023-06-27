import mongoose from "mongoose";

const Inventorychema = new mongoose.Schema({
    itemId: {
        type: Number,
        required: true
    },
    itemName: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const Inventory = mongoose.model(
    "inventory",
    Inventorychema
)

export default Inventory;