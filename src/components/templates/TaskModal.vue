<script lang="ts" setup>
import { inject, ref } from 'vue';
import { useStore } from '@/store';

import { Skill } from '@/models/Skill';
import { Task } from '@/models/Task';

import Modal from '@/components/atoms/Modal.vue';
import Modifier from '@/components/molecules/Modifier.vue';
import Selector from '@/components/molecules/Selector.vue';
import Creator from '@/components/molecules/Creator.vue';
// ***********************************************************************************************
// VARIABLES
// -----------------------------------------------------------------------------------------------
const store = useStore();
const openManager = ref<boolean | undefined>(inject('taskModalOpenManager'));

const skills = ref<Skill[]>(store.state.data.skills);
const tasks = ref<Task[]>(store.state.data.tasks);
// ***********************************************************************************************

// ***********************************************************************************************
// <editor-fold defaultstate="collapsed" desc="// API Functions">
// -----------------------------------------------------------------------------------------------

// -----------------------------------------------------------------------------------------------
// </editor-fold>
// ***********************************************************************************************

</script>

<template>
	<Modal :open-manager="openManager" @closeModal="openManager = false">
		<template v-slot:header>
			<p><b>Configuration tâches</b></p>
		</template>
		<div class="form flex column justify-start align-start">
			<div class="form__group">
				<div class="form__label--header">
					<label class="form__label text-center">Création d'une tâche</label>
				</div>

				<div class="w100 g1 flex row justify-start align-start">
					<Creator ref="creator" :items="tasks" text="Nom de la nouvelle tâche" id="tasks" class="form__input--selector"/>
					<div class="form__input--native form__input--selector flex justify-end align-center right">
						<input class="form__input" type="number" placeholder="Durée">
						<label class="form__label--unit">heure(s)</label>
					</div>
				</div>
				<label class="form__label form__anchor--mini">Séléction des compétences</label>
				<div class="w100 g1 flex row justify-start align-end">
					<Selector ref="selector" :items="skills" text="Rechercher une compétence..." id="skills" class="form__input--label"/>
					<button class="button button--success right">Ajouter la tâche</button>
				</div>
			</div>

			<div class="form__group">
				<div class="form__label--header">
					<label class="form__label text-center">Modification de tâches</label>
				</div>
				<Modifier ref="taskModifier" :items="tasks" id="modtask"  class="form__input--selector">
					<template #mod_title><p class="form__label text-center">Tâches</p></template>
					<template #del_title><p class="form__label text-center">A supprimer</p></template>
				</Modifier>

				<div class="w100 flex justify-end align-end">
					<button class="button button--warning">Appliquer les modifications</button>
				</div>
			</div>
		</div>
	</Modal>
</template>

<style lang="scss" scoped>
.form {
	width: 35rem;
	max-width: 35rem;
}
input[type=number] {
	&::-webkit-outer-spin-button, &::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
	-moz-appearance: textfield;
}
.right {
	width: 50%;
}
</style>
