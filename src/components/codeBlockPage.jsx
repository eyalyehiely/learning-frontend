import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Paper } from '@mui/material';
import Button from 'react-bootstrap/Button';
import { useParams} from 'react-router-dom';
import Editor from '@monaco-editor/react';
import createSocket from '../functions/config/socketConfig';
import fetchCurrentSubmission from '../functions/submissions/fetchCurrentSubmission';
import checkCode from '../functions/codeBlocks/checkCode';
import editSubmissionCodeBlock from '../functions/submissions/editSubmissionCodeBlock';
import swal from 'sweetalert';

const CodeBlockPage = () => {
    const { id } = useParams();
    const [submissionCodeBlock, setSubmissionCodeBlock] = useState({});
    const [code, setSubmissionCode] = useState('');
    const [originalCode, setOriginalCode] = useState('');
    const [role, setRole] = useState('');
    const [socket, setSocket] = useState(null);
    const [isCorrect, setIsCorrect] = useState(false);

    useEffect(() => {
        fetchCurrentSubmission(id, (block) => {
            setSubmissionCodeBlock(block);
            setSubmissionCode(block.code);
            setOriginalCode(block.code);
        });
    }, [id]);

    useEffect(() => {
        const newSocket = createSocket(`/ws/codeblock/${id}/`);
        setSocket(newSocket);

        newSocket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'code_update') {
                setSubmissionCode(data.code);
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
        setSubmissionCode(newValue);
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({ type: 'codeChange', code: newValue }));
        }

        // Send code update to backend
        editSubmissionCodeBlock(id, newValue);
    };

    




    const handleCheckCode = () => {
        checkCode(id, code, setIsCorrect);
    };

    const handleResetCode = () => {
        setSubmissionCode(originalCode);
    };

    return (
        <>

        <Container style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 16px' }}>
            
            <Typography variant="h4" gutterBottom style={{ textAlign: 'center', marginTop: '16px' }}>
                {submissionCodeBlock.id}. {submissionCodeBlock.title}
                <Typography variant="subtitle1">{submissionCodeBlock.instructions}</Typography>
            </Typography>
            <Paper style={{ height: '80vh',width:'60vw', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginLeft: '20%'}}>
                <Editor
                    height="60vh"
                    defaultLanguage="python"
                    value={code}
                    onChange={handleCodeChange}
                    options={{ theme: 'vs-dark' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
                    <Button className="btn btn-primary" onClick={handleCheckCode}>Submit</Button>
                    <Button variant="btn btn-secondary"><Link className="font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 no-underline" to="/">Back</Link></Button>
                    <Button className="btn btn-secondary" onClick={handleResetCode}>Reset</Button>
                </div>
                <div style={{ fontSize: '3em', textAlign: 'center', marginTop: '16px' }}>
                </div>
            </Paper>
        </Container>
    </>
    );
};

export default CodeBlockPage;