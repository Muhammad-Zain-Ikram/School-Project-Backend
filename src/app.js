import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import helmet from "helmet";

const app = express()
const corsOrigin = process.env.CORS_ORIGIN || "https://school-project-backend-wheat.vercel.app";

app.use(
  cors({
    origin: corsOrigin,
    credentials: true,
  })
);
console.log("CORS Origin:", corsOrigin);
app.options('*', cors());
app.get("/", (req, res) => {
  console.log("Root route accessed");
  res.send("Server is working!");
});

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        },
      }
    })
  );
  app.use(helmet.xssFilter({ setOnOldIE: true }));
  app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
  }))
  app.use(express.json({limit : "16kb"}))
  app.use(express.static("public"))
  app.use(cookieParser())
  
  // routes Import
  import userRouter  from "./routes/user.router.js";
  import dataRouter from "./routes/data.router.js"


  // routes declaration
  app.use("/portal", userRouter)
  app.use("/api",dataRouter)
  


  
  
  
  





export { app }
