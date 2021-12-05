import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Test from '../views/Test.vue';

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		path: '/:msg',
		name: 'Test',
		props: true,
		component: Test,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
