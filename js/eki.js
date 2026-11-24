// 易: os 8 trigramas (八卦) e os 64 hexagramas, com tiragem por moedas (擲銭法) ou pelo 略筮法
(()=>{
const $=id=>document.getElementById(id);
// trigramas na ordem 先天 (乾1 兌2 離3 震4 巽5 坎6 艮7 坤8); linhas de baixo para cima, 1 = yang
const TG=[
 {n:'乾',im:'天',l:[1,1,1],pt:'céu',q:'força (健)',fam:'pai',dir:'noroeste',ks:'六白',el:'金'},
 {n:'兌',im:'沢',l:[1,1,0],pt:'lago',q:'alegria (説)',fam:'filha caçula',dir:'oeste',ks:'七赤',el:'金'},
 {n:'離',im:'火',l:[1,0,1],pt:'fogo',q:'luz, aderir (麗)',fam:'filha do meio',dir:'sul',ks:'九紫',el:'火'},
 {n:'震',im:'雷',l:[1,0,0],pt:'trovão',q:'movimento (動)',fam:'filho mais velho',dir:'leste',ks:'三碧',el:'木'},
 {n:'巽',im:'風',l:[0,1,1],pt:'vento',q:'penetrar (入)',fam:'filha mais velha',dir:'sudeste',ks:'四緑',el:'木'},
 {n:'坎',im:'水',l:[0,1,0],pt:'água',q:'perigo, abismo (陥)',fam:'filho do meio',dir:'norte',ks:'一白',el:'水'},
 {n:'艮',im:'山',l:[0,0,1],pt:'montanha',q:'parar (止)',fam:'filho caçula',dir:'nordeste',ks:'八白',el:'土'},
 {n:'坤',im:'地',l:[0,0,0],pt:'terra',q:'receptividade (順)',fam:'mãe',dir:'sudoeste',ks:'二黒',el:'土'}];
const IMG={};TG.forEach((t,i)=>{IMG[t.im]=i;IMG[t.n]=i});
// 64 hexagramas na ordem do 周易 (King Wen); nome = trigrama de cima + de baixo
const HN='乾為天 坤為地 水雷屯 山水蒙 水天需 天水訟 地水師 水地比 風天小畜 天沢履 地天泰 天地否 天火同人 火天大有 地山謙 雷地豫 沢雷随 山風蠱 地沢臨 風地観 火雷噬嗑 山火賁 山地剥 地雷復 天雷无妄 山天大畜 山雷頤 沢風大過 坎為水 離為火 沢山咸 雷風恒 天山遯 雷天大壮 火地晋 地火明夷 風火家人 火沢睽 水山蹇 雷水解 山沢損 風雷益 沢天夬 天風姤 沢地萃 地風升 沢水困 水風井 沢火革 火風鼎 震為雷 艮為山 風山漸 雷沢帰妹 雷火豊 火山旅 巽為風 兌為沢 風水渙 水沢節 風沢中孚 雷山小過 水火既済 火水未済'.split(' ');
const HP=['O criativo','O receptivo','Dificuldade inicial','Inexperiência juvenil','Espera','Conflito','O exército','União','Pequena contenção','Conduta cuidadosa','Paz','Estagnação','Comunhão com os outros','Grande posse','Modéstia','Entusiasmo','Seguir','Corrigir o que se estragou','Aproximação','Contemplação','Morder através (decidir)','Graça, adorno','Desintegração','Retorno','Inocência','Grande acúmulo','Nutrição','Excesso do grande','O abismo repetido','O aderir, a luz','Atração','Duração','Retirada','Grande poder','Progresso','Luz escondida','A família','Oposição','Obstáculo','Libertação','Diminuição','Aumento','Resolução','Encontro','Reunião','Ascensão','Esgotamento','O poço','Revolução','O caldeirão','O trovão, despertar','A montanha, quietude','Avanço gradual','A jovem que se casa','Abundância','O viajante','O vento, penetração suave','O lago, alegria','Dispersão','Limitação','Verdade interior','Pequeno excesso','Depois da conclusão','Antes da conclusão'];
const HEX=HN.map((nm,i)=>{const u=nm[1]==='為'?IMG[nm[2]]:IMG[nm[0]],d=nm[1]==='為'?IMG[nm[2]]:IMG[nm[1]];return {i,nm,u,d,lines:[...TG[d].l,...TG[u].l]}});
const byLines=ls=>HEX.find(h=>h.lines.join('')===ls.join(''));
const rnd=n=>{const a=new Uint32Array(1);crypto.getRandomValues(a);return a[0]%n};
function draw(ls,mv){return `<div class="hx">${ls.map((v,k)=>`<div class="hl ${v?'yang':'yin'}">${v?'<i></i>':'<i></i><i></i>'}<span>${mv&&mv[k]?(v?'○':'×'):''}</span></div>`).reverse().join('')}</div>`}
function card(h,title,mv){return `<div class="hxc"><span class="note">${title}</span>${draw(h.lines,mv)}<div class="kk2">${h.i+1}. ${h.nm}</div><div class="note">${HP[h.i]}</div><div class="note">${TG[h.u].n}${TG[h.u].im} sobre ${TG[h.d].n}${TG[h.d].im}</div></div>`}
// ---- tabuleiro de 算木: posições (爻位), 中, 正 (当位) e 応 ----
const POSN=['初爻','二爻','三爻','四爻','五爻','上爻'];
const POSD=['o começo, a base','o centro de baixo: quem executa','a passagem do trigrama de baixo para o de cima; momento delicado','a entrada no trigrama de cima: quem está perto de quem decide','o centro de cima: a posição principal, de quem decide','o fim: o ponto mais alto, que pode ser excesso ou retirada'];
function board(ls,mv,h,title){
  const tri=(i)=>`${TG[i].n} ${TG[i].im}`,row=k=>{const v=ls[k],pos=k+1,mid=pos===2||pos===5,ok=(pos%2===1)===!!v,ying=ls[(k+3)%6]!==v;
    return `<div class="sg-row${k===2?' sg-split':''}"><span class="sg-pos">${POSN[k]}<br><span class="note">${pos}ª</span></span><div class="sg ${v?'yang':'yin'}${mv&&mv[k]?' mv':''}" title="${v?'yang':'yin'}"></div>
    <span class="sg-tags"><b>${v?'陽':'陰'}</b>${mv&&mv[k]?` <span class="tg mvt">móvel ${v?'○':'×'}</span>`:''}${mid?' <span class="tg">中</span>':''}${ok?' <span class="tg">正</span>':''}${ying?' <span class="tg">応</span>':''}</span></div>`};
  return `<div class="sangi-board"><div class="note sg-title">${title}: <b>${h.i+1}. ${h.nm}</b> — ${HP[h.i]}</div>
   <div class="sangi"><div class="sg-tri up">${tri(h.u)}<br><span class="note">de cima</span></div>${[5,4,3].map(row).join('')}<div class="sg-tri dn">${tri(h.d)}<br><span class="note">de baixo</span></div>${[2,1,0].map(row).join('')}</div></div>`;
}
function boardHTML(lines,mv,h,ch){
  const n=mv.filter(Boolean).length,one=n===1?mv.indexOf(true):-1;
  return `<div class="sangi-wrap"><h4>Na mesa, com os 算木</h4>
  <div class="sangi-two">${board(lines,mv,h,'本卦, o hexagrama obtido')}${ch?board(lines.map((v,k)=>mv[k]?1-v:v),null,ch,'之卦, depois das mudanças'):''}</div>
  <details class="more" open><summary>Como ler os 算木</summary>
  <ol class="calc">
   <li><b>Os blocos.</b> Cada 算木 é um bastão de madeira de seção quadrada: duas faces são lisas (linha <b>yang</b>, 陽) e duas têm um sulco no meio (linha <b>yin</b>, 陰). Depois da tiragem, o praticante vira cada bloco na face certa e os arruma <b>de baixo para cima</b>, da 1ª linha (初爻) à 6ª (上爻).</li>
   <li><b>Os dois trigramas.</b> As linhas 1 a 3 formam o trigrama <b>de baixo</b> (${TG[h.d].n}, ${TG[h.d].pt}): o lado de dentro, a base, o começo. As linhas 4 a 6 formam o <b>de cima</b> (${TG[h.u].n}, ${TG[h.u].pt}): o lado de fora, o ambiente, o desfecho.</li>
   <li><b>As posições.</b> ${POSN.map((x,k)=>`${x}: ${POSD[k]}`).join('; ')}.</li>
   <li><b>中 (centro).</b> A 2ª e a 5ª linhas são o meio de cada trigrama: indicam equilíbrio. A 5ª é a posição principal do hexagrama.</li>
   <li><b>正 (posição certa, 当位).</b> As posições ímpares (1, 3, 5) são de yang e as pares (2, 4, 6) de yin. Uma linha na posição que combina com ela está “no lugar certo”.</li>
   <li><b>応 (correspondência).</b> A 1ª linha responde à 4ª, a 2ª à 5ª e a 3ª à 6ª. Quando uma é yang e a outra yin, elas se correspondem e se apoiam.</li>
   <li><b>As linhas móveis.</b> ${n?`Nesta tiragem, ${n===1?'a':'as'} ${mv.map((v,k)=>v?POSN[k]:'').filter(Boolean).join(', ')} ${n===1?'é móvel':'são móveis'}: na mesa, marca-se o bloco, que depois vira para a outra face (○ yang vira yin, × yin vira yang). Os blocos assim virados formam o <b>之卦</b>, mostrado ao lado: para onde a situação tende.`:'Nesta tiragem não há linhas móveis: os blocos ficam como estão e lê-se só o 本卦.'}</li>
   <li><b>O que ler primeiro</b> (costume comum): ${n===0?'sem linhas móveis, lê-se o hexagrama como um todo.':one>=0?`com uma só linha móvel, ela é o ponto central da leitura: a <b>${POSN[one]}</b> (${POSD[one]}).`:'com várias linhas móveis, leem-se juntos o 本卦 (a situação) e o 之卦 (a tendência).'}</li>
  </ol></details></div>`;
}
function show(lines,mv,how,steps){
  const h=byLines(lines),ch=mv.some(Boolean)?byLines(lines.map((v,k)=>mv[k]?1-v:v)):null;
  const go=byLines([lines[1],lines[2],lines[3],lines[2],lines[3],lines[4]]),sa=byLines(lines.map(v=>1-v)),so=byLines([...lines].reverse());
  const tri=(i)=>`${TG[i].n} ${TG[i].im} (${TG[i].pt})`;
  const st=(steps||'')+`<li>As linhas 1 a 3 (de baixo) formam o <b>trigrama de baixo</b>: ${tri(h.d)}. As linhas 4 a 6 formam o <b>de cima</b>: ${tri(h.u)}.</li><li>O nome do hexagrama junta a imagem de cima com a de baixo: <b>${h.nm}</b>, nº ${h.i+1} — “${HP[h.i]}”.</li>`+(ch?`<li>As linhas móveis viram o oposto (yang ↔ yin) e formam o <b>之卦</b>: <b>${ch.nm}</b>, nº ${ch.i+1} — “${HP[ch.i]}”. Ele mostra para onde a situação tende.</li>`:'<li>Não há linhas móveis: a situação é lida só pelo 本卦.</li>');
  $('ek-out').innerHTML=`<p class="note">${how}</p><ol class="calc">${st}</ol><div class="hxs">${card(h,'本卦 · hexagrama obtido',mv)}${ch?card(ch,'之卦 · para onde as linhas móveis levam'):''}</div>
  ${mv.some(Boolean)?`<p class="note">Linhas móveis (変爻): ${mv.map((v,k)=>v?`${k+1}ª`:'').filter(Boolean).join(', ')} (contadas de baixo para cima; ○ yang que vira yin, × yin que vira yang).</p>`:'<p class="note">Sem linhas móveis: lê-se só o 本卦.</p>'}
  ${boardHTML(lines,mv,h,ch)}
  <details class="gl"><summary>Hexagramas derivados (互卦・錯卦・綜卦)</summary><div class="hxs">${card(go,'互卦 · linhas 2–4 e 3–5: o que está por dentro')}${card(sa,'錯卦 · todas as linhas invertidas')}${card(so,'綜卦 · o hexagrama de cabeça para baixo')}</div></details>`;
}
function coins(){const ls=[],mv=[],rows=[];const NM={6:'6 → yin móvel (– – que vira yang)',7:'7 → yang (——)',8:'8 → yin (– –)',9:'9 → yang móvel (—— que vira yin)'};
  for(let k=0;k<6;k++){const f=[0,0,0].map(()=>rnd(2)?3:2),s=f.reduce((a,b)=>a+b,0);ls.push(s%2);mv.push(s===6||s===9);rows.push(`${k+1}ª linha: ${f.map(x=>x===3?'cara (3)':'coroa (2)').join(' + ')} = ${NM[s]}`)}
  show(ls,mv,'Três moedas jogadas seis vezes, uma vez por linha, de baixo para cima (cara vale 3, coroa vale 2).',`<li>Cada jogada soma 6, 7, 8 ou 9: ímpar é linha <b>yang</b>, par é linha <b>yin</b>; 6 e 9 são <b>linhas móveis</b>.<ul class="rows">${rows.map(r=>`<li>${r}</li>`).join('')}</ul></li>`)}
// 本筮法: 50 varetas, uma fica de lado; três divisões por linha, contando de quatro em quatro
function yarrow(){const ls=[],mv=[],rows=[];
  for(let k=0;k<6;k++){let n=49;const ch=[];
    for(let r=0;r<3;r++){const L=1+rnd(n-1),R=n-L,rl=L%4||4,rr=(R-1)%4||4,rem=1+rl+rr;ch.push(`${n} → ${L} e ${R}; 1 na mão, restos ${rl} e ${rr}; saem ${rem}`);n-=rem}
    const v=n/4;ls.push(v%2);mv.push(v===6||v===9);rows.push(`<li>${k+1}ª linha: ${ch.join(' · ')} · sobram <b>${n}</b> = ${v} × 4 → <b>${v}</b> (${v===6?'yin móvel':v===7?'yang':v===8?'yin':'yang móvel'})</li>`)}
  show(ls,mv,'本筮法: o método completo das varetas (筮竹), o mais antigo.',`<li>Pegam-se <b>50 varetas</b>; uma fica de lado e não se usa (representa o princípio de tudo, o 太極). Com as <b>49</b> restantes, para cada linha faz-se três vezes: dividir o maço em dois ao acaso, segurar 1 vareta da mão direita entre os dedos e contar cada metade de quatro em quatro, guardando os restos. O que sobra no fim, dividido por 4, dá 6, 7, 8 ou 9.<ul class="rows">${rows.join('')}</ul></li>`)}
function ryaku(){const u=rnd(8),d=rnd(8),m=rnd(6),ls=[...TG[d].l,...TG[u].l],mv=[0,1,2,3,4,5].map(k=>k===m);
  show(ls,mv,'略筮法: em vez de seis jogadas, tiram-se só três números, como na contagem das varetas.',`<li>Primeiro número (1 a 8): <b>${d+1}</b> → trigrama de baixo pela ordem 乾1 兌2 離3 震4 巽5 坎6 艮7 坤8.</li><li>Segundo número (1 a 8): <b>${u+1}</b> → trigrama de cima.</li><li>Terceiro número (1 a 6): <b>${m+1}</b> → a ${m+1}ª linha, contando de baixo, é a linha móvel.</li>`)}
function init(){
  $('ek-tri').tBodies[0].innerHTML=TG.map((t,i)=>`<tr><td class="mono">${i+1}</td><td>${draw(t.l)}</td><td class="kk2">${t.n} ${t.im}</td><td>${t.pt}</td><td>${t.q}</td><td>${t.fam}</td><td>${t.dir}</td><td>${t.ks}</td><td>${t.el}</td></tr>`).join('');
  $('ek-sel').innerHTML='<option value="">Escolha um hexagrama…</option>'+HEX.map(h=>`<option value="${h.i}">${h.i+1}. ${h.nm} — ${HP[h.i]}</option>`).join('');
  $('ek-c3').addEventListener('click',coins);if($('ek-cy'))$('ek-cy').addEventListener('click',yarrow);$('ek-cr').addEventListener('click',ryaku);
  $('ek-sel').addEventListener('change',e=>{if(e.target.value!=='')show(HEX[+e.target.value].lines,[0,0,0,0,0,0],'Hexagrama escolhido na lista.')});
}
if(document.readyState!=='loading')init();else document.addEventListener('DOMContentLoaded',init);
})();

