import express, { NextFunction, Request, Response } from "express";
const app = express();

//parser
app.use(express.json());
app.use(express.text());

//router
const userRouter = express.Router();
app.use("/api/v1/users", userRouter);

const courseRouter = express.Router();
app.use("/api/v1/courses", courseRouter);

//route
courseRouter.post("/create-course", (req: Request, res: Response) => {
  const course = req.body;
  console.log(course);
  res.json({
    success: true,
    message: "course fetched successfully",
    data: course,
  });
});

userRouter.get("/create-user", (req: Request, res: Response) => {
  const user = req.body;
  console.log(user);
  res.json({
    success: true,
    message: "User fetched successfully",
    data: user,
  });
});

//middleware

const logger = (req: Request, res: Response, next: Function) => {
  console.log(req.method, req.url, req.hostname);
  next();
};

app.get(
  "/",
  logger,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.send(Something);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

app.post("/", (req: Request, res: Response) => {
  console.log(req.body);
});

//unknown route

app.all("*", (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    data: null,
  });
});

//global error handler
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      data: error,
    });
  }
});

export default app;
