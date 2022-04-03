<script lang="ts" setup>
import { onMounted, defineProps, defineEmits } from 'vue';

defineProps({
	openManager: Boolean,
});

const emit = defineEmits(['closeModal']);

onMounted(() => {
});
</script>

<template>
	<transition name="fade">
		<div v-if="openManager" class="modal flex column justify-center align-center">
			<div class="modal__content flex column justify-start align-center">
				<div class="modal__header flex row justify-between align-center">
					<slot name="header"></slot>
					<button @click="emit('closeModal')" class="modal__header__button hoverable"><font-awesome-icon icon="times"/></button>
				</div>
				<div class="modal__main">
					<slot></slot>
				</div>
			</div>
		</div>
	</transition>
</template>

<style lang="scss" scoped>
.modal {
	position: fixed;
	inset: 0;
	z-index: 2;
	background-color: rgba(0, 0, 0, 0.5);
	width: 100%;
	height: 100%;
}
.modal__content {
	background-color: white;
	border-radius: 7px;
	z-index: 3;
	overflow: auto;
	margin-block: 1rem;
}
.modal__header {
	width: 100%;
	padding: 0.5rem;

	&__button {
		border-radius: 6px;
		aspect-ratio: 1/1;
	}
}
.modal__main {
	padding-inline: 1rem;
}
</style>
