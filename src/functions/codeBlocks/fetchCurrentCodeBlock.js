import axios from '../config/axiosConfig';

export default function fetchCurrentCodeBlock(id, setCodeBlock, setCode) {
    axios.get(`/codeblock/${id}/`)
        .then(response => {
            if (response.status === 200) {
                setCodeBlock(response.data);
                setCode(response.data.code);
            } else {
                console.error('Error: Unexpected response status', response.status);
            }
        })
        .catch(error => {
            console.error('Error fetching code block:', error);
        });
}