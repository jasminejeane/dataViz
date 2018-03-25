let numRows;
const dataDogs = [];
const dataCats = [];

$(document).ready(function() {

  // show more show less for length of rows
  // limit the number of inital rows that show

  // if(numRows <= 10){
  // 	$('#showLess').hide();
  // }else {
  // 	$('#showLess').show();
  // }
  let x = 5;

  $('#showMore').click(function() {
    // console.log(numRows);
    x = (x + 5 <= numRows)
      ? x + 5
      : numRows;
    $('#animal-table tr:lt(' + x + ')').show();
  });

  $('#showLess').click(function() {
    x = (x - 5 < 0)
      ? 10
      : x - 5;
    $('#animal-table tr').not(':lt(' + x + ')').hide();
  });
});

// updates animal type on button click
function updateType() {
  $('input[type=checkbox]:checked').each(function() {

    // const checked = $('input[name=checkbox]:checked');

    const id = this.attributes[0].value;
    const type = this.attributes[1].value;
    const typed = (type === 'cat')
      ? 'dog'
      : 'cat';

    $("#type" + id).html(typed);

    this.checked = false;

    $.ajax({
      method: "PUT",
      url: "http://localhost:8080/animal/" + id,
      data: {
        type: typed
      }
    }).then(function() {
    });

  });
}
// toggles side bar
const menuClick = () => {
  $("#wrapper").toggleClass("active");
}

// create Characteristics Table
const createTable = (data, min, max) => {

  if (!min && !max) {
    min = 0;
    max = 50;
  }

  $("#animal-table > tbody").html("");
  for (var i = min; i < max; i++) {

    // const { id, type } = data[i]
    const id = data[i].id;
    const type = data[i].type;
    const name = data[i].name;
    const body = data[i].body_size;
    const claws = data[i].claws;
    const color = data[i].color;
    const furType = data[i].fur_type;
    const numLegs = data[i].number_of_legs;

    if (type === "dog") {
      dataDogs.push([id, numLegs, body, claws]);
    } else if (type === "cat") {
      dataCats.push([id, numLegs, body, claws]);
    }

    $("#animal-table > tbody").append(`<tr>
			<td>
			<input data-id=${id} data-type=${type} type="checkbox" name="checkbox" value="checkbox">
			</td>
			<td> ${id} </td>
			<td id="type${id}"> ${type} </td>
			<td>${name}</td>
			<td>${body}</td>
			<td>${claws}</td>
			<td>${color}</td>
			<td>${furType} </td>
			<td>${numLegs}</td>
			</tr>`);
  }

  numRows = $("#animal-table tr").length;
  console.log(numRows);
}

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
          headerFormat: '<b>{series.name}</b><br>',
          pointFormat: '{point.x} , {point.y} '
          // pointFormatter: function(){
          // 	console.log(this);
          // }
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
