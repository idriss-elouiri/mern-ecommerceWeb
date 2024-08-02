import React, { useEffect, useState } from "react";
import ProductBox from "../components/Home/ProductBox";

const ProductPage = () => {
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
    <section className="px-10 mt-20 md:mt-10">
      {categories.map((categoryName) => (
        <div key={categoryName._id}>
          {productsInfo.find((p) => p.category === categoryName._id) && (
            <div>
              <h2 className="text-2xl py-5 capitalize">{categoryName.name}</h2>
              <div className="flex -mx-5 overflow-x-scroll snap-x scrollbar-hide">
                {productsInfo
                  .filter((p) => p.category === categoryName._id)
                  .map((productInfo) => (
                    <div key={productInfo._id} className="px-5 snap-start">
                      <ProductBox productInfo={productInfo} />
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </section>
  );
};

export default ProductPage;