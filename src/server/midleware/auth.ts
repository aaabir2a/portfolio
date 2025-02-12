import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
  user?: { id: string; name: string; email: string }; // Adjust the type according to your user object structure
}

const auth = (req: AuthRequest, res: Response, next: NextFunction): void => {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if no token
  if (!token) {
    res.status(401).json({ msg: "No token, authorization denied" });
    return;
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      user: { id: string; name: string; email: string };
    };
    req.user = decoded.user;
    next();
  } catch {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

export default auth;
