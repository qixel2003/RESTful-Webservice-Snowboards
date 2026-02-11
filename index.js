import express from "express";
import mongoose from "mongoose";
import boardsRouter from "./routes/boards.js";
import authRouter from "./routes/auth.js";

try {
    const app = express();
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        next();
    });

    app.options("/boards", (req, res) => {
        res.header("Allow", "GET,POST,OPTIONS");
        res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
        res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
        res.header("Access-Control-Allow-Origin", "*");
        res.status(204).send();
    });

    app.options("/boards/:id", (req, res) => {
        res.header("Allow", "GET,PUT,DELETE,OPTIONS, PATCH");
        res.header("Access-Control-Allow-Methods", "GET,PUT,DELETE,OPTIONS, PATCH");
        res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
        res.header("Access-Control-Allow-Origin", "*");
        res.status(204).send();
    });

    await mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`, {
        serverSelectionTimeoutMS: 3000});

    //Middelware to support application/JSON content-type
    app.use(express.json());
    //Middelware to support application/x-www-form-urlencoded content-type
    app.use(express.urlencoded({ extended: true }));


    app.get("/", (req, res) => {});

    //Middelware
    app.use((req, res, next) => {
        if(req.header('Accept')!== 'application/json' && req.method !== 'OPTIONS'){
            res.status(406);
            res.json({error:'Illegal format'});
            return;
        }
        next();
    });

    app.use("/auth", authRouter);
    app.use("/boards", boardsRouter);


    app.listen(process.env.EXPRESS_PORT, () => {
        console.log(`Server is listening on port ${process.env.EXPRESS_PORT}`);
    });
} catch (e){
    console.log(e);
}