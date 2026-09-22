(() => {
  const STORAGE = 'edomexProveedorDemoV8';
  const defaultForm = {
    tipoSolicitud:'Alta',fechaElaboracion:'',folioPrevio:'',razonSocial:'',tipoPersona:'Persona jurídica colectiva',antigRamo:'',antigGem:'',
    fiscalCalle:'',fiscalCp:'',fiscalMunicipio:'',fiscalEntidad:'Estado de México',fiscalTelefono:'',fiscalEmail:'',fiscalWeb:'',
    comercialCalle:'',comercialCp:'',comercialMunicipio:'',comercialEntidad:'Estado de México',comercialTelefono:'',comercialEmail:'',comercialWeb:'',
    actaConstitutiva:'',idCif:'',rfc:'',camara:'',representante:'',poderNotarial:'',descripcionActividad:'',
    actividad:[],socios:['','','',''],giros:['','','','','',''],
    pasivoCirculante:'',pasivoCapital:'',activoCirculante:'',almacen:'',personalAdmin:'',personalTecnico:'',personalObrero:'',
    propiaAdmin:'',propiaProd:'',propiaVentas:'',propiaAlmacen:'',rentadaAdmin:'',rentadaProd:'',rentadaVentas:'',rentadaAlmacen:'',
    proveedores:['','','',''],clientes:['','','',''],condiciones:[],declaracion:false,nombreFirma:'',
    motivoMovimiento:'',detalleCambio:''
  };
  const DEMO_ANALYSTS = [
    {name:'María Hernández',role:'Analista de Proveedores',assigned:12,pending:8,concluded:35},
    {name:'Carlos Ramírez',role:'Analista de Proveedores',assigned:8,pending:6,concluded:42},
    {name:'Laura González',role:'Revisor',assigned:15,pending:10,concluded:28},
    {name:'Roberto Sánchez',role:'Analista de Proveedores',assigned:6,pending:4,concluded:31}
  ];

  const DEMO_ASSIGNMENT_REQUESTS = [
    {id:'ASG-001',folio:'PROV-2026-4182',provider:'Suministros del Valle, S.A. de C.V.',personType:'Persona jurídica colectiva',movement:'Alta',date:'2026-09-22',status:'Pendiente de asignación',assignedTo:'',rfc:'SVA260315KQ2',email:'contacto@suministrosvalle.mx',phone:'722 555 1180',activity:'Comercialización de materiales y suministros para oficina.',history:[{when:'22/09/2026 08:42',movement:'Solicitud recibida',user:'Sistema',responsible:'Sin asignar'}]},
    {id:'ASG-002',folio:'PROV-2026-4176',provider:'Tecnologías Integrales Toluca, S.A. de C.V.',personType:'Persona jurídica colectiva',movement:'Renovación',date:'2026-09-22',status:'Asignada',assignedTo:'María Hernández',rfc:'TIT190821M31',email:'administracion@titoluca.mx',phone:'722 555 2291',activity:'Servicios de tecnologías de información.',history:[{when:'22/09/2026 08:10',movement:'Solicitud recibida',user:'Sistema',responsible:'Sin asignar'},{when:'22/09/2026 09:05',movement:'Asignación',user:'Coordinador Demo',responsible:'María Hernández'}]},
    {id:'ASG-003',folio:'PROV-2026-4169',provider:'Servicios Logísticos Lerma, S.A. de C.V.',personType:'Persona jurídica colectiva',movement:'Modificación',date:'2026-09-21',status:'En revisión',assignedTo:'Carlos Ramírez',rfc:'SLL180412J84',email:'tramites@sll.mx',phone:'728 555 3370',activity:'Servicios logísticos, transporte y distribución.',history:[{when:'21/09/2026 10:18',movement:'Solicitud recibida',user:'Sistema',responsible:'Sin asignar'},{when:'21/09/2026 11:02',movement:'Asignación',user:'Coordinador Demo',responsible:'Carlos Ramírez'},{when:'21/09/2026 12:11',movement:'Inicio de revisión',user:'Carlos Ramírez',responsible:'Carlos Ramírez'}]},
    {id:'ASG-004',folio:'PROV-2026-4158',provider:'María Fernanda López Cruz',personType:'Persona física',movement:'Reposición',date:'2026-09-20',status:'Con observaciones',assignedTo:'Laura González',rfc:'LOCF850914PZ7',email:'maria.lopez@example.mx',phone:'722 555 4421',activity:'Servicios de consultoría administrativa.',history:[{when:'20/09/2026 09:30',movement:'Solicitud recibida',user:'Sistema',responsible:'Sin asignar'},{when:'20/09/2026 10:01',movement:'Asignación',user:'Coordinador Demo',responsible:'Laura González'},{when:'21/09/2026 09:20',movement:'Observación registrada',user:'Laura González',responsible:'Laura González'}]},
    {id:'ASG-005',folio:'PROV-2026-4142',provider:'Equipamiento Metropolitano, S.A. de C.V.',personType:'Persona jurídica colectiva',movement:'Duplicado',date:'2026-09-19',status:'Atendida',assignedTo:'Roberto Sánchez',rfc:'EME210303RT4',email:'padron@equipamientomet.mx',phone:'55 5555 4820',activity:'Comercialización de equipo y mobiliario.',history:[{when:'19/09/2026 08:54',movement:'Solicitud recibida',user:'Sistema',responsible:'Sin asignar'},{when:'19/09/2026 09:18',movement:'Asignación',user:'Coordinador Demo',responsible:'Roberto Sánchez'},{when:'20/09/2026 13:45',movement:'Atención registrada',user:'Roberto Sánchez',responsible:'Roberto Sánchez'}]},
    {id:'ASG-006',folio:'PROV-2026-4104',provider:'Constructora Sierra Norte, S.A. de C.V.',personType:'Persona jurídica colectiva',movement:'Renovación',date:'2026-09-17',status:'Concluida',assignedTo:'María Hernández',rfc:'CSN140705C21',email:'contacto@sierranorte.mx',phone:'722 555 7712',activity:'Construcción y mantenimiento de infraestructura.',history:[{when:'17/09/2026 09:04',movement:'Solicitud recibida',user:'Sistema',responsible:'Sin asignar'},{when:'17/09/2026 09:40',movement:'Asignación',user:'Coordinador Demo',responsible:'María Hernández'},{when:'18/09/2026 16:12',movement:'Conclusión',user:'María Hernández',responsible:'María Hernández'}]},
    {id:'ASG-007',folio:'PROV-2026-4098',provider:'José Antonio Pérez Molina',personType:'Persona física',movement:'Alta',date:'2026-09-16',status:'Nueva',assignedTo:'',rfc:'PEMA780502N18',email:'japerez@example.mx',phone:'722 555 6634',activity:'Mantenimiento preventivo y correctivo.',history:[{when:'16/09/2026 14:32',movement:'Solicitud recibida',user:'Sistema',responsible:'Sin asignar'}]}
  ];

  const defaultState = {
    role:null,
    accountRegistered:false,
    account:{name:'',rfc:'',email:''},
    status:'Borrador',folio:'',formStep:0,docs:{},
    timeline:[{label:'Trámite disponible',detail:'El proveedor puede iniciar la captura en línea',when:''}],
    messages:[],
    cotejo:null,
    expedienteValidado:false,
    payment:null,
    cedula:null,
    sanctionsCheck:null,
    reviewChecklist:{},
    assignmentStatus:'',
    assignedTo:'',
    assignedAt:'',
    assignmentReceivedAt:'',
    assignmentHistory:[],
    assignmentRequests:structuredClone(DEMO_ASSIGNMENT_REQUESTS),
    form:structuredClone(defaultForm)
  };

  const DEMO_REGISTRY = [{
    number:'CED-DEMO-2026-02582',
    securityCode:'MX-7Q4D-9K2P',
    provider:'Servicios Integrales Demo, S.A. de C.V.',
    rfc:'SID260101D01',
    requestType:'Alta',
    issueDate:'2026-09-09',
    validUntil:'2027-09-08',
    status:'Vigente',
    representative:'Representante Legal Demo',
    giros:['Servicios de limpieza e higiene'],
    activity:'Servicios de limpieza de inmuebles y mantenimiento de áreas verdes.',
    empresaMexiquense:'No',
    authorizerName:'Servidor público autorizado (DEMO)',
    authorizerTitle:'Dirección de Investigación de Mercado',
    securityFingerprint:'9E4B7A20D11C6F1A8C34B09066D2197A',
    demo:true
  }];

  const cedulaSteps = [
    {title:'Solicitud',note:'Identifique el trámite de Alta o Renovación y la fecha de elaboración.'},
    {title:'Datos generales',note:'Razón social, antigüedad y domicilios fiscal y comercial.'},
    {title:'Registros oficiales',note:'Instrumentos legales, fiscales y representación.'},
    {title:'Actividad y giros',note:'Actividad preponderante, socios y hasta seis giros.'},
    {title:'Capacidad financiera',note:'Cifras del estado financiero del mes inmediato anterior.'},
    {title:'Capacidad administrativa',note:'Personal y superficies ocupadas.'},
    {title:'Capacidad comercial',note:'Principales proveedores y clientes.'},
    {title:'Condiciones',note:'Condiciones básicas ofrecidas.'},
    {title:'Declaración',note:'Revisión final y declaración bajo protesta de decir verdad.'}
  ];
  const movementSteps = [
    {title:'Solicitud',note:'Identifique el movimiento y la cédula o registro vigente relacionado.'},
    {title:'Titular',note:'Datos mínimos del proveedor o prestador de servicios registrado.'},
    {title:'Detalle',note:'Describa el motivo del movimiento y, en Modificación, el dato que requiere actualizar.'},
    {title:'Declaración',note:'Revise la solicitud antes de integrar y enviar el expediente documental.'}
  ];

  const documents = {
    acta:['acta','Acta constitutiva y última modificación','Original/copia para cotejo; cargar soporte digital en el expediente.',true],
    actaNacimiento:['actaNacimiento','Acta de nacimiento','Documento de identificación de la persona física.',true],
    poder:['poder','Poder notarial','Cuando el requisito lo solicite o aplique a la representación legal.',true],
    identificacion:['identificacion','Identificación oficial vigente','INE o pasaporte vigente del representante legal / titular.',true],
    cartaCompromiso:['cartaCompromiso','Carta Compromiso de Actualización de Datos y Documentos','En hoja membretada y firmada por el representante legal, conforme al requisito.',true],
    constanciaFiscal:['constanciaFiscal','Constancia de Situación Fiscal','Emitida por el SAT con domicilio fiscal y actividad preponderante vigentes.',true],
    declaracionAnual:['declaracionAnual','Declaración fiscal anual y acuse','Ejercicio inmediato anterior; para persona física, considerar el supuesto indicado para RIF en el documento.',true],
    estadosFinDeclaracion:['estadosFinDeclaracion','Estados financieros / información financiera fiscal','Soporte asociado a la declaración anual, cuando corresponda.',true],
    contador:['contador','Cédula profesional e identificación del Contador Público','Copia de cédula profesional e identificación oficial del contador que emite estados financieros.',true],
    estadosMes:['estadosMes','Estados financieros del mes inmediato anterior','Estado de posición financiera y estado de resultados; control de revisión previa.',true],
    cedulaFormato:['cedulaFormato','Cédula de Registro e Identificación de Proveedores','Formato debidamente requisitado.',true],
    fotos:['fotos','Dos fotografías recientes tamaño infantil','Profesionales, a color y con fondo blanco del representante legal.',true],
    empresaMex:['empresaMex','Certificado de Empresa Mexiquense','Opcional, en caso de contar con él.',false],
    estadoCuentaNueva:['estadoCuentaNueva','Estado de cuenta bancario de empresa de nueva constitución','Condicional: cuando corresponda al supuesto de empresa de nueva constitución.',false],
    cedulaAnterior:['cedulaAnterior','Cédula anterior','Original para Renovación o Modificación, conforme al requisito aplicable.',true],
    constanciaExtravio:['constanciaExtravio','Constancia / reporte por extravío de cédula anterior','Condicional en Renovación: cuando la cédula anterior se haya extraviado, conforme al supuesto descrito en el documento.',false],
    cartaNoCambios:['cartaNoCambios','Carta bajo protesta sobre cambios fiscales o comerciales','Para Renovación: declarar si hubo o no cambios y anexar soporte cuando proceda.',true],
    solicitudEscrito:['solicitudEscrito','Solicitud por escrito dirigida a la Dirección General de Recursos Materiales','Carta solicitando el movimiento correspondiente.',true],
    documentoCambio:['documentoCambio','Documento que acredita el cambio','Original y copia; aplica a Modificación.',true],
    denuncia:['denuncia','Denuncia ante la Fiscalía General de Justicia','Debe hacer mención del número de cédula y razón social; aplica a Reposición.',true]
  };

  const requirementsByProcedure = {
    Alta:{
      moral:['acta','poder','identificacion','cartaCompromiso','constanciaFiscal','declaracionAnual','estadosFinDeclaracion','contador','estadosMes','cedulaFormato','fotos','empresaMex','estadoCuentaNueva'],
      fisica:['actaNacimiento','identificacion','cartaCompromiso','constanciaFiscal','declaracionAnual','contador','estadosMes','cedulaFormato','fotos','empresaMex']
    },
    Renovación:{
      moral:['acta','poder','identificacion','cartaCompromiso','constanciaFiscal','declaracionAnual','estadosFinDeclaracion','contador','estadosMes','cedulaFormato','fotos','empresaMex','cedulaAnterior','constanciaExtravio','cartaNoCambios'],
      fisica:['actaNacimiento','identificacion','cartaCompromiso','constanciaFiscal','declaracionAnual','contador','estadosMes','cedulaFormato','fotos','empresaMex','cedulaAnterior','constanciaExtravio','cartaNoCambios']
    },
    Modificación:{
      moral:['solicitudEscrito','documentoCambio','fotos','cedulaAnterior'],
      fisica:['solicitudEscrito','documentoCambio','fotos','cedulaAnterior']
    },
    Duplicado:{
      moral:['solicitudEscrito','poder','fotos'],
      fisica:['solicitudEscrito','poder','fotos']
    },
    Reposición:{
      moral:['solicitudEscrito','poder','denuncia','fotos'],
      fisica:['solicitudEscrito','poder','denuncia','fotos']
    }
  };

  function isFullRegistration(){ return state.form.tipoSolicitud==='Alta' || state.form.tipoSolicitud==='Renovación'; }
  function isAdditionalMovement(){ return ['Modificación','Duplicado','Reposición'].includes(state.form.tipoSolicitud); }
  function activeSteps(){ return isFullRegistration()?cedulaSteps:movementSteps; }
  function personKey(){ return state.form.tipoPersona==='Persona física'?'fisica':'moral'; }
  function currentDocTypes(){
    const proc=state.form.tipoSolicitud;
    const keys=(requirementsByProcedure[proc]||requirementsByProcedure.Alta)[personKey()]||[];
    return keys.map(k=>{
      const def=documents[k]; if(!def)return null;
      const copy=[...def];
      if(k==='poder' && (proc==='Alta'||proc==='Renovación')) copy[3]=false;
      if(k==='empresaMex'||k==='estadoCuentaNueva') copy[3]=false;
      return copy;
    }).filter(Boolean);
  }
  function requiredDocTypes(){ return currentDocTypes().filter(x=>x[3]!==false); }
  function requiredDocCount(){ return requiredDocTypes().filter(([k])=>state.docs[k]).length; }
  function requiredDocTotal(){ return requiredDocTypes().length; }
  function feeReference(){
    return ['Alta','Renovación'].includes(state.form.tipoSolicitud)?944:472;
  }
  function requiresSanctionsCheck(){ return state.form.tipoSolicitud==='Alta'; }
  const conditionOptions = [
    'Línea completa de productos o servicios relacionados','Uso de bienes vigentes en el mercado','Asesoría técnica','Planeación de entregas o prestación de servicio','Servicios complementarios','Entrega de productos, L.A.B. o destino','Cambio de productos defectuosos','Disponibilidad de existencias','Entregas inmediatas','Entrega en tiempo','Bienes certificados con normas de calidad','Servicio de mantenimiento','Contado','Crédito','Financiamiento'
  ];

  const $ = s => document.querySelector(s);
  const publicView = $('#publicView'), accessView = $('#accessView'), workspace = $('#workspace');
  const accessPanel = $('#accessPanel'), mainNav = $('#mainNav'), content = $('#content'), pageHeader = $('#pageHeader');
  const modal = $('#modal'), modalBody = $('#modalBody'), modalActions = $('#modalActions');
  let state = load();
  const runtimeFiles = {};


  function deepMerge(base, extra){
    const out = structuredClone(base);
    if (!extra || typeof extra !== 'object') return out;
    Object.keys(extra).forEach(k => {
      if (Array.isArray(extra[k])) out[k] = structuredClone(extra[k]);
      else if (extra[k] && typeof extra[k] === 'object' && out[k] && typeof out[k] === 'object' && !Array.isArray(out[k])) out[k] = deepMerge(out[k], extra[k]);
      else out[k] = extra[k];
    });
    return out;
  }
  function load(){ try{return deepMerge(defaultState, JSON.parse(localStorage.getItem(STORAGE)||'{}'));}catch(e){return structuredClone(defaultState);} }
  function save(){ localStorage.setItem(STORAGE, JSON.stringify(state)); }
  function today(){ const d=new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; }
  function tomorrow(){ const d=new Date(); d.setDate(d.getDate()+1); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; }
  function stamp(){ return new Date().toLocaleString('es-MX',{dateStyle:'medium',timeStyle:'short'}); }
  function escapeHtml(v=''){ return String(v).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }
  function parseDateParts(s){ const m=String(s||'').match(/^(\d{4})-(\d{2})-(\d{2})$/); return m?{y:+m[1],m:+m[2],d:+m[3]}:null; }
  function dateToIso(y,m,d){ return `${String(y).padStart(4,'0')}-${String(m).padStart(2,'0')}-${String(d).padStart(2,'0')}`; }
  function validUntilFrom(issue){ const p=parseDateParts(issue); if(!p) return ''; const dt=new Date(Date.UTC(p.y+1,p.m-1,p.d)); dt.setUTCDate(dt.getUTCDate()-1); return dateToIso(dt.getUTCFullYear(),dt.getUTCMonth()+1,dt.getUTCDate()); }
  function formatDateEs(s){ const p=parseDateParts(s); if(!p) return s||'—'; return new Intl.DateTimeFormat('es-MX',{day:'2-digit',month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(Date.UTC(p.y,p.m-1,p.d))); }
  function makeSecurityCode(){ const alphabet='ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; let raw=''; if(globalThis.crypto?.getRandomValues){ const a=new Uint8Array(8); crypto.getRandomValues(a); for(const n of a) raw+=alphabet[n%alphabet.length]; } else { for(let i=0;i<8;i++) raw+=alphabet[Math.floor(Math.random()*alphabet.length)]; } return `MX-${raw.slice(0,4)}-${raw.slice(4,8)}`; }
  function fallbackHash(str){ let h1=0x811c9dc5,h2=0x9e3779b9; for(let i=0;i<str.length;i++){ const c=str.charCodeAt(i); h1=Math.imul(h1^c,0x01000193); h2=Math.imul(h2+c,0x85ebca6b); } const part=n=>(n>>>0).toString(16).padStart(8,'0').toUpperCase(); return (part(h1)+part(h2)+part(h1^h2)+part(Math.imul(h1,h2))).slice(0,32); }
  async function makeFingerprint(payload){ try{ if(globalThis.crypto?.subtle){ const data=new TextEncoder().encode(payload); const hash=await crypto.subtle.digest('SHA-256',data); return Array.from(new Uint8Array(hash)).map(b=>b.toString(16).padStart(2,'0')).join('').toUpperCase().slice(0,32); } }catch(e){} return fallbackHash(payload); }
  function sealSvg(fingerprint){ const hex=(fingerprint||'0'.repeat(32)).replace(/[^0-9A-F]/gi,'').padEnd(64,'0'); let bits=''; for(const ch of hex) bits+=parseInt(ch,16).toString(2).padStart(4,'0'); const size=15,cell=4; let out=`<svg class="security-seal-svg" viewBox="0 0 ${size*cell} ${size*cell}" role="img" aria-label="Sello gráfico 2D demostrativo">`; let k=0; for(let y=0;y<size;y++){ for(let x=0;x<size;x++){ const finder=((x<4&&y<4)||(x>=size-4&&y<4)||(x<4&&y>=size-4)); const on=finder?((x===0||y===0||x===3||y===3)||(x===1&&y===1)||(x===2&&y===2)):bits[k++%bits.length]==='1'; if(on) out+=`<rect x="${x*cell}" y="${y*cell}" width="${cell}" height="${cell}"/>`; } } return out+'</svg>'; }
  function registryRecordFromState(){ if(!state.cedula) return null; const c=state.cedula; return {number:c.number,securityCode:c.securityCode,provider:c.provider||state.form.razonSocial||state.account.name,rfc:c.rfc||state.form.rfc,requestType:c.requestType||state.form.tipoSolicitud,issueDate:c.date,validUntil:c.validUntil,status:c.status||'Vigente',representative:c.representative||state.form.representante,giros:c.giros||state.form.giros?.filter(Boolean)||[],activity:c.activity||state.form.descripcionActividad,empresaMexiquense:c.empresaMexiquense||'No',authorizerName:c.authorizerName||'Servidor público autorizado (DEMO)',authorizerTitle:c.authorizerTitle||'Dirección de Investigación de Mercado',securityFingerprint:c.securityFingerprint||'',demo:true}; }
  function findCredential(number,code){ const n=String(number||'').trim().toUpperCase(), c=String(code||'').trim().toUpperCase(); const records=[...DEMO_REGISTRY]; const current=registryRecordFromState(); if(current) records.unshift(current); return records.find(r=>String(r.number).toUpperCase()===n && String(r.securityCode).toUpperCase()===c)||null; }
  function credentialStatus(record){ if(!record) return 'No localizada'; const todayIso=today(); if(record.status && record.status!=='Vigente') return record.status; if(record.validUntil && record.validUntil<todayIso) return 'Vencida'; return 'Vigente'; }
  function renderVerificationResult(record){ const box=$('#verificationResult'); if(!box) return; if(!record){ box.innerHTML=`<span class="kicker">Resultado</span><h3 class="verify-bad">No fue posible validar</h3><p>No existe coincidencia entre el número de cédula y el código de seguridad en el registro demostrativo.</p><div class="verification-warning">En producción este resultado deberá provenir del registro oficial y nunca del navegador del usuario.</div>`; return; } const status=credentialStatus(record), ok=status==='Vigente'; box.innerHTML=`<div class="verify-head"><div><span class="kicker">Resultado</span><h3 class="${ok?'verify-ok':'verify-bad'}">${ok?'Cédula validada':'Cédula '+escapeHtml(status.toLowerCase())}</h3></div><span class="status-badge ${ok?'approved':'observed'}">${escapeHtml(status)}</span></div><div class="verify-result-grid"><div><small>Número</small><strong>${escapeHtml(record.number)}</strong></div><div><small>Proveedor</small><strong>${escapeHtml(record.provider)}</strong></div><div><small>RFC</small><strong>${escapeHtml(record.rfc)}</strong></div><div><small>Trámite</small><strong>${escapeHtml(record.requestType)}</strong></div><div><small>Expedición</small><strong>${escapeHtml(formatDateEs(record.issueDate))}</strong></div><div><small>Vigencia hasta</small><strong>${escapeHtml(formatDateEs(record.validUntil))}</strong></div></div><div class="fingerprint-line"><small>Huella digital demostrativa</small><code>${escapeHtml(record.securityFingerprint||'—')}</code></div><div class="verification-success ${ok?'':'warning'}"><b>${ok?'Coincidencia satisfactoria.':'Atención.'}</b> ${ok?'Los datos consultados corresponden a una cédula vigente en el registro demostrativo.':'La cédula fue localizada, pero su estatus no permite considerarla vigente.'}</div>`; }
  function goPublicVerifier(record){ showPublic(); const number=$('#verifyCedulaNumber'),code=$('#verifySecurityCode'); if(record&&number&&code){ number.value=record.number||''; code.value=record.securityCode||''; renderVerificationResult(record); } setTimeout(()=>document.getElementById('verificarPortal')?.scrollIntoView({behavior:'smooth',block:'start'}),20); }
  function clsStatus(s){
    if(s==='Cédula expedida') return 'approved';
    if(s==='Observado') return 'observed';
    if(s==='En validación') return 'review';
    if(s==='Cotejo requerido') return 'cotejo';
    if(s==='Pago de derechos requerido') return 'payment';
    if(s==='Pago reportado') return 'payment-review';
    return '';
  }
  function setStatus(el,s){ el.textContent=s; el.className=`status-badge ${clsStatus(s)}`; el.dataset.status=s; }
  function addTimeline(label,detail){ state.timeline.push({label,detail,when:stamp()}); save(); }
  function addMessage(from,body,type='normal'){
    state.messages.push({from,body,when:stamp(),type}); save();
  }
  function docCount(){ return currentDocTypes().filter(([k])=>state.docs[k]).length; }
  function docTotal(){ return currentDocTypes().length; }
  function docInfo(value){
    if(!value) return null;
    if(typeof value==='string') return {name:value,type:'application/pdf',size:0,uploadedAt:'',demo:true};
    return {name:value.name||'Documento',type:value.type||'',size:Number(value.size||0),uploadedAt:value.uploadedAt||'',demo:!!value.demo};
  }
  function docName(value){ const d=docInfo(value); return d?d.name:''; }
  function formatBytes(bytes){ const n=Number(bytes||0); if(!n)return 'Tamaño no disponible'; if(n<1024)return `${n} B`; if(n<1048576)return `${(n/1024).toFixed(1)} KB`; return `${(n/1048576).toFixed(1)} MB`; }
  function sanctionsLabel(){ const s=state.sanctionsCheck; if(!s)return 'Pendiente'; if(s.result==='clear')return 'Sin coincidencias'; if(s.result==='hit')return 'Coincidencia localizada'; return 'Pendiente'; }

  function progress(){
    const f=state.form;
    if(isAdditionalMovement()){
      const req=['tipoSolicitud','fechaElaboracion','folioPrevio','razonSocial','tipoPersona','rfc','representante','motivoMovimiento','nombreFirma'];
      if(state.form.tipoSolicitud==='Modificación') req.push('detalleCambio');
      let n=req.filter(k=>String(f[k]??'').trim()!=='').length;
      if(f.declaracion)n++;
      return Math.round(n/(req.length+1)*100);
    }
    const req=['tipoSolicitud','fechaElaboracion','razonSocial','tipoPersona','fiscalCalle','fiscalCp','fiscalMunicipio','fiscalEntidad','fiscalTelefono','fiscalEmail','comercialCalle','comercialCp','comercialMunicipio','comercialEntidad','comercialTelefono','comercialEmail','actaConstitutiva','idCif','rfc','representante','descripcionActividad','pasivoCirculante','pasivoCapital','activoCirculante','personalAdmin','personalTecnico','personalObrero','nombreFirma'];
    let n=req.filter(k=>String(f[k]??'').trim()!=='').length;
    if(f.actividad?.length)n++; if(f.giros?.some(Boolean))n++; if(f.declaracion)n++;
    return Math.round(n/(req.length+3)*100);
  }

  function showOnly(which){
    publicView.classList.toggle('hidden',which!=='public');
    accessView.classList.toggle('hidden',which!=='access');
    workspace.classList.toggle('hidden',which!=='workspace');
  }
  function showPublic(){ state.role=null; save(); showOnly('public'); }
  function showAccess(mode){
    showOnly('access');
    const kicker=$('#accessKicker'), title=$('#accessTitle'), desc=$('#accessDescription');
    if(mode==='new'){
      kicker.textContent='Nuevo proveedor'; title.textContent='Crear acceso al Portal'; desc.textContent='El registro de acceso permite iniciar en línea una solicitud de Alta y continuarla posteriormente.';
      accessPanel.innerHTML=`
        <label>Tipo de persona<select id="regType"><option>Persona jurídica colectiva</option><option>Persona física</option></select></label>
        <label>Nombre, denominación o razón social<input id="regName" autocomplete="organization" placeholder="Nombre completo o razón social"></label>
        <label>RFC<input id="regRfc" maxlength="13" placeholder="RFC"></label>
        <label>Correo electrónico<input id="regEmail" type="email" placeholder="correo@ejemplo.mx"></label>
        <label>Contraseña de demostración<input id="regPass" type="password" value="demo1234"></label>
        <button id="createAccountBtn" class="btn btn-primary full" type="button">Crear acceso e iniciar Alta</button>
        <button class="btn btn-ghost full" data-back-public type="button">Regresar</button>
        <p class="micro">Registro simulado. No crea cuentas reales ni consulta RUPAEMEX, CUTS o Llave EdoMéx.</p>`;
      $('#createAccountBtn').onclick=registerProvider;
    } else if(mode==='coordinator'){
      kicker.textContent='Autoridad'; title.textContent='Responsable de Asignación del Padrón de Proveedores'; desc.textContent='Reciba las solicitudes ingresadas, consulte sus datos generales y distribuya los expedientes entre analistas y revisores.';
      accessPanel.innerHTML=`<label>Usuario<input id="coordUser" value="COORDINADOR-DEMO"></label><label>Contraseña<input id="coordPass" type="password" value="demo1234"></label><button id="coordinatorLoginBtn" class="btn btn-primary full" type="button">Ingresar como responsable de asignación</button><button class="btn btn-ghost full" data-back-public type="button">Regresar</button><p class="micro">Acceso simulado para el perfil jerárquico responsable de distribuir solicitudes.</p>`;
      $('#coordinatorLoginBtn').onclick=()=>login('coordinator');
    } else if(mode==='reviewer'){
      kicker.textContent='Autoridad'; title.textContent='Acceso de personal revisor'; desc.textContent='Vista de demostración para validar expedientes asignados, retroalimentar al proveedor y citar para cotejo cuando proceda.';
      accessPanel.innerHTML=`<label>Usuario<input id="revUser" value="REVISOR-DEMO"></label><label>Contraseña<input id="revPass" type="password" value="demo1234"></label><button id="reviewerLoginBtn" class="btn btn-primary full" type="button">Ingresar como autoridad</button><button class="btn btn-ghost full" data-back-public type="button">Regresar</button><p class="micro">Acceso exclusivamente simulado.</p>`;
      $('#reviewerLoginBtn').onclick=()=>login('reviewer');
    } else {
      kicker.textContent='Proveedor registrado'; title.textContent='Ingresar al Portal'; desc.textContent='Ingrese para iniciar o continuar Renovación, Modificación, Duplicado o Reposición, así como atender la retroalimentación de un trámite en línea.';
      accessPanel.innerHTML=`<label>RFC / identificador<input id="loginRfc" value="${escapeHtml(state.account.rfc||'TMD180101AA1')}" maxlength="13"></label><label>Contraseña<input id="loginPass" type="password" value="demo1234"></label><button id="providerLoginBtn" class="btn btn-primary full" type="button">Ingresar</button><button id="demoProviderBtn" class="btn btn-secondary full" type="button">Cargar proveedor de ejemplo</button><button class="btn btn-ghost full" data-back-public type="button">Regresar</button>`;
      $('#providerLoginBtn').onclick=()=>{
        if(!state.accountRegistered){ state.accountRegistered=true; state.account.rfc=$('#loginRfc').value.trim(); save(); }
        login('provider');
      };
      $('#demoProviderBtn').onclick=()=>{ loadDemo(); login('provider'); };
    }
    accessPanel.querySelectorAll('[data-back-public]').forEach(b=>b.onclick=showPublic);
  }
  function registerProvider(){
    const name=$('#regName').value.trim(), rfc=$('#regRfc').value.trim(), email=$('#regEmail').value.trim(), type=$('#regType').value;
    if(!name||!rfc||!email){ toast('Capture nombre o razón social, RFC y correo electrónico para continuar.'); return; }
    state.accountRegistered=true; state.account={name,rfc,email};
    startProcess('Alta',false);
    state.form.razonSocial=name; state.form.rfc=rfc; state.form.fiscalEmail=email; state.form.tipoPersona=type; state.form.fechaElaboracion=today();
    addTimeline('Acceso registrado','Nuevo proveedor registrado en el portal de demostración');
    save(); login('provider');
  }
  function login(role){
    state.role=role; save(); showOnly('workspace');
    $('#avatar').textContent=role==='coordinator'?'C':role==='reviewer'?'A':'P';
    $('#userName').textContent=role==='coordinator'?'Coordinador Demo':role==='reviewer'?'Autoridad Demo':(state.form.razonSocial||state.account.name||'Proveedor');
    $('#userRole').textContent=role==='coordinator'?'Responsable de Asignación':role==='reviewer'?'Personal revisor':'Proveedor / representante';
    buildNav(); route(role==='coordinator'?'coordinator-dashboard':role==='reviewer'?'reviewer':'dashboard');
  }
  function logout(){ showPublic(); }
  function buildNav(){
    const items=state.role==='coordinator'?[
      ['coordinator-dashboard','Dashboard'],['coordinator-requests','Solicitudes'],['coordinator-pending','Pendientes de asignación'],['coordinator-assigned','Solicitudes asignadas'],['coordinator-workload','Carga de trabajo'],['coordinator-history','Historial de asignaciones']
    ]:state.role==='reviewer'?[['reviewer','Bandeja de validación']]:[['dashboard','Inicio'],['form','Solicitud / Cédula'],['docs','Expediente documental'],['tracking','Seguimiento y mensajes']];
    mainNav.innerHTML=items.map(([id,label])=>`<button type="button" data-route="${id}">${label}</button>`).join('');
    mainNav.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>route(b.dataset.route)));
  }
  function header(k,t,p){ pageHeader.innerHTML=`<span class="kicker">${k}</span><h2>${t}</h2><p>${p}</p>`; }
  function route(name){
    mainNav.querySelectorAll('button').forEach(b=>b.classList.toggle('active',b.dataset.route===name));
    if(name==='dashboard')renderDashboard();
    if(name==='form')renderForm();
    if(name==='docs')renderDocs();
    if(name==='tracking')renderTracking();
    if(name==='reviewer')renderReviewer();
    if(name==='review-detail')renderReviewDetail();
    if(name==='coordinator-dashboard')renderCoordinatorDashboard();
    if(name==='coordinator-requests')renderCoordinatorRequests('all');
    if(name==='coordinator-pending')renderCoordinatorRequests('pending');
    if(name==='coordinator-assigned')renderCoordinatorRequests('assigned');
    if(name==='coordinator-workload')renderCoordinatorWorkload();
    if(name==='coordinator-history')renderCoordinatorHistory();
  }

  function startProcess(type,confirm=true){
    const go=()=>{
      const previousRecord=state.cedula?.number||state.form.folioPrevio||'';
      const preserve={razonSocial:state.form.razonSocial||state.account.name,rfc:state.form.rfc||state.account.rfc,fiscalEmail:state.form.fiscalEmail||state.account.email,tipoPersona:state.form.tipoPersona,representante:state.form.representante||'',poderNotarial:state.form.poderNotarial||''};
      state.form={...structuredClone(defaultForm),...preserve,tipoSolicitud:type,fechaElaboracion:today(),folioPrevio:type==='Alta'?'':previousRecord};
      state.status='Borrador'; state.folio=''; state.docs={}; state.formStep=0; state.cotejo=null; state.expedienteValidado=false; state.payment=null; state.cedula=null; state.sanctionsCheck=null; state.reviewChecklist={}; state.messages=[]; state.assignmentStatus=''; state.assignedTo=''; state.assignedAt=''; state.assignmentReceivedAt=''; state.assignmentHistory=[]; Object.keys(runtimeFiles).forEach(k=>{try{URL.revokeObjectURL(runtimeFiles[k].url);}catch(e){} delete runtimeFiles[k];});
      state.timeline=[{label:`${type} iniciada`,detail:'Captura en línea disponible para el proveedor',when:stamp()}];
      save(); route('form');
    };
    if(!confirm){go();return;}
    modalBody.innerHTML=`<p>Se iniciará una nueva solicitud de <b>${type}</b>. Para esta demostración se reiniciará el expediente activo.</p>`;
    modalActions.innerHTML=`<button class="btn btn-secondary" id="cancelStart" type="button">Cancelar</button><button class="btn btn-primary" id="confirmStart" type="button">Iniciar ${type}</button>`;
    openModal(`Iniciar ${type}`); $('#cancelStart').onclick=closeModal; $('#confirmStart').onclick=()=>{closeModal();go();};
  }

  function renderDashboard(){
    header('Proveedor','Panel principal','Inicie, continúe y atienda en línea solicitudes de Alta, Renovación, Modificación, Duplicado o Reposición.');
    content.innerHTML=''; content.append($('#providerDashboardTpl').content.cloneNode(true));
    content.querySelector('[data-kpi="folio"]').textContent=state.folio||'Sin folio';
    content.querySelector('[data-kpi="status"]').textContent=state.status;
    content.querySelector('[data-kpi="progress"]').textContent=progress()+'%';
    content.querySelector('[data-kpi="docs"]').textContent=`${requiredDocCount()}/${requiredDocTotal()}`;
    content.querySelector('[data-dashboard-title]').textContent=`${state.form.tipoSolicitud} · ${isFullRegistration()?'Cédula de Registro e Identificación':'Movimiento del padrón'}`;
    setStatus(content.querySelector('[data-status-badge]'),state.status);
    content.querySelector('[data-progress-bar]').style.width=progress()+'%'; content.querySelector('[data-progress-label]').textContent=progress()+'%';
    content.querySelector('[data-msg-count]').textContent=state.messages.length;
    renderTimeline(content.querySelector('[data-timeline]'));
    content.querySelector('[data-action="open-form"]').onclick=()=>route('form');
    content.querySelector('[data-action="open-docs"]').onclick=()=>route('docs');
    content.querySelector('[data-action="open-tracking"]').onclick=()=>route('tracking');
    content.querySelector('[data-start-alta]').onclick=()=>startProcess('Alta');
    content.querySelector('[data-start-renew]').onclick=()=>startProcess('Renovación');
    content.querySelector('[data-start-mod]')?.addEventListener('click',()=>startProcess('Modificación'));
    content.querySelector('[data-start-dup]')?.addEventListener('click',()=>startProcess('Duplicado'));
    content.querySelector('[data-start-rep]')?.addEventListener('click',()=>startProcess('Reposición'));
  }
  function renderTimeline(el){
    const rows=state.timeline.length?state.timeline:[{label:'Trámite disponible',detail:'Sin actividad',when:''}];
    el.innerHTML=rows.slice(-7).map((x,i)=>`<div class="timeline-item ${i===rows.slice(-7).length-1?'current':'done'}"><span class="timeline-dot"></span><div><strong>${escapeHtml(x.label)}</strong><small>${escapeHtml(x.detail||'')}${x.when?` · ${escapeHtml(x.when)}`:''}</small></div></div>`).join('');
  }

  function renderForm(){
    const steps=activeSteps();
    if(state.formStep>=steps.length) state.formStep=steps.length-1;
    header(isFullRegistration()?'Cédula':'Solicitud',`${state.form.tipoSolicitud} de proveedor`,isFullRegistration()?'La Cédula se captura y guarda en línea; el expediente documental se integra conforme al tipo de persona.':'El movimiento utiliza una solicitud simplificada y un expediente documental específico conforme al requisito aportado.');
    content.innerHTML=''; content.append($('#formTpl').content.cloneNode(true));
    const stepBox=content.querySelector('[data-form-steps]');
    stepBox.innerHTML=steps.map((st,i)=>`<button type="button" class="form-step ${i===state.formStep?'active':''}" data-goto="${i}"><b>${i+1}</b><span>${st.title}</span></button>`).join('');
    stepBox.querySelectorAll('button').forEach(b=>b.onclick=()=>{captureForm();state.formStep=+b.dataset.goto;save();renderForm();});
    setStatus(content.querySelector('[data-form-status]'),state.status);
    const form=content.querySelector('#providerForm'); form.innerHTML=sectionHtml(state.formStep); hydrateForm(form); bindFormDynamics(form);
    content.querySelector('[data-step-label]').textContent=`Paso ${state.formStep+1} de ${steps.length}`;
    content.querySelector('[data-prev]').disabled=state.formStep===0; content.querySelector('[data-next]').style.visibility=state.formStep===steps.length-1?'hidden':'visible';
    content.querySelector('[data-prev]').onclick=()=>{captureForm();state.formStep=Math.max(0,state.formStep-1);save();renderForm();};
    content.querySelector('[data-next]').onclick=()=>{captureForm();state.formStep=Math.min(steps.length-1,state.formStep+1);save();renderForm();};
    content.querySelector('[data-save]').onclick=()=>{captureForm();save();toast('Borrador guardado. Puede cerrar sesión y continuar posteriormente en esta demostración.');};
    content.querySelector('[data-review]').onclick=()=>{captureForm();save();openReviewModal();};
  }

  function sectionHtml(i){
    const steps=activeSteps();
    const note=`<div class="section-note">${steps[i].note}<span class="source-chip">${isFullRegistration()?'Campo de la cédula':'Movimiento del padrón'}</span></div>`;
    if(isAdditionalMovement()) return movementSectionHtml(i,note);
    if(i===0)return `<section class="form-section"><span class="kicker">Paso 1</span><h3>Tipo de solicitud</h3>${note}<div class="procedure-current"><span>Trámite activo</span><strong>${escapeHtml(state.form.tipoSolicitud)}</strong></div><div class="form-grid cols2 mt24"><label>Fecha de elaboración<input type="date" name="fechaElaboracion"></label><label>Folio / registro previo <small>${state.form.tipoSolicitud==='Renovación'?'requerido para identificar el registro':'si aplica'}</small><input name="folioPrevio"></label></div><div class="section-note mt24">Para iniciar un tipo de movimiento distinto, regrese al panel principal y seleccione el trámite correspondiente.</div></section>`;
    if(i===1)return `<section class="form-section"><span class="kicker">Paso 2</span><h3>Datos generales de la empresa</h3>${note}<div class="form-grid cols3"><label class="span2">Nombre, denominación o razón social<input name="razonSocial"></label><label>Tipo de persona<select name="tipoPersona"><option>Persona jurídica colectiva</option><option>Persona física</option></select></label><label>Antigüedad en el ramo (años)<input type="number" min="0" name="antigRamo"></label><label>Antigüedad en el G.E.M. (años)<input type="number" min="0" name="antigGem"></label></div>${addressBlock('fiscal','Domicilio fiscal')}${addressBlock('comercial','Domicilio comercial')}</section>`;
    if(i===2)return `<section class="form-section"><span class="kicker">Paso 3</span><h3>Registros oficiales</h3>${note}<div class="form-grid cols2"><label>No. de acta constitutiva o de nacimiento<input name="actaConstitutiva"></label><label>No. de folio ante la S.H. y C.P. (idCIF)<input name="idCif"></label><label>RFC<input name="rfc" maxlength="13"></label><label>Cámara a la que pertenece y constancia <small>(opcional)</small><input name="camara"></label><label>Representante legal o propietario<input name="representante"></label><label>No. de poder notarial <small>(si aplica)</small><input name="poderNotarial"></label></div><div class="section-note mt24">Los requisitos documentales del expediente se ajustan automáticamente al tipo de persona y al trámite seleccionado.</div></section>`;
    if(i===3)return `<section class="form-section"><span class="kicker">Paso 4</span><h3>Actividad preponderante y giros</h3>${note}<div class="checks">${['Productor','Distribuidor','Prestador de servicios','Comercializador'].map(x=>`<label class="check"><input type="checkbox" name="actividad" value="${x}"> ${x}</label>`).join('')}</div><label class="mt24">Descripción de las actividades preponderantes<textarea name="descripcionActividad" rows="4"></textarea></label><div class="subhead">Socios principales</div><div class="repeat-grid">${[0,1,2,3].map(j=>`<label>Socio ${j+1}<input name="socios_${j}"></label>`).join('')}</div><div class="subhead">Giros principales seleccionados · máximo 6</div><div class="repeat-grid">${[0,1,2,3,4,5].map(j=>`<label>Giro ${j+1}<input name="giros_${j}"></label>`).join('')}</div></section>`;
    if(i===4)return `<section class="form-section"><span class="kicker">Paso 5</span><h3>Capacidad financiera</h3>${note}<div class="form-grid cols2"><label>Pasivo circulante ($)<input type="number" min="0" step=".01" name="pasivoCirculante" data-fin></label><label>Pasivo y capital ($)<input type="number" min="0" step=".01" name="pasivoCapital" data-fin></label><label>Activo circulante ($)<input type="number" min="0" step=".01" name="activoCirculante" data-fin></label><label>Almacén ($)<input type="number" min="0" step=".01" name="almacen" data-fin></label></div><div class="metric-grid mt24"><div class="metric" data-metric="endeuda"><span>Endeudamiento</span><strong>—</strong><small>Máximo 0.40</small></div><div class="metric" data-metric="liquidez"><span>Liquidez</span><strong>—</strong><small>Mínimo 1.00</small></div><div class="metric" data-metric="solvencia"><span>Solvencia</span><strong>—</strong><small>Mínimo 1.00</small></div></div><div class="section-note mt24">El documento de revisión previa exige verificar los parámetros financieros y la vigencia temporal de los estados financieros del mes inmediato anterior.</div></section>`;
    if(i===5)return `<section class="form-section"><span class="kicker">Paso 6</span><h3>Capacidad administrativa</h3>${note}<div class="form-grid cols3"><label>Personal administrativo<input type="number" min="0" name="personalAdmin" data-person></label><label>Personal técnico<input type="number" min="0" name="personalTecnico" data-person></label><label>Personal obrero<input type="number" min="0" name="personalObrero" data-person></label></div><div class="section-note mt24">Total de personal: <b data-person-total>0</b></div><div class="subhead">Superficie propia (m²)</div>${areaInputs('propia')}<div class="subhead">Superficie rentada (m²)</div>${areaInputs('rentada')}</section>`;
    if(i===6)return `<section class="form-section"><span class="kicker">Paso 7</span><h3>Capacidad comercial</h3>${note}<div class="subhead">Principales proveedores</div><div class="repeat-grid">${[0,1,2,3].map(j=>`<label>Proveedor ${j+1}<input name="proveedores_${j}"></label>`).join('')}</div><div class="subhead">Principales clientes</div><div class="repeat-grid">${[0,1,2,3].map(j=>`<label>Cliente ${j+1}<input name="clientes_${j}"></label>`).join('')}</div></section>`;
    if(i===7)return `<section class="form-section"><span class="kicker">Paso 8</span><h3>Condiciones básicas que ofrece</h3>${note}<div class="checks">${conditionOptions.map(x=>`<label class="check"><input type="checkbox" name="condiciones" value="${escapeHtml(x)}"> ${escapeHtml(x)}</label>`).join('')}</div></section>`;
    return `<section class="form-section"><span class="kicker">Paso 9</span><h3>Declaración y revisión</h3>${note}<div class="section-note">“Declaro bajo protesta de decir verdad que la información contenida en la presente cédula es cierta y puede ser verificada en cualquier momento”.</div><label class="check"><input type="checkbox" name="declaracion"> Acepto la declaración para efectos de esta demostración.</label><label class="mt24">Nombre del propietario o representante legal<input name="nombreFirma"></label><div class="subhead">Resumen</div>${summaryHtml()}</section>`;
  }

  function movementSectionHtml(i,note){
    const t=state.form.tipoSolicitud;
    if(i===0)return `<section class="form-section"><span class="kicker">Paso 1</span><h3>${escapeHtml(t)}</h3>${note}<div class="procedure-current"><span>Movimiento solicitado</span><strong>${escapeHtml(t)}</strong></div><div class="form-grid cols2 mt24"><label>Fecha de solicitud<input type="date" name="fechaElaboracion"></label><label>Número / folio de cédula o registro vigente<input name="folioPrevio" placeholder="Identifique la cédula relacionada"></label></div><div class="section-note mt24">El documento de requisitos contempla, además de Alta y Renovación, los movimientos de Modificación, Duplicado y Reposición.</div></section>`;
    if(i===1)return `<section class="form-section"><span class="kicker">Paso 2</span><h3>Datos del proveedor registrado</h3>${note}<div class="form-grid cols2"><label class="span2">Nombre, denominación o razón social<input name="razonSocial"></label><label>Tipo de persona<select name="tipoPersona"><option>Persona jurídica colectiva</option><option>Persona física</option></select></label><label>RFC<input name="rfc" maxlength="13"></label><label>Representante legal o titular<input name="representante"></label><label>No. de poder notarial <small>${['Duplicado','Reposición'].includes(t)?'requisito documental del movimiento':'si aplica'}</small><input name="poderNotarial"></label></div></section>`;
    if(i===2){
      const change=t==='Modificación'?`<label>Dato(s) que se solicita modificar<textarea name="detalleCambio" rows="4" placeholder="Describa el dato o información que requiere actualización..."></textarea></label>`:'';
      const help=t==='Reposición'?'La Reposición requiere denuncia ante la Fiscalía General de Justicia que mencione número de cédula y razón social.':t==='Duplicado'?'El Duplicado requiere solicitud por escrito, poder notarial y fotografías conforme al documento aportado.':'La Modificación requiere solicitud por escrito, documento que acredite el cambio, fotografías y cédula original.';
      return `<section class="form-section"><span class="kicker">Paso 3</span><h3>Detalle del movimiento</h3>${note}<label>Motivo / descripción de la solicitud<textarea name="motivoMovimiento" rows="5" placeholder="Explique brevemente el motivo del movimiento..."></textarea></label>${change}<div class="section-note mt24"><b>Requisito asociado:</b> ${escapeHtml(help)}</div></section>`;
    }
    return `<section class="form-section"><span class="kicker">Paso 4</span><h3>Declaración y revisión</h3>${note}<label class="check"><input type="checkbox" name="declaracion"> Declaro que la información proporcionada para este movimiento es correcta para efectos de la demostración.</label><label class="mt24">Nombre del propietario o representante legal<input name="nombreFirma"></label><div class="subhead">Resumen</div>${summaryHtml()}</section>`;
  }

  function addressBlock(p,t){return `<div class="subhead">${t}</div><div class="form-grid cols3"><label class="span2">Calle, colonia, núm. ext. e int.<input name="${p}Calle"></label><label>Código postal<input name="${p}Cp" maxlength="5"></label><label>Municipio o delegación<input name="${p}Municipio"></label><label>Entidad federativa<input name="${p}Entidad"></label><label>Teléfono(s)<input name="${p}Telefono"></label><label>Correo electrónico<input type="email" name="${p}Email"></label><label>Página web<input name="${p}Web" placeholder="https://"></label></div>`;}
  function areaInputs(p){return `<div class="form-grid cols2"><label>Área administrativa<input type="number" min="0" step=".01" name="${p}Admin"></label><label>Área de producción<input type="number" min="0" step=".01" name="${p}Prod"></label><label>Área de ventas<input type="number" min="0" step=".01" name="${p}Ventas"></label><label>Área de almacén<input type="number" min="0" step=".01" name="${p}Almacen"></label></div>`;}
  function summaryHtml(){const f=state.form;return `<div class="summary-grid"><div class="summary-item"><small>Trámite</small><strong>${escapeHtml(f.tipoSolicitud)}</strong></div><div class="summary-item"><small>Razón social</small><strong>${escapeHtml(f.razonSocial||'Pendiente')}</strong></div><div class="summary-item"><small>RFC</small><strong>${escapeHtml(f.rfc||'Pendiente')}</strong></div><div class="summary-item"><small>Representante</small><strong>${escapeHtml(f.representante||'Pendiente')}</strong></div><div class="summary-item"><small>Documentos obligatorios</small><strong>${requiredDocCount()} de ${requiredDocTotal()}</strong></div><div class="summary-item"><small>Avance</small><strong>${progress()}%</strong></div></div>`;}
  function hydrateForm(form){
    [...form.elements].forEach(el=>{const n=el.name;if(!n)return;
      if(n.startsWith('socios_'))el.value=state.form.socios[+n.split('_')[1]]||'';
      else if(n.startsWith('giros_'))el.value=state.form.giros[+n.split('_')[1]]||'';
      else if(n.startsWith('proveedores_'))el.value=state.form.proveedores[+n.split('_')[1]]||'';
      else if(n.startsWith('clientes_'))el.value=state.form.clientes[+n.split('_')[1]]||'';
      else if(el.type==='checkbox')el.checked=Array.isArray(state.form[n])?state.form[n].includes(el.value):!!state.form[n];
      else if(el.type==='radio')el.checked=state.form[n]===el.value;
      else if(state.form[n]!=null)el.value=state.form[n];
    }); calcFinancial(form);calcPersonnel(form);
  }
  function captureForm(){
    const form=content.querySelector('#providerForm');if(!form)return;
    [...form.elements].forEach(el=>{const n=el.name;if(!n)return;
      if(n.startsWith('socios_'))state.form.socios[+n.split('_')[1]]=el.value.trim();
      else if(n.startsWith('giros_'))state.form.giros[+n.split('_')[1]]=el.value.trim();
      else if(n.startsWith('proveedores_'))state.form.proveedores[+n.split('_')[1]]=el.value.trim();
      else if(n.startsWith('clientes_'))state.form.clientes[+n.split('_')[1]]=el.value.trim();
      else if(el.type==='checkbox'&&(n==='actividad'||n==='condiciones')){if(!Array.isArray(state.form[n]))state.form[n]=[];const set=new Set(state.form[n]);el.checked?set.add(el.value):set.delete(el.value);state.form[n]=[...set];}
      else if(el.type==='checkbox')state.form[n]=el.checked;
      else if(el.type==='radio'){if(el.checked)state.form[n]=el.value;}
      else state.form[n]=el.value;
    });
    $('#userName').textContent=state.form.razonSocial||state.account.name||'Proveedor';
  }
  function bindFormDynamics(form){form.querySelectorAll('[data-fin]').forEach(x=>x.addEventListener('input',()=>calcFinancial(form)));form.querySelectorAll('[data-person]').forEach(x=>x.addEventListener('input',()=>calcPersonnel(form)));}
  function calcFinancial(form){if(!form)return;const n=x=>parseFloat(form.elements[x]?.value||0),pc=n('pasivoCirculante'),cap=n('pasivoCapital'),ac=n('activoCirculante'),alm=n('almacen');const vals={endeuda:cap?pc/cap:null,liquidez:pc?(ac-alm)/pc:null,solvencia:pc?ac/pc:null},rules={endeuda:v=>v<=.4,liquidez:v=>v>=1,solvencia:v=>v>=1};Object.entries(vals).forEach(([k,v])=>{const box=form.querySelector(`[data-metric="${k}"]`);if(!box)return;box.classList.remove('ok','bad');box.querySelector('strong').textContent=v==null?'—':v.toFixed(2);if(v!=null)box.classList.add(rules[k](v)?'ok':'bad');});}
  function calcPersonnel(form){if(!form)return;const n=x=>parseInt(form.elements[x]?.value||0,10)||0,el=form.querySelector('[data-person-total]');if(el)el.textContent=n('personalAdmin')+n('personalTecnico')+n('personalObrero');}

  function renderDocs(){
    const defs=currentDocTypes();
    header('Expediente','Documentación soporte',`Requisitos documentales para ${state.form.tipoSolicitud} · ${state.form.tipoPersona}. El proveedor integra archivos en línea y la autoridad puede consultarlos durante la validación.`);
    content.innerHTML='';content.append($('#docsTpl').content.cloneNode(true));const list=content.querySelector('[data-doc-list]');
    const title=content.querySelector('[data-docs-title]'); if(title)title.textContent=`${state.form.tipoSolicitud} · ${state.form.tipoPersona}`;
    const intro=content.querySelector('[data-docs-intro]'); if(intro)intro.innerHTML=`El listado cambia automáticamente según el trámite y tipo de persona. <b>${requiredDocTotal()}</b> documentos están marcados como obligatorios en esta demostración; los condicionales u opcionales se identifican por separado.`;
    list.innerHTML=defs.map(([k,n,d,required])=>{const info=docInfo(state.docs[k]);return `<div class="doc-row"><div><div class="doc-title-line"><strong>${n}</strong><span class="doc-requirement ${required===false?'optional':'required'}">${required===false?'Condicional / opcional':'Requerido'}</span></div><small>${d}</small>${info?`<small class="doc-ok">✓ ${escapeHtml(info.name)} · ${escapeHtml(formatBytes(info.size))}</small>`:''}</div><div class="doc-actions"><label class="btn btn-secondary btn-small file-btn">Seleccionar<input type="file" data-doc="${k}" accept=".pdf,.jpg,.jpeg,.png"></label>${info?`<button class="btn btn-ghost btn-small" type="button" data-provider-view-doc="${k}">Ver</button><button class="btn btn-ghost btn-small" type="button" data-remove="${k}">Quitar</button>`:''}</div></div>`}).join('');
    list.querySelectorAll('input[type=file]').forEach(inp=>inp.onchange=()=>{const file=inp.files[0];if(!file)return;if(file.size>12*1024*1024){toast('Para esta demostración seleccione archivos de hasta 12 MB.');return;}if(runtimeFiles[inp.dataset.doc]){try{URL.revokeObjectURL(runtimeFiles[inp.dataset.doc].url);}catch(e){}}runtimeFiles[inp.dataset.doc]={url:URL.createObjectURL(file),type:file.type,name:file.name};state.docs[inp.dataset.doc]={name:file.name,type:file.type,size:file.size,uploadedAt:stamp(),demo:false};save();renderDocs();});
    list.querySelectorAll('[data-remove]').forEach(b=>b.onclick=()=>{if(runtimeFiles[b.dataset.remove]){try{URL.revokeObjectURL(runtimeFiles[b.dataset.remove].url);}catch(e){} delete runtimeFiles[b.dataset.remove];}delete state.docs[b.dataset.remove];save();renderDocs();});
    list.querySelectorAll('[data-provider-view-doc]').forEach(b=>b.onclick=()=>openDocumentViewer(b.dataset.providerViewDoc));
    const denom=Math.max(1,requiredDocTotal()),pct=Math.round(requiredDocCount()/denom*100),donut=content.querySelector('[data-donut]');donut.style.setProperty('--p',pct);content.querySelector('[data-doc-percent]').textContent=pct+'%';
    content.querySelector('[data-doc-summary]').innerHTML=defs.map(([k,n,d,required])=>`<div class="checkline"><span>${n}${required===false?' <small>(condicional/opcional)</small>':''}</span><b>${state.docs[k]?'Integrado':required===false?'Si aplica':'Pendiente'}</b></div>`).join('');
    const note=content.querySelector('[data-docs-source-note]'); if(note)note.innerHTML='<b>Regla del documento aportado:</b> el proveedor se registra en COMPRAMEX y sube sus documentos en formato PDF; si la información es correcta se le notifica para agendar cita. Los originales o copias certificadas y copias simples se presentan para cotejo.';
    content.querySelector('[data-return-form]').onclick=()=>route('form');
  }

  function openDocumentViewer(key){
    const def=currentDocTypes().find(([k])=>k===key)||documents[key],info=docInfo(state.docs[key]); if(!info)return;
    const live=runtimeFiles[key];
    let preview='';
    if(live?.url){
      if((live.type||'').startsWith('image/')) preview=`<img class="document-preview-image" src="${live.url}" alt="Vista previa de ${escapeHtml(info.name)}">`;
      else preview=`<iframe class="document-preview-frame" src="${live.url}" title="Vista previa de ${escapeHtml(info.name)}"></iframe>`;
    } else {
      preview=`<div class="document-placeholder"><b>Archivo registrado en el expediente</b><p>${escapeHtml(info.name)}</p><small>En los datos demostrativos o después de recargar la página se conserva la ficha del documento, pero no sus bytes. Si el proveedor selecciona un archivo en esta sesión, la autoridad puede visualizarlo aquí.</small></div>`;
    }
    modal.classList.add('wide-modal');
    modalBody.innerHTML=`<div class="document-meta"><div><small>Tipo documental</small><strong>${escapeHtml(def?.[1]||key)}</strong></div><div><small>Archivo</small><strong>${escapeHtml(info.name)}</strong></div><div><small>Tamaño</small><strong>${escapeHtml(formatBytes(info.size))}</strong></div><div><small>Cargado</small><strong>${escapeHtml(info.uploadedAt||'Dato demostrativo')}</strong></div></div>${preview}`;
    modalActions.innerHTML='<button class="btn btn-primary" id="closeDocumentViewer" type="button">Cerrar</button>';
    openModal('Documento del expediente digital');
    $('#closeDocumentViewer').onclick=closeModal;
  }

  function renderDigitalExpedient(el){
    const f=state.form;
    const sections=isFullRegistration()?[
      ['Datos generales',[['Tipo de solicitud',f.tipoSolicitud],['Tipo de persona',f.tipoPersona],['Razón social',f.razonSocial],['Antigüedad en el ramo',f.antigRamo],['Antigüedad en G.E.M.',f.antigGem],['Fecha de elaboración',f.fechaElaboracion]]],
      ['Domicilio fiscal',[['Domicilio',f.fiscalCalle],['C.P.',f.fiscalCp],['Municipio',f.fiscalMunicipio],['Entidad',f.fiscalEntidad],['Teléfono',f.fiscalTelefono],['Correo',f.fiscalEmail],['Página web',f.fiscalWeb]]],
      ['Domicilio comercial',[['Domicilio',f.comercialCalle],['C.P.',f.comercialCp],['Municipio',f.comercialMunicipio],['Entidad',f.comercialEntidad],['Teléfono',f.comercialTelefono],['Correo',f.comercialEmail],['Página web',f.comercialWeb]]],
      ['Registros oficiales',[['Acta / instrumento',f.actaConstitutiva],['Folio idCIF',f.idCif],['RFC',f.rfc],['Cámara',f.camara],['Representante',f.representante],['Poder notarial',f.poderNotarial]]],
      ['Actividad y giros',[['Actividad preponderante',(f.actividad||[]).join(', ')],['Descripción',f.descripcionActividad],['Socios',(f.socios||[]).filter(Boolean).join(' · ')],['Giros',(f.giros||[]).filter(Boolean).join(' · ')]]],
      ['Capacidad',[['Pasivo circulante',f.pasivoCirculante],['Pasivo y capital',f.pasivoCapital],['Activo circulante',f.activoCirculante],['Almacén',f.almacen],['Personal total',String((+f.personalAdmin||0)+(+f.personalTecnico||0)+(+f.personalObrero||0))],['Condiciones',(f.condiciones||[]).join(' · ')]]]
    ]:[
      ['Movimiento',[['Tipo',f.tipoSolicitud],['Fecha',f.fechaElaboracion],['Cédula / registro relacionado',f.folioPrevio],['Motivo',f.motivoMovimiento],['Dato a modificar',f.detalleCambio]]],
      ['Titular',[['Tipo de persona',f.tipoPersona],['Razón social / nombre',f.razonSocial],['RFC',f.rfc],['Representante / titular',f.representante],['Poder notarial',f.poderNotarial]]]
    ];
    const infoHtml=sections.map(([title,rows],i)=>`<details class="exp-section" ${i===0?'open':''}><summary>${escapeHtml(title)}</summary><div class="exp-grid">${rows.map(([a,b])=>`<div><small>${escapeHtml(a)}</small><strong>${escapeHtml(b||'—')}</strong></div>`).join('')}</div></details>`).join('');
    const defs=currentDocTypes();
    const docsHtml=defs.map(([k,n,d,required])=>{const info=docInfo(state.docs[k]);return `<div class="authority-doc-row"><div><div class="doc-title-line"><strong>${escapeHtml(n)}</strong><span class="doc-requirement ${required===false?'optional':'required'}">${required===false?'Condicional / opcional':'Requerido'}</span></div><small>${escapeHtml(d)}</small>${info?`<span>✓ ${escapeHtml(info.name)} · ${escapeHtml(formatBytes(info.size))}</span>`:'<span class="missing-doc">Pendiente</span>'}</div>${info?`<button class="btn btn-secondary btn-small" type="button" data-authority-view-doc="${k}">Ver documento</button>`:''}</div>`}).join('');
    el.innerHTML=`<div class="expedient-tabs"><div><span class="kicker">Información capturada</span>${infoHtml}</div><div><span class="kicker">Documentos digitales · ${escapeHtml(f.tipoPersona)}</span><div class="authority-doc-list">${docsHtml}</div><div class="source-note"><b>Control documental:</b> la autoridad puede cotejar los archivos cargados contra originales o copias certificadas cuando corresponda y registrar observaciones dentro de la misma bitácora.</div></div></div>`;
    el.querySelectorAll('[data-authority-view-doc]').forEach(b=>b.onclick=()=>openDocumentViewer(b.dataset.authorityViewDoc));
  }

  function reviewChecksForCurrent(){
    const t=state.form.tipoSolicitud, moral=personKey()==='moral';
    if(isFullRegistration()){
      const rows=[
        ['fechas','Fechas de formatos y cartas al día del trámite'],
        ['sat','Objeto social / actividades económicas ante SAT vigentes y específicas'],
        ['identificaciones','Identificaciones oficiales vigentes'],
        ['carta','Carta Compromiso revisada conforme al requisito'],
        ['constancia','Constancia de Situación Fiscal actualizada'],
        ['declaracion','Declaración anual, acuse e información financiera revisados'],
        ['firmaContador','Firma del Contador Público consistente con su identificación'],
        ['cedulaContador','Número de cédula del Contador Público corroborado'],
        ['estadosMes','Estados financieros del mes inmediato anterior dentro del periodo aceptable'],
        ['ratios','Parámetros financieros: endeudamiento ≤ 0.40, liquidez ≥ 1.0, solvencia ≥ 1.0'],
        ['fotografias','Fotografías del representante legal revisadas'],
        ['datosCedula','Datos de la Cédula corroborados'],
        ['firmaRepresentante','Documentación que requiere firma suscrita por el representante legal']
      ];
      if(moral) rows.splice(2,0,['capital','Capital social concordante con declaración, balance e instrumento legal']);
      if(moral) rows.splice(3,0,['asamblea','Asamblea de socios por futuros aumentos de capital, sólo si aplica']);
      if(t==='Renovación'){
        rows.push(['cedulaAnterior','Cédula anterior integrada para Renovación']);
        rows.push(['cartaNoCambios','Carta bajo protesta respecto de cambios fiscales o comerciales revisada']);
      }
      return rows;
    }
    const rows=[
      ['solicitud','Solicitud por escrito revisada'],
      ['titular','Datos del proveedor y representante corroborados'],
      ['fotografias','Fotografías del representante legal revisadas'],
      ['cotejo','Documentos originales / copias para cotejo identificados']
    ];
    if(t==='Modificación') rows.splice(2,0,['cambio','Documento que acredita el cambio revisado']);
    if(t==='Duplicado'||t==='Reposición') rows.splice(2,0,['poder','Poder notarial revisado']);
    if(t==='Reposición') rows.splice(3,0,['denuncia','Denuncia ante la Fiscalía General de Justicia revisada']);
    if(t==='Modificación') rows.push(['cedulaAnterior','Cédula anterior identificada para el movimiento']);
    return rows;
  }
  function reviewChecklistComplete(){
    return reviewChecksForCurrent().every(([k])=>state.reviewChecklist[k]===true);
  }
  function renderReviewChecklist(el){
    const rows=reviewChecksForCurrent();
    const done=rows.filter(([k])=>state.reviewChecklist[k]).length;
    el.innerHTML=`<div class="card-head"><div><span class="kicker">Revisión previa</span><h3>Lista de control del expediente</h3></div><span class="status-badge ${done===rows.length?'approved':''}">${done}/${rows.length}</span></div><p>Controles de revisión derivados del documento de requisitos. La autoridad debe dejar evidencia de su revisión antes de validar favorablemente el expediente.</p><div class="review-checklist">${rows.map(([k,label])=>`<label class="review-check"><input type="checkbox" data-review-check="${k}" ${state.reviewChecklist[k]?'checked':''}><span>${escapeHtml(label)}</span></label>`).join('')}</div><div class="source-note"><b>Nota:</b> los controles “sólo si aplica” deben parametrizarse en producción para no bloquear indebidamente un expediente cuando el supuesto no corresponda.</div>`;
    el.querySelectorAll('[data-review-check]').forEach(cb=>cb.addEventListener('change',()=>{state.reviewChecklist[cb.dataset.reviewCheck]=cb.checked;save();renderReviewDetail();}));
  }

  function renderSanctionsPanel(el){
    const s=state.sanctionsCheck;
    if(!requiresSanctionsCheck()){el.innerHTML=`<div class="card-head"><div><span class="kicker">Control previo · Contraloría General</span><h3>Registro de Empresas Objetadas y Sancionadas</h3></div><span class="status-badge">No requerido en este flujo</span></div><p>La regla incorporada en este prototipo exige esta verificación antes de autorizar el <b>Alta</b>. Para ${escapeHtml(state.form.tipoSolicitud)}, el control se muestra como referencia y puede parametrizarse si la autoridad determina que también debe aplicarse.</p>`;return;}
    if(!s){el.innerHTML=`<div class="card-head"><div><span class="kicker">Control previo · Contraloría General</span><h3>Registro de Empresas Objetadas y Sancionadas</h3></div><span class="status-badge sanctions-pending">Pendiente</span></div><p>Antes de validar favorablemente el Alta, la autoridad debe verificar que la empresa no se encuentre en el registro correspondiente. Esta consulta es simulada y no está conectada a un servicio real.</p>`;return;}
    const clear=s.result==='clear';
    el.innerHTML=`<div class="card-head"><div><span class="kicker">Control previo · Contraloría General</span><h3>Registro de Empresas Objetadas y Sancionadas</h3></div><span class="status-badge ${clear?'sanctions-clear':'sanctions-hit'}">${clear?'Sin coincidencias':'Coincidencia localizada'}</span></div><div class="sanctions-result"><div><small>Proveedor consultado</small><strong>${escapeHtml(s.provider||'')}</strong></div><div><small>RFC</small><strong>${escapeHtml(s.rfc||'')}</strong></div><div><small>Fecha de consulta</small><strong>${escapeHtml(s.checkedAt||'')}</strong></div><div><small>Resultado</small><strong>${clear?'No se localizaron coincidencias en la simulación.':'Se simuló una coincidencia; la autorización queda bloqueada.'}</strong></div></div><div class="${clear?'success-box':'observation-box'} mt24"><strong>${clear?'Control previo satisfecho':'Autorización bloqueada'}</strong><p>${clear?'La solicitud puede continuar con las demás validaciones.':'La autoridad debe atender la situación conforme al procedimiento aplicable antes de continuar.'}</p></div>`;
  }

  function openSanctionsCheckModal(){
    const prior=state.sanctionsCheck;
    if(!requiresSanctionsCheck()){toast('La consulta obligatoria de este prototipo se aplica al trámite de Alta.');return;}
    modalBody.innerHTML=`<p>Consulta previa a la autorización del Alta.</p><div class="form-grid cols2"><label>Empresa<input value="${escapeHtml(state.form.razonSocial||state.account.name||'Proveedor')}" disabled></label><label>RFC<input value="${escapeHtml(state.form.rfc||state.account.rfc||'')}" disabled></label></div><div class="source-note"><b>Demostración sin conexión:</b> en producción esta acción deberá consultar el Registro de Empresas Objetadas y Sancionadas de la Contraloría General mediante el mecanismo institucional autorizado, conservar evidencia de la consulta y devolver una respuesta trazable.</div>${prior?`<p class="micro">Último resultado registrado: <b>${escapeHtml(sanctionsLabel())}</b> · ${escapeHtml(prior.checkedAt||'')}</p>`:''}`;
    modalActions.innerHTML='<button class="btn btn-ghost" id="cancelSanctions" type="button">Cancelar</button><button class="btn btn-warning" id="simulateHit" type="button">Simular coincidencia</button><button class="btn btn-primary" id="simulateClear" type="button">Simular sin coincidencias</button>';
    openModal('Verificar Registro de Empresas Objetadas y Sancionadas');
    $('#cancelSanctions').onclick=closeModal;
    $('#simulateClear').onclick=()=>{state.sanctionsCheck={result:'clear',provider:state.form.razonSocial||state.account.name||'',rfc:state.form.rfc||state.account.rfc||'',checkedAt:stamp(),source:'Registro de Empresas Objetadas y Sancionadas · simulación'};addTimeline('Consulta de sanciones','Sin coincidencias en la verificación demostrativa del registro');addMessage('Sistema','Se registró la consulta previa al Registro de Empresas Objetadas y Sancionadas: sin coincidencias.','system');save();closeModal();renderReviewDetail();};
    $('#simulateHit').onclick=()=>{state.sanctionsCheck={result:'hit',provider:state.form.razonSocial||state.account.name||'',rfc:state.form.rfc||state.account.rfc||'',checkedAt:stamp(),source:'Registro de Empresas Objetadas y Sancionadas · simulación'};state.expedienteValidado=false;addTimeline('Consulta de sanciones','Se simuló una coincidencia; la autorización quedó bloqueada');addMessage('Sistema','La consulta demostrativa al Registro de Empresas Objetadas y Sancionadas arrojó una coincidencia. La solicitud no puede autorizarse mientras subsista este resultado.','system');save();closeModal();renderReviewDetail();};
  }

  function openReviewModal(){
    const missing=[],f=state.form;
    if(isAdditionalMovement()){
      [['folioPrevio','Número / folio de cédula o registro'],['razonSocial','Razón social / nombre'],['rfc','RFC'],['representante','Representante / titular'],['fechaElaboracion','Fecha'],['motivoMovimiento','Motivo'],['nombreFirma','Nombre para firma']].forEach(([k,l])=>{if(!String(f[k]||'').trim())missing.push(l);});
      if(f.tipoSolicitud==='Modificación'&&!String(f.detalleCambio||'').trim())missing.push('Dato a modificar');
      if(!f.declaracion)missing.push('Declaración');
    } else {
      [['razonSocial','Razón social'],['rfc','RFC'],['representante','Representante'],['fechaElaboracion','Fecha'],['descripcionActividad','Actividad'],['nombreFirma','Nombre para firma']].forEach(([k,l])=>{if(!String(f[k]||'').trim())missing.push(l);});
      if(f.tipoSolicitud==='Renovación'&&!String(f.folioPrevio||'').trim())missing.push('Folio / registro previo');
      if(!f.actividad?.length)missing.push('Actividad preponderante');if(!f.giros?.some(Boolean))missing.push('Al menos un giro');if(!f.declaracion)missing.push('Declaración');
    }
    const missingDocs=requiredDocTypes().filter(([k])=>!state.docs[k]).map(([,n])=>n);
    modalBody.innerHTML=`<p>Avance de captura: <b>${progress()}%</b>. Documentos obligatorios: <b>${requiredDocCount()}/${requiredDocTotal()}</b>.</p>${missing.length?`<div class="observation-box"><strong>Información pendiente</strong><p>${missing.join(', ')}.</p></div>`:`<div class="success-box"><strong>Captura mínima completa.</strong><p>La información básica del trámite está completa.</p></div>`}${missingDocs.length?`<div class="observation-box mt24"><strong>Expediente documental incompleto</strong><p>Falta integrar: ${missingDocs.map(escapeHtml).join(', ')}.</p></div>`:`<div class="success-box mt24"><strong>Expediente documental obligatorio integrado.</strong><p>Al enviar, la autoridad podrá revisar cada documento digital, retroalimentar y citar para cotejo cuando proceda.</p></div>`}`;
    const blocked=missing.length||missingDocs.length;
    modalActions.innerHTML=`<button class="btn btn-secondary" id="cancelSend" type="button">Cancelar</button><button class="btn btn-primary" id="confirmSend" type="button" ${blocked?'disabled':''}>Enviar a validación</button>`;
    openModal('Revisión previa');$('#cancelSend').onclick=closeModal;const c=$('#confirmSend');if(c)c.onclick=()=>{submitRequest();closeModal();route('tracking');};
  }

  function submitRequest(){
    if(!state.folio)state.folio=`PROV-${new Date().getFullYear()}-${String(Math.floor(1000+Math.random()*9000))}`;
    state.status='En validación';
    state.assignmentStatus='Pendiente de asignación'; state.assignedTo=''; state.assignedAt=''; state.assignmentReceivedAt=stamp();
    state.assignmentHistory=[{when:state.assignmentReceivedAt,movement:'Solicitud recibida',user:'Sistema',responsible:'Sin asignar'}];
    addTimeline('Solicitud enviada','Expediente recibido por la autoridad y pendiente de asignación a un analista o revisor');
    addMessage('Sistema',`La solicitud de ${state.form.tipoSolicitud} fue recibida por la autoridad y está pendiente de asignación.`,'system');save();
  }

  function renderTracking(){
    header('Seguimiento','Trámite, pago de derechos y retroalimentación en línea','Consulte el estatus, atienda observaciones, reciba citas para cotejo y, una vez validado el expediente, atienda la notificación de pago de derechos.');
    content.innerHTML='';content.append($('#trackingTpl').content.cloneNode(true));
    content.querySelector('[data-track-folio]').textContent=state.folio||'Sin folio asignado';content.querySelector('[data-track-status]').textContent=state.status;
    content.querySelector('[data-track-details]').innerHTML=[['Proveedor',state.form.razonSocial||'Pendiente'],['RFC',state.form.rfc||'Pendiente'],['Trámite',state.form.tipoSolicitud],['Fecha',state.form.fechaElaboracion||'Pendiente'],['Documentos',`${requiredDocCount()}/${requiredDocTotal()}`],['Expediente validado',state.expedienteValidado?'Sí':'No']].map(([a,b])=>`<div class="detail-row"><span>${a}</span><strong>${escapeHtml(b)}</strong></div>`).join('');
    renderTimeline(content.querySelector('[data-track-timeline]'));
    renderCotejoPanel(content.querySelector('[data-cotejo-panel]'));
    renderPaymentPanel(content.querySelector('[data-payment-panel]'));
    renderThread(content.querySelector('[data-message-thread]'));
    const compose=content.querySelector('[data-provider-compose]');
    if(state.status==='Cédula expedida'){
      compose.innerHTML=`<div class="success-box"><strong>Trámite concluido.</strong><p>El pago fue validado y la cédula fue expedida. La bitácora permanece disponible para consulta.</p></div>`;
    } else if(state.status==='Pago de derechos requerido' || state.status==='Pago reportado'){
      compose.innerHTML=`<div class="notice-card card-inline"><strong>Etapa de pago de derechos.</strong><p>Utilice el apartado de pago para reportar o consultar la verificación del comprobante. La bitácora continúa disponible.</p></div>`;
    } else {
      content.querySelector('[data-provider-send]').onclick=()=>{
        const ta=content.querySelector('[data-provider-message]'),body=ta.value.trim();if(!body){toast('Escriba una respuesta o aclaración.');return;}
        addMessage('Proveedor',body); state.status='En validación'; addTimeline('Respuesta del proveedor','Aclaración enviada en línea y expediente reenviado a validación');save(); renderTracking();
      };
    }
  }

  function renderCotejoPanel(p){
    if(!state.cotejo){
      p.innerHTML=`<span class="kicker">Cotejo</span><h3>Sin cita requerida</h3><p>La validación puede concluir en línea. Si la autoridad determina que procede un cotejo, la cita aparecerá aquí y en la bitácora.</p>`;return;
    }
    const c=state.cotejo;
    p.innerHTML=`<div class="card-head"><div><span class="kicker">Cotejo documental / de identidad</span><h3>${c.completed?'Cotejo realizado':'Cita programada'}</h3></div><span class="status-badge cotejo">${c.completed?'Realizado':(c.confirmed?'Asistencia confirmada':'Pendiente de confirmar')}</span></div><div class="appointment-grid"><div><small>Fecha</small><strong>${escapeHtml(c.date)}</strong></div><div><small>Hora</small><strong>${escapeHtml(c.time)}</strong></div><div><small>Lugar</small><strong>${escapeHtml(c.place)}</strong></div><div><small>Motivo</small><strong>${escapeHtml(c.reason)}</strong></div></div>${!c.confirmed&&!c.completed?'<button class="btn btn-primary mt24" data-confirm-cotejo type="button">Confirmar asistencia</button>':''}`;
    const b=p.querySelector('[data-confirm-cotejo]');if(b)b.onclick=()=>{state.cotejo.confirmed=true;addMessage('Proveedor','Confirmo mi asistencia a la cita de cotejo.');addTimeline('Cita confirmada','El proveedor confirmó su asistencia al cotejo');save();renderTracking();};
  }
  function renderPaymentPanel(p){
    if(!state.payment){
      p.innerHTML=`<span class="kicker">Pago de derechos</span><h3>Aún no requerido</h3><p>El pago se notifica únicamente después de que la autoridad valida favorablemente el expediente del trámite.</p>`;
      return;
    }
    const pay=state.payment;
    const amount=pay.amount?`$${Number(pay.amount).toLocaleString('es-MX',{minimumFractionDigits:2,maximumFractionDigits:2})} MXN`:'Por determinar / según notificación';
    const status=state.cedula?'Cédula expedida':pay.verified?'Pago validado':pay.reported?'Comprobante enviado':'Pago pendiente';
    p.innerHTML=`<div class="card-head"><div><span class="kicker">Pago de derechos</span><h3>${escapeHtml(status)}</h3></div><span class="status-badge ${state.cedula?'approved':pay.reported?'payment-review':'payment'}">${escapeHtml(state.cedula?'Concluido':pay.reported?'En verificación':'Requerido')}</span></div>
      <div class="payment-grid">
        <div><small>Concepto</small><strong>${escapeHtml(pay.concept||'Pago de derechos')}</strong></div>
        <div><small>Monto</small><strong>${escapeHtml(amount)}</strong></div>
        <div><small>Fecha límite</small><strong>${escapeHtml(pay.dueDate||'No indicada')}</strong></div>
        <div><small>Referencia / línea</small><strong>${escapeHtml(pay.reference||'No indicada')}</strong></div>
      </div>
      <div class="source-note"><b>Instrucciones de la autoridad:</b> ${escapeHtml(pay.instructions||'Consulte la notificación de pago.')}</div>
      ${pay.evidence?`<div class="payment-proof"><strong>Comprobante enviado</strong><span>${escapeHtml(pay.evidence)}</span>${pay.providerReference?`<small>Referencia reportada: ${escapeHtml(pay.providerReference)}</small>`:''}</div>`:''}
      ${state.cedula?`<div class="success-box mt24"><strong>Cédula expedida</strong><p>Número / folio: <b>${escapeHtml(state.cedula.number)}</b><br>Fecha de expedición: <b>${escapeHtml(state.cedula.date)}</b><br>Código de seguridad: <b>${escapeHtml(state.cedula.securityCode||'—')}</b></p><div class="actions"><button class="btn btn-primary" data-view-cedula type="button">Ver cédula demo</button><button class="btn btn-secondary" data-verify-cedula type="button">Validar públicamente</button></div></div>`:''}
      ${!pay.reported&&!state.cedula?`<div class="payment-form mt24"><h3>Reportar pago</h3><div class="form-grid cols2"><label>Referencia del pago<input data-pay-provider-ref placeholder="Referencia del pago realizado"></label><label>Comprobante de pago<input data-pay-file type="file" accept=".pdf,.jpg,.jpeg,.png"></label></div><button class="btn btn-primary mt24" data-report-payment type="button">Enviar comprobante para validación</button></div>`:''}
      ${pay.reported&&!pay.verified&&!state.cedula?`<div class="observation-box mt24"><strong>Comprobante en verificación</strong><p>La autoridad debe validar el pago antes de expedir la cédula.</p></div>`:''}`;
    const report=p.querySelector('[data-report-payment]');
    if(report) report.onclick=()=>{
      const ref=p.querySelector('[data-pay-provider-ref]').value.trim();
      const file=p.querySelector('[data-pay-file]').files[0];
      if(!ref||!file){toast('Capture la referencia del pago y seleccione el comprobante.');return;}
      state.payment.providerReference=ref;
      state.payment.evidence=file.name;
      state.payment.reported=true;
      state.payment.reportedAt=stamp();
      state.status='Pago reportado';
      addMessage('Proveedor',`Se reportó el pago de derechos. Referencia: ${ref}. Comprobante: ${file.name}.`);
      addTimeline('Pago reportado','El proveedor envió el comprobante para validación de la autoridad');
      save();renderTracking();
    };
    const view=p.querySelector('[data-view-cedula]');
    if(view) view.onclick=()=>showCedulaModal();
    const verify=p.querySelector('[data-verify-cedula]');
    if(verify) verify.onclick=()=>goPublicVerifier(registryRecordFromState());
  }

  function cedulaCardHtml(record){
    const giros=(record.giros||[]).filter(Boolean);
    const seal=sealSvg(record.securityFingerprint||'');
    const provider=record.provider||'Proveedor';
    const rep=record.representative||'Representante legal';
    return `<div class="credential-wrap">
      <div class="credential-demo-banner">DEMOSTRACIÓN · SIN VALIDEZ OFICIAL</div>
      <div class="credential-pages">
        <section class="credential-card credential-front">
          <div class="credential-watermark">DEMO</div>
          <div class="credential-brand"><div class="brand-mini"><b>GOBIERNO DEL<br>ESTADO DE MÉXICO</b></div><div class="brand-divider"></div><div class="brand-mini"><b>ESTADO DE<br>MÉXICO</b><small>El poder de servir</small></div></div>
          <h2>OFICIALÍA MAYOR</h2>
          <div class="credential-number">CÉDULA NÚMERO: <b>${escapeHtml(record.number)}</b></div>
          <p>Se hace constar, para efectos de esta demostración, que la empresa/persona proveedora denominada:</p>
          <h3>${escapeHtml(provider)}</h3>
          <p>por conducto de <b>${escapeHtml(rep)}</b>, cuenta con registro de proveedor en el sistema demostrativo. El texto jurídico definitivo deberá validarse y parametrizarse por la autoridad competente.</p>
          <div class="credential-type">CÉDULA DE PROVEEDOR</div>
          <p>ACREDITA EL REGISTRO POR EL PERIODO:</p>
          <div class="credential-validity"><b>${escapeHtml(formatDateEs(record.issueDate))}</b><span>AL</span><b>${escapeHtml(formatDateEs(record.validUntil))}</b></div>
          <p class="credential-place">Toluca, Estado de México · ${escapeHtml(formatDateEs(record.issueDate))}</p>
          <div class="credential-sign"><div class="signature-scribble">Firma electrónica / autógrafa</div><b>${escapeHtml(record.authorizerName||'Servidor público autorizado (DEMO)')}</b><span>${escapeHtml(record.authorizerTitle||'Dirección de Investigación de Mercado')}</span></div>
          <div class="security-strip"><div>${seal}<small>Sello 2D demo</small></div><div><small>Código de seguridad</small><b>${escapeHtml(record.securityCode)}</b><small>Huella: ${escapeHtml((record.securityFingerprint||'').slice(0,16))}</small></div></div>
        </section>
        <section class="credential-card credential-back">
          <div class="credential-watermark">DEMO</div>
          <div class="credential-back-head"><div class="photo-placeholder">${escapeHtml((rep||'R').split(/\s+/).slice(0,2).map(x=>x[0]||'').join('').toUpperCase())}<small>FOTO / IDENTIDAD</small></div><div class="back-meta"><b>${escapeHtml(record.requestType||'Alta').toUpperCase()}</b><span>CÉDULA: ${escapeHtml(record.number)}</span><span>RFC: ${escapeHtml(record.rfc||'')}</span></div></div>
          <div class="credential-field"><small>EMPRESA/PERSONA REGISTRADA EN LOS GIROS DE:</small><strong>${escapeHtml(giros.length?giros.join(' · '):'Sin giros registrados')}</strong></div>
          <div class="credential-field"><small>ACTIVIDAD PREPONDERANTE:</small><strong>${escapeHtml(record.activity||'Sin descripción')}</strong></div>
          <div class="credential-field inline-field"><small>CERTIFICADO DE EMPRESA MEXIQUENSE:</small><strong>${escapeHtml(record.empresaMexiquense||'No')}</strong></div>
          <div class="credential-sign rep-sign"><div class="signature-scribble">Firma del representante</div><b>${escapeHtml(rep)}</b><span>REPRESENTANTE ACREDITADO DE LA EMPRESA</span></div>
          <div class="security-panel"><div class="security-seal-large">${seal}</div><div><span class="kicker">Validación pública</span><h4>${escapeHtml(record.securityCode)}</h4><p>Verifique número de cédula + código de seguridad en el Portal de Proveedores.</p><code>${escapeHtml(record.securityFingerprint||'')}</code></div></div>
        </section>
      </div>
      <div class="credential-security-note"><b>Mecanismo demostrativo:</b> folio único + código de seguridad + huella digital + sello gráfico 2D + consulta pública. En producción, la huella y el QR deben generarse y firmarse en servidor; el portal debe consultar el registro central y admitir revocación.</div>
    </div>`;
  }

  function showCedulaModal(){
    const record=registryRecordFromState(); if(!record) return;
    modal.classList.add('wide-modal');
    modalBody.innerHTML=cedulaCardHtml(record);
    modalActions.innerHTML=`<button class="btn btn-secondary" id="printCedula" type="button">Imprimir demo</button><button class="btn btn-secondary" id="verifyCedulaPublic" type="button">Validar en portal público</button><button class="btn btn-primary" id="closeCedula" type="button">Cerrar</button>`;
    openModal('Cédula de proveedor · demostración');
    $('#printCedula').onclick=()=>window.print();
    $('#verifyCedulaPublic').onclick=()=>{closeModal();goPublicVerifier(record);};
    $('#closeCedula').onclick=closeModal;
  }

  function renderThread(el){
    if(!state.messages.length){el.innerHTML='<div class="empty-thread">No hay mensajes todavía.</div>';return;}
    el.innerHTML=state.messages.map(m=>`<div class="message ${m.from==='Proveedor'?'provider':m.from==='Autoridad'?'authority':'system'}"><div class="message-meta"><strong>${escapeHtml(m.from)}</strong><small>${escapeHtml(m.when||'')}</small></div><p>${escapeHtml(m.body)}</p></div>`).join('');
  }

  function assignmentStatusClass(status){
    const map={'Nueva':'assignment-new','Pendiente de asignación':'assignment-pending','Asignada':'assignment-assigned','En revisión':'assignment-review','Con observaciones':'assignment-observed','Atendida':'assignment-attended','Concluida':'assignment-done'};
    return map[status]||'';
  }
  function liveCoordinatorStatus(){
    if(!state.assignmentStatus) return '';
    if(state.status==='Cédula expedida') return 'Concluida';
    if(state.status==='Observado') return 'Con observaciones';
    if(state.status==='Pago de derechos requerido'||state.status==='Pago reportado') return 'Atendida';
    return state.assignmentStatus;
  }
  function liveCoordinatorRequest(){
    if(!state.folio||!state.assignmentStatus) return null;
    return {id:'LIVE',folio:state.folio,provider:state.form.razonSocial||state.account.name||'Proveedor',personType:state.form.tipoPersona||'—',movement:state.form.tipoSolicitud||'—',date:state.form.fechaElaboracion||today(),status:liveCoordinatorStatus(),assignedTo:state.assignedTo||'',rfc:state.form.rfc||state.account.rfc||'',email:state.form.fiscalEmail||state.account.email||'',phone:state.form.fiscalTelefono||state.form.comercialTelefono||'',activity:state.form.descripcionActividad||(state.form.actividad||[]).join(', ')||(state.form.giros||[]).filter(Boolean).join(', '),history:state.assignmentHistory||[],live:true};
  }
  function coordinatorRequestsData(){
    const rows=(state.assignmentRequests||[]).map(r=>({...r,history:r.history||[]}));
    const live=liveCoordinatorRequest(); if(live) rows.unshift(live);
    return rows;
  }
  function getCoordinatorRequest(id){
    if(id==='LIVE') return liveCoordinatorRequest();
    return (state.assignmentRequests||[]).find(r=>r.id===id)||null;
  }
  function updateCoordinatorRequest(id,patch){
    if(id==='LIVE'){
      if(Object.prototype.hasOwnProperty.call(patch,'status')) state.assignmentStatus=patch.status;
      if(Object.prototype.hasOwnProperty.call(patch,'assignedTo')) state.assignedTo=patch.assignedTo;
      if(Object.prototype.hasOwnProperty.call(patch,'assignedAt')) state.assignedAt=patch.assignedAt;
    }else{
      const r=(state.assignmentRequests||[]).find(x=>x.id===id); if(r) Object.assign(r,patch);
    }
  }
  function appendAssignmentHistory(id,entry){
    if(id==='LIVE') state.assignmentHistory.push(entry);
    else { const r=(state.assignmentRequests||[]).find(x=>x.id===id); if(r){ if(!Array.isArray(r.history))r.history=[]; r.history.push(entry); } }
  }
  function analystWorkload(){
    const rows=coordinatorRequestsData();
    return DEMO_ANALYSTS.map(a=>{
      const active=rows.filter(r=>r.assignedTo===a.name && ['Asignada','En revisión','Con observaciones','Atendida'].includes(r.status)).length;
      const review=rows.filter(r=>r.assignedTo===a.name && ['En revisión','Con observaciones'].includes(r.status)).length;
      const done=rows.filter(r=>r.assignedTo===a.name && r.status==='Concluida').length;
      return {...a,assigned:a.assigned+active,pending:a.pending+review,concluded:a.concluded+done};
    });
  }
  function coordinatorKpis(){
    const rows=coordinatorRequestsData();
    return {received:rows.length,pending:rows.filter(r=>['Nueva','Pendiente de asignación'].includes(r.status)).length,assigned:rows.filter(r=>r.status==='Asignada').length,review:rows.filter(r=>r.status==='En revisión').length,observed:rows.filter(r=>r.status==='Con observaciones').length,done:rows.filter(r=>r.status==='Concluida').length};
  }
  function assignmentBadge(status){ return `<span class="status-badge ${assignmentStatusClass(status)}">${escapeHtml(status)}</span>`; }
  function coordinatorTableHtml(rows,compact=false){
    if(!rows.length) return `<tr><td colspan="8"><div class="empty-thread">No existen solicitudes que correspondan con los filtros seleccionados.</div></td></tr>`;
    return rows.map(r=>`<tr><td><b>${escapeHtml(r.folio)}</b></td><td>${escapeHtml(r.provider)}</td><td>${escapeHtml(r.personType)}</td><td>${escapeHtml(r.movement)}</td><td>${escapeHtml(formatDateEs(r.date))}</td><td>${assignmentBadge(r.status)}</td><td>${escapeHtml(r.assignedTo||'Sin asignar')}</td><td><div class="table-action-group"><button class="btn btn-secondary btn-small" type="button" data-coord-detail="${escapeHtml(r.id)}">Ver</button>${['Nueva','Pendiente de asignación'].includes(r.status)?`<button class="btn btn-primary btn-small" type="button" data-coord-assign="${escapeHtml(r.id)}">Asignar</button>`:r.status!=='Concluida'?`<button class="btn btn-ghost btn-small" type="button" data-coord-reassign="${escapeHtml(r.id)}">Reasignar</button>`:''}</div></td></tr>`).join('');
  }
  function bindCoordinatorTableActions(root){
    root.querySelectorAll('[data-coord-detail]').forEach(b=>b.onclick=()=>openCoordinatorDetail(b.dataset.coordDetail));
    root.querySelectorAll('[data-coord-assign]').forEach(b=>b.onclick=()=>openAssignmentModal(b.dataset.coordAssign,false));
    root.querySelectorAll('[data-coord-reassign]').forEach(b=>b.onclick=()=>openAssignmentModal(b.dataset.coordReassign,true));
  }
  function renderCoordinatorDashboard(){
    header('Autoridad · Padrón de Proveedores','Dashboard de asignación','Reciba las solicitudes del padrón, distribuya los expedientes y supervise la carga de trabajo antes de que continúe la revisión operativa.');
    const k=coordinatorKpis(),rows=coordinatorRequestsData().slice(0,6),work=analystWorkload();
    content.innerHTML=`<div class="stats-grid stats-six coordinator-stats">
      <article class="stat"><span>Solicitudes recibidas</span><strong>${k.received}</strong><small>Total ingresado</small></article>
      <article class="stat"><span>Pendientes de asignar</span><strong>${k.pending}</strong><small>Sin responsable</small></article>
      <article class="stat"><span>Asignadas</span><strong>${k.assigned}</strong><small>Turnadas</small></article>
      <article class="stat"><span>En revisión</span><strong>${k.review}</strong><small>En análisis</small></article>
      <article class="stat"><span>Con observaciones</span><strong>${k.observed}</strong><small>Requieren atención</small></article>
      <article class="stat"><span>Concluidas</span><strong>${k.done}</strong><small>Procedimiento terminado</small></article>
    </div>
    <article class="card mt24"><div class="card-head"><div><span class="kicker">Bandeja de solicitudes</span><h3>Solicitudes recientes</h3></div><button class="btn btn-secondary btn-small" type="button" data-open-all-requests>Ver todas</button></div><div class="table-wrap"><table class="data-table"><thead><tr><th>Folio</th><th>Proveedor</th><th>Tipo de persona</th><th>Movimiento</th><th>Fecha</th><th>Estatus</th><th>Asignado a</th><th>Acción</th></tr></thead><tbody data-coordinator-dashboard-table>${coordinatorTableHtml(rows,true)}</tbody></table></div></article>
    <article class="card mt24"><div class="card-head"><div><span class="kicker">Carga de trabajo</span><h3>Distribución actual por servidor público</h3></div><button class="btn btn-secondary btn-small" type="button" data-open-workload>Ver detalle</button></div>${workloadTableHtml(work)}</article>`;
    bindCoordinatorTableActions(content); content.querySelector('[data-open-all-requests]').onclick=()=>route('coordinator-requests'); content.querySelector('[data-open-workload]').onclick=()=>route('coordinator-workload');
  }
  function coordinatorFilterBlock(){
    const users=DEMO_ANALYSTS.map(a=>`<option value="${escapeHtml(a.name)}">${escapeHtml(a.name)}</option>`).join('');
    return `<div class="coordinator-filters"><label class="filter-search">Búsqueda general<input type="search" data-filter="search" placeholder="Folio, RFC, proveedor, movimiento..."></label><label>Folio<input data-filter="folio" placeholder="PROV-2026-..."></label><label>RFC<input data-filter="rfc" placeholder="RFC"></label><label>Nombre o razón social<input data-filter="provider" placeholder="Proveedor"></label><label>Tipo de movimiento<select data-filter="movement"><option value="">Todos</option><option>Alta</option><option>Renovación</option><option>Modificación</option><option>Duplicado</option><option>Reposición</option></select></label><label>Estatus<select data-filter="status"><option value="">Todos</option><option>Nueva</option><option>Pendiente de asignación</option><option>Asignada</option><option>En revisión</option><option>Con observaciones</option><option>Atendida</option><option>Concluida</option></select></label><label>Usuario asignado<select data-filter="assigned"><option value="">Todos</option><option value="__none">Sin asignar</option>${users}</select></label><label>Fecha<input type="date" data-filter="date"></label></div>`;
  }
  function modeMatchesRequest(r,mode){
    if(mode==='pending') return ['Nueva','Pendiente de asignación'].includes(r.status);
    if(mode==='assigned') return !!r.assignedTo;
    return true;
  }
  function applyCoordinatorFilters(root,mode){
    const all=coordinatorRequestsData();
    const v=k=>(root.querySelector(`[data-filter="${k}"]`)?.value||'').trim().toLowerCase();
    const search=v('search'),folio=v('folio'),rfc=v('rfc'),provider=v('provider'),movement=v('movement'),status=v('status'),assigned=v('assigned'),date=v('date');
    const rows=all.filter(r=>{
      if(!modeMatchesRequest(r,mode)) return false;
      const hay=[r.folio,r.rfc,r.provider,r.personType,r.movement,r.status,r.assignedTo].join(' ').toLowerCase();
      return (!search||hay.includes(search))&&(!folio||r.folio.toLowerCase().includes(folio))&&(!rfc||r.rfc.toLowerCase().includes(rfc))&&(!provider||r.provider.toLowerCase().includes(provider))&&(!movement||r.movement.toLowerCase()===movement)&&(!status||r.status.toLowerCase()===status)&&(!assigned||(assigned==='__none'?!r.assignedTo:r.assignedTo.toLowerCase()===assigned))&&(!date||r.date===date);
    });
    const tbody=root.querySelector('[data-coordinator-table]'); tbody.innerHTML=coordinatorTableHtml(rows); bindCoordinatorTableActions(root);
    const count=root.querySelector('[data-filter-count]'); if(count)count.textContent=`${rows.length} solicitud${rows.length===1?'':'es'}`;
  }
  function renderCoordinatorRequests(mode='all'){
    const meta=mode==='pending'?['Pendientes de asignación','Solicitudes que aún no tienen servidor público responsable.']:mode==='assigned'?['Solicitudes asignadas','Expedientes que ya fueron turnados a un analista o revisor.']:['Solicitudes','Bandeja integral de movimientos del Padrón de Proveedores.'];
    header('Autoridad · Padrón de Proveedores',meta[0],meta[1]);
    content.innerHTML=`<article class="card"><div class="card-head"><div><span class="kicker">Filtros</span><h3>Localizar solicitudes</h3></div><span class="status-badge" data-filter-count></span></div>${coordinatorFilterBlock()}</article><article class="card mt24"><div class="table-wrap"><table class="data-table"><thead><tr><th>Folio</th><th>Proveedor</th><th>Tipo de persona</th><th>Movimiento</th><th>Fecha</th><th>Estatus</th><th>Asignado a</th><th>Acción</th></tr></thead><tbody data-coordinator-table></tbody></table></div></article>`;
    content.querySelectorAll('[data-filter]').forEach(el=>el.addEventListener(el.tagName==='INPUT'?'input':'change',()=>applyCoordinatorFilters(content,mode)));
    applyCoordinatorFilters(content,mode);
  }
  function assignmentHistoryHtml(history){
    if(!history?.length) return '<div class="empty-thread">Sin movimientos de asignación registrados.</div>';
    return `<div class="table-wrap"><table class="data-table"><thead><tr><th>Fecha</th><th>Movimiento</th><th>Usuario</th><th>Responsable</th></tr></thead><tbody>${history.map(h=>`<tr><td>${escapeHtml(h.when||'—')}</td><td><b>${escapeHtml(h.movement||'—')}</b>${h.detail?`<small class="history-detail">${escapeHtml(h.detail)}</small>`:''}</td><td>${escapeHtml(h.user||'—')}</td><td>${escapeHtml(h.responsible||'Sin asignar')}</td></tr>`).join('')}</tbody></table></div>`;
  }
  function openCoordinatorDetail(id){
    const r=getCoordinatorRequest(id); if(!r)return;
    modal.classList.add('wide-modal');
    modalBody.innerHTML=`<div class="assignment-detail-grid"><div><small>Folio</small><strong>${escapeHtml(r.folio)}</strong></div><div><small>Fecha de ingreso</small><strong>${escapeHtml(formatDateEs(r.date))}</strong></div><div><small>Tipo de movimiento</small><strong>${escapeHtml(r.movement)}</strong></div><div><small>Tipo de persona</small><strong>${escapeHtml(r.personType)}</strong></div><div><small>RFC</small><strong>${escapeHtml(r.rfc||'—')}</strong></div><div><small>Razón social o nombre</small><strong>${escapeHtml(r.provider)}</strong></div><div><small>Correo electrónico</small><strong>${escapeHtml(r.email||'—')}</strong></div><div><small>Teléfono</small><strong>${escapeHtml(r.phone||'—')}</strong></div><div class="span2"><small>Giro o actividad económica</small><strong>${escapeHtml(r.activity||'—')}</strong></div><div><small>Estatus</small><strong>${assignmentBadge(r.status)}</strong></div><div><small>Asignado a</small><strong>${escapeHtml(r.assignedTo||'Sin asignar')}</strong></div></div><div class="assignment-history-section"><span class="kicker">Historial de asignación</span><h3>Bitácora del expediente</h3>${assignmentHistoryHtml(r.history)}</div>`;
    const action=['Nueva','Pendiente de asignación'].includes(r.status)?`<button class="btn btn-primary" id="detailAssign" type="button">Asignar solicitud</button>`:r.status!=='Concluida'?`<button class="btn btn-secondary" id="detailAssign" type="button">Reasignar solicitud</button>`:'';
    modalActions.innerHTML=`<button class="btn btn-ghost" id="closeCoordDetail" type="button">Cerrar</button>${action}`; openModal('Detalle de solicitud'); $('#closeCoordDetail').onclick=closeModal; const b=$('#detailAssign'); if(b)b.onclick=()=>openAssignmentModal(id,!!r.assignedTo);
  }
  function analystCardsHtml(selected=''){
    return analystWorkload().map(a=>`<label class="analyst-option"><input type="radio" name="analystChoice" value="${escapeHtml(a.name)}" ${selected===a.name?'checked':''}><span><b>${escapeHtml(a.name)}</b><small>${escapeHtml(a.role)}</small><em>Asignadas: ${a.assigned} · En revisión/pendientes: ${a.pending} · Concluidas: ${a.concluded}</em></span></label>`).join('');
  }
  function refreshCoordinatorView(){
    const active=mainNav.querySelector('button.active')?.dataset.route; if(active&&active.startsWith('coordinator-'))route(active); else route('coordinator-dashboard');
  }
  function openAssignmentModal(id,reassign=false){
    const r=getCoordinatorRequest(id); if(!r)return; const current=r.assignedTo||'Sin asignar';
    modal.classList.add('wide-modal');
    modalBody.innerHTML=`<div class="assignment-context"><div><small>Folio</small><strong>${escapeHtml(r.folio)}</strong></div><div><small>Proveedor</small><strong>${escapeHtml(r.provider)}</strong></div><div><small>Movimiento</small><strong>${escapeHtml(r.movement)}</strong></div><div><small>Responsable actual</small><strong>${escapeHtml(current)}</strong></div></div><div class="assignment-selector"><span class="kicker">${reassign?'Nuevo responsable':'Asignar a'}</span><h3>${reassign?'Seleccione el nuevo servidor público responsable':'Seleccione servidor público responsable'}</h3><p>La carga mostrada es demostrativa y permite comparar la distribución de expedientes antes de confirmar.</p><div class="analyst-options">${analystCardsHtml(reassign?'':r.assignedTo)}</div></div>${reassign?`<label class="reassign-reason">Motivo de reasignación<textarea id="reassignReason" rows="3" placeholder="Indique la causa administrativa de la reasignación..."></textarea></label><div class="assignment-context compact"><div><small>Fecha</small><strong>${escapeHtml(stamp())}</strong></div><div><small>Usuario que realiza el movimiento</small><strong>Coordinador Demo</strong></div></div>`:''}`;
    modalActions.innerHTML=`<button class="btn btn-ghost" id="cancelAssignment" type="button">Cancelar</button><button class="btn btn-primary" id="confirmAssignment" type="button">Confirmar ${reassign?'reasignación':'asignación'}</button>`; openModal(reassign?'Reasignar solicitud':'Asignar solicitud'); $('#cancelAssignment').onclick=closeModal;
    $('#confirmAssignment').onclick=()=>{
      const selected=modalBody.querySelector('input[name="analystChoice"]:checked')?.value; if(!selected){toast('Seleccione un servidor público responsable.');return;}
      const reason=reassign?($('#reassignReason').value.trim()):''; if(reassign&&!reason){toast('Capture el motivo de la reasignación.');return;}
      if(reassign&&selected===r.assignedTo){toast('Seleccione un responsable diferente al actual para registrar la reasignación.');return;}
      const when=stamp(); const movement=reassign?'Reasignación':'Asignación'; const detail=reassign?`De ${current} a ${selected}. Motivo: ${reason}`:`Solicitud turnada a ${selected}.`;
      updateCoordinatorRequest(id,{status:'Asignada',assignedTo:selected,assignedAt:when}); appendAssignmentHistory(id,{when,movement,user:'Coordinador Demo',responsible:selected,detail});
      if(id==='LIVE'){ state.assignmentStatus='Asignada'; state.assignedTo=selected; state.assignedAt=when; addTimeline(movement==='Asignación'?'Solicitud asignada':'Solicitud reasignada',detail); addMessage('Sistema',`${movement} registrada. Responsable: ${selected}.`,'system'); }
      save(); closeModal(); refreshCoordinatorView(); toast(reassign?'Solicitud reasignada correctamente.':'Solicitud asignada correctamente.');
    };
  }
  function workloadTableHtml(work){
    const max=Math.max(...work.map(a=>a.assigned),1);
    return `<div class="table-wrap"><table class="data-table workload-table"><thead><tr><th>Analista / revisor</th><th>Asignadas</th><th>En revisión / pendientes</th><th>Concluidas</th><th>Carga relativa</th></tr></thead><tbody>${work.map(a=>`<tr><td><b>${escapeHtml(a.name)}</b><small>${escapeHtml(a.role)}</small></td><td>${a.assigned}</td><td>${a.pending}</td><td>${a.concluded}</td><td><div class="workload-bar-track"><span class="workload-bar" style="width:${Math.round(a.assigned/max*100)}%"></span></div><small>${Math.round(a.assigned/max*100)}% respecto de la carga más alta</small></td></tr>`).join('')}</tbody></table></div>`;
  }
  function renderCoordinatorWorkload(){
    header('Autoridad · Padrón de Proveedores','Carga de trabajo','Consulte la distribución demostrativa de expedientes entre analistas y revisores antes de realizar nuevas asignaciones.');
    content.innerHTML=`<article class="card"><div class="card-head"><div><span class="kicker">Carga de trabajo</span><h3>Solicitudes por servidor público</h3></div><span class="status-badge">Actualización Front-End</span></div><p>Los valores base son simulados y se ajustan visualmente conforme se realizan asignaciones o reasignaciones durante la sesión.</p>${workloadTableHtml(analystWorkload())}</article>`;
  }
  function renderCoordinatorHistory(){
    header('Autoridad · Padrón de Proveedores','Historial de asignaciones','Consulte la trazabilidad demostrativa de recepción, asignación y reasignación de solicitudes.');
    const entries=coordinatorRequestsData().flatMap(r=>(r.history||[]).map(h=>({...h,folio:r.folio,provider:r.provider}))).sort((a,b)=>String(b.when).localeCompare(String(a.when)));
    content.innerHTML=`<article class="card"><div class="table-wrap"><table class="data-table"><thead><tr><th>Fecha</th><th>Folio</th><th>Proveedor</th><th>Movimiento</th><th>Usuario</th><th>Responsable</th></tr></thead><tbody>${entries.map(h=>`<tr><td>${escapeHtml(h.when||'—')}</td><td><b>${escapeHtml(h.folio)}</b></td><td>${escapeHtml(h.provider)}</td><td>${escapeHtml(h.movement||'—')}${h.detail?`<small class="history-detail">${escapeHtml(h.detail)}</small>`:''}</td><td>${escapeHtml(h.user||'—')}</td><td>${escapeHtml(h.responsible||'Sin asignar')}</td></tr>`).join('')}</tbody></table></div></article>`;
  }

  function renderReviewer(){
    header('Autoridad','Bandeja de validación','Revise únicamente los expedientes que fueron turnados por el Responsable de Asignación y continúe con la validación documental, retroalimentación, cotejo y controles previos ya contemplados.');
    content.innerHTML='';content.append($('#reviewerTpl').content.cloneNode(true));
    const available=!!state.folio && ['Asignada','En revisión'].includes(state.assignmentStatus);
    content.querySelector('[data-review-count]').textContent=available&&state.status==='En validación'?1:0;
    content.querySelector('[data-observed-count]').textContent=available&&state.status==='Observado'?1:0;
    content.querySelector('[data-cotejo-count]').textContent=available&&state.status==='Cotejo requerido'?1:0;
    content.querySelector('[data-payment-count]').textContent=available&&(state.status==='Pago de derechos requerido'||state.status==='Pago reportado')?1:0;
    content.querySelector('[data-issued-count]').textContent=available&&state.status==='Cédula expedida'?1:0;
    const tbody=content.querySelector('[data-review-table]');
    if(!available){
      tbody.innerHTML=`<tr><td colspan="8"><div class="empty-thread">No hay expedientes asignados a esta bandeja. Las solicitudes deben ser turnadas previamente por el Responsable de Asignación.</div></td></tr>`;
      return;
    }
    tbody.innerHTML=`<tr><td>${escapeHtml(state.folio||'—')}</td><td>${escapeHtml(state.form.razonSocial||state.account.name||'Proveedor Demo')}</td><td>${escapeHtml(state.form.tipoSolicitud)}</td><td>${requiredDocCount()}/${requiredDocTotal()}</td><td><span class="status-badge ${state.sanctionsCheck?.result==='clear'?'sanctions-clear':state.sanctionsCheck?.result==='hit'?'sanctions-hit':'sanctions-pending'}">${escapeHtml(requiresSanctionsCheck()?sanctionsLabel():'No requerido')}</span></td><td><span class="status-badge ${clsStatus(state.status)}">${state.status}</span></td><td>${escapeHtml(state.assignedTo||'Sin asignar')}</td><td><button class="btn btn-secondary btn-small" data-open-review type="button">Abrir</button></td></tr>`;
    tbody.querySelector('[data-open-review]').onclick=()=>route('review-detail');
  }
  function renderReviewDetail(){
    if(state.assignmentStatus==='Asignada'){
      state.assignmentStatus='En revisión';
      const lastAssignmentEvent=(state.assignmentHistory||[]).slice().reverse().find(h=>h.movement==='Inicio de revisión');
      if(!lastAssignmentEvent||lastAssignmentEvent.responsible!==(state.assignedTo||'Sin asignar')) state.assignmentHistory.push({when:stamp(),movement:'Inicio de revisión',user:state.assignedTo||'Personal revisor',responsible:state.assignedTo||'Sin asignar'});
      save();
    }
    header('Autoridad','Validación del expediente',`La autoridad consulta la información y documentos del expediente digital de ${state.form.tipoSolicitud}, retroalimenta al proveedor, cita para cotejo cuando proceda y aplica los controles previos del movimiento.`);
    content.innerHTML='';content.append($('#reviewDetailTpl').content.cloneNode(true));
    content.querySelector('[data-rd-name]').textContent=state.form.razonSocial||state.account.name||'Proveedor Demo';setStatus(content.querySelector('[data-rd-status]'),state.status);
    content.querySelector('[data-rd-details]').innerHTML=[['Folio',state.folio||'Sin folio'],['RFC',state.form.rfc||'Pendiente'],['Representante',state.form.representante||'Pendiente'],['Trámite',state.form.tipoSolicitud],['Documentos',`${requiredDocCount()}/${requiredDocTotal()}`],['Avance',progress()+'%'],['Expediente validado',state.expedienteValidado?'Sí':'No']].map(([a,b])=>`<div class="detail-row"><span>${a}</span><strong>${escapeHtml(b)}</strong></div>`).join('');
    content.querySelector('[data-rd-summary]')?.remove();
    renderDigitalExpedient(content.querySelector('[data-rd-expedient]'));
    renderReviewChecklist(content.querySelector('[data-rd-checklist-panel]'));
    renderSanctionsPanel(content.querySelector('[data-rd-sanctions-panel]'));
    renderAuthorityPaymentPanel(content.querySelector('[data-rd-payment-panel]'));
    renderThread(content.querySelector('[data-rd-thread]'));
    const obs=content.querySelector('[data-rd-observations]');
    const observeBtn=content.querySelector('[data-rd-observe]');
    const cotejoBtn=content.querySelector('[data-rd-cotejo]');
    const approveBtn=content.querySelector('[data-rd-approve]');
    const sanctionsBtn=content.querySelector('[data-rd-sanctions]');

    observeBtn.onclick=()=>{
      const body=obs.value.trim()||'Favor de revisar y complementar la información señalada en el expediente.';
      addMessage('Autoridad',body);
      if(state.status==='Pago reportado' && state.payment){
        state.payment.reported=false;state.payment.evidence='';state.payment.providerReference='';state.status='Pago de derechos requerido';
        addTimeline('Comprobante observado','La autoridad solicitó corrección o complemento del comprobante de pago');
      } else if(state.status==='Pago de derechos requerido' && state.payment){
        addTimeline('Ajuste de pago notificado','La autoridad envió una aclaración relacionada con el pago de derechos');
      } else {
        state.status='Observado';state.expedienteValidado=false;
        addTimeline('Retroalimentación enviada','La autoridad solicitó aclaración o complemento en línea');
      }
      save();renderReviewDetail();
    };
    cotejoBtn.onclick=openCotejoModal;
    sanctionsBtn.onclick=openSanctionsCheckModal;
    approveBtn.onclick=()=>{
      if(state.status!=='Pago reportado' && state.status!=='Pago de derechos requerido' && state.status!=='Cédula expedida' && !reviewChecklistComplete()){toast('Complete la lista de revisión previa del expediente antes de validar favorablemente.');return;}
      if(state.cotejo && !state.cotejo.completed){toast('Existe un cotejo pendiente. Registre primero su realización para continuar con la validación del expediente.');return;}
      if(state.status!=='Pago reportado' && state.status!=='Pago de derechos requerido' && state.status!=='Cédula expedida' && requiresSanctionsCheck()){
        if(!state.sanctionsCheck){toast('Antes de validar favorablemente el Alta debe realizar la consulta al Registro de Empresas Objetadas y Sancionadas de la Contraloría General.');return;}
        if(state.sanctionsCheck.result==='hit'){toast('La consulta registra una coincidencia. La autorización del Alta permanece bloqueada en este prototipo.');return;}
      }
      if(state.status==='Pago reportado'){
        openIssueCedulaModal();return;
      }
      if(state.status==='Cédula expedida'){showCedulaModal();return;}
      if(state.payment && state.payment.notified){openPaymentNotificationModal(true);return;}
      openPaymentNotificationModal(false);
    };
    content.querySelector('[data-rd-back]').onclick=()=>route('reviewer');

    if(state.cotejo&&!state.cotejo.completed){
      const stack=content.querySelector('.stack-actions');const btn=document.createElement('button');btn.type='button';btn.className='btn btn-secondary full';btn.textContent='Registrar cotejo realizado';
      btn.onclick=()=>{state.cotejo.completed=true;state.status='En validación';addMessage('Autoridad','Se registró la realización del cotejo. El expediente continúa en validación.','system');addTimeline('Cotejo realizado','Documentación o identidad cotejada; continúa la validación');save();renderReviewDetail();};stack.insertBefore(btn,approveBtn);
    }

    if(state.status==='Pago de derechos requerido'){
      approveBtn.textContent='Revisar / reenviar notificación de pago';
      cotejoBtn.disabled=true;sanctionsBtn.disabled=true;
      observeBtn.textContent='Notificar ajuste del pago';
    } else if(state.status==='Pago reportado'){
      approveBtn.textContent='Validar pago y expedir cédula';
      cotejoBtn.disabled=true;sanctionsBtn.disabled=true;
      observeBtn.textContent='Observar comprobante de pago';
    } else if(state.status==='Cédula expedida'){
      approveBtn.textContent='Ver cédula expedida';
      cotejoBtn.disabled=true;sanctionsBtn.disabled=true;observeBtn.disabled=true;obs.disabled=true;
    } else {
      approveBtn.textContent='Validar expediente y notificar pago';
      if(!reviewChecklistComplete()){
        approveBtn.disabled=true;
        approveBtn.textContent='Pendiente lista de revisión';
      }
      if(requiresSanctionsCheck()){
        if(!state.sanctionsCheck){approveBtn.disabled=true;approveBtn.textContent='Pendiente consulta de Contraloría';}
        else if(state.sanctionsCheck.result==='hit'){approveBtn.disabled=true;approveBtn.textContent='Autorización bloqueada por consulta';}
      } else {
        sanctionsBtn.disabled=true;
        sanctionsBtn.textContent='Consulta de Contraloría · no requerida en este flujo';
      }
    }
  }

  function renderAuthorityPaymentPanel(p){
    if(!state.payment){
      p.innerHTML=`<span class="kicker">Pago de derechos</span><h3>Etapa posterior a la validación</h3><p>Cuando el expediente sea validado favorablemente, la autoridad deberá notificar al proveedor los datos para realizar el pago de derechos. La cédula no se expide antes de verificar dicho pago.</p>`;
      return;
    }
    const pay=state.payment;
    const amount=pay.amount?`$${Number(pay.amount).toLocaleString('es-MX',{minimumFractionDigits:2,maximumFractionDigits:2})} MXN`:'No indicado';
    p.innerHTML=`<div class="card-head"><div><span class="kicker">Pago de derechos</span><h3>${pay.reported?'Comprobante recibido':'Notificación emitida'}</h3></div><span class="status-badge ${state.cedula?'approved':pay.reported?'payment-review':'payment'}">${state.cedula?'Cédula expedida':pay.reported?'Por validar':'Pago pendiente'}</span></div><div class="payment-grid"><div><small>Concepto</small><strong>${escapeHtml(pay.concept||'')}</strong></div><div><small>Monto</small><strong>${escapeHtml(amount)}</strong></div><div><small>Fecha límite</small><strong>${escapeHtml(pay.dueDate||'No indicada')}</strong></div><div><small>Referencia / línea</small><strong>${escapeHtml(pay.reference||'No indicada')}</strong></div></div>${pay.evidence?`<div class="payment-proof"><strong>Comprobante del proveedor</strong><span>${escapeHtml(pay.evidence)}</span><small>Referencia reportada: ${escapeHtml(pay.providerReference||'—')}</small></div>`:''}${state.cedula?`<div class="success-box mt24"><strong>Cédula expedida</strong><p>${escapeHtml(state.cedula.number)} · ${escapeHtml(state.cedula.date)}</p></div>`:''}`;
  }

  function openPaymentNotificationModal(editing=false){
    const pay=state.payment||{};
    const fee=feeReference();
    const controlText=requiresSanctionsCheck()?'Previamente quedó documentada la consulta al Registro de Empresas Objetadas y Sancionadas sin coincidencias. ':'';
    modalBody.innerHTML=`<p>El expediente de <b>${escapeHtml(state.form.tipoSolicitud)}</b> se registrará como validado favorablemente. ${controlText}A continuación se notificará al proveedor que debe realizar el pago correspondiente antes de que pueda expedirse la cédula.</p><div class="form-grid cols2"><label class="span2">Concepto<input id="payConcept" value="${escapeHtml(pay.concept||`Pago de aprovechamiento / cuota de recuperación · ${state.form.tipoSolicitud}`)}"></label><label>Monto (MXN)<input id="payAmount" type="number" min="0" step="0.01" value="${escapeHtml(pay.amount||String(fee))}" placeholder="Capture el monto aplicable"></label><label>Fecha límite <small>(si aplica)</small><input id="payDue" type="date" value="${escapeHtml(pay.dueDate||'')}"></label><label class="span2">Referencia / línea de captura<input id="payReference" value="${escapeHtml(pay.reference||'')}" placeholder="Referencia, línea de captura o identificador de pago"></label><label class="span2">Instrucciones para el proveedor<textarea id="payInstructions" rows="4">${escapeHtml(pay.instructions||'Realice el pago conforme a la referencia indicada y cargue el comprobante en este portal para su validación.')}</textarea></label></div><div class="source-note"><b>Referencia documental 2025:</b> el documento aportado señala $944.00 para Alta y Renovación y $472.00 para Modificación, Duplicado y Reposición. En producción, los montos deben parametrizarse conforme a la disposición vigente al momento del trámite.</div>`;
    modalActions.innerHTML=`<button class="btn btn-secondary" id="cancelPayment" type="button">Cancelar</button><button class="btn btn-primary" id="confirmPayment" type="button">${editing?'Actualizar notificación':'Validar expediente y notificar pago'}</button>`;
    openModal(editing?'Notificación de pago de derechos':'Validar expediente y notificar pago');
    $('#cancelPayment').onclick=closeModal;
    $('#confirmPayment').onclick=()=>{
      const concept=$('#payConcept').value.trim(),amount=$('#payAmount').value.trim(),dueDate=$('#payDue').value,reference=$('#payReference').value.trim(),instructions=$('#payInstructions').value.trim();
      if(!concept||!reference||!instructions){toast('Capture concepto, referencia o línea de captura e instrucciones de pago.');return;}
      state.expedienteValidado=true;
      state.payment={...pay,notified:true,concept,amount,dueDate,reference,instructions,reported:pay.reported||false,verified:pay.verified||false,evidence:pay.evidence||'',providerReference:pay.providerReference||''};
      state.status=state.payment.reported?'Pago reportado':'Pago de derechos requerido';
      if(!editing){addTimeline('Expediente validado','La autoridad validó favorablemente el expediente de '+state.form.tipoSolicitud);addMessage('Autoridad','El expediente fue validado favorablemente. Para continuar con la expedición de la cédula deberá realizar el pago de derechos conforme a la notificación emitida.');}
      addTimeline(editing?'Notificación de pago actualizada':'Pago de derechos notificado',`Referencia: ${reference}${amount?` · Monto: $${Number(amount).toLocaleString('es-MX',{minimumFractionDigits:2,maximumFractionDigits:2})} MXN`:''}`);
      save();closeModal();renderReviewDetail();
    };
  }

  function openIssueCedulaModal(){
    if(!state.payment||!state.payment.reported){toast('No existe un comprobante de pago reportado por el proveedor.');return;}
    const suggested=`CED-DEMO-${new Date().getFullYear()}-${String(Math.floor(10000+Math.random()*90000))}`;
    modalBody.innerHTML=`<p>Confirme que el comprobante de pago fue validado. La expedición genera una cédula demostrativa basada en la estructura visual de la muestra aportada, con anverso, reverso y elementos de validación.</p><div class="form-grid cols2"><label>Número / folio de cédula<input id="cedulaNumber" value="${escapeHtml(state.cedula?.number||suggested)}"></label><label>Fecha de expedición<input id="cedulaDate" type="date" value="${escapeHtml(state.cedula?.date||today())}"></label><label>Empresa Mexiquense<select id="empresaMexiquense"><option>No</option><option>Sí</option></select></label><label>Servidor público que autoriza<input id="cedulaAuthorizer" value="${escapeHtml(state.cedula?.authorizerName||'Servidor público autorizado (DEMO)')}"></label><label class="span2">Cargo / unidad que autoriza<input id="cedulaAuthorizerTitle" value="${escapeHtml(state.cedula?.authorizerTitle||'Dirección de Investigación de Mercado')}"></label></div><div class="source-note"><b>Seguridad de demostración:</b> al expedir, el sistema generará un código de seguridad, una huella digital y un sello gráfico 2D. La cédula quedará disponible en la consulta pública de este prototipo. En producción estos valores deberán emitirse y verificarse desde infraestructura de servidor.</div>`;
    modalActions.innerHTML=`<button class="btn btn-secondary" id="cancelIssue" type="button">Cancelar</button><button class="btn btn-primary" id="confirmIssue" type="button">Validar pago y expedir cédula</button>`;
    openModal('Validar pago y expedir cédula');
    $('#cancelIssue').onclick=closeModal;
    $('#confirmIssue').onclick=async()=>{
      const number=$('#cedulaNumber').value.trim(),date=$('#cedulaDate').value,empresaMexiquense=$('#empresaMexiquense').value,authorizerName=$('#cedulaAuthorizer').value.trim(),authorizerTitle=$('#cedulaAuthorizerTitle').value.trim();
      if(!number||!date||!authorizerName||!authorizerTitle){toast('Capture el número, fecha de expedición y datos de autorización.');return;}
      const validUntil=validUntilFrom(date),securityCode=makeSecurityCode();
      const snapshot={provider:state.form.razonSocial||state.account.name||'Proveedor',rfc:state.form.rfc||state.account.rfc||'',representative:state.form.representante||state.form.nombreFirma||'',requestType:state.form.tipoSolicitud,giros:(state.form.giros||[]).filter(Boolean),activity:state.form.descripcionActividad||'',empresaMexiquense,authorizerName,authorizerTitle};
      const payload=[number,snapshot.rfc,date,validUntil,securityCode,snapshot.provider].join('|');
      const securityFingerprint=await makeFingerprint(payload);
      state.payment.verified=true;state.payment.verifiedAt=stamp();
      state.cedula={number,date,validUntil,securityCode,securityFingerprint,status:'Vigente',...snapshot};state.status='Cédula expedida';
      addTimeline('Pago de derechos validado','La autoridad verificó el comprobante de pago');
      addTimeline('Cédula expedida',`Cédula ${number} expedida con código de validación demostrativo`);
      addMessage('Autoridad',`El pago de derechos fue validado y se expidió la cédula ${number}. Código de seguridad: ${securityCode}.`,'system');
      save();closeModal();renderReviewDetail();
    };
  }

  function openCotejoModal(){
    const c=state.cotejo||{};
    modalBody.innerHTML=`<p>Programe el cotejo únicamente cuando resulte procedente para la validación del expediente.</p><div class="form-grid cols2"><label>Fecha<input id="cotejoDate" type="date" value="${escapeHtml(c.date||tomorrow())}"></label><label>Hora<input id="cotejoTime" type="time" value="${escapeHtml(c.time||'10:00')}"></label><label class="span2">Lugar<input id="cotejoPlace" value="${escapeHtml(c.place||'Departamento de Atención a Proveedores')}"></label><label class="span2">Motivo / documentación a cotejar<textarea id="cotejoReason" rows="4">${escapeHtml(c.reason||'Cotejo de documentación original y datos del expediente.')}</textarea></label></div>`;
    modalActions.innerHTML=`<button class="btn btn-secondary" id="cancelCotejo" type="button">Cancelar</button><button class="btn btn-primary" id="confirmCotejo" type="button">Generar cita</button>`;openModal('Citar para cotejo');
    $('#cancelCotejo').onclick=closeModal;$('#confirmCotejo').onclick=()=>{
      const date=$('#cotejoDate').value,time=$('#cotejoTime').value,place=$('#cotejoPlace').value.trim(),reason=$('#cotejoReason').value.trim();if(!date||!time||!place||!reason){toast('Complete fecha, hora, lugar y motivo del cotejo.');return;}
      state.cotejo={date,time,place,reason,confirmed:false,completed:false};state.status='Cotejo requerido';addMessage('Autoridad',`Se requiere cotejo. Cita: ${date} a las ${time}. Lugar: ${place}. Motivo: ${reason}`);addTimeline('Cita para cotejo','La autoridad determinó que procede cotejo y notificó al proveedor');save();closeModal();renderReviewDetail();
    };
  }

  function loadDemo(){
    state=structuredClone(defaultState);state.accountRegistered=true;state.account={name:'Tecnología Mexiquense Demo, S.A. de C.V.',rfc:'TMD180101AA1',email:'contacto@demo.mx'};
    state.form={...structuredClone(defaultForm),tipoSolicitud:'Renovación',fechaElaboracion:today(),folioPrevio:'PAD-2025-00481',razonSocial:'Tecnología Mexiquense Demo, S.A. de C.V.',tipoPersona:'Persona jurídica colectiva',antigRamo:'8',antigGem:'3',fiscalCalle:'Av. Ejemplo 120, Col. Centro',fiscalCp:'50000',fiscalMunicipio:'Toluca',fiscalEntidad:'Estado de México',fiscalTelefono:'722 000 0000',fiscalEmail:'contacto@demo.mx',fiscalWeb:'https://demo.mx',comercialCalle:'Av. Ejemplo 120, Col. Centro',comercialCp:'50000',comercialMunicipio:'Toluca',comercialEntidad:'Estado de México',comercialTelefono:'722 000 0000',comercialEmail:'ventas@demo.mx',comercialWeb:'https://demo.mx',actaConstitutiva:'Escritura 1234',idCif:'CIF-DEMO-001',rfc:'TMD180101AA1',representante:'Laura Hernández Demo',poderNotarial:'Poder 5678',descripcionActividad:'Comercialización y prestación de servicios de tecnologías de información.',actividad:['Distribuidor','Prestador de servicios'],socios:['Laura Hernández Demo','Carlos Méndez Demo','',''],giros:['Equipo de cómputo','Licenciamiento de software','Servicios de soporte técnico','','',''],pasivoCirculante:'180000',pasivoCapital:'650000',activoCirculante:'500000',almacen:'50000',personalAdmin:'5',personalTecnico:'12',personalObrero:'0',propiaAdmin:'80',propiaProd:'0',propiaVentas:'35',propiaAlmacen:'60',proveedores:['Proveedor Demo A','Proveedor Demo B','',''],clientes:['Cliente Demo 1','Cliente Demo 2','',''],condiciones:['Asesoría técnica','Entrega en tiempo','Crédito','Servicio de mantenimiento'],declaracion:true,nombreFirma:'Laura Hernández Demo'};
    state.docs={
      acta:{name:'acta_y_modificacion_demo.pdf',type:'application/pdf',size:245760,uploadedAt:'Dato demostrativo',demo:true},
      poder:{name:'poder_demo.pdf',type:'application/pdf',size:302110,uploadedAt:'Dato demostrativo',demo:true},
      identificacion:{name:'identificacion_demo.pdf',type:'application/pdf',size:118000,uploadedAt:'Dato demostrativo',demo:true},
      cartaCompromiso:{name:'carta_compromiso_demo.pdf',type:'application/pdf',size:98000,uploadedAt:'Dato demostrativo',demo:true},
      constanciaFiscal:{name:'constancia_fiscal_demo.pdf',type:'application/pdf',size:182300,uploadedAt:'Dato demostrativo',demo:true},
      declaracionAnual:{name:'declaracion_anual_demo.pdf',type:'application/pdf',size:360000,uploadedAt:'Dato demostrativo',demo:true},
      estadosFinDeclaracion:{name:'estados_declaracion_demo.pdf',type:'application/pdf',size:220000,uploadedAt:'Dato demostrativo',demo:true},
      contador:{name:'contador_cedula_ine_demo.pdf',type:'application/pdf',size:145000,uploadedAt:'Dato demostrativo',demo:true},
      estadosMes:{name:'estados_mes_demo.pdf',type:'application/pdf',size:396800,uploadedAt:'Dato demostrativo',demo:true},
      cedulaFormato:{name:'cedula_registro_demo.pdf',type:'application/pdf',size:210000,uploadedAt:'Dato demostrativo',demo:true},
      fotos:{name:'fotografias_demo.pdf',type:'application/pdf',size:180000,uploadedAt:'Dato demostrativo',demo:true},
      cedulaAnterior:{name:'cedula_anterior_demo.pdf',type:'application/pdf',size:170000,uploadedAt:'Dato demostrativo',demo:true},
      cartaNoCambios:{name:'carta_no_cambios_demo.pdf',type:'application/pdf',size:95000,uploadedAt:'Dato demostrativo',demo:true}
    };
    state.status='Borrador';state.timeline=[{label:'Renovación iniciada',detail:'Expediente recuperado para actualización en línea',when:stamp()}];state.messages=[];state.cotejo=null;state.expedienteValidado=false;state.payment=null;state.cedula=null;state.sanctionsCheck=null;state.reviewChecklist={};save();
  }
  function openModal(title){$('#modalTitle').textContent=title;modal.classList.remove('hidden');}
  function closeModal(){modal.classList.add('hidden');modal.classList.remove('wide-modal');}
  function toast(msg){modalBody.innerHTML=`<p>${escapeHtml(msg)}</p>`;modalActions.innerHTML='<button class="btn btn-primary" id="okToast" type="button">Aceptar</button>';openModal('Información');$('#okToast').onclick=closeModal;}
  function reset(){localStorage.removeItem(STORAGE);state=structuredClone(defaultState);showPublic();}

  $('#newProviderBtn').onclick=()=>showAccess('new');
  $('#existingProviderBtn').onclick=()=>showAccess('existing');
  $('#coordinatorAccessBtn').onclick=()=>showAccess('coordinator');
  $('#reviewerAccessBtn').onclick=()=>showAccess('reviewer');
  document.querySelectorAll('[data-public-action]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const action=btn.dataset.publicAction;
      if(action==='new') showAccess('new');
      else if(action==='existing'||action==='tracking') showAccess('existing');
    });
  });
  document.querySelectorAll('[data-public-jump]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const target=document.getElementById(btn.dataset.publicJump);
      if(target) target.scrollIntoView({behavior:'smooth',block:'start'});
    });
  });
  const verifyBtn=$('#verifyCedulaBtn'), verifyDemoBtn=$('#verifyDemoBtn');
  if(verifyBtn) verifyBtn.onclick=()=>{ const number=$('#verifyCedulaNumber').value,code=$('#verifySecurityCode').value; if(!number.trim()||!code.trim()){renderVerificationResult(null);return;} renderVerificationResult(findCredential(number,code)); };
  if(verifyDemoBtn) verifyDemoBtn.onclick=()=>{ const r=DEMO_REGISTRY[0]; $('#verifyCedulaNumber').value=r.number; $('#verifySecurityCode').value=r.securityCode; renderVerificationResult(r); };

  $('#goPublic').onclick=showPublic;
  $('#logoutBtn').onclick=logout;
  $('#resetDemo').onclick=reset;
  $('#modalClose').onclick=closeModal;
  modal.addEventListener('click',e=>{if(e.target===modal)closeModal();});

  if(state.role)login(state.role);else showPublic();
})();
