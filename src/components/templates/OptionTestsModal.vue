<script lang="ts" setup>
import {
	inject, ref, defineProps, PropType,
} from 'vue';

import { EventInput } from '@fullcalendar/core';

import Modal from '@/components/atoms/Modal.vue';
import TaskSelector from '@/components/organisms/TaskSelector.vue';
import MemberSelector from '@/components/organisms/MemberSelector.vue';

import eventToTest from '@/adapters/fromEventToAssignedTest';

import { useStore } from '@/store';

// ***********************************************************************************************
// VARIABLES
// -----------------------------------------------------------------------------------------------
const store = useStore();
const openManager = ref<boolean | undefined>(inject('optionTestModalOpenManager'));

const autoTeam = ref(false);

const props = defineProps({
	event: Object as PropType<EventInput>,
});
// ***********************************************************************************************

// ***********************************************************************************************
// <editor-fold defaultstate="collapsed" desc="// API Functions">
// -----------------------------------------------------------------------------------------------
async function delTest() {
	// TODO: remove mock
	const test = eventToTest(props.event!);
	await store.dispatch('mockDelTest', test);
}
async function updTest() {
	// TODO: remove mock
	const test = eventToTest(props.event!);
	await store.dispatch('mockUpdTest', test);
}
// -----------------------------------------------------------------------------------------------
// </editor-fold>
// ***********************************************************************************************

</script>

<template>
	<Modal :open-manager="openManager" @closeModal="openManager = false">
		<template v-slot:header>
			<p><b>Modification de tests</b></p>
		</template>
		<div class="form flex column justify-start align-start">
			<label class="form__label">Affichage</label>
			<div class="calendar__event--nohover">
				<div class="cell p1"><input class="cell__input" type="text" :value="event.extendedProps.P1"></div>
				<div class="cell p2"><input class="cell__input" type="text" :value="event.extendedProps.P2"></div>
				<div class="cell p3"><input class="cell__input" type="text" :value="event.extendedProps.P3"></div>
				<div class="cell p4"><input class="cell__input" type="text" :value="event.extendedProps.P4"></div>
				<div class="cell p5"><input class="cell__input" type="text" :value="event.extendedProps.P5"></div>
			</div>

			<label class="form__label" for="imat">Immatriculation du véhicule</label>
			<input class="form__input" id="imat" type="text" maxlength="9" placeholder="AB-123-CD">

			<label class="form__label" for="task">Type de tâches</label>
			<TaskSelector :selected-tasks="event.extendedProps.tasks" ref="taskSelector" id="task" class="form__input--selector"/>

			<div class="form__input flex justify-start align-center">
				<input v-model="autoTeam" id="autoteam" class="checkbox" type="checkbox">
				<label class="form__label--checkbox" for="autoteam">Laisser l'algorithme choisir une équipe</label>
			</div>

			<label v-if="!autoTeam" class="form__label" for="team">Equipe manuelle</label>
			<MemberSelector :selected-members="event.extendedProps.members" v-if="!autoTeam" id="team" class="form__input--selector"/>
		</div>
		<div class="buttons flex row justify-between align-center">
			<input @click="delTest" class="button button--error button--end" type="submit" value="Supprimer le test">
			<input @click="updTest" class="button button--success button--end" type="submit" value="Modifier le test">
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
.cell__input {
	width: 100%;
	height: 100%;
	background-color: transparent;
	font-size: 0.9rem;
	text-align: center;
	cursor: text;
	transition: background-color 200ms ease-in;
	color: white;

	&:hover {
		background-color: darken($eventColor, 10%);
	}
}
.calendar__event--nohover {
	margin-top: 0.5rem;
	margin-bottom: 1rem;
}
.buttons {
	width: 100%;
}
.p2 {
	padding: 0;
}
</style>
