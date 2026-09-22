PROTOTIPO MÓDULO DE PROVEEDORES EDOMÉX · V8

Versión demostrativa sin conexión a servicios institucionales ni base de datos.

AJUSTES PRINCIPALES V8
- Se incorpora el documento de requisitos como fuente del expediente documental.
- El portal público y el panel del proveedor contemplan cinco movimientos:
  1) Alta
  2) Renovación
  3) Modificación
  4) Duplicado
  5) Reposición
- Alta y Renovación conservan la captura de la Cédula de Registro e Identificación de Proveedores.
- Modificación, Duplicado y Reposición utilizan una solicitud simplificada y un expediente documental específico.
- El listado de documentos cambia automáticamente según:
  - tipo de trámite;
  - Persona Jurídico Colectiva / Persona Física.
- Los documentos se identifican como obligatorios o condicionales/opcionales.
- Para Renovación se incorporan la Cédula anterior y la carta bajo protesta respecto de cambios fiscales o comerciales.
- Para Modificación se incorporan solicitud por escrito, documento que acredita el cambio, fotografías y Cédula anterior.
- Para Duplicado se incorporan solicitud por escrito, poder notarial y fotografías.
- Para Reposición se incorporan solicitud por escrito, poder notarial, denuncia ante la Fiscalía General de Justicia y fotografías.
- La autoridad puede consultar la información capturada y abrir los documentos digitales del expediente.
- La revisión previa incorpora referencias a vigencia de identificaciones, constancia fiscal, estados financieros y parámetros financieros.
- El control demostrativo del Registro de Empresas Objetadas y Sancionadas se exige antes de autorizar el Alta; para otros movimientos se muestra como control parametrizable.
- Después de la validación favorable se notifica el pago y, una vez validado, se expide la Cédula demostrativa.
- Montos de referencia tomados del documento 2025:
  - Alta / Renovación: $944.00
  - Modificación / Duplicado / Reposición: $472.00
  Estos importes deben parametrizarse en producción conforme a la disposición vigente.

REGLAS DOCUMENTALES REPRESENTADAS
- El documento aportado indica registro en COMPRAMEX y carga de documentos en formato PDF.
- Si la información es correcta se notifica al proveedor para agendar cita.
- Para cotejo se presentan originales o copias certificadas y copias simples.
- Las firmas autógrafas señaladas en los requisitos deben realizarse en tinta azul.
- El prototipo conserva la posibilidad de retroalimentación en línea antes de la cita de cotejo.

FLUJO DEMOSTRATIVO
Portal abierto -> Registro / acceso -> Selección de trámite -> Captura de solicitud/Cédula -> Expediente documental por tipo de persona -> Validación de autoridad -> Retroalimentación -> Cotejo cuando proceda -> Control previo aplicable -> Validación favorable -> Notificación de pago -> Validación del pago -> Expedición de Cédula -> Consulta pública.

IMPORTANTE
La consulta al Registro de Empresas Objetadas y Sancionadas NO es real. En producción deberá realizarse mediante el mecanismo institucional autorizado, con trazabilidad y evidencia de la consulta.

Los archivos seleccionados se conservan sólo durante la sesión del navegador mediante URLs locales. El prototipo guarda únicamente metadatos en almacenamiento local. En producción los documentos deben almacenarse en un repositorio de expediente electrónico con controles de integridad, acceso, auditoría y conservación.

Abrir index.html en Chrome o Edge. No requiere servidor, Node.js ni base de datos.

AMPLIACIÓN FUNCIONAL · RESPONSABLE DE ASIGNACIÓN
- Se incorpora el perfil "Responsable de Asignación del Padrón de Proveedores".
- El perfil recibe solicitudes, consulta datos generales, asigna y reasigna expedientes a analistas/revisores.
- Incluye dashboard con indicadores, bandeja con filtros, carga de trabajo e historial de asignaciones.
- Las asignaciones y reasignaciones se simulan únicamente en Front-End y se conservan en localStorage durante la demostración.
- La solicitud real generada desde el portal pasa a "Pendiente de asignación" antes de aparecer en la bandeja del personal revisor.
- El flujo documental, cotejo, validación, pago y expedición de cédula existente se conserva sin cambios estructurales.
