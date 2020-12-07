const express=require('express');
const ruta=express.Router();
const Usuario=require('../modelos/usuariosModelo');
const Mapa=require('../modelos/mapasModelo');
const fs=require('fs');

/*ruta.get('/',(req,res)=>{
    res.send("Inicio");
})*/

//app.use('/',usuarios);
ruta.get('/escribirArchivo',(req,res)=>{
    console.log("hola");    
    res.redirect('/');
});


ruta.get('/api/usuarios',(req, res)=>{
    //res.json('Raíz del api GET');
    let resultado=usuariosActivos();
    resultado
    .then(usuarios=>{
        res.json(usuarios);
    })
    .catch(err=>{
        res.status(400).json({
            error:err
        })
    });
});

ruta.get('/api/mapa',(req, res)=>{
    //res.json('Raíz del api GET');
    let resultado=puntosActivos();
    resultado
    .then(puntos=>{  
        res.json(puntos);
    })
    .catch(err=>{
        res.status(400).json({
            error:err
        })
    });
});

ruta.get('/api/usuarios/:nombre',(req, res)=>{
    //res.json('Raíz del api GET');
    var nombre=req.params.nombre;
    let resultado=buscarUsuario(nombre);
    resultado
    .then(usuarios=>{
        res.json(usuarios);
    })
    .catch(err=>{
        res.status(400).json({
            error:err
        })
    });
});


ruta.post('/api/usuarios/:id',(req,res)=>{
    var id=req.params.id;
    var resultado=seleccionarUsuario(id);
    resultado
    .then(user=>{
        res.json(user);
    })
    .catch(err=>{
        res.status(400).json({
            error:err
        })
    })
});

ruta.post('/api/usuarios',(req,res)=>{
    var body=req.body;
    var resultado = crearUsuario(body);
    resultado
    .then(user=>{
        res.send("Usuario insertado correctamente");
    })
    .catch(err=>{
        res.status(400).json({
            error:err
        })
    });
});

ruta.post('/api/mapa',(req,res)=>{
    var mostrar="";
    let resultado=puntosActivos();
    resultado
    .then(puntos=>{
        mostrar=`
        
        var map;
        function initMap(){
            var sjr={
                lat:20.3975129,
                lng:-99.9846499
            };
            map =new google.maps.Map(document.getElementById("map"),{
                center: sjr,
                zoom:15
        
            });               
        `;        
        puntos.forEach(dato => {
            mostrar = mostrar+`
            var ${dato.tienda}={
                    lat:${dato.latitud},
                    lng:${dato.longitud}
            }
            marker${dato.tienda}=new google.maps.Marker({
                position: ${dato.tienda},
                map     : map,
                title   : '${dato.tienda}',
                icon    : './public/images/logos/aurrera.png',
                //width   : '200'
            });
            infoWindow${dato.tienda} = new google.maps.InfoWindow({
                content :\`
                <h1>${dato.tienda}</h1><br>
                <p>${dato.tienda}</p><br>
                <img src='./public/images/logos/aurrera.png'><br>
                <a href="https://www.bodegaaurrera.com.mx/">Sitio web</a>
                \`
            });
            google.maps.event.addListener(marker${dato.tienda},'click',function(){
                infoWindow${dato.tienda}.open(map,marker${dato.tienda});
            });            
            `
        });
        mostrar=mostrar+`}`;
        const archivo='./public/js/mapaApi.js';
        fs.writeFileSync(archivo,mostrar);   
        res.send(mostrar);
    })
    .catch(err=>{
        res.status(400).json({
            error:err
        })
    });
    var body=req.body;
    var contenido=`
    var map;
    function initMap(){
    var sjr={
        lat:20.3975129,
        lng:-99.9846499
    };
    map =new google.maps.Map(document.getElementById("map"),{
        center: sjr,
        zoom:15

    });
    }
    `;

});

ruta.put('/api/usuarios/:id',(req,res)=>{
    var body=req.body;
    var id=req.params.id;
    var resultado=actualizarUsuario(id,body);
    resultado
    .then(usuario=>{
        res.send("Usuario actualizado correctamente");
    })
    .catch(err=>{
        res.status(400).json({
            error:err
        })
    });
});

ruta.delete('/api/usuarios/:id',(req,res)=>{
    var id=req.params.id;
    var resultado=eliminarUsuario(id);
    resultado
    .then(usuario=>{
        res.send("Usuario eliminado correctamente");
    })
    .catch(err=>{
        res.status(400).json({
            error:"ABC "+err
        })
    });
});

async function usuariosActivos(){
    var usuarios=await Usuario.find({"estado":true});
    return usuarios;
}

async function puntosActivos(){
    var puntos=await Mapa.find({"estado":true});
    return puntos;
}


async function seleccionarUsuario(id){
    var usuario=await Usuario.findById(id);
    return usuario;
}

async function buscarUsuario(nombre){
    var usuarios=await Usuario.find({"nombre":nombre});
    return usuarios;
}

async function crearUsuario(body){
    var usuario=new Usuario({
        nombre  : body.nombre,
        password: body.password,
        email   : body.email
    });
    return await usuario.save();
}

async function crearArchivo(body){
    var usuario=new Usuario({
        nombre  : body.nombre,
        password: body.password,
        email   : body.email
    });
    return await usuario.save();
}

async function actualizarUsuario(id, body){
    var usuario=await Usuario.findByIdAndUpdate(id,{
        $set:{
            nombre  : body.nombre,
            password: body.password,
            email   : body.email
        }
    },{new:true});
    return usuario;
}

async function eliminarUsuario(id){
    console.log("id  "+id);
    var usuario=await Usuario.findByIdAndUpdate(id,{
        $set:{
            estado : false
        }
    },{new:true});
    return usuario;
}

module.exports=ruta;