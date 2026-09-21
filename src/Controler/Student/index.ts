import {Request, Response} from "express";
import { prisma } from "../prisma";

interface Student {
    name: string;
    email: string;
    class: string;
    rollNo: number;
    age: number;
}
export const createStudent = async (req:Request, res:Response) => {
    try{
        const { name, email, class: className, rollNo, age } = req.body as Student;
        if (!name || !email || !className || !rollNo || !age) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        if (!Number.isInteger(rollNo) || rollNo < 0) {
            return res.status(400).json({ error: "Roll No must contain numbers only" });
        }
        const student = await prisma.student.create({
            data: {
                name,
                email,
                class: className,
                rollNo,
                age
               
            }
        });     
        res.status(201).json(student);
    } catch (error: any) {
        res.status(500).json({
            error: error.message
        })
        console.error("Error creating student:", error);
    }
 
}

export const getAllStudent = async (req:Request, res:Response) => {
    try{
        const students = await prisma.student.findMany();
        res.json(students);
    } catch (error: any) {
        res.status(500).json({
            error: error.message
        })
        console.error("Error creating student:", error);
    }
}

export const updateStudent = async (req:Request, res:Response) => {
    try{
        const { id } = req.params;
        const { name, email, class: className, rollNo, age } = req.body as Student;
        if (!Number.isInteger(rollNo) || rollNo < 0) {
            return res.status(400).json({ error: "Roll No must contain numbers only" });
        }
        const student = await prisma.student.update({
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
    } catch (error: any) {
        res.status(500).json({
            error: error.message
        })
        console.error("Error creating student:", error);
    }
}   

export const deleteStudent = async (req:Request, res:Response) => {
    try{
        const { id } = req.params;  
        const student = await prisma.student.delete({
            where: {
                id: Number(id)
            }
        });
        res.json(student);
    } catch (error: any) {
        res.status(500).json({
            error: error.message
        })
        console.error("Error creating student:", error);
    }
}

