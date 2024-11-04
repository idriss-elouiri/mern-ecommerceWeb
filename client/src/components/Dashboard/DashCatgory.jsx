import React, { useEffect, useState } from "react";

const DashCategories = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);
  const [editedCategory, setEditedCategory] = useState(null);
  const [parentCategory, setParentCategory] = useState("");
  const [properties, setProperties] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal((prev) => !prev);
  const closeModal = () => setShowModal(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/category/getcategories`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to fetch categories");

      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  const saveCategory = async (e) => {
    e.preventDefault();

    const categoryData = {
      name: categoryName,
      parent: parentCategory,
      properties: properties.map(({ propertyName, values }) => ({
        propertyName,
        values: values.split(","),
      })),
    };

    try {
      const method = editedCategory ? "PUT" : "POST";
      const url = editedCategory
        ? `${import.meta.env.VITE_BACKEND_URL}/api/category/updatecategory/${
            editedCategory._id
          }`
        : "/api/category/create";

      const response = await fetch(url, {
        method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(categoryData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Operation failed");

      console.log(
        `${editedCategory ? "Edited" : "Created"} Category Successfully`
      );
      resetForm();
      fetchCategories();
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };

  const editCategory = (category) => {
    setEditedCategory(category);
    setCategoryName(category.name);
    setParentCategory(category.parent?._id || "");
    setProperties(
      category.properties.map(({ propertyName, values }) => ({
        propertyName,
        values: values.join(","),
      }))
    );
  };

  const deleteCategory = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/category/deletecategory/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to delete category");

      setCategories((prev) => prev.filter((category) => category._id !== id));
      closeModal();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const addProperty = () => {
    setProperties((prev) => [...prev, { propertyName: "", values: "" }]);
  };

  const handlePropertyChange = (index, propertyName, newValue) => {
    setProperties((prev) => {
      const updatedProperties = [...prev];
      updatedProperties[index][propertyName] = newValue;
      return updatedProperties;
    });
  };

  const removeProperty = (index) => {
    setProperties((prev) => prev.filter((_, pIndex) => pIndex !== index));
  };

  const resetForm = () => {
    setEditedCategory(null);
    setCategoryName("");
    setParentCategory("");
    setProperties([]);
  };

  return (
    <div className="flex flex-col w-full">
      <header>
        <div className="mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="flex max-xl:flex-col justify-between items-center max-xl:gap-10 ">
            <div className="text-center sm:text-left">
              <h1 className="text-3xl font-bold text-gray-900 sm:text-3xl">
                All Categories
              </h1>
              <p className="mt-1.5 text-md text-gray-500">
                {editedCategory ? (
                  <span>
                    Editing category:{" "}
                    <span className="text-green-600 font-bold">
                      {editedCategory.name}
                    </span>{" "}
                    under{" "}
                    <span className="text-blue-500 font-bold">
                      {editedCategory?.parent?.name}
                    </span>
                  </span>
                ) : (
                  "Create a new category!"
                )}
              </p>
            </div>
            <form
              onSubmit={saveCategory}
              className="mt-4 flex flex-col gap-4 sm:mt-3 max-sm:px-4"
            >
              <div className="flex items-center flex-wrap justify-between gap-2 max-sm:gap-1">
                <div className="relative max-sm:w-full">
                  <select
                    className="h-full rounded-md border-transparent bg-transparent py-0 pl-3 pr-7 text-gray-500 sm:text-sm"
                    value={parentCategory}
                    onChange={(ev) => setParentCategory(ev.target.value)}
                  >
                    <option>No parent</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    className="block w-[330px] max-sm:w-full rounded-md border border-slate-300 py-2.5 pl-8 pr-16 shadow-sm"
                    placeholder="Category Name"
                    value={categoryName}
                    onChange={(ev) => setCategoryName(ev.target.value)}
                    required
                  />
                </div>
                <button
                  type="button"
                  className="rounded-md max-sm:w-full border border-slate-300 py-2.5 px-2.5 shadow-sm"
                  onClick={addProperty}
                >
                  Add new property
                </button>
              </div>
              {properties.map((property, index) => (
                <div key={index} className="flex max-sm:flex-col gap-2 mb-2">
                  <input
                    type="text"
                    value={property.propertyName}
                    className="mb-0 rounded-lg"
                    onChange={(ev) =>
                      handlePropertyChange(
                        index,
                        "propertyName",
                        ev.target.value
                      )
                    }
                    placeholder="property name (e.g., color)"
                  />
                  <input
                    type="text"
                    className="mb-0 rounded-lg"
                    value={property.values}
                    onChange={(ev) =>
                      handlePropertyChange(index, "values", ev.target.value)
                    }
                    placeholder="values, comma separated"
                  />
                  <button
                    type="button"
                    className="rounded bg-red-600 text-md font-medium text-white hover:bg-red-700 px-4 py-2"
                    onClick={() => removeProperty(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <div className="flex gap-1 max-sm:flex-col max-sm:gap-3">
                {editedCategory && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="rounded-lg bg-red-600 font-medium text-white hover:bg-red-700 px-5 py-3"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  className="rounded-lg border border-blue-100 bg-blue-100 px-5 py-3 text-center text-sm font-medium text-blue-600 transition-all hover:border-blue-200 hover:bg-blue-200 focus:ring focus:ring-blue-50 disabled:border-blue-50 disabled:bg-blue-50 disabled:text-blue-400 max-sm:w-full"
                >
                  {editedCategory ? "Save changes" : "Save Category"}
                </button>
              </div>
            </form>
          </div>
          <hr className="my-8 h-px border-0 bg-gray-300" />
        </div>
      </header>
      <div className="overflow-x-auto mx-auto p-4 w-full">
        {loading && <div>Loading Categories...</div>}
        {!loading && categories.length === 0 ? (
          <p className="w-full text-center font-semibold text-xl my-2">
            No categories available.
          </p>
        ) : (
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-md border rounded">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 text-gray-900 text-start">
                  Category Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-gray-900 text-start">
                  Parent
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-gray-900 text-start">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {categories.map((category) => (
                <tr key={category._id}>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {category.name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-500">
                    {category.parent ? category.parent.name : "No Parent"}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 flex items-center">
                    <button
                      className="font-medium text-blue-600 hover:text-blue-500"
                      onClick={() => editCategory(category)}
                    >
                      Edit
                    </button>
                    <button
                      className="ml-2 font-medium text-red-600 hover:text-red-500"
                      onClick={() => deleteCategory(category._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default DashCategories;
