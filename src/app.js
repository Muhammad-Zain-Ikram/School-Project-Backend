import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import helmet from "helmet";

const app = express()
app.use(cors({
  origin: process.env.CORS_ORIGIN || ["http://localhost:5173", "http://192.168.1.5:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"], 
  credentials: true, 
}));

app.options('*', cors());

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
