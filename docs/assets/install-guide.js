document.querySelectorAll('[data-copy]').forEach(button => {
  button.addEventListener('click', async () => {
    const code = document.getElementById(button.dataset.copy);
    if (!code) return;
    const value = code.textContent;
    let copied = false;
    try { await navigator.clipboard.writeText(value); copied = true; } catch (_) {
      const area = document.createElement('textarea');
      area.value = value; area.style.position = 'fixed'; area.style.opacity = '0';
      document.body.append(area); area.select();
      try { copied = document.execCommand('copy'); } catch (_) {}
      area.remove(); button.focus();
    }
    if (!copied) { window.prompt('انسخ الأوامر التالية:', value); return; }
    button.textContent = 'تم النسخ ✓';
    window.setTimeout(() => { button.textContent = button.dataset.copyLabel || 'نسخ الأوامر'; }, 2000);
  });
});

// Installation methods remain readable without JavaScript.
const methodLinks = [...document.querySelectorAll('[data-method]')];
function chooseMethod(id) {
  if (!methodLinks.some(a => a.dataset.method === id)) return;
  methodLinks.forEach(a => {
    const active = a.dataset.method === id;
    a.setAttribute('aria-selected', String(active));
    a.tabIndex = active ? 0 : -1;
    document.getElementById(a.dataset.method).hidden = !active;
  });
}
methodLinks.forEach((a,i) => {
  a.id='tab-'+a.dataset.method; a.setAttribute('aria-controls',a.dataset.method); document.getElementById(a.dataset.method).setAttribute('aria-labelledby',a.id);
  a.addEventListener('click', e => {
    e.preventDefault(); chooseMethod(a.dataset.method);
    history.replaceState(null, '', '#' + a.dataset.method);
  });
  a.addEventListener('keydown', e => {
    let next;
    if(e.key === 'ArrowLeft') next = (i+1)%methodLinks.length;
    if(e.key === 'ArrowRight') next = (i+methodLinks.length-1)%methodLinks.length;
    if(e.key === 'Home') next=0;
    if(e.key === 'End') next=methodLinks.length-1;
    if(next !== undefined){ e.preventDefault(); chooseMethod(methodLinks[next].dataset.method); methodLinks[next].focus(); }
  });
});
function followHash(){
  const id=location.hash.slice(1);
  const target=document.getElementById(id);
  if(id)chooseMethod(target?.closest('.method-panel')?.id || id);
  for(let node=target;node;node=node.parentElement){if(node.tagName==='DETAILS')node.open=true;}
}
chooseMethod(methodLinks.some(a=>a.dataset.method===location.hash.slice(1)) ? location.hash.slice(1) : 'install-tv');
if(!methodLinks.some(a=>a.getAttribute('aria-selected')==='true'&&!document.getElementById(a.dataset.method).hidden))chooseMethod('install-tv');
followHash();addEventListener('hashchange',followHash);
const themes = {
 lavender:{title:'الخزامى',text:'زجاج بنفسجي هادئ ونقش نباتي مفرّغ بلون الخزامى الموحد، بفراغات متناسقة دون خطوط.',colors:['#8a6bd0','#eee7f8','#c6a6e8','#30243d']},
 najdi:{title:'نجد',text:'صورتك الأصلية بالأحمر والأبيض والأسود والأخضر والبرتقالي، مستخدمة كما هي في الرئيسية وشاشة التوقف دون رسم بديل.',colors:['#c52129','#fff7e9','#231f20','#159446','#ef8529']},
};
const preview=document.getElementById('theme-preview');
function updateThemeShot(){const img=document.getElementById('theme-shot');if(img){img.src='assets/theme-'+preview.dataset.theme+'-'+preview.dataset.scene+'.png';img.alt=(preview.dataset.scene==='home'?'الرئيسية':'شاشة التوقف')+' · '+themes[preview.dataset.theme].title;}}
function chooseTheme(key){
 const theme=themes[key];if(!theme||!preview)return;
 preview.dataset.theme=key;updateThemeShot();
 document.getElementById('theme-title').textContent=theme.title;
 document.getElementById('theme-description').textContent=theme.text;
 const palette=document.getElementById('theme-palette');palette.replaceChildren();
 theme.colors.forEach(color=>{const swatch=document.createElement('span');swatch.style.backgroundColor=color;swatch.title=color;swatch.setAttribute('aria-label',color);palette.append(swatch)});
 document.querySelectorAll('button[data-theme]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.theme===key)));
}
document.querySelectorAll('button[data-theme]').forEach(b=>b.addEventListener('click',()=>chooseTheme(b.dataset.theme)));
document.querySelectorAll('[data-scene]').forEach(b=>{
 if(b.tagName!=='BUTTON')return;
 b.addEventListener('click',()=>{
  preview.dataset.scene=b.dataset.scene;updateThemeShot();
  document.querySelectorAll('button[data-scene]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));
 });
});
const requestedTheme=new URLSearchParams(location.search).get('theme');
chooseTheme(Object.prototype.hasOwnProperty.call(themes,requestedTheme) ? requestedTheme : 'lavender');
