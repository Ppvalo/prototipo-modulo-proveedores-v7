PROTOTIPO MÓDULO DE PROVEEDORES EDOMÉX · V7

Versión demostrativa sin conexión a servicios institucionales ni base de datos.

AJUSTES PRINCIPALES V7
- La autoridad dispone de una vista integral del expediente digital.
- Se muestra toda la información capturada por el proveedor organizada por secciones.
- Se muestra el listado de documentos digitales integrados al expediente.
- Si el proveedor selecciona un PDF o imagen durante la misma sesión, la autoridad puede abrirlo y visualizarlo desde su revisión.
- Para datos de ejemplo se conserva una ficha demostrativa del archivo; no contiene bytes reales.
- Se incorpora como control previo la verificación del Registro de Empresas Objetadas y Sancionadas de la Contraloría General.
- La verificación es simulada: permite demostrar resultado SIN COINCIDENCIAS o COINCIDENCIA LOCALIZADA.
- Una coincidencia bloquea la validación favorable de Alta/Renovación.
- El pago de derechos continúa después de la validación favorable y antes de la expedición de la Cédula.
- Se mantiene la expedición demostrativa de Cédula y su mecanismo público de validación.

FLUJO DEMOSTRATIVO
Portal abierto -> Registro / acceso -> Alta o Renovación -> Cédula + expediente -> Validación -> Retroalimentación -> Cotejo si procede -> Consulta Registro de Empresas Objetadas y Sancionadas -> Validación favorable -> Pago de derechos -> Validación del pago -> Expedición de Cédula -> Consulta pública.

IMPORTANTE
La consulta al Registro de Empresas Objetadas y Sancionadas NO es real. En producción debe realizarse mediante el mecanismo institucional autorizado por la Contraloría General, con trazabilidad, evidencia de consulta, fecha/hora, identificador de la respuesta y reglas para impedir la autorización cuando exista una restricción aplicable.

Los archivos seleccionados se conservan sólo durante la sesión del navegador mediante URLs locales. El prototipo guarda únicamente metadatos en almacenamiento local. En producción los documentos deben almacenarse en un repositorio de expediente electrónico con controles de integridad, acceso, auditoría y conservación.

Abrir index.html en Chrome o Edge. No requiere servidor, Node.js ni base de datos.
