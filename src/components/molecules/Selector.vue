<script lang="ts" setup>
import {
	defineEmits, ref, defineProps, defineExpose, PropType, onMounted, watchEffect,
} from 'vue';
import { gsap } from 'gsap';
import { Displayable } from '@/models/Displayable';
import { sortDisplayable } from '@/utils/globals';

import Callback = gsap.Callback;

import Card from '@/components/atoms/Card.vue';

// ***********************************************************************************************
// VARIABLES
// -----------------------------------------------------------------------------------------------
const props = defineProps({
	items: {
		type: Object as PropType<Displayable[]>,
		required: true,
	},
	subItems: Object as PropType<Displayable[]>,
	selectedItems: Object as PropType<Displayable[]>,
	text: {
		type: String,
		default: 'Rechercher...',
	},
	tools: Boolean,
});

const emit = defineEmits(['addItem']);

const openToolsManager = ref(false);

const mainView = ref<HTMLDivElement>();

const subItemsCopy = ref<Displayable[]>([]);

const searchedItem = ref('');

const filteredItems = ref<Displayable[]>([]);

const selectedItems = ref<Displayable[]>([]);
const selectedSubItems = ref<Displayable[]>([]);
// ***********************************************************************************************

// ***********************************************************************************************
// <editor-fold defaultstate="collapsed" desc="// Items Functions">
// -----------------------------------------------------------------------------------------------
function filterItem() {
	const input = searchedItem.value;
	if (input) {
		filteredItems.value = filteredItems.value.filter((item: Displayable) => item.name.toLocaleLowerCase().includes(input.toLocaleLowerCase()));
	} else {
		filteredItems.value = props.items.filter((el) => !selectedItems.value.includes(el));
	}
}
function selectItem(item: Displayable, index: number) {
	filteredItems.value.splice(index, 1);
	selectedItems.value.push(item);

	selectedItems.value = sortDisplayable(selectedItems.value);
	filteredItems.value = sortDisplayable(filteredItems.value);
}

function deSelectItem(item: Displayable, index: number) {
	selectedItems.value.splice(index, 1);
	filteredItems.value.push(item);

	selectedItems.value = sortDisplayable(selectedItems.value);
	filteredItems.value = sortDisplayable(filteredItems.value);
}
function clearItemsSelection() {
	selectedItems.value.length = 0;
}
function getSelectedItems(): Displayable[] {
	return selectedItems.value;
}
// -----------------------------------------------------------------------------------------------
// </editor-fold>
// ***********************************************************************************************

// ***********************************************************************************************
// <editor-fold defaultstate="collapsed" desc="// SubItems Functions">
// -----------------------------------------------------------------------------------------------
function selectSubItem(subItem: Displayable, index: number) {
	selectedSubItems.value.push(subItem);
	subItemsCopy.value.splice(index, 1);

	selectedSubItems.value = sortDisplayable(selectedSubItems.value);
	subItemsCopy.value = sortDisplayable(subItemsCopy.value);
}
function deSelectSubItem(subItem: Displayable, index: number) {
	selectedSubItems.value.splice(index, 1);
	subItemsCopy.value.push(subItem);

	selectedSubItems.value = sortDisplayable(selectedSubItems.value);
	subItemsCopy.value = sortDisplayable(subItemsCopy.value);
}
function clearSubItemsSelection() {
	selectedSubItems.value.length = 0;
}
function getSelectedSubItems(): Displayable[] {
	return selectedSubItems.value;
}
// -----------------------------------------------------------------------------------------------
// </editor-fold>
// ***********************************************************************************************

// ***********************************************************************************************
// <editor-fold defaultstate="collapsed" desc="// General Functions">
// -----------------------------------------------------------------------------------------------
function clearInputs() {
	searchedItem.value = '';
	filterItem();

	clearItemsSelection();
	clearSubItemsSelection();
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
	gsap.to(element, {
		opacity: 1,
		duration: 0.15,
		onComplete: done,
	});
}

function leave(element: HTMLDivElement, done: Callback) {
	gsap.to(element, {
		opacity: 0,
		duration: 0.15,
		onComplete: done,
	});
}
function toggleTools() {
	if (mainView.value) {
		if (openToolsManager.value) {
			gsap.to(mainView.value, { translateX: 0, duration: 0.5 });
			openToolsManager.value = false;
		} else {
			gsap.to(mainView.value, { translateX: -mainView.value!.offsetWidth / 2, duration: 0.5 });
			openToolsManager.value = true;
		}
	}
}
function resetTools() {
	toggleTools();
	clearSubItemsSelection();
}
// -----------------------------------------------------------------------------------------------
// </editor-fold>
// ***********************************************************************************************

