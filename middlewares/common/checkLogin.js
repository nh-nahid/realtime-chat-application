const jwt = require("jsonwebtoken");

function checkLogin(req, res, next) {

    const token =
        req.signedCookies[process.env.COOKIE_NAME];

    if (!token) {
        return res.redirect("/");
    }

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;
        res.locals.loggedInUser = decoded;

        next();

    } catch (err) {

        return res.redirect("/");

    }
}


const redirectLoggedIn = function (req, res, next) {
    let cookies = Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;

    if(!cookies) {
        next();
    } else{
        res.redirect("/inbox")
    }
}

module.exports = {
    checkLogin,
    redirectLoggedIn
}