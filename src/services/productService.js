
import Product from "../models/Product.js";
import uploadfile from "../utils/file.js";
import generateGeminiAi from "../utils/gemini.js";



const getAllProducts = async (query) => {
  let limit = 0, sort = {}, filters = {};

  try {
    limit = query?.limit ? Number(query.limit) : 0;

    if (query?.sort) {
      sort = typeof query.sort === "string" ? JSON.parse(query.sort) : query.sort;
 
    }


    if (query?.filters) {

    }
  } catch (err) {
    console.error("Error parsing query params:", err.message);
  }

console.log(sort)
  return await Product.find(filters).limit(limit).sort(sort);
};



const getProductById = async (id) => {
  return await Product.findById(id);
}
const getCategories = async () => {
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


export default { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, getCategories }