module.exports = {
    validatePost:function(req, res) {
        req.checkBody('surname', 'surname is required').notEmpty();
        req.checkBody('firstname', 'firstname is required').notEmpty();
        req.checkBody('addressline1', 'addressline1 is required').notEmpty();
        req.checkBody('addressline2', 'addressline2 is required').notEmpty();
        req.checkBody('addressline3', 'addressline3 is required').notEmpty();
        req.checkBody('phonenumber', 'phonenumber is required').notEmpty();
        req.checkBody('emailaddress', 'emailaddress is required').notEmpty();

        if(req.body.ballotaddress1 != undefined)
        {
            req.checkBody('ballotaddress1', 'ballotaddress1 is required').notEmpty();
            req.checkBody('ballotaddress2', 'ballotaddress2 is required').notEmpty();
            req.checkBody('ballotpostcode', 'ballotpostcode is required').notEmpty();
            req.checkBody('ballotreasonchange', 'ballotreasonchange is required').notEmpty();
        }
    }
}
