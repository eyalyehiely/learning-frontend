import axios from '../axiosConfig';

export default function checkCode(id, code, setIsCorrect) {
    axios.post(`/codeblock/${id}/check`, 
    JSON.stringify({ code }))
        .then(response => {
            if (response.data === 'success') {
                setIsCorrect(true);
            } else {
                console.error('Error: Unexpected response status', response.status);
                setIsCorrect(false);
            }
        })
        .catch(error => {
            console.error('Error checking code:', error);
        });
}