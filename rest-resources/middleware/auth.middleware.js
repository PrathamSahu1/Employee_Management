import jwt from 'jsonwebtoken'
const secretKey = 'xyz123';

const authenticate = (req, res, next) => {
    const authHeader = req.header("Authorization");
    const token = authHeader.split(" ")[1]; 
   
    
    if (!token) {
      return res.status(401).json({ message: "Access Denied. No token provided." });
    }
  
    try {
      const decoded = jwt.verify(token, secretKey);
      req.user = decoded; // Attach user data to the request object
      next();
    } catch (error) {
      res.status(400).json({ message: "Invalid token." });
    }
  };
  
  export {authenticate}