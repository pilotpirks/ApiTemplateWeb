const API_URL = '/auth/'
const LOGIN_URL = API_URL + 'login'
const REG_URL = API_URL + 'register'

function _logout (context) {
	localStorage.removeItem('id_token')
	context.$router.replace('/login')
};

export default {

	login (context, creds) {
		return new Promise((resolve, reject) => {

			const requestOptions = {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(creds),
			};

			fetch(context.$hostname + LOGIN_URL, requestOptions)
				.then(async response => {
					const data = await response.json();

					if (!response.ok) {
						const error = (data && data.status) || response.status;
						return Promise.reject(error);
					}

					if (!data.id_token) {
						const error = 'Проверьте пароль'
						return Promise.reject(error);
					}

					resolve(data)

				}).catch(error => {
					console.error('[auth.js] There was an error!', error);					
					reject(error);
			});
		});
	},

	register (context, creds) {
		return new Promise((resolve, reject) => {

			const requestOptions = {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(creds),
			};

			fetch(context.$hostname + REG_URL, requestOptions)
				.then(async response => {
					const data = await response.json();

					if (!response.ok) {
						const error = (data && data.status) || response.status;
						return Promise.reject(error);
					}

					resolve(data)
				}).catch(error => {
					console.error('[auth.js] There was an error!', error);
					reject(error);
			});
		});
	},
	
	checkStatus (context, status) {
		// console.log('check status:', status)
		if(!status) return true;
				
		if (status.includes('token is expired by') || status.includes('auth error')) {
			if(context.$route.name !== 'Login' || context.$route.name !== 'Registration') {
				_logout(context)
			}				
			return false
		}

		if(status === 'ok') return true;
	},

	logout (context) {
		_logout(context)
	},

	isAuthenticated () {
		if (localStorage.hasOwnProperty('id_token')) {
			return true
		} else {
			return false
		}
	},

	getAuthHeader () {
		return localStorage.getItem('id_token');
	},	
	
}