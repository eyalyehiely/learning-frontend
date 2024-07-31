import axios from '../functions/config/axiosConfig';
import Cookies from 'js-cookie';

export default function fetchClientUuidtoServer() {
    const clientUUID = Cookies.get('clientUUID');  

    axios.post('/fetchClientUuidtoServer/', {
        clientUUID,
    })
    .then(response => {
        if (response.status === 200 || response.status === 201) {
            console.log('Client UUID and code block ID sent to server'); // Ensure this matches the response structure
        } else {
            console.error('Error: Unexpected response status', response.status);
        }
    })
    .catch(error => {
        console.error('Error sending client UUID:', error);
    });
}