// ***********************************************************************************************
// <editor-fold defaultstate="collapsed" desc="// Emit Functions">
// -----------------------------------------------------------------------------------------------
function emitAddItem() {
	emit('addItem');
}
// -----------------------------------------------------------------------------------------------
// </editor-fold>
// ***********************************************************************************************
onMounted(() => {
	if (props.items) {
		if (props.selectedItems && props.selectedItems.length !== 0) {
			filteredItems.value = props.items.filter((el) => {
				let result = false;
				props.selectedItems!.forEach((item) => {
					if (item.name !== el.name) {
						result = true;
					}
				});
				return result;
			});
		} else {
			filteredItems.value = [...props.items];
		}
	}
	if (props.subItems) {
		subItemsCopy.value = [...props.subItems];
	}
});

watchEffect(() => {
	if (props.selectedItems) {
		selectedItems.value = [...props.selectedItems];
	}
});

defineExpose({
	resetTools, clearInputs, getSelectedItems, getSelectedSubItems,
});
</script>

<template>
	<div class="selector">
		<input v-if="!openToolsManager" v-model="searchedItem" @keyup="filterItem" class="form__input" type="text" :placeholder="props.text">
		<div   v-if="openToolsManager" class="selector__inputs flex row justify-start align-center">
			<slot name="inputs"></slot>
		</div>
		<div class="selector__tools flex row justify-start align-start">
			<button @click="toggleTools" v-if="tools" :title="openToolsManager ? 'Menu selectionner' : 'Menu ajouter'" class="selector__tool hoverable icon">
				<font-awesome-icon v-if="!openToolsManager" icon="plus"></font-awesome-icon>
				<font-awesome-icon v-if="openToolsManager" icon="arrow-left"></font-awesome-icon>
			</button>
			<button @click="emitAddItem" v-if="openToolsManager" title="Valider l'ajout" class="selector__tool hoverable icon">
				<font-awesome-icon  icon="check"></font-awesome-icon>
			</button>
		</div>
		<div class="selector__mask">
			<div ref="mainView" class="selector__view flex row justify-center align-stretch">
				<div class="selector__content flex row justify-start align-start">
					<transition-group name="staggered-fade" :css="false" @before-enter="beforeEnter" @enter="enter" @leave="leave">
						<Card @click="selectItem(item, index)" v-for="(item, index) in filteredItems" :key="item.id" selectable>{{ item.name }}</Card>
					</transition-group>
				</div>
				<div class="selector__option flex row justify-start align-stretch">
					<div class="selector__sub-item flex row justify-start align-start">
						<Card @click="selectSubItem(subItem, index)" v-for="(subItem, index) in subItemsCopy" :key="subItem.id" selectable>{{ subItem.name }}</Card>
					</div>
					<div class="selector__sub-item flex row justify-start align-start">
						<Card @close="deSelectSubItem(subItem, index)" v-for="(subItem, index) in selectedSubItems" :key="subItem.id" type="success" removable >{{ subItem.name }}</Card>
					</div>
				</div>
			</div>
		</div>
		<div v-if="selectedItems.length !== 0" class="cards flex row justify-start align-center">
			<transition-group name="fade">
				<Card @close="deSelectItem(item, index)" v-for="(item, index) in selectedItems" :key="item.id" type="success" removable >{{ item.name }}</Card>
			</transition-group>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.selector {
	width: 100%;
	background-color: lighten($shadowColor, 45%);
	border-radius: 6px;
	padding: 0.5rem;
	position: relative;
}
.selector__inputs {
	gap: 1rem;
}
.selector__tools {
	margin-left: 0.25rem;
	position: absolute;
	right: 1rem;
	top: 0.75rem;
	z-index: 4;
}
.selector__mask {
	width: 100%;
	overflow: hidden;
}
.selector__view {
	width: 200%;
}
.selector__content {
	width: 100%;
	margin-top: 0.5rem;
	flex-wrap: wrap;
	gap: 0.5rem;
	height: auto;
	max-height: 5rem;
	overflow-y: auto;
}
.selector__option {
	width: 100%;
	margin-top: 0.5rem;
	gap: 1rem;
	height: auto;
	max-height: 5rem;
	overflow-y: auto;
}
.selector__item {
	background-color: $mainColor1;
	padding: 0.2rem 0.5rem 0.2rem 0.5rem;
	border-radius: 6px;
}
.selector__tool {
	color: $mainColor1;
	border-radius: 6px;
	margin-left: 0.5rem;

	&:nth-child(2) {
		color: $successColor;
	}
}
.selector__sub-item {
	flex-wrap: wrap;
	gap: 0.5rem;
	flex-basis: 50%;
}
.cards {
	gap: 0.5rem;
	margin-top: 1rem;
	flex-wrap: wrap;
	max-height: 5rem;
	width: 100%;
	overflow-y: auto;
}
</style>
