// const baseURL = import.meta.env.VITE_WEBSOCKET_BASE_URL || 'ws://localhost:8000';
// const createSocket = (path) => {
//     const socket = new WebSocket(`${baseURL}${path}`);

//     socket.onopen = () => {
//         console.log('Connected to WebSocket server');
//     };

//     socket.onclose = () => {
//         console.log('Disconnected from WebSocket server');
//     };

//     socket.onerror = (error) => {
//         console.error('WebSocket error', error);
//     };

//     return socket;
// };

// export default createSocket;


const baseURL = import.meta.env.VITE_WEBSOCKET_BASE_URL || 'ws://localhost:8000';

const createSocket = (path) => {
    // Ensure the WebSocket URL uses the correct protocol
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const fullURL = `${protocol}//${baseURL.replace(/^wss?:\/\//, '').replace(/^ws?:\/\//, '')}${path}`;
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


