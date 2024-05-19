import express from "express";
import { registerController } from "./controllers/dependencies";
import { listAllProductController } from "./controllers/dependencies";
import { updateProductController } from "./controllers/dependencies";

export const orderRouter = express.Router();

// Ruta para registrar un usuario
orderRouter.post("/", registerController.run.bind(registerController));

// Ruta para obtener todos los usuarios
orderRouter.get("/", (req, res) => listAllProductController.run(req, res));

// Ruta para actualizar un usuario por su ID
orderRouter.put("/", updateProductController.run.bind(updateProductController));