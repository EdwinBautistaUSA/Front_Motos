function getInformation(){
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', 'http://152.67.44.118:8080/api/Motorbike/all');
    /*xhttp.open('GET', 'http://140.238.145.160/api/Motorbike/all');*/
    xhttp.send();

    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status ==200){ 
            let motos = JSON.parse(this.responseText);

            let res = document.querySelector('#res');
            res.innerHTML = '';

            for(let item of motos){
                res.innerHTML += `
                <tr>
                <td>${item.name}</td>
                <td>${item.brand}</td>
                <td>${item.year}</td>
                <td>${item.description}</td>
                <td>${item.category.name}</td>
                <td><button class="btn" onclick="updateMoto(${item.id})" > <i class="material-icons right">edit</i>Modificar</button>
                <td><button class="btn" onclick="borrarRegistroMoto(${item.id})"><i class="material-icons right">delete</i>Eliminar</button>
                </tr>
                `
        }
    }
}
}



function saveInformation(){
    let datosMotos = {
        /*id: $("#id").val(),*/
        name: $("#name").val(),
        brand: $("#brand").val(),
        year: $("#year").val(), 
        description: $("#description").val(),
        category: {id:$("#cat").val()},
    };

    let datosJson = JSON.stringify(datosMotos);
    $.ajax({
        url : 'http://152.67.44.118:8080/api/Motorbike/save',
        data: datosJson,
        type : 'POST',
        dataType : 'JSON',
        contentType: "application/json; charset=utf-8",
          
        success:function(respuesta){
            console.log("Se guardo Correctamente");
            alert("Se guardo Correctamente");
            window.location.reload();
        }
            });
}

function updateMoto (idMoto){
    let infoMoto={
        id:idMoto,
        name: $("#name").val(),
        brand: $("#brand").val(),
        year: $("#year").val(),
        description: $("#description").val()
    };
    let dataToSend=JSON.stringify(infoMoto);
	$.ajax({    
        url : 'http://152.67.44.118:8080/api/Motorbike/update',
        type : 'PUT',
        data : dataToSend,
        dataType : 'JSON',
        contentType : "application/json; charset=utf-8",
      success : function(respuesta) {
		    $("#res").empty();
            $("#id").val("");
            $("#name").val("");
            $("#brand").val("");
            $("#year").val("");
            $("#description").val("");
            getInformation();
            alert("Se ha actualizado Correctamente");
	}
});
}


function borrarRegistroMoto (idMoto){
    let datosMotos = {
        id: idMoto
    };
    let datosJson = JSON.stringify(datosMotos);
    $.ajax({
        url: "http://152.67.44.118:8080/api/Motorbike/"+idMoto,
        data: datosJson,
        type : 'DELETE',
        dataType : 'JSON',
        contentType: "application/json; charset=utf-8",
        
        success:function(respuesta){
            $("#res").empty();
            getInformation();
            alert("Se ha eliminado Correctamente");
        }
            });
}


/*------------------------------------------------------------CLIENTES*/

function getInformationClientes(){
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', 'http://152.67.44.118:8080/api/Client/all');
    xhttp.send();
    
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status ==200){ 
            let client = JSON.parse(this.responseText);

            let res = document.querySelector('#resCli');
            res.innerHTML = '';

            for(let item of client){
                res.innerHTML += `
                <tr>
                <td>${item.email}</td>
                <td>${item.password}</td>
                <td>${item.name}</td>
                <td>${item.age}</td>
                <td><button class="btn" onclick="updateCliente(${item.idClient})"> Editar</button>			 
                <td><button class="btn" onclick="borrarRegistroCliente(${item.idClient})">Eliminar</button>
                </tr>
                `
        }
    }
}
}

function saveInformationClientes(){
    let datosCli = {
        /*id: $("#id").val(),*/
        email: $("#email").val(), 
        password: $("#password").val(), 
        name: $("#name").val(),
        age: $("#age").val()
    };
    let datosJson = JSON.stringify(datosCli);
    $.ajax(
        'http://152.67.44.118:8080/api/Client/save',
        {data: datosJson,
            type : 'POST',
            dataType : 'json',
            contentType: "application/json; charset=utf-8",
          
            statusCode : {
                201 :  function() {
                    alert("guardado!");
                    $("#email").val("");
                    $("#password").val("");
                    $("#name").val("");
                    $("#age").val("");
                    getInformationClientes();	
                    }
                }
            });
}

