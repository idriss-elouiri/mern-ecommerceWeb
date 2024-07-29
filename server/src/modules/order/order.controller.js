import Order from "./order.model.js";

export async function getorder(req, res, next) {
  const userEmail = req.user.email;

  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");
  if (_id) {
    const orderId = await Order.findById(_id)
    res.status(200).json(orderId);
  }

  if (req.user.isAdmin) {
    const orders = await Order.find()
    res.status(200).json(orders);
  }

  if (userId) {
    const order = await Order.find({userEmail})
    res.status(200).json(order);

  }
}