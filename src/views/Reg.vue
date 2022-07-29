<template>
<span>

	<section class="section">
		<div class="columns">
			<div class="column is-4 is-offset-4">

				<h1 class="title">Регистрация</h1>

				<b-field 
					label="Имя пользователя"
					:custom-class="(validation.hasError('form.name')) ? 'has-text-danger' : ''"
					:message="(validation.hasError('form.name')) ? validation.firstError('form.name') : ''"
				>
					<b-input icon="account" v-model="form.name" minlength="6" maxlength="60"></b-input>
				</b-field>

				<b-field 
					label="Пароль"
					:custom-class="(validation.hasError('form.password')) ? 'has-text-danger' : ''"
					:message="(validation.hasError('form.password')) ? validation.firstError('form.password') : ''"
				>
					<b-input icon="form-textbox-password" v-model="form.password" type="password" minlength="12" maxlength="90"></b-input>
				</b-field>

				<b-field 
					label="Пароль повторно"
					:custom-class="(validation.hasError('form.double_password')) ? 'has-text-danger' : ''"
					:message="(validation.hasError('form.double_password')) ? validation.firstError('form.double_password') : ''"
				>
					<b-input icon="form-textbox-password" v-model="form.double_password" type="password" minlength="12" maxlength="90"></b-input>
				</b-field>

				<img :src="captcha.image" alt="capcha" />

				<b-field 
					label="Капча" 
					:custom-class="(validation.hasError('form.captcha_code')) ? 'has-text-danger' : ''"
					:message="(validation.hasError('form.captcha_code')) ? 
						validation.firstError('form.captcha_code') : 
							'5 символов, цифры и нижний регистр'"
				>
					<b-input icon="signature-image" v-model="form.captcha_code" maxlength="5" placeholder=""></b-input>
				</b-field>

				<b-button size="is-small" @click="onReg">Зарегистрироваться</b-button>

				<div class="content">
					<br/>Уже есть аккаунт?
					<router-link :to="`/login`">Войти</router-link>
				</div >

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
	name: 'Registration',

	data () {
		return {
			captcha: {},
			form: {
				name: '',
				password: '',
				double_password: '',
				captcha_code: '',
			},
			submitted: false, 		// check double password
		};
	},

	validators: {
		'form.name': function (value) {
			return this.$validator.value(value || '').required().lengthBetween(6, 60);
		},
		'form.password': function (value) {
			return this.$validator.value(value || '').required().lengthBetween(12, 90);
		},
		'form.double_password, form.password': function (double_password, password) {
			if (this.submitted || this.validation.isTouched('form.double_password')) {
				return this.$validator.value(double_password).required().match(password);
			}
		},
		'form.captcha_code': function (value) {
			return this.$validator.value(value || '').required().length(5);
		},
	},

	methods: {

		getCaptcha () {
			this._req('/auth/captcha', null)
				.then((data) => {
					this.captcha = data.captcha
				});
		},

		onReg() {
			// console.log('form: ', this.form);
			this.submitted = true;
			this.form.captcha_id = this.captcha.id

			this.$validate().then((ok) => {
				if (ok) {
					auth.register(this, this.form).then((data) => {
						this.$router.replace('/login')
					}).catch(error => {
						this.getCaptcha()
						this.form.captcha_code = ''
						this.error = error

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
