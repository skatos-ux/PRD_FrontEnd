<script lang="ts" setup>
import { inject, ref } from 'vue';
import { useStore } from '@/store';
import { Skill } from '@/models/Skill';
import { Member } from '@/models/Member';

import Modal from '@/components/atoms/Modal.vue';
import Selector from '@/components/molecules/Selector.vue';
import Modifier from '@/components/molecules/Modifier.vue';
import Creator from '@/components/molecules/Creator.vue';

// ***********************************************************************************************
// VARIABLES
// -----------------------------------------------------------------------------------------------
const store = useStore();
const openManager = ref<boolean | undefined>(inject('memberModalOpenManager'));

const skills = ref<Skill[]>(store.state.data.skills);
const members = ref<Member[]>(store.state.data.members);
// ***********************************************************************************************

// ***********************************************************************************************
// <editor-fold defaultstate="collapsed" desc="// Input Modification">
// -----------------------------------------------------------------------------------------------

// -----------------------------------------------------------------------------------------------
// </editor-fold>
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
			<p><b>Configuration des opérateurs</b></p>
		</template>

		<div class="form flex column justify-start align-start">
			<div class="form__group">
				<div class="form__label--header">
					<label class="form__label">Création d'un membre</label>
				</div>
				<Creator :items="members" text="Nom du nouveau membre" id="members" class="form__input--selector"/>

				<label class="form__label form__label--mini">Séléction de compétences</label>
				<div class="w100 g1 flex justify-end align-end">
					<Selector ref="selector" :items="skills" text="Rechercher une compétence..." id="skills" class="form__input--label"/>
					<button class="button button--success right">Ajouter un membre</button>
				</div>
			</div>

			<div class="form__group">
				<div class="form__label--header">
					<label class="form__label">Modification de l'équipe</label>
				</div>
				<Modifier :items="members" id="modmem" class="form__input--selector">
					<template #mod_title><h3 class="text-center">Membres</h3></template>
					<template #del_title><h3 class="text-center">A supprimer</h3></template>
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
.buttons {
	width: 100%;
	margin-top: auto;
}
.right {
	width: 50%;
}
</style>
