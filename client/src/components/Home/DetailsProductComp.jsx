import React, { useState } from "react";

const DetailsProductComp = ({ product }) => {
  const [showMore, setShowMore] = useState({});
  const [activeImg, setActiveImage] = useState(product.images[0]);
  const [amount, setAmount] = useState(1);
  const toggleShowMore = (id) => {
    setShowMore((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };
  return (
    <section className="container py-20 md:py-5">
      {product && (
        <div className="flex flex-col justify-between lg:flex-row gap-16 lg:items-center">
          <div className="flex flex-col gap-12 lg:w-[40%] border order-2 lg:order-0">
            <div className="w-full h-[300px] flex items-center justify-center">
            <img
              src={activeImg}
              alt=""
              className="h-full object-cover "
            />
            </div>
            <div className="flex flex-row justify-center items-center gap-5 border w-[full] h-[130px] border">
              {product.images?.map((url) => (
                <img
                  src={url}
                  alt=""
                  className="h-full w-[100px]  rounded-md cursor-pointer object-contain"
                  onClick={() => setActiveImage(url)}
                />
              ))}
            </div>
          </div>
          {/* ABOUT */}
          <div className="flex flex-col gap-4 lg:w-2/4 order-0 lg:order-2 ">
            <div>
              <h1 className="text-3xl font-bold">{product?.title}</h1>
            </div>
            <p className="">{product?.briefDesc}</p>
            <div
              dangerouslySetInnerHTML={{
               
                  __html: showMore[product._id]
                    ? product.content
                    : product.content.substring(0, 1000) + '...',
                }}

            ></div>
            <button onClick={() => toggleShowMore(product._id)}>
              {showMore[product._id] ? "Show moins" : "Show more..."}
            </button>
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
