var express = require("express");
var router = express.Router();


router.get('/' , ( req ,res ) => {
    res.send ('server is up and runing')
} )

module.exports = router;
