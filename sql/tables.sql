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
	id_paciente character varying,
	fecha date,
	id_referencia character varying,
	ids_alergias integer[],
	enfermedad_dolor character varying
)
WITH (OIDS=FALSE);
ALTER TABLE "public"."ma_endodoncia" ADD PRIMARY KEY ("id");