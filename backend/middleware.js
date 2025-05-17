const jwt = require("jsonwebtoken");

const authMiddleware = (req,res,next)=>{
    try {
        const heading = req.headers;
        if(!heading.authorization){
            return res.status(401).json({message:"Token not found"});
        }

        const token = heading.authorization.split(" ")[1];
        if(!token){
            return res.status(401).json({message:"Token not found"});
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({message:"Invalid token"});
        }
        req.user = decoded;
        next();        
    } catch (error) {
        return res.status(401).json({message:"Unauthorized"});
    }
};
module.exports = authMiddleware