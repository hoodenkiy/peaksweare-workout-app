<template>
	<section name="Workout Path & Location" class="mb-5">
		<h2 class="text-center mb-4 text-info display-4">&mdash; Workout Path & Location &mdash;</h2>
		<GmapMap
			:center="center"
			:zoom="11.5"
			style="width: 100%; min-height: 400px"
			:disable-default-ui="true"
			:options="mapOptions"
			v-if="mapDataReady"
		>

			<gmap-polyline
				v-for="(path, i) in paths"
				:path.sync="path"
				:options="{ strokeColor: i === 0 ? 'green' : 'red'}"
				:key="`path-${i}`"
			/>
		</GmapMap>
		<pulse-loader
			:loading="!mapDataReady"
			color="#ccc"
			size="25px"
		/>
	</section>
</template>

<script>

import { mapState, mapActions } from 'vuex';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

export default {
	components: {
		PulseLoader
	},
	data() {
		return {
			mapDataReady: false,
			mapOptions: {
				disableDefaultUI: true
			},
			paths: []
		};
	},
	computed: {
		...mapState([
			'chartDataSet',
			'chartDataSetTimes',
			'workoutData'
		]),
		center() {
			if (!this.paths || !this.paths.length) {
				return	;
			}

			return {
				lat: this.paths[0][0].lat,
				lng: this.paths[0][0].lng
			};
		}
	},
	methods: {
		...mapActions([
			'fetchMapData'
		]),
		handleRange
	},
	mounted() {
		this.fetchMapData()
			.then(pathArray => {
				this.paths.push(pathArray);
				this.mapDataReady = true;
			});

		// add an appropriate event listener
		document.addEventListener('custom-range', this.handleRange);
	}
};

function handleRange(event) {
			const startIndex = this.chartDataSet.indexOf(event.detail[0]);
			const endIndex = this.chartDataSet.indexOf(event.detail[event.detail.length-1]);

			const startTime = this.chartDataSetTimes[startIndex];
			const endTime = this.chartDataSetTimes[endIndex];

			const range = {startTime, endTime}

			this.fetchMapData(range)
				.then(pathArray => {
					this.paths.push(pathArray);
				});
}

</script>
