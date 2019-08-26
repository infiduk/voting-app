const express = require('express');
const router = express.Router();
const adminRouter = require('./admin_router')
const userRouter = require('./user_router');

router.use(adminRouter);
router.use(userRouter);

const moment = require('moment'); require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');

router.get('/', (req, res) => {
    res.redirect('/index.html');
});

module.exports = router;