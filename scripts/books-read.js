'use strict';

var containers = d3.selectAll('[data-decorator="books"]')

containers.each(function(d,i){
	var container = d3.select(this)
	var csvurl = container.attr('data-location');

	d3.csv(csvurl, function(data){
		data = data.map(function(d){
			d.date = new Date(d.date);
			return d;
		});

		var unread = data.filter(function(a){
			return (String(a.date) === 'Invalid Date');
		});

		var dataByDate = data.sort(function(a, b){
			return b.date.getTime() - a.date.getTime();
		});

		container.select('.loading-text').remove();

		var carousel = container.insert('div').attr('class','double');

		var readTable = carousel.append('table').attr({
			'id':'read-table',
			'class':'half horizontal'
		});
		readTable.call(tableHeadings);
		readTable.call(tableData, dataByDate.slice(0, 10));

		var toReadTable = carousel.append('table').attr({
			'id':'to-read-table',
			'class':'half horizontal'
		});
		toReadTable.call(tableHeadings);
		toReadTable.call(tableData, unread.reverse().slice(0, 10));


		function tableHeadings(g){
			return g.append('thead').selectAll('th')
				.data(['Title','Author',''])
				.enter()
			 	.append('th')
			 	.text(function(d){ return d; });
		}

		function tableData(g, data){
			return g.append('tbody').selectAll('tr')
				.data(data) //just the first 10
				.enter().append('tr')
					.each(function(row,i){
						d3.select(this).selectAll('td')
							.data(['title','authors','rating'])
								.enter().append('td').text(function(col){
									return row[col]
								});
					});
		}

	});
})

//.select('.loading-text').remove();
