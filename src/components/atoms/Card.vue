<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
	removable: Boolean,
	selectable: Boolean,
	movableLeft: Boolean,
	movableRight: Boolean,
	type: String,
});

const emit = defineEmits(['close', 'move']);

</script>

<template>
	<div :class="`card ${type ? 'card--' + type : ''} ${selectable ? 'card--selectable' : ''}`" class="flex justify-between align-center">
		<font-awesome-icon @click="emit('move')" v-if="movableRight" class="card__action--left icon" icon="arrow-left"></font-awesome-icon>
		<slot></slot>
		<font-awesome-icon @click="emit('close')" v-if="removable" :class="`${type ? 'card__close--' + type : ''}`" class="card__close icon" icon="times"/>
		<font-awesome-icon @click="emit('move')" v-if="movableLeft" class="card__action--right icon" icon="arrow-right"></font-awesome-icon>
	</div>
</template>

<style lang="scss" scoped>
.card {
	padding: 0.4rem;
	background-color: lighten($mainColor1, 5%);
	border-radius: 6px;
	font-size: 0.8rem;
	text-align: center;
	transition: background-color 200ms ease-in;

	&--selectable {
		cursor: pointer;
	}
	&--success {
		background-color: $successColor;
		&:hover {
			background-color: darken($successColor, 10%) !important;
		}
	}
	&:hover {
		background-color: darken($mainColor1, 5%);
	}
}
.card__close {
	border-radius: 6px;
	padding: 2px;
	background-color: $mainColor1;
	cursor: pointer;
	margin-left: 0.5rem;
	font-size: 1.5rem;
	width: 1rem;
	transition: background-color 250ms ease;

	&:hover {
		background-color: darken($mainColor1, 30%);
	}

	&--success {
		background-color: darken($successColor, 10%);
		&:hover {
			background-color: darken($successColor, 30%) !important;
		}
	}
}
.card__action--right {
	margin-left: 0.5rem;
}
.card__action--left {
	margin-right: 0.5rem;
}
</style>
