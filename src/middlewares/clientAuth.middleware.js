import { asyncHandler } from "../utils/asynchandler.js";
import { Staff } from "../models/staff.models.js";
import jwt from "jsonwebtoken"

const clientAuth = asyncHandler(async (req, res, next) => {
  const token = req.cookies['access_Token'];
  if (!token) {
    return res.status(401).json({ message: "Access token missing", isAuthenticated: false });
  }

  try {
    const role = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET).role;
    req.role = role;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      const refreshToken = req.cookies['refresh_Token'];
      if (!refreshToken) {
        return res.status(401).json({ message: "Refresh token missing", isAuthenticated: false });
      }

      try {
        const id = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET).id;
        const user = await Staff.findById(id);

        if (user.refreshToken !== refreshToken) {
          return res.status(401).json({ message: "Invalid refresh token", isAuthenticated: false });
        }

        const accessToken = user.generateAccessToken();
        const newRefreshToken = user.generateRefreshToken();
        user.refreshToken = newRefreshToken;
        await user.save();

        
        res.cookie("refresh_Token", newRefreshToken, { httpOnly: true, secure: true, sameSite: 'strict' });

        req.token = accessToken
        req.role = user.role;
        next();
      } catch (error) {
        return res.status(401).json({ message: "Error refreshing tokens", isAuthenticated: false });
      }
    } else {
      return res.status(401).json({ message: "Invalid access token", isAuthenticated: false });
    }
  }
});

export { clientAuth }