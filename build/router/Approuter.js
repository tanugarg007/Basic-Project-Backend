"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Student_1 = require("../Controler/Student");
const SignUp_1 = require("../Controler/SignUp");
const Login_1 = require("../Controler/Login");
const router = express_1.default.Router();
router.post('/signup', SignUp_1.SignUp);
router.post('/login', Login_1.Login);
router.post('/students', Student_1.createStudent);
router.get('/students', Student_1.getAllStudent);
router.patch('/students/:id', Student_1.updateStudent);
router.delete('/students/:id', Student_1.deleteStudent);
exports.default = router;
//# sourceMappingURL=Approuter.js.map