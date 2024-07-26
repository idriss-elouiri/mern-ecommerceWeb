import Category from "./category.model";

export async function createcateg(req, res, next) {
  const { name, parent, properties } = req.body;
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to create a category"));
  }
  try {
    const newCategory = new Category({
      userId: req.user.id,
      name,
      parent: parent || undefined,
      properties,
    });
    await newCategory.save();
    res.status(201).json("Created Category successfully");
  } catch (error) {
    next(error);
  }
}
export async function getcategories(req, res, next) {
  try {
    const categories = await Category.find().populate("parent");
    res.status(201).json(categories);
  } catch (error) {
    next(error);
  }
}

export async function updatedcateg(req, res, next) {
  const { name, parent, properties } = req.body;

  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to create a category"));
  }

  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      params.id,
      {
        $set: {
          name,
          parent,
          properties,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedCategory);
  } catch (error) {
    next(error);
  }
}

export async function deletecatg(req, res, next) {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to create a category"));
  }
  try {
    const deletedCategory = await Category.findByIdAndDelete(params.id);
    if (!deletedCategory) {
      return next(errorHandler(400, "Category Not Found"));
    }
    res.status(200).json("Category deleted successfully");
  } catch (error) {
    next(error);
  }
}
