<script lang="ts" setup>
import { inject, ref } from 'vue';

import { Skill } from '@/models/Skill';

import { useStore } from '@/store';

import Modal from '@/components/atoms/Modal.vue';
import Modifier from '@/components/molecules/Modifier.vue';
import Creator from '@/components/molecules/Creator.vue';
// ***********************************************************************************************
// VARIABLES
// -----------------------------------------------------------------------------------------------
const store = useStore();
const openManager = ref<boolean | undefined>(inject('skillModalOpenManager'));

const skills = ref<Skill[]>(store.state.data.skills);

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
			<p><b>Configuration compétences</b></p>
		</template>
		<div class="form flex column justify-start align-start">
			<div class="form__group">
				<div class="form__label--header">
					<label class="form__label">Création d'une compétence</label>
				</div>
				<div class="w100 g1 flex row justify-start align-end">
					<Creator ref="creator" :items="skills" text="Nom de la nouvelle compétence" tools id="skills" class="form__input--label"/>
					<button class="button button--success right">Ajouter une compétence</button>
				</div>
			</div>
			<div class="form__group">
				<div class="form__label--header">
					<label class="form__label">Modification de compétences</label>
				</div>
				<Modifier ref="taskModifier" :items="skills" id="modtask" class="form__input--selector">
					<template #mod_title><p class="form__label text-center">Compétences</p></template>
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
.form__input--native {
	flex-shrink: 1.25;
}
input[type=number] {
	&::-webkit-outer-spin-button, &::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
	-moz-appearance: textfield;
}
.right {
	width: 70%;
}
</style>
