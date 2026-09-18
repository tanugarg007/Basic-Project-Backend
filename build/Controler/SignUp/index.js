"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUp = void 0;
const prisma_1 = require("../prisma");
const SignUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const existingUser = await prisma_1.prisma.user.findUnique({
            where: {
                email: email
            }
        });
        if (existingUser) {
            return res.status(409).json({ error: "User already exists" });
        }
        const user = await prisma_1.prisma.user.create({
            data: {
                name,
                email,
                password
            }
        });
        res.status(201).json({ message: "User successfully created", user });
    }
    catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};
exports.SignUp = SignUp;
