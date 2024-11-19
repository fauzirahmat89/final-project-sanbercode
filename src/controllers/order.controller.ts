import { Request, Response } from "express";
import {
  createOrderService,
  getOrdersByUserService,
} from "../services/order.service"
import { IRequestWithUser } from "../middlewares/auth.middlewre";

export default {
    async createOrder(req: IRequestWithUser, res: Response) {
    try {
      const userId = req.user?.id?.toString();

      // Validasi jika userId tidak ada
      if (!userId) {
        return res.status(403).json({
          message: "Unauthorized. User ID is required.",
        });
      }

      const { grandTotal, orderItems } = req.body;

      // Validasi input
      if (!grandTotal || !Array.isArray(orderItems)) {
        return res.status(400).json({
          message: "Invalid order data. 'grandTotal' and 'orderItems' are required.",
        });
      }

      // Panggil service
      const result = await createOrderService(userId, grandTotal, orderItems);

      res.status(201).json({
        data: result,
        message: "Order created successfully.",
      });
    } catch (error) {
      res.status(500).json({
        data: (error as Error).message,
        message: "Failed to create order.",
      });
    }
  },

  async getOrdersByUser(req: IRequestWithUser, res: Response) {
    try {
      const userId = req.user?.id?.toString(); // Assume user ID comes from JWT payload
      const { page = 1, limit = 10 } = req.query as {
        page: string;
        limit: string;
      };
      
          // Validasi jika userId tidak ada
          if (!userId) {
            return res.status(403).json({
              message: "Unauthorized. User ID is required.",
            });
          }

      const result = await getOrdersByUserService(userId, Number(page), Number(limit));

      res.status(200).json({
        data: result,
        message: "Orders fetched successfully.",
      });
    } catch (error) {
      res.status(500).json({
        data: (error as Error).message,
        message: "Failed to fetch orders.",
      });
    }
  },
};