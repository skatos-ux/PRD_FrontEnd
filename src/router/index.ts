import { createRouter, createWebHistory } from 'vue-router';
import Test from '@/views/Test.vue';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';

const routes = [
	{
		path: '/',
		name: 'Home',
		meta: { title: 'Acceuil | Entreprise' },
		component: Home,
	},
	{
		path: '/login',
		name: 'Login',
		meta: { title: 'Se connecter | Entreprise' },
		component: Login,
	},
	{
		path: '/register',
		name: 'Register',
		meta: { title: 'Créer un compte | Entreprise' },
		component: Register,
	},
	{
		path: '/:msg',
		name: 'Test',
		props: true,
		meta: { title: 'Tests | Entreprise' },
		component: Test,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach((to, from, next) => {
	document.title = <string>to.meta.title;
	next();
});

export default router;
