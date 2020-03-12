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
		this.calculateBestEffort().then(() => {
			this.dataLoaded = true;
		})
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

	return [... effortArray]
		.sort()
		.reverse()[0]
		.toFixed(1);
}

</script>
