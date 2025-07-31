import Order from "../Models/Orders.js";

// Create new order
export const createOrder = async (req, res) => {
  try {
    const {
      userId,
      orderedItems,
      userShipping,
      amount,
      orderId,
      paymentId,
      signature,
    } = req.body;

    const newOrder = await Order.create({
      userId,
      orderedItems,
      userShipping,
      amount,
      orderId,
      paymentId,
      signature,
      payStatus: "Paid",
      orderStatus: "Processing",
    });

    res.status(201).json({ message: "Order placed successfully", success: true, order: newOrder });
  } catch (error) {
    res.status(500).json({ message: "Failed to create order", success: false, error });
  }
};

// Get all orders for a user
export const getUserOrders = async (req, res) => {
  try {
    const userId  = req.user;
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders", success: false, error });
  }
};

// Get single order
export const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found", success: false });
    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch order", success: false, error });
  }
};
