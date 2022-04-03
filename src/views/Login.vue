<script lang="ts" setup>
import { ref } from 'vue';
import FeedBack from '@/components/atoms/FeedBack.vue';
import { useStore } from '@/store';

const store = useStore();

const email = ref('');
const password = ref('');
const stayConnected = ref(false);
const errors = ref([]);

function connect(): void {
	store.dispatch('connect', { email, password, stayConnected });
}

</script>

<template>
	<div class="page page--fullsize flex center column">
		<form class="form flex column content-start align-end">

			<label class="form__label form__label--align text-left">Adresse email</label>
			<input id="email" v-model="email" autocomplete="email" class="form__input" placeholder="exemple@xyz.fr" type="email">

			<div class="login__passwords flex row justify-between align-end">
				<label class="form__label form__label--align form__label--nostretch text-left">Mot de passe</label>
				<a class="form__anchor--mini" href="/fpassword">Mot de passe oublié</a>
			</div>
			<input v-model="password" autocomplete="password" class="form__input" type="password">

			<div class="text-right">
				<label class="form__label--mini">Rester connecté</label>
				<input v-model="stayConnected" class="checkbox" type="checkbox">
			</div>

			<FeedBack v-for="error in errors" :key="error" type="error">{{ error }}</FeedBack>

			<button class="button" @click="connect">Connexion</button>
		</form>
		<div class="form">
			<p>Nouveau sur l'application ? <a href="/register">Créer un compte</a></p>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.form {
	width: 22rem;
	gap: .5rem;
	padding: 1rem;
	background-color: lighten($mainColor1, 15%);
	border: 1px solid $shadowColor;

	+ .form {
		margin-top: 2rem;
		font-size: 0.8rem;
		text-align: center;
	}
}
.button {
	width: 100%;
	background-color: darken($mainColor1, 10%);
	color: white;
	margin-top: 0.5rem;
	font-size: 0.9rem;
}

.login__passwords {
	width: 100%;
}
</style>
