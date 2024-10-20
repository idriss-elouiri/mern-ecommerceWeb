import { Button, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProductBox from "../components/Home/ProductBox";
import Footer from "../components/Home/Footer";

export default function Search() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "",
  });
  console.log(sidebarData);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [categories, setCategories] = useState([]);
  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    const categoryFromUrl = urlParams.get("category");
    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl,
        category: categoryFromUrl,
      });
    }

    const fetchProducts = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/product/getproducts?${searchQuery}`);
      if (!res.ok) {
        setLoading(false);
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setProducts(data.products);
        setLoading(false);
        if (data.products.length === 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }
    };
    fetchProducts();
  }, [location.search]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/category/getcategories`);
      const data = await res.json();
      if (res.ok) {
        setCategories(data);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    if (e.target.id === "searchTerm") {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }
    if (e.target.id === "sort") {
      const order = e.target.value || "desc";
      setSidebarData({ ...sidebarData, sort: order });
    }
    if (e.target.id === "category") {
      const category = e.target.value || "uncategorized";
      setSidebarData({ ...sidebarData, category });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("category", sidebarData.category);

    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleShowMore = async () => {
    const numberOfProducts = products.length;
    const startIndex = numberOfProducts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/product/getproducts?${searchQuery}`);
    if (!res.ok) {
      return;
    }
    if (res.ok) {
      const data = await res.json();
      setProducts([...products, ...data.products]);
      if (data.products.length === 9) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    }
  };


  return (
    <>
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b md:border-r md:min-h-screen border-gray-500">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className="flex   items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              Search Term:
            </label>
            <TextInput
              placeholder="Search..."
              id="searchTerm"
              type="text"
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort:</label>
            <Select onChange={handleChange} value={sidebarData.sort} id="sort">
              <option value="desc">Latest</option>
              <option value="asc">Oldest</option>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Category:</label>
            <Select
              id="category"
              value={sidebarData.category}
              onChange={(e) =>
                setSidebarData({ ...sidebarData, category: e.target.value })
              }
            >
              <option value="0">No category selected</option>
              {categories.length > 0 &&
                categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
            </Select>
            </div>
          <Button type="submit" outline gradientDuoTone="purpleToPink">
            Apply Filters
          </Button>
        </form>
      </div>
      <div className="w-full">
        <h1 className="text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5 ">
          Products results:
        </h1>
        <div className="p-7 flex flex-wrap gap-4">
          {!loading && products.length === 0 && (
            <p className="text-xl text-gray-500">No products found.</p>
          )}
          {loading && <p className="text-xl text-gray-500">Loading...</p>}
          {!loading &&
            products &&
            products.map((productInfo) => (
              <ProductBox key={productInfo._id} productInfo={productInfo} />
            ))}
          {showMore && (
            <button
              onClick={handleShowMore}
              className="text-teal-500 text-lg hover:underline p-7 w-full"
            >
              Show More
            </button>
          )}
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}
