import axios from '../config/axiosConfig';
import Cookies from 'js-cookie';

export default function editSubmissionCodeBlock(id, code) {
    const clientUUID = Cookies.get('clientUUID');
    axios.put(`/codeblock/submission/${id}/edit/?user_id=${clientUUID}`, {
        code,
        code_block: id,
        user_id: clientUUID
    })
    .then(response => {
        if (response.status === 200 || response.status === 201) {
            console.log('Code block updated successfully');
        } else {
            console.error('Error: Unexpected response status', response.status);
        }
    })
    .catch(error => {
        console.error('Error updating code block:', error);
    });
}