<script lang="ts" setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '../store';

const store = useStore();
const router = useRouter();

onMounted(() => {
});

</script>

<template>
	<div class="page hvcentered">
		<h1>Works !
			<font-awesome-icon icon="phone"/>
		</h1>
	</div>
</template>

<style lang="scss" scoped>
</style>
