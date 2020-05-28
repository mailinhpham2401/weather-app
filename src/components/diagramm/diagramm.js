export default {
	name: 'diagramm',
	components: {},
	props: ['query'],
	data () {
	  return {
		  api_key: 'c9f562aaffcdefaf40f2ed808d202c9b',
		  url_base: 'https://api.openweathermap.org/data/2.5/',
		  query: '',
		  weather: {},
		  dates: [],
		  temps: [],
		  scaleFontColor:'white'
	  }
	},
	computed: {
  
	},
	mounted () {
  
	},
	methods: {
	  getData() {
		  axios
			  .get(`${this.url_base}forecast?APPID=${this.api_key}&q=${this.query}&units=metric`)
			  .then(res => {
				  this.dates = res.data.list.map(list => {
					  return list.dt_txt;
				  });
				  this.temps = res.data.list.map(list => {
					  return list.main.temp;
				  });
				  var datatables_plugin = [
				  Chart.defaults.global.plugins.datalabels.align = 'top',
				  Chart.defaults.global.defaultFontColor = 'white'
				  ];
				  var ctx = document.getElementById('myChart');
				  datatables_plugin ;
				  this.chart = new Chart(ctx, {
					  type: 'line',
					  data: {
						  labels: this.dates,
						  datasets: [
							  {
								  label: 'Durchschnitttemp',
								  borderColor: 'black',
								  pointBorderColor: 'black',
								  pointBackgroundColor: 'black',
								  fill: false,
								  data: this.temps
							  }
						  ]
					  },
					  options: {
						  legend:{
							  labels:{
								  fontColor:'white'
							  }
						  },
						  scaleFontColor:'white',
						  plugins:{
							 datalabels:{
								 formatter:function(value){
									 return value + '°C';
								 }
							 }
						  },
						  tooltips: {
							  callbacks: {
								  label: function (tooltipItem, data) {
									  var label = data.datasets[tooltipItem.datasetIndex].label || '';
  
									  if (label) {
										  label += ':';
									  }
  
									  label += Mathfloor(tooltipItem.yLabel);
									  return label + '°C';
								  }
							  }
						  },
						  scales: {
							  xAxes: [
								  {
									  type: 'time',
									  time: {
										  unit: 'hour',
										  displayFormats: {
											  hour: 'D MMM hA'
										  },
										  tooltipFormat: 'D MMM hA'
									  },
									  ticks: {
										  fontColor:'white'
									  }
								  },	
							  ],
							  yAxes: [
								  {
									  ticks: {
										  callback: function (value, index, values) {
											  return value + '°C';
										  },
									  fontColor:'white'
									  }
								  }
							  ]
						  }
					  }
				  })
			  })
	  },
  
	  ChartDefault() {
		  if (navigator.geolocation) {
			  navigator.geolocation.getCurrentPosition(position => {
				  axios
					  .get(`${this.url_base}forecast?APPID=${this.api_key}&lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`)
					  .then(res => {
						  this.dates = res.data.list.map(list => {
							  return list.dt_txt;
						  });
						  this.temps = res.data.list.map(list => {
							  return list.main.temp;
						  });
						  var datatables_plugin = [
							  Chart.defaults.global.plugins.datalabels.align = 'top',
							  Chart.defaults.global.defaultFontColor = 'white'
							  ];
							  datatables_plugin ;
						  var ctx = document.getElementById('myChart');
						  this.chart = new Chart(ctx, {
							  type: 'line',
							  data: {
								  labels: this.dates,
								  datasets: [{
								  label: 'Durchschnitttemp',
								  borderColor: 'black',
								  pointBorderColor: 'black',
								  pointBackgroundColor: 'black',
								  fill: false,
								  data: this.temps
								  }]
							  },
							  options: {
								  legend:{
									  labels:{
										  fontColor:'white'
									  }
								  },
								  scaleFontColor:'white',
								  plugins:{
									 datalabels:{
										 formatter:function(value){
											 return value + '°C';
										 }
									 }
								  },
								  tooltips: {
									  callbacks: {
										  label: function (tooltipItem, data) {
											  var label = data.datasets[tooltipItem.datasetIndex].label || '';
	  
											  if (label) {
												  label += ':';
											  }
	  
											  label += Mathfloor(tooltipItem.yLabel);
											  return label + '°C';
										  }
									  }
								  },
								  scales: {
									  xAxes: [
										  {
											  type: 'time',
											  time: {
												  unit: 'hour',
												  displayFormats: {
													  hour: 'D MMM hA'
												  },
												  tooltipFormat: 'D MMM hA'
											  },
											  ticks: {
												  fontColor:'white'
											  }
										  },	
									  ],
									  yAxes: [
										  {
											  ticks: {
												  callback: function (value, index, values) {
													  return value + '°C';
												  },
											  fontColor:'white'
											  }
										  }
									  ]
								  }
							  }
						  })
					  })
			  })
		  };
	  }
	}
  }
  
  
  


