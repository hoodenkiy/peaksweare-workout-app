
<script>

import { Line } from 'vue-chartjs';

export default {
	extends: Line,
	props: {
		chartData: {
			required: true,
			type: Object
		},
		chartOptions: {
			required: true,
			type: Object
		}
	},
	mounted () {
		this.renderChart(this.chartData, this.chartOptions);
	}
};

</script>
