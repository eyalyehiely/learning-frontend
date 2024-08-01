const createSocket = (path) => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const baseURL = import.meta.env.VITE_WEBSOCKET_BASE_URL.replace(/^ws/, protocol);
    const url = `${baseURL}${path}`.replace(/([^:]\/)\/+/g, "$1");  // Fix double slashes
    const socket = new WebSocket(url);

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