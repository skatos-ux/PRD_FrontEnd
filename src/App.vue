<script lang="ts" setup></script>

<template>
	<router-view/>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap');
@import "src/styles/global";

* {
	font-family: Montserrat, sans-serif;
	box-sizing: border-box;
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}

.svg-inline--fa {
	height: auto;
}
</style>
