import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';

// home page
import Home from '../pages/Home';

// auth
import SignUp from '../pages/auth/Signup';

// user
import Profile from '../pages/profile/Profile';

// post
import Post from '../pages/posts/Posts';
import PostIndex from '../pages/posts/Index';
import PostShow from '../pages/posts/Show';

Vue.use(VueRouter);

const routes = [
	{
		path: '/login',
		component: Home,
		name: 'home'
	},
	{
		path: '/signup',
		component: SignUp,
		name: 'signup'
	},
	{
		path: '/',
		component: Post,
		meta: {
			requiesAuth: true
		},
		children: [
			{
				path: '/',
				component: PostIndex,
				name: 'post-index'
			},
			{
				path: 'post/:id',
				component: PostShow,
				name: 'post-show'
			},
		]
	},
	{
		path: '/user/:id',
		component: Profile,
		meta: {
			requiesAuth: true
		}
	},
	{ 
		path: '*',
		redirect: '/'
	}
];

const router = new VueRouter({
	mode: 'history',
	linkActiveClass: 'open active',
	base: process.env.BASE_URL,
	routes,
});

router.beforeEach((to, from, next) => {
  const requiesAuth = to.matched.some(record => record.meta.requiesAuth);
	const currentUser = store.getters.currentUser;
	
  if (requiesAuth && !currentUser) {
    next('/login');
  } else if (to.path == '/login' && currentUser) {
    next('/');
  } else {
    next();
  }
})

export default router;