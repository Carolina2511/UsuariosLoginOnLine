const mongoose=require('mongoose');
const mapaSchema=new mongoose.Schema({
    tienda:{
        type    : String,
        required: true
    },
    direccion:{
        type    : String,
        required: true
    },
    latitud:{
        type    : Number,
        required: true
    },
    longitud:{
        type    : Number,
        required: true
    },    
    estado:{
        type    : Boolean,
        default : true
    }
});

module.exports=mongoose.model('mapa',mapaSchema);