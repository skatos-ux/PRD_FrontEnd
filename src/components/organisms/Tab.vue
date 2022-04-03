<script lang="ts" setup>
import { onMounted } from 'vue';

onMounted(() => {
});

</script>

<template>
	<div class="page page--fullsize">
		<main>
			<router-view  v-slot="{ Component }">
				<transition mode="out-in" name="fade">
					<component :is="Component"/>
				</transition>
			</router-view>
		</main>
	</div>
</template>

<style lang="scss" scoped>
main {
	margin: 1rem;
}
</style>
