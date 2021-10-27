module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;         // req.originalUrl: where the user currrently is (e.g. home, new, edit ... )
        req.flash("error", "You must ne signed in first!");
        return res.redirect("/login");
    }
    next();
}