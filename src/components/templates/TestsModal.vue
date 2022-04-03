<script lang="ts" setup>
import {
	inject, ref, watch,
} from 'vue';
import moment from 'moment';

import { InputError } from '@/utils/messages';
import { useStore } from '@/store';

import Modal from '@/components/atoms/Modal.vue';
import FeedBack from '@/components/atoms/FeedBack.vue';
import TaskSelector from '@/components/organisms/TaskSelector.vue';
import MemberSelector from '@/components/organisms/MemberSelector.vue';

// ***********************************************************************************************
// VARIABLES
// -----------------------------------------------------------------------------------------------
const store = useStore();

const openManager = ref<boolean | undefined>(inject('testModalOpenManager'));

const errors = ref<string[]>([]);

const taskSelector = ref();

const inputs = {
	immat: ref(''),
	date: ref(moment().add(7, 'days').format('YYYY-MM-DDThh:mm')),
};
const autoTeam = ref(true);
// -----------------------------------------------------------------------------------------------

// ***********************************************************************************************

// ***********************************************************************************************
// <editor-fold defaultstate="collapsed" desc="// Input Modification">
// -----------------------------------------------------------------------------------------------
function manageImmatInput(event: KeyboardEvent) {
	if (event.key !== 'Backspace') {
		event.preventDefault();
		if (event.key.length === 1) {
			if (inputs.immat.value.length >= 0 && inputs.immat.value.length <= 2) {
				if ((/[a-zA-Z]/i).test(event.key)) {
					inputs.immat.value += event.key.toUpperCase();
				}
			}
			if (inputs.immat.value.length >= 2 && inputs.immat.value.length <= 5) {
				if (!Number.isNaN(+event.key)) {
					inputs.immat.value += event.key;
				}
			}
			if (inputs.immat.value.length >= 6 && inputs.immat.value.length <= 8) {
				if ((/[a-zA-Z]/i).test(event.key)) {
					inputs.immat.value += event.key.toUpperCase();
				}
			}
		}

		if (inputs.immat.value.length === 2 || inputs.immat.value.length === 6) {
			inputs.immat.value += '-';
		}
	}
}
function clearInputs() {
	inputs.immat.value = '';
	taskSelector.value.clearInputs();

	errors.value.length = 0;
}
// -----------------------------------------------------------------------------------------------
// </editor-fold>
// ***********************************************************************************************

// ***********************************************************************************************
// <editor-fold defaultstate="collapsed" desc="// API Functions">
// -----------------------------------------------------------------------------------------------
async function sendTest() {
	let inputsError = false;

	errors.value.length = 0;

	if (inputs.immat.value === '') {
		inputsError = true;
		errors.value.push(InputError.EmptyTestImmat);
	}
	if (inputs.date.value === '') {
		inputsError = true;
		errors.value.push(InputError.EmptyTestDate);
	}
	if (taskSelector.value.selectedTasks.length === 0) {
		inputsError = true;
		errors.value.push(InputError.EmptyTestTasks);
	}
	if (inputsError) {
		return;
	}

	// TODO: remove mock
	await store.dispatch('mockSendTest', { immat: inputs.immat, date: inputs.date, tasks: taskSelector.value.selectedTasks });

	if (!store.state.request.success) {
		errors.value.push(store.state.request.message);
	}
}
// -----------------------------------------------------------------------------------------------
// </editor-fold>
// ***********************************************************************************************
watch(openManager, () => {
	if (openManager.value === false) {
		clearInputs();
	}
});

</script>

<template>
	<Modal :open-manager="openManager" @closeModal="openManager = false">
		<template v-slot:header>
			<p><b>Ajout de tests</b></p>
		</template>
		<div class="form flex column justify-start align-start">
			<label class="form__label" for="imat">Immatriculation du véhicule</label>
			<input @keydown="manageImmatInput" v-model="inputs.immat.value" class="form__input" id="imat" type="text" maxlength="9" placeholder="AB-123-CD">

			<label class="form__label" for="depdate">Date de fin au plus tard</label>
			<input v-model="inputs.date.value" class="form__input" id="depdate" :min="inputs.date" type="datetime-local">

			<label class="form__label" for="task">Séléction des tâches</label>
			<TaskSelector ref="taskSelector" id="task" class="form__input--selector"/>

			<div class="form__input flex justify-start align-center">
				<input v-model="autoTeam" id="autoteam" class="checkbox" type="checkbox">
				<label class="form__label--checkbox" for="autoteam">Laisser l'algorithme choisir une équipe</label>
			</div>

			<label v-if="!autoTeam" class="form__label" for="team">Equipe manuelle</label>
			<MemberSelector v-if="!autoTeam" id="team" class="form__input--selector"/>

			<FeedBack v-for="error in errors" :key="error" type="error">{{error}}</FeedBack>

			<div class="buttons flex row justify-end align-center">
				<input @click="sendTest" class="button button--success button--end" type="submit" value="Ajouter le test">
			</div>
		</div>
	</Modal>
</template>

<style lang="scss" scoped>
.form {
	width: 22rem;
	max-width: 22rem;
}
.form__input {
	background-color: lighten($shadowColor, 45%);
	border-radius: 6px;
	margin-top: 0.5rem;
	margin-bottom: 1rem;
	width: 100%;
}
.buttons {
	width: 100%;
	margin-top: auto;
}
</style>
