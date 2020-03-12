<template>
	<section name="Workout Graph" class="mb-5">
		<h2 class="text-center mb-4 text-info display-4">&mdash; Workout Graph &mdash;</h2>
		<div class="workout-graph mb-5">
			<div class="chart-container">
				<chart 
					:chart-data="chartData"
					:chart-options="chartOptions"
					v-if="dataInitialized"
				/>
			</div>
			<pulse-loader
				color="#ccc"
				size="25px"
				:loading="!dataInitialized"
			/>
		</div>
	</section>
</template>

<script>

import { mapState } from 'vuex';
import chartData from '../mixins/chart-data';
import Chart from './shared/Chart';
import PulseLoader from 'vue-spinner/src/PulseLoader';

export default {
	components: {
		Chart,
		PulseLoader
	},
	computed: {
		...mapState([
			'dataInitialized',
			'workoutData'
		])
	},
	mixins: [chartData]
};

</script>

<style lang="scss" scoped>

.workout-graph {
	display: flex;
	justify-content: center;
	min-height: 300px;

	.chart-container {
		width: 100%;
	}
}

</style>
