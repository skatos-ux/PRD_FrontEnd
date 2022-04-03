<script lang="ts" setup>
import { PropType, ref, defineProps } from 'vue';
import { Displayable } from '@/models/Displayable';

import Card from '@/components/atoms/Card.vue';
import { sortDisplayable } from '@/utils/globals';
// ***********************************************************************************************
// VARIABLES
// -----------------------------------------------------------------------------------------------
const props = defineProps({
	items: {
		type: Object as PropType<Displayable[]>,
		required: true,
	},
});

const itemsCopy = ref<Displayable[]>([...props.items]);
const selectedItems = ref<Displayable[]>([]);
// ***********************************************************************************************

function selectItem(item: Displayable, index: number) {
	selectedItems.value.push(item);
	itemsCopy.value.splice(index, 1);

	selectedItems.value = sortDisplayable(selectedItems.value);
	itemsCopy.value = sortDisplayable(itemsCopy.value);
}
function deSelectItem(item: Displayable, index: number) {
	selectedItems.value.splice(index, 1);
	itemsCopy.value.push(item);

	selectedItems.value = sortDisplayable(selectedItems.value);
	itemsCopy.value = sortDisplayable(itemsCopy.value);
}

</script>

<template>
	<div class="modifier">
		<div class="modifier__content flex row justify-between align-stretch">
			<div class="modifier__section flex column justify-start align-center">
				<slot name="mod_title"></slot>
				<div class="modifier__container flex justify-start align-start">
					<Card class="selectable" @click="selectItem(item, index)" movable-left v-for="(item, index) in itemsCopy" :key="item.name">{{ item.name }}</Card>
				</div>
			</div>
			<div class="divider divider--h"></div>
			<div class="modifier__section flex column justify-start align-center">
				<slot name="del_title"></slot>
				<div class="modifier__container flex justify-start align-start">
					<Card class="selectable" @click="deSelectItem(item, index)" movable-right v-for="(item, index) in selectedItems" :key="item.name">{{ item.name }}</Card>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.modifier {
	width: 100%;
	background-color: lighten($shadowColor, 45%);
	border-radius: 6px;
	padding: 0.5rem;
	position: relative;
}
.modifier__content {
	height: 10rem;
}
.modifier__section {
	flex: 1;
}
.modifier__container {
	margin-top: 0.5rem;
	flex-wrap: wrap;
	gap: 0.5rem;
	width: 100%;
	max-height: 15rem;
	overflow-y: auto;
}
.divider {
	margin-inline: 1rem;
	background-color: darken($shadowColor, 10%);
	&--h {
		height: auto;
	}
}
</style>
