const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  const token = jwt.sign(payload, process.env.SECRET_KEY_JWT, { expiresIn: "1h" });

  return token;
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY_JWT);

    return decoded;
  } catch (err) {
    return null;
  }
};

module.exports = {
  generateToken,

  verifyToken,
};
