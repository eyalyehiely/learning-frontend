import io from 'socket.io-client';

const baseURL = process.env.REACT_APP_WEBSOCKET_BASE_URL || 'ws://localhost:8000/ws';

const createSocket = (path) => {
    const socket = io(`${baseURL}${path}`);
    socket.on('connect', () => {
        console.log('Connected to WebSocket server');
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from WebSocket server');
    });

    return socket;
};

export default createSocket;
