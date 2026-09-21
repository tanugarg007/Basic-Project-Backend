"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStudent = exports.updateStudent = exports.getAllStudent = exports.createStudent = void 0;
const prisma_1 = require("../prisma");
const createStudent = async (req, res) => {
    try {
        const { name, email, class: className, rollNo, age } = req.body;
        if (!name || !email || !className || !rollNo || !age) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        if (!Number.isInteger(rollNo) || rollNo < 0) {
            return res.status(400).json({ error: "Roll No must contain numbers only" });
        }
        const student = await prisma_1.prisma.student.create({
            data: {
                name,
                email,
                class: className,
                rollNo,
                age
            }
        });
        res.status(201).json(student);
    }
    catch (error) {
        res.status(500).json({
            error: error.message
        });
        console.error("Error creating student:", error);
    }
};
exports.createStudent = createStudent;
const getAllStudent = async (req, res) => {
    try {
        const students = await prisma_1.prisma.student.findMany();
        res.json(students);
    }
    catch (error) {
        res.status(500).json({
            error: error.message
        });
        console.error("Error creating student:", error);
    }
};
exports.getAllStudent = getAllStudent;
const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, class: className, rollNo, age } = req.body;
        if (!Number.isInteger(rollNo) || rollNo < 0) {
            return res.status(400).json({ error: "Roll No must contain numbers only" });
        }
        const student = await prisma_1.prisma.student.update({
            where: {
                id: Number(id)
            },
            data: {
                name,
                email,
                class: className,
                rollNo,
                age
            }
        });
        res.json(student);
    }
    catch (error) {
        res.status(500).json({
            error: error.message
        });
        console.error("Error creating student:", error);
    }
};
exports.updateStudent = updateStudent;
const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await prisma_1.prisma.student.delete({
            where: {
                id: Number(id)
            }
        });
        res.json(student);
    }
    catch (error) {
        res.status(500).json({
            error: error.message
        });
        console.error("Error creating student:", error);
    }
};
exports.deleteStudent = deleteStudent;
