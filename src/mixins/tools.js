'use stict'
import auth from '@/auth'

export const tools = {
	
	data() {
		return {}
	},
	
	methods: {
        notEmptyObject(obj) {
            return Object.keys(obj).length
        },

		_req(url, params, check_auth = true) {
			return new Promise((resolve, reject) => {

				const requestOptions = {
					method: "POST",
					headers: { 
						'Access-Control-Allow-Origin': '*',
						'Content-Type': 'application/json',
						'Authorization': auth.getAuthHeader(),
					},
					body:  JSON.stringify(params),
				};
				
				fetch(this.$hostname + url, requestOptions)
					.then(async response => {
						let message = null
						const data = await response.json();

						if (check_auth) {
							if (!response.ok) {
								switch (response.status) {
									case 401: auth.logout(this); break;
									case 400: message = data.status; break;
								}
								return Promise.reject(message);
							}
							if(!auth.checkStatus(this, data.status)) {
								return Promise.reject(data.status);
							}
						}

						resolve(data)
					}).catch(error => {	
						console.log('[tools.js] error:', error)
						
						this.$buefy.snackbar.open({
							duration: 3000,
							message: error,
							position: 'is-top-right',
							type: 'is-danger'
						})

						reject(error)
					}).finally(() => {});
			});
		},
		
		_formReq(url, params) {
			return new Promise((resolve, reject) => {

				const requestOptions = {
					method: "POST",
					headers: { 
						'Access-Control-Allow-Origin': '*',
						'Authorization': auth.getAuthHeader(this),
					},
					body: params,
				};
				
				fetch(this.$hostname + url, requestOptions)
				.then(async response => {
					let message = ''
					const data = await response.json();
					// console.log('data: ', data);
					
					if (!response.ok) {
						switch (response.status) {
							case 301: this.$router.push(data); break; // '/banned'
							case 401: auth.logout(this); break;
							case 400: message = data.status; break;
						}
						reject(message)
					}
					if(!auth.checkStatus(this, data.status)) {
						reject(message)
					}

					resolve(true)
					
				}).catch(error => {	
					console.log('error', error)
					reject(error)
				}).finally(() => {});
			});
		},

		getDateTime() {
			var today = new Date();
			const date_time = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
			return date_time
		},
	},

}



// import {tools} from '@/mixins/tools'
// mixins: [tools],