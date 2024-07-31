import axios from '../config/axiosConfig';


export default function fetchSubmissionToCreate(codeBlockId, userId) {
    axios.post('/codeblock/submission/', {
        clientUUID: userId,
        code_block_id: codeBlockId,
    })
    .then(response => {
        if (response.status === 201) {
            console.log('Submission successful:', response.data);
        } else {
            console.error('Unexpected response status:', response.status);
        }
    })
    .catch(error => {
        if (error.response && error.response.data) {
            console.error('Error submitting code block:', error.response.data);
        } else {
            console.error('Error submitting code block:', error.message);
        }
    });
}