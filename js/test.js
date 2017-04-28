var hummus = require('hummus');
var tools = require('./dates.js');

var pdfWriter = hummus.createWriterToModify(__dirname + '/../pdf/Postal-Vote-Application-Form.pdf', {
			modifiedFilePath: __dirname + '/../output/FilledForm.pdf'
		});

var fontfile = pdfWriter.getFontForFile(__dirname + '/../fonts/arial.ttf');

var textcoords = {surname: {x:29, y:670},
              firstname: {x:29 ,y:623 },
              addressline1: {x:29 ,y:565 },
              addressline2: {x:29 ,y:544 },
              addressline3: {x:29 ,y:523 },
              postcode: {x:85 ,y:501 },
              phonenumber: {x:29 ,y:453 },
              emailaddress: {x:29 ,y:393 },
              ballotaddress1: {x:285 ,y:650 },
              ballotaddress2: {x:285 ,y:625 },
              ballotpostcode: {x:340 ,y:607 },
              ballotreasonchange: {x:285 ,y:552 },
              };

  var tickcoords = {
                    perm: {x1:30, y1:283, x2:34, y2:278, x3:40, y3:287},
                    specificdate: {x1:30, y1:253, x2:34, y2:248, x3:40, y3:257},
                    period: {x1:30, y1:187, x2:34, y2:182, x3:40, y3:191}
  };

  var dobcoords = {
              day: {x: 315,y: 355},
              month: {x: 383,y: 355},
              year: {x: 445,y: 355}
  };

var pageModifier = new hummus.PDFPageModifier(pdfWriter,2);

for(key in textcoords){

  pageModifier.startContext().getContext().writeText(
  	key,
  	textcoords[key].x, textcoords[key].y,
  	{font:fontfile,size:12,colorspace:'rgb',color:0x000000}
  );

}

for(key in tickcoords){
  pageModifier.startContext().getContext().drawPath(
    tickcoords[key].x1, tickcoords[key].y1, tickcoords[key].x2, tickcoords[key].y2, tickcoords[key].x3, tickcoords[key].y3,
    {colorspace:'rgb',color:0x000000}
  );
}

dob = tools.formatdate(07, 06, 1984, true);

for(key in dobcoords){
  pageModifier.startContext().getContext().writeText(
    dob[key],
    dobcoords[key].x, dobcoords[key].y,
    {font:fontfile,size:20,colorspace:'rgb',color:0x000000}
  );
}


// Sort out todays date for the bottom of the page

var currentdate = new Date();
tools.writedate(pageModifier, currentdate.getDate(), currentdate.getMonth()+1, currentdate.getFullYear(), 458, 48, {font:fontfile,size:12,colorspace:'rgb',color:0x000000});

tools.writedate(pageModifier, currentdate.getDate(), currentdate.getMonth()+1, currentdate.getFullYear(), 154, 214, {font:fontfile,size:12,colorspace:'rgb',color:0x000000});

tools.writedate(pageModifier, currentdate.getDate(), currentdate.getMonth()+1, currentdate.getFullYear(), 154, 157, {font:fontfile,size:12,colorspace:'rgb',color:0x000000});
tools.writedate(pageModifier, currentdate.getDate(), currentdate.getMonth()+1, currentdate.getFullYear(), 154, 130, {font:fontfile,size:12,colorspace:'rgb',color:0x000000});

pageModifier.endContext().writePage();
pdfWriter.end();
