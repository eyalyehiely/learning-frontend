import axios from '../axiosConfig';

export default function checkCode(id, code, setIsCorrect) {
    axios.post(`/codeblock/${id}/check/`, { code })
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