import { Request, Response } from "express";
import { UpdateProductUseCase } from "../../application/updateUserUseCase";


export class UpdateUserController {
    constructor(readonly updateUserUseCase : UpdateProductUseCase) {}
    async run(req:Request, res:Response) {
        try {

            let {
                id,
                name,
                stock,
            } = req.body
        
            let UpdateUserById = await this.updateUserUseCase.run(id,name,stock)

            if(UpdateUserById){
                return res.status(200).send({
                    status:"succes",
                    data:{
                        update_user: "usuario: " + name + "actualizado",
                    }
                })
            }else{
                return res.status(404).send({
                    status: "error",
                    message: "User not found or not updated."
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
