'use strict';
console.log('!');

var containers = d3.selectAll('[data-decorator="books"]')

containers.each(function(d,i){
	var container = d3.select(this)
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
		
		var table = container.insert('table');

		table.append('thead').selectAll('th')
			.data(['Title','Author',''])
			.enter()
		 	.append('th')
		 	.text(function(d){ return d; })

		table.append('tbody').selectAll('tr')
			.data(dataByDate.slice(0, 10)) //just the first 10
			.enter().append('tr')
				.each(function(row,i){
					d3.select(this).selectAll('td')
						.data(['title','authors','rating'])
							.enter().append('td').text(function(col){
								return row[col]
							});
				})
	});
})

//.select('.loading-text').remove();