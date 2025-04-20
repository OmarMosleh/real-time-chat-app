import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async(req, res, next) => {
    try{
        const token = req.cookies.jwt; //jwt is the name of the cookie we gave earlier
        // to be able to grab the cookie we will need to use cookie-parser package
        if(!token){
            return res.status(401).json({message: "Unauthorized - No token Provided"});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET) // to decode the token -we embedded earlier the user ID in the token -
        if(!decoded){
            return res.status(400).json({message: "Unauthorized - Invalid Token"})
        }   
        const user = await User.findById(decoded.userId).select("-password");
        
        if(!user){
            return res.status(404).json({message: "User not found"});
        }

        req.user = user; //after authentication we are adding the user to the request
        next();


    }catch (error){
        console.log("Error in protectRoute middleware: ", error.message)
    }
}