const mongoose=require('mongoose');

const usuarioSchema=new mongoose.Schema({
    nombre:{
        type    : String,
        required: true
    },
    password:{
        type    : String,
        required: true
    },
    email:{
        type    : String,
        required: true
    },
    estado:{
        type    : Boolean,
        default : true
    }
});

module.exports=mongoose.model('usuario',usuarioSchema);