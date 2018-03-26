export const drilldown = {
  drilldown: function() {
    var catPts = mainChart.series[0].points;
    var dogPts = mainChart.series[1].points;
    var combinedPts = catPts.concat(dogPts);
    var dataChar1 = [],
        dataChar2 = [];

    combinedPts.forEach(function(pt){

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

    if(this.ddDupes[0] === "dull"){
      drillChar = dataChar1;
    }else if(this.ddDupes[0] === "sharp"){
      drillChar = dataChar2;
    }

    mainChart.series[0].update({
      data: drillChar
    });

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

    if (pt.type === "dog") {
      if (dogTraits[pt[trait]] === undefined) {
        dogTraits[pt[trait]] = 1;
      } else if (dogTraits[pt[trait]]) {
        dogTraits[pt[trait]]++;
      }
    }
    if (pt.type === "cat") {
      if (catTraits[pt[trait]] === undefined) {
        catTraits[pt[trait]] = 1;
      } else if (catTraits[pt[trait]]) {
        catTraits[pt[trait]]++;
      }
    }
  }

  return {dogTraits, catTraits}
}
