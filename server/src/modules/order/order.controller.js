import Order from "./order.model.js";

export async function getorder(req, res, next) {
  const userEmail = req.user.email;

  const _id = req.query._id;
  if (_id) {
    const orderId = await Order.findById(_id)
    return res.status(200).json(orderId);
  }

  if (req.user.isAdmin) {
    const orders = await Order.find()
    return res.status(201).json(orders);
  }

  if (userEmail) {
    const order = await Order.find({userEmail})
    return res.status(202).json(order);
  }
}