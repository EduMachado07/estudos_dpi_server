import express, { NextFunction, Request, Response } from "express";
import { upload } from "./providers/MulterConfig";
import { registerUserController } from "./useCases/(User)/RegisterUser";
import { loginUserController } from "./useCases/(Auth)/LoginUser";
import { createStudyController } from "./useCases/(Study)/CreateStudy";
import {
  getStudyByIdController,
  getStudyController,
} from "./useCases/(Study)/GetStudy";
import { deleteStudyController } from "./useCases/(Study)/DeleteStudy";
import { updateStudyController } from "./useCases/(Study)/UpdateStudy";
import { authAuthorMiddleware } from "./useCases/(Auth)/AuthAuthor";
import { refreshTokenController } from "./useCases/(Auth)/RefreshToken";
import { getStudiesAuthorController } from "./useCases/(Study)/GetStudiesAuthor";
import { logoutUserController } from "./useCases/(Auth)/LogoutUser";
import { formatterBodyController } from "./useCases/(Study)/FormatterBody";

const router = express.Router();

router.post("/register", (req: Request, res: Response, next: NextFunction) => {
  return registerUserController.handle(req, res, next);
});
router.post("/login", (req: Request, res: Response, next: NextFunction) => {
  return loginUserController.handle(req, res, next);
});
router.post("/logout", (req: Request, res: Response, next: NextFunction) => {
  return logoutUserController.handle(req, res, next);
});
router.post("/refresh", (req: Request, res: Response) => {
  return refreshTokenController.handle(req, res);
});
// get all studies
// ?offset&limit
router.get("/study", (req: Request, res: Response, next: NextFunction) => {
  return getStudyController.handle(req, res, next);
});
router.get(
  "/study/:user/:slug",
  (req: Request, res: Response, next: NextFunction) => {
    return getStudyByIdController.handle(req, res, next);
  }
);
router.get(
  "/study/author",
  authAuthorMiddleware.handle,
  (req: Request, res: Response, next: NextFunction) => {
    return getStudiesAuthorController.handle(req, res, next);
  }
);
router.post(
  "/study",
  upload.single("thumbnail"),
  authAuthorMiddleware.handle,
  (req: Request, res: Response, next: NextFunction) => {
    return createStudyController.handle(req, res, next);
  }
);
router.delete(
  "/study/:id",
  authAuthorMiddleware.handle,
  (req: Request, res: Response, next: NextFunction) => {
    return deleteStudyController.handle(req, res, next);
  }
);
router.patch(
  "/study/:id",
  upload.single("thumbnail"),
  authAuthorMiddleware.handle,
  (req: Request, res: Response, next: NextFunction) => {
    return updateStudyController.handle(req, res, next);
  }
);
router.post(
  "/study/formatter",
  authAuthorMiddleware.handle,
  (req: Request, res: Response, next: NextFunction) => {
    return formatterBodyController.handle(req, res, next);
  }
);

export { router };
