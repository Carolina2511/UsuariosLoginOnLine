const express=require('express');
const mongoose=require('mongoose');
const path=require('path');
const usuarios=require('./rutas/usuariosRutas');
require('dotenv').config();//para usar el archivo de configuracion .env
const passport=require('passport');
const cookieSession=require('cookie-session');


//Conexión a la BD
mongoose.connect(process.env.MONGOOSE,{ useNewUrlParser: true,useUnifiedTopology: true })
.then(()=>{console.log("Conectado a MongoDB")})
.catch((err)=>{console.log("No se pudo conectar con MongoDB",err)});

mongoose.set('useFindAndModify',false);

const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/',usuarios);
//app.use(express.static(path.join(__dirname,'/webPages')));
//1er public es la forma de acceder en el navegador
//2do public es la carpeta a real dentro del proyecto
app.use('/public',express.static(path.join(__dirname,'/public')));

require('./passport-setup');

app.use(cookieSession({
    name :'tuto-session',
    keys : ['key1','key2']
}));

app.set('view engine','ejs');

const isLoggedIn=(req, res, next)=>{
    if(req.user){
        next();
    }
    else{
        //res.sendStatus(401);
        res.redirect('/')
    }
}

app.use(passport.initialize());
app.use(passport.session());

app.get('/ubicaciones',(req,res)=>{
    res.render('pages/ubicaciones');
});
app.get('/datosMapa',(req,res)=>{
    res.render('pages/datosMapa');
});

app.get('/',(req,res)=>{
    res.render('pages/index');
});

app.get('/failed',(req,res)=>{
    res.send("Error al iniciar session");
});

app.get('/success',isLoggedIn,(req, res)=>{
    res.render('pages/datos',{name:req.user.displayName,email:req.user.emails[0].value,pic:req.user.photos[0].value});
});

app.get('/google',passport.authenticate('google',{scope:['profile','email']}));

app.get('/google/callback',passport.authenticate('google',{failureRedirect:'/failed'}),
function(req, res){
    res.redirect('/success')
}
);

app.get('/logout',(req,res)=>{
    req.session=null;
    req.logOut();
    res.redirect('/');
});

const port=process.env.PORT || 3000;

app.listen(port,()=>{
    console.log("Servidor en el puerto "+port);
})