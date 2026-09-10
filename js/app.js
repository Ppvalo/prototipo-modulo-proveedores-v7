(() => {
  const STORAGE = 'edomexProveedorDemoV7';
  const defaultForm = {
    tipoSolicitud:'Alta',fechaElaboracion:'',folioPrevio:'',razonSocial:'',tipoPersona:'Persona jurídica colectiva',antigRamo:'',antigGem:'',
    fiscalCalle:'',fiscalCp:'',fiscalMunicipio:'',fiscalEntidad:'Estado de México',fiscalTelefono:'',fiscalEmail:'',fiscalWeb:'',
    comercialCalle:'',comercialCp:'',comercialMunicipio:'',comercialEntidad:'Estado de México',comercialTelefono:'',comercialEmail:'',comercialWeb:'',
    actaConstitutiva:'',idCif:'',rfc:'',camara:'',representante:'',poderNotarial:'',descripcionActividad:'',
    actividad:[],socios:['','','',''],giros:['','','','','',''],
    pasivoCirculante:'',pasivoCapital:'',activoCirculante:'',almacen:'',personalAdmin:'',personalTecnico:'',personalObrero:'',
    propiaAdmin:'',propiaProd:'',propiaVentas:'',propiaAlmacen:'',rentadaAdmin:'',rentadaProd:'',rentadaVentas:'',rentadaAlmacen:'',
    proveedores:['','','',''],clientes:['','','',''],condiciones:[],declaracion:false,nombreFirma:''
  };
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

  const steps = [
    {title:'Solicitud',note:'Seleccione Alta o Renovación y la fecha de elaboración.'},
    {title:'Datos generales',note:'Razón social, antigüedad y domicilios fiscal y comercial.'},
    {title:'Registros oficiales',note:'Instrumentos legales, fiscales y representación.'},
    {title:'Actividad y giros',note:'Actividad preponderante, socios y hasta seis giros.'},
    {title:'Capacidad financiera',note:'Cifras del estado financiero del mes inmediato anterior.'},
    {title:'Capacidad administrativa',note:'Personal y superficies ocupadas.'},
    {title:'Capacidad comercial',note:'Principales proveedores y clientes.'},
    {title:'Condiciones',note:'Condiciones básicas ofrecidas.'},
    {title:'Declaración',note:'Revisión final y declaración bajo protesta de decir verdad.'}
  ];
  const docTypes = [
    ['acta','Acta constitutiva o acta de nacimiento','Soporte del instrumento señalado en la cédula'],
    ['cif','Constancia / folio fiscal (idCIF)','Soporte del folio ante la autoridad fiscal'],
    ['rfc','Constancia de situación fiscal','Soporte del RFC capturado'],
    ['poder','Poder notarial','Cuando aplique representación legal'],
    ['financiero','Estado financiero','Mes inmediato anterior a la solicitud'],
    ['camara','Constancia de cámara','Opcional, cuando corresponda']
  ];
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
  function docCount(){ return docTypes.filter(([k])=>state.docs[k]).length; }
  function docInfo(value){
    if(!value) return null;
    if(typeof value==='string') return {name:value,type:'application/pdf',size:0,uploadedAt:'',demo:true};
    return {name:value.name||'Documento',type:value.type||'',size:Number(value.size||0),uploadedAt:value.uploadedAt||'',demo:!!value.demo};
  }
  function docName(value){ const d=docInfo(value); return d?d.name:''; }
  function formatBytes(bytes){ const n=Number(bytes||0); if(!n)return 'Tamaño no disponible'; if(n<1024)return `${n} B`; if(n<1048576)return `${(n/1024).toFixed(1)} KB`; return `${(n/1048576).toFixed(1)} MB`; }
  function sanctionsLabel(){ const s=state.sanctionsCheck; if(!s)return 'Pendiente'; if(s.result==='clear')return 'Sin coincidencias'; if(s.result==='hit')return 'Coincidencia localizada'; return 'Pendiente'; }

  function progress(){
    const f=state.form, req=['tipoSolicitud','fechaElaboracion','razonSocial','tipoPersona','fiscalCalle','fiscalCp','fiscalMunicipio','fiscalEntidad','fiscalTelefono','fiscalEmail','comercialCalle','comercialCp','comercialMunicipio','comercialEntidad','comercialTelefono','comercialEmail','actaConstitutiva','idCif','rfc','representante','descripcionActividad','pasivoCirculante','pasivoCapital','activoCirculante','personalAdmin','personalTecnico','personalObrero','nombreFirma'];
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
    } else if(mode==='reviewer'){
      kicker.textContent='Autoridad'; title.textContent='Acceso de personal revisor'; desc.textContent='Vista de demostración para validar expedientes, retroalimentar al proveedor y citar para cotejo cuando proceda.';
      accessPanel.innerHTML=`<label>Usuario<input id="revUser" value="REVISOR-DEMO"></label><label>Contraseña<input id="revPass" type="password" value="demo1234"></label><button id="reviewerLoginBtn" class="btn btn-primary full" type="button">Ingresar como autoridad</button><button class="btn btn-ghost full" data-back-public type="button">Regresar</button><p class="micro">Acceso exclusivamente simulado.</p>`;
      $('#reviewerLoginBtn').onclick=()=>login('reviewer');
    } else {
      kicker.textContent='Proveedor registrado'; title.textContent='Ingresar al Portal'; desc.textContent='Recupere su trámite de Alta o Renovación y continúe la captura o retroalimentación en línea.';
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
    $('#avatar').textContent=role==='reviewer'?'A':'P';
    $('#userName').textContent=role==='reviewer'?'Autoridad Demo':(state.form.razonSocial||state.account.name||'Proveedor');
    $('#userRole').textContent=role==='reviewer'?'Personal revisor':'Proveedor / representante';
    buildNav(); route(role==='reviewer'?'reviewer':'dashboard');
  }
  function logout(){ showPublic(); }
  function buildNav(){
    const items=state.role==='reviewer'?[['reviewer','Bandeja de validación']]:[['dashboard','Inicio'],['form','Cédula'],['docs','Expediente documental'],['tracking','Seguimiento y mensajes']];
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
  }

  function startProcess(type,confirm=true){
    const go=()=>{
      const preserve={razonSocial:state.form.razonSocial||state.account.name,rfc:state.form.rfc||state.account.rfc,fiscalEmail:state.form.fiscalEmail||state.account.email,tipoPersona:state.form.tipoPersona};
      state.form={...structuredClone(defaultForm),...preserve,tipoSolicitud:type,fechaElaboracion:today()};
      state.status='Borrador'; state.folio=''; state.docs={}; state.formStep=0; state.cotejo=null; state.expedienteValidado=false; state.payment=null; state.cedula=null; state.sanctionsCheck=null; state.messages=[]; Object.keys(runtimeFiles).forEach(k=>{try{URL.revokeObjectURL(runtimeFiles[k].url);}catch(e){} delete runtimeFiles[k];});
      state.timeline=[{label:`${type} iniciada`,detail:'Captura en línea disponible para el proveedor',when:stamp()}];
      save(); route('form');
    };
    if(!confirm){go();return;}
    modalBody.innerHTML=`<p>Se iniciará una nueva solicitud de <b>${type}</b>. Para esta demostración se reiniciará el expediente activo.</p>`;
    modalActions.innerHTML=`<button class="btn btn-secondary" id="cancelStart" type="button">Cancelar</button><button class="btn btn-primary" id="confirmStart" type="button">Iniciar ${type}</button>`;
    openModal(`Iniciar ${type}`); $('#cancelStart').onclick=closeModal; $('#confirmStart').onclick=()=>{closeModal();go();};
  }

  function renderDashboard(){
    header('Proveedor','Panel principal','Inicie, continúe y atienda en línea solicitudes de Alta o Renovación.');
    content.innerHTML=''; content.append($('#providerDashboardTpl').content.cloneNode(true));
    content.querySelector('[data-kpi="folio"]').textContent=state.folio||'Sin folio';
    content.querySelector('[data-kpi="status"]').textContent=state.status;
    content.querySelector('[data-kpi="progress"]').textContent=progress()+'%';
    content.querySelector('[data-kpi="docs"]').textContent=`${docCount()}/${docTypes.length}`;
    content.querySelector('[data-dashboard-title]').textContent=`${state.form.tipoSolicitud} · Cédula de Registro e Identificación`;
    setStatus(content.querySelector('[data-status-badge]'),state.status);
    content.querySelector('[data-progress-bar]').style.width=progress()+'%'; content.querySelector('[data-progress-label]').textContent=progress()+'%';
    content.querySelector('[data-msg-count]').textContent=state.messages.length;
    renderTimeline(content.querySelector('[data-timeline]'));
    content.querySelector('[data-action="open-form"]').onclick=()=>route('form');
    content.querySelector('[data-action="open-docs"]').onclick=()=>route('docs');
    content.querySelector('[data-action="open-tracking"]').onclick=()=>route('tracking');
    content.querySelector('[data-start-alta]').onclick=()=>startProcess('Alta');
    content.querySelector('[data-start-renew]').onclick=()=>startProcess('Renovación');
  }
  function renderTimeline(el){
    const rows=state.timeline.length?state.timeline:[{label:'Trámite disponible',detail:'Sin actividad',when:''}];
    el.innerHTML=rows.slice(-7).map((x,i)=>`<div class="timeline-item ${i===rows.slice(-7).length-1?'current':'done'}"><span class="timeline-dot"></span><div><strong>${escapeHtml(x.label)}</strong><small>${escapeHtml(x.detail||'')}${x.when?` · ${escapeHtml(x.when)}`:''}</small></div></div>`).join('');
  }

  function renderForm(){
    header('Cédula',`${state.form.tipoSolicitud} de proveedor`,'La solicitud se captura y guarda en línea; puede ser retroalimentada por la autoridad después del envío.');
    content.innerHTML=''; content.append($('#formTpl').content.cloneNode(true));
    const stepBox=content.querySelector('[data-form-steps]');
    stepBox.innerHTML=steps.map((s,i)=>`<button type="button" class="form-step ${i===state.formStep?'active':''}" data-goto="${i}"><b>${i+1}</b><span>${s.title}</span></button>`).join('');
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
  function sectionHtml(i){ const note=`<div class="section-note">${steps[i].note}<span class="source-chip">Campo de la cédula</span></div>`;
    if(i===0)return `<section class="form-section"><span class="kicker">Paso 1</span><h3>Tipo de solicitud</h3>${note}<div class="checks"><label class="check"><input type="radio" name="tipoSolicitud" value="Alta"> Alta</label><label class="check"><input type="radio" name="tipoSolicitud" value="Renovación"> Renovación</label></div><div class="form-grid cols2 mt24"><label>Fecha de elaboración<input type="date" name="fechaElaboracion"></label><label>Folio / registro previo <small>(para renovación, si aplica)</small><input name="folioPrevio"></label></div></section>`;
    if(i===1)return `<section class="form-section"><span class="kicker">Paso 2</span><h3>Datos generales de la empresa</h3>${note}<div class="form-grid cols3"><label class="span2">Nombre, denominación o razón social<input name="razonSocial"></label><label>Tipo de persona<select name="tipoPersona"><option>Persona jurídica colectiva</option><option>Persona física</option></select></label><label>Antigüedad en el ramo (años)<input type="number" min="0" name="antigRamo"></label><label>Antigüedad en el G.E.M. (años)<input type="number" min="0" name="antigGem"></label></div>${addressBlock('fiscal','Domicilio fiscal')}${addressBlock('comercial','Domicilio comercial')}</section>`;
    if(i===2)return `<section class="form-section"><span class="kicker">Paso 3</span><h3>Registros oficiales</h3>${note}<div class="form-grid cols2"><label>No. de acta constitutiva o de nacimiento<input name="actaConstitutiva"></label><label>No. de folio ante la S.H. y C.P. (idCIF)<input name="idCif"></label><label>RFC<input name="rfc" maxlength="13"></label><label>Cámara a la que pertenece y constancia <small>(opcional)</small><input name="camara"></label><label>Representante legal o propietario<input name="representante"></label><label>No. de poder notarial <small>(si aplica)</small><input name="poderNotarial"></label></div><div class="section-note mt24">Los documentos se integran en el módulo <b>Expediente documental</b> y podrán ser cotejados por la autoridad cuando proceda.</div></section>`;
    if(i===3)return `<section class="form-section"><span class="kicker">Paso 4</span><h3>Actividad preponderante y giros</h3>${note}<div class="checks">${['Productor','Distribuidor','Prestador de servicios','Comercializador'].map(x=>`<label class="check"><input type="checkbox" name="actividad" value="${x}"> ${x}</label>`).join('')}</div><label class="mt24">Descripción de las actividades preponderantes<textarea name="descripcionActividad" rows="4"></textarea></label><div class="subhead">Socios principales</div><div class="repeat-grid">${[0,1,2,3].map(j=>`<label>Socio ${j+1}<input name="socios_${j}"></label>`).join('')}</div><div class="subhead">Giros principales seleccionados · máximo 6</div><div class="repeat-grid">${[0,1,2,3,4,5].map(j=>`<label>Giro ${j+1}<input name="giros_${j}"></label>`).join('')}</div></section>`;
    if(i===4)return `<section class="form-section"><span class="kicker">Paso 5</span><h3>Capacidad financiera</h3>${note}<div class="form-grid cols2"><label>Pasivo circulante ($)<input type="number" min="0" step=".01" name="pasivoCirculante" data-fin></label><label>Pasivo y capital ($)<input type="number" min="0" step=".01" name="pasivoCapital" data-fin></label><label>Activo circulante ($)<input type="number" min="0" step=".01" name="activoCirculante" data-fin></label><label>Almacén ($)<input type="number" min="0" step=".01" name="almacen" data-fin></label></div><div class="metric-grid mt24"><div class="metric" data-metric="endeuda"><span>Endeudamiento</span><strong>—</strong><small>Máximo 0.40</small></div><div class="metric" data-metric="liquidez"><span>Liquidez</span><strong>—</strong><small>Mínimo 1.00</small></div><div class="metric" data-metric="solvencia"><span>Solvencia</span><strong>—</strong><small>Mínimo 1.00</small></div></div><div class="section-note mt24">Fórmulas representadas: Pasivo circulante ÷ (Pasivo + capital); (Activo circulante − almacén) ÷ Pasivo circulante; Activo circulante ÷ Pasivo circulante.</div></section>`;
    if(i===5)return `<section class="form-section"><span class="kicker">Paso 6</span><h3>Capacidad administrativa</h3>${note}<div class="form-grid cols3"><label>Personal administrativo<input type="number" min="0" name="personalAdmin" data-person></label><label>Personal técnico<input type="number" min="0" name="personalTecnico" data-person></label><label>Personal obrero<input type="number" min="0" name="personalObrero" data-person></label></div><div class="section-note mt24">Total de personal: <b data-person-total>0</b></div><div class="subhead">Superficie propia (m²)</div>${areaInputs('propia')}<div class="subhead">Superficie rentada (m²)</div>${areaInputs('rentada')}</section>`;
    if(i===6)return `<section class="form-section"><span class="kicker">Paso 7</span><h3>Capacidad comercial</h3>${note}<div class="subhead">Principales proveedores</div><div class="repeat-grid">${[0,1,2,3].map(j=>`<label>Proveedor ${j+1}<input name="proveedores_${j}"></label>`).join('')}</div><div class="subhead">Principales clientes</div><div class="repeat-grid">${[0,1,2,3].map(j=>`<label>Cliente ${j+1}<input name="clientes_${j}"></label>`).join('')}</div></section>`;
    if(i===7)return `<section class="form-section"><span class="kicker">Paso 8</span><h3>Condiciones básicas que ofrece</h3>${note}<div class="checks">${conditionOptions.map(x=>`<label class="check"><input type="checkbox" name="condiciones" value="${escapeHtml(x)}"> ${escapeHtml(x)}</label>`).join('')}</div></section>`;
    return `<section class="form-section"><span class="kicker">Paso 9</span><h3>Declaración y revisión</h3>${note}<div class="section-note">“Declaro bajo protesta de decir verdad que la información contenida en la presente cédula es cierta y puede ser verificada en cualquier momento”.</div><label class="check"><input type="checkbox" name="declaracion"> Acepto la declaración para efectos de esta demostración.</label><label class="mt24">Nombre del propietario o representante legal<input name="nombreFirma"></label><div class="subhead">Resumen</div>${summaryHtml()}</section>`;
  }
  function addressBlock(p,t){return `<div class="subhead">${t}</div><div class="form-grid cols3"><label class="span2">Calle, colonia, núm. ext. e int.<input name="${p}Calle"></label><label>Código postal<input name="${p}Cp" maxlength="5"></label><label>Municipio o delegación<input name="${p}Municipio"></label><label>Entidad federativa<input name="${p}Entidad"></label><label>Teléfono(s)<input name="${p}Telefono"></label><label>Correo electrónico<input type="email" name="${p}Email"></label><label>Página web<input name="${p}Web" placeholder="https://"></label></div>`;}
  function areaInputs(p){return `<div class="form-grid cols2"><label>Área administrativa<input type="number" min="0" step=".01" name="${p}Admin"></label><label>Área de producción<input type="number" min="0" step=".01" name="${p}Prod"></label><label>Área de ventas<input type="number" min="0" step=".01" name="${p}Ventas"></label><label>Área de almacén<input type="number" min="0" step=".01" name="${p}Almacen"></label></div>`;}
  function summaryHtml(){const f=state.form;return `<div class="summary-grid"><div class="summary-item"><small>Trámite</small><strong>${escapeHtml(f.tipoSolicitud)}</strong></div><div class="summary-item"><small>Razón social</small><strong>${escapeHtml(f.razonSocial||'Pendiente')}</strong></div><div class="summary-item"><small>RFC</small><strong>${escapeHtml(f.rfc||'Pendiente')}</strong></div><div class="summary-item"><small>Representante</small><strong>${escapeHtml(f.representante||'Pendiente')}</strong></div><div class="summary-item"><small>Documentos</small><strong>${docCount()} de ${docTypes.length}</strong></div><div class="summary-item"><small>Avance</small><strong>${progress()}%</strong></div></div>`;}
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
    header('Expediente','Documentación soporte','El proveedor integra en línea los documentos que acompañan la Cédula. Los archivos seleccionados quedan disponibles para consulta de la autoridad durante esta sesión de demostración.');
    content.innerHTML='';content.append($('#docsTpl').content.cloneNode(true));const list=content.querySelector('[data-doc-list]');
    list.innerHTML=docTypes.map(([k,n,d])=>{const info=docInfo(state.docs[k]);return `<div class="doc-row"><div><strong>${n}</strong><small>${d}</small>${info?`<small class="doc-ok">✓ ${escapeHtml(info.name)} · ${escapeHtml(formatBytes(info.size))}</small>`:''}</div><div class="doc-actions"><label class="btn btn-secondary btn-small file-btn">Seleccionar<input type="file" data-doc="${k}" accept=".pdf,.jpg,.jpeg,.png"></label>${info?`<button class="btn btn-ghost btn-small" type="button" data-provider-view-doc="${k}">Ver</button><button class="btn btn-ghost btn-small" type="button" data-remove="${k}">Quitar</button>`:''}</div></div>`}).join('');
    list.querySelectorAll('input[type=file]').forEach(inp=>inp.onchange=()=>{const file=inp.files[0];if(!file)return;if(file.size>12*1024*1024){toast('Para esta demostración seleccione archivos de hasta 12 MB.');return;}if(runtimeFiles[inp.dataset.doc]){try{URL.revokeObjectURL(runtimeFiles[inp.dataset.doc].url);}catch(e){}}runtimeFiles[inp.dataset.doc]={url:URL.createObjectURL(file),type:file.type,name:file.name};state.docs[inp.dataset.doc]={name:file.name,type:file.type,size:file.size,uploadedAt:stamp(),demo:false};save();renderDocs();});
    list.querySelectorAll('[data-remove]').forEach(b=>b.onclick=()=>{if(runtimeFiles[b.dataset.remove]){try{URL.revokeObjectURL(runtimeFiles[b.dataset.remove].url);}catch(e){} delete runtimeFiles[b.dataset.remove];}delete state.docs[b.dataset.remove];save();renderDocs();});
    list.querySelectorAll('[data-provider-view-doc]').forEach(b=>b.onclick=()=>openDocumentViewer(b.dataset.providerViewDoc));
    const pct=Math.round(docCount()/docTypes.length*100),donut=content.querySelector('[data-donut]');donut.style.setProperty('--p',pct);content.querySelector('[data-doc-percent]').textContent=pct+'%';
    content.querySelector('[data-doc-summary]').innerHTML=docTypes.map(([k,n])=>`<div class="checkline"><span>${n}</span><b>${state.docs[k]?'Integrado':'Pendiente'}</b></div>`).join('');
    content.querySelector('[data-return-form]').onclick=()=>route('form');
  }

  function openDocumentViewer(key){
    const def=docTypes.find(([k])=>k===key),info=docInfo(state.docs[key]); if(!info)return;
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
    const sections=[
      ['Datos generales',[['Tipo de solicitud',f.tipoSolicitud],['Tipo de persona',f.tipoPersona],['Razón social',f.razonSocial],['Antigüedad en el ramo',f.antigRamo],['Antigüedad en G.E.M.',f.antigGem],['Fecha de elaboración',f.fechaElaboracion]]],
      ['Domicilio fiscal',[['Domicilio',f.fiscalCalle],['C.P.',f.fiscalCp],['Municipio',f.fiscalMunicipio],['Entidad',f.fiscalEntidad],['Teléfono',f.fiscalTelefono],['Correo',f.fiscalEmail],['Página web',f.fiscalWeb]]],
      ['Domicilio comercial',[['Domicilio',f.comercialCalle],['C.P.',f.comercialCp],['Municipio',f.comercialMunicipio],['Entidad',f.comercialEntidad],['Teléfono',f.comercialTelefono],['Correo',f.comercialEmail],['Página web',f.comercialWeb]]],
      ['Registros oficiales',[['Acta / instrumento',f.actaConstitutiva],['Folio idCIF',f.idCif],['RFC',f.rfc],['Cámara',f.camara],['Representante',f.representante],['Poder notarial',f.poderNotarial]]],
      ['Actividad y giros',[['Actividad preponderante',(f.actividad||[]).join(', ')],['Descripción',f.descripcionActividad],['Socios',(f.socios||[]).filter(Boolean).join(' · ')],['Giros',(f.giros||[]).filter(Boolean).join(' · ')]]],
      ['Capacidad',[['Pasivo circulante',f.pasivoCirculante],['Pasivo y capital',f.pasivoCapital],['Activo circulante',f.activoCirculante],['Almacén',f.almacen],['Personal total',String((+f.personalAdmin||0)+(+f.personalTecnico||0)+(+f.personalObrero||0))],['Condiciones',(f.condiciones||[]).join(' · ')]]]
    ];
    const infoHtml=sections.map(([title,rows],i)=>`<details class="exp-section" ${i===0?'open':''}><summary>${escapeHtml(title)}</summary><div class="exp-grid">${rows.map(([a,b])=>`<div><small>${escapeHtml(a)}</small><strong>${escapeHtml(b||'—')}</strong></div>`).join('')}</div></details>`).join('');
    const docsHtml=docTypes.map(([k,n,d])=>{const info=docInfo(state.docs[k]);return `<div class="authority-doc-row"><div><strong>${escapeHtml(n)}</strong><small>${escapeHtml(d)}</small>${info?`<span>✓ ${escapeHtml(info.name)} · ${escapeHtml(formatBytes(info.size))}</span>`:'<span class="missing-doc">Pendiente</span>'}</div>${info?`<button class="btn btn-secondary btn-small" type="button" data-authority-view-doc="${k}">Ver documento</button>`:''}</div>`}).join('');
    el.innerHTML=`<div class="expedient-tabs"><div><span class="kicker">Información</span>${infoHtml}</div><div><span class="kicker">Documentos digitales</span><div class="authority-doc-list">${docsHtml}</div></div></div>`;
    el.querySelectorAll('[data-authority-view-doc]').forEach(b=>b.onclick=()=>openDocumentViewer(b.dataset.authorityViewDoc));
  }

  function renderSanctionsPanel(el){
    const s=state.sanctionsCheck;
    if(!s){el.innerHTML=`<div class="card-head"><div><span class="kicker">Control previo · Contraloría General</span><h3>Registro de Empresas Objetadas y Sancionadas</h3></div><span class="status-badge sanctions-pending">Pendiente</span></div><p>Antes de validar favorablemente el Alta o Renovación, la autoridad debe verificar que la empresa no se encuentre en el registro correspondiente. Esta consulta es simulada y no está conectada a un servicio real.</p>`;return;}
    const clear=s.result==='clear';
    el.innerHTML=`<div class="card-head"><div><span class="kicker">Control previo · Contraloría General</span><h3>Registro de Empresas Objetadas y Sancionadas</h3></div><span class="status-badge ${clear?'sanctions-clear':'sanctions-hit'}">${clear?'Sin coincidencias':'Coincidencia localizada'}</span></div><div class="sanctions-result"><div><small>Proveedor consultado</small><strong>${escapeHtml(s.provider||'')}</strong></div><div><small>RFC</small><strong>${escapeHtml(s.rfc||'')}</strong></div><div><small>Fecha de consulta</small><strong>${escapeHtml(s.checkedAt||'')}</strong></div><div><small>Resultado</small><strong>${clear?'No se localizaron coincidencias en la simulación.':'Se simuló una coincidencia; la autorización queda bloqueada.'}</strong></div></div><div class="${clear?'success-box':'observation-box'} mt24"><strong>${clear?'Control previo satisfecho':'Autorización bloqueada'}</strong><p>${clear?'La solicitud puede continuar con las demás validaciones.':'La autoridad debe atender la situación conforme al procedimiento aplicable antes de continuar.'}</p></div>`;
  }

  function openSanctionsCheckModal(){
    const prior=state.sanctionsCheck;
    modalBody.innerHTML=`<p>Consulta previa a la autorización de la solicitud.</p><div class="form-grid cols2"><label>Empresa<input value="${escapeHtml(state.form.razonSocial||state.account.name||'Proveedor')}" disabled></label><label>RFC<input value="${escapeHtml(state.form.rfc||state.account.rfc||'')}" disabled></label></div><div class="source-note"><b>Demostración sin conexión:</b> en producción esta acción deberá consultar el Registro de Empresas Objetadas y Sancionadas de la Contraloría General mediante el mecanismo institucional autorizado, conservar evidencia de la consulta y devolver una respuesta trazable.</div>${prior?`<p class="micro">Último resultado registrado: <b>${escapeHtml(sanctionsLabel())}</b> · ${escapeHtml(prior.checkedAt||'')}</p>`:''}`;
    modalActions.innerHTML='<button class="btn btn-ghost" id="cancelSanctions" type="button">Cancelar</button><button class="btn btn-warning" id="simulateHit" type="button">Simular coincidencia</button><button class="btn btn-primary" id="simulateClear" type="button">Simular sin coincidencias</button>';
    openModal('Verificar Registro de Empresas Objetadas y Sancionadas');
    $('#cancelSanctions').onclick=closeModal;
    $('#simulateClear').onclick=()=>{state.sanctionsCheck={result:'clear',provider:state.form.razonSocial||state.account.name||'',rfc:state.form.rfc||state.account.rfc||'',checkedAt:stamp(),source:'Registro de Empresas Objetadas y Sancionadas · simulación'};addTimeline('Consulta de sanciones','Sin coincidencias en la verificación demostrativa del registro');addMessage('Sistema','Se registró la consulta previa al Registro de Empresas Objetadas y Sancionadas: sin coincidencias.','system');save();closeModal();renderReviewDetail();};
    $('#simulateHit').onclick=()=>{state.sanctionsCheck={result:'hit',provider:state.form.razonSocial||state.account.name||'',rfc:state.form.rfc||state.account.rfc||'',checkedAt:stamp(),source:'Registro de Empresas Objetadas y Sancionadas · simulación'};state.expedienteValidado=false;addTimeline('Consulta de sanciones','Se simuló una coincidencia; la autorización quedó bloqueada');addMessage('Sistema','La consulta demostrativa al Registro de Empresas Objetadas y Sancionadas arrojó una coincidencia. La solicitud no puede autorizarse mientras subsista este resultado.','system');save();closeModal();renderReviewDetail();};
  }

  function openReviewModal(){
    const missing=[],f=state.form;
    [['razonSocial','Razón social'],['rfc','RFC'],['representante','Representante'],['fechaElaboracion','Fecha'],['descripcionActividad','Actividad'],['nombreFirma','Nombre para firma']].forEach(([k,l])=>{if(!String(f[k]||'').trim())missing.push(l);});
    if(!f.actividad?.length)missing.push('Actividad preponderante');if(!f.giros?.some(Boolean))missing.push('Al menos un giro');if(!f.declaracion)missing.push('Declaración');
    modalBody.innerHTML=`<p>Avance: <b>${progress()}%</b>. Documentos: <b>${docCount()}/${docTypes.length}</b>.</p>${missing.length?`<div class="observation-box"><strong>Información pendiente</strong><p>${missing.join(', ')}.</p></div>`:`<div class="success-box"><strong>Captura mínima completa.</strong><p>Al enviar, la autoridad podrá validar el expediente, retroalimentarlo en línea y citar para cotejo cuando proceda.</p></div>`}`;
    modalActions.innerHTML=`<button class="btn btn-secondary" id="cancelSend" type="button">Cancelar</button><button class="btn btn-primary" id="confirmSend" type="button" ${missing.length?'disabled':''}>Enviar a validación</button>`;
    openModal('Revisión previa');$('#cancelSend').onclick=closeModal;const c=$('#confirmSend');if(c)c.onclick=()=>{submitRequest();closeModal();route('tracking');};
  }
  function submitRequest(){
    if(!state.folio)state.folio=`PROV-${new Date().getFullYear()}-${String(Math.floor(1000+Math.random()*9000))}`;
    state.status='En validación';addTimeline('Solicitud enviada','Expediente turnado a validación de la autoridad');
    addMessage('Sistema',`La solicitud de ${state.form.tipoSolicitud} fue enviada a validación.`,'system');save();
  }

  function renderTracking(){
    header('Seguimiento','Trámite, pago de derechos y retroalimentación en línea','Consulte el estatus, atienda observaciones, reciba citas para cotejo y, una vez validado el expediente, atienda la notificación de pago de derechos.');
    content.innerHTML='';content.append($('#trackingTpl').content.cloneNode(true));
    content.querySelector('[data-track-folio]').textContent=state.folio||'Sin folio asignado';content.querySelector('[data-track-status]').textContent=state.status;
    content.querySelector('[data-track-details]').innerHTML=[['Proveedor',state.form.razonSocial||'Pendiente'],['RFC',state.form.rfc||'Pendiente'],['Trámite',state.form.tipoSolicitud],['Fecha',state.form.fechaElaboracion||'Pendiente'],['Documentos',`${docCount()}/${docTypes.length}`],['Expediente validado',state.expedienteValidado?'Sí':'No']].map(([a,b])=>`<div class="detail-row"><span>${a}</span><strong>${escapeHtml(b)}</strong></div>`).join('');
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
      p.innerHTML=`<span class="kicker">Pago de derechos</span><h3>Aún no requerido</h3><p>El pago de derechos se notifica únicamente después de que la autoridad valida favorablemente el expediente de Alta o Renovación.</p>`;
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

  function renderReviewer(){
    header('Autoridad','Bandeja de validación','Revise el expediente digital completo, consulte documentos, retroalimente en línea, cite para cotejo cuando proceda y verifique el Registro de Empresas Objetadas y Sancionadas antes de autorizar.');
    content.innerHTML='';content.append($('#reviewerTpl').content.cloneNode(true));
    content.querySelector('[data-review-count]').textContent=state.status==='En validación'?1:0;
    content.querySelector('[data-observed-count]').textContent=state.status==='Observado'?1:0;
    content.querySelector('[data-cotejo-count]').textContent=state.status==='Cotejo requerido'?1:0;
    content.querySelector('[data-payment-count]').textContent=(state.status==='Pago de derechos requerido'||state.status==='Pago reportado')?1:0;
    content.querySelector('[data-issued-count]').textContent=state.status==='Cédula expedida'?1:0;
    const tbody=content.querySelector('[data-review-table]');
    tbody.innerHTML=`<tr><td>${escapeHtml(state.folio||'—')}</td><td>${escapeHtml(state.form.razonSocial||state.account.name||'Proveedor Demo')}</td><td>${escapeHtml(state.form.tipoSolicitud)}</td><td>${docCount()}/${docTypes.length}</td><td><span class="status-badge ${state.sanctionsCheck?.result==='clear'?'sanctions-clear':state.sanctionsCheck?.result==='hit'?'sanctions-hit':'sanctions-pending'}">${escapeHtml(sanctionsLabel())}</span></td><td><span class="status-badge ${clsStatus(state.status)}">${state.status}</span></td><td><button class="btn btn-secondary btn-small" data-open-review type="button">Abrir</button></td></tr>`;
    tbody.querySelector('[data-open-review]').onclick=()=>route('review-detail');
  }
  function renderReviewDetail(){
    header('Autoridad','Validación del expediente','La autoridad consulta la información y documentos del expediente digital, retroalimenta al proveedor, cita para cotejo cuando proceda y verifica el registro de empresas objetadas o sancionadas antes de validar favorablemente.');
    content.innerHTML='';content.append($('#reviewDetailTpl').content.cloneNode(true));
    content.querySelector('[data-rd-name]').textContent=state.form.razonSocial||state.account.name||'Proveedor Demo';setStatus(content.querySelector('[data-rd-status]'),state.status);
    content.querySelector('[data-rd-details]').innerHTML=[['Folio',state.folio||'Sin folio'],['RFC',state.form.rfc||'Pendiente'],['Representante',state.form.representante||'Pendiente'],['Trámite',state.form.tipoSolicitud],['Documentos',`${docCount()}/${docTypes.length}`],['Avance',progress()+'%'],['Expediente validado',state.expedienteValidado?'Sí':'No']].map(([a,b])=>`<div class="detail-row"><span>${a}</span><strong>${escapeHtml(b)}</strong></div>`).join('');
    content.querySelector('[data-rd-summary]')?.remove();
    renderDigitalExpedient(content.querySelector('[data-rd-expedient]'));
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
      if(state.cotejo && !state.cotejo.completed){toast('Existe un cotejo pendiente. Registre primero su realización para continuar con la validación del expediente.');return;}
      if(state.status!=='Pago reportado' && state.status!=='Pago de derechos requerido' && state.status!=='Cédula expedida'){
        if(!state.sanctionsCheck){toast('Antes de validar favorablemente el expediente debe realizar la consulta al Registro de Empresas Objetadas y Sancionadas de la Contraloría General.');return;}
        if(state.sanctionsCheck.result==='hit'){toast('La consulta registra una coincidencia. La autorización del Alta o Renovación permanece bloqueada en este prototipo.');return;}
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
      if(!state.sanctionsCheck){approveBtn.disabled=true;approveBtn.textContent='Pendiente consulta de Contraloría';}
      else if(state.sanctionsCheck.result==='hit'){approveBtn.disabled=true;approveBtn.textContent='Autorización bloqueada por consulta';}
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
    modalBody.innerHTML=`<p>El expediente se registrará como validado favorablemente. Previamente quedó documentada la consulta al Registro de Empresas Objetadas y Sancionadas sin coincidencias. A continuación se notificará al proveedor que debe realizar el pago de derechos antes de que pueda expedirse la cédula.</p><div class="form-grid cols2"><label class="span2">Concepto<input id="payConcept" value="${escapeHtml(pay.concept||'Derechos para la expedición de la Cédula de Registro e Identificación de Proveedores')}"></label><label>Monto (MXN)<input id="payAmount" type="number" min="0" step="0.01" value="${escapeHtml(pay.amount||'')}" placeholder="Capture el monto aplicable"></label><label>Fecha límite <small>(si aplica)</small><input id="payDue" type="date" value="${escapeHtml(pay.dueDate||'')}"></label><label class="span2">Referencia / línea de captura<input id="payReference" value="${escapeHtml(pay.reference||'')}" placeholder="Referencia, línea de captura o identificador de pago"></label><label class="span2">Instrucciones para el proveedor<textarea id="payInstructions" rows="4">${escapeHtml(pay.instructions||'Realice el pago conforme a la referencia indicada y cargue el comprobante en este portal para su validación.')}</textarea></label></div><div class="source-note"><b>Nota de diseño:</b> el monto, vigencia, medio de pago y formato de la referencia deberán parametrizarse conforme a las reglas que determine la autoridad competente.</div>`;
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
    state.docs={acta:{name:'acta_demo.pdf',type:'application/pdf',size:245760,uploadedAt:'Dato demostrativo',demo:true},cif:{name:'idcif_demo.pdf',type:'application/pdf',size:118420,uploadedAt:'Dato demostrativo',demo:true},rfc:{name:'situacion_fiscal_demo.pdf',type:'application/pdf',size:182300,uploadedAt:'Dato demostrativo',demo:true},poder:{name:'poder_demo.pdf',type:'application/pdf',size:302110,uploadedAt:'Dato demostrativo',demo:true},financiero:{name:'estado_financiero_demo.pdf',type:'application/pdf',size:396800,uploadedAt:'Dato demostrativo',demo:true}};
    state.status='Borrador';state.timeline=[{label:'Renovación iniciada',detail:'Expediente recuperado para actualización en línea',when:stamp()}];state.messages=[];state.cotejo=null;state.expedienteValidado=false;state.payment=null;state.cedula=null;state.sanctionsCheck=null;save();
  }
  function openModal(title){$('#modalTitle').textContent=title;modal.classList.remove('hidden');}
  function closeModal(){modal.classList.add('hidden');modal.classList.remove('wide-modal');}
  function toast(msg){modalBody.innerHTML=`<p>${escapeHtml(msg)}</p>`;modalActions.innerHTML='<button class="btn btn-primary" id="okToast" type="button">Aceptar</button>';openModal('Información');$('#okToast').onclick=closeModal;}
  function reset(){localStorage.removeItem(STORAGE);state=structuredClone(defaultState);showPublic();}

  $('#newProviderBtn').onclick=()=>showAccess('new');
  $('#existingProviderBtn').onclick=()=>showAccess('existing');
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
