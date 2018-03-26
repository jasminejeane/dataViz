import {chart, subTitleStlye, plotOptions, toolTip, dataHash } from "../utils/pies.js";


$(function() {

  $.ajax({
    url: "http://localhost:8080/animals",
    method: "GET"
  }).then(function(data) {
    let dogTraits = {},
      catTraits = {};
console.log(dataHash);

//     dataHash(data, 'claws');
//
// console.log(dogTraits);


    Highcharts.chart('claws', {
      chart: chart,
      subtitle: {
        text: 'CLAWS',
        style: subTitleStlye
      },
      plotOptions: plotOptions,

      tooltip: toolTip,

      "series": [{
        "name": "Claws",
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
    }); // end of claws char

  }).fail(function(error) { console.error(error); });
});
