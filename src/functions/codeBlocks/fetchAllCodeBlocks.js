import axios from '../axiosConfig';

export default function getCodeBlocks(setCodeBlocks) {
    axios.get('/codeblocks/')
        .then(response => {
            if (response.status === 200) {
                setCodeBlocks(response.data.codeBlocks);
            } else {
                console.error('Error: Unexpected response status', response.status);
            }
        })
        .catch(error => {
            console.error('Error fetching code blocks:', error);
        });
}
