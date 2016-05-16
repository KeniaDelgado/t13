$(document).ready(function(){
  alert("⇄ Single click abre la caja \n Double click actualiza");
  var eliminar ;
  var fila;
  var div = $('<td><button></button></td>');
  var update = $('<td><button></button></td>');

  function abrir(){
    $("#up").fadeIn("slow");
    $("#up").css("visibility","visible");
    $("#up").css("top", "50px");
    $("#up").css("left", "0");
    $("#up").css("right", "0");
    $("#up").css("margin-right", "auto");
    $("#up").css("margin-left",  "auto");
    $("#up").animate({
    marginLeft: "auto",
    fontSize: "14px",
    borderWidth: "10px",
    width: "900px"
  }, 800 );
    $("#box").animate({
    margin: "235px auto"
    }, 800 );

  }

  function cerrar(){
    $("#box").animate({
    margin: "50px auto"
    }, 800 );
    $("#up").fadeOut( "slow" );

  }

  $(".show").click(function(){
    abrir();
  });

  $("#cerrar").click(function(){
    cerrar();

  });

function refrescar(){
  $.ajax({
      url: "https://andreihelo-restful-api.herokuapp.com/students",
      success: function(result,status,xhr){
        $("tbody").empty();
        for (var i = 0; i < 300; i++) {
            fila = $('<tr></tr>');
            div = $('<td class="eliminar"><i class="fa fa-trash" aria-hidden="true"></i></td>');
            update = $('<td class="modificar"><i class="fa fa-exchange" aria-hidden="true"></i></td>');
                fila.html('<td>'+ result[i].id +'</td>'+
                          '<td>'+ result[i].registration_number +'</td>'+
                          '<td>'+ result[i].name +'</td>'+
                          '<td>'+ result[i].last_name +'</td>'+
                          '<td>'+ result[i].status);
            fila.append(update);
            fila.append(div);
          $('tbody').append(fila);

            div.click(function(){
              eliminar =  $(this).prev().prev().prev().prev().prev().prev().text();
              var r = confirm("Estas apunto de eliminar este registro! ("+ eliminar +")");
              if (r == true) {
                  $.ajax({
                  url: "https://andreihelo-restful-api.herokuapp.com/students/"+ eliminar +"/",
                  type: 'POST',
                  data: {_method: 'delete'},
                  success: function(result) {

                   refrescar();
                    }

                  });
              }
            });


            update.click(function(){
              abrir();
              var actualizar =  $(this).prev().prev().prev().prev().prev().text();
             });
             update.dblclick(function(){
                     var actualizar =  $(this).prev().prev().prev().prev().prev().text();
                     var Matricula = $('input[id=matricula]').val();
                     if(Matricula.length === 0){
                       Matricula = $(this).prev().prev().prev().prev().text();
                     }
                     var Nombre = $('input[id=nombre]').val();
                     if(Nombre.length === 0){
                       Nombre = $(this).prev().prev().prev().text();
                     }
                     var Apellido = $('input[id=apellido]').val();
                     if(Apellido.length === 0){
                       Apellido = $(this).prev().prev().text();
                     }
                     var status = $( '#status option:selected' ).val();
                     if(status  === $('#status option:first').val()){
                       status = $(this).prev().text();
                     }

                     var estudiante = {
                       "registration_number": Matricula,
                       "name": Nombre,
                       "last_name": Apellido,
                       "status": status,
                       _method: '_method=PUT'
                     };
                       $.ajax({
                       url: "https://andreihelo-restful-api.herokuapp.com/students/" + actualizar,
                       type: 'POST',
                       data: estudiante,
                       success: function(result) {
                       alert("Registro actualizado: " + actualizar);
                       refrescar();
                       }

                     });



             });

            }

          }
      });
}

refrescar();

$(".limpiar").click(function limpiar(){
    refrescar();

});


$("#agregar").click(function(){
  var Matricula = $('input[id=matricula]').val();
  var Nombre = $('input[id=nombre]').val();
  var Apellido = $('input[id=apellido]').val();
  var status = $( '#status option:selected' ).val();
   var mensaje = "Error(es) destectado(s) \n";
    
 if((Matricula.length === 0)||(Matricula.length < 6)||(Matricula.length > 6)){
     mensaje = mensaje + "- Falta matricula\n"; 
     if((Matricula.length < 6)||(Matricula.length > 6)){
      mensaje = mensaje + "- La matricula solo puede tener 6 caracteres \n" ;   
     } 
    
  }
  if(Nombre.length === 0){
    mensaje = mensaje + "- Falta Nombre\n";  
  }
  if(Apellido.length === 0){
    mensaje = mensaje + "- Falta Apellido\n";
    }
    if(status  === $('#status option:first').val()){
     mensaje = mensaje + "- Falta status\n";
    }
    
    if(mensaje.length > 26){
        alert(mensaje);
    }

if((Matricula.length > 0)&&(Nombre.length > 0)&&(Apellido.length > 0)&&(status.length > 0)&&(Matricula.length === 6)){

     var estudiante = {
      "registration_number": Matricula,
      "name": Nombre,
      "last_name": Apellido,
      "status": status
     };

     $.ajax({
        url: "https://andreihelo-restful-api.herokuapp.com/students",
        method: "POST",
        data: estudiante,
        success: function(result, status, xhr) {
          alert("Registrado con exito");
          abrir();
          refrescar();
     }
});
}
});

$("#borrar").click(function(){

    $('input[id=matricula]').val('');
    $('input[id=nombre]').val('');
    $('input[id=apellido]').val('');
    $('#status option:selected').removeAttr("selected");
    $('#status option:first').attr("selected","selected");
    $('input[id=matricula]').focus();
});


    $('input[id=matricula]').val('');
    $('input[id=nombre]').val('');
    $('input[id=apellido]').val('');
    $('#status option:selected').removeAttr("selected");
    $('#status option:first').attr("selected","selected");
    $('input[id=matricula]').focus();

});
