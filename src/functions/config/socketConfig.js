const createSocket = (path) => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    let baseURL = import.meta.env.VITE_WEBSOCKET_BASE_URL.replace(/^ws/, protocol);

    // Ensure no double slashes in the URL
    if (baseURL.endsWith('/')) {
        baseURL = baseURL.slice(0, -1);
    }
    if (!path.startsWith('/')) {
        path = `/${path}`;
    }

    const url = `${baseURL}${path}`;
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