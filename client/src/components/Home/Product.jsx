import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Product = ({products}) => {
   
  return (
    <div className="container my-10">
      <div className="text-center mb-10 max-w-[600px] mx-auto space-y-2">
        <h1 className="text-3xl font-bold lg:text-4xl">Lorem ipsum dolor sit amet.</h1>
        <p className="text-xs text-gray-400">Lorem ipsum dolor sit amet.</p>
      </div>
      <div className="mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 place-items-center">
          {products &&
            products.map((product) => (
              <div className="group" key={product._id}>
                <div className="relative">
                  <img
                    src={product.images[0]}
                    alt=""
                    className="h-[200px] w-[200px] object-cover rounded-md"
                  />
                  <div className="hidden group-hover:flex  absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-full h-full text-center group-hover:backdrop-blur-sm justify-center items-center duration-200">
                    <button
                      className="py-2 px-3 bg-emerald-400 text-white rounded-full"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
                <div className="leading-7">
                  <h3 className="font-semibold">
                    <Link to={"/products/" + product._id}>
                      {product.title}
                    </Link>
                  </h3>
                  <p className="font-bold">${product.price}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Product;