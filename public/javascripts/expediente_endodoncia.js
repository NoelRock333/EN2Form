$(document).on("ready", function(){
	$("#piezas_dentales").tagit();

	$('#nombre_colega').typeahead({
		ajax: '/colegas',
		display: 'nombre_completo',
		val: 'id',
		itemSelected: function(item){
			$("#id_referencia").val($(item).data('value'));
		}
	});

	$('#nombre_paciente').typeahead({
		ajax: '/pacientes',
		display: 'nombre_completo',
		val: 'id',
		itemSelected: function(item){
			$("#id_paciente").val($(item).data('value'));
		}
	});

	$("#form-expediente").on("submit", function(){
		$.ajax({
			url: "/save",
			type: "POST",
			dataType: "JSON",
			data: $("#form-expediente").serialize(),
			success: function(data){
				if(data.message){
					bootbox.alert(data.message);
				}
				else{
					bootbox.alert("Expediente guardado correctamente");
					$("html, body").animate({ scrollTop: 0 }, "slow");
					$("#fecha_expediente").val("");
				}
			}
		});
		return false;
	});

	$("#btn-limpiar-form").on("click", function(){
		$("#form-expediente")[0].reset();
		$("#form-expediente [type=hidden]").val("");
	});

	$("#btn-guardar-paciente").on("click", function(){
		$.ajax({
			url: "/nuevo_paciente",
			type: "POST",
			dataType: "JSON",
			data: $("#form-paciente").serialize(),
			success: function(data){
				if(data.message){
					bootbox.alert(data.message);
				}
				else{
					bootbox.alert("Paciente guardado correctamente");
					$('#modal-paciente').modal('hide');
					llenarDatosPaciente(data);
				}
			}
		});
		return false;
	});

	function llenarDatosPaciente(datos)
	{
		$("#nombre_paciente").val(datos.nombre_completo);
		$("#id_paciente").val(datos.id);
		$("#sexo").val(datos.sexo);
		$("#telefono").val(datos.telefono);
		$("#direccion").val(datos.direccion);
		$("#colonia").val(datos.colonia);
		$("#ciudad").val(datos.ciudad);
		$("#ocupacion").val(datos.ocupacion);
	}

	$("#btn-guardar-colega").on("click", function(){
		$.ajax({
			url: "/nuevo_colega",
			type: "POST",
			dataType: "JSON",
			data: $("#form-colega").serialize(),
			success: function(data){
				if(data.message){
					bootbox.alert(data.message);
				}
				else{
					bootbox.alert("Colega guardado correctamente");
					$('#modal-colega').modal('hide');

					//Llenado automatico de datos del colega
					$("#nombre_colega").val(data.nombre_completo);
					$("#id_referencia").val(data.id);
				}
			}
		});
		return false;
	});

	$.validate({
		form: "#form-expediente"
	});

});