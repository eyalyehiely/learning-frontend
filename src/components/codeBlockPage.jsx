import React, { useState, useEffect, useRef } from 'react';
import { Container, Typography, Paper, TextField } from '@mui/material';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
import createSocket from '../functions/socketConfig'; 
import fetchCurrentCodeBlock from '../functions/codeBlocks/fetchCurrentCodeBlock';
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';

const CodeBlockPage = () => {
    const { id } = useParams();
    const [codeBlock, setCodeBlock] = useState({});
    const [code, setCode] = useState('');
    const [role, setRole] = useState('');
    const [socket, setSocket] = useState(null);
    const [isCorrect, setIsCorrect] = useState(false);
    const codeRef = useRef(null);

    useEffect(() => {
        fetchCurrentCodeBlock(id, setCodeBlock, setCode);
    }, [id]);

    useEffect(() => {
        const newSocket = createSocket(`/codeblock/${id}/`);
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
        if (codeRef.current) {
            hljs.highlightElement(codeRef.current);
        }
    }, [code]);

    const handleCodeChange = (e) => {
        setCode(e.target.value);
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({ type: 'codeChange', code: e.target.value }));
        }
    };

    const checkCode = () => {
        // Assuming you send the code to the backend for validation
        checkCode(id, code, setIsCorrect)
    };

    return (
        <Container style={{ height: '100vh', display: 'flex', flexDirection: 'column', marginLeft: '20vw' }}>
            <Typography variant="h4" gutterBottom>
                <Button className='btn btn-primary' href='/lobbyPage'>
                    Back
                    </Button>
                {codeBlock.id}. {codeBlock.title}
            </Typography>
            <Paper style={{ flexGrow: 1, marginTop: '16px', padding: '16px', overflow: 'auto' }}>
                {role === 'mentor' ? (
                    <pre>
                        <code ref={codeRef} className="language-javascript">
                            {code}
                        </code>
                    </pre>
                ) : (
                    <TextField
                        value={code}
                        onChange={handleCodeChange}
                        multiline
                        fullWidth
                        variant="outlined"
                        label="Edit Code"
                    />
                )}
                {isCorrect && <div style={{ fontSize: '3em', textAlign: 'center' }}>😊</div>}
                
                <Button className="btn btn-primary" onClick={checkCode}>Submit</Button>
            </Paper>
        </Container>
    );
};

export default CodeBlockPage;
