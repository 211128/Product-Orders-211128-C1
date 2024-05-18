import { Response } from "express";
import express from 'express';

import { ListAllOrdersUseCase } from "../../application/listAllOrdersUseCase";

export class ListAllOrderController {
    constructor(readonly listAllOrderUseCase: ListAllOrdersUseCase) {}

    async run(req: express.Request, res: express.Response) {
        try {
            const listAllUser = await this.listAllOrderUseCase.run();

            if (listAllUser) {
                console.log("Respuesta exitosa:", ); // Imprimir respuesta exitosa en la consola

                return res.status(200).send({
                    status: "success",
                    data: {
                        listAllUser: listAllUser,
                    },
                });
            } else {
                console.log("No se encontraron ordenes:", ); // Imprimir falta de usuarios en la consola

                return res.status(404).send({
                    status: "error",
                    message: "No se encontraron ordenes.",
                });
            }
        } catch (error) {
            console.error("Error al procesar la solicitud:", error); // Registrar el error en la consola
            return res.status(500).send({
                status: "error",
                message: "Se produjo un error en el servidor.",
            });
        }
    }
}
