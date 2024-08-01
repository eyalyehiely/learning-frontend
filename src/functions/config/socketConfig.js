const createSocket = (path) => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    let baseURL = import.meta.env.VITE_WEBSOCKET_BASE_URL.replace(/^ws/, protocol);

    // Ensure baseURL does not end with a slash
    if (baseURL.endsWith('/')) {
        baseURL = baseURL.slice(0, -1);
    }
    // Ensure path starts with a slash
    if (!path.startsWith('/')) {
        path = `/${path}`;
    }

    const url = `${baseURL}${path}`;
    console.log(`WebSocket URL: ${url}`); // Debugging statement to check the final URL

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