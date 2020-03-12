import * as types from './mutation-types';

export default {
	[types.SET_DATA_INITIALIZED](state, payload){
		state.dataInitialized = payload;
	},
	[types.SET_BEST_EFFORT](state, payload){
		state.bestEffort = payload;
	},
	[types.SET_CHART_DATA_SET](state, payload){
		state.chartDataSet = payload;
	},
	[types.SET_CHART_DATA_SET_TIMES](state, payload){
		state.chartDataSetTimes = payload;
	}
};
