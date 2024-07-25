import React, { useEffect, useState } from "react";
import ProductBox from "../components/Home/ProductBox";

const ProductPage = () => {
  const [productsInfo, setProductsInfo] = useState([]);

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

  
  return (
    <section className="px-10 mt-20 md:mt-10">
     
        <div >
            <div>
              <div className="flex -mx-5 overflow-x-scroll snap-x scrollbar-hide">
                {productsInfo &&
                  productsInfo.map((productInfo) => (
                    <div key={productInfo._id} className="px-5 snap-start">
                      <ProductBox {...productInfo} />
                    </div>
                  ))}
              </div>
            </div>
        </div>
    </section>
  );
};

export default ProductPage;