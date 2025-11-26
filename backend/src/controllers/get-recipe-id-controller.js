const mysql = require("../database/mysql-pool");

const getRecipeIdController = async (req, res) => {
  try {
    const { id_user } = req.params;

    // Validamos que la ID escogida sea correcta
    if (isNaN(Number(id))) {
      return res.status(400).send("ID inválido");
    }

    const query =
      "SELECT * FROM recipes WHERE id_recipe = ? AND deleted_at IS NULL";

    const connection = await mysql.getConnection();
    const data = await connection.query(query, [id_user]);

    res.json(data[0]);
  } catch (error) {
    res.status(500).send("Algo ha salido mal");
  }
};

module.exports = {
  getRecipeIdController,
};