function updateCliente (doc){
    let infoCli={
        idClient:doc,
        email: $("#email").val(),
        password: $("#password").val(),
        name: $("#name").val(),
        age: $("#age").val()
    }
    let dataToSend=JSON.stringify(infoCli);
	$.ajax({    
        url : 'http://152.67.44.118:8080/api/Client/update',
        data : dataToSend,
        type : 'PUT',
        dataType : 'JSON',
        contentType : "application/json; charset=utf-8",
  
        success : function(respuesta) {
            console.log(infoCli);
		    $("#resCli").empty();
            $("#id").val("");
            $("#email").val("");
            $("#password").val("");
            $("#name").val("");
            $("#age").val("");
            getInformationClientes();
            alert("Se ha actualizado Correctamente");
	},
    error : function(xhr, status){
        alert('ha suecedido un problema' + status);
    }
});
}


function borrarRegistroCliente (doc){
    let datosCli = {
        id: doc
    };
    let datosJson = JSON.stringify(datosCli);
    $.ajax({
        url: "http://152.67.44.118:8080/api/Client/"+doc,
        data: datosJson,
        type : 'DELETE',
        dataType : 'json',
        contentType: "application/json; charset=utf-8",
          
            success:function(respuesta){
            $("#resCli").empty();
            getInformationClientes();
            alert("Se ha eliminado Correctamente");
        }
            });
}




/*------------------------------------------------------------MENSAJES*/

function getInformationMensajes(){
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', 'http://152.67.44.118:8080/api/Message/all');
    xhttp.send();
    
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status ==200){ 
            let message = JSON.parse(this.responseText);

            let res = document.querySelector('#res');
            res.innerHTML = '';

            for(let item of message){
                res.innerHTML += `
                <tr>
                <td>${item.idMessage}</td>
                <td>${item.messageText}</td>
                <td><button class="btn" onclick="updateMensaje(${item.idMessage})" > <i class="material-icons right">edit</i>Editar</button>			 
                <td><button class="btn" onclick="borrarRegistroMensaje(${item.idMessage})"><i class="material-icons right">delete</i>Eliminar</button>
                </tr>
                `
        }
    }
}
}

function saveInformationMensajes(){
    let datosMen = {
        /*id: $("#id").val(),*/
        messageText: $("#messageText").val(),
    };
    let datosJson = JSON.stringify(datosMen);
    $.ajax(
        'http://152.67.44.118:8080/api/Message/save',
        {data: datosJson,
            type : 'POST',
            dataType : 'json',
            contentType: "application/json; charset=utf-8",
          
            statusCode : {
                201 :  function() {
                    alert("guardado!");
                    /*$("#id").val("");*/
                    $("#messageText").val("");
                    getInformationMensajes();	
                    }
                }
            });
}

function updateMensaje (id){
    let infoMen={
        idMessage:id,
        messageText: $("#messageText").val(),
    };
    let dataToSend=JSON.stringify(infoMen);
	$.ajax({    
        url : 'http://152.67.44.118:8080/api/Message/update',
        data : dataToSend,
        type : 'PUT',
        dataType : 'json',
        contentType : "application/json; charset=utf-8",
  
        success : function(respuesta) {
		    $("#res").empty();
            $("#id").val("");
            $("#messageText").val("");
            getInformationMensajes();
            alert("Se ha actualizado Correctamente");
	},
    error : function(xhr, status){
        alert('ha suecedido un problema' + status);
    }
});
}

function updateCategory (idCategory){
    let infoCat={
        id:idCategory,
        name: $("#name").val(),
        description: $("#description").val()
    };
    let dataToSend=JSON.stringify(infoCat);
	$.ajax({    
        url : 'http://152.67.44.118:8080/api/Category/update',
        type : 'PUT',
        data : dataToSend,
        dataType : 'JSON',
        contentType : "application/json; charset=utf-8",
      success : function(respuesta) {
		    $("#res").empty();
            $("#id").val("");
            $("#name").val("");
            $("#description").val("");
            getInformationCategorias();
            alert("Se ha actualizado Correctamente");
	}
});
}

