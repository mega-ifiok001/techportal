import { Router } from "express";
import auth from "../middlewares/auth.js";
import {
  verifyPaystackPaymentController,
  createOrderController,
  getAllOrderDetailsController,
  getOrderDetailsController,
  getTotalOrdersCountController,
  totalSalesController,
  totalUsersController,
  updateOrderStatusController,
} from "../controllers/order.controller.js";

const orderRouter = Router();

orderRouter.post("/create", auth, createOrderController);
orderRouter.get("/order-list", auth, getOrderDetailsController);
orderRouter.get("/order-lists", auth, getAllOrderDetailsController);
orderRouter.put("/order-status/:id", auth, updateOrderStatusController);
orderRouter.post("/verify-paystack", auth, verifyPaystackPaymentController);
orderRouter.get("/count", auth, getTotalOrdersCountController);
orderRouter.get("/sales", auth, totalSalesController);
orderRouter.get("/users", auth, totalUsersController);

export default orderRouter;