// ---- as oito forças (八力): fichas de "saiba mais" ----
(()=>{
const K=window.KS||(window.KS={});K.moreFns=K.moreFns||{};
const FR=[
 {k:'動',pt:'movimento',r:'dō',d:'a força que põe em marcha, que faz agir, crescer e circular',deus:'Ōtonoji',dk:'大戸地',kj:'意富斗能地',par:1,tri:['乾','天','céu']},
 {k:'静',pt:'quietude',r:'sei',d:'a força que acalma, assenta e conserva; o repouso que dá estabilidade',deus:'Ōtonobe',dk:'大戸辺',kj:'大斗乃辨',par:0,tri:['兌','沢','lago']},
 {k:'解',pt:'dissolução',r:'kai',d:'a força que solta, desfaz e torna fluido o que estava preso',deus:'Uijine',dk:'宇比地根',kj:'宇比地邇',par:3,tri:['離','火','fogo']},
 {k:'凝',pt:'solidificação',r:'gyō',d:'a força que condensa, firma e dá forma ao que era fluido',deus:'Suijine',dk:'須比地根',kj:'須比智邇',par:2,tri:['震','雷','trovão']},
 {k:'引',pt:'atração',r:'in',d:'a força que puxa, aproxima e reúne',deus:'Ikugui',dk:'生杙',kj:'活杙',par:5,tri:['巽','風','vento']},
 {k:'弛',pt:'afrouxamento',r:'shi',d:'a força que solta a tensão, distende e abre espaço',deus:'Tsunugui',dk:'角杙',kj:'角杙',par:4,tri:['坎','水','água']},
 {k:'合',pt:'união',r:'gō',d:'a força que junta, integra e faz de muitos um só',deus:'Omotaru',dk:'面足',kj:'於母陀流',par:7,tri:['艮','山','montanha']},
 {k:'分',pt:'divisão',r:'bun',d:'a força que separa, distingue e diferencia, dando a cada coisa o seu lugar',deus:'Kashikone',dk:'惶根',kj:'阿夜訶志古泥',par:6,tri:['坤','地','terra']}];
const mo=(k,h)=>`<button type="button" class="chip mo" data-more="${k}">${h} <span aria-hidden="true">›</span></button>`;
K.moreFns.f=v=>{
  if(v==='x')return `<h3>As oito forças <span class="note">八力, <i>hachiriki</i></span></h3>
   <p>No xintoísmo, as oito forças são vistas como as forças que formam <b>todas as coisas do céu e da terra</b>, a fonte de toda atividade: ${FR.map((f,i)=>mo('f:'+i,f.pt)).join(' ')}</p>
   <p><b>Vêm em quatro pares de opostos</b>: movimento e quietude, dissolução e solidificação, atração e afrouxamento, união e divisão. Nenhuma age sozinha: as coisas nascem e se mantêm do equilíbrio entre as duas forças de cada par, de modo parecido com yang e yin.</p>
   <p><b>As divindades.</b> Cada força está ligada a uma divindade da criação. No 古事記 (<i>Kojiki</i>, o livro mais antigo da mitologia japonesa), essas oito divindades aparecem em casais, entre as “sete gerações dos deuses” (神世七代, <i>kamiyo nanayo</i>), logo antes de Izanagi e Izanami, que formam a terra.</p>
   <p><b>E os trigramas.</b> O I Ching também tem oito trigramas, organizados em pares de opostos (céu e terra, fogo e água, trovão e vento, montanha e lago). Por isso os dois conjuntos de oito costumam ser comparados.</p>`;
  const i=+v,f=FR[i],p=FR[f.par];
  return `<div class="kd-big">${f.k}</div><h3>${f.pt.charAt(0).toUpperCase()+f.pt.slice(1)} <span class="note">${f.k}, <i>${f.r}</i></span></h3>
   <p><b>O que é:</b> ${f.d}.</p>
   <p><b>O par oposto:</b> ${mo('f:'+f.par,`${p.pt} (${p.k})`)}. As duas forças se completam: uma sem a outra desequilibra.</p>
   <p><b>A divindade:</b> <i>${f.deus}</i> (${f.dk}; no 古事記, ${f.kj}), que forma casal com <i>${p.deus}</i>.</p>
   <p><b>Lado a lado com:</b> o trigrama ${f.tri[0]} ${f.tri[1]} (${f.tri[2]}), na ordem em que os dois conjuntos costumam ser listados.</p>
   <p>${mo('f:x','as oito forças')}</p>`;
};
})();
