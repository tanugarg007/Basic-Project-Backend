import {Request, Response} from 'express';
import { prisma } from '../prisma';

interface SignUp {
    name: string;
    email: string;
    password: string;
}
export const SignUp = async (req:Request, res:Response) => {
    try{
        const {name, email,password} = req.body as SignUp;
        if(!name || !email || !password){
            return res.status(400).json({error:"Missing required fields"});
        }
        const existingUser = await prisma.user.findUnique({
            where:{
                email:email
            }
        });
        if(existingUser){
            return res.status(409).json({error:"User already exists"});
        }
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password
            }
        });
        res.status(201).json({message:"User successfully created" , user}); 
        
    }
    catch(error:any){
        res.status(500).json({
            error: error.message    
        })
    }
}