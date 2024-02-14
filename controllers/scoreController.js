const saveScore = (req, res)=> {
    data = {
        user_id: req.body.userId,
        level_id: req.body.levelId,
        score: req.body.score
    }
    dbConn.create(table, data, (err, result)=> {
        if(err) {
            console.log(err);
            req.flash("err", err);
        }
        
        req.flash("msg", result);
        res.redirect("back")
    })
}

module.exports = {saveScore}