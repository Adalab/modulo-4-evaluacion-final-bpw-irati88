API de Recetas – Módulo 4 (Evaluación Final)

Este proyecto es la evaluación final del Módulo 4 del bootcamp de Programación Web, donde desarrollamos una API REST usando Node.js, Express y MySQL para gestionar recetas de cocina.

La API permite crear, leer, actualizar y eliminar recetas, conectándose a una base de datos MySQL.

📌 TECNOLOGÍAS UTILIZADAS

⦁	Node.js
⦁	Express
⦁	MySQL + mysql2/promise
⦁	Dotenv (para variables de entorno)

🛠️ INSTALACIÓN Y PUESTA EN MARCHA

1.	Clonar el repositorio

git clone <url-del-repo>
cd nombre-del-repo

2. Instalar dependencias

npm install

3. Crear archivo .env

Debes incluir tus credenciales de MySQL:

USER_WORKBENCH=tuUsuario
PASSWORD_WORKBENCH=tuPassword

4. Crear la base de datos en MySQL

Ejecuta en MySQL Workbench:

CREATE DATABASE recipessapp;

USE recipessapp;

CREATE TABLE recipes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    ingredients VARCHAR(500),
    instructions LONGTEXT,
    deleted_at DATETIME
);

5. Arrancar el servidor

node src/index.js

El servidor se inicia en:
http://localhost:3000

📎ENDPOINTS DE LA API
⦁	Obtener todas las recetas
GET /recipes

⦁	Obtener una receta por ID
GET /recipe/:id

⦁	Crear una receta
POST /recipe

⦁	Actualizar una receta
PUT /recipe/:id

⦁	Eliminar una receta
PATCH /recipe/:id

VALIDACIONES
En cada endpoint el servidor comprueba que:

⦁	Los campos obligatorios llegan correctamente
⦁	Los tipos de datos son válidos
⦁	Si algo falla, se devuelve un 400 Bad Request.

NOTAS:

Este proyecto se prueba con Postman, no incluye frontend.
