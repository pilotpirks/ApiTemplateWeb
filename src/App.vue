<template>
	<div id="app" class="container is-fluid">
	
			<b-navbar>
				<template #brand>
					<b-navbar-item tag="router-link" :to="{ path: '/' }">
						<!-- <img src="/logo.png" alt="admin-panel logo"> -->
					</b-navbar-item>
				</template>

				<template #start v-if="isAuth()">
					<b-navbar-item tag="router-link" :to="{ path: '/' }">Home</b-navbar-item>
					<b-navbar-item tag="router-link" :to="{ path: '/settings' }">Настройки</b-navbar-item>
				</template>

				<template #end>
					<b-navbar-item tag="div">
						<div class="buttons">
							<template v-if="isAuth()">
								<b-button
									@click="logout"
									type="is-light">
									LogOut
								</b-button>
							</template>

							<template v-if="!isAuth()">
								<b-button tag="router-link"
									to="/login"
									type="is-light">
									LogIn
								</b-button>
							</template>
						</div>
					</b-navbar-item>
				</template>
			</b-navbar>

		<div>
			<router-view></router-view>
		</div>

	</div>
</template>

<script>
import auth from '@/auth'
import {tools} from '@/mixins/tools'

export default {
	mixins: [tools],

	data () {
		return {
			isCollapsible: true,
		}
	},

	methods: {
		logout () {
			auth.logout(this)
		},

		isAuth () {
			return auth.isAuthenticated()
		},

	},

	computed: {},
	created () {},

}
</script>

<style></style>
