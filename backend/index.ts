import express = require("express");

import fs = require("fs");
import fileDb from "./fileDb";
import cors from "cors";
import {messagesRouter} from "./routers/message";

const app = express();
const port = 8000;


app.use(cors())
app.use(express.json());
app.use(express.static('public'));
app.use("/messages", messagesRouter);

const run = async () => {
    if (fs.existsSync('./db.json')) {
        await fileDb.init();
    } else {
        fs.writeFileSync('./db.json', JSON.stringify([]));
    }

    app.listen(port, () => {
        console.log(`Server started on port http://localhost:${port}`);
    });
}

run().catch(err => console.log(err));