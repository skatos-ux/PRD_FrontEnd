<script lang="ts" setup>
import {
	ref, defineExpose, defineProps, PropType, watchEffect,
} from 'vue';

import { Task } from '@/models/Task';
import { Skill } from '@/models/Skill';

import Selector from '@/components/molecules/Selector.vue';
import { useStore } from '@/store';
import { getCurrentIndex } from '@/utils/globals';

// ***********************************************************************************************
// VARIABLES
// -----------------------------------------------------------------------------------------------
const store = useStore();

const tasks = ref<Task[]>(store.state.data.tasks);
const skills = ref<Skill[]>(store.state.data.skills);

const selectedTasks = ref<Task[]>([]);

const addTaskName = ref('');
const addTaskDuration = ref('');

const inputName = ref<HTMLInputElement>();
const inputDuration = ref<HTMLInputElement>();

const selector = ref<InstanceType<typeof Selector>>();

const props = defineProps({
	selectedTasks: Object as PropType<Task[]>,
});

watchEffect(() => {
	if (props.selectedTasks) {
		selectedTasks.value = props.selectedTasks;
	}
});
// ***********************************************************************************************

// ***********************************************************************************************
// <editor-fold defaultstate="collapsed" desc="// Tasks Functions">
// -----------------------------------------------------------------------------------------------
function clearAddTaskInputs() {
	addTaskName.value = '';
	addTaskDuration.value = '';
}
function verifyAddTaskDuration() {
	if (addTaskDuration.value.length !== 0) {
		if (+addTaskDuration.value > 10) {
			addTaskDuration.value = '10';
		}
		if (+addTaskDuration.value < 1) {
			addTaskDuration.value = '1';
		}
	}
}
// -----------------------------------------------------------------------------------------------
// </editor-fold>
// ***********************************************************************************************

// ***********************************************************************************************
// <editor-fold defaultstate="collapsed" desc="// General Functions">
// -----------------------------------------------------------------------------------------------
function clearInputs() {
	selector.value.clearInputs();
	clearAddTaskInputs();
}
function clearToolsInputs() {
	selector.value.resetTools();
	clearAddTaskInputs();
}
// -----------------------------------------------------------------------------------------------
// </editor-fold>
// ***********************************************************************************************

// ***********************************************************************************************
// <editor-fold defaultstate="collapsed" desc="// API Functions">
// -----------------------------------------------------------------------------------------------
function addTask() {
	let error = false;
	if (inputName.value && inputDuration.value) {
		if (inputName.value.value.length === 0) {
			error = true;
			inputName.value.classList.toggle('form__input--wrong');
		}
		if (inputDuration.value.value.length === 0) {
			error = true;
			inputDuration.value.classList.toggle('form__input--wrong');
		}
	}

	if (!error) {
		const taskId = getCurrentIndex(tasks.value) + 1;
		tasks.value.push({
			id: taskId, name: addTaskName.value, duration: +addTaskDuration.value, skills: selector.value.getSelectedSubItems,
		});
		selectedTasks.value.push({
			id: taskId, name: addTaskName.value, duration: +addTaskDuration.value, skills: selector.value.getSelectedSubItems,
		});
		clearToolsInputs();
	}
}
// -----------------------------------------------------------------------------------------------
// </editor-fold>
// ***********************************************************************************************

defineExpose({
	selectedTasks,
	clearInputs,
});

</script>

<template>
	<div class="selector">
		<Selector ref="selector" @addItem="addTask" :items="tasks" :sub-items="skills" :selected-items="selectedTasks" tools id="tasks" class="form__input">
			<template v-slot:inputs>
				<input ref="inputName" v-model="addTaskName"  class="form__input" type="text" placeholder="Nom de la tâche">
				<input ref="inputDuration" v-model="addTaskDuration" @keyup="verifyAddTaskDuration"  @click="verifyAddTaskDuration"  class="form__input" type="number" min="0" max="10" placeholder="Durée (h)">
			</template>
		</Selector>
	</div>
</template>

<style lang="scss" scoped>
.selector {
	width: 100%;
}
input[type=number] {
	&::-webkit-outer-spin-button, &::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
	-moz-appearance: textfield;
}
</style>
