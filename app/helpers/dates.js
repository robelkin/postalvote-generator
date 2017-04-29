module.exports = {

  formatdate : function(dayVal, monthVal, yearVal, padyear = false){

    dayVal = dayVal.toString().length < 2 ? "0"+dayVal : dayVal;
    dayVal = dayVal.toString().split('').join(' ');

    monthVal = monthVal.toString().length < 2 ? "0"+monthVal : monthVal;
    monthVal = monthVal.split('').join(' ');

    var padding = ' ';

    if(padyear == true)
    {
      padding = '  ';
    }

    yearVal = yearVal.toString().split('').join(padding);

    return {day: dayVal, month: monthVal, year: yearVal};
  },

  writedate : function(pageModifier, day, month, year, x, y, options){

    date = this.formatdate(day, month, year);

    pageModifier.startContext().getContext().writeText(
      date.day+' '+date.month+' '+date.year,
      x,
      y,
      options
    );
  }

}
