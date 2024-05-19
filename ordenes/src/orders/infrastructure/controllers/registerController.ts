import { Request, Response } from "express";
import { RegisterUseCase } from "../../application/registerUseCase";

export class RegisterController {
  constructor(readonly registerUseCase: RegisterUseCase) {}

  async run(req: Request, res: Response) {
    try {
      const { total, status } = req.body;

      const statusLower = status.toLowerCase();


      // Validar que el estado sea uno de los valores permitidos
      if (!['creado', 'pagado', 'enviado'].includes(statusLower)) {
        return res.status(400).json({
          status: "error",
          message: 'El estado debe ser "creado", "pagado" o "enviado"',
        });
      }

      const registerProduct = await this.registerUseCase.run(
        total,
        status
      );

      if (registerProduct) {
        return res.status(201).json({
          status: "success",
          data: {
            total: registerProduct.total,
            status: registerProduct.status,
          },
        });
      } else {
        
        return res.status(200).json({
          status: "success",
          message: "El registro de la orden fue exitosa.",
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
