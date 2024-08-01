import axios from '../config/axiosConfig';
import Cookies from 'js-cookie';


export default function checkCode(id, code, setIsCorrect) {
    const clientUUID = Cookies.get('clientUUID');
    axios.post(`/codeblock/${id}/check/`, { code,'user_id':clientUUID })
        .then(response => {
            if (response.status === 200 && response.data.success === 'match') {
                console.log(response.data);
                setIsCorrect(true);
            } else {
                console.error('Error: Unexpected response status', response.status);
                console.log(response.data);
                setIsCorrect(false);
            }
        })
        .catch(error => {
            console.error('Error checking code:', error);
            setIsCorrect(false);
        });
}