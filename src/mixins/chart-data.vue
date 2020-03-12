<script>

import { mapState, mapMutations, mapActions } from 'vuex';

export default {
	computed: {
		...mapState([
			'chartDataSet',
			'chartDataSetTimes',
			'workoutData'
		]),
		chartData() {
				return {
					labels: this.labels,
					datasets: [
						{
							label: 'Data Two',
							data: [...this.chartDataSet], // we copy the existing dataset
							borderWidth: 3,
							backgroundColor: 'rgb(255, 99, 132)',
							pointBackgroundColor: [],
							pointBorderColor: [],
							borderColor: 'rgb(255, 99, 132)', // should probably com from a constant
							fill: false,
							pointRadius: [5],
							pointHoverRadius: 7
						},
						{
							label: 'Data One',
							data: this.chartDataSet,
							borderColor: 'rgb(54, 162, 235)',
							backgroundColor: 'rgb(54, 162, 235)',
							pointBackgroundColor: [],
							pointBorderColor: [],
							fill: false,
							pointRadius: [5],
							pointHoverRadius: 7
						}
					]
				}
			},
			chartOptions() {
				return {
					onClick(evt) {
						var activePoint = this.getElementsAtEvent(evt)[0];

						if (activePoint !== undefined) {
							// add start and end to the window
							if (!window.workOutInterval) {
								window.workOutInterval = [];
							}
							// if more than 2 points have been selected, clear array
							if (window.workOutInterval.length >= 2) {
								window.workOutInterval = [];
							}
							// when clicking on a datapoin increase point radius
							this.data.datasets[0].pointRadius[activePoint._index] = 7;

							// record data points
							if (!window.workOutInterval.length <= 2) {
								const dataPoint = this.data.datasets[activePoint._datasetIndex].data[activePoint._index];
								window.workOutInterval.push(dataPoint);

								// if we have 2 data point emit the event
								if (window.workOutInterval.length == 2) {
									// update datapoints
									// grab indexes of the points in the dataset array
									const start = this.data.datasets[0].data.indexOf(window.workOutInterval[0]);
									const end = this.data.datasets[0].data.indexOf(window.workOutInterval[1]);
									
									// fill underlaying dataset/array with nan values, but not the range 
									this.data.datasets[0].data.fill(NaN, 0, start);
									this.data.datasets[0].data.fill(NaN, end+1);

									// create and dispatch the event
									// emit data point values for a range
									const event = new CustomEvent('custom-range', {
										detail: window.workOutInterval
									});
									// send the array to the document
									document.dispatchEvent(event);
								}
							}
						}
						// update the chart
						this.update();
					},
					elements: {
						line: {
							tension: 0
						}
					},
					responsive: true,
					maintainAspectRatio: false,
					legend: {
						display: false,
					},
					tooltips: {
						enabled: false
					},
					layout: {
						padding: {
							left: 0,
							right: 0,
							top: 0,
							bottom: 0
						}
					},
					scales: {
						yAxes: [{
							scaleLabel: {
								display: true,
								labelString: 'Power'
							}
						}],
						xAxes: [{
							scaleLabel: {
								display: true,
								labelString: `Time in ${this.timeInterval} intervals`
							}
						}]
					}
				}
			},
	},
	mounted() {
		// in hind sight this should be in actions
		this.buildChartData(this.timeInterval);
		this.buildChartLabels(this.timeInterval);
		this.SET_DATA_INITIALIZED(true);
	},
	data() {
		return {
			labels: [],
			data: [],
			timeInterval: 3
		};
	},
	methods: {
		...mapMutations([
			'SET_DATA_INITIALIZED'
		]),
		...mapActions([
			'buildChartData'
		]),
		buildChartLabels
	}
};

/**
 * Returns an array to be used as a dataset for a chart
 * @param intervalInMinutes
*/
function buildChartLabels(intervalInMinutes) {
	let interval = intervalInMinutes * 60 * 1000;
	let timeFrame = interval;
	let timeInterval = intervalInMinutes;
	
	this.labels = this.workoutData.samples
		.reduce((labelArray, el) => {
			if (timeFrame === el.millisecondOffset) {
				labelArray.push(timeInterval);
				timeInterval += intervalInMinutes;
				timeFrame += interval;
			}

			return labelArray;
		}, []);
}

</script>
