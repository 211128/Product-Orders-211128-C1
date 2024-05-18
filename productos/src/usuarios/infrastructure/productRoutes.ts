import express from "express";
import { registerController } from "./controllers/dependencies";
import { listAllProductController } from "./controllers/dependencies";
import { deleteProductByIdController } from "./controllers/dependencies";
import { updateProductController } from "./controllers/dependencies";

export const productRouter = express.Router();

// Ruta para registrar un usuario
productRouter.post("/", registerController.run.bind(registerController));

// Ruta para obtener todos los usuarios
productRouter.get("/", (req, res) => listAllProductController.run(req, res));

// Ruta para eliminar un usuario por su ID
productRouter.delete("/", deleteProductByIdController.run.bind(deleteProductByIdController));

// Ruta para actualizar un usuario por su ID
productRouter.put("/buy", updateProductController.run.bind(updateProductController));