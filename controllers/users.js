const User = require("../models/user");

module.exports.renderRegister = (req, res) => {
    res.render("users/register");
}

module.exports.register = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        // Not storing password directly. Using passport when dealing with password to salt and hash.
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        // Log in automatically after register
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash("success", "Welcome to BeWild!");
            res.redirect("/campgrounds");
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("register");
    }
}

module.exports.renderLogin = (req, res) => {
    res.render("users/login");
}

module.exports.login = (req, res) => {
    req.flash("success", "Welcome back!");
    const redirectUrl = req.session.returnTo || "/campgrounds";
    delete req.session.returnTo;
    res.redirect(redirectUrl);      // Redirect to where the user was before the user got to login page
}

module.exports.logout = (req, res) => {
    req.logout();
    req.flash("success", "Goodbye!");
    res.redirect("/campgrounds");
}