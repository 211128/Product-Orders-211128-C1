import { Response } from "express";
import express from 'express';

import { ListAllProductUseCase } from "../../application/listAllUserUseCase";

export class ListAllUserController {
    constructor(readonly listAllUserUseCase: ListAllProductUseCase) {}

    async run(req: express.Request, res: express.Response) {
        try {
            const listAllUser = await this.listAllUserUseCase.run();

            if (listAllUser) {
                console.log("Respuesta exitosa:", ); // Imprimir respuesta exitosa en la consola

                return res.status(200).send({
                    status: "success",
                    data: {
                        listAllUser: listAllUser,
                    },
                });
            } else {
                console.log("No se encontraron usuarios:", ); // Imprimir falta de usuarios en la consola

                return res.status(404).send({
                    status: "error",
                    message: "No se encontraron usuarios.",
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
