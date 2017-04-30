$(document).ready(function(){
  $("#generateForm").submit(function(event){
    // cancels the form submission
    event.preventDefault();
    //alert($('form.form-horizontal').serialize());
    var data = [];
    var fields = $( "form.form-horizontal" ).serializeArray();
    console.log(fields);
    jQuery.each( fields, function( i, field ) {
      if(field.value != '')
      {
        data[field.name] = field.value;
      }
      else {
        data[field.name] = undefined;
      }
    });

    var data = extractDateFromKey(data['dob'], data, 'dobday', 'dobmonth', 'dobyear');
    var data = extractDateFromKey(data['specific-date'], data, 'postallength-date-day', 'postallength-date-month', 'postallength-date-year');
    var data = extractDateFromKey(data['period-start'], data, 'postallength-period-start-day', 'postallength-period-start-month', 'postallength-period-start-year');
    var data = extractDateFromKey(data['period-end'], data, 'postallength-period-end-day', 'postallength-period-end-month', 'postallength-period-end-year');

    console.log(data);

    $.post( "postalvote", data, function( successData ) {
      //alert(successData);
      //var pdfWin= window.open(escape(successData), "Title", "");
      //var pdfWin= window.open("data:application/pdf;base64, " + escape(successData), '', 'height=650,width=840');
      //var pdfWin= window.open("data:application/pdf;base64," + btoa(unescape(encodeURIComponent(successData))), '', 'height=650,width=840');

      var pdfWin= window.open(window.location.href+successData.url, '', 'height=650,width=840');
    });

  });

  function parseDate(date){
    var dateMatch = date.match("([0-9]{2})\/([0-9]{2})\/([0-9]{4})");

    dateMatch = {
      day : dateMatch[1],
      month : dateMatch[2],
      year : dateMatch[3]
    };

    return dateMatch;
  };

  function extractDateFromKey(data, mergeInto, dayKeyName, monthKeyName, yearKeyName)
  {
    if(data != undefined)
    {
      var split = parseDate(data);

      var returnResult = [];

      returnResult[dayKeyName] = split.day;
      returnResult[monthKeyName] = split.month;
      returnResult[yearKeyName] = split.year;

      returnResult = $.extend({}, mergeInto, returnResult);

      return returnResult;
    }

    return mergeInto;
  }
});
