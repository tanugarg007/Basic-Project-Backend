"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Login = void 0;
const prisma_1 = require("../prisma");
const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        if (password.length < 6 || !/[A-Za-z]/.test(password) || !/\d/.test(password)) {
            return res.status(400).json({
                error: "Password must be at least 6 characters and include a letter, a symbol, and a number"
            });
        }
        const user = await prisma_1.prisma.user.findUnique({
            where: {
                email: email
            }
        });
        if (!user || user.password !== password) {
            return res.status(401).json({ error: "Invalid password" });
        }
        res.status(200).json({ message: "Login successful" });
    }
    catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};
exports.Login = Login;
