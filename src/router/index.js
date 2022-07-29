import Vue from 'vue'
import VueRouter from 'vue-router'
import auth from '@/auth'

Vue.use(VueRouter)

const routes = [
	{
		path: '/reg',
		name: 'Registration',
		component: function () {
			return import('@/views/Reg.vue')
		},
		meta: { requiresAuth: false },
	},
	{
		path: '/login',
		name: 'Login',
		component: function () {
			return import('@/views/Login.vue')
		},
		meta: { requiresAuth: false },
	},
	{
		path: '/',
		name: 'Home',
		component: function () {
			return import('@/views/Home.vue')
		},
		meta: { requiresAuth: true },
	},
	{
		path: '/settings',
		name: 'Settings',
		component: function () {
			return import('@/views/Settings.vue')
		},
		meta: { requiresAuth: true },
	},
]

const router = new VueRouter({
	// mode: 'history',
	base: process.env.BASE_URL,
	routes,
});
	
router.beforeEach((to, from, next) => {	

	if (to.matched.some(record => record.meta.requiresAuth)) {
		if (!auth.isAuthenticated()) {
			next('/login')
		} else {
			next()
		}
	} 
	else {
		next()
	}
});

export default router
