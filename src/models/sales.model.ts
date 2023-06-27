import mongoose from "mongoose";

const SalesSchema = new mongoose.Schema({
    InventoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "inventory",
        required: true
    },
    showId: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
},
{
    timestamps: true
});

const Sales = mongoose.model(
    "sales",
    SalesSchema
)

export default Sales;