import axios from '../functions/config/axiosConfig';
export default function fetchClientUuidtoServer(clientUUID) {
    axios.post('/fetchClientUuidtoServer/', { clientUUID })
        .then(response => {
            if (response.status === 200 || response.status === 201) {
                console.log(`Client UUID sent to server successfully: ${clientUUID}`);
            } else {
                console.error('Error: Unexpected response status', response.status);
            }
        })
        .catch(error => {
            console.error('Error sending client UUID:', error);
        });
}