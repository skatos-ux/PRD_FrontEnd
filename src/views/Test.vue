<script lang="ts" setup>
import { defineProps, onMounted, ref } from 'vue';

defineProps<{ msg: string }>();

const count = ref(0);

onMounted(() => {
});

</script>

<template>
	<div class="page page--fullsize flex center column">
		<h1>{{ msg }}</h1>
		<button class="button" type="submit" @click="count++">{{ count }}</button>
	</div>
</template>

<style lang="scss" scoped>
</style>
