export const chart = {
      type: 'pie',
      margin: [
        0, 0, 0, 0
      ],
      plotBackgroundColor: '#1f2237',
      plotBorderWidth: null,
      plotShadow: true
    };

export const subTitleStlye = {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16
    };

export const plotOptions = {
      series: {
        dataLabels: {
          enabled: true,
          crop: false,
          overflow: "none",
          connectorWidth: 0,
          distance: -30,
          format: '{point.name} <br> {point.percentage:.1f}%',
          style: {
            textOutline: false
          }
        }
      }
    };

export const toolTip = {
      headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.percentage:.1f}%</b> of total<br/>'
    }




export const dataHash = (data, trait) => {

  const dogTraits = {},
        catTraits = {};
  for (let i = 0; i < data.length; i++) {

    if (data[i].type === "dog") {
      if (dogTraits[data[i][trait]] === undefined) {
        dogTraits[data[i][trait]] = 1;
      } else if (dogTraits[data[i][trait]]) {
        dogTraits[data[i][trait]]++;
      }
    }
    if (data[i].type === "cat") {
      if (catTraits[data[i][trait]] === undefined) {
        catTraits[data[i][trait]] = 1;
      } else if (catTraits[data[i][trait]]) {
        catTraits[data[i][trait]]++;
      }
    }
  }

return {dogTraits, catTraits}
}
