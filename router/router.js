const express = require('express');
const router = express.Router();
const candidateRouter = require('./candidate_router')
const electorateRouter = require('./electorate_router');
const voteRouter = require('./vote_router');

router.use(candidateRouter);
router.use(electorateRouter);
router.use(voteRouter);

const moment = require('moment'); require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');

router.get('/', (req, res) => {
    res.redirect('/index.html');
});

module.exports = router;