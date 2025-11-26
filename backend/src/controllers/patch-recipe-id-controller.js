const mysql = require("../database/mysql-pool");

const patchRecipeIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_user } = req.user;

    const query =
      "UPDATE recipes SET deleted_at = NOW() WHERE id_recipe = ? AND fk_user = ? ";

    const connection = await mysql.getConnection();
    await connection.query(query, [id, id_user]);

    res.send("Receta eliminada");
  } catch (error) {
    res.status(400).send("Algo ha salido mal");
  }
};

module.exports = {
  patchRecipeIdController,
};
