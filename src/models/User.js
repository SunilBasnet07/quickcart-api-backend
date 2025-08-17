import mongoose from "mongoose";
import { EMAIL_REGEX } from "../constant/regex.js";
import { ADMIN_ROLES, MERCHANT_ROLES, USER_ROLES } from "../constant/roles.js";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 30,
    },
    address: {
        city: String,
        province: String,
        country: {
            type: String,
            default: "Nepal",
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: (value) => {
                return EMAIL_REGEX.test(value);
            },
            message: "Please provide a valid email address"
        }
    },
    number: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,


    },
    confirmPassword: {
        type: String,
        minlength: 8,
    },
    profileImageUrl: String,
    roles: {
        type: [String],
        uppercase: true,
        default: [USER_ROLES],
        enum: [USER_ROLES, MERCHANT_ROLES, ADMIN_ROLES]

    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }

});
const model = mongoose.model("User", userSchema);
export default model;