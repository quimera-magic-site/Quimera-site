'use strict';
(() => {
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  const items = typeof CATALOG !== 'undefined' ? CATALOG : [];
  const phone = String(window.QUIMERA_CONFIG?.whatsapp || '5515996636845').replace(/\D/g, '');
  const encode = text => `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  const normalize = text => String(text).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  const html = text => String(text).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const colorPalette = ['linear-gradient(140deg,#eacbea,#c2a2de)','linear-gradient(145deg,#f8d6bb,#f3acc7)','linear-gradient(145deg,#c2e2f0,#b5c3e8)','linear-gradient(140deg,#f7e2ac,#dfbce7)','linear-gradient(135deg,#d8ebd3,#c5d8e8)','linear-gradient(130deg,#ecceed,#d4c3ff)'];
  const categories = [['todos','Todos'],['destaques','Em destaque ✦'],['princesas','Princesas'],['herois','Heróis & games'],['mascotes','Mascotes'],['tematicos','Temáticos'],['shows','Shows & animação']];
  const gallery = [{slug:'stitch-angel',title:'Diversão em dobro'},{slug:'barbie-trio',title:'Um mundo cor-de-rosa'},{slug:'sininho-peter',title:'Um toque de fantasia'},{slug:'guerreiras-kpop',title:'A energia da festa'}];
  const state = {filter:'todos',search:'',visible:12,selected:new Set(),item:null,event:'Aniversário infantil',theme:'princesas',before:null};
  const catGrid = $('#catalogGrid');
  const itemById = id => items.find(x => x.id===id);
  const selectedItems = () => items.filter(i => state.selected.has(i.id));
  const matchingItems = () => items.filter(x => (state.filter==='todos'||(state.filter==='destaques'&&x.featured)||x.category===state.filter) && (!state.search || normalize(x.name+' '+x.categoryName).includes(state.search)));
  function photo(item, index, modal=false) {
    const klass=modal?'modal-visual':'character-art';
    const fallback=colorPalette[index%colorPalette.length];
    return item.image
      ? `<div class="${klass}"><img src="${html(item.image)}" alt="Fotografia de referência de ${html(item.name)}" ${modal?'':'loading="lazy"'} width="520" height="650" />${modal?'':'<span class="art-label">FOTO DE REFERÊNCIA</span>'}</div>`
      : `<div class="${klass} character-art--missing" style="--art-bg:${fallback}"><span class="art-icon" aria-hidden="true">${item.icon||'✦'}</span>${modal?'':'<span class="art-label">FOTO A CONFIRMAR</span>'}</div>`;
  }
  function card(item){const i=items.indexOf(item),saved=state.selected.has(item.id);return `<article class="character-card"><button type="button" class="card-photo-open" data-open="${html(item.id)}" aria-label="Ver foto e detalhes de ${html(item.name)}">${photo(item,i)}</button><button type="button" class="card-save ${saved?'saved':''}" data-save="${html(item.id)}" aria-label="${saved?'Remover':'Adicionar'} ${html(item.name)} ${saved?'da':'à'} seleção" aria-pressed="${saved}" title="${saved?'Remover da seleção':'Adicionar à seleção'}">${saved?'♥':'♡'}</button><div class="card-body"><span class="card-category">${html(item.categoryName)}</span><h3>${html(item.name)}</h3><button type="button" class="card-open" data-open="${html(item.id)}">Conhecer personagem <span aria-hidden="true">↗</span></button></div></article>`;}
  function renderCatalog(){const found=matchingItems();$('#catalogTotal').textContent=String(items.length);$('#resultsCount').textContent=`${found.length} ${found.length===1?'opção encontrada':'opções encontradas'}`;catGrid.innerHTML=found.length?found.slice(0,state.visible).map(card).join(''):`<div class="empty-results"><strong>Nenhum personagem por aqui ✧</strong>Tente outro nome ou explore uma categoria.</div>`;$('#loadMore').hidden=found.length<=state.visible;}
  function renderFilters(){$('#catalogFilters').innerHTML=categories.map(([id,label])=>`<button type="button" class="filter-chip ${state.filter===id?'active':''}" data-filter="${id}" aria-pressed="${state.filter===id}">${html(label)}</button>`).join('');}
  function setCategory(category){state.filter=category;state.visible=12;renderFilters();renderCatalog();}
  $('#catalogFilters').addEventListener('click', e=>{const b=e.target.closest('[data-filter]');if(b)setCategory(b.dataset.filter);});
  catGrid.addEventListener('click',e=>{const save=e.target.closest('[data-save]');if(save){toggleSaved(save.dataset.save);return;}const open=e.target.closest('[data-open]');if(open)openItem(open.dataset.open);});
  $('#searchInput').addEventListener('input',e=>{state.search=normalize(e.target.value.trim());state.visible=12;$('#clearSearch').hidden=!e.target.value;renderCatalog();});
  $('#clearSearch').addEventListener('click',()=>{$('#searchInput').value='';state.search='';state.visible=12;$('#clearSearch').hidden=true;renderCatalog();$('#searchInput').focus();});
  $('#loadMore').addEventListener('click',()=>{state.visible+=12;renderCatalog();});
  $$('[data-explore]').forEach(btn=>btn.addEventListener('click',()=>{setCategory(btn.dataset.explore);$('#personagens').scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});}));
  function toggleSaved(id){if(!itemById(id))return;if(state.selected.has(id))state.selected.delete(id);else state.selected.add(id);renderCatalog();renderSelections();if(state.item?.id===id)updateModalSave();}
  function renderSelections(){const count=state.selected.size;document.body.classList.toggle('has-selection',count>0);$('#selectionTray').hidden=!count;$('#selectionCount').textContent=count===1?'1 personagem selecionado':`${count} personagens selecionados`;const s=$('#characterSelect');let o=s.querySelector('[data-selection-option]');if(count){if(!o){o=document.createElement('option');o.dataset.selectionOption='true';s.insertBefore(o,s.children[1]);}o.value='Minha seleção de personagens';o.textContent=`Minha seleção (${count} personagens)`;}else if(o){if(s.value===o.value)s.value='';o.remove();}const list=$('#selectedList');list.innerHTML=selectedItems().map(x=>`<div class="selected-item">${x.image?`<img src="${html(x.image)}" alt="" width="51" height="51" loading="lazy">`:`<span class="selected-emoji">${x.icon}</span>`}<strong>${html(x.name)}</strong><button type="button" data-remove="${html(x.id)}" aria-label="Remover ${html(x.name)}">×</button></div>`).join('')||'<p class="selection-empty">Sua seleção está vazia.</p>';}
  function selectionMessage(){return ['Olá, Quimera Magic! Gostaria de consultar os seguintes personagens para um evento:','',...selectedItems().map((x,i)=>`${i+1}. ${x.name}`),'','Podemos conversar sobre valores e disponibilidade?'].join('\n');}
  function goWhatsApp(message){const a=document.createElement('a');a.href=encode(message);a.target='_blank';a.rel='noopener noreferrer';document.body.appendChild(a);a.click();a.remove();}
  $('#trayView').addEventListener('click',()=>{openSelection();});
  $('#traySend').addEventListener('click',()=>goWhatsApp(selectionMessage()));
  $('#trayClear').addEventListener('click',()=>{state.selected.clear();renderSelections();renderCatalog();});
  $('#selectedList').addEventListener('click',e=>{const b=e.target.closest('[data-remove]');if(b)toggleSaved(b.dataset.remove);});
  $('#selectionQuote').addEventListener('click',()=>{goWhatsApp(selectionMessage());closeSelection();});
  function openSelection(){state.before=document.activeElement;$('#selectionModal').hidden=false;document.body.classList.add('modal-open');$('#selectionClose').focus();}
  function closeSelection(){$('#selectionModal').hidden=true;document.body.classList.remove('modal-open');if(state.before?.isConnected)state.before.focus();}
  $('#selectionClose').addEventListener('click',closeSelection);
  $('#selectionModal').addEventListener('click',e=>{if(e.target.dataset.selectionClose==='yes')closeSelection();});
  function updateModalSave(){if(!state.item)return;$('#modalAdd').textContent=state.selected.has(state.item.id)?'♥ Remover da seleção':'+ Adicionar à seleção';}
  function openItem(id){const item=itemById(id);if(!item)return;state.item=item;state.before=document.activeElement;$('#modalName').textContent=item.name;$('#modalCategory').textContent=item.categoryName;$('#modalDescription').textContent=item.description;const v=$('#modalVisual');const wrapper=document.createElement('div');wrapper.innerHTML=photo(item,item.order,true);const next=wrapper.firstElementChild;next.id='modalVisual';v.replaceWith(next);updateModalSave();$('#characterModal').hidden=false;document.body.classList.add('modal-open');$('#modalClose').focus();}
  function closeItem(){$('#characterModal').hidden=true;document.body.classList.remove('modal-open');state.item=null;if(state.before?.isConnected)state.before.focus();}
  $('#modalClose').addEventListener('click',closeItem);
  $('#characterModal').addEventListener('click',e=>{if(e.target.dataset.modalClose==='yes')closeItem();});
  $('#modalAdd').addEventListener('click',()=>{if(state.item)toggleSaved(state.item.id);});
  $('#modalWhatsApp').addEventListener('click',()=>{if(state.item)goWhatsApp(`Olá! Gostaria de um orçamento da Quimera Magic para o personagem: ${state.item.name}. Podemos conversar sobre disponibilidade e valores?`);});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(!$('#characterModal').hidden)closeItem();else if(!$('#selectionModal').hidden)closeSelection();return;}const box=!$('#characterModal').hidden?$('#characterModal'):!$('#selectionModal').hidden?$('#selectionModal'):null;if(!box||e.key!=='Tab')return;const controls=$$('button:not([disabled]),a[href],input,select').filter(x=>box.contains(x)&&!x.hidden);if(!controls.length)return;if(e.shiftKey&&document.activeElement===controls[0]){e.preventDefault();controls.at(-1).focus();}else if(!e.shiftKey&&document.activeElement===controls.at(-1)){e.preventDefault();controls[0].focus();}});
  const menu=$('#mobileMenu'),menuToggle=$('#menuToggle');
  function setMenu(open){menu.hidden=!open;menuToggle.setAttribute('aria-expanded',String(open));menuToggle.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');document.body.classList.toggle('menu-open',open);}
  menuToggle.addEventListener('click',()=>setMenu(menu.hidden));
  $$('#mobileMenu a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
  document.addEventListener('click',e=>{if(!menu.hidden && !e.target.closest('#mobileMenu') && !e.target.closest('#menuToggle'))setMenu(false);});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!menu.hidden){setMenu(false);menuToggle.focus();}});
  window.addEventListener('resize',()=>{if(window.innerWidth>760&&!menu.hidden)setMenu(false);});
  $('#galleryGrid').innerHTML=gallery.map((g,i)=>{const im=`/assets/${g.slug}.webp`;return `<button class="gallery-tile" type="button" data-gallery="${i}" aria-label="Ver ${html(g.title)}"><img src="${im}" alt="Registro fotográfico de referência: ${html(g.title)}" loading="lazy" width="600" height="700"><span>${html(g.title)} <small>CONHECER PERSONAGENS ↗</small></span></button>`;}).join('');
  $('#galleryGrid').addEventListener('click',e=>{const b=e.target.closest('[data-gallery]');if(!b)return;const g=gallery[Number(b.dataset.gallery)];const item=items.find(x=>x.image===`/assets/${g.slug}.webp`);if(item)openItem(item.id);});
  const choiceData={princesas:['Cinderella','Unicórnio','Fadas'],mascotes:['Hello Kitty','Stitch e Angel','Mickey e Minnie luxo'],herois:['Sonic e Shadow luxo','Homem Aranha','Sonic'],shows:['Guerreiras do K-pop','Prateados (animação de pista)','Recreação e oficinas']};
  function renderPlanner(){const names=choiceData[state.theme]||choiceData.princesas;$('#plannerSuggestions').innerHTML=names.map(name=>{const found=items.find(x=>x.name===name);return found?`<button type="button" data-plan-item="${html(found.id)}" class="planner-suggestion">${html(found.icon)} ${html(name)} ↗</button>`:'';}).join('');}
  $('#plannerSuggestions').addEventListener('click',e=>{const b=e.target.closest('[data-plan-item]');if(b)openItem(b.dataset.planItem);});
  $('#eventChoices').addEventListener('click',e=>{const b=e.target.closest('[data-event]');if(!b)return;state.event=b.dataset.event;$$('#eventChoices .choice').forEach(x=>{x.classList.toggle('selected',x===b);x.setAttribute('aria-pressed',String(x===b));});});
  $('#themeChoices').addEventListener('click',e=>{const b=e.target.closest('[data-theme]');if(!b)return;state.theme=b.dataset.theme;$$('#themeChoices .choice').forEach(x=>{x.classList.toggle('selected',x===b);x.setAttribute('aria-pressed',String(x===b));});renderPlanner();});
  $('#plannerWhatsapp').addEventListener('click',()=>{const names=(choiceData[state.theme]||[]).slice(0,3);const message=['Olá! Gostaria de planejar um evento com a Quimera Magic.','','Tipo de evento: '+state.event,'Interesse: '+({'princesas':'Princesas e fantasia','mascotes':'Mascotes','herois':'Heróis e games','shows':'Shows e animação'}[state.theme]),'Personagens que gostaria de consultar: '+names.join(', '),'','Podemos conversar sobre as opções e disponibilidade?'].join('\n');goWhatsApp(message);});
  const opts=$('#characterSelect');const other=opts.lastElementChild;other.remove();items.forEach(x=>{const option=document.createElement('option');option.value=x.name;option.textContent=x.name;opts.append(option);});opts.append(other);
  const now=new Date();const ymd=[now.getFullYear(),String(now.getMonth()+1).padStart(2,'0'),String(now.getDate()).padStart(2,'0')].join('-');$('#eventDate').min=ymd;
  function inform(message){const box=$('#formNotice');box.hidden=false;box.textContent=message;}
  $('#quoteForm').addEventListener('submit',e=>{e.preventDefault();const form=e.currentTarget;if(!form.reportValidity())return;const d=new FormData(form);const digits=String(d.get('telefone')||'').replace(/\D/g,'');if(digits.length<10||digits.length>13){inform('Por favor, confira o número de WhatsApp informado, incluindo o DDD.');return;}const date=String(d.get('data')||'');if(date<ymd){inform('A data do evento precisa ser hoje ou uma data futura.');return;}const formatted=date.split('-').reverse().join('/');const selected=selectedItems().map(x=>x.name);const picked=d.get('personagem');const lines=['Olá! Gostaria de solicitar um orçamento da Quimera Magic.','','Nome: '+d.get('nome'),'WhatsApp: '+d.get('telefone'),'Data do evento: '+formatted,'Cidade: '+d.get('cidade'),'Personagem/experiência: '+(picked==='Minha seleção de personagens'?selected.join(', '):picked),'Observações: '+(d.get('observacoes')||'Não informadas'),'','Podemos conversar sobre a disponibilidade?'];inform('Seu pedido está pronto. O WhatsApp será aberto para você confirmar o envio.');goWhatsApp(lines.join('\n'));});
  $$('a[href^="#"]').forEach(a=>a.addEventListener('click',()=>{if(!menu.hidden)setMenu(false);}));
  function initReveals(){if(!('IntersectionObserver' in window)||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;const elems=$$('.section-kicker,.section-top,.intro-grid,.experience-card,.story-left,.story-right,.planner-intro,.planner-panel,.steps-grid article,.faq-heading,.contact-left');document.body.classList.add('js-reveal');elems.forEach(el=>el.classList.add('fade-rise'));const ob=new IntersectionObserver((entries)=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');ob.unobserve(entry.target);}}),{rootMargin:'0px 0px -35px 0px',threshold:.08});elems.forEach(el=>ob.observe(el));}
  renderFilters();renderCatalog();renderSelections();renderPlanner();initReveals();
})();
