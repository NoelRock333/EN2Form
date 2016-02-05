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
	--control_de_tratamiento integer[][],
	conducto_unico character varying[],
	conducto_mesio_vestibular character varying[],
	conducto_disto_vestibular character varying[],
	conducto_distal character varying[],
	conducto_mesio_lingual character varying[],
	conducto_palatino character varying[],
	conducto_vestibular character varying[],
	conducto_mv2 character varying[],
	conducto_disto_lingual character varying[],
	conducto_mesial character varying[],

	pronostico boolean,
	nota_evolucion character varying,

	id_usuario integer NOT NULL,
	id_clinica integer NOT NULL,
	id_titular integer NOT NULL,
	created_at timestamptz not null default now(),
	updated_at timestamptz not null default now()
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





CREATE VIEW "public"."vw_endodoncia" AS 
 SELECT ca_pacientes.nombre,
    ca_pacientes.apellido_paterno,
    ca_pacientes.apellido_materno,
    ca_pacientes.nombre_completo,
    ca_pacientes.sexo,
    ca_pacientes.fecha_nacimiento,
    ca_pacientes.telefono,
    ca_pacientes.direccion,
    ca_pacientes.colonia,
    ca_pacientes.ciudad,
    ca_pacientes.ocupacion,
    ma_endodoncia.id,
    ma_endodoncia.id_paciente,
    ma_endodoncia.anestecia_previa,
    ma_endodoncia.fecha_expediente,
    ma_endodoncia.id_referencia,
    ma_endodoncia.edad_paciente,
    ma_endodoncia.piezas_dentales,
    ma_endodoncia.ids_alergias,
    ma_endodoncia.otra_alergia,
    ma_endodoncia.enfermedad_dolores,
    ma_endodoncia.ultimos_medicamentos,
    ma_endodoncia.ids_problemas,
    ma_endodoncia.ids_antecedentes_del_diente,
    ma_endodoncia.otro_antecedentes_del_diente,
    ma_endodoncia.ids_examen_clinico,
    ma_endodoncia.ids_pulpa,
    ma_endodoncia.ids_palpitacion_periapcial,
    ma_endodoncia.ids_conducto_radicular_rx,
    ma_endodoncia.ids_zona_periapcial_rx,
    ma_endodoncia.ids_diagnostico_pulpar,
    ma_endodoncia.ids_diagnostico_periapcial_presuncion,
    ma_endodoncia.ids_interencion_indicada,
    ma_endodoncia.conducto_unico,
    ma_endodoncia.conducto_mesio_vestibular,
    ma_endodoncia.conducto_disto_vestibular,
    ma_endodoncia.conducto_distal,
    ma_endodoncia.conducto_mesio_lingual,
    ma_endodoncia.conducto_palatino,
    ma_endodoncia.conducto_vestibular,
    ma_endodoncia.conducto_mv2,
    ma_endodoncia.conducto_disto_lingual,
    ma_endodoncia.conducto_mesial,
    ma_endodoncia.pronostico,
    ma_endodoncia.nota_evolucion,
    ma_endodoncia.id_usuario,
    ma_endodoncia.id_clinica,
    ma_endodoncia.id_titular,
    ma_endodoncia.created_at,
    ma_endodoncia.updated_at
   FROM ca_pacientes,
    ma_endodoncia
  WHERE (ma_endodoncia.id_paciente = ca_pacientes.id);;

ALTER TABLE "public"."vw_endodoncia" OWNER TO "postgres";

