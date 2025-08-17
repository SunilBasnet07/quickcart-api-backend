import { PASSWORD_REGEX } from "../constant/regex.js";
import { formatterUserData } from "../helper/formatter.js";
import authService from "../services/authService.js"
import { createJwt } from "../utils/jwt.js";

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email && !password) return res.status(428).send("Email and Password is required.")
        if (!email) return res.status(428).send("Email is required.")
        if (!password) return res.status(428).send("Password is required.")
        const data = await authService.login(req.body);
        const formatterData = formatterUserData(data)
        const token = createJwt(formatterData);
        res.cookie("authToken", token);
        res.json({ ...formatterData, token });

    } catch (error) {
        res.status(500).send(error.message);
    }
}
const register = async (req, res) => {
    const { name, email, phone, password, confirmPassword } = req.body;
    try {
        if (!name) return res.starus(428).send("Name is required");
        if (!email && !password && !name && !phone && !confirmPassword) return res.starus(428).send("All Empty field is required.")
        if (!email) return res.starus(428).send("Email is required.")
        if (!password) return res.starus(428).send("Password is required.")
        if (!confirmPassword) return res.starus(428).send("ConfirmPassword is required.")
        if (password != confirmPassword) return res.send("Password and ConfirmPassword do not matched")
        if (!PASSWORD_REGEX.test(password)) return res.status(500).send("Password must be contain uppercase lowercase number and special character.")
        const user = await authService.register(req.body)
        const formatterData = formatterUserData(user);
        const token = createJwt(formatterData);
        res.cookie("authToken", token);
        res.json({ ...formatterData, token });

    } catch (error) {
        res.status(500).send(error.message);
    }
}

const forgotPassword = async (req,res) => {
    const email = req.body;
    try {
        if (!email) return res.send("Email is required.");
        await authService.forgotPassword(email);
        res.send("email Linked sucessfully.")
    } catch (error) {
        res.send(error.message);
    }
}

export { login, register,forgotPassword }