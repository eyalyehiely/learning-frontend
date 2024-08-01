import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Container, Typography, Paper } from '@mui/material';
import Button from 'react-bootstrap/Button';
import Editor from '@monaco-editor/react';
import createSocket from '../functions/config/socketConfig';
import checkCode from '../functions/codeBlocks/checkCode';
import editSubmissionCodeBlock from '../functions/submissions/editSubmissionCodeBlock';
import swal from 'sweetalert';
import fetchSubmissionToCreate from '../functions/submissions/fetchSubmissionToCreate';
import Cookies from 'js-cookie';
import logVisitor from '../functions/logVisitor';
import fetchCurrentSubmission from '../functions/submissions/fetchCurrentSubmission';
import fetchCodeBlockData from '../functions/codeBlocks/fetchCodeBlockData';

const CodeBlockPage = () => {
    const { id } = useParams();
    const [submissionCodeBlock, setSubmissionCodeBlock] = useState({});
    const [submissionCode, setSubmissionCode] = useState('');
    const [role, setRole] = useState('');
    const [originalCode, setOriginalCode] = useState('');
    const [socket, setSocket] = useState(null);
    const [isCorrect, setIsCorrect] = useState(false);
    const [isCodeChanging, setIsCodeChanging] = useState(false);

    useEffect(() => {
        const userId = Cookies.get('clientUUID');
        fetchSubmissionToCreate(id, userId);
        fetchCurrentSubmission(id, setSubmissionCodeBlock, setSubmissionCode);
        fetchCodeBlockData(id, setOriginalCode);
    }, [id]);

    useEffect(() => {
        const url = window.location.href;
        logVisitor(url);
    }, []);

    useEffect(() => {
        const newSocket = createSocket(`/ws/codeblock/${id}/`);
        setSocket(newSocket);

        newSocket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'code_update') {
                setSubmissionCode(data.code);
            } else if (data.type === 'role_assignment') {
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
        if (role === 'student') {
            setSubmissionCode(newValue);
            if (socket && socket.readyState === WebSocket.OPEN) {
                socket.send(JSON.stringify({ type: 'codeChange', code: newValue }));
            }

            // Send code update to backend
            editSubmissionCodeBlock(id, newValue);
        }
    };

    const handleCheckCode = () => {
        checkCode(id, submissionCode, setIsCorrect);
    };

    return (
        <Container 
            style={{ 
                height: '100vh', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                padding: '0 16px' 
            }}
        >
            <Typography 
                variant="h4" 
                component="h1" 
                style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    textAlign: 'center',
                    width: '100%',
                    padding: '16px',
                    boxSizing: 'border-box'
                }}
            >
                {originalCode.id}. {originalCode.title}
            </Typography>
            <Typography 
                variant="subtitle1" 
                style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    textAlign: 'center',
                    width: '100%',
                    padding: '8px'
                }}
            >
                {originalCode.instructions}
            </Typography>
            <Paper 
                style={{ 
                    height: '80vh', 
                    width: '60vw', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    padding: '16px' 
                }}
            >
                <Editor
                    height="60vh"
                    defaultLanguage="python"
                    value={submissionCode}
                    onChange={handleCodeChange}
                    options={{ theme: 'vs-dark', readOnly: role !== 'student' }}
                />
                {role === 'teacher' && isCodeChanging && (
                    <Typography variant="subtitle1" color="secondary" style={{ marginTop: '16px' }}>
                        Code is changing...
                    </Typography>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
                    {role === 'student' && (
                        <>
                            <Button className="btn btn-primary" onClick={handleCheckCode}>Submit</Button>
                        </>
                    )}
                    <Button variant="btn btn-secondary">
                        <Link className="font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 no-underline" to="/">Back</Link>
                    </Button>
                </div>
                <div style={{ fontSize: '3em', textAlign: 'center', marginTop: '16px' }}></div>
            </Paper>
        </Container>
    );
};

export default CodeBlockPage;