const pages = [
  {src:'assets/cover.webp', label:'ОБЛОЖКА', title:'Обложка', alt:'Обложка книги достижений Димы и Кристины'},
  {src:'assets/spread-1.webp', label:'ДОСТИЖЕНИЯ №2–3', title:'Временный выход и мир загружен снова', alt:'Разворот с достижениями 2 и 3'},
  {src:'assets/spread-2.webp', label:'ДОСТИЖЕНИЯ №4–5', title:'Мокрый квест и сердце разблокированы', alt:'Разворот с достижениями 4 и 5'},
  {src:'assets/spread-3.webp', label:'ДОСТИЖЕНИЯ №6–7', title:'Сумеречный просмотр и первый Новый год', alt:'Разворот с достижениями 6 и 7'},
  {src:'assets/spread-4.webp', label:'ДОСТИЖЕНИЯ №8–9', title:'Первая ночёвка и двойной праздник', alt:'Разворот с достижениями 8 и 9'},
  {src:'assets/spread-5.webp', label:'ДОСТИЖЕНИЯ №10–11', title:'Исследователь и один год — один мир', alt:'Разворот с достижениями 10 и 11'},
  {src:'assets/spread-6.webp', label:'СЕКРЕТНЫЕ ДОСТИЖЕНИЯ', title:'Секретные достижения и заметки', alt:'Разворот с секретными достижениями'},
  {src:'assets/spread-7.webp', label:'СОХРАНЕНИЕ НЕ ЗАКРЫВАТЬ', title:'Финальная страница', alt:'Заключительный разворот книги достижений'}
];
let current = 0;
const image = document.getElementById('spreadImage');
const label = document.getElementById('chapterLabel');
const counter = document.getElementById('pageCounter');
const prev = document.getElementById('prevBtn');
const next = document.getElementById('nextBtn');
const nextText = document.getElementById('nextTextBtn');
const first = document.getElementById('firstBtn');
const progress = document.getElementById('progressBar');
const fallback = document.getElementById('imageFallback');
const panel = document.getElementById('contentsPanel');
const contentsBtn = document.getElementById('contentsBtn');
const list = document.getElementById('contentsList');
function render(){
  const p = pages[current]; image.hidden = false; fallback.hidden = true;
  image.src = p.src; image.alt = p.alt; label.textContent = p.label;
  counter.textContent = `${String(current+1).padStart(2,'0')} / ${String(pages.length).padStart(2,'0')}`;
  prev.disabled = current === 0; next.disabled = current === pages.length-1;
  nextText.textContent = current === pages.length-1 ? 'В КОНЦЕ ✓' : 'ЛИСТАТЬ →'; nextText.disabled = current === pages.length-1;
  progress.style.width = `${((current+1)/pages.length)*100}%`;
  [...list.children].forEach((el,i)=>{el.classList.toggle('active',i===current);el.setAttribute('aria-current',i===current?'page':'false')});
}
function go(n){current=Math.max(0,Math.min(pages.length-1,n));render()}
prev.addEventListener('click',()=>go(current-1)); next.addEventListener('click',()=>go(current+1)); nextText.addEventListener('click',()=>go(current+1)); first.addEventListener('click',()=>go(0));
contentsBtn.addEventListener('click',()=>{panel.hidden=!panel.hidden;contentsBtn.setAttribute('aria-expanded',String(!panel.hidden))});
document.getElementById('closeContents').addEventListener('click',()=>{panel.hidden=true;contentsBtn.setAttribute('aria-expanded','false')});
pages.forEach((p,i)=>{const b=document.createElement('button');b.className='contents-item';b.type='button';b.innerHTML=`<span class="num">${String(i+1).padStart(2,'0')}</span><span>${p.title}</span>`;b.addEventListener('click',()=>{go(i);panel.hidden=true;contentsBtn.setAttribute('aria-expanded','false')});list.appendChild(b)});
document.addEventListener('keydown',e=>{if(e.key==='ArrowRight')go(current+1);if(e.key==='ArrowLeft')go(current-1);if(e.key==='Escape'){panel.hidden=true;contentsBtn.setAttribute('aria-expanded','false')}});
let startX=null; document.getElementById('bookFrame').addEventListener('touchstart',e=>{startX=e.changedTouches[0].clientX},{passive:true}); document.getElementById('bookFrame').addEventListener('touchend',e=>{if(startX===null)return;const dx=e.changedTouches[0].clientX-startX;if(Math.abs(dx)>45)go(current+(dx<0?1:-1));startX=null},{passive:true});
image.addEventListener('error',()=>{image.hidden=true;fallback.hidden=false});
render();
