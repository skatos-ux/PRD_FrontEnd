<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useStore } from '@/store';
import Error from '@/components/atoms/Error.vue';

const store = useStore();

const hasSignedUp = ref(false);
const firstname = ref('');
const email = ref('');
const password = ref('');
const rePassword = ref('');
const errors = ref([]);

function register(): void {
	store.dispatch('signup', { firstname, email, password });
}

onMounted(() => {
});

</script>

<template>
	<div class="page page--scroll flex center">
		<div v-if="!hasSignedUp">
			<form class="form flex column content-start align-end">
				<label for="firstname" class="form__label text-left">Prénom</label>
				<input v-model="firstname" id="firstname" class="form__input" type="text" autocomplete="off" placeholder="dupont12">
				<label for="email" class="form__label text-left">Adresse email</label>
				<input v-model="email" id="email" class="form__input" type="email" autocomplete="new-email" placeholder="exemple@xyz.fr">
				<label for="password" class="form__label text-left">Mot de passe</label>
				<input v-model="password" id="password" class="form__input" autocomplete="new-password" type="password">
				<label for="repassword" class="form__label text-left">Confirmer le mot de passe</label>
				<input v-model="rePassword" id="repassword" class="form__input" autocomplete="new-password" type="password">
				<Error v-for="error in errors" :key="error" type="error">{{ error }}</Error>
				<button @click="register" class="button button--success">S'inscrire</button>
			</form>
			<div class="form">
				<p>Déjà inscrit ? <a href="/">Se connecter</a></p>
			</div>
		</div>
		<div v-if="hasSignedUp">
			<div class="flex column center">
				<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 507.2 507.2" style="width: 200px" xml:space="preserve">
                    <circle style="fill:#32BA7C;" cx="253.6" cy="253.6" r="253.6"/>
						<path style="fill:#0AA06E;" d="M188.8,368l130.4,130.4c108-28.8,188-127.2,188-244.8c0-2.4,0-4.8,0-7.2L404.8,152L188.8,368z"/>
						<g>
                            <path style="fill:#FFFFFF;" d="M260,310.4c11.2,11.2,11.2,30.4,0,41.6l-23.2,23.2c-11.2,11.2-30.4,11.2-41.6,0L93.6,272.8c-11.2-11.2-11.2-30.4,0-41.6l23.2-23.2c11.2-11.2,30.4-11.2,41.6,0L260,310.4z"/>
							<path style="fill:#FFFFFF;" d="M348.8,133.6c11.2-11.2,30.4-11.2,41.6,0l23.2,23.2c11.2,11.2,11.2,30.4,0,41.6l-176,175.2c-11.2,11.2-30.4,11.2-41.6,0l-23.2-23.2c-11.2-11.2-11.2-30.4,0-41.6L348.8,133.6z"/>
                        </g>
                </svg>
				<p class="register__result">Un email de vérification vous a été envoyé</p>
				<p class="register__result register__result--low">Vous allez être redirigé dans quelques secondes...</p>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.form {
	width: 30rem;
	gap: .5rem;
	padding: 1rem;
	background-color: lighten($mainColor1, 30%);
	border: 1px solid $shadowColor;

	+ .form {
		margin-top: 2rem;
	}
}
.register__result {
	font-weight: bolder;
	margin-top: 1rem;
	&--low {
		margin-top: .5rem;
		font-size: 0.95rem;
	}
}

</style>
