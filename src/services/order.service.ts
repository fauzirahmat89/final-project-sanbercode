import OrderModel from "../models/order.model";
import OrderDetailModel from "../models/orderDetail.model";
import ProductsModel from "../models/products.model";

export async function createOrderService(userId: string, grandTotal: number, orderItems: any[]) {
  // Validasi stok produk
  for (const item of orderItems) {
    const product = await ProductsModel.findById(item.productId).lean();
    if (!product) throw new Error(`Product not found: ${item.productId}`);
    if (item.quantity < 1 || item.quantity > 5) {
      throw new Error(`Quantity must be between 1 and 5 for product: ${item.productId}`);
    }

    console.log("Product Data:", product);
      console.log("Requested Quantity:", item.quantity);
      console.log("Available Stock:", product.qty);

    if (product.qty < item.quantity) {
      throw new Error(`Insufficient stock for product: ${product.name}. Available stock: ${product.qty}, requested: ${item.quantity}.`);
    }
  }

  // Simpan Order dan OrderDetail
  const order = await OrderModel.create({
    grandTotal,
    createdBy: userId,
    status: "pending",
  });

  const orderDetails = await Promise.all(
    orderItems.map(async (item) => {
      const product = await ProductsModel.findById(item.productId);

      if (!product) {
        throw new Error(`Product with ID ${item.productId} not found.`);
      }

      // Validasi stok produk
      if (product.qty < item.quantity) {
        throw new Error( `Insufficient stock for product: ${product.name}. Available stock: ${product.qty}, requested: ${item.quantity}.`);
      }

      // Kurangi stok produk
      await ProductsModel.findByIdAndUpdate(item.productId, {
        $inc: { qty: -item.quantity },
      });

      // Buat order detail
      return OrderDetailModel.create({
        order: order._id,
        product: item.productId,
        name: product.name, // Ambil nama dari produk
        price: product.price, // Ambil harga dari produk
        quantity: item.quantity, // Gunakan quantity dari orderItems
        subTotal: product.price * item.quantity,
      });
    })
  );

  return { order, orderDetails };
}

export async function getOrdersByUserService(userId: string, page: number, limit: number) {
  const skip = (page - 1) * limit;
  const orders = await OrderModel.find({ createdBy: userId })
    .skip(skip)
    .limit(limit)
    .populate("createdBy", "username email")
    .sort({ createdAt: -1 });

  const total = await OrderModel.countDocuments({ createdBy: userId });

  return { orders, total, page, limit };
}
