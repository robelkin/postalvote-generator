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

        if(req.body.ballotaddress1 != undefined)
        {
            req.checkBody('ballotaddress1', 'ballotaddress1 is required').notEmpty();
            req.checkBody('ballotaddress2', 'ballotaddress2 is required').notEmpty();
            req.checkBody('ballotpostcode', 'ballotpostcode is required').notEmpty();
            req.checkBody('ballotreasonchange', 'ballotreasonchange is required').notEmpty();
        }
    }
}
