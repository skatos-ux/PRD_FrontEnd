import { InjectionKey } from 'vue';
import { createStore, Store, useStore as baseUseStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import Cookies from 'js-cookie';

import { devInstance, routes } from '@/utils/axios';
import { Profile } from '@/models/Profile';
import ServerError from '@/utils/errors';

export interface State {
		signup: { success: boolean, error: string };
		login: { isConnected: boolean, error: string };
		profile: Profile;
}

export const injectionKey: InjectionKey<Store<State>> = Symbol('');

export const store = createStore<State>({
	state: {
		signup: {
			success: false,
			error: '',
		},
		login: {
			isConnected: false,
			error: '',
		},
		profile: {
			token: '',
			stayConnected: false,
			username: '',
		},
	},
	getters: {
		isConnected(state): boolean {
			return state.login.isConnected;
		},
		hasSignedUp(state): boolean {
			return state.signup.success;
		},
	},
	mutations: {
		loginSuccess(state, profile: Profile) {
			Object.assign(state.profile, profile);
			state.login.isConnected = true;
		},
		loginFail(state, error) {
			state.login.isConnected = false;
			state.login.error = error;
		},
		signupSuccess(state) {
			state.signup.success = true;
		},
		signupFail(state, error) {
			state.signup.success = false;
			state.signup.error = error;
		},
		disconnectSuccess(state) {
			state.signup.success = false;
			state.signup.error = '';
			state.login.isConnected = false;
			state.login.error = '';
			state.profile.stayConnected = false;
			state.profile.token = '';
			state.profile.username = '';
		},
	},
	actions: {
		async connect({ commit }, logins: { email: string, password: string, stayConnected: boolean }) {
			const params = new URLSearchParams();
			params.append('email', logins.email);
			params.append('password', logins.password);

			await devInstance.post(routes.LOGIN, params)
				.then((response) => {
					if (response.status === 200) {
						commit('loginSuccess', {
							token: response.data.token,
							username: response.data.username,
							stayConnected: logins.stayConnected,
						});
					}
				})
				.catch((error) => {
					if (error.response.status === 401 || error.response.status === 400) {
						commit('loginFail', error.response.data);
					} else {
						commit('loginFail', ServerError.NoResponse);
					}
				});
		},
		disconnect({ commit }) {
			commit('disconnectSuccess');
		},
		async signup({ commit }, logins: { firstname: string, email: string, password: string }) {
			const params = new URLSearchParams();
			params.append('firstname', logins.firstname);
			params.append('email', logins.email);
			params.append('password', logins.password);

			await devInstance.post(routes.REGISTER, params)
				.then((response) => {
					if (response.status === 200 && response.data === 'OK') {
						commit('signupSuccess');
					}
				})
				.catch((error) => {
					if (error.response.status === 401 || error.response.status === 400) {
						commit('signupFail', error.response.data);
					} else {
						commit('signupFail', ServerError.NoResponse);
					}
				});
		},
	},
	plugins: [
		createPersistedState({
			getState: (key) => {
				const cookie = Cookies.get(key);
				if (cookie) {
					return JSON.parse(cookie);
				}
				return null;
			},
			setState: (key, state) => {
				Cookies.set(key, JSON.stringify(state), {
					expires: 3,
					secure: false, // TODO METTRE VRAI QUAND HTTPS
				});
			},
		}),
	],
});

export function useStore() {
	return baseUseStore(injectionKey);
}
