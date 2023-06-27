import express from 'express';
import InventoryController from '../controllers/inventory.controller';
import salesRoute from './sales.route'

const routers = express.Router();

// Mount the individual routes here
routers.post('/inventory',  InventoryController.create);
routers.use('/show', salesRoute);

// Export the routes
export default routers;