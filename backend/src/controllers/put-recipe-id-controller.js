const mysql = require("../database/mysql-pool");

const putRecipeIdController = async (req, res) => {
  try {
    const { id_user } = req.params;
    const { name, ingredients, instructions } = req.body;

    // Tengo que validar que los campos sean correctos
    if (isNaN(Number(id_user))) {
      return res.status(400).send("ID inválido");
    }

    if (!name || !ingredients || !instructions) {
      return res.status(400).send("Faltan campos obligatorios");
    }

    if (
      typeof name !== "string" ||
      typeof ingredients !== "string" ||
      typeof instructions !== "string"
    ) {
      return "Los campos deben ser texto";
    }

    const query =
      "UPDATE recipes SET name = ?, ingredients = ?, instructions = ? WHERE id_recipe = ?";

    const connection = await mysql.getConnection();
    await connection.query(query, [name, ingredients, instructions, id_user]);

    res.send("Receta actualizada");
  } catch (error) {
    res.status(500).send("Algo ha salido mal");
  }
};

module.exports = {
  putRecipeIdController,
};
