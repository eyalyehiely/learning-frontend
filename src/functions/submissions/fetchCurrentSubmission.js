import axios from '../config/axiosConfig';
import Cookies from 'js-cookie';

export default function fetchCurrentCodeBlockSubmission(id, setSubmissionCodeBlock, setSubmissionCode) {
    const clientUUID = Cookies.get('clientUUID'); 
    axios.get(`/codeblock/submission/${id}/?user_id=${clientUUID}`)
        .then(response => {
            if (response.status === 200 || response.status === 201) {
                setSubmissionCodeBlock(response.data);
                setSubmissionCode(response.data.code); // Ensure this matches the response structure
            } else {
                console.error('Error: Unexpected response status', response.status);
            }
        })
        .catch(error => {
            console.error('Error fetching code block:', error);
        });
}