import User from "../models/User.js"
import bcrypt from "bcrypt"
import ResendEmail from "../utils/resend.js";


const login = async (data) => {

    const user = await User.findOne({ email: data.email });
    if (!user) throw new Error("User not found.");
    const isPasswordMatched = bcrypt.compareSync(data.password, user.password);
    if (!isPasswordMatched) {
        throw {
            statusCode: 400,
            message: "Incorrect email and password."
        }
    }




    return user;
}



const register = async (data) => {
    const user = await User.create({ email: data.email })
    if (user) throw new Error("User already exist.");

    const hashPassword = bcrypt.hashSync(data.password, 10);

    const userdata = await User.create({
        name: data.name,
        email: data.email,
        number: data.number,
        password: hashPassword,
        confirmPassword: hashPassword,
        roles: data.roles

    })

    return userdata;
}

const forgotPassword = async ({ email }) => {
    const user = await User.findOne({email});
    if (!user) {
        throw {
            statusCode: 403,
            message: "User not found."
        }
    }
    await ResendEmail(user.email);
    return {
        message: "Forgot password email sent to your email"
    }

}

export default { login, register, forgotPassword };