import { createRouter, createWebHistory } from 'vue-router';
import Tab from '@/components/organisms/Tab.vue';

import Home from '@/views/tabs/Home.vue';
import Tests from '@/views/tabs/Tests.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import Configurations from '@/views/tabs/Configurations.vue';
import Logout from '@/views/Logout.vue';

const routes = [
	{
		path: '/',
		name: 'Login',
		meta: { title: 'Se connecter | Entreprise' },
		component: Login,
	},
	{
		path: '/home',
		name: 'Tab',
		component: Tab,
		children: [
			{
				path: '',
				meta: { title: 'Acceuil | Entreprise' },
				component: Home,
			},
			{
				path: 'tests',
				meta: { title: 'Tests | Entreprise' },
				component: Tests,
			},
			{
				path: 'configurations',
				meta: { title: 'Configurations | Entreprise' },
				component: Configurations,
			},
			{
				path: 'logout',
				meta: { title: 'Se déconnecter | Entreprise' },
				component: Logout,
			},
		],
	},
	{
		path: '/register',
		name: 'Register',
		meta: { title: 'Créer un compte | Entreprise' },
		component: Register,
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
