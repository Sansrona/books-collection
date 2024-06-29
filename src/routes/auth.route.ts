import {Router} from "express";
import {globalBearerAuthMiddleware} from "../middlewares/bearer-auth.middleware";
import {
    AuthValidationMiddlewares,
    UsersValidationMiddlewares,
    UsersRoleValidationMiddlewares
} from "../middlewares/users-validation.middleware";
import {myContainer} from "../compositionRoots/root";
import {AuthController} from "../controllers/auth.controller";

export const authRouter = Router();

const authController = myContainer.get(AuthController);

authRouter.post('/login', AuthValidationMiddlewares, authController.login.bind(authController));
authRouter.post('/registration-confirmation', authController.registrationConfirmation.bind(authController));
authRouter.post('/register',UsersValidationMiddlewares, authController.registration.bind(authController))
authRouter.get('/me', globalBearerAuthMiddleware,
    authController.getMe.bind(authController) )
authRouter.put('/:userId/role', UsersRoleValidationMiddlewares,
    authController.updateUserRole.bind(authController))