import React, { useState } from "react";

const DetailsProductComp = ({ product }) => {
  const [showMore, setShowMore] = useState({});
  const [activeImg, setActiveImage] = useState(product?.images?.[0] ); // Fallback to an empty string if images is missing
  const [amount, setAmount] = useState(1);

  const toggleShowMore = (id) => {
    setShowMore((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  console.log(product.price)
  if (!product) return null; // Early return if no product
  return (
    <section className="container py-20 md:py-5">
      <div className="flex flex-col justify-between lg:flex-row gap-16 lg:items-center">
        {/* Image Section */}
        <div className="flex flex-col gap-12 lg:w-[40%] border order-2 lg:order-0">
          <div className="w-full h-[300px] flex items-center justify-center">
            <img
              src={activeImg}
              alt={product.title}
              className="h-full object-cover"
            />
          </div>
          {product.images && product.images.length > 0 && ( // Render only if images exist
            <div className="flex flex-row justify-center items-center gap-5 border w-full h-[130px] border">
              {product.images.map((url, index) => (
                <img
                  key={index} // Ensure each image has a unique key
                  src={url}
                  alt={product.title} // Improve accessibility
                  className="h-full w-[100px] rounded-md cursor-pointer object-contain"
                  onClick={() => setActiveImage(url)}
                />
              ))}
            </div>
          )}
        </div>

        {/* About Section */}
        <div className="flex flex-col gap-4 lg:w-2/4 order-0 lg:order-2">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p>{product.briefDesc}</p>
          <div
            dangerouslySetInnerHTML={{
              __html: showMore[product._id]
                ? product.content || "" // Use empty string if content is undefined
                : `${(product.content || "").substring(0, 1000)}...`, // Safe substring call
            }}
          />
          <button onClick={() => toggleShowMore(product._id)}>
            {showMore[product._id] ? "Show Less" : "Show More..."}
          </button>
          <h6 className="text-2xl font-semibold">${product.price}</h6>

          {/* Quantity Selector */}
          <div className="flex flex-row items-center gap-12">
            <div className="flex flex-row items-center">
              <button
                className="bg-gray-200 py-2 px-5 rounded-lg text-emerald-500 text-3xl"
                onClick={() => setAmount((prev) => Math.max(prev - 1, 1))} // Prevent negative amounts
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
    </section>
  );
};

export default DetailsProductComp;
