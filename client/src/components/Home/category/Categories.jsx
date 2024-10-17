import Button from "../../Button";
import React, { useEffect, useState } from "react";

const Categories = () => {
  const [productsInfo, setProductsInfo] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/product/getproducts`);
      const data = await res.json();
      if (res.ok) {
        setProductsInfo(data.products);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/category/getcategories`);
      const data = await res.json();
      if (res.ok) {
        setCategories(data);
      }
    };
    fetchData();
  }, []);
  return (
    <div  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-[90%] mx-auto">
      {categories.map((categoryName) => (
        <div key={categoryName._id}>
          {productsInfo.find((p) => p.category === categoryName._id) && (
            <div>
              <div className="col-span-2 py-10  pl-5 bg-gradient-to-br from-gray-400/90 to-gray-100 text-white rounded-3xl relative h-[320px] flex items-end">
                <div>
                  <div className="mb-4">
                    <p className="mb-[2px] text-white">Enjoy</p>
                    <p className="text-2xl font-semibold mb-[2px]">With</p>
                    <p className="text-4xl xl:text-5xl font-bold opacity-20 mb-2">
                      {categoryName.name}
                    </p>
                    <Button
                      text="Browse"
                      bgColor={"bg-white"}
                      textColor={"text-primary"}
                      category={categoryName._id}
                    ></Button>
                  </div>
                </div>
                {productsInfo
                  .filter((p) => p.category === categoryName._id)
                  .map((productInfo) => (
                    <img
                      src={productInfo.images[0]}
                      alt=""
                      className="sm:w-[100px] lg:w-[120px] w-[150px] absolute top-1/2 -translate-y-1/2 right-5"
                    />
                  ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Categories;
