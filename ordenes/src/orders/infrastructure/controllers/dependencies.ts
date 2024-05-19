import { RegisterUseCase } from "../../application/registerUseCase";
import { ProductMysqlRepository } from "../ordersMysqlRepository";
import { RegisterController } from "./registerController";

import { ListAllOrderController } from "./listAllOrdersController";
import { ListAllOrdersUseCase } from "../../application/listAllOrdersUseCase";

import { UpdateUserController } from "./updateOrdersController";
import { UpdateProductUseCase } from "../../application/updateOrdersUseCase";

export const productMysqlRepository = new ProductMysqlRepository();

export const registerUseCase = new RegisterUseCase(productMysqlRepository);
export const registerController = new RegisterController(registerUseCase);

export const listAllProductCase = new ListAllOrdersUseCase(productMysqlRepository)
export const listAllProductController = new ListAllOrderController(listAllProductCase)

export const updateProductUseCase = new UpdateProductUseCase(productMysqlRepository)
export const updateProductController = new UpdateUserController(updateProductUseCase)







