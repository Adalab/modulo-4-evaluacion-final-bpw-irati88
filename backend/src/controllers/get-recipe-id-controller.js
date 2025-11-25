const mysql = require("../database/mysql-pool");

const getRecipeIdController =
async (req, res) => {
  try {
    const { id } = req.params;

    // Validamos que la ID escogida sea correcta
    if (isNaN(Number(id))) {
      return res.status(400).send("ID inválido");
    }

    const query =
      "SELECT * FROM recipes WHERE id_recipe = ? AND deleted_at IS NULL";

    const connection = await mysql.getConnection();
    const data = await connection.query(query, [id]);

    res.json(data[0]);
  } catch {
    res.send("Algo ha ido mal");
  }
};

module.exports = {
  getRecipeIdController,
}