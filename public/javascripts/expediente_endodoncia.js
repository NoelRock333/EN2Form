$(document).on("ready", function(){
	$("#piezas_dentales").tagit({ 
		availableTags: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38'], 
		onlyAvailableTags: true, 
		caseSensitive: false 
	});

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
					$("#piezas_dentales").tagit("removeAll");
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

	$('#modal-colega, #modal-paciente').on('hide.bs.modal', function (e) {
		$("#form-paciente")[0].reset();
		$("#form-colega")[0].reset();
	});

	$.validate({
		form: "#form-expediente"
	});

	$('.js_telefono').keypress(function (e){ if( e.which!=8 && e.which!=0 && e.which!=32 && e.which!=40 && e.which!=41 && (e.which<46 || e.which>57)){ return false; }});
	$('.js_numerico').keypress(function (e){if( e.which!=8 && e.which!=0 && (e.which<46 || e.which>57)){return false;}});
	$('.js_fecha').keypress(function (e){if( e.which!=47 && (e.which<46 || e.which>57)){return false;}});

	$('.js_datepicker').datetimepicker({
		format: 'DD/MM/YYYY'
	});
});