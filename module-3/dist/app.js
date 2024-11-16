"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
//parser
app.use(express_1.default.json());
app.use(express_1.default.text());
//router
const userRouter = express_1.default.Router();
app.use("/api/v1/users", userRouter);
const courseRouter = express_1.default.Router();
app.use("/api/v1/courses", courseRouter);
//route
courseRouter.post("/create-course", (req, res) => {
    const course = req.body;
    console.log(course);
    res.json({
        success: true,
        message: "course fetched successfully",
        data: course,
    });
});
userRouter.get("/create-user", (req, res) => {
    const user = req.body;
    console.log(user);
    res.json({
        success: true,
        message: "User fetched successfully",
        data: user,
    });
});
//middleware
const logger = (req, res, next) => {
    console.log(req.method, req.url, req.hostname);
    next();
};
app.get("/", logger, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send(Something);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
}));
app.post("/", (req, res) => {
    console.log(req.body);
});
//unknown route
app.all("*", (req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
        data: null,
    });
});
//global error handler
app.use((error, req, res, next) => {
    if (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            data: error,
        });
    }
});
exports.default = app;
