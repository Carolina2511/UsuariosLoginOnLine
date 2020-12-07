$(document).ready(function(){
    mostrarDatos();
///////////////// MOSTRAR /////////////////////    
    function mostrarDatos(){
        $.ajax({
            url:'https://usuariosloginonline.herokuapp.com/api/usuarios',
            type:'GET',
            success: function (respuesta){
                //console.log(respuesta);
                let datos=respuesta;
                let template='';
                let numeracion=1;
                datos.forEach(dato => {
                    template =template+`
                        <tr>
                            <th  scope="row">${numeracion}</th>
                            <td>${dato.nombre}</td>
                            <td>${dato.password}</td>
                            <td>${dato.email} hrs.</td>
                            <td>${dato.estado}</td>
                            <td width='5%'><button type="button" class="btn btn-warning btn-sm editar" id='${dato._id}'>📝</button></td>
                            <td width='7%'><button type="button" class="btn btn-danger btn-sm borrar"  id='${dato._id}'>🗑</button></td>
                        </tr>                        
                    `
                    numeracion++;
                });
                $('#empleados').html(template);
            }
        });
    }

/// BUSCAR ///
    $('#busqueda').submit(function(e){
        e.preventDefault();
        var buscar=$('#buscar').val();
        const DATOS={
            nombre:buscar
        }
        $.ajax({
            url:'https://usuariosloginonline.herokuapp.com/api/usuarios/'+buscar,
            type:'GET',
            success: function (respuesta){
                //console.log(respuesta);
                let datos=respuesta;
                let template='';
                let numeracion=1;
                datos.forEach(dato => {
                    template =template+`
                        <tr>
                            <th  scope="row">${numeracion}</th>
                            <td>${dato.nombre}</td>
                            <td>${dato.password}</td>
                            <td>${dato.email} hrs.</td>
                            <td>${dato.estado}</td>
                            <td width='5%'><button type="button" class="btn btn-warning btn-sm editar" id='${dato._id}'>📝</button></td>
                            <td width='7%'><button type="button" class="btn btn-danger btn-sm borrar"  id='${dato._id}'>🗑</button></td>
                        </tr>                        
                    `
                    numeracion++;
                });
                $('#empleados').html(template);
            }
        });        
    });

//////////GUARDAR Y MODIFICAR/////////////////////
    $('#enviarDatos').submit(function(e){        
        e.preventDefault();
        var tipo=$('#tipo').val();
        const DATOS={
            nombre:$('#nombre').val(),
            password:$('#password').val(),
            email:$('#email').val(),
            id:$('#id').val(),
            tipo:$('#tipo').val()
        };  
        if (tipo=='guardar') {  
            $.post('https://usuariosloginonline.herokuapp.com/api/usuarios',DATOS, function (respuesta){
                //console.log("respuesta: "+respuesta);
                $('#mensaje').text(respuesta);
                mostrarDatos();
                $('#boton').html('Guardar datos')
                $('#enviarDatos').trigger('reset'); 
                $('#tipo').val('guardar');           
            });
        } 
        else{
            var idUsuario=$('#id').val();
            if(tipo=='editar'){
                console.log("Editar");
                $.ajax({
                    url:'https://usuariosloginonline.herokuapp.com/api/usuarios/'+idUsuario,
                    type:'PUT',
                    data: DATOS,
                    success: function (respuesta){
                        //console.log(respuesta);
                        $('#mensaje').text(respuesta);
                        mostrarDatos();
                        $('#boton').html('Guardar datos');
                        $('#enviarDatos').trigger('reset');
                        $('#tipo').val('guardar');
                    }
                }); 
                mostrarDatos();               
                //console.log("tipo"+$('#tipo').val());
            }
        }      
    });


/////////////////// BORRAR /////////////////////
    $(document).on('click', '.borrar', function(){
        console.log("borrar");
        Swal.fire({
            title: 'Borrar registro',
            text: "No podrás recuperarlo",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrarlo',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.value) { //AQUI EMPIEZA
                var idUsuario=$(this)[0].id;
                console.log(idUsuario);
                const DATOS={id:idUsuario,};  
                $.ajax({
                    url:'https://usuariosloginonline.herokuapp.com/api/usuarios/'+idUsuario,
                    type:'DELETE',
                    //data: DATOS,
                    success: function (respuesta){
                        //console.log(respuesta);
                        $('#mensaje').text(respuesta);
                        mostrarDatos();
                    }
                });                

                Swal.fire(
                    'Borrado',
                    'El registro ha sido borrado.',
                    'success'
                  )                   
                console.log("Borrado");
            }//AQUI TERMINA
          });
    });

/////////////////// SELECCIONAR /////////////////////    
    $(document).on('click', '.editar', function(){
        var idUsuario=$(this)[0].id;
        const DATOS={
            id:idUsuario,
        };  
        $.post('https://usuariosloginonline.herokuapp.com/api/usuarios/'+idUsuario,DATOS, function (respuesta){
            //console.log("respuesta: "+respuesta);
            //$('#mensaje').text(respuesta);
            let dato=respuesta;
            $('#nombre').val(dato.nombre);
            $('#password').val(dato.password);
            $('#email').val(dato.email);
            $('#id').val(dato._id);
            $('#tipo').val('editar');
            $('#boton').html('Modificar datos');
            //mostrarDatos();
        });

    });
});