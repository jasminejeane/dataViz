$(function() {

  $.ajax({
    url: "http://localhost:8080/animals",
    method: "GET"
  }).then(function(data) {
// (type, i think hash name doesn't need to change)
    var dogTraits = {},
        catTraits = {};
    for (i = 0; i < data.length; i++) {

      if (data[i].type === "dog") {
        if (dogTraits[data[i].color] === undefined) {
          dogTraits[data[i].color] = 1;
        } else if (dogTraits[data[i].color]) {
          dogTraits[data[i].color]++;
        }
      }
      if (data[i].type === "cat") {
        if (catTraits[data[i].color] === undefined) {
          catTraits[data[i].color] = 1;
        } else if (catTraits[data[i].color]) {
          catTraits[data[i].color]++;
        }
      }
    }

    Highcharts.chart('color', {
      chart: {
        type: 'pie'
      },
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
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
            "name": "Brown",
            "y": catTraits.brown + dogTraits.brown,
            "drilldown": "brown"
          },
          {
            "name": "Black",
            "y": catTraits.black + dogTraits.black,
            "drilldown": "black"
          },
          {
            "name": "White",
            "y": catTraits.white + dogTraits.white,
            "drilldown": "white"
          },
          {
            "name": "Yellow",
            "y": catTraits.yellow + dogTraits.yellow,
            "drilldown": "yellow"
          }
        ]
      }],
      "drilldown": {
        "series": [{
            "name": "Brown",
            "id": "brown",
            "data": [
              [
                "dog",
                dogTraits.brown
              ],
              [
                "cat",
                catTraits.brown
              ],

            ]
          },
          {
            "name": "Black",
            "id": "black",
            "data": [
              [
                "dog",
                dogTraits.black
              ],
              [
                "cat",
                catTraits.black
              ],
            ]
          },
          {
            "name": "White",
            "id": "white",
            "data": [
              [
                "dog",
                dogTraits.white
              ],
              [
                "cat",
                catTraits.white
              ],
            ]
          },
          {
            "name": "Yellow",
            "id": "yellow",
            "data": [
              [
                "dog",
                dogTraits.yellow
              ],
              [
                "cat",
                catTraits.yellow
              ],
            ]
          }
        ]
      }
    });
  });
});
