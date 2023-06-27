import { Request, Response } from "express";
import { NewInventory } from "../cases/inventory.case";
import Services from "../services";
import status_code from 'http-status';


async function create(req: Request, res: Response) {
    try {
        const newInventory: NewInventory[] = req.body;

        await Services.InventoryService.createInventory(newInventory)
        
        res.status(status_code.CREATED).json({message: "Created Successfully"});
    } catch (error) {
        if (error instanceof Error) {
            console.log(error)
            res.status(400).json(error)
        }
    }
}

const InventoryController = {
    create
}

export default InventoryController;