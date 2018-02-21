const express = require('express');
const session = require('express-session');
const passport = require('passport');
const strategy = require(`${__dirname}/strategy`)
const request = require('request')

passport()


const app = express();


app.use( session({
  secret: '@nyth!ng y0u w@nT',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 100000
  }
}));

app.use( passport.initialize() );
app.use( passport.session() );
passport.use( strategy ); 

passport.serializeUser(function(user,done){
    done(null,user)
});
passport.deserializeUser(function(obj,done){
    done(null,obj);
});


app.get('/login',
  passport.authenticate('auth0'),{
    successRedirect: '/followers',
    failureRedirect: '/login',
    failureFlash: true,
    connection: 'github'
  });

  app.get('/followers',(req,res,next) => {
    if(!req.user) res.redirect('/login');
    else{
      res.status(200).json(req.user)
    }
  })


const port = 3000;
app.listen( port, () => { console.log(`Server listening on port ${port}`); } );