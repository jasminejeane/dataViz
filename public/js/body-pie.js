import {chart, subTitleStlye, plotOptions, toolTip, dataHash } from "../utils/pies.js";

$(function() {
  $.ajax({
    url: "http://localhost:8080/animals",
    method: "GET"
  }).then(function(data) {



    const dogTraits = {},
        catTraits = {};
    for (let i = 0; i < 25; i++) {

      if (data[i].type === "dog") {
        if (dogTraits[data[i].body_size] === undefined) {
          dogTraits[data[i].body_size] = 1;
        } else if (dogTraits[data[i].body_size]) {
          dogTraits[data[i].body_size]++;
        }
      }
      if (data[i].type === "cat") {
        if (catTraits[data[i].body_size] === undefined) {
          catTraits[data[i].body_size] = 1;
        } else if (catTraits[data[i].body_size]) {
          catTraits[data[i].body_size]++;
        }
      }
    }

    Highcharts.chart('bodySize', {
      chart: chart,
      subtitle: {
        text: 'BODY SIZE',
        style: subTitleStlye
      },
      plotOptions: plotOptions,
      tooltip: toolTip,
      "series": [{
        "name": "Body Type",
        "colorByPoint": true,
        "data": [{
            "name": "Large",
            "y": catTraits.large + dogTraits.large,
            "color": "#44989e",
            "drilldown": "large"
          },
          {
            "name": "Normal",
            "y": catTraits.normal + dogTraits.normal,
            "color": "#fff",
            "drilldown": "normal"
          },
          {
            "name": "Small",
            "y": catTraits.small + dogTraits.small,
            color: "#81bb6b",
            "drilldown": "small"
          }
        ]
      }],
      "drilldown": {
        "series": [{
            "name": "Large",
            "id": "large",
            "data": [
              [
                "dog",
                dogTraits.large
              ],
              [
                "cat",
                catTraits.large
              ],

            ]
          },
          {
            "name": "normal",
            "id": "normal",
            "data": [
              [
                "dog",
                dogTraits.normal
              ],
              [
                "cat",
                catTraits.normal
              ],
            ]
          },
          {
            "name": "Small",
            "id": "small",
            "data": [
              [
                "dog",
                dogTraits.small
              ],
              [
                "cat",
                catTraits.small
              ],
            ]
          }
        ]
      }
    });
  }).fail(function(error) { console.error(error); });
});