function borrarRegistroMensaje (id){
    let datosMen = {
        id: id
    };
    let datosJson = JSON.stringify(datosMen);
    $.ajax({
        url: "http://152.67.44.118:8080/api/Message/"+id,
        data: datosJson,
        type : 'DELETE',
        dataType : 'JSON',
        contentType: "application/json; charset=utf-8",
        
        success:function(respuesta){
            $("#res").empty();
            getInformationMensajes();
            alert("Se ha eliminado Correctamente");
            }
});
}



/*------------------------------------------------------------CATEGORIAS*/

function getInformationCategorias(){
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', 'http://152.67.44.118:8080/api/Category/all');
    xhttp.send();
    
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status ==200){ 
            let category = JSON.parse(this.responseText);

            let res = document.querySelector('#res');
            res.innerHTML = '';

            for(let item of category){
                console.log(category);
                res.innerHTML += `
                <tr>
                <td>${item.name}</td>
                <td>${item.description}</td>
                <td><button class="btn" onclick="updateCategory(${item.id})" > <i class="material-icons right">edit</i>Modificar</button>
                <td><button class="btn" onclick="borrarRegistroCategoria(${item.id})"><i class="material-icons right">delete</i>Eliminar</button>
                </tr>
                `
        }
    }
}
}


/*------------------------------------------------------------traer combo categoria*/

function getComboCategories(){
    $.ajax({
        url : 'http://152.67.44.118:8080/api/Category/all',
        type : 'GET',
        dataType : 'json',
        contentType : "application/json; charset=utf-8",

        success : function(consumo){
            console.log(consumo);
            $("#cat").empty();
            miSeleccion = "";
            for (i = 0; i<consumo.length; i++){
                miSeleccion += '<option value=' + consumo[i].id + '>' + consumo[i].name +'</option>';
            }
            console.log(miSeleccion);
            $("#cat").append(miSeleccion);
        },
        error : function(xhr, status){
            alert('ERROR REVISAR' + status + JSON);
        }
    });
}


function saveInformationCategory(){
    let datosCat = {
        /*id: $("#id").val(),*/
        name: $("#name").val(),
        description: $("#description").val(),
        
    };
    let datosJson = JSON.stringify(datosCat);
    $.ajax(
        'http://152.67.44.118:8080/api/Category/save',
        {data: datosJson,
            type : 'POST',
            dataType : 'json',
            contentType: "application/json; charset=utf-8",
          
            statusCode : {
                201 :  function() {
                    alert("guardado!");
                    /*$("#id").val("");*/
                    $("#name").val("");
                    $("#description").val("");
                    getInformationCategorias();	
                    }
                }
            });
}

function updateCategory (idCategory){
    let infoCat={
        id:idCategory,
        name: $("#name").val(),
        description: $("#description").val()
    };
    let dataToSend=JSON.stringify(infoCat);
	$.ajax({    
        url : 'http://152.67.44.118:8080/api/Category/update',
        type : 'PUT',
        data : dataToSend,
        dataType : 'JSON',
        contentType : "application/json; charset=utf-8",
      success : function(respuesta) {
		    $("#res").empty();
            $("#id").val("");
            $("#name").val("");
            $("#description").val("");
            getInformationCategorias();
            alert("Se ha actualizado Correctamente");
	}
});
}

function borrarRegistroCategoria (id){
    let datosCat = {
        id: id
    };
    let datosJson = JSON.stringify(datosCat);
    $.ajax({
        url: "http://152.67.44.118:8080/api/Category/"+id,
        data: datosJson,
        type : 'DELETE',
        dataType : 'JSON',
        contentType: "application/json; charset=utf-8",
        
        success:function(respuesta){
            $("#res").empty();
            getInformationCategorias();
            alert("Se ha eliminado Correctamente");
        }
            });
}

function cargueCategoria(){
    $.ajax({
        url : 'http://152.67.44.118:8080/api/Category/all',
        type : 'GET',
        dataType : 'json',
        contentType : "application/json; charset=utf-8",

        success : function(consumo){
            console.log(consumo);
            let $select = $("#cat");
            $.each(consumo, function(id, name){
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                console.log("select"+name.id); 
            });
            
        },

    })
}

/*{
        "name": "Carreras",
        "brand": "AKT",
        "year": 2021,
        "description": "Ducati",
        "category": {"id": 1}
    }*/
