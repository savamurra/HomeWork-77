import {createAsyncThunk} from "@reduxjs/toolkit";
import {Message, MessageMutation} from "../../types";
import axiosAPI from "../../axiosAPI.ts";

export const createMessage = createAsyncThunk<void, MessageMutation>("message/createMessage", async (message) => {
    const formData = new FormData();

    const keys = Object.keys(message) as (keyof MessageMutation)[];

    keys.forEach((key) => {
        const value = message[key];

        if (value !== null) {
            formData.append(key, value);
        }
    });

    await axiosAPI.post("/messages", formData);
});

export const getMessage = createAsyncThunk<Message[], void>(
    'message/getMessage', async () => {
        const messageResponse = await axiosAPI<Message[]>("/messages");
        return messageResponse.data || [];
    }
);