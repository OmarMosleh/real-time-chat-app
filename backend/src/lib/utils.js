import jwt from "jsonwebtoken";
export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("jwt", token,{
    maxAge: 7*24*60*60*1000,
    httpOnly: true, //means the cookie is not accessible by JS - prevent XSS( cross site scripting attacks) attack
    sameSite:"strict",
    secure: process.env.NODE_ENV !== "development", // http in localhost -development- but https in production
  })
  return token;
};
