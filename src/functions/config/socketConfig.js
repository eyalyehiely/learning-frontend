const baseURL = import.meta.env.VITE_WEBSOCKET_BASE_URL || 'ws://localhost:8000/ws/';

const createSocket = (path) => {
    // Check if the current page is served over HTTPS
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    
    // Replace the protocol in the base URL with the correct one
    const socketURL = baseURL.replace(/^ws:/, protocol).replace(/^wss:/, protocol);

    const socket = new WebSocket(`${socketURL}${path}`);

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