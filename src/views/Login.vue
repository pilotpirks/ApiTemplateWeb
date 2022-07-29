<template>
<span>

	<section class="section">
		<div class="columns">
			<div class="column is-4 is-offset-4">

				<h1 class="title">Вход</h1>

				<b-field 
					label="Имя пользователя" message=""
					:custom-class="(validation.hasError('form.name')) ? 'has-text-danger' : ''"
				>
					<b-input 
						validation-message="введите имя пользователя" 
						icon="account" maxlength="90" required
						v-model="form.name" 
					></b-input>
				</b-field>

				<b-field 
					label="Пароль" message=""
					:custom-class="(validation.hasError('form.password')) ? 'has-text-danger' : ''"
				>
					<b-input 
						validation-message="введите пароль" 
						icon="form-textbox-password" 
						v-model="form.password" 
						type="password" maxlength="90" required
					></b-input>
				</b-field>

				<img :src="captcha.image" alt="capcha" />

				<b-field 
					label="Капча" type="" 
					:custom-class="(validation.hasError('form.captcha_code')) ? 'has-text-danger' : ''" 
					:message="(validation.hasError('form.captcha_code')) ? 
						validation.firstError('form.captcha_code') : 
							'5 символов, цифры и нижний регистр'"
				>
					<b-input 
						icon="signature-image" 
						v-model="form.captcha_code" 
						maxlength="5" placeholder=""
					></b-input>
				</b-field>

				<b-button size="is-small" @click="onLogin">Войти в аккуаунт</b-button>

				<div class="content">
					<br/>Еще нет аккаунта?
					<router-link :to="`/reg`">Зарегистрироваться</router-link>
				</div>
			</div>
		</div>
	</section>

</span>
</template>


<script>
import auth from '@/auth'
import {tools} from '@/mixins/tools'

export default {
	mixins: [tools],
	name: 'Login',

	data () {
		return {
			captcha: {},
			form: {
				name: '',
				password: '',
				captcha_code: '',
			},
		}
	},

	validators: {
		'form.name': function (value) {
			return this.$validator.value(value || '').required();
		},
		'form.password': function (value) {
			return this.$validator.value(value || '').required();
		},
		'form.captcha_code': function (value) {
			return this.$validator.value(value || '').required().length(5);
		},
    },

	methods: {

		getCaptcha () {
			this._req('/auth/captcha', null)
				.then((data) => {
					// console.log('/auth/captcha', data)
					this.captcha = data.captcha
				});
		},

		onLogin() {
			this.form.captcha_id = this.captcha.id

			this.$validate().then((ok) => {
				if (ok) {
					auth.login(this, this.form).then((data) => {
						if (data.id_token) {

							localStorage.setItem('id_token', data.id_token)
							this.$router.replace('/')
						}
					}).catch(error => {
						this.getCaptcha()
						this.form.captcha_code = ''
						this.form.otp_code = ''

						this.$buefy.snackbar.open({
							duration: 3000,
							message: error,
							position: 'is-top-right',
							type: 'is-danger'
						})
					});
				}
			});

		},

	},

	computed: {},
	components: {},

	mounted() {
		this.getCaptcha()
	},
}
</script>
