import {chart, subTitleStlye, plotOptions, toolTip, dataHash, drillUpBtn } from "../utils/pies.js";

$(function() {

  $.ajax({
    url: "http://localhost:8080/animals",
    method: "GET"
  }).then(function(data) {

    const dogTraits = {},
        catTraits = {};
    for (let i = 0; i < 25; i++) {

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
      chart: chart,
      subtitle: {
        text: 'FUR TYPE',
        style: subTitleStlye
      },
      plotOptions: plotOptions,
      tooltip: toolTip,
      "series": [{
        "name": "Fur Type",
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
        drillUpButton: drillUpBtn,
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
  }).fail(function(error) { console.error(error); });
});
