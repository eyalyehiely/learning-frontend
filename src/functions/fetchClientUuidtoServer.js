import axios from '../functions/config/axiosConfig';
import Cookies from 'js-cookie';

export default function fetchClientUuidtoServer() {
    const clientUUID = Cookies.get('clientUUID'); 

    if (!clientUUID) {
        console.error('Error: clientUUID is not defined.');
        return;
    }

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