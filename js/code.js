$(document).ready(function llamar(){
  //Para cargar una maldita tabla
  var idex = $('input[id=ide]').val();
  var Matricula = $('input[id=matricula]').val();
  var Nombre = $('input[id=nombre]').val();
  var Apellido = $('input[id=apellido]').val();
  var status = $( "#status option:selected" ).val();
    
  
  //var ide = $('input[id=apellido]').val();
  var eliminar ;

  var thead = $('<thead></thead>');
  var fila;
  var div = $('<td><button class="eliminar">x</button></td>');
  var input = $('<input id="matricula" type="text">');
     var estudiante = {
    "registration_number": Matricula,
    "name": Nombre,
    "last_name": Apellido,
    "status": status
  };
$("#test").click(function() {
   prompt("Please enter your name cuack", "Hello");
});

$("#limpiar").click(function(){
    $.ajax({
        url: "https://andreihelo-restful-api.herokuapp.com/students",
        success: function(result,status,xhr){
          $("tbody").empty();
          for (var i = 0; i < 300; i++) {
              fila = $('<tr></tr>');
              div = $('<td class="eliminar"><i class="fa fa-trash" aria-hidden="true"></i></td>');
                  fila.html('<td>'+ result[i].id +'</td>'+
                            '<td>'+ result[i].registration_number +'</td>'+
                            '<td>'+ result[i].name +'</td>'+
                            '<td>'+ result[i].last_name +'</td>'+
                            '<td>'+ result[i].status);
              fila.append(div);
            
            $('tbody').append(fila);
              
              div.click(function(){
                eliminar =  $(this).prev().prev().prev().prev().prev().text();
                var r = confirm("Estas apunto de eliminar este registro! ("+ eliminar +")");
                if (r == true) {
                    $.ajax({
                    url: "https://andreihelo-restful-api.herokuapp.com/students/"+ eliminar +"/",
                    type: 'POST',
                    data: {_method: 'delete'},
                    success: function(result) {
                     alert("Registro eliminado");
                      }

                    });
                } else {
                alert("Ok!");
                }
              });  
              
              
              }

            }
        });

});
$("#agregar").click(function(){
    idex = $('input[id=ide]').val();
   Matricula = $('input[id=matricula]').val();
  Nombre = $('input[id=nombre]').val();
  Apellido = $('input[id=apellido]').val();
  status = $( "#status option:selected" ).val();
if((Matricula.length > 0)||(Nombre.length > 0)||(Apellido.length > 0)){
    $.ajax({
      url: "https://andreihelo-restful-api.herokuapp.com/students",
      method: "POST",
      data: estudiante,
      success: function(result, status, xhr) {
         alert("Registrado exitosamente");
      }

  });  
}else{
       alert("¡Faltan datos!");
}

});
    
$("#borrar").click(function(){
    
    reset();
});

/*
$("#modificar").click(function(){
   Matricula = $('input[id=matricula]').val();
   Nombre = $('input[id=nombre]').val();
   Apellido = $('input[id=apellido]').val();
   status = $( "#status option:selected" ).val();
  $.ajax({
    url: "https://andreihelo-restful-api.herokuapp.com/students/"+ idex +"/",
    type: 'POST',
    data: {_method: 'patch'},
    success: function(result) {
        alert("Registro eliminado");
    }

  });

});*/matricula
function reset(){
    $('input[id=ide]').val('');
    $('input[id=matricula]').val('');
    $('input[id=nombre]').val('');
    $('input[id=apellido]').val('');
    $('input[id=status]').val('');
    $('input[id=matricula]').focus();
}
function reload(){
    idex = $('input[id=ide]').val();
   Matricula = $('input[id=matricula]').val();
  Nombre = $('input[id=nombre]').val();
  Apellido = $('input[id=apellido]').val();
  status = $( "#status option:selected" ).val();
}
reset();
    });
