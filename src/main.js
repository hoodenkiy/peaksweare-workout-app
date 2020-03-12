import Vue from 'vue';
import App from './App.vue';
import store from './store';

Vue.config.productionTip = false

import * as VueGoogleMaps from 'vue2-google-maps';

Vue.use(VueGoogleMaps, {
	load: {
		key: 'AIzaSyBWr84MyNHj2UuvBC21-JlsoZfkJAZpFK0'
	}
});

new Vue({
	store,
	render: h => h(App),
}).$mount('#app');
