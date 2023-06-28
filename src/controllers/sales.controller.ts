import { Request, Response } from "express";
import Services from "../services";
import { GetSales, NewSales } from "../cases/sales.case";


async function buy(req: Request, res: Response) {
    try {
        const newSale: NewSales = {
            showId: Number(req.params.show_ID),
            itemId: Number(req.params.item_ID),
            quantity: req.body.quantity
        }

        const savedSale = await Services.SalesService.createSale(newSale);
        if (savedSale instanceof Error) {
            if (savedSale.message === "Invalid Item Id") {
                res.status(404).json({ message: savedSale.message });
                return
            }
            res.status(409).json({ message: savedSale.message });
            return
        }
        res.status(200).json({ message: `${savedSale.itemName} sold` })
        return;
    } catch (error) {
        console.log(error)
        if (error instanceof Error) {
            res.status(400).json(error.message)
        }
        res.status(500).json(error)
    }
}

async function getSales(req: Request, res: Response) {
    try {
        const getSales: GetSales = {
            showId: Number(req.params.show_ID),
            itemId: !req.params.item_ID ? 0 : Number(req.params.item_ID),
        }
        console.log(req.params.item_ID)

        const getAllSales = await Services.SalesService.getSalesByShowId(getSales)
        if (getAllSales instanceof Error) {
            console.log(getAllSales);
            res.status(400).json(getAllSales);
            return
        }
        res.status(200).json(getAllSales)
    } catch (error) {
        if (error instanceof Error) {
            console.log(error);
            res.status(400).json(error)
        }
    }
}

const SalesController = {
    buy,
    getSales
}

export default SalesController;