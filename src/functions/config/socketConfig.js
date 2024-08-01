const createSocket = (path) => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const baseURL = import.meta.env.VITE_WEBSOCKET_BASE_URL.replace(/^ws/, protocol);
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

export default createSocket;f