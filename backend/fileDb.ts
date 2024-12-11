import {Message, MessageMutation} from "./types";
import {promises as fs} from 'fs';

const fileName = './db.json';
let data: MessageMutation[] = [];

const fileDb = {
    async init() {
        try {
            const fileContent = await fs.readFile(fileName)
            data = JSON.parse(fileContent.toString()) as MessageMutation[];
        } catch (e) {
            console.log(e)
        }
    },
    async getMessage() {
        return data.slice(-30).reverse();
    },
    async addMessage(item: Message) {
        const id = crypto.randomUUID().toString();
        const dateTime = new Date().toISOString();
        const message = {id, dateTime, ...item}
        data.push(message);
        await this.save();
        return message;
    },
    async save() {
        return fs.writeFile(fileName, JSON.stringify(data));
    }
}

export default fileDb;