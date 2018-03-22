const dataDogs = [];
const dataCats = [];



	function updateType() {
		$.ajax({
			method: "PUT",
			url: "http://localhost:8080/animal/" + 2,
			data: {type: 'cat'}
			// req.body
		}).then(console.log("updated"));
	}

// create Characteristics Table
const createTable = (data, min, max) => {

  if(!min && !max){
    min = 0;
    // max = data.length;
    max = 50;
    console.log(min, max);
  }

  $("#animal-table > tbody").html("");
  for (var i = min; i < max; i++) {

    const id = data[i].id;
    const type = data[i].type;
    const name = data[i].name;
    const body = data[i].body_size;
    const claws = data[i].claws;
    const color = data[i].color;
    const furType = data[i].fur_type;
    const numLegs = data[i].number_of_legs;

    if (type === "dog") {
      dataDogs.push([id, numLegs]);
    } else if (type === "cat") {
      dataCats.push([id, numLegs]);
    }

    $("#animal-table > tbody").append(`<tr>
  <td>
    <input type="checkbox" name="checkbox" value="checkbox">
  </td>
  <td> ${id} </td>
  <td> ${type} </td>
  <td>${name}</td>
  <td>${body}</td>
  <td>${claws}</td>
  <td>${color}</td>
  <td>${furType} </td>
  <td>${numLegs}</td>
</tr>`);
  }
}
// make ajax call when zoom event happens to reRender Table
const renderTable = (min, max) => {
  $.ajax({url: "http://localhost:8080/animals", method: "GET"}).then(function(data) {
    createTable(data, min, max);
  });
}


// create initial chart and table
$.ajax({url: "http://localhost:8080/animals", method: "GET"}).then(function(data) {

  createTable(data, 0, 50);

  Highcharts.chart('container', {
    chart: {
      type: 'scatter',
      zoomType: 'xy'
    },
    title: {
      text: 'Number of Legs vs. IDs of 2600 Animals by Dog or Cat Type'
    },
    subtitle: {
      text: 'Source: Animals API'
    },
    xAxis: {
      title: {
        enabled: true,
        text: 'Animal IDs'
      },
      minRange: 1,
      allowDecimals: false,
      startOnTick: true,
      endOnTick: true,
      showLastLabel: true,
      events: {
        setExtremes: function(e) {
          renderTable(Math.ceil(e.min), Math.ceil(e.max));
          console.log("e", e);
        }
      }
    },
    yAxis: {
      title: {
        text: 'Number of Legs'
      },
      tickInterval: 1,
      minRange: 1,
      allowDecimals: false
    },
    legend: {
      layout: 'vertical',
      align: 'left',
      verticalAlign: 'top',
      x: 100,
      y: 70,
      floating: true,
      backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
      borderWidth: 1
    },
    plotOptions: {
      scatter: {
        marker: {
          radius: 5,
          states: {
            hover: {
              enabled: true,
              lineColor: 'rgb(100,100,100)'
            }
          }
        },
        tooltip: {
          headerFormat: '<b>{series.data}</b><br>',
          pointFormat: '{point.x} , {point.y} '
        }
      }
    },
    series: [
      {
        name: 'Dog',
        color: 'rgba(223, 83, 83, .5)',
        data: dataDogs

      }, {
        name: 'Cat',
        color: 'rgba(119, 152, 191, .5)',
        data: dataCats
      }
    ]
  });
});

// for rendering outside of mulitple ajax calls
// see color-combo in high-charts-1
// $('#container').highcharts(json);
