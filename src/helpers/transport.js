import Axios from 'axios';

const transport = Axios.create({
    baseURL: ''
});

export default transport;