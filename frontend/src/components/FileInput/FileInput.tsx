import {Button, TextField} from '@mui/material';
import {useEffect, useRef, useState} from 'react';

interface Props {
    name: string;
    label: string;
    onGetFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
    resetInput: string;
}

const FileInput: React.FC<Props> = ({name, label, onGetFile, resetInput}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [fileName, setFileName] = useState('');


    const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFileName(e.target.files[0].name);
        } else {
            setFileName('');
        }
        onGetFile(e);
    };

    useEffect(() => {
        setFileName('');
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    }, [resetInput]);

    const activateInput = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    return (
        <>
            <input
                style={{display: 'none'}}
                type="file"
                name={name}
                onChange={onFileChange}
                ref={inputRef}
            />
            <TextField
                disabled
                label={label}
                value={fileName}
                onClick={activateInput}
                sx={{width: "100%", marginBottom: "10px"}}
            />
            <Button variant="contained"
                    sx={{width: "100%", marginBottom: "10px"}}
                    color="secondary"
                    onClick={activateInput}
            >
                Browse
            </Button>
        </>
    );
};

export default FileInput;