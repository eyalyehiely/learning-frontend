import axios from '../config/axiosConfig';

export default function fetchCodeBlockData(id, setOriginalCode) {
    axios.get(`/codeblock/?code_block_id=${id}`)
        .then(response => {
            if (response.status === 200) {
                setOriginalCode(response.data);
            } else {
                console.error('Error: Unexpected response status', response.status);
            }
        })
        .catch(error => {
            console.error('Error fetching code block:', error);
        });
}