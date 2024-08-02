import React, {  useState } from "react";

const DetailsProductComp = ({ product }) => {
  const [activeImg, setActiveImage] = useState(product.images[0]);
  const [amount, setAmount] = useState(1);
  return (
    <section className="container py-20 md:py-5">
      {product && (
        <div className="flex flex-col justify-between lg:flex-row gap-16 lg:items-center">
          <div className="flex flex-col gap-6 lg:w-[40%]">
            <img
              src={activeImg}
              alt=""
              className="w-full h-full aspect-square object-cover rounded-xl"
            />
            <div className="flex flex-row justify-between h-24 w-full">
              {product.images?.map((url) => (
                <img
                  src={url}
                  alt=""
                  className="w-24 h-24 rounded-md cursor-pointer object-cover"
                  onClick={() => setActiveImage(url)}
                />
              ))}
            </div>
          </div>
          {/* ABOUT */}
          <div className="flex flex-col gap-4 lg:w-2/4">
            <div>
              <h1 className="text-3xl font-bold">{product?.title}</h1>
            </div>
            <p className="" >{product?.briefDesc}</p>
            <p className="text-gray-700"  dangerouslySetInnerHTML={{ __html: product.content }}></p>
            <h6 className="text-2xl font-semibold">$ {product?.price}</h6>
            <div className="flex flex-row items-center gap-12">
              <div className="flex flex-row items-center">
                <button
                  className="bg-gray-200 py-2 px-5 rounded-lg text-emerald-500  text-3xl"
                  onClick={() => setAmount((prev) => prev - 1)}
                >
                  -
                </button>
                <span className="py-4 px-6 rounded-lg">{amount}</span>
                <button
                  className="bg-gray-200 py-2 px-4 rounded-lg text-emerald-500 text-3xl"
                  onClick={() => setAmount((prev) => prev + 1)}
                >
                  +
                </button>
              </div>
              <button
                type="button"
                className="bg-emerald-500 text-white font-semibold py-3 px-16 rounded-xl h-full"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default DetailsProductComp;