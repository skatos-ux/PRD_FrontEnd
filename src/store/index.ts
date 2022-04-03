import { InjectionKey } from 'vue';
import { createStore, Store, useStore as baseUseStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import Cookies from 'js-cookie';

import { devInstance, routes } from '@/utils/axios';
import { Profile } from '@/models/Profile';
import { ServerError, ServerSuccess } from '@/utils/messages';
import { Task } from '@/models/Task';
import { Skill } from '@/models/Skill';
import { Test } from '@/models/Test';
import { Member } from '@/models/Member';
import { AssignedTest } from '@/models/AssignedTest';
import mockup from '@/utils/mockup';

export interface State {
		signup: { success: boolean, error: string };
		login: { isConnected: boolean, error: string };
		request: { success: boolean, message: string };
		data : {
			tests: AssignedTest[],
			teams: [Member[]]
			tasks: Task[],
			skills: Skill[],
			members: Member[]
		}
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
		request: {
			success: false,
			message: '',
		},
		data: {
			tests: [],
			teams: [[]],
			tasks: [],
			skills: [],
			members: [],
		},
		profile: {
			token: '',
			stayConnected: false,
			username: '',
		},
	},
	getters: {},
	mutations: {
		// ***********************************************************************************************
		// <editor-fold defaultstate="collapsed" desc="// Account Functions">
		// -----------------------------------------------------------------------------------------------
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
			state.request.success = false;
			state.request.message = '';
			state.data.teams = [[]];
			state.data.members = [];
			state.data.skills = [];
			state.data.tests = [];
			state.data.tasks = [];
		},
		// -----------------------------------------------------------------------------------------------
		// </editor-fold>
		// ***********************************************************************************************

		// ***********************************************************************************************
		// <editor-fold defaultstate="collapsed" desc="// Tests Functions">
		// -----------------------------------------------------------------------------------------------
		loadTests(state, tests: AssignedTest[]) {
			Object.assign(state.data.tests, tests);
		},
		// -----------------------------------------------------------------------------------------------
		// </editor-fold>
		// ***********************************************************************************************

		// ***********************************************************************************************
		// <editor-fold defaultstate="collapsed" desc="// Teams Functions">
		// -----------------------------------------------------------------------------------------------
		loadTeams(state, teams: [Member[]]) {
			Object.assign(state.data.teams, teams);
		},
		// -----------------------------------------------------------------------------------------------
		// </editor-fold>
		// ***********************************************************************************************

		// ***********************************************************************************************
		// <editor-fold defaultstate="collapsed" desc="// Tasks Functions">
		// -----------------------------------------------------------------------------------------------
		loadTasks(state, tasks: Task[]) {
			Object.assign(state.data.tasks, tasks);
		},
		// -----------------------------------------------------------------------------------------------
		// </editor-fold>
		// ***********************************************************************************************

		// ***********************************************************************************************
		// <editor-fold defaultstate="collapsed" desc="// Skills Functions">
		// -----------------------------------------------------------------------------------------------
		loadSkills(state, skills: Skill[]) {
			Object.assign(state.data.skills, skills);
		},
		// -----------------------------------------------------------------------------------------------
		// </editor-fold>
		// ***********************************************************************************************

		// ***********************************************************************************************
		// <editor-fold defaultstate="collapsed" desc="// Members Functions">
		// -----------------------------------------------------------------------------------------------
		loadMembers(state, members: Member[]) {
			Object.assign(state.data.members, members);
		},
		// -----------------------------------------------------------------------------------------------
		// </editor-fold>
		// ***********************************************************************************************

		// ***********************************************************************************************
		// <editor-fold defaultstate="collapsed" desc="// Feedback Functions">
		// -----------------------------------------------------------------------------------------------
		setMessage(state, request: {success: boolean, message: string}) {
			state.request.success = request.success;
			state.request.message = request.message;
		},
		// -----------------------------------------------------------------------------------------------
		// </editor-fold>
		// ***********************************************************************************************

	},
	actions: {
		// ***********************************************************************************************
		// <editor-fold defaultstate="collapsed" desc="// Account Functions">
		// -----------------------------------------------------------------------------------------------
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
		disconnect({ commit }) {
			commit('disconnectSuccess');
		},
		// -----------------------------------------------------------------------------------------------
		// </editor-fold>
		// ***********************************************************************************************

		// ***********************************************************************************************
		// <editor-fold defaultstate="collapsed" desc="// Tests Functions">
		// -----------------------------------------------------------------------------------------------
		async sendTest({ commit }, test: Test) {
			const testJSON = JSON.stringify(test);

			await devInstance.post(routes.TESTS, testJSON)
				.then((response) => {
					if (response.status === 200) {
						commit('loadTests', response.data.tests);
						commit('setMessage', { success: true, message: ServerSuccess.SuccessfulTestCreation });
					}
				})
				.catch((error) => {
					if (error.response.status === 401 || error.response.status === 400) {
						commit('setMessage', { success: false, message: error.response.data });
					} else {
						commit('setMessage', { success: false, message: ServerError.NoResponse });
					}
				});
		},
		// -----------------------------------------------------------------------------------------------
		// </editor-fold>
		// ***********************************************************************************************

		// ***********************************************************************************************
		// <editor-fold defaultstate="collapsed" desc="// Teams Functions">
		// -----------------------------------------------------------------------------------------------
		async sendTeam({ commit }, team: Member[]) {
			const teamJSON = JSON.stringify(team);

			await devInstance.post(routes.TEAMS, teamJSON)
				.then((response) => {
					if (response.status === 200) {
						commit('loadTeams', response.data.teams);
						commit('setMessage', { success: true, message: ServerSuccess.SuccessfulTeamCreation });
					}
				})
				.catch((error) => {
					if (error.response.status === 401 || error.response.status === 400) {
						commit('setMessage', { success: false, message: error.response.data });
					} else {
						commit('setMessage', { success: false, message: ServerError.NoResponse });
					}
				});
		},
		// -----------------------------------------------------------------------------------------------
		// </editor-fold>
		// ***********************************************************************************************

		// ***********************************************************************************************
		// <editor-fold defaultstate="collapsed" desc="// Tasks Functions">
		// -----------------------------------------------------------------------------------------------
		async sendTask({ commit }, task: Task) {
			const tasksJSON = JSON.stringify(task);

			await devInstance.post(routes.TASKS, tasksJSON)
				.then((response) => {
					if (response.status === 200) {
						commit('loadTasks', response.data.tasks);
						commit('setMessage', { success: true, message: ServerSuccess.SuccessfulTaskCreation });
					}
				})
				.catch((error) => {
					if (error.response.status === 401 || error.response.status === 400) {
						commit('setMessage', { success: false, message: error.response.data });
					} else {
						commit('setMessage', { success: false, message: ServerError.NoResponse });
					}
				});
		},
		// -----------------------------------------------------------------------------------------------
		// </editor-fold>
		// ***********************************************************************************************

		// ***********************************************************************************************
		// <editor-fold defaultstate="collapsed" desc="// Skills Functions">
		// -----------------------------------------------------------------------------------------------
		async sendSkill({ commit }, skill: Skill) {
			const skillsJSON = JSON.stringify(skill);

			await devInstance.post(routes.TESTS, skillsJSON)
				.then((response) => {
					if (response.status === 200) {
						commit('loadSkills', response.data.tests);
						commit('setMessage', { success: true, message: ServerSuccess.SuccessfulSkillCreation });
					}
				})
				.catch((error) => {
					if (error.response.status === 401 || error.response.status === 400) {
						commit('setMessage', { success: false, message: error.response.data });
					} else {
						commit('setMessage', { success: false, message: ServerError.NoResponse });
					}
				});
		},
		// -----------------------------------------------------------------------------------------------
		// </editor-fold>
		// ***********************************************************************************************

		// ***********************************************************************************************
		// <editor-fold defaultstate="collapsed" desc="// Members Functions">
		// -----------------------------------------------------------------------------------------------
		async sendMember({ commit }, member: Member) {
			const memberJSON = JSON.stringify(member);

			await devInstance.post(routes.TEAMS, memberJSON)
				.then((response) => {
					if (response.status === 200) {
						commit('loadMembers', response.data.members);
						commit('setMessage', { success: true, message: ServerSuccess.SuccessfulMemberCreation });
					}
				})
				.catch((error) => {
					if (error.response.status === 401 || error.response.status === 400) {
						commit('setMessage', { success: false, message: error.response.data });
					} else {
						commit('setMessage', { success: false, message: ServerError.NoResponse });
					}
				});
		},
		// -----------------------------------------------------------------------------------------------
		// </editor-fold>
		// ***********************************************************************************************

		// ***********************************************************************************************
		// <editor-fold defaultstate="collapsed" desc="// Mockups Functions">
		// -----------------------------------------------------------------------------------------------
		async mockLoadData({ commit }) {
			commit('loadTests', mockup.data.tests);
			commit('loadTeams', mockup.data.teams);
			commit('loadTasks', mockup.data.tasks);
			commit('loadSkills', mockup.data.skills);
			commit('loadMembers', mockup.data.members);
		},
		// eslint-disable-next-line no-unused-vars
		async mockSendTest({ commit }, test: Test) {
			commit('loadTests', mockup.data.tests);
			commit('setMessage', { success: true, message: ServerSuccess.SuccessfulTestCreation });
			console.log('test sent');
		},
		// eslint-disable-next-line no-unused-vars
		async mockDelTest({ commit }, test: Test) {
			commit('loadTests', mockup.data.tests);
			commit('setMessage', { success: true, message: ServerSuccess.SuccessfulTestDeletion });
			console.log('test deleted');
		},
		// eslint-disable-next-line no-unused-vars
		async mockUpdTest({ commit }, test: Test) {
			commit('loadTests', mockup.data.tests);
			commit('setMessage', { success: true, message: ServerSuccess.SuccessfulTestDeletion });
			console.log('test updated');
		},
		// eslint-disable-next-line no-unused-vars
		async mockSendTeam({ commit }, team: [Member[]]) {
			commit('loadTeams', mockup.data.teams);
			commit('setMessage', { success: true, message: ServerSuccess.SuccessfulTeamCreation });
			console.log('team sent');
		},
		// eslint-disable-next-line no-unused-vars
		async mockSendTask({ commit }, task: Task) {
			commit('loadTasks', mockup.data.tasks);
			commit('setMessage', { success: true, message: ServerSuccess.SuccessfulTaskCreation });
			console.log('task sent');
		},
		// eslint-disable-next-line no-unused-vars
		async mockSendSkill({ commit }, skill: Skill) {
			commit('loadSkills', mockup.data.skills);
			commit('setMessage', { success: true, message: ServerSuccess.SuccessfulSkillCreation });
			console.log('skill sent');
		},
		// eslint-disable-next-line no-unused-vars
		async mockSendMember({ commit }, member: Member) {
			commit('loadMembers', mockup.data.members);
			commit('setMessage', { success: true, message: ServerSuccess.SuccessfulMemberCreation });
			console.log('member sent');
		},
		// -----------------------------------------------------------------------------------------------
		// </editor-fold>
		// ***********************************************************************************************
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
