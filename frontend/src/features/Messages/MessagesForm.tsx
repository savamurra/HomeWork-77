import {useEffect, useState} from 'react';
import * as React from 'react';
import {Box, Button, Card, CardActions, CardContent, CardMedia, TextField, Typography} from '@mui/material';
import { MessageMutation} from "../../types";
import {createMessage, getMessage} from "./messageThunk.ts";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {allMessage, isCreating} from "./messageSlice.ts";
import FileInput from "../../components/FileInput/FileInput.tsx";
import {apiUrl} from "../../globalConstants.ts";


const initialState = {
    message: "",
    author: "",
    image: null,
}
const ProductForm = () => {
    const [form, setForm] = useState<MessageMutation>(initialState);
    const [clearInput, setClearInput] = useState<string>("");
    const dispatch = useAppDispatch();
    const createLoading = useAppSelector(isCreating);

    const messages = useAppSelector(allMessage);
    useEffect(() => {
        dispatch(getMessage());
    }, [dispatch]);
    

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setForm({...form, [name]: value});
    };


    const fileEventChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, files} = e.target;

        if (files) {
            setForm(prevState => ({
                ...prevState,
                [name]: files[0] ? files[0] : null,
            }))
        }
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (form.message.trim().length === 0) {
            alert('Вы не заполнили поля');
        } else {
            await dispatch(createMessage(form));
            setForm(initialState);
            setClearInput(String(Date.now()));
            await dispatch(getMessage());
        }
    };


    return (
        <form onSubmit={onSubmit}>
            <Box
                sx={{
                    flexGrow: 1,
                    maxWidth: 600,
                    margin: "auto",
                    border: "3px solid DarkViolet",
                    padding: "10px",
                    borderRadius: "8px",
                    backgroundColor: "#f9f9f9",
                }}
            >
                <Box
                    sx={{
                        maxHeight: 400,
                        overflowY: "auto",
                        marginBottom: "15px",
                        padding: "10px",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        backgroundColor: "#fff",
                    }}
                >
                    {messages.length === 0 ? (
                        <Typography variant="h5" sx={{textAlign: "center"}}>No messages yet</Typography>
                    ) : (
                        messages.map((message) => {
                            const messageImage = apiUrl + "/" + message.image
                            return (
                                <Card
                                    key={message.id}
                                    sx={{
                                        marginBottom: "10px",
                                        boxShadow: 2,
                                        borderRadius: "8px",
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <CardContent sx={{ width: 300 }}>
                                        <Typography gutterBottom sx={{fontSize: 20}}>
                                            {message.author ? <strong>Author: {message.author}</strong> : "Anonymous"}
                                        </Typography>
                                        <Typography gutterBottom sx={{fontSize: 18}}>
                                            Message: {message.message}
                                        </Typography>
                                    </CardContent>
                                    {message.image && (
                                        <CardActions>
                                            <CardMedia
                                                style={{width: '40%', marginLeft: 100}}
                                                component="img"
                                                image={messageImage}
                                                title={message.message}
                                            />
                                        </CardActions>
                                    )}
                                </Card>
                            );
                        })
                    )}
                </Box>
                <TextField
                    sx={{width: "100%", marginBottom: "10px"}}
                    id="message"
                    label="Message"
                    name="message"
                    value={form.message}
                    variant="outlined"
                    onChange={inputHandler}
                    required
                />
                <TextField
                    sx={{width: "100%", marginBottom: "10px"}}
                    id="author"
                    label="Author"
                    name="author"
                    value={form.author}
                    variant="outlined"
                    onChange={inputHandler}
                />
                <FileInput  name="image" label="Image" onGetFile={fileEventChangeHandler} resetInput={clearInput}/>
                <Button
                    color="secondary"
                    type="submit"
                    variant="contained"
                    sx={{width: "100%"}}
                    disabled={createLoading}
                >
                    Send
                </Button>
            </Box>

        </form>
    );
};

export default ProductForm;