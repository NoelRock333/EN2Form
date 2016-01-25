CREATE TABLE ma_endodoncia
(
  id_paciente character varying,
  fecha date,
  id_referencia character varying,
  ids_alergias integer[],
  enfermedad_dolor character varying,
  id serial NOT NULL
)
WITH (
  OIDS=FALSE
);

DROP TABLE IF EXISTS "public"."ma_endodoncia";
CREATE TABLE "public"."ma_endodoncia" (
	id bigserial NOT NULL,
	id_paciente integer,
	anestecia_previa boolean,
	fecha_expediente date,
	id_referencia integer,
	edad_paciente integer,
	piezas_dentales integer[],
	ids_alergias integer[],
	otra_alergia character varying,
	enfermedad_dolores character varying,
	ultimos_medicamentos character varying,
	ids_problemas integer[],
	ids_antecedentes_del_diente integer[],
	otro_antecedentes_del_diente character varying,
	ids_examen_clinico integer[],
	ids_pulpa integer[],
	ids_palpitacion_periapcial integer[],
	ids_conducto_radicular_rx integer[],
	ids_zona_periapcial_rx integer[],
	ids_diagnostico_pulpar integer[],
	ids_diagnostico_periapcial_presuncion integer[],
	ids_interencion_indicada integer[],
	control_de_tratamiento integer[][],
	pronostico boolean,
	nota_evolucion character varying,
	id_usuario integer NOT NULL,
	id_clinica integer NOT NULL,
	id_titular integer NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "public"."ma_endodoncia" ADD PRIMARY KEY ("id");



DROP TABLE IF EXISTS "public"."ca_colegas";
CREATE TABLE "public"."ca_colegas" (
	id bigserial NOT NULL,
	nombre character varying NOT NULL,
	apellido_paterno character varying NOT NULL,
	apellido_materno character varying,
	nombre_completo character varying,
	especialidad character varying
)
WITH (OIDS=FALSE);
ALTER TABLE "public"."ca_colegas" ADD PRIMARY KEY ("id");



DROP TABLE IF EXISTS "public"."ca_pacientes";
CREATE TABLE "public"."ca_pacientes" (
	id bigserial NOT NULL,
	nombre character varying NOT NULL,
	apellido_paterno character varying NOT NULL,
	apellido_materno character varying,
	nombre_completo character varying NOT NULL,
	sexo character,
	fecha_nacimiento date,
	telefono character varying,
	direccion character varying,
	colonia character varying,
	ciudad character varying,
	ocupacion character varying
)
WITH (OIDS=FALSE);
ALTER TABLE "public"."ca_pacientes" ADD PRIMARY KEY ("id");



DROP TABLE IF EXISTS "public"."ca_usuarios";
CREATE TABLE "public"."ca_usuarios" (
	id bigserial NOT NULL,
	email character varying NOT NULL,
	password character varying NOT NULL,
	nombre character varying NOT NULL,
	apellido_paterno character varying NOT NULL,
	apellido_materno character varying,
	nombre_completo character varying NOT NULL,
	sexo character,
	fecha_nacimiento date,
	telefono character varying,
	direccion character varying,
	colonia character varying,
	ciudad character varying,
	ocupacion character varying
)
WITH (OIDS=FALSE);
ALTER TABLE "public"."ca_usuarios" ADD PRIMARY KEY ("id");