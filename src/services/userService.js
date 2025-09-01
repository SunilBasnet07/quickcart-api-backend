import User from "../models/User.js"
import uploadfile from "../utils/file.js";


const getAllUsers = async (query) => {
   
    let filters={}
    if(query.filters){
        const parsedFilters = typeof query?.filters ==='string' ? JSON.parse(query.filters):query.filters;
        if (parsedFilters.name) {
        filters.name = { $regex: parsedFilters.name, $options: "i" };
      }
    }
     console.log(filters)
    return await User.find(filters);
}
const getUserById = async (id) => {
    return await User.findById(id);
}
const createUser = async (data) => {
     const user = await User.findOne({ email: data?.email })
    if (user) throw new Error("User already exist.");
    return await User.create(data);
}
const updateUser = async (id, data) => {
   
    return await User.findByIdAndUpdate(id, {
        ...data, address:{
            city: data.city,
            province: data.province,
            country: data.country,
        }
    });
}
const deleteUser = async (id) => {
    return await User.findByIdAndDelete(id);
}
const uploadProfileImage = async (userId, file) => {

    const uploadedFile = await uploadfile([file]);
    return await User.findByIdAndUpdate(userId, {
        profileImageUrl: uploadedFile[0]?.url
    }, { new: true });
}

export default { createUser, getAllUsers, getUserById, updateUser, deleteUser, uploadProfileImage }