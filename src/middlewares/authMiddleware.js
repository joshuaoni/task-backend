const jwt = require("jsonwebtoken");
const Account = require("../models/Account");

exports.protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.account = await Account.findById(decoded.id).select("-password");
    if (!req.account) return res.status(404).json({ message: "Account not found" });

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
};
