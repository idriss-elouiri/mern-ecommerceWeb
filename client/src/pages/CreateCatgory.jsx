import React from "react";

const CreateCatgory = () => {
  return (
    <>
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
    </>
  );
};

export default CreateCatgory;
