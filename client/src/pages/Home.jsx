import React, { useEffect, useState } from "react";
import Product from "../components/Home/Product";
import Services from "../components/Home/Services";
import Footer from "../components/Home/Footer";
import Hero from "../components/Home/Hero";
import Categories from "../components/Home/category/Categories";

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
      <Hero/>
      <Services/>
      <Categories />
      <Product products={products} textHeading={"Latest Products"}/>
      <Footer/>
    </main>
  );
};
export default Home;
