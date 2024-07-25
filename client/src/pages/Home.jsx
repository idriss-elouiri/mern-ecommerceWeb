import React from "react";
import Category from "../components/Home/category/Category";
import Product from "../components/Home/Product";
import Services from "../components/Home/Services";
import Partners from "../components/Home/Partners";
import Footer from "../components/Home/Footer";

const Home = () => {
  return (
    <main>
      <Services/>
      <Category />
      <Product/>
      <Partners/>
      <Footer/>
    </main>
  );
};
export default Home;
