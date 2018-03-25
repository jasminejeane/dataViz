$(function() {

  $.ajax({
    url: "http://localhost:8080/animals",
    method: "GET"
  }).then(function(data) {

    var dogTraits = {},
        catTraits = {};
    for (i = 0; i < data.length; i++) {

      if (data[i].type === "dog") {
        if (dogTraits[data[i].claws] === undefined) {
          dogTraits[data[i].claws] = 1;
        } else if (dogTraits[data[i].claws]) {
          dogTraits[data[i].claws]++;
        }
      }
      if (data[i].type === "cat") {
        if (catTraits[data[i].claws] === undefined) {
          catTraits[data[i].claws] = 1;
        } else if (catTraits[data[i].claws]) {
          catTraits[data[i].claws]++;
        }
      }
    }

    Highcharts.chart('claws', {
      chart: {
        type: 'pie',
        margin: [0, 0, 0, 0],
      plotBackgroundColor: '#1f2237',
      plotBorderWidth: null,
      plotShadow: true
      },
      // options3d: {
      //   enabled: true,
      //   alpha: 45,
      //   beta: 0
      // },
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
            "name": "Sharp",
            "y": catTraits.sharp + dogTraits.sharp,
            "color": "#44989e",
            "drilldown": "sharp"
          },
          {
            "name": "Dull",
            "y": catTraits.dull + dogTraits.dull,
            "color": "#fff",
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
                dogTraits.sharp
              ],
              [
                "cat",
                catTraits.sharp
              ],

            ]
          },
          {
            "name": "Dull",
            "id": "dull",
            "data": [
              [
                "dog",
                dogTraits.dull
              ],
              [
                "cat",
                catTraits.sharp
              ],
            ]
          }
        ]
      }
    });
  });
});
