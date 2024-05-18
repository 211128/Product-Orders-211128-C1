import { RegisterUseCase } from "../../application/registerUseCase";
import { ProductMysqlRepository } from "../productMysqlRepository";
import { RegisterController } from "./registerController";

import { ListAllUserController } from "./listAllUsersController";
import { ListAllProductUseCase } from "../../application/listAllUserUseCase";

import { DeleteUserController } from "./deleteUserByIdController";
import { DeleteProductUseCase } from "../../application/deleteUserById";

import { UpdateUserController } from "./updateUserController";
import { UpdateProductUseCase } from "../../application/updateUserUseCase";

export const productMysqlRepository = new ProductMysqlRepository();

export const registerUseCase = new RegisterUseCase(productMysqlRepository);
export const registerController = new RegisterController(registerUseCase);

export const listAllProductCase = new ListAllProductUseCase(productMysqlRepository)
export const listAllProductController = new ListAllUserController(listAllProductCase)

export const deleteProductUseCase = new DeleteProductUseCase(productMysqlRepository)
export const deleteProductByIdController = new DeleteUserController(deleteProductUseCase)

export const updateProductUseCase = new UpdateProductUseCase(productMysqlRepository)
export const updateProductController = new UpdateUserController(updateProductUseCase)







