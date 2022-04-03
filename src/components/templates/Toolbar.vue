<script lang="ts" setup>
import { onMounted, ref, provide } from 'vue';
import TestsModal from '@/components/templates/TestsModal.vue';
import MemberModal from '@/components/templates/MemberModal.vue';
import TaskModal from '@/components/templates/TaskModal.vue';
import SkillModal from '@/components/templates/SkillModal.vue';

const testModalOpenManager = ref(false);
const memberModalOpenManager = ref(false);
const taskModalOpenManager = ref(false);
const skillModalOpenManager = ref(false);

provide('testModalOpenManager', testModalOpenManager);
provide('memberModalOpenManager', memberModalOpenManager);
provide('taskModalOpenManager', taskModalOpenManager);
provide('skillModalOpenManager', skillModalOpenManager);

onMounted(() => {
});

</script>

<template>
	<div>
		<div class="toolbar flex row justify-start align-center">
			<button @click="testModalOpenManager = true" class="toolbar__tool hoverable"><font-awesome-icon class="icon" icon="plus"/>&nbsp; Test</button>
			<div class="toolbar__divider"></div>
			<button @click="memberModalOpenManager = true" class="toolbar__tool hoverable"><font-awesome-icon class="icon" icon="cog"/>&nbsp; Opérateurs</button>
			<div class="toolbar__divider"></div>
			<button @click="taskModalOpenManager = true" class="toolbar__tool hoverable"><font-awesome-icon class="icon" icon="cog"/>&nbsp; Tâches</button>
			<div class="toolbar__divider"></div>
			<button @click="skillModalOpenManager = true" class="toolbar__tool hoverable"><font-awesome-icon class="icon" icon="cog"/>&nbsp; Compétences</button>
		</div>

		<TestsModal/>
		<MemberModal/>
		<TaskModal/>
		<SkillModal/>
	</div>
</template>

<style lang="scss" scoped>
.toolbar {
	width: 100%;
	height: 3rem;
	background-color: lighten($shadowColor, 40%);
	border-radius: 6px;
	padding-inline: 1rem;
	gap: 1rem;
}
.toolbar__tool {
	padding: 0.5rem;
	border-radius: 6px;
}
.toolbar__divider {
	height: calc(100% - 1rem);
	width: 1px;
	background-color: $shadowColor;
}
</style>
