module.exports = {

  generatePdf : function(res, userData){
    var hummus = require('hummus');
    var dateTools = require('./dates.js');
    var writeHelper = require('./writer.js');

    //var inStream = new hummus.PDFRStreamForFile(__dirname + '/../../pdf/Postal-Vote-Application-Form.pdf');

    //var outStream = new hummus.PDFWStreamForFile(__dirname + '/../../output/FilledForm.pdf');

    var pdfWriter = hummus.createWriterToModify(
        new hummus.PDFRStreamForFile(__dirname + "/../../pdf/Postal-Vote-Application-Form.pdf"),
        new hummus.PDFWStreamForFile(__dirname + '/../../output/FilledForm.pdf')
    );

    var fontfile = pdfWriter.getFontForFile(__dirname + '/../../fonts/arial.ttf');

/*
    var pdfWriter = hummus.createWriterToModify(
        new hummus.PDFRStreamForFile(__dirname + "/../../pdf/Postal-Vote-Application-Form.pdf"),
        new hummus.PDFStreamForResponse(res)
    );
*/
    //var outStream = new hummus.PDFStreamForResponse(res);

    //console.log(outStream);

    //var pdfWriter = hummus.createWriterToModify(inStream,outStream);

    //var pdfWriter = hummus.createWriterToModify(__dirname + '/../pdf/Postal-Vote-Application-Form.pdf', {modifiedFilePath: __dirname + '/../output/FilledForm.pdf'});

    var mainTextCoords = {
                  surname: {x:29, y:670},
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
                  ballotreasonchange: {x:285 ,y:552 }
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

    for(key in mainTextCoords){
      writeHelper.writeLine(pageModifier, userData[key], mainTextCoords[key].x, mainTextCoords[key].y, 12, fontfile);
    }

    switch (userData.postallength) {
      case "specificdate":
        dateTools.writedate(
              pageModifier,
              userData['postallength-date-day'],
              userData['postallength-date-month'],
              userData['postallength-date-year'],
              154,
              214,
              12,
              fontfile);
      break;

      case "period":
        dateTools.writedate(
              pageModifier,
              userData['postallength-period-start-day'],
              userData['postallength-period-start-month'],
              userData['postallength-period-start-year'],
              154,
              157,
              12,
              fontfile
            );

        dateTools.writedate(
              pageModifier,
              userData['postallength-period-end-day'],
              userData['postallength-period-end-month'],
              userData['postallength-period-end-year'],
              154,
              130,
              12,
              fontfile
            );
      break;

      case "perm":
      default:
      break;
    }

    pageModifier.startContext().getContext().drawPath(
      tickcoords[userData.postallength].x1, tickcoords[userData.postallength].y1,
      tickcoords[userData.postallength].x2, tickcoords[userData.postallength].y2,
      tickcoords[userData.postallength].x3, tickcoords[userData.postallength].y3,
      writeHelper.fontInfo()
    );

    // Sort out todays date for the bottom of the page

    var currentdate = new Date();
    dateTools.writedate(pageModifier, currentdate.getDate(), currentdate.getMonth()+1, currentdate.getFullYear(), 458, 48, 12, fontfile);

    // Write DOB info.

    dob = dateTools.formatdate(userData.dobday, userData.dobmonth, userData.dobyear, true);

    for(key in dobcoords){
      writeHelper.writeLine(pageModifier, dob[key], dobcoords[key].x, dobcoords[key].y, 20, fontfile);
    }

    pageModifier.endContext().writePage();
    pdfWriter.end();

    //outStream.close();
    //inStream.close();
  }

}
