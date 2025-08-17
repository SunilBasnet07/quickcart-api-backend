import User from "../models/User.js"
import uploadfile from "../utils/file.js";


const getAllUsers = async () => {
    return await User.find();
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