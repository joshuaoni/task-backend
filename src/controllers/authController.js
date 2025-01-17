const Account = require("../models/Account");
const { generateToken } = require("../utils/jwtUtils");

exports.registerAccount = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existingAccount = await Account.findOne({ email });
    if (existingAccount) return res.status(400).json({ message: "Account already exists" });

    const account = await Account.create({ name, email, password });

    res.status(201).json({
      success: true,
      data: {
        _id: account._id,
        name: account.name,
        email: account.email
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.loginAccount = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const account = await Account.findOne({ email });
    if (!account) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await account.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    res.status(200).json({
      success: true,
      data: {
        _id: account._id,
        name: account.name,
        email: account.email,
        token: generateToken(account),
      },
    });
  } catch (error) {
    next(error);
  }
};
