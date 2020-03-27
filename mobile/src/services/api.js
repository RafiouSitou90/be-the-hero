import axios from 'axios';
import { create } from 'apisauce';

/* const api = axios.create({
	baseURL: '192.168.0.8:4000'
}); */

const api = create({
	baseURL: 'http://192.168.0.8:4000'
});

api.addResponseTransform(response => {
	if (!response.ok) throw response;
});

export default api;
