import { Request, Response } from "express"
import { RegisterUseCase } from "../../application/registerUseCase";

export class RegisterController {
  constructor(readonly registerUseCase: RegisterUseCase) {}

  async run(req: Request, res: Response) {
    try {
      const {
        total,
        date,
        status
     
      } = req.body;


  

      const registerProduct = await this.registerUseCase.run(
        total,
        date,
        status
      );

      if (registerProduct) {
        return res.status(201).json({
          status: "success",
          data: {
            name: registerProduct.total,
            price: registerProduct.date,
          },
        });
      } else {
        // Manejar el caso donde el registro no fue exitoso
        return res.status(400).json({
          status: "error",
          message: "El registro de usuario no fue exitoso.",
        });
      }
    } catch (err) {
      console.error("Error al registrar usuario:", err);
      return res.status(500).json({
        status: "error",
        message: "Error interno del servidor",
      });
    }
  }
}
