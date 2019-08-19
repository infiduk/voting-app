const candidateRouter = express.Router();
const candidateModel = require('../model/candidate_model');

// 새로운 후보자 등록
candidateRouter.post('/registerCandidate', (req, res) => {
    const candidate = {
        vote_id: req.body.voteId,
        name: req.body.name,
        name_ex: req.body.name_ex,
        phone: req.body.phone,
        image: image,
        votes: 0
    };
    try {
        candidateModel.registerCandidate(candidate);
        console.log("ok");
    } catch (err) {
        console.log(err);
    }
});

module.exports = candidateRouter;