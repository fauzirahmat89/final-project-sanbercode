import mongoose, { Schema, Types } from "mongoose";

export interface Order {
  _id?: Types.ObjectId;
  grandTotal: number;
  createdBy: Types.ObjectId;
  status: "pending" | "completed" | "cancelled";
}

const orderSchema = new Schema<Order>(
  {
    grandTotal: {
      type: Number,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model("Order", orderSchema);
export default OrderModel;