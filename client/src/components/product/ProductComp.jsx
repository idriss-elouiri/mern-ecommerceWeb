import React, { useEffect, useState } from "react";
import ProductBox from "../Home/ProductBox";

const ProductComp = () => {
  const [productsInfo, setProductsInfo] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async (url, setState) => {
    try {
      const res = await fetch(url, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setState(data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchData(`${import.meta.env.VITE_BACKEND_URL}/api/product/getproducts`, setProductsInfo);
    fetchData(`${import.meta.env.VITE_BACKEND_URL}/api/category/getcategories`, setCategories);
  }, []);

  const renderProductsByCategory = (category) => {
    const filteredProducts = productsInfo.filter(product => product.category === category._id);
    if (filteredProducts.length === 0) return null;

    return (
      <div key={category._id}>
        <h2 className="text-2xl py-5 capitalize">{category.name}</h2>
        <div className="flex -mx-5 overflow-x-scroll snap-x scrollbar-hide">
          {filteredProducts.map(product => (
            <div key={product._id} className="px-5 snap-start">
              <ProductBox productInfo={product} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className="px-10 mt-20 md:mt-10">
      {error && <div className="text-red-500">{error}</div>}
      {categories.map(renderProductsByCategory)}
    </section>
  );
};

export default ProductComp;
