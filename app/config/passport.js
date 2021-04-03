const LocalStrategy = require('passport-local').Strategy
const User = require('../methods/users');
const bcrypt = require('bcrypt');

function passportInit(passport){
        //Login
        //Check if user exists or not
        let user = await User.getUserByName(username);
        if(!user.result){
            return done(null, false, {message: `No user with this username${user.error}`});
        }
        user = user.result;
        bcrypt.compare(password, user.password).then((match)=>{     // here match returns true or false
            if(match) {
                if(user) return done(null, user, {message: 'Logged in successfully'});
                else return done(null, false, {message: 'Could not read user info'});
            }

            return done(null, false, {message: 'Username or password is incorrect'});
        }).catch((err)=>{
            return done(null, false, {message: 'Something went wrong'});
        })
     }));
     
     //to know whether user is logged in or not
     passport.serializeUser((user, done)=>{
         done(null, user._id)   // second parameter to store in session to know whether user is logged in or not
     })
     
    
     //to receive whatever we have stored in session using passport.serializeUser, here we have stored user._id so we will receive that
     // we deserialize so that we can use req.user to know who is current user in our backend;
     passport.deserializeUser((id, done)=>{
         User.getUserById(id).then(({error, result})=>{
             const err = error;
             const user = result
             done(err, user);
         })
     })
    
}

module.exports = passportInit