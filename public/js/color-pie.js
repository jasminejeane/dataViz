import {chart, subTitleStlye, plotOptions, toolTip, dataHash, drillUpBtn } from "../utils/pies.js";

$(function() {

  $.ajax({
    url: "http://localhost:8080/animals",
    method: "GET"
  }).then(function(data) {
// (type, i think hash name doesn't need to change)
    const dogTraits = {},
        catTraits = {};
    for (let i = 0; i < data.length; i++) {

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
      chart: chart,
      subtitle: {
        text: 'COLOR',
        style: subTitleStlye
      },
      plotOptions: plotOptions,

      tooltip: toolTip,

      "series": [{
        "name": "Color",
        "colorByPoint": true,
        "data": [{
            "name": "Brown",
            "y": catTraits.brown + dogTraits.brown,
            "color": "#bbbcc3",
            "drilldown": "brown"
          },
          {
            "name": "Black",
            "y": catTraits.black + dogTraits.black,
            "color": "#d2d2d7",
            "drilldown": "black"
          },
          {
            "name": "White",
            "y": catTraits.white + dogTraits.white,
            "color": "#e8e8eb",
            "drilldown": "white"
          },
          {
            "name": "Yellow",
            "y": catTraits.yellow + dogTraits.yellow,
            "color": "#fff",
            "drilldown": "yellow"
          }
        ]
      }],
      "drilldown": {
        drillUpButton: drillUpBtn,
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
  }).fail(function(error) { console.error(error); });
});
