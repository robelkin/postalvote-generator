module.exports = {

  writeLine : function(pageModifier, text, x, y, textSize, fontfile){
    if(text != undefined && x != undefined && y != undefined && textSize != undefined && fontfile != undefined)
    {
      pageModifier.startContext().getContext().writeText(
          text, x, y, this.fontInfo(textSize, fontfile)
      );
    }
  },

  fontInfo : function(size, fontfile){
    return {font:fontfile,size:size,colorspace:'rgb',color:0x000000};
  }
}
