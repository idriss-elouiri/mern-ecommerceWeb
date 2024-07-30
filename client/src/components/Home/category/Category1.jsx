import Button from "../../Button";
import React, { useEffect, useState } from "react";

const Categories = () => {
  const [productsInfo, setProductsInfo] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/product/getproducts");
      const data = await res.json();
      if (res.ok) {
        setProductsInfo(data.products);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/category/getcategories");
      const data = await res.json();
      if (res.ok) {
        setCategories(data);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="flex items-center gap-10">
      {categories.map((categoryName) => (
        <div key={categoryName._id}>
          {productsInfo.find((p) => p.category === categoryName._id) && (
            <div className="flex justify-center items-center gap-10 bg-brandYellow p-10 rounded-xl">
              <div>
                <p className="mb-[2px] text-white">Enjoy</p>
                <p className="text-2xl font-semibold mb-[2px]">With</p>
                <p className="text-4xl xl:text-5xl font-bold opacity-20 mb-2">
                  {categoryName.name}
                </p>
                <Button
                  text="Browse"
                  bgColor={"bg-white"}
                  textColor={"text-brandYellow"}
                  category={"6632502c014710c6455a88a8"}
                />
              </div>
              {productsInfo
                .filter((p) => p.category === categoryName._id)
                .map((productInfo) => (
                  <div key={productInfo._id} >
                    <img src={productInfo.images[0]} alt="" className="w-[320px]" />{" "}
                    <p>{productInfo.title}</p>
                  </div>
                ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Categories;
