import express from 'express'
import cors from 'cors'
import HelloController from "./controllers/hello-controller.js"
import UserController from "./users/users-controller.js"
import TuitsController from "./controllers/tuits/tuits-controller.js";
import session from "express-session";
import AuthController from "./users/auth-controller.js";
import mongoose from "mongoose";
import MongoDBStoreFactory from 'connect-mongodb-session';
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/tuiter'
mongoose.connect(CONNECTION_STRING);
//mongoose.connect("mongodb://127.0.0.1:27017/tuiter");

const MongoDBStore = MongoDBStoreFactory(session);
const app = express()

/*app.use(
    session({
        secret: "any string",
        resave: false,
        saveUninitialized: true,
        store: new MongoDBStore({
            uri: CONNECTION_STRING,
            collection: 'sessions'
        })
    })
);*/

//app.set(‘trust proxy’, 1)
app.use(
    session({
        secret: "any string",
        resave: false,
        saveUninitialized: true,
    })
);

/*app.use(
    session({
        secret: "any string",
        resave: false,
        saveUninitialized: true,
        cookie:{
            sameSite: "none",
            secure: true
        }
    })
);*/

/*app.use(
    session({
        secret: "any string",
        resave: false,
        proxy: true,
        saveUninitialized: false,
        store: new MongoDBStore({
            uri: CONNECTION_STRING,
            collection: 'sessions'
        }),
        cookie:{
            sameSite: "none",
            secure: true
        }
    })
);*/

app.use(cors({
        credentials: true,
        origin: ["http://localhost:3000","https://a5--strong-bombolone-81920a.netlify.app",
            "https://a6--luminous-pasca-264576.netlify.app"],
    })
)
app.use(express.json())

AuthController(app)
HelloController(app)
UserController(app)
TuitsController(app)
app.listen(process.env.PORT || 4000)