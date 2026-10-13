function addViewLocals(req, res, next) {
    res.locals.host = req.get('host');
    res.locals.protocol = req.protocol;
    next();
}

module.exports = addViewLocals;
