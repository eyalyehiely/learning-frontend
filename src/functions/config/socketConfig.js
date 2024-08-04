const baseURL = import.meta.env.VITE_WEBSOCKET_BASE_URL || 'ws://localhost:8000';

const createSocket = (path) => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const fullURL = `${protocol}//${baseURL.replace(/^wss?:\/\//, '').replace(/^ws?:\/\//, '')}${path}`;
    console.log(`Connecting to WebSocket at ${fullURL}`);
    const socket = new WebSocket(fullURL);

    socket.onopen = () => {
        console.log('Connected to WebSocket server');
    };

    socket.onclose = () => {
        console.log('Disconnected from WebSocket server');
    };

    socket.onerror = (error) => {
        console.error('WebSocket error', error);
    };

    return socket;
};

export default createSocket;
