<script lang="ts" setup>
import {
	defineExpose, defineProps, PropType, ref, watchEffect,
} from 'vue';

import Selector from '@/components/molecules/Selector.vue';
import { Skill } from '@/models/Skill';
import { Member } from '@/models/Member';

import { useStore } from '@/store';
import { getCurrentIndex } from '@/utils/globals';
// ***********************************************************************************************
// VARIABLES
// -----------------------------------------------------------------------------------------------
const store = useStore();

const members = ref<Member[]>(store.state.data.members);
const skills = ref<Skill[]>(store.state.data.skills);

const selectedMembers = ref<Member[]>([]);

const addMemberName = ref('');

const inputName = ref<HTMLInputElement>();

const selector = ref<InstanceType<typeof Selector>>();

const props = defineProps({
	selectedMembers: Object as PropType<Member[]>,
});

watchEffect(() => {
	if (props.selectedMembers) {
		selectedMembers.value = props.selectedMembers;
	}
});
// ***********************************************************************************************

// ***********************************************************************************************
// <editor-fold defaultstate="collapsed" desc="// Members Functions">
// -----------------------------------------------------------------------------------------------
function clearAddMemberInputs() {
	addMemberName.value = '';
}
// -----------------------------------------------------------------------------------------------
// </editor-fold>
// ***********************************************************************************************

// ***********************************************************************************************
// <editor-fold defaultstate="collapsed" desc="// General Functions">
// -----------------------------------------------------------------------------------------------
function clearInputs() {
	selector.value.clearInputs();
	clearAddMemberInputs();
}
function clearToolsInputs() {
	selector.value.resetTools();
	clearAddMemberInputs();
}
// -----------------------------------------------------------------------------------------------
// </editor-fold>
// ***********************************************************************************************

// ***********************************************************************************************
// <editor-fold defaultstate="collapsed" desc="// API Functions">
// -----------------------------------------------------------------------------------------------
function addMember() {
	let error = false;
	if (inputName.value) {
		if (inputName.value.value.length === 0) {
			error = true;
			inputName.value.classList.toggle('form__input--wrong');
		}
	}

	if (!error) {
		const membersId = getCurrentIndex(members.value) + 1;
		members.value.push({ id: membersId, name: addMemberName.value, skills: selector.value.getSelectedSubItems });
		selectedMembers.value.push({ id: membersId, name: addMemberName.value, skills: selector.value.getSelectedSubItems });
		clearToolsInputs();
	}
}
// -----------------------------------------------------------------------------------------------
// </editor-fold>
// ***********************************************************************************************

defineExpose({
	selectedMembers,
	clearInputs,
});

</script>

<template>
	<div class="selector">
		<Selector ref="selector" @addItem="addMember" :items="members" :sub-items="skills" :selected-items="selectedMembers" tools id="tasks" class="form__input">
			<template v-slot:inputs>
				<input ref="inputName" v-model="addMemberName"  class="form__input" type="text" placeholder="Nom de l'opérateur">
			</template>
		</Selector>
	</div>
</template>

<style lang="scss" scoped>
.selector {
	width: 100%;
}
</style>
