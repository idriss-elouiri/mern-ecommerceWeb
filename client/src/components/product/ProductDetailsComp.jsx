import { Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentSection from "../comment/CommentSection";
import DetailsProductComp from "../Home/DetailsProductComp";
import Product from "../Home/Product";
import Footer from "../Home/Footer";

const ProductDetailsComp = () => {
  const { productSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState(null);
  const [recentProducts, setRecentProducts] = useState([]);

  const fetchData = async (url, setter) => {
    try {
      setLoading(true);
      const response = await fetch(url, {
         method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to fetch data");
      setter(data.products || data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/product/getproducts?slug=${productSlug}`,
      setProduct
    );
    fetchData(
      `${import.meta.env.VITE_BACKEND_URL}/api/product/getproducts?limit=4`,
      setRecentProducts
    );
  }, [productSlug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <>
      <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
        {product && <DetailsProductComp product={product} />}
        <CommentSection productId={product?._id} />
        <div className="flex flex-wrap gap-5 mt-5 justify-center">
          {recentProducts.length > 0 && (
            <Product
              products={recentProducts}
              textHeading={"Recent Articles"}
            />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductDetailsComp;
