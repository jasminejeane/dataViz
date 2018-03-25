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
        margin: [0, 0, 0, 0],
        plotBackgroundColor: '#1f2237',
        plotBorderWidth: null,
        plotShadow: true
      },
      subtitle: {
        text: 'FUR TYPE',
        style: {
          color: '#fff',
         fontWeight: 'bold',
         fontSize: 16
     }
      },
      plotOptions: {
        // pie: {
        //   borderColor: '#ff00cc'
        // },
        series: {
          dataLabels: {
            enabled: true,
            crop: false,
            overflow: "none",
            connectorWidth: 0,
            distance: -30,
            format: '{point.name} <br> {point.percentage:.1f}%',
            style: {
                  textOutline: false
              }
          }
        }
      },

      tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.percentage:.1f}%</b> of total<br/>'
      },

      "series": [{
        "name": "Browsers",
        "colorByPoint": true,
        "data": [{
            "name": "Striped",
            "y": catTraits.striped + dogTraits.striped,
            "drilldown": "striped",
            "color": "#44989e"
          },
          {
            "name": "Plain",
            "y": catTraits.plain + dogTraits.plain,
            "drilldown": "plain",
            "color": "#fff"
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
