import { Request, Response } from "express";
import CategoriesModel from "../models/categories.model";

export default {
  async create(req: Request, res: Response) {
    /**
     * #swagger.tags = ['Categories']
     * #swagger.security = [{
     *   "bearerAuth": []
     * }]
     * #swagger.requestBody = {
     *   required: true,
     *   schema: {
     *     type: "object",
     *     properties: {
     *       name: {
     *         type: "string",
     *         example: "Electronics"
     *       }
     *     },
     *     required: ["name"]
     *   }
     * }
    */
    try {
      const result = await CategoriesModel.create(req.body);
      res.status(201).json({
        data: result,
        message: "Success create product",
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        data: err.message,
        message: "Failed create product",
      });
    }
  },
  async findAll(req: Request, res: Response) {
    /**
     * #swagger.tags = ['Categories']
     * #swagger.parameters['search'] = {
     *   in: 'query',
     *   description: 'Search categories by name',
     *   required: false,
     *   type: 'string'
     * }
     * #swagger.parameters['page'] = {
     *   in: 'query',
     *   description: 'Page number for pagination',
     *   required: false,
     *   type: 'integer',
     *   default: 1
     * }
     * #swagger.parameters['limit'] = {
     *   in: 'query',
     *   description: 'Number of items per page',
     *   required: false,
     *   type: 'integer',
     *   default: 10
     * }
    */
    try {
      const search = req.query.search;
      const page = req.query.page;
      const limit = req.query.limit;

      const result = await CategoriesModel.find();
      res.status(200).json({
        data: result,
        message: "Success get all categories",
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        data: err.message,
        message: "Failed get all categories",
      });
    }
  },
  async findOne(req: Request, res: Response) {
    /**
     * #swagger.tags = ['Categories']
     * #swagger.parameters['id'] = {
     *   in: 'path',
     *   description: 'ID of the category',
     *   required: true,
     *   type: 'string',
     *   example: '6733050702ff333090f8d6e2'
     * }
    */
    try {
      const result = await CategoriesModel.findOne({
        _id: req.params.id,
      });
      res.status(200).json({
        data: result,
        message: "Success get one product",
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        data: err.message,
        message: "Failed get one product",
      });
    }
  },
  async update(req: Request, res: Response) {
    /**
     * #swagger.tags = ['Categories']
     * #swagger.security = [{
     *   "bearerAuth": []
     * }]
     * #swagger.requestBody = {
     *   required: true,
     *   schema: {
     *     type: "object",
     *     properties: {
     *       name: {
     *         type: "string",
     *         example: "Updated Category Name"
     *       }
     *     },
     *     required: ["name"]
     *   }
     * }
    */
    try {
      const result = await CategoriesModel.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        {
          new: true,
        }
      );

      res.status(200).json({
        data: result,
        message: "Success update product",
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        data: err.message,
        message: "Failed update product",
      });
    }
  },
  async delete(req: Request, res: Response) {
    /**
     * #swagger.tags = ['Categories']
     * #swagger.security = [{
     *   "bearerAuth": []
     * }]
     * #swagger.parameters['id'] = {
     *   in: 'path',
     *   description: 'ID of the category to delete',
     *   required: true,
     *   type: 'string',
     *   example: '6733050702ff333090f8d6e2'
     * }
    */
    try {
      const result = await CategoriesModel.findOneAndDelete({
        _id: req.params.id,
      });

      res.status(200).json({
        data: result,
        message: "Success delete product",
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        data: err.message,
        message: "Failed delete product",
      });
    }
  },
};
