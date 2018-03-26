import {chart, subTitleStlye, plotOptions, toolTip } from "./utils/pies.js";


$(function() {

  $.ajax({
    url: "http://localhost:8080/animals",
    method: "GET"
  }).then(function(data) {

    const dogTraits = {},
        catTraits = {};
    for (let i = 0; i < 25; i++) {

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

  });
});
