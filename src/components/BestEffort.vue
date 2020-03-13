<template>
	<section name="Your Best Effort" class="mb-5">
		<h2 class="text-center mb-4 text-info display-4">&mdash; Your Best Effort &mdash;</h2>
		<div class="row justify-content-center mx-auto w-75" v-if="dataLoaded">
			<div
				class="col-auto"
				:key="`effort-${key}`"
				v-for="(effort, key) in bestEffort"
			>
				<h3
					class="mb-0 font-weight-lighter display-4 text-secondary"
					:class="{'text-success': key === 'power'}"
				>{{ formatEffortValue(effort.values) }}</h3>
				<h4
					class="mb-5"
					:class="{'text-success': key === 'power'}"
				>{{ effort.label }}</h4>
			</div>
		</div>
		<!-- there is a more efficient way to do this -->
		<div class="btn-toolbar justify-content-center" role="toolbar" aria-label="Toolbar with button groups">
			<div class="btn-group mr-2" role="group" aria-label="First group">
				<button
					@click="calculateBestEffort(20)"
					type="button"
					class="btn btn-secondary">20 Min</button>
				<button
					@click="calculateBestEffort(1)"
					type="button"
					class="btn btn-secondary">1 Min</button>
				<button
					@click="calcugslateBestEffort(5)"
					type="button"
					class="btn btn-secondary">5 Min</button>
				<button
					@click="calculateBestEffort(10)"
					type="button"
					class="btn btn-secondary">10 Min</button>
			</div>
		</div>
	</section>
</template>

<script>

import { mapActions, mapState } from 'vuex';

export default {
	data() {
		return {
			dataLoaded: false
		};
	},
	methods: {
		...mapActions([
			'calculateBestEffort'
		]),
		formatEffortValue
	},
	computed: {
		...mapState([
			'bestEffort'
		])
	},
	beforeMount() {
		// dispatch actions to get data
		this.calculateBestEffort(20)
			.then(() => {
				this.dataLoaded = true;
			});
	},
};

/**
 * Returns a formatted value
 * @param intervalInMinutes
*/
function formatEffortValue(effortArray) {
	if (!effortArray || !effortArray.length) {
		return '--';
	}
	const x = Math.max(...effortArray).toFixed(1);

		return x;
}

</script>
