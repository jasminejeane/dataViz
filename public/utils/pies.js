// export default function(data) {
//
//   const dogTraits = {};
//   const catTraits = {};
//   for (i = 0; i < data.length; i++) {
//
//     if (data[i].type === "dog") {
//       if (dogTraits[data[i].fur_type] === undefined) {
//         dogTraits[data[i].fur_type] = 1;
//       } else if (dogTraits[data[i].fur_type]) {
//         dogTraits[data[i].fur_type]++;
//       }
//     }
//     if (data[i].type === "cat") {
//       if (catTraits[data[i].fur_type] === undefined) {
//         catTraits[data[i].fur_type] = 1;
//       } else if (catTraits[data[i].fur_type]) {
//         catTraits[data[i].fur_type]++;
//       }
//     }
//   }
//
// return {dogTraits, catTraits}
// }
