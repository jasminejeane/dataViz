import findChar from './utils/pies';


$(function() {

  $.ajax({
    url: "http://localhost:8080/animals",
    method: "GET"
  }).then(function(data) {

    const {dogTraits, catTraits} = findChar(data);

    Highcharts.chart('claws', {
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
            "name": "Sharp",
            "y": catTraits.sharp + dogTraits.sharp,
            "drilldown": "sharp"
          },
          {
            "name": "Dull",
            "y": catTraits.dull + dogTraits.dull,
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
