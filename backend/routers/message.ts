import express from 'express';
import { MessageWithoutId} from "../types";
import fileDb from "../fileDb";
import {imagesUpload} from "../multer";

export const messagesRouter = express.Router();


messagesRouter.get('/', async (req, res) => {
    const message = await fileDb.getMessage();
    res.send(message);
});

messagesRouter.post('/', imagesUpload.single('image'), async (req, res) => {
    if (!req.body.message) {
        res.status(400).send({error: "Please enter a message"});
        return;
    }

    const message: MessageWithoutId = {
        message: req.body.message,
        author: req.body.author ? req.body.author : null,
        image: req.file ? 'images' + req.file.filename : null,
    }

    const savedMessage = await fileDb.addMessage(message);
    res.send(savedMessage);
});

