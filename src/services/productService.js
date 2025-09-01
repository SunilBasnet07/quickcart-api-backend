
import Product from "../models/Product.js";
import uploadfile from "../utils/file.js";
import generateGeminiAi from "../utils/gemini.js";



const getAllProducts = async (query) => {
  let limit = 0, sort = {}, filters = {};

  try {
    // ✅ Limit
    limit = query?.limit ? Number(query.limit) : 0;

    // ✅ Sort
    if (query?.sort) {
      sort = typeof query.sort === "string" ? JSON.parse(query.sort) : query.sort;
    }

    // ✅ Filters
    if (query?.filters) {
      const parsedFilters =
        typeof query.filters === "string" ? JSON.parse(query.filters) : query.filters;

      if (parsedFilters.name) {
        filters.name = { $regex: parsedFilters.name, $options: "i" };
      }

      if (parsedFilters.category) {
        filters.category = parsedFilters.category;
      }
      if (parsedFilters.brand) {
        filters.brand = parsedFilters.brand;
      }

      if (parsedFilters.minPrice || parsedFilters.maxPrice) {
        filters.price = {};
        if (parsedFilters.minPrice) filters.price.$gte = Number(parsedFilters.minPrice);
        if (parsedFilters.maxPrice) filters.price.$lte = Number(parsedFilters.maxPrice);
      }
    }
  } catch (err) {
    console.error("Error parsing query params:", err.message);
  }

  console.log("Final filters:", filters);

  return await Product.find(filters).limit(limit).sort(sort);
};




const getProductById = async (id) => {
  return await Product.findById(id);
}
const getCategories = async () => {
  return await Product.distinct("category");
}
const getAllCategories = async (category) => {
  console.log(category)
  return await Product.find(category);
}
const getBrand = async () => {
  return await Product.distinct("brand");
}

const createProduct = async (userId, data, files) => {
  const uploadFiles = await uploadfile(files);
  const geminiResponse = await generateGeminiAi(data);
  return await Product.create({ ...data, createdBy: userId, description: geminiResponse, imageUrls: uploadFiles.map((item) => item.url) });

}
const updateProduct = async (id, data, files) => {

  const uploadFiles = await uploadfile(files);


  return await Product.findByIdAndUpdate(id, { ...data, imageUrls: uploadFiles.map((item) => item.url) }, { new: true });
}
const deleteProduct = async (id) => {
  return await Product.findByIdAndDelete(id);
}


export default { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, getCategories ,getBrand,getAllCategories}