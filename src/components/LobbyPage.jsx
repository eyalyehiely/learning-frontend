import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import getCodeBlocks from '../functions/codeBlocks/fetchAllCodeBlocks';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { v4 as uuidv4 } from 'uuid';
import Cookies from 'js-cookie';
import fetchClientUuidtoServer from "../functions/fetchClientUuidtoServer";

const LobbyPage = () => {
    const [codeBlocks, setCodeBlocks] = useState([]);
    const [clientUUID, setClientUUID] = useState('');

    useEffect(() => {
        const clientUUID = Cookies.get('clientUUID');
        if (!clientUUID) {
            const newUUID = uuidv4();
            Cookies.set('clientUUID', newUUID, { expires: 365 });
        }

        setClientUUID(Cookies.get('clientUUID'));
        fetchClientUuidtoServer();  // Send the clientUUID to the server

        getCodeBlocks(setCodeBlocks);  // Fetch the code blocks
    }, []);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            padding: '16px',
            backgroundColor: 'white',
        }}>
            <Typography variant="h5" component="h1" style={{ marginBottom: '16px' }}>
                Choose a Code Block
            </Typography>
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '16px',
                width: '100%',
                maxWidth: '1200px',
            }}>
                {codeBlocks.map((codeBlock) => (
                    <Card key={codeBlock.id} style={{
                        width: '100%',
                        maxWidth: '400px',
                        margin: '20px',
                        boxSizing: 'border-box'
                    }}>
                        <Typography variant="h6" component="h2" style={{
                            display: 'flex',
                            justifyContent: 'center',
                            padding: '16px'
                        }}>
                            {codeBlock.id}. {codeBlock.title}
                        </Typography>
                        <AspectRatio minHeight="120px" maxHeight="250px" style={{ padding: '16px' }}>
                            <div style={{
                                maxHeight: '150px',
                                overflow: 'auto',
                                padding: '8px',
                                backgroundColor: 'darkgray',
                                borderRadius: '8px',
                            }}>
                                <pre>
                                    <code>{codeBlock.code}</code>
                                </pre>
                            </div>
                        </AspectRatio>
                        <CardContent orientation="horizontal" style={{
                            display: 'flex',
                            justifyContent: 'center',
                            padding: '16px'
                        }}>
                            <Button
                                component={Link}
                                to={`/codeblock/${codeBlock.id}/`}
                                variant="solid"
                                size="md"
                                color="primary"
                                aria-label={`Explore ${codeBlock.title}`}
                                style={{ fontWeight: 600 }}
                            >
                                Go to script
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default LobbyPage;