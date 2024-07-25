import React, { useEffect, useState } from "react";
import Category from "../components/Home/category/Category";
import Product from "../components/Home/Product";
import Services from "../components/Home/Services";
import Partners from "../components/Home/Partners";
import Footer from "../components/Home/Footer";

const Home = () => {
  const [products, setProducts] = useState([])
  useEffect(() => {
      const fetchProducts = async () => {
      const res = await fetch("/api/product/getproducts")
      const data = await res.json()
      if(res.ok){
          setProducts(data.products)
      }
      }
      fetchProducts()
  }, [])
  return (
    <main>
      <Services/>
      <Category />
      <Product products={products}/>
      <Partners/>
      <Footer/>
    </main>
  );
};
export default Home;
