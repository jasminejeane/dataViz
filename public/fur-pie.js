$(function() {

  $.ajax({
    url: "http://localhost:8080/animals",
    method: "GET"
  }).then(function(data) {

    var dogTraits = {},
        catTraits = {};
    for (i = 0; i < data.length; i++) {

      if (data[i].type === "dog") {
        if (dogTraits[data[i].fur_type] === undefined) {
          dogTraits[data[i].fur_type] = 1;
        } else if (dogTraits[data[i].fur_type]) {
          dogTraits[data[i].fur_type]++;
        }
      }
      if (data[i].type === "cat") {
        if (catTraits[data[i].fur_type] === undefined) {
          catTraits[data[i].fur_type] = 1;
        } else if (catTraits[data[i].fur_type]) {
          catTraits[data[i].fur_type]++;
        }
      }
    }

    Highcharts.chart('furType', {
      chart: {
        type: 'pie',
        margin: [0, 0, 0, 0]
      },
      subtitle: {
        text: 'Fur Type'
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
            "name": "Striped",
            "y": catTraits.striped + dogTraits.striped,
            "drilldown": "striped"
          },
          {
            "name": "Plain",
            "y": catTraits.plain + dogTraits.plain,
            "drilldown": "plain"
          }
        ]
      }],
      "drilldown": {
        "series": [{
            "name": "Striped",
            "id": "striped",
            "data": [
              [
                "dog",
                dogTraits.striped
              ],
              [
                "cat",
                catTraits.striped
              ],

            ]
          },
          {
            "name": "Plain",
            "id": "plain",
            "data": [
              [
                "dog",
                dogTraits.plain
              ],
              [
                "cat",
                catTraits.striped
              ],
            ]
          }
        ]
      }
    });
  });
});
