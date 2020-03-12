import Vuex from 'vuex'
import Vue from 'vue'

import state from './state';
import mutations from './mutations';
import * as actions from './actions';

Vue.use(Vuex)

export default new Vuex.Store({
	state,
	getters: {},
	mutations,
	actions
});
