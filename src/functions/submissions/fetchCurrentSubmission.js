import axios from '../config/axiosConfig';
import Cookies from 'js-cookie';

export default function fetchCurrentSubmission(id, setSubmissionCodeBlock, setSubmissionCode) {
    const clientUUID = Cookies.get('clientUUID'); 
    console.log('Retrieved clientUUID:', clientUUID);

    if (!clientUUID) {
        console.error('Error: clientUUID is not defined.');
        return;
    }

    axios.get(`/codeblock/submission/${id}/?user_id=${clientUUID}`)
        .then(response => {
            if (response.status === 200 || response.status === 201) {
                setSubmissionCodeBlock(response.data);
                setSubmissionCode(response.data.user_code);
            } else {
                console.error('Error: Unexpected response status', response.status);
            }
        })
        .catch(error => {
            console.error('Error fetching code block:', error);
        });
}