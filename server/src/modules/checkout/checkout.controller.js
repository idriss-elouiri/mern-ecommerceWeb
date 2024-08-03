import Order from "../order/order.model.js";
import Product from "../product/product.model.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SK);

export async function create(req, res) {
  const { cartProducts, address } = req.body;
  const userEmail = req.user.email;

  if (!cartProducts) {
    throw new Error("No products found in the cart.");
  }

  const productsArray = Array.isArray(cartProducts)
    ? cartProducts
    : [cartProducts];

  const orderDoc = await Order.create({
    userEmail,
    ...address,
    cartProducts,
    paid: false,
  });

  const stripeLineItems = [];

  for (const cartProduct of cartProducts) {
    const productInfo = await Product.findById(cartProduct._id);

    let productPrice = productInfo.price;

    const productName = cartProduct.title;

    productPrice = Math.round(productPrice);


    stripeLineItems.push({
      quantity: 1,
      price_data: {
        currency: "USD",
        product_data: {
          name: productName,
        },
        unit_amount: productPrice * 100,
      },
    });
  }

  const stripeSession = await stripe.checkout.sessions.create({
    line_items: stripeLineItems,
    mode: "payment",
    customer_email: userEmail,
    success_url:
      "http://localhost:5173/" +
      "order/" +
      orderDoc._id.toString() +
      "?clear-cart=1",
    cancel_url: "http://localhost:5173/" + "cart?canceled=1",
    metadata: { orderId: orderDoc._id.toString() },
    payment_intent_data: {
      metadata: { orderId: orderDoc._id.toString() },
    },
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: "Delivery fee",
          type: "fixed_amount",
          fixed_amount: { amount: 500, currency: "USD" },
        },
      },
    ],
  });
  res.status(200).json(stripeSession.url);
}
