<script lang="ts" setup>
import {
	defineProps, onMounted, PropType, ref,
} from 'vue';

import { gsap } from 'gsap';

import Card from '@/components/atoms/Card.vue';
import Callback = gsap.Callback;
import { Displayable } from '@/models/Displayable';
// ***********************************************************************************************
// VARIABLES
// -----------------------------------------------------------------------------------------------
const props = defineProps({
	items: {
		type: Object as PropType<Displayable[]>,
		required: true,
	},
	text: {
		type: String,
		default: 'Nom',
	},
});

const searchedItem = ref('');

const filteredItems = ref<Displayable[]>([]);

onMounted(() => {
	if (props.items) {
		filteredItems.value = props.items;
	}
});
// ***********************************************************************************************

// ***********************************************************************************************
// <editor-fold defaultstate="collapsed" desc="// Items Functions">
// -----------------------------------------------------------------------------------------------
function filterItem() {
	const input = searchedItem.value;
	if (input) {
		filteredItems.value = props.items.filter((item: Displayable) => item.name.toLocaleLowerCase().includes(input.toLocaleLowerCase()));
	} else {
		filteredItems.value = props.items;
	}
}
// -----------------------------------------------------------------------------------------------
// </editor-fold>
// ***********************************************************************************************

// ***********************************************************************************************
// <editor-fold defaultstate="collapsed" desc="// UI Functions">
// -----------------------------------------------------------------------------------------------
function beforeEnter(element: HTMLDivElement) {
	// eslint-disable-next-line no-param-reassign
	element.style.opacity = '0';
}

function enter(element: HTMLDivElement, done: Callback) {
	if (element.dataset.index) {
		gsap.to(element, {
			opacity: 1,
			delay: +element.dataset.index * 0.08,
			onComplete: done,
		});
	}
}

function leave(element: HTMLDivElement, done: Callback) {
	if (element.dataset.index) {
		gsap.to(element, {
			opacity: 0,
			delay: +element.dataset.index * 0.08,
			onComplete: done,
		});
	}
}
// -----------------------------------------------------------------------------------------------
// </editor-fold>
// ***********************************************************************************************
</script>

<template>
	<div class="creator">
		<input v-model="searchedItem" @keyup="filterItem" class="form__input" type="text" :placeholder="props.text">
		<div v-if="filteredItems.length !== 0" class="creator__content flex row justify-start align-start">
			<transition-group name="staggered-fade" :css="false" @before-enter="beforeEnter" @enter="enter" @leave="leave">
				<Card v-for="(item, index) in filteredItems" :key="item.name" :data-index="index">{{ item.name }}</Card>
			</transition-group>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.creator {
	width: 100%;
	background-color: lighten($shadowColor, 45%);
	border-radius: 6px;
	padding: 0.5rem;
	position: relative;
}
.creator__content {
	width: 100%;
	margin-top: 0.5rem;
	flex-wrap: wrap;
	gap: 0.5rem;
	height: auto;
	max-height: 5rem;
	overflow-y: auto;
}
</style>
