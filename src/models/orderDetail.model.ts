import mongoose, { Schema, Types } from "mongoose";

export interface OrderDetail {
    _id?: Types.ObjectId;
    order: Types.ObjectId;
    product: Types.ObjectId;
    name: string;
    price: number;
    quantity: number;
    subTotal: number;
  }
  
  const orderDetailSchema = new Schema<OrderDetail>(
    {
      order: {
        type: Schema.Types.ObjectId,
        ref: "Order",
        required: true,
      },
      product: {
        type: Schema.Types.ObjectId,
        ref: "Products",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
      },
      subTotal: {
        type: Number,
        required: true,
      },
    },
    { timestamps: true }
  );
  
  const OrderDetailModel = mongoose.model("OrderDetail", orderDetailSchema);
  export default OrderDetailModel;
  