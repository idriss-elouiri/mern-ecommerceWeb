import { Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CommentSection from "../components/CommentSection";
import DetailsProductComp from "../components/Home/DetailsProductComp";
import Product from "../components/Home/Product";
import Footer from "../components/Home/Footer";

export default function ProductDetails() {
  const { productSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [product, setProduct] = useState(null);
  const [recentProducts, setRecentProducts] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/product/getproducts?slug=${productSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setProduct(data.products[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productSlug]);

  useEffect(() => {
    try {
      const fetchRecentProducts = async () => {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/product/getproducts?limit=4`);
        const data = await res.json();
        if (res.ok) {
          setRecentProducts(data.products);
        }
      };
      fetchRecentProducts();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  return (
    <>
      <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
        {product && <DetailsProductComp product={product} />}
        <CommentSection productId={product._id} />
        <div className="flex flex-wrap gap-5 mt-5 justify-center">
          {recentProducts && (
            <Product
              products={recentProducts}
              textHeading={"Recent Articels"}
            />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
