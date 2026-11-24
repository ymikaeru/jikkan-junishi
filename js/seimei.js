// 姓名判断 por 画数: cinco quadros (五格), 三才 e arranjo 陰陽 (par/ímpar)
(()=>{
const $=id=>document.getElementById(id);
const EL5=['木','火','土','金','水'],ELP=['Madeira','Fogo','Terra','Metal','Água'];
const el=n=>Math.floor((mod(n-1,10))/2); // 1,2 木 · 3,4 火 · 5,6 土 · 7,8 金 · 9,0 水
function mod(a,n){return((a%n)+n)%n}
const chars=s=>[...s.replace(/\s+/g,'')];
const memo={},edited={};
// traços automáticos pela tabela do Unihan (js/strokes.js): 熊崎式 (k) ou contagem japonesa atual (n)
const auto=ch=>{const T=window.STROKES;if(!T)return 0;const i=ch.codePointAt(0)-T.lo;if(i<0||i>=T.n.length)return 0;return ((($('sm-mode')||{}).value==='n'?T.n:T.k).charCodeAt(i)-48)||0};
function boxes(){
  const sei=chars($('sm-sei').value),mei=chars($('sm-mei').value);
  const mk=(arr,part)=>arr.map((ch,i)=>{const key=part+i+ch,a=auto(ch);if(!edited[key])memo[key]=a||memo[key]||'';return `<label class="sm-ch"><span class="kk2">${ch}</span><input type="number" min="1" max="70" inputmode="numeric" data-k="${key}" value="${memo[key]||''}" aria-label="Traços de ${ch}"${a&&!edited[key]?' class="auto"':''}></label>`}).join('');
  $('sm-boxes').innerHTML=(sei.length||mei.length)?`<div class="sm-row"><span class="note">姓</span>${mk(sei,'s')}<span class="note" style="margin-left:12px">名</span>${mk(mei,'m')}</div>`:'';
  calc();
}
function calc(){
  document.querySelectorAll('#sm-boxes input').forEach(i=>memo[i.dataset.k]=i.value);
  const sei=chars($('sm-sei').value),mei=chars($('sm-mei').value);
  const get=(arr,part)=>arr.map((ch,i)=>+memo[part+i+ch]||0);
  const s=get(sei,'s'),g=get(mei,'m');
  if(!s.length||!g.length||s.includes(0)||g.includes(0)){$('sm-out').innerHTML=sei.length&&mei.length?'<p class="note">Preencha o número de traços dos caracteres que ficaram em branco (kana e kanji raros não estão na tabela).</p>':'';return}
  const rei=$('sm-rei').checked,sum=a=>a.reduce((x,y)=>x+y,0);
  const ten=sum(s)+(rei&&s.length===1?1:0),chi=sum(g)+(rei&&g.length===1?1:0),jin=s[s.length-1]+g[0],sou=sum(s)+sum(g),gai=ten+chi-jin;
  const G=[['天格','sobrenome inteiro: herança da família',ten],['人格','último do sobrenome + primeiro do nome: o centro da pessoa',jin],['地格','nome inteiro: juventude e base',chi],['外格','o que sobra: relações com o mundo',gai],['総格','todos os traços: a vida como um todo',sou]];
  const yy=[...s,...g].map(n=>n%2?'○':'●'),odd=yy.filter(x=>x==='○').length;
  const bal=odd===0?'só 陰 (todos pares): desequilibrado':odd===yy.length?'só 陽 (todos ímpares): desequilibrado':'陰 e 陽 misturados: equilibrado';
  const p=+$('sm-p').value,nm=(arr,v)=>arr.map((ch,i)=>`${ch} (${v[i]})`).join(' + ');
  const steps=`<li><b>Traços</b> de cada caractere: ${nm(sei,s)} | ${nm(mei,g)}.</li>
  <li><b>天格</b> (sobrenome) = ${nm(sei,s)}${rei&&s.length===1?' + 1 (霊数, sobrenome de um caractere)':''} = <b>${ten}</b>.</li>
  <li><b>人格</b> (último do sobrenome + primeiro do nome) = ${sei[sei.length-1]} (${s[s.length-1]}) + ${mei[0]} (${g[0]}) = <b>${jin}</b>.</li>
  <li><b>地格</b> (nome) = ${nm(mei,g)}${rei&&g.length===1?' + 1 (霊数, nome de um caractere)':''} = <b>${chi}</b>.</li>
  <li><b>総格</b> (tudo, sem 霊数) = ${sum(s)} + ${sum(g)} = <b>${sou}</b>.</li>
  <li><b>外格</b> = 天格 + 地格 − 人格 = ${ten} + ${chi} − ${jin} = <b>${gai}</b>.</li>
  <li>Cada número ímpar é <b>陽</b> (○) e cada par é <b>陰</b> (●); o elemento sai do último algarismo (1–2 Madeira, 3–4 Fogo, 5–6 Terra, 7–8 Metal, 9–0 Água).</li>`;
  $('sm-out').innerHTML=`<h3 class="h3">Passo a passo</h3><ol class="calc">${steps}</ol><h3 class="h3">Resultado</h3><div class="scroll"><table class="pt"><thead><tr><th>Quadro</th><th>O que representa</th><th>Traços</th><th>Paridade</th><th>五行</th></tr></thead><tbody>${G.map(([k,d,n])=>`<tr><td class="kk2">${k}</td><td class="rel">${d}</td><td class="mono">${n}</td><td>${n%2?'ímpar ○ 陽':'par ● 陰'}</td><td>${EL5[el(n)]} ${ELP[el(n)]}</td></tr>`).join('')}</tbody></table></div>
  <p><b>Arranjo 陰陽</b> (um sinal por caractere): <span class="kk2" style="letter-spacing:4px">${yy.join('')}</span> — ${bal}. <span class="note">Pares e ímpares misturados indicam um nome equilibrado; só pares ou só ímpares, um nome pendendo para um lado.</span></p>
  <p class="note">Como ler: o <b>人格</b> é o centro (a própria pessoa), o <b>総格</b> fala da vida inteira, o <b>天格</b> vem da família e não se escolhe, o <b>地格</b> marca a juventude e o <b>外格</b> as relações. No 三才, “相生” (um elemento alimenta o outro) e “比和” (iguais) são considerados harmoniosos; “相剋” (um controla o outro), tenso.</p>
  <p><b>三才</b> (天格・人格・地格): ${[ten,jin,chi].map(n=>EL5[el(n)]).join('・')}${(()=>{const a=el(ten),b=el(jin),c=el(chi),r=(x,y)=>x===y?'比和':mod(y-x,5)===1?'相生':mod(x-y,5)===1?'相生':'相剋';return ` — 天→人 ${r(a,b)}, 人→地 ${r(b,c)}`})()}.</p>
  ${p?`<p><b>Com a outra pessoa</b> (総格 ${p}): ${sou%2!==p%2?'um par e um ímpar: 陰 e 陽 se completam':'os dois '+(sou%2?'ímpares':'pares')+': mesmo polo, sem complemento'}.</p>`:''}`;
}
document.addEventListener('input',e=>{const t=e.target,id=t.id;if(id==='sm-sei'||id==='sm-mei')boxes();else if(t.closest&&t.closest('#sm-boxes')){edited[t.dataset.k]=true;t.classList.remove('auto');calc()}else if(id==='sm-p')calc()});
document.addEventListener('click',e=>{if(e.target.id==='sm-ex'){$('sm-sei').value='山田';$('sm-mei').value='花子';boxes()}});
document.addEventListener('change',e=>{if(e.target.id==='sm-rei')calc();else if(e.target.id==='sm-mode')boxes()});
if(document.readyState!=='loading')boxes();else document.addEventListener('DOMContentLoaded',boxes);
})();
