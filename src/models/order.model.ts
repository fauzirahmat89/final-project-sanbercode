import mongoose, { Types } from "mongoose";

export interface order{
    grandTotal: number;
    orderItems:  Types.ObjectId;
    createBy: Types.ObjectId;
    status: string;
    createdAt: string;
    updatedAt: string;
    _id?: Types.ObjectId;
}

const Schema = mongoose.Schema;

const ProductsSchema = new Schema<order>(
    {
        grandTotal: {
            type: Schema.Types.Number,
            required: true,
        },
        orderItems:{
            type: Schema.Types.ObjectId,
            ref: "orderDetail",
        },
        createBy:{
            type: Schema.Types.ObjectId,
            ref: "",
        },
        status:{
            type: Schema.Types.String,
            enum: ["pending", "completed", "cancelled"]
        }
    },
    {
        timestamps: true,
    }
);

const orderModel = mongoose.model("Order", ProductsSchema);

export default orderModel;