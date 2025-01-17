const express = require("express");
const { registerAccount, loginAccount } = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerAccount);
router.post("/login", loginAccount);

module.exports = router;
