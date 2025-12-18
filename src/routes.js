"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const MulterConfig_1 = require("./providers/MulterConfig");
const RegisterUser_1 = require("./useCases/(User)/RegisterUser");
const LoginUser_1 = require("./useCases/(Auth)/LoginUser");
const CreateStudy_1 = require("./useCases/(Study)/CreateStudy");
const GetStudy_1 = require("./useCases/(Study)/GetStudy");
const DeleteStudy_1 = require("./useCases/(Study)/DeleteStudy");
const UpdateStudy_1 = require("./useCases/(Study)/UpdateStudy");
const AuthAuthor_1 = require("./useCases/(Auth)/AuthAuthor");
const RefreshToken_1 = require("./useCases/(Auth)/RefreshToken");
const GetStudiesAuthor_1 = require("./useCases/(Study)/GetStudiesAuthor");
const LogoutUser_1 = require("./useCases/(Auth)/LogoutUser");
const FormatterBody_1 = require("./useCases/(Study)/FormatterBody");
const router = express_1.default.Router();
exports.router = router;
router.post("/register", (req, res, next) => {
    return RegisterUser_1.registerUserController.handle(req, res, next);
});
router.post("/login", (req, res, next) => {
    return LoginUser_1.loginUserController.handle(req, res, next);
});
router.post("/logout", (req, res, next) => {
    return LogoutUser_1.logoutUserController.handle(req, res, next);
});
router.post("/refresh", (req, res) => {
    return RefreshToken_1.refreshTokenController.handle(req, res);
});
// get all studies
// ?offset&limit
router.get("/study", (req, res, next) => {
    return GetStudy_1.getStudyController.handle(req, res, next);
});
router.get("/study/:user/:slug", (req, res, next) => {
    return GetStudy_1.getStudyByIdController.handle(req, res, next);
});
router.get("/study/author", AuthAuthor_1.authAuthorMiddleware.handle, (req, res, next) => {
    return GetStudiesAuthor_1.getStudiesAuthorController.handle(req, res, next);
});
router.post("/study", MulterConfig_1.upload.single("thumbnail"), AuthAuthor_1.authAuthorMiddleware.handle, (req, res, next) => {
    return CreateStudy_1.createStudyController.handle(req, res, next);
});
router.delete("/study/:id", AuthAuthor_1.authAuthorMiddleware.handle, (req, res, next) => {
    return DeleteStudy_1.deleteStudyController.handle(req, res, next);
});
router.patch("/study/:id", MulterConfig_1.upload.single("thumbnail"), AuthAuthor_1.authAuthorMiddleware.handle, (req, res, next) => {
    return UpdateStudy_1.updateStudyController.handle(req, res, next);
});
router.post("/study/formatter", AuthAuthor_1.authAuthorMiddleware.handle, (req, res, next) => {
    return FormatterBody_1.formatterBodyController.handle(req, res, next);
});
