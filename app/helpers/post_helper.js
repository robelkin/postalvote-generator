module.exports = {
    validatePost:function(req, res) {
        req.checkBody('surname', 'surname is required').notEmpty();
        req.checkBody('firstname', 'firstname is required').notEmpty();
        req.checkBody('addressline1', 'addressline1 is required').notEmpty();
        req.checkBody('addressline2', 'addressline2 is required').notEmpty();
        req.checkBody('postcode', 'postcode is required').notEmpty();

        req.checkBody('dobday', 'dobday must be a 2 digit date').notEmpty().isInt().isLength(2);
        req.checkBody('dobmonth', 'dobmonth must be a 2 digit month').notEmpty().isInt().isLength(2);
        req.checkBody('dobyear', 'dobyear must be a 4 digit year').notEmpty().isInt().isLength(4);

        req.checkBody('postallength', 'You must choose the length for your postal vote').notEmpty();

        if(req.body.postallength == "specificdate")
        {
          req.checkBody('postallength-date-day', 'If you are specifying a specific postal vote date, you must specify a day').notEmpty().isInt().isLength(2);
          req.checkBody('postallength-date-month', 'If you are specifying a specific postal vote date, you must specify a month').notEmpty().isInt().isLength(2);
          req.checkBody('postallength-date-year', 'If you are specifying a specific postal vote date, you must specify a year').notEmpty().isInt().isLength(4);
        }
        else if(req.body.postallength == "period")
        {
          req.checkBody('postallength-period-start-day', 'If you are specifying a postal vote period, you must specify a start day').notEmpty().isInt().isLength(2);
          req.checkBody('postallength-period-start-month', 'If you are specifying a postal vote period, you must specify a start month').notEmpty().isInt().isLength(2);
          req.checkBody('postallength-period-start-year', 'If you are specifying a postal vote period, you must specify a start year').notEmpty().isInt().isLength(4);

          req.checkBody('postallength-period-end-day', 'If you are specifying a postal vote period, you must specify an end day').notEmpty().isInt().isLength(2);
          req.checkBody('postallength-period-end-month', 'If you are specifying a postal vote period, you must specify an end month').notEmpty().isInt().isLength(2);
          req.checkBody('postallength-period-end-year', 'If you are specifying a postal vote period, you must specify an end year').notEmpty().isInt().isLength(4);
        }

        if(req.body.ballotaddress1 != undefined)
        {
            req.checkBody('ballotaddress1', 'ballotaddress1 is required').notEmpty();
            req.checkBody('ballotaddress2', 'ballotaddress2 is required').notEmpty();
            req.checkBody('ballotpostcode', 'ballotpostcode is required').notEmpty();
            req.checkBody('ballotreasonchange', 'ballotreasonchange is required').notEmpty();
        }
    }
}
