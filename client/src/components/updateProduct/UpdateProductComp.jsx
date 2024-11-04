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
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">
        Update a Product
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            value={formData.title}
          />
          <Select
            id="category"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value="">No category selected</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </Select>
          {propertiesToFill.map((p) => (
            <div key={p.propertyName} className="flex items-center gap-2">
              <label>
                {p.propertyName.charAt(0).toUpperCase() +
                  p.propertyName.slice(1)}
              </label>
              <Select
                value={productProperties[p.propertyName]}
                onChange={(ev) =>
                  setProductProp(p.propertyName, ev.target.value)
                }
              >
                {p.values.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </Select>
            </div>
          ))}
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            id="images"
            multiple
            onChange={(e) => setFiles(e.target.files)}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={handleImageSubmit}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              "Upload Image"
            )}
          </Button>
        </div>
        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
        <div className="grid grid-cols-2 gap-2">
          {images.map((img, index) => (
            <div className="relative" key={index}>
              <img src={img} alt="" className="h-40 w-full object-cover" />
              <button
                className="absolute top-0 right-0 bg-red-600 text-white rounded-full"
                onClick={() => handleRemoveImage(index)}
              >
                X
              </button>
            </div>
          ))}
        </div>
        <Textarea
          rows={5}
          placeholder="Brief description"
          required
          id="briefDesc"
          onChange={(e) =>
            setFormData({ ...formData, briefDesc: e.target.value })
          }
          value={formData.briefDesc}
        />
        <div className="flex flex-col">
          <label htmlFor="content" className="text-gray-700">
            Content
          </label>
          <ReactQuill
            ref={quillRef}
            theme="snow"
            value={formData.content}
            onChange={(value) => setFormData({ ...formData, content: value })}
            modules={{
              toolbar: [
                [{ header: [1, 2, false] }],
                ["bold", "italic", "underline", "strike"],
                ["link", "image"],
                ["clean"],
              ],
            }}
          />
        </div>
        <div className="flex gap-4">
          <TextInput
            type="number"
            placeholder="Price"
            required
            id="price"
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, price: Number(e.target.value) })
            }
            value={formData.price}
          />
          <Button type="submit" gradientDuoTone="greenToBlue">
            Update Product
          </Button>
        </div>
        {publishError && <Alert color="failure">{publishError}</Alert>}
      </form>
    </div>
  );
}
