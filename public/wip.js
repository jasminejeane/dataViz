
// // updates animal type on button click
// function updateType() {
//   $('input[type=checkbox]:checked').each(function() {
//
//     const id = this.attributes[0].value;
//     const type = this.attributes[1].value;
//     const typed = (type === 'cat')
//       ? 'dog'
//       : 'cat';
//
//     $("#type" + id).html(typed);
//
//     this.checked = false;
//
//     $.ajax({
//       method: "PUT",
//       url: "http://localhost:8080/animal/" + id,
//       data: {
//         type: typed
//       }
//     }).then(function() {
//     });
//
//   });
// }
// // toggles side bar
// const menuClick = () => {
//   $("#wrapper").toggleClass("active");
// }
//
// const dataDogs = [];
// const dataCats = [];
// const serieName = [];
//
// // create Characteristics Table
// const createTable = (data, min, max) => {
//
//   if (!min && !max) {
//     min = 0;
//     max = 50;
//   }
//
//   $("#animal-table > tbody").html("");
//   for (var i = min; i < max; i++) {
//
//     // const { id, type } = data[i]
//     const id = data[i].id;
//     const type = data[i].type;
//     const name = data[i].name;
//     const body = data[i].body_size;
//     const claws = data[i].claws;
//     const color = data[i].color;
//     const furType = data[i].fur_type;
//     const numLegs = data[i].number_of_legs;
//
// 		let serieData = {	x: id, y: numLegs, nameVal: name}
//
//     if (type === "dog") {
//       dataDogs.push(serieData);
//     } else if (type === "cat") {
//       dataCats.push(serieData);
//     }
//
//     $("#animal-table > tbody").append(`<tr>
// 			<td>
// 			<input data-id=${id} data-type=${type} type="checkbox" name="checkbox" value="checkbox">
// 			</td>
// 			<td> ${id} </td>
// 			<td id="type${id}"> ${type} </td>
// 			<td>${name}</td>
// 			<td>${body}</td>
// 			<td>${claws}</td>
// 			<td>${color}</td>
// 			<td>${furType} </td>
// 			<td>${numLegs}</td>
// 			</tr>`);
//   }
//
//   numRows = $("#animal-table tr").length;
//   console.log(numRows);
// }
//
//
// const renderTable = (min, max) => {
//   $.ajax({url: "http://localhost:8080/animals", method: "GET"}).then(function(data) {
//     createTable(data, min, max);
//   });
// }
//
//
//
//
//
//
//
// // $(function() {
//
// $.ajax({url: "http://localhost:8080/animals", method: "GET"}).then(function(data) {
//     var dogTraits = {},
//         catTraits = {},
//         drillDog = [],
//         drillCat = [];
//     for (i = 0; i < data.length; i++) {
//
//
//
//       const id = data[i].id;
//       const name = data[i].name;
//       const numLegs = data[i].number_of_legs;
//
//       let drillDown = {	x: id, y: numLegs, nameVal: name};
//
//       if (data[i].type === "dog") {
//         if (dogTraits[data[i].claws] === undefined) {
//           dogTraits[data[i].claws] = 1;
//         } else if (dogTraits[data[i].claws]) {
//           dogTraits[data[i].claws]++;
//         }
//         dataDogs.push(drillDown);
//
//       }
//       if (data[i].type === "cat") {
//         if (catTraits[data[i].claws] === undefined) {
//           catTraits[data[i].claws] = 1;
//         } else if (catTraits[data[i].claws]) {
//           catTraits[data[i].claws]++;
//         }
//       }
//
//       dataCats.push(drillDown);
//
//     }
//
//     Highcharts.chart('claws', {
//       chart: {
//         type: 'pie',
//         margin: [0, 0, 0, 0],
//         events: {
//          drilldown: function () {
//            animalChart.series[0].update({
//              data: dataDogs
//            });
//          },
//          drillup: function () {
//            animalChart.series[0].update({
//              data: dataCats
//            });
//          }
//    }
//       },
//       // options3d: {
//       //   enabled: true,
//       //   alpha: 45,
//       //   beta: 0
//       // },
//       subtitle: {
//         text: 'Claws'
//       },
//       plotOptions: {
//         series: {
//           dataLabels: {
//             enabled: true,
//             crop: false,
//             overflow: "none",
//             connectorWidth: 0,
//             distance: -30,
//             format: '{point.name} <br> {point.percentage:.1f}%'
//           }
//         }
//       },
//
//       tooltip: {
//         headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
//         pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.percentage:.1f}%</b> of total<br/>'
//       },
//
//       "series": [{
//         "name": "Browsers",
//         "colorByPoint": true,
//         "data": [{
//             "name": "Sharp",
//             "y": catTraits.sharp + dogTraits.sharp,
//             "drilldown": "sharp"
//           },
//           {
//             "name": "Dull",
//             "y": catTraits.dull + dogTraits.dull,
//             "drilldown": "dull"
//           }
//         ]
//       }],
//       "drilldown": {
//         "series": [{
//             "name": "Sharp",
//             "id": "sharp",
//             "data": [
//               [
//                 "dog",
//                 dogTraits.sharp
//               ],
//               [
//                 "cat",
//                 catTraits.sharp
//               ],
//
//             ]
//           },
//           {
//             "name": "Dull",
//             "id": "dull",
//             "data": [
//               [
//                 "dog",
//                 dogTraits.dull
//               ],
//               [
//                 "cat",
//                 catTraits.sharp
//               ],
//             ]
//           }
//         ]
//       }
//     });
//   // });
// // });
//
//
//
//
// // create initial chart and table
//
//
//   createTable(data, 0, 50);
//
//   var animalChart = Highcharts.chart('container', {
//     chart: {
//       type: 'scatter',
//       zoomType: 'xy'
//     },
//     title: {
//       text: 'Number of Legs vs. IDs of 2600 Animals by Dog or Cat Type'
//     },
//     subtitle: {
//       text: 'Source: Animals API'
//     },
//     xAxis: {
//       title: {
//         enabled: true,
//         text: 'Animal IDs'
//       },
//       minRange: 1,
//       allowDecimals: false,
//       startOnTick: true,
//       endOnTick: true,
//       showLastLabel: true,
//       events: {
//         setExtremes: function(e) {
//           renderTable(Math.ceil(e.min), Math.ceil(e.max));
//         }
//       }
//     },
//     yAxis: {
//       title: {
//         text: 'Number of Legs'
//       },
//       tickInterval: 1,
//       minRange: 1,
//       allowDecimals: false
//     },
//     legend: {
//
//       backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
//       borderWidth: 1
//     },
//     plotOptions: {
//       scatter: {
//         marker: {
//           radius: 5,
//           states: {
//             hover: {
//               enabled: true,
//               lineColor: 'rgb(100,100,100)'
//             }
//           }
//         },
//         tooltip: {
//
//           pointFormatter: function(){
// 						// console.log(this);
// 						return `ID: <b>${this.x} </b><br>
// 							Name: <b> ${this.nameVal}</b><br>`;
//           }
//         }
//       }
//     },
//     series: [
//       {
//         name: 'Dog',
//         color: 'rgba(223, 83, 83, .5)',
//         data: dataDogs
//
//       }, {
//         name: 'Cat',
//         color: 'rgba(119, 152, 191, .5)',
//         data: dataCats
//       }
//
//     ]
//   });
// }
// );
// // for rendering outside of mulitple ajax calls
// // see color-combo in high-charts-1
// // $('#container').highcharts(json);
