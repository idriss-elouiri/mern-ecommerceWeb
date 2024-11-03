import React, { useEffect, useState } from "react";

const DashCategories = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);
  const [editedCategory, setEditedCategory] = useState(null);
  const [parentCategory, setParentCategory] = useState("");
  const [properties, setProperties] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/category/getcategories`,{
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
      }
      if (res.ok) {
        setCategories(data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setCategories([]);
    }
  };

  const saveCategory = async (e) => {
    e.preventDefault();
    const allData = {
      name: categoryName,
      parent: parentCategory,
      properties: properties.map((p) => ({
        propertyName: p.propertyName,
        values: p.values.split(","),
      })),
    };
    if (editedCategory) {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/category/updatecategory/${editedCategory._id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(allData),
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
      }
      if (res.ok) {
        setEditedCategory(null);
        console.log("Edited Category Successfully");
      } else {
        console.log("This didn't work.");
      }
    } else {
      const res = await fetch("/api/category/create", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(allData),
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
      }
      if (res.ok) {
        setEditedCategory(null);
      } 
    }
    setCategoryName("");
    setParentCategory("");
    setProperties([]);
    fetchData();
  };
  const editCategory = async (category) => {
    setEditedCategory(category);
    setCategoryName(category.name);
    setParentCategory(category.parent?._id);
    setProperties(
      category.properties.map(({ propertyName, values }) => ({
        propertyName,
        values: values.join(","),
      }))
    );
  };

  const deleteCategory = async (id) => {
    const savingPromise = new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/category/deletecategory/${id}`, {
          method: "DELETE",
          credentials: "include",
        });
        const data = await res.json();
        if (data.success === false) {
          console.log(data.message)
        }
        if (res.ok) {
          setCategories(categories.filter((categorie) => categorie._id !== id));
          closeModal();
        }
      } catch (error) {
        console.log(error)
      }
    });
  };

  function addProperty() {
    setProperties((prev) => {
      return [...prev, { values: "", propertyName: "" }];
    });
  }

  function handlePropertyNameChange(index, property, newName) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].propertyName = newName;
      return properties;
    });
  }
  function handlePropertyValuesChange(index, property, newValues) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].values = newValues;
      return properties;
    });
  }

  function removeProperty(indexToRemove) {
    setProperties((prev) => {
      return [...prev].filter((p, pIndex) => {
        return pIndex !== indexToRemove;
      });
    });
  }


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
                    <span>
                      {editedCategory ? (
                        <>
                          Editing category,{" "}
                          <span className="text-green-600 font-bold">
                            {editedCategory.name}
                          </span>{" "}
                          &nbsp;
                          <span className="text-blue-500 font-bold">
                            {editedCategory?.parent?.name}
                          </span>
                        </>
                      ) : (
                        "Create a new category!"
                      )}
                    </span>
                  </p>
                </div>
                <form
                  onSubmit={saveCategory}
                  className="mt-4 flex flex-col gap-4 sm:mt-3 max-sm:px-4 "
                >
                  <div className="flex items-center flex-wrap justify-between gap-2 max-sm:gap-1">
                    <div className="relative max-sm:w-full">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2.5 text-gray-500">
                        +
                      </div>
                      <div className="absolute inset-y-0 right-0 flex items-center text-gray-500">
                        <select
                          className="h-full rounded-md border-transparent bg-transparent py-0 pl-3  pr-7 text-gray-500  sm:text-sm"
                          value={parentCategory}
                          onChange={(ev) => setParentCategory(ev.target.value)}
                        >
                          <option>No parent</option>
                          {categories.length > 0 &&
                            categories.map((category) => (
                              <option key={category._id} value={category._id}>
                                {category.name}
                              </option>
                            ))}
                        </select>
                      </div>
                      <input
                        type="text"
                        id="example11"
                        className="block w-[330px] max-sm:w-full rounded-md border border-slate-300 py-2.5 pl-8 pr-16 shadow-sm "
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
                  {properties.length > 0 &&
                    properties.map((property, index) => (
                      <div
                        key={property.Propertyname}
                        className="flex max-sm:flex-col gap-2 mb-2"
                      >
                        <input
                          type="text"
                          value={property.propertyName}
                          className="mb-0 rounded-lg"
                          onChange={(ev) =>
                            handlePropertyNameChange(
                              index,
                              property,
                              ev.target.value
                            )
                          }
                          placeholder="property name (example: color)"
                        />
                        <input
                          type="text"
                          className="mb-0 rounded-lg"
                          onChange={(ev) =>
                            handlePropertyValuesChange(
                              index,
                              property,
                              ev.target.value
                            )
                          }
                          value={property.values}
                          placeholder="values, comma separated"
                        />
                        <button
                          onClick={() => removeProperty(index)}
                          type="button"
                          className=" rounded bg-red-600 text-md font-medium text-white hover:bg-red-700 px-4 py-2"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  <div className="flex gap-1 max-sm:flex-col max-sm:gap-3">
                    {editedCategory && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditedCategory(null);
                          setCategoryName("");
                          setParentCategory("");
                          setProperties([]);
                        }}
                        className="rounded-lg bg-red-600 font-medium text-white hover:bg-red-700  px-5 py-3 "
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      type="submit"
                      class="rounded-lg  border border-blue-100 bg-blue-100 px-5 py-3 text-center text-sm font-medium text-blue-600 transition-all hover:border-blue-200 hover:bg-blue-200 focus:ring focus:ring-blue-50 disabled:border-blue-50 disabled:bg-blue-50 disabled:text-blue-400 max-sm:w-full"
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
                No catgories available.
              </p>
            ) : (
              <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-md border rounded">
                <thead>
                  <tr>
                    <th className="whitespace-nowrap px-4 py-2 text-gray-900 text-start font-bold">
                      #
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 text-gray-900 text-start font-bold">
                      Category Name
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 text-gray-900 text-start font-bold">
                      Parent Category
                    </th>
                    <th className="px-4 py-2 whitespace-nowrap text-gray-900 text-start font-bold">
                      Status
                    </th>
                  </tr>
                </thead>
                {categories.map((category, index) => (
                  <tbody
                    key={category._id}
                    className="divide-y divide-gray-200 "
                  >
                    <tr>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        {index + 1}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        {" "}
                        {category.name}{" "}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        {" "}
                        {category?.parent?.name}{" "}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 gap-4 flex">
                        <button
                          onClick={() => editCategory(category)}
                          className="inline-block rounded bg-emerald-500 px-4 py-2 text-xs font-medium text-white hover:bg-green-700"
                        >
                          Edit
                        </button>
                        <div
                          onKeyDown={() => setShowModal(false)}
                          className="inline-block rounded bg-red-600 text-xs font-medium text-white hover:bg-red-700"
                        >
                          <button onClick={toggleModal} className="px-4 py-2">
                            Delete
                          </button>
                          {showModal && (
                            <>
                              <div className="fixed inset-0 z-10 bg-gray-300/50"></div>
                              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
                                <div className="mx-auto w-full overflow-hidden rounded-lg bg-white shadow-xl sm:max-w-sm">
                                  <div className="relative p-5">
                                    <div className="text-center">
                                      <div className="mx-auto mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-500">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          strokeWidth="1.5"
                                          stroke="currentColor"
                                          className="h-6 w-6"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                          />
                                        </svg>
                                      </div>
                                      <div>
                                        <h3 className="text-lg font-medium text-gray-900">
                                          Delete blog post
                                        </h3>
                                        <div className="mt-2 text-sm text-gray-500 max-w-sm">
                                          Are you sure you want to delete this{" "}
                                          {category?.name}?
                                        </div>
                                      </div>
                                    </div>
                                    <div className="mt-5 flex justify-end gap-3">
                                      <button
                                        onClick={closeModal}
                                        className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-100 focus:ring focus:ring-gray-100 disabled:cursor-not-allowed disabled:border-gray-100 disabled:bg-gray-50 disabled:text-gray-400"
                                      >
                                        Cancel
                                      </button>
                                      <button
                                        className="flex-1 rounded-lg border border-red-500 bg-red-500 px-4 py-2 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-red-700 hover:bg-red-700 focus:ring focus:ring-red-200 disabled:cursor-not-allowed disabled:border-red-300 disabled:bg-red-300"
                                        onClick={() =>
                                          deleteCategory(category._id)
                                        }
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            )}
          </div>
        </div>
    );
};

export default DashCategories;