
import {  useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Order() {
  const [order, setOrder] = useState();
  const [loadingOrder, setLoadingOrder] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    if (typeof window.console !== "undefined") {
      if (window.location.href.includes("clear-cart=1")) {
      }
    }
    const fetchOrder = async () => {
        if (id) {
          setLoadingOrder(true);
          const res = await fetch(`/api/order/get?_id=${id}`)
        const data = await res.json()
            setOrder(data)
        }
    }
    fetchOrder()
  }, []);

  let subtotal = 0;
  if (order?.cartProducts) {
    for (let i = 0; i < order.cartProducts.length; i++) {
      subtotal += order.cartProducts[i].price;
    }
  }

  return (
    <section className="max-w-2xl mx-auto mt-20 md:mt-10">
      <div className="text-center">
        <h2 className="text-primary font-bold text-4xl italic">orders</h2>
        <div className="mt-4 mb-8">
          <p>Thanks for your order.</p>
          <p>We will call you when your order will be on the way.</p>
        </div>
      </div>
      {loadingOrder && <div>Loading order...</div>}
      {order && (
        <>
          {order.cartProducts.map((productInfo) => (
            <div className="flex mb-5 items-center" key={productInfo._id}>
              <div
                className="bg-gray-100 p-3 rounded-xl shrink-0"
                style={{ boxShadow: "inset 1px 0px 10px 10px rgba(0,0,0,0.1)" }}
              >
                <img className="w-24" src={productInfo.images[0]} alt="" />
              </div>
              <div className="pl-4 items-center">
                <h3 className="font-bold text-lg">{productInfo.title}</h3>
                <p className="text-sm leading-4 text-gray-500 line-clamp-3">
                  {productInfo.content}
                </p>
                <div className="flex mt-1">
                  <div className="grow font-bold">${productInfo.price}</div>
                  <div>
                    <button className="border border-emerald-500 px-2 rounded-lg text-emerald-500">
                      -
                    </button>
                    <span className="px-2">0</span>
                    <button className="bg-emerald-500 px-2 rounded-lg text-white">
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <form>
            <div className="mt-8 flex flex-col">
              <div className="mt-8">
                <input
                  name="phone"
                  id="phone"
                  value={order.phone}
                  disabled={true}
                  className="p-2 border-[3px] border-[lightgray] bg-slate-100 outline-none w-full rounded mb-2"
                  type="number"
                  placeholder="Your Phone"
                />
                <input
                  name="streetAddress"
                  id="streetAddress"
                  value={order.streetAddress}
                  disabled={true}
                  className="p-2 border-[3px] border-[lightgray] bg-slate-100 outline-none w-full rounded mb-2"
                  type="text"
                  placeholder="Street address"
                />
                <input
                  name="city"
                  id="city"
                  value={order.city}
                  disabled={true}
                  className="p-2 border-[3px] border-[lightgray] bg-slate-100 outline-none w-full rounded mb-2"
                  type="text"
                  placeholder="City"
                />
                <input
                  name="country"
                  id="country"
                  value={order.country}
                  disabled={true}
                  className="p-2 border-[3px] border-[lightgray] bg-slate-100 outline-none w-full rounded mb-2"
                  type="text"
                  placeholder="Your country"
                />
                <input
                  name="postalCode"
                  id="postalCode"
                  value={order.postalCode}
                  disabled={true}
                  className="p-2 border-[3px] border-[lightgray] bg-slate-100 outline-none w-full rounded "
                  type="number"
                  placeholder="Postal Code"
                />
              </div>
            </div>
            <div className="mt-8">
              <div className="flex my-3">
                <h3 className="grow font-bold text-gray-400">Subtotal:</h3>
                <h3 className="font-bold">${subtotal}</h3>
              </div>
              <div className="flex my-3">
                <h3 className="grow font-bold text-gray-400">Delivery:</h3>
                <h3 className="font-bold"> $5</h3>
              </div>
              <div className="flex my-3 border-t pt-3 border-dashed border-emerald-500">
                <h3 className="grow font-bold text-gray-400">Total:</h3>
                <h3 className="font-bold">${subtotal + 5}</h3>
              </div>
            </div>
            <input type="hidden" name="products" />
          </form>
        </>
      )}
    </section>
  );
}
