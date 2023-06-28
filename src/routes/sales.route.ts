import express from 'express';
import SalesController from '../controllers/sales.controller';

const routers =  express.Router();

routers.post('/:show_ID/buy_item/:item_ID', SalesController.buy);
routers.get('/:show_ID/sold_items/:item_ID', SalesController.getSales);
routers.get('/:show_ID/sold_items', SalesController.getSales);

// Export the rtouter
export default routers;