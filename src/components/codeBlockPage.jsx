import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper } from '@mui/material';
import Button from 'react-bootstrap/Button';
import { useParams} from 'react-router-dom';
import Editor from '@monaco-editor/react';
import createSocket from '../functions/socketConfig';
import fetchCurrentCodeBlock from '../functions/codeBlocks/fetchCurrentCodeBlock';
import checkCode from '../functions/codeBlocks/checkCode';
import swal from 'sweetalert';

const CodeBlockPage = () => {
    const { id } = useParams();
    const [codeBlock, setCodeBlock] = useState({});
    const [code, setCode] = useState('');
    const [role, setRole] = useState('');
    const [socket, setSocket] = useState(null);
    const [isCorrect, setIsCorrect] = useState(false);

    useEffect(() => {
        fetchCurrentCodeBlock(id, setCodeBlock, setCode);
    }, [id]);

    useEffect(() => {
        const newSocket = createSocket(`/ws/codeblock/${id}/`);
        setSocket(newSocket);

        newSocket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'code_update') {
                setCode(data.code);
                setIsCorrect(data.is_correct);
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
                title: 'Good Job',
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
    };

    const handleCheckCode = () => {
        checkCode(id, code, setIsCorrect)
            .catch((error) => {
                console.error('Error checking code:', error);
                swal({
                    title: 'Error',
                    text: 'An error occurred while checking the code.',
                    icon: 'error',
                    button: true
                });
            });
    };

    return (
        <Container style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Button className='btn btn-primary' href = '/lobbyPage'>
                Back
            </Button>
            <Typography variant="h4" gutterBottom>
                {codeBlock.id}. {codeBlock.title}
                <h6>{codeBlock.instructions}</h6>
            </Typography>
            <Paper style={{ flexGrow: 1, marginTop: '16px', padding: '16px', overflow: 'auto', width: '100%', maxWidth: '800px' }}>
                <Editor
                    height="400px"
                    defaultLanguage="python"
                    value={code}
                    onChange={handleCodeChange}
                    options={{ theme: 'vs-dark', readOnly: role === 'mentor' }}
                />
                <Button className="btn btn-primary" onClick={handleCheckCode} style={{ marginTop: '16px' }}>Submit</Button>
                <div style={{ fontSize: '3em', textAlign: 'center', marginTop: '16px' }}>
                    {/* {isCorrect ? '😊' : '😭'} */}
                </div>
            </Paper>
        </Container>
    );
};

export default CodeBlockPage;