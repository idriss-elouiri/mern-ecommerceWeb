import React, { useRef, useEffect } from "react";
import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";
import { useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";

export default function CreateProduct() {
  const [files, setFiles] = useState([]);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    price: 0,
  });
  const [images, setImages] = useState([]);
  const [productProperties, setProductProperties] = useState({});
  const [publishError, setPublishError] = useState(null);
  console.log(typeof formData.price);
  const navigate = useNavigate();
  const quillRef = useRef(null);

  useEffect(() => {
    const quillElement = quillRef.current;
  }, []);

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + images.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setImages(images.concat(urls));
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError("Image upload failed (2 mb max per image)");
          setUploading(false);
        });
    } else {
      setImageUploadError("You can only upload 6 images per listing");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
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
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
            setImageUploadProgress(null);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/product/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          images,
          properties: productProperties,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate(`/product/${data.slug}`);
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/category/getcategories");
      const data = await res.json();
      if (res.ok) {
        setCategories(data);
      }
    };
    fetchData();
  }, []);

  const propertiesToFill = [];
  if (categories.length > 0 && formData.category) {
    let catInfo = categories.find(({ _id }) => _id === formData.category);
    propertiesToFill.push(...catInfo.properties);
    while (catInfo?.parent?._id) {
      const parentCat = categories.find(
        ({ _id }) => _id === catInfo?.parent?._id
      );
      propertiesToFill.push(...parentCat.properties);
      catInfo = parentCat;
    }
  }
  function setProductProp(propName, value) {
    setProductProperties((prev) => {
      const newProductProps = { ...prev };
      newProductProps[propName] = value;
      return newProductProps;
    });
  }
  function updateImagesOrder(imageUrls) {
    setImages(imageUrls);
  }
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">
        Create a product
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
          />
          {/* Category select */}
          <div>
            <Select
              id="category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
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
          {propertiesToFill.length > 0 &&
            propertiesToFill.map((p) => (
              <div key={p.propertyName} className="flex items-center gap-2">
                <label>
                  {p.propertyName[0].toUpperCase() +
                    p.propertyName.substring(1)}
                </label>

                <div>
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
        {images.length > 0 &&
          images.map((url, index) => (
            <div
              key={url}
              className="flex justify-between p-3 border items-center"
            >
              <img
                src={url}
                alt="listing image"
                className="w-20 h-20 object-contain rounded-lg"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75"
              >
                Delete
              </button>
            </div>
          ))}
        <ReactQuill
          theme="snow"
          placeholder="Write something..."
          ref={quillRef}
          className="h-72 mb-12"
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
        />
        <TextInput
          type="number"
          placeholder="Price"
          required
          id="price"
          className="flex-1"
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        />
        <Button type="submit" gradientDuoTone="purpleToPink">
          Publish
        </Button>
        {publishError && (
          <Alert className="mt-5" color="failure">
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}
