const { postSignupController } = require("./post-signup-controller");
const { postLoginController } = require("./post-login-controller");
const { getRecipesController } = require("./get-recipes-controller");
const { getRecipeIdController } = require("./get-recipe-id-controller");
const { postRecipeController } = require("./post-recipe-controller");
const { putRecipeIdController } = require("./put-recipe-id-controller");
const { patchRecipeIdController } = require("./patch-recipe-id-controller");

module.exports = {
  postSignupController,
  postLoginController,
  getRecipesController,
  getRecipeIdController,
  postRecipeController,
  putRecipeIdController,
  patchRecipeIdController,
};
