import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, TextField } from '@mui/material';
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

    useEffect(() => {
        fetchCurrentCodeBlock(id, setCodeBlock, setCode);
    }, [id]);

    useEffect(() => {
        const newSocket = createSocket(`/codeblock/${id}/`);
        setSocket(newSocket);

        newSocket.on('code_update', (data) => {
            setCode(data.code);
        });

        newSocket.on('role', (data) => {
            setRole(data.role);
        });

        return () => {
            newSocket.close();
        };
    }, [id]);

    useEffect(() => {
        hljs.highlightAll();
    }, [code]);

    const handleCodeChange = (e) => {
        setCode(e.target.value);
        if (socket) {
            socket.emit('codeChange', { code: e.target.value });
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                {codeBlock.title}
            </Typography>
            {role === 'mentor' ? (
                <Paper>
                    <pre>
                        <code className="language-javascript">
                            {code}
                        </code>
                    </pre>
                </Paper>
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
        </Container>
    );
};

export default CodeBlockPage;
