<script lang="ts" setup>
import { defineProps } from 'vue';

defineProps<{ type: string }>();

</script>

<template>
	<p  class="info" :class="`info--${type}`">
		<slot></slot>
	</p>
</template>

<style lang="scss" scoped>
</style>
