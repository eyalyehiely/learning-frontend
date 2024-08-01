import axios from '../config/axiosConfig';
import Cookies from 'js-cookie';

export default function checkCode(id, code, setIsCorrect) {
    const clientUUID = Cookies.get('clientUUID');
    axios.post(`/codeblock/${id}/check/`, { code,clientUUID })
        .then(response => {
            if (response.status === 200 && response.data.success === 'match') {
                setIsCorrect(true);
            } else {
                console.error('Error: Unexpected response status', response.status);
                setIsCorrect(false);
            }
        })
        .catch(error => {
            console.error('Error checking code:', error);
            setIsCorrect(false);
        });
}