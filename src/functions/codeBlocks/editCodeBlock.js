import axios from '../config/axiosConfig';

export default function editCodeBlock(id, code) {
    axios.put(`/codeblock/${id}/edit/`, { code })
    .then(response => {
        if (response.status === 200 && response.data.success) {
            console.log('Code block updated successfully');
        } else {
            console.error('Error: Unexpected response status', response.status);
        }
    })
    .catch(error => {
        console.error('Error updating code block:', error);
    });
}