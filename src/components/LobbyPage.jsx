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
        // Fetch or set the clientUUID cookie
        let clientUUID = Cookies.get('clientUUID');
        if (!clientUUID) {
            clientUUID = uuidv4();
            Cookies.set('clientUUID', clientUUID, { expires: 365 });
        }

        setClientUUID(clientUUID);
        fetchClientUuidtoServer(clientUUID);  // Send the clientUUID to the server

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
            <h1 style={{display: 'flex',marginLeft:'10%'}}>Hi, welcome to Moveo learning platform</h1>
            <Typography variant="h5" component="h1" style={{ marginBottom: '16px' }}>
                Choose a Code Block !
            </Typography>
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '16px',
                width: '100%',
                maxWidth: '100%',
            }}>
                {codeBlocks.map((codeBlock) => (
                    <Card key={codeBlock.id} style={{
                        flex: '1 1 auto',
                        boxSizing: 'border-box',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
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
                                maxHeight: '80%',
                                maxWidth: '100%',
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