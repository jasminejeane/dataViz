
  // size_li = $("#animal-table tr").size();
// :lt Select all elements at an index less than index within the matched set.
  const numRows = $("#animal-table tr").length;
  console.log(numRows);

  let x =5;
  // $('#animal-table tr:lt('+x+')').show();
  $('.showMore').click(function () {
      x= (x+5 <= numRows) ? x+5 : numRows;
      $('#animal-table tr:lt('+x+')').show();
  });
  $('.showLess').click(function () {
      x=(x-5<0) ? 10 : x-5;
      $('#animal-table tr').not(':lt('+x+')').hide();
  });
}
