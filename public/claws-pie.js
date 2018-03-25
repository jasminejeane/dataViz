$(function() {

  $.ajax({
    url: "http://localhost:8080/animals",
    method: "GET"
  }).then(function(data) {

    var dogClaws = {},
        catClaws = {};
    for (i = 0; i < data.length; i++) {

      if (data[i].type === "dog") {
        if (dogClaws[data[i].claws] === undefined) {
          dogClaws[data[i].claws] = 1;
        } else if (dogClaws[data[i].claws]) {
          dogClaws[data[i].claws]++;
        }
      }
      if (data[i].type === "cat") {
        if (catClaws[data[i].claws] === undefined) {
          catClaws[data[i].claws] = 1;
        } else if (catClaws[data[i].claws]) {
          catClaws[data[i].claws]++;
        }
      }
    }

    Highcharts.chart('claws', {
      chart: {
        type: 'pie',
        margin: [0, 0, 0, 0]
      },
      subtitle: {
        text: 'Claws'
      },
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
            crop: false,
            overflow: "none",
            connectorWidth: 0,
            distance: -30,
            format: '{point.name}: {point.y:f}%'
          }
        }
      },

      tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:f}%</b> of total<br/>'
      },

      "series": [{
        "name": "Browsers",
        "colorByPoint": true,
        "data": [{
            "name": "Sharp",
            "y": catClaws.sharp + dogClaws.sharp,
            "drilldown": "sharp"
          },
          {
            "name": "Dull",
            "y": catClaws.dull + dogClaws.dull,
            "drilldown": "dull"
          }
        ]
      }],
      "drilldown": {
        "series": [{
            "name": "Sharp",
            "id": "sharp",
            "data": [
              [
                "dog",
                dogClaws.sharp
              ],
              [
                "cat",
                catClaws.sharp
              ],

            ]
          },
          {
            "name": "Dull",
            "id": "dull",
            "data": [
              [
                "dog",
                dogClaws.dull
              ],
              [
                "cat",
                catClaws.sharp
              ],
            ]
          }
        ]
      }
    });
  });
});
