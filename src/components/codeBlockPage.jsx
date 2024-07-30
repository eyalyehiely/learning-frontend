import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper } from '@mui/material';
import Button from 'react-bootstrap/Button';
import { useParams} from 'react-router-dom';
import Editor from '@monaco-editor/react';
import createSocket from '../functions/socketConfig';
import fetchCurrentCodeBlock from '../functions/codeBlocks/fetchCurrentCodeBlock';
import checkCode from '../functions/codeBlocks/checkCode';
import editCodeBlock from '../functions/codeBlocks/editCodeBlock';
import swal from 'sweetalert';

const CodeBlockPage = () => {
    const { id } = useParams();
    const [codeBlock, setCodeBlock] = useState({});
    const [code, setCode] = useState('');
    const [originalCode, setOriginalCode] = useState('');
    const [role, setRole] = useState('');
    const [socket, setSocket] = useState(null);
    const [isCorrect, setIsCorrect] = useState(false);

    useEffect(() => {
        fetchCurrentCodeBlock(id, (block) => {
            setCodeBlock(block);
            setCode(block.code);
            setOriginalCode(block.code);
        });
    }, [id]);

    useEffect(() => {
        const newSocket = createSocket(`/ws/codeblock/${id}/`);
        setSocket(newSocket);

        newSocket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'code_update') {
                setCode(data.code);
            } else if (data.type === 'role') {
                setRole(data.role);
            }
        };

        return () => {
            newSocket.close();
        };
    }, [id]);

    useEffect(() => {
        if (isCorrect) {
            swal({
                title: '😊',
                icon: 'success',
                timer: 2000,
                button: false
            });
        }
    }, [isCorrect]);

    const handleCodeChange = (newValue) => {
        setCode(newValue);
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({ type: 'codeChange', code: newValue }));
        }

        // Send code update to backend
        editCodeBlock(id, newValue);
    };

    




    const handleCheckCode = () => {
        checkCode(id, code, setIsCorrect);
    };

    const handleResetCode = () => {
        setCode(originalCode);
    };

    return (
        <Container style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 16px' }}>
            <Button className='btn btn-primary' href='/lobbyPage'>
                Back
            </Button>
            <Typography variant="h4" gutterBottom style={{ textAlign: 'center', marginTop: '16px' }}>
                {codeBlock.id}. {codeBlock.title}
                <Typography variant="subtitle1">{codeBlock.instructions}</Typography>
            </Typography>
            <Paper style={{ flexGrow: 1, marginTop: '16px', padding: '16px', overflow: 'auto', width: '100%', maxWidth: '800px' }}>
                <Editor
                    height="50vh"
                    defaultLanguage="python"
                    value={code}
                    onChange={handleCodeChange}
                    options={{ theme: 'vs-dark', readOnly: role === 'mentor' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
                    <Button className="btn btn-primary" onClick={handleCheckCode}>Submit</Button>
                    <Button className="btn btn-secondary" onClick={handleResetCode}>Reset</Button>
                </div>
                <div style={{ fontSize: '3em', textAlign: 'center', marginTop: '16px' }}>
                    {/* {isCorrect ? '😊' : '😭'} */}
                </div>
            </Paper>
        </Container>
    );
};

export default CodeBlockPage;