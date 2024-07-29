import { useEffect, useState } from "react";
import Link from "react-router-dom"
const pageSize = 10; // Number of orders per page

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);
  function fetchOrders() {
    setLoadingOrders(true);
    fetch("/api/order/get").then((res) => {
      res.json().then((orders) => {
        setOrders(orders.reverse());
        setLoadingOrders(false);
      });
    });
  }
  // Calculate the total number of pages
  const totalPages = Math.ceil(orders.length / pageSize);
  // Calculate the start and end index for the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(currentPage * pageSize, orders.length);

  const ordersToDisplay = orders.slice(startIndex, endIndex);

  const changePage = (page) => {
    setCurrentPage(page);
  };
  return (
      <div className="flex flex-col w-full">
        <header>
          <div className="my-10 text-center w-full">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-3xl">
              All Orders
            </h1>
          </div>
          <hr className="my-8 h-px border-0 bg-gray-300" />
        </header>
        <div className="overflow-x-auto mx-auto px-4 w-full">
          {loadingOrders && <div>Loading orders...</div>}{" "}
          {!loadingOrders && orders.length === 0 && (
            <p className="w-full text-center text-xl font-semibold">
              No orders available.
            </p>
          )}
          <>
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-md  border rounded">
              <thead>
                <tr>
                  <th className="whitespace-nowrap px-4 py-2 text-gray-900 text-start font-bold">
                    Paid
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 text-gray-900 text-start font-bold">
                    User Name
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 text-gray-900 text-start font-bold">
                    createdAt
                  </th>
                </tr>
              </thead>
              {ordersToDisplay.map((order, index) => (
                <tbody className="divide-y divide-gray-200" key={order._id}>
                  <tr>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      <div>
                        <div
                          className={
                            (order.paid ? "bg-emerald-500" : "bg-red-400") +
                            " p-2 rounded-md text-white w-24 text-center"
                          }
                        >
                          {order.paid ? "Paid" : "Not paid"}
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 flex items-center  gap-1">
                      <div className="grow">
                        <div className="flex gap-2 items-center mb-1">
                          <div className="grow">{order.userEmail}</div>
                        </div>
                        <div className="text-gray-500 text-xs">
                          {order.cartProducts.map((p) => p.title).join(", ")}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="text-gray-500 text-sm">
                        {order.createdAt}
                      </div>
                    </td>
                    <td>
                      {" "}
                      <div className="justify-end flex gap-2 items-center whitespace-nowrap">
                        <Link
                          to={"/dashboard/dashOrders/" + order._id}
                          className="button"
                        >
                          Show order
                        </Link>
                      </div>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
            {/* Pagination controls */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-4">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => changePage(i + 1)}
                    className={`mx-2 px-3 py-2 rounded ${
                      i + 1 === currentPage
                        ? "bg-blue-300 text-slate-900"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        </div>
      </div>
  );
}