const mysql = require("../database/mysql-pool");

const patchRecipeIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const query = "UPDATE recipes SET deleted_at = NOW() WHERE id_recipe = ?";

    const connection = await mysql.getConnection();
    await connection.query(query, [id]);

    res.send("Receta eliminada");
  } catch {
    res.send("Algo ha ido mal");
  }
};

module.exports = {
  patchRecipeIdController,
};
