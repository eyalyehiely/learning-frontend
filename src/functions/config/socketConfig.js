const baseURL = import.meta.env.VITE_WEBSOCKET_BASE_URL || 'ws://localhost:8000/ws/';

const createSocket = (path) => {

    const socket = new WebSocket(`${baseURL}${path}`);

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