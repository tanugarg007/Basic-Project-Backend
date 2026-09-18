import {Request,Response} from 'express';
import {prisma} from '../prisma';

interface Login {
    email: string;
    password: string;
}
export const Login = async (req:Request,res:Response) => {
    try{
        const {email,password} = req.body as Login;
        if(!email || !password){
            return res.status(400).json({error:"Missing required fields"});
        }
        const user = await prisma.user.findUnique({
            where:{
                email:email
            }
        });
        if(!user || user.password !== password){
            return res.status(401).json({error:"Invalid password"});
        }
        res.status(200).json({message:"Login successful" });
    }
    catch(error:any){
        res.status(500).json({
            error: error.message    
        })
    }
}