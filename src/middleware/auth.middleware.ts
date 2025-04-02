import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"


export const authenticateJWT = (
    req:Request,
    res:Response,
    next:NextFunction
)=>{
    const token = req.header("Authorization")
    if(!token){
        res.status(401).json({message:"Not found token"})
    }else{
    try {
        const decoded = jwt.verify(token,process.env.ACCESS_TOKEN as string);
        (req as any).user = decoded;
        next()
        
    } catch (error) {
        res.status(401).json({message:"Invalid token"})
    }
}
}