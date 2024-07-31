import axios from '../functions/config/axiosConfig';
import Cookies from 'js-cookie';

export default function logVisitor(url) {
    const clientUUID = Cookies.get('clientUUID');  

    axios.post('/log_visitor/', {
        clientUUID,
        url
    })
    .then(response => {
        if (response.status === 200) {
            const role = response.data.role;
            Cookies.set('role', role, { expires: 365 });
            const clientRole = Cookies.get('role')
            console.log(`Client UUID: ${clientUUID} is assigned the role of ${role}`);
        } else {
            console.error('Error: Unexpected response status', response.status);
        }
    })
    .catch(error => {
        console.error('Error logging visitor:', error);
    });
}