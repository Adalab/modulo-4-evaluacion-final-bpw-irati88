const bcrypt = require("bcrypt");
const mysql = require("../database/mysql-pool");
const { generateToken } = require("../utils/jwt");

const postSignupController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validamos los campos
    if (!name || !email || !password) {
      return res.status(400).send("Faltan datos");
    }

    const connection = await mysql.getConnection();

    // Comprobamos si el email ya está registrado
    const checkQuery = "SELECT * FROM users WHERE email = ?";
    const [existingUser] = await connection.query(checkQuery, [email]);

    if (existingUser.length > 0) {
      return res.status(409).send("El email ya está registrado");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    const data = await connection.query(query, [name, email, passwordHash]);

    const token = generateToken({
      id_user: data[0].insertId,
    });

    res.json({ token, name, id_user: data[0].insertId });
  } catch (error) {
    res.status(400).send("Algo ha salido mal");
  }
};

module.exports = {
  postSignupController,
};
