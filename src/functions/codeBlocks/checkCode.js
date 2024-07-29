import axios from '../axiosConfig';

export default function checkCode(id, code, setIsCorrect) {
    axios.post(`/codeblock/${id}/check`, { code })
        .then(response => {
            if (response.status === 200) {
                setIsCorrect(response.data.is_correct);
            } else {
                console.error('Error: Unexpected response status', response.status);
            }
        })
        .catch(error => {
            console.error('Error checking code:', error);
        });
}