<template>
	<div id="app" class="container">
		<header class="my-5 text-center">
			<h1 class="font-weight-lighter display-3 text-secondary">Workout Stats:</h1>
		</header>
		<main>
			<best-effort />
			<workout-location />
			<workout-graph />
		</main>
	</div>
</template>

<script>

import 'bootstrap/dist/css/bootstrap.min.css';

import BestEffort from './components/BestEffort';
import WorkoutLocation from './components/WorkoutLocation';
import WorkoutGraph from './components/WorkoutGraph';

export default {
	components: {
		BestEffort,
		WorkoutLocation,
		WorkoutGraph
	}
}

</script>
