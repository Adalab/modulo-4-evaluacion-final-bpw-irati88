const mysql = require("../database/mysql-pool");

const getRecipesController = async (req, res) => {
  try {
    const { id_user } = req.user;
    const query =
      "SELECT * FROM recipes WHERE deleted_at IS NULL AND fk_user = ?";

    const connection = await mysql.getConnection();
    const data = await connection.query(query, [id_user]);
    res.json(data[0]);
  } catch {
    res.status(400).send("Algo ha ido mal");
  }
};

module.exports = {
  getRecipesController,
};
