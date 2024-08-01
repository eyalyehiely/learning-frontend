import axios from '../functions/config/axiosConfig';
import Cookies from 'js-cookie';

export default function logVisitor(url) {
    const clientUUID = Cookies.get('clientUUID');  

    if (!clientUUID) {
        console.error('Error: clientUUID is not defined.');
        return;
    }

    return axios.post('/log_visitor/', {
        clientUUID,
        url
    })
    .then(response => {
        if (response.status === 200) {
            const role = response.data.role;
            Cookies.set('role', role);
            console.log(`Client UUID: ${clientUUID} is assigned the role of ${role}`);
            return role;  
        } else {
            console.error('Error: Unexpected response status', response.status);
            return null;  
        }
    })
    .catch(error => {
        console.error('Error logging visitor:', error);
        return null;  
    });
}