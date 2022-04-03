<script lang="ts" setup>
import { onMounted } from 'vue';
import { useStore } from '@/store';

onMounted(() => {
	const store = useStore();
	store.dispatch('disconnect');
});
</script>

<template>
	<div>
		Name is Logout
	</div>
</template>

<style lang="scss" scoped>

</style>
