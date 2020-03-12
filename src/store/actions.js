import * as types from './mutation-types';

/**
 * Returns an array of objects with geolocation data
 * we do not necesaily want to return every data point
 * @param pointFrequency
*/
export const fetchMapData = ({ state }, range, pointFrequency = 15) => {
	if (!state.workoutData.samples) {
		return;
	}

	let flag = false;

	return state.workoutData.samples
		.reduce((wayPoints, el ,index) => {
			// grab geo coordinates at a point interval
			if (!range && index % pointFrequency === 0
				&& el.values.positionLat
				&& el.values.positionLong
				) {
					wayPoints.push({
						lat: el.values.positionLat,
						lng: el.values.positionLong
					});
			}
			
			// debugger
			if (range && range.startTime === el.millisecondOffset
				|| range && range.endTime === el.millisecondOffset ) {
				flag = !flag;
			}

			if (flag && el.values.positionLat
				&& el.values.positionLong) {
				wayPoints.push({
					lat: el.values.positionLat,
					lng: el.values.positionLong
				});
			}

			return wayPoints;
		}, []);

};

/**
 * Returns an an object with values for best
 * effort in a datapoint for a given time interval
 * @param intervalInMinutes
*/
export const calculateBestEffort = ({ state, commit }, intervalInMinutes = 20) => {
	if (!state.workoutData.samples) {
		return;
	}

	const interval = intervalInMinutes * 60 * 1000;

	// timeframe is a point in time when an interval ends
	let timeFrame = interval;

	// Here we define a counter for each datapoint
	let powerPerInterval = 0;
	let heartRatePerInterval = 0;
	let cadencePerInterval = 0;
	let temperaturePerInterval = 0;
	let elevationPerInterval = 0;
	let distancePerInterval = 0;
	let speedPerInterval = 0;

	// seconds or iterations (we track this to find the average)
	let seconds = 0;

	const bestEffort = state.workoutData.samples
		.reduce((acc, el, index) => {
			
			if (el.values) {
				// get the values from the current element
				const { heartRate, cadence, power, temperature, elevation, distance, speed } = el.values;

				// update per interval counters if there is a value
				powerPerInterval += power ? power : 0;
				heartRatePerInterval += heartRate ? heartRate : 0;
				cadencePerInterval += cadence ? cadence : 0;
				temperaturePerInterval += temperature ? temperature : 0;
				elevationPerInterval += elevation ? elevation : 0;
				distancePerInterval += distance ? distance : 0;
				speedPerInterval += speed ? speed : 0;
			}

			// we keep track of the seconds
			// essentially this counts elements
			seconds++;

			// if we found the end of our timeframe or if this is the end of a data set
			if (timeFrame === el.millisecondOffset
				|| index === state.workoutData.samples.length - 1) {

				// add interval values to our accumulator
				acc.heartRate.values.push(heartRatePerInterval / seconds);
				acc.power.values.push(powerPerInterval / seconds);
				acc.cadence.values.push(cadencePerInterval / seconds);
				acc.temperature.values.push(temperaturePerInterval / seconds);
				acc.speed.values.push(speedPerInterval / seconds);
				acc.distance.values.push(distancePerInterval / seconds);
				acc.elevation.values.push(elevationPerInterval / seconds);

				// we reset the per interval counters
				powerPerInterval = 0;
				heartRatePerInterval = 0;
				cadencePerInterval = 0;
				temperaturePerInterval = 0;
				elevationPerInterval = 0;
				distancePerInterval = 0;
				speedPerInterval = 0;

				// we add timframe and our original interval
				// which so that we can detect when
				// the next 5 minute stretch will end
				timeFrame += interval;

				// We reset the seconds / iterations
				// so that we 
				seconds = 0;
			}

			return acc;
		}, { // we begin with this object, this is an accumulator
			cadence: {
				values: [],
				label: 'Cadence'
			},
			distance: {
				values: [],
				label: 'Distance'
			},
			elevation: {
				values: [],
				label: 'Elevation'
			},
			heartRate: {
				values: [],
				label: 'Heart Rate'
			},
			power: {
				values: [],
				label: 'Power'
			},
			temperature: {
				values: [],
				label: 'Temperature'
			},
			speed: {
				values: [],
				label: 'Speed'
			}
		});

	commit(types.SET_BEST_EFFORT, bestEffort);
};

/**
 * Returns an array to be used as a dataset for a chart
 * @param intervalInMinutes
*/
export const buildChartData = ({ state, commit }, intervalInMinutes = 5) => {
	// this is the minute interval in miliseconds
	let interval = intervalInMinutes * 60 * 1000;

	// timeframe is a point in time when an interval ends
	let timeFrame = interval;

	// total power during an interval
	let powerPerInterval = 0;

	// seconds / iterations (we track this to find the average)
	let seconds = -1;

	const chartDataSetTimes = [];

	const chartDataSet = state.workoutData.samples
		.reduce((chartData, el, index) => {
			// we ad power values
			powerPerInterval += el.values.power;
			// we keep track of the seconds
			// essentially this counts elements
			seconds++;

			// when the timframe eg 5min * 1000 === el.millisecondOffset
			// this means we are at the end of 5 min interval
			if (timeFrame === el.millisecondOffset) {
				// we add find the power average and add it to our accumulator
				chartData.push(powerPerInterval / seconds);
				chartDataSetTimes.push(state.workoutData.samples[index-seconds].millisecondOffset);
				// we reset the power Interval
				powerPerInterval = 0;

				// we add timframe and our original interval
				// which so that we can detect when
				// the next 5 minute stretch will end
				timeFrame += interval;

				// We reset the seconds / iterations
				// so that we 
				seconds = 0;
			}

			return chartData;
		}, []);

	commit(types.SET_CHART_DATA_SET, chartDataSet);
	commit(types.SET_CHART_DATA_SET_TIMES, chartDataSetTimes);
};
