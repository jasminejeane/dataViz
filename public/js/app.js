let numRows;
let mainChart;
$(document).ready(function() {

  let rowCount = 3;

  $('#showMore').click(function() {
    rowCount = (rowCount + 5 <= numRows)
      ? rowCount + 5
      : numRows;

    $('#animal-table tr:lt(' + rowCount + ')').show();
  });

  $('#showLess').click(function() {
    rowCount = (rowCount - 5 < 0)
      ? numRows - 4
      : rowCount - 5;
    $('#animal-table tr').not(':lt(' + rowCount + ')').hide();
  });

});

// updates animal type on button click
function updateType() {
  $('input[type=checkbox]:checked').each(function() {

    const id = this.attributes[0].value;
    const type = this.attributes[1].value;
    const changeType = (type === 'cat')
      ? 'dog'
      : 'cat';
    const changeEmoji = (type === 'cat')
      ? '&#x1F436'
      : '&#x1F42F';

    $("#type" + id).html(changeEmoji);

    this.checked = false;

    $.ajax({
      method: "PUT",
      url: "http://localhost:8080/animal/" + id,
      data: {
        type: changeType
      }
    }).then(function() {
      console.log("updated", id);
    });

    // functionality to update chart when table is updated
    // var s1 = mainChart.get('dogs');
    // var points = s1.data;
    // var firstPoint = points[0];
    // firstPoint.remove();
    // s1.addPoint({
    //   name: 'dog',
    //    y: 4,
    //    x: 1
    //  });
    // console.log("dogs point", points);
    // mainChart.redraw();
    // https://github.com/highcharts/highcharts/issues/5318
    // https://jsfiddle.net/tpu0fwpe/3/
  });
}
// toggles side bar
const menuClick = () => {
    $("#wrapper").toggleClass("active");
  }

  const dataDogs = [],
    dataCats = [],
    serieName = [];
  let dataAll = [];

  // create Characteristics Table
  const createTable = (data, min, max) => {

    if (!min && !max) {
      min = 0;
      max = 50;
    }

    $("#animal-table > tbody").html("");
    for (let i = min; i < max; i++) {

      const {
        id,
        type,
        name,
        body_size,
        claws,
        color,
        fur_type,
        number_of_legs
      } = data[i];
      let aniEmoji;

      let serieData = {
        x: id,
        y: number_of_legs,
        nameVal: name,
        clawsVal: claws
      }

      if (type === "dog") {
        dataDogs.push(serieData);
        aniEmoji = '&#x1F436';
      } else if (type === "cat") {
        dataCats.push(serieData);
        aniEmoji = '&#x1F42F';
      }

      $("#animal-table > tbody").append(`<tr>
			<td>
			<input data-id=${id} data-type=${type} type="checkbox" name="checkbox" value="checkbox">
			</td>
			<td> ${id} </td>
			<td id="type${id}"> ${aniEmoji}  </td>
			<td>${name}</td>
			<td>${body_size}</td>
			<td>${claws}</td>
			<td>${color}</td>
			<td>${fur_type} </td>
			<td>${number_of_legs}</td>
    </tr>`);

      numRows = $("#animal-table tr").length;
    }
    dataAll = dataDogs.concat(dataCats);
  }

  // re renders the table after zoom
  const renderTable = (min, max) => {
    $.ajax({url: "http://localhost:8080/animals", method: "GET"}).then(function(data) {
      createTable(data, min, max);
    });
  }

  // create initial chart and table
  $.ajax({url: "http://localhost:8080/animals", method: "GET"}).then(function(data) {

    createTable(data, 0, 50);

    mainChart = Highcharts.chart('chart', {
      chart: {
        type: 'scatter',
        zoomType: 'xy',
        plotBackgroundColor: '#1f2237',
        plotBorderWidth: null,
        plotShadow: true,
        backgroundColor: 'transparent',
        events: {
          update: function(e) {
            console.log("updated", e);
          }
        }

      },
      title: {
        text: 'Number of Legs vs. IDs of 2600 Animals by Dog or Cat Type',
        style: {
          color: '#fff'
        }

      },
      subtitle: {
        text: 'Source: Animals API',
        color: '#fff'
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

        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor),
        borderWidth: 1,
        itemStyle: {
          color: '#fff'

        }
      },
      plotOptions: {
        scatter: {
          marker: {
            radius: 5,
            states: {
              hover: {
                enabled: true,
                lineColor: '#2c2f59'
              }
            }
          },
          tooltip: {

            pointFormatter: function() {
              return `ID: <b>${this.x} </b><br>
							Name:<br> <b> ${this.nameVal}</b><br>`;
            }
          }
        }
      },
      series: [
        {
          id: 'dogs',
          name: 'Dog',
          color: '#ccff00',
          turboThreshold: 3000,
          data: dataDogs

        }, {
          id: 'cats',
          name: 'Cat',
          color: '#ff00cc',
          turboThreshold: 3000,
          data: dataCats
        },
        // {
        //   id: 'all',
        //   name: 'All',
        //   color: '#44989e',
        //   turboThreshold: 3000,
        //   data: dataAll
        // }
      ]
    });
  }).fail(function(error) {
    console.error(error);
  });
