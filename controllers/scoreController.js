const { Score } = require("../models/associations");

function saveScore(req, res) {
    Score.create({
        userId: req.body.userId,
        levelId: req.body.levelId,
        score: req.body.score
    })
        .then(score => {
            req.flash("msg", score);
            res.redirect("back")
            console.log(score)
        })
        .catch(err => {
            console.log(err);
            req.flash("err", err);
        })
}

module.exports = { saveScore }