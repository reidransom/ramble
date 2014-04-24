var models = require('../models')

exports.settings = function (req, res) {
    res.render('settings', {user: req.user.toJSON()})
}

exports.signinPage = function (req, res) {
    res.render('signin', {message: req.session.messages})
}

exports.signin = function (req, res, passport, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err)
        }
        if (!user) {
            req.session.messages = [info.message]
            return res.redirect('/signin')
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err)
            }
            return res.redirect('/')
        })
    })(req, res, next)
}

exports.signupPage = function (req, res) {
    res.render('signup', {message: req.session.messages})
}

exports.signup = function (req, res) {
    models.User.createUser(req.body, function (err, user, info) {
        if (err) {
            return next(err)
        }
        if (!user) {
            req.session.messages = [info.message]
            return res.redirect('/signup')
        }
        // User was created successfully so.. sign them in!
        req.logIn(user, function (err) {
            if (err) {
                return next(err)
            }
            return res.redirect('/')
        })
    })
}

exports.signout = function (req, res) {
    req.logout()
    res.redirect('/')
}
