import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
Vue.use(Buefy)

import '@mdi/font/css/materialdesignicons.css';

// https://github.com/semisleep/simple-vue-validator#readme
import SimpleVueValidation from 'simple-vue-validator';
Vue.use(SimpleVueValidation, {templates: {
	error: 'Ошибка.',
	required: 'Поле не должно быть пустым.',
	float: 'Только дробное число.',
	integer: 'Только целое число.',
	number: 'Только число.',
	lessThan: 'Значение должно быть меньше чем {0}.',
	lessThanOrEqualTo: 'Значение должно быть меньше или равно {0}.',
	greaterThan: 'Значение должно быть больше чем {0}.',
	greaterThanOrEqualTo: 'Значение должно быть больше или равно {0}.',
	between: 'Значение должно быть между {0} и {1}.',
	size: 'Размер должен быть {0}.',
	length: 'Длина должна быть {0} символов.',
	minLength: 'Не менее {0} символов.',
	maxLength: 'Не более {0} символов.',
	lengthBetween: 'Длина должна быть между {0} и {1} символами.',
	in: 'Должен содержать {0}.',
	notIn: 'Не должен содержать {0}.',
	match: 'Не совпадает.',
	regex: 'Неверный формат.',
	digit: 'Только числа.',
	email: 'Неверный формат адреса.',
	url: 'Неверный формат ссылки.',

	optionCombiner: function (options) {
		if (options.length > 2) {
			options = [options.slice(0, options.length - 1).join(', '), options[options.length - 1]];
		}
		return options.join(' или ');
	},
}, mode: 'interactive'}); // manual | conservative
Vue.prototype.$validator = SimpleVueValidation.Validator;

Vue.config.productionTip = false
Vue.prototype.$hostname = (process.env.NODE_ENV === 'development') ? 'http://localhost:9090' : '';

new Vue({
	router,
	store,
	render: function (h) { return h(App) }
}).$mount('#app')
