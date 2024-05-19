import { Request, Response } from "express";
import { UpdateProductUseCase } from "../../application/updateOrdersUseCase";

export class UpdateUserController {
    constructor(readonly updateOrderUseCase: UpdateProductUseCase) {}

    async run(req: Request, res: Response) {
        try {
            let { id, status } = req.body;

            // Verificar si el estado a actualizar es igual al estado actual
            const order = await this.updateOrderUseCase.run(id, status);
            if (order && order.status === status) {
                return res.status(400).json({
                    status: "error",
                    message: "El estado de la orden ya es el mismo que se está tratando de actualizar.",
                });
            }

            let updateUserById = await this.updateOrderUseCase.run(id,status);

            if (updateUserById) {
                return res.status(200).send({
                    status: "success",
                    data: {
                        update_order: "Order " + id + " actualizada",
                    },
                });
            } else {
                return res.status(404).send({
                    status: "error",
                    message: "Orden no encontrada o no actualizada.",
                });
            }
        } catch (error) {
            console.error("Error al actualizar la orden:", error);
            return res.status(500).send({
                status: "error",
                message: "Ocurrió un error al actualizar la orden.",
            });
        }
    }
}
