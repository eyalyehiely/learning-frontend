import axios from '../config/axiosConfig';

export default function fetchCurrentCodeBlockSubmission(id, setSubmissionCodeBlock, setSubmissionCode) {
    axios.get(`/codeblock/submission/${id}/`)
        .then(response => {
            if (response.status === 200) {
                setSubmissionCodeBlock(response.data);
                setSubmissionCode(response.data.code);
            } else {
                console.error('Error: Unexpected response status', response.status);
            }
        })
        .catch(error => {
            console.error('Error fetching code block:', error);
        });
}