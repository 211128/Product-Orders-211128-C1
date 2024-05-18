import { Request, Response } from "express";
import { UpdateProductUseCase } from "../../application/updateOrdersUseCase";


export class UpdateUserController {
    constructor(readonly updateUserUseCase : UpdateProductUseCase) {}
    async run(req:Request, res:Response) {
        try {

            let {
                id,
                total,
                date,
                status
            } = req.body
        
            let UpdateUserById = await this.updateUserUseCase.run(id,total,date, status)

            if(UpdateUserById){
                return res.status(200).send({
                    status:"succes",
                    data:{
                        update_user: "order: " + "actualizada",
                    }
                })
            }else{
                return res.status(404).send({
                    status: "error",
                    message: "ordern not found or not updated."
                });
            }

        } catch (error) {
            return res.status(500).send({
                status: "error",
                message: "An error occurred while update user the user."
            });   
        }
    }
}
