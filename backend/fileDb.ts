import {Message, MessageWithoutId} from "./types";
import {promises as fs} from 'fs';

const fileName = './db.json';
let data: Message[] = [];

const fileDb = {
    async init() {
        try {
            const fileContent = await fs.readFile(fileName)
            data = JSON.parse(fileContent.toString()) as Message[];
        } catch (e) {
            console.log(e)
        }
    },
    async getMessage() {
        return data;
    },
    async addMessage(item: MessageWithoutId) {
        const id = crypto.randomUUID();
        const message = {id, ...item}
        data.push(message);
        await this.save();
        return message;
    },
    async save() {
        return fs.writeFile(fileName, JSON.stringify(data));
    }
}

export default fileDb;