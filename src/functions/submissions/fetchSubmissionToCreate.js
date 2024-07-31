import axios from '../config/axiosConfig';


/**
 * Submits a code block submission to the server.
 * @param {number} codeBlockId - The ID of the code block.
 * @param {string} userId - The ID of the user.
 * @param {Object} submissionData - The submission data to be sent.
 */
export default function fetchSubmissionToCreate(codeBlockId, userId, submissionData) {
    axios.post('/codeblock/submission/', {
        clientUUID: userId,
        code_block_id: codeBlockId,
        ...submissionData
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