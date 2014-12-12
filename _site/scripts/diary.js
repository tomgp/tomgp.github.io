'use strict'

var containers = d3.selectAll('[data-decorator="diary"]');

containers.each(function(d,i){
	var container = d3.select(this);
	var csvurl = container.attr('data-location');

	d3.csv(csvurl, function(data){
		data = data.map(function(d){
			d.date = new Date(d.date);
			return d;
		});

		var dataByDate = data.sort(function(a, b){
			return b.date.getTime() - a.date.getTime();
		});

		console.log(dataByDate);

		//filter the data...
		container.select('.loading-text').remove();
		
	});
});