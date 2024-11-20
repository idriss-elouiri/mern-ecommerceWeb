import React, { useRef, useEffect, useState } from "react";
import {
  Alert,
  Button,
  FileInput,
  Select,
  Textarea,
  TextInput,
} from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase.js";
import { ReactSortable } from "react-sortablejs";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function UpdatedProductComp() {
  const [files, setFiles] = useState([]);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    briefDesc: "",
    category: "",
    price: 0,
  });
  const [productProperties, setProductProperties] = useState({});
  const [images, setImages] = useState([]);
  const [publishError, setPublishError] = useState(null);
  const { productId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const quillRef = useRef(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/product/getproducts?productId=${productId}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setFormData({
          title: data.products[0].title,
          content: data.products[0].content,
          briefDesc: data.products[0].briefDesc,
          category: data.products[0].category,
          price: data.products[0].price,
        });
        setProductProperties(data.products[0].properties);
        setImages(data.products[0].images);
      } catch (error) {
        console.error(error.message);
        setPublishError(error.message);
      }
    };

    fetchProduct();
  }, [productId]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/category/getcategories`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      }
    };

    fetchCategories();
  }, []);

  const handleImageSubmit = async (e) => {
    if (files.length > 0 && files.length + images.length <= 6) {
      setUploading(true);
      try {
        const urls = await Promise.all([...files].map(storeImage));
        setImages((prevImages) => [...prevImages, ...urls]);
        setImageUploadError(null);
      } catch (error) {
        setImageUploadError("Image upload failed (2 MB max per image)");
      } finally {
        setUploading(false);
      }
    } else {
      setImageUploadError("You can only upload 6 images per listing");
    }
  };

  const storeImage = (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(1));
        },
        (error) => {
          reject(error);
          setImageUploadProgress(null);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
          setImageUploadProgress(null);
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/product/updateproduct/${productId}/${currentUser._id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            images,
            properties: productProperties,
          }),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      navigate(`/product-details/${data.slug}`);
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

  const propertiesToFill = categories.reduce((acc, cat) => {
    if (cat._id === formData.category) {
      acc.push(...cat.properties);
      let parentCat = cat.parent;
      while (parentCat?._id) {
        const parent = categories.find(({ _id }) => _id === parentCat._id);
        if (parent) {
          acc.push(...parent.properties);
          parentCat = parent.parent;
        } else {
          break;
        }
      }
    }
    return acc;
  }, []);

  const setProductProp = (propName, value) => {
    setProductProperties((prev) => ({ ...prev, [propName]: value }));
  };

  const updateImagesOrder = (imageUrls) => {
    setImages(imageUrls);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row">
        <div className="p-7 border-b md:border-r md:min-h-screen border-gray-500">
          <FilterForm
            sidebarData={sidebarData}
            handleChange={handleChange}
            categories={categories}
            handleSubmit={handleSubmit}
          />
        </div>
        <div className="w-full">
          <h1 className="text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5">
            نتائج المنتجات:
          </h1>
          <div className="p-7 flex flex-wrap gap-4">
            {loading && (
              <p className="text-xl text-gray-500">جاري التحميل...</p>
            )}
            {!loading && products.length === 0 && (
              <p className="text-xl text-gray-500">لم يتم العثور على منتجات.</p>
            )}
            {!loading &&
              products.map((productInfo) => (
                <ProductBox key={productInfo._id} productInfo={productInfo} />
              ))}
            {showMore && (
              <button
                onClick={handleShowMore}
                className="text-teal-500 text-lg hover:underline p-7 w-full"
              >
                عرض المزيد
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
