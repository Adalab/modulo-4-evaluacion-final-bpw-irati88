const bcrypt = require("bcrypt");
const mysql = require("../database/mysql-pool");
const { generateToken } = require("../utils/jwt");


const postLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validamos los campos
    if (!email || !password) {
      return res.status(400).send("Faltan datos");
    }

    const connection = await mysql.getConnection();

    const query = "SELECT * FROM user WHERE email = ?";
    const [data] = await connection.query(query, [email]);
    const user = data[0];

    if (!user) {
      return res.status(401).json({
        error: "Usuario inválido",
      });
    }

    const isPasswordCorrect =
      user === null ? false : await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        error: "Credenciales inválidas",
      });
    }

    const token = generateToken({
      id_user: user.id_user,
    });

    res.json({ token, name: user.name, id_user: user.id_user });
  } catch (error) {
    res.send("Algo ha salido mal");
  }
};

module.exports = {
  postLoginController,
};
