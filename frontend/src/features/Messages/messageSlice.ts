import {createSlice} from "@reduxjs/toolkit";
import {Message} from "../../types";
import {createMessage, getMessage} from "./messageThunk.ts";
import {RootState} from "../../app/store.ts";

interface IMessageSlice {
    messages: Message[];
    createLoading: boolean;
    getLoading: boolean
}

const initialState: IMessageSlice = {
    messages: [],
    createLoading: false,
    getLoading: false,
}

export const allMessage = (state: RootState) => state.messages.messages;
export const isCreating = (state: RootState) => state.messages.createLoading;


const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createMessage.pending, (state) => {
                state.createLoading = true;
            })
            .addCase(createMessage.fulfilled, (state) => {
                state.createLoading = false;
            })
            .addCase(createMessage.rejected, (state) => {
                state.createLoading = false;
            })
            .addCase(getMessage.pending, (state) => {
                state.getLoading = true;
            })
            .addCase(getMessage.fulfilled, (state, {payload: messages}) => {
                state.getLoading = false;
                state.messages = messages;
            })
            .addCase(getMessage.rejected, (state) => {
                state.getLoading = false;
            });
    }
});

export const messagesReducer = messageSlice.reducer;