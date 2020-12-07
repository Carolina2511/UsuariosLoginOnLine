const passport = require('passport');

const GoolgeStrategy =require('passport-google-oauth2').Strategy

passport.serializeUser(function(user,done){
    done(null,user);
});

passport.deserializeUser(function(user,done){
    done(null,user);
})

passport.use(new GoolgeStrategy({
    clientID           :process.env.GOOGLE_CLIENT_ID,
    clientSecret       :process.env.GOOGLE_CLIENTE_SECRET,
    callbackURL        :process.env.GOOGLE_CALLBACK_URL,
    passReqToCallback  :true
},function(request,accessToken,tokens,profile,done){
    console.log("DATOS: ")
    console.log(profile);
    console.log(accessToken);
    console.log("Tokens: ");
    console.log(tokens);
    return done(null,profile);
}
));