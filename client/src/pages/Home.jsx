import React from "react";
import Category from "../components/Home/category/Category";
import Product from "../components/Home/Product";
import Services from "../components/Home/Services";

const Home = () => {
  return (
    <main>
      <Services/>
      <Category />
      <Product/>
    </main>
  );
};
export default Home;
