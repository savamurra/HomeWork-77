import express from 'express';
import {Message} from "../types";
import fileDb from "../fileDb";

export const messagesRouter = express.Router();


messagesRouter.get('/', async (req, res) => {
    const dateQuery = req.query.datetime as string

    if (!dateQuery) {
        const messages = await fileDb.getMessage();
        res.send(messages);
    } else {
        const queryDate = new Date(dateQuery);
        if (isNaN(queryDate.getTime())) {
            res.status(400).send({error: "Invalid date format for date format"});
        } else {
            const messages = (await fileDb.getMessage()).filter(message => new Date(message.dateTime) > queryDate);
            if (messages.length > 0) {
                res.send(messages);
            } else {
                res.send([]);
            }
        }
    }
});

messagesRouter.post('/', async (req, res) => {
    const message: Message = {
        message: req.body.message,
        author: req.body.author,
    }

    if (req.body.message.length === 0 || req.body.author.length === 0) {
        res.status(400).send({error: 'Author and message must be present in the request.'});
    } else {
        res.send(await fileDb.addMessage(message));
    }
});

