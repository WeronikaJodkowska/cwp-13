const express = require('express');
const router = express.Router();

router.use(function(err, req, res, next){
    console.log('ddd');
    next();
});
module.exports = router;