import {chart, subTitleStlye, plotOptions, toolTip, dataHash } from "./utils/pies.js";

$(function() {
  $.ajax({
    url: "http://localhost:8080/animals",
    method: "GET"
  }).then(function(data) {

    const dogBody = {},
        catBody = {};
    for (let i = 0; i < data.length; i++) {

      if (data[i].type === "dog") {
        if (dogBody[data[i].body_size] === undefined) {
          dogBody[data[i].body_size] = 1;
        } else if (dogBody[data[i].body_size]) {
          dogBody[data[i].body_size]++;
        }
      }
      if (data[i].type === "cat") {
        if (catBody[data[i].body_size] === undefined) {
          catBody[data[i].body_size] = 1;
        } else if (catBody[data[i].body_size]) {
          catBody[data[i].body_size]++;
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
        "name": "Browsers",
        "colorByPoint": true,
        "data": [{
            "name": "Large",
            "y": catBody.large + dogBody.large,
            "color": "#44989e",
            "drilldown": "large"
          },
          {
            "name": "Normal",
            "y": catBody.normal + dogBody.normal,
            "color": "#fff",
            "drilldown": "normal"
          },
          {
            "name": "Small",
            "y": catBody.small + dogBody.small,
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
                dogBody.large
              ],
              [
                "cat",
                catBody.large
              ],

            ]
          },
          {
            "name": "normal",
            "id": "normal",
            "data": [
              [
                "dog",
                dogBody.normal
              ],
              [
                "cat",
                catBody.normal
              ],
            ]
          },
          {
            "name": "Small",
            "id": "small",
            "data": [
              [
                "dog",
                dogBody.small
              ],
              [
                "cat",
                catBody.small
              ],
            ]
          }
        ]
      }
    });
  });
});
