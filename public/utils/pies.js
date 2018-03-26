export const drilldownFunc = {
  drilldown: function() {

    let combinedPts = catPts.concat(dogPts),
      dataChar1 = [],
      dataChar2 = [];

    combinedPts.forEach(function(pt) {

      const id = pt.x;
      const name = pt.nameVal;
      const claws = pt.clawsVal;
      const numLegs = pt.y;

      let serieData = {
        x: id,
        y: numLegs,
        nameVal: name,
        clawsVal: claws
      }
      if (pt.clawsVal === "dull") {
        dataChar1.push(serieData);
      } else if (pt.clawsVal === "sharp") {
        dataChar2.push(serieData);
      }
    })

    console.log("data", this.ddDupes[0]);
    let drillChar;

    if (this.ddDupes[0] === "dull") {
      drillChar = dataChar1;
    } else if (this.ddDupes[0] === "sharp") {
      drillChar = dataChar2;
    }

    mainChart.series[0].update({data: drillChar});

  }
}

export const drillUpBtn = {
  position: {
    //align: 'left',
    x: 0,
    y: 50,
    verticalAlign: 'top'
  }
}

export const chart = {
  type: 'pie',
  margin: [
    0, 0, 0, 0
  ],
  plotBackgroundColor: '#1f2237',
  plotBorderWidth: null,
  plotShadow: true,
  // events: drilldown
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
      distance: -45,
      format: '{point.name} <br> {point.percentage:.0f}%',

      style: {
        textOutline: false,
        fontSize: 13
      }
    }
  }
};

export const toolTip = {
  headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
  pointFormat: '<span style="color:{point.color}">{point.name}</span>:<br> <b>{point.percentage:.0f}%</b> of total<br/>'
}

export const dataHash = (data, trait) => {

  let dogTraits = {},
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

    return {dogTraits, catTraits}
  }
}
