import axios from 'axios';

function createInstance(baseURL: string) {
	return axios.create({
		baseURL,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.token}`,
		},
	});
}

export const devInstance = createInstance('http://localhost:3000');
export const productionInstance = createInstance('http://localhost:3000');

export const routes = {
	LOGIN: '/authenticate.php',
	REGISTER: '/register.php',
};
