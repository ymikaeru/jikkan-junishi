// 淘宮術 (天源淘宮術): as três rodas (三輪) da data da concepção e os 12 宮
(()=>{
const K=window.KS||(window.KS={});K.hooks=K.hooks||[];
// 子..亥 → 滋 結 演 豊 奮 止 合 老 緩 堕 煉 実. v = virtudes, c = vícios (癖), k = como 淘げる, f = fisionomia, o = sinais para a auto-observação do 畑
const TQ=[
 {n:'滋',y:'ジ',v:'diligente e econômico',c:'apego ao dinheiro; regateia; demora a devolver o que pegou emprestado',k:'agir pelo primeiro impulso (初念), sem calcular o retorno; cultivar boas relações',f:'testa larga e quadrada; veias aparentes na testa ou nas têmporas; pele clara, sem brilho',o:['Testa larga e quadrada','Veias aparentes na testa ou nas têmporas','Pele clara, sem brilho','Gosta de juntar dinheiro']},
 {n:'結',y:'ケツ',v:'honesto e meticuloso',c:'teimoso, inflexível, pouco sociável; resiste ao novo',k:'agir logo depois de decidir; cumprimentar em voz alta ao acordar; ser flexível',f:'o sinal está mais no jeito: apega-se a uma coisa só e não gosta de mudar',o:['Apega-se a uma coisa só e custa a largar','Não gosta de trocar objetos, hábitos ou lugares']},
 {n:'演',y:'エン',v:'ama a justiça; generoso com dinheiro',c:'orgulho e vaidade; ignora detalhes; pouco carinhoso em casa',k:'humildade, palavras e modos educados; planejar com atenção aos detalhes',f:'traços e postura de aspecto masculino, mesmo nas mulheres; corpo relativamente grande',o:['Traços e postura de aspecto masculino (também em mulheres)','Corpo relativamente grande']},
 {n:'豊',y:'ホ',v:'querido, pacífico, otimista; bom conciliador',c:'adia as coisas; não sabe recusar; inércia e descuido',k:'exercício e rotina; moderar comida e sono; começar cedo',f:'rosto de tom amarelado; estatura e corpo medianos; ar sereno e natural',o:['Rosto de tom amarelado','Estatura e corpo medianos','Gosta de comer bem e de se divertir','Adia decisões e custa a acordar cedo']},
 {n:'奮',y:'フン',v:'corajoso, aberto ao novo; generoso com quem depende dele',c:'raiva, brigas, palavras ásperas; quer vencer a qualquer custo',k:'controlar a raiva; humildade e compaixão; agir com calma',f:'rosto muitas vezes juvenil, firme por dentro; jeito de aspecto masculino',o:['Rosto de aparência juvenil, mas firme por dentro','Não aceita ser contrariado']},
 {n:'止',y:'ト',v:'educado, refinado, perseverante, quer se elevar; tido como o mais afortunado dos 12',c:'ciúme e inveja; desconfiança; pessimismo',k:'alegrar-se com o sucesso alheio; bom humor; conviver; confiar mais',f:'rosto suave, olhos finos; aparência bonita e cuidada (nas mulheres, beleza marcante)',o:['Rosto suave, olhos finos e alongados','Aparência bonita e cuidada','Sente ciúme com facilidade']},
 {n:'合',y:'ゴ',v:'faz amizade depressa; aberto',c:'relações curtas; gosta de novidade e de brilho; come e bebe muito; não guarda segredo; vaidade',k:'evitar vaidade, bebida e desperdício; planejar; guardar segredos',f:'rosto avermelhado; jeito largo e otimista',o:['Rosto avermelhado','Gasta tudo o que ganha','Generoso e otimista']},
 {n:'老',y:'ロ',v:'atencioso, gentil, educado, compassivo, cauteloso',c:'falta de coragem e decisão; remói o passado; preocupa-se demais com o futuro',k:'largar as preocupações inúteis; cuidar da energia (気); pensar com calma',f:'queixo pontudo; olhar sensível, chora com facilidade',o:['Queixo pontudo','Chora com facilidade; sentimentos profundos','Preocupa-se de antemão; muito cauteloso']},
 {n:'緩',y:'カン',v:'muito prestativo e sociável',c:'inquieto, pouco confiável; entende depressa e esquece depressa',k:'calma; perceber as nuances das pessoas; não ajudar sem necessidade; coerência entre palavra e ato',f:'maçãs do rosto altas e salientes; gesto rápido, quer participar de tudo',o:['Maçãs do rosto altas e salientes','Dá opinião e se mete em tudo']},
 {n:'堕',y:'ダ',v:'inteligente, habilidoso, fala bem',c:'astúcia; atalhos para ganhar depressa; indecisão',k:'usar a inteligência para ajudar; nada de artimanhas; avançar passo a passo',f:'corpo pequeno; jeito agradável, que atrai as pessoas',o:['Corpo pequeno','Agrada às pessoas e faz amizade fácil com gente nova']},
 {n:'煉',y:'レン',v:'paciente, persistente, leal',c:'raiva guardada; mau humor; remói por dentro',k:'abrir o peito; cumprimentar com alegria; lembrar do que é bom',f:'rosto pálido ou azulado; expressão de quem guarda as coisas para si',o:['Rosto pálido ou azulado','Irrita-se fácil e guarda a raiva dentro']},
 {n:'実',y:'ウ',v:'entende depressa e além do que foi dito; honesto, prático, decidido',c:'teimosia; impõe a opinião; franqueza que magoa; pavio curto',k:'pensar duas vezes (二念) antes de decidir; ouvir os outros',f:'jeito sério, sólido e calmo',o:['Jeito sério, sólido e calmo','Fala pouco e decide com firmeza']}];
const OFF=265; // 十月十日: nascimento − 265 dias
const mod=(a,n)=>((a%n)+n)%n;
// significado literal de cada nome; vários ecoam as explicações antigas do ramo (子≈孳, 寅≈演, 卯≈茂, 辰≈震, 巳≈已, 酉≈老, 亥≈核)
const TQR=['ji','ketsu','en','ho','fun','to','go','ro','kan','da','ren','u'];
const TQM=['nutrir, multiplicar','atar, amarrar','estender, desempenhar','abundância, fartura','animar-se, agitar-se','parar, conter','unir, juntar','maduro, envelhecido','frouxo, folgado','cair, decair','refinar, temperar no fogo','fruto, verdade'];
const WH=[{lab:'Roda grande',k:'大輪',what:'ano da concepção',ph:[40,60],w:'~60%',txt:'É a <b>base</b> do temperamento: o fundo que acompanha a vida inteira e que se liga ao que vem da família. Sai do ramo do <b>ano</b> da concepção. Na versão de 1896 (de Inoue, 井上), é a roda que mais aparece dos 40 aos 60 anos; um autor moderno lhe dá o maior peso.'},
 {lab:'Roda média',k:'中輪',what:'mês da concepção',ph:[20,40],w:'~25%',txt:'É o temperamento da <b>fase adulta</b>, quando se trabalha e se constrói a vida. Sai do ramo do <b>mês</b> solar da concepção. Na versão de 1896, governa dos 20 aos 40 anos; outros autores falam em “meia-idade”.'},
 {lab:'Roda pequena',k:'小輪',what:'dia da concepção',ph:[0,20],w:'~15%',txt:'É o temperamento da <b>infância e juventude</b>, até os 20 anos. Sai do ramo do <b>dia</b> da concepção, no ciclo de 60 dias. Depois dos 20 continua presente, em segundo plano.'}];
const QC={
 tougu:['O que é “joeirar” (淘げる, yonageru)','<p><b>淘げる</b> (<i>yonageru</i>) é lavar e peneirar, como se faz com o arroz ou com a areia do garimpo: a água leva o que não presta e fica o que vale. O nome da arte, <i>tōkyū</i> (淘宮術), vem daí.</p><p>A ideia do método é que cada temperamento traz <b>virtudes</b> (徳) e <b>vícios</b> (癖). Conhecendo o próprio temperamento (o seu 宮, <i>kyū</i>), a pessoa sabe quais vícios vigiar e pratica, no dia a dia, o comportamento que os corrige. Não é uma leitura de destino fixo: é um <b>treino de caráter</b>.</p>'],
 conc:['Por que a data da concepção','<p>A arte do <i>tōkyū</i> considera que o temperamento se forma quando a vida começa no ventre, e não no parto. Por isso conta a partir da <b>concepção</b>, estimada em <b>265 dias</b> antes do nascimento (os tradicionais “dez meses e dez dias”, 十月十日, na contagem antiga).</p><p>Existem outras versões: 10 meses antes, ou cerca de 9 meses com corte em 26 de outubro. O site usa 265 dias, que reproduz o caso de teste 23/12/1882 → 合・豊・老.</p><p>Quando a data da concepção cai perto do início da primavera (立春) ou do início de um mês (節入り), um dia a mais ou a menos pode mudar a roda; o site avisa nesses casos.</p>'],
 hata:['E o “campo” (畑, hatake)?','<p>Além das três rodas, que <b>nunca mudam</b>, a arte lê o <b>campo</b> (畑, <i>hatake</i>): a cor da pele (血色, <i>kesshoku</i>) em certas partes do rosto. O campo <b>muda</b> com o tempo e mostra o rumo da sorte no momento.</p><p>Como depende de observar o rosto, não pode ser calculado pela data, e por isso não está no site.</p>'],
 hist:['História da arte do tōkyū','<p>A arte do <b><i>tengen</i></b> (天源術) lia o destino pelos doze ramos, no Japão do período Edo. <b>Yokoyama Marusan</b> (横山丸三, 1780–1854), aluno de Okuno Nanboku (奥野南卜), transformou-a em 1834 num método de aprimoramento: a arte do <i>tōkyū</i> (淘宮術).</p><p>O ensino era dado em reuniões, com palestras e poemas, em quatro graus: inicial, médio, avançado e completo (初伝, 中伝, 奥伝, 皆伝). Em 1845 passou a se chamar <i>kaiun tōkyū-jutsu</i> (開運淘宮術, “a arte do tōkyū que abre a sorte”); foi proibido em grupo em 1848 e voltou na era Meiji.</p>'],
 nomes:['Os doze nomes','<p>Nesta arte os doze ramos trocam o nome de animal por um caractere que descreve um temperamento: Rato 滋 (<i>ji</i>), Boi 結 (<i>ketsu</i>), Tigre 演 (<i>en</i>), Coelho 豊 (<i>ho</i>), Dragão 奮 (<i>fun</i>), Serpente 止 (<i>to</i>), Cavalo 合 (<i>go</i>), Cabra 老 (<i>ro</i>), Macaco 緩 (<i>kan</i>), Galo 堕 (<i>da</i>), Cão 煉 (<i>ren</i>), Javali 実 (<i>u</i>).</p><p>Vários desses nomes ecoam as explicações antigas de cada ramo como fase da vida das plantas: 子 ≈ 孳 “multiplicar” (滋), 寅 ≈ 演 “estender”, 卯 ≈ 茂 “viçoso” (豊), 辰 ≈ 震 “agitar” (奮), 巳 ≈ 已 “completar, parar” (止), 酉 ≈ 老 “maduro”, 亥 ≈ 核 “semente, fruto” (実).</p><p>Os nomes de 酉 e 戌 aparecem também como 惰 e 練 em textos antigos.</p>']};
const mo=(key,html)=>`<button type="button" class="chip mo" data-more="${key}">${html} <span aria-hidden="true">›</span></button>`;
let last=null;
K.moreFns=K.moreFns||{};
K.moreFns.t=v=>{const i=+v,t=TQ[i],{B,AN}=K,mine=last?last.W.map((w,k)=>w.N%12===i?WH[k].lab.toLowerCase():null).filter(Boolean):[];
  return `<div class="kd-big">${t.n}</div><h3><i>${TQR[i]}</i> · ${TQM[i].split(',')[0]} <span class="note">nome ${t.n}, do ramo do ${AN[i]}</span></h3>
  <p><b>O caractere significa:</b> ${TQM[i]}. ${mo('q:nomes','os doze nomes')}</p>
  <p><b>Virtudes (徳):</b> ${t.v}.</p><p><b>Vícios (癖):</b> ${t.c}.</p><p><b>Como “joeirar” (淘げる):</b> ${t.k}. ${mo('q:tougu','o que é joeirar')}</p>
  <p><b>Fisionomia e sinais:</b> ${t.f}. ${mo('q:hata','o campo e a fisionomia')}</p>
  <p><b>O ramo:</b> ${mo('b:'+i,`${AN[i]} (${B[i]})`)}</p>
  ${mine.length?`<p class="kd-you">No seu resultado: ${mine.join(' e ')}.</p>`:''}`};
K.moreFns.w=v=>{const k=+v,w=WH[k],{B,AN}=K,N=last?last.W[k].N:null;
  return `<h3>${w.lab} · ${w.k}</h3><p>${w.txt}</p><p><b>Fase da vida:</b> ${w.ph[0]?`${w.ph[0]} a ${w.ph[1]} anos`:'até os 20 anos'} · <b>Peso</b> (um autor moderno): ${w.w}.</p>
  ${N!==null?`<p class="kd-you">A sua ${w.lab.toLowerCase()} é ${mo('t:'+N%12,`${TQ[N%12].n} (${B[N%12]}, ${AN[N%12]})`)}.</p>`:''}
  <p>${WH.map((x,j)=>j===k?'':mo('w:'+j,x.lab)).join(' ')} ${mo('q:conc','por que a concepção')}</p>`};
K.moreFns.q=v=>`<h3>${QC[v][0]}</h3>${QC[v][1]}`;
function run(c){
  const {y,m,d,tz}=c,{$,B,AN,kan,pad,dmy}=K;
  const at=off=>{const D=new Date(Date.UTC(y,m-1,d)-off*864e5);return {D,q:K.pillarsAt(D.getUTCFullYear(),D.getUTCMonth()+1,D.getUTCDate(),12,0,tz,false)}};
  const {D,q}=at(OFF),a=at(OFF-1).q,b=at(OFF+1).q;
  const age=(Date.now()-Date.UTC(y,m-1,d))/(365.2425*864e5);
  const W=WH.map((w,k)=>({...w,N:[q.ysi,q.monN,q.dayN][k],nb:[[a.ysi,b.ysi],[a.monN,b.monN],[]][k],idx:k}));
  last={W,age};K.tqW=W.map(w=>w.N%12);
  const names=W.map(w=>TQ[w.N%12].n);
  const rep=[...new Set(names)].filter(n=>names.filter(x=>x===n).length>1);
  $('tq-info').innerHTML=`<span class="tq-big">${W.map(w=>mo('t:'+w.N%12,`<b>${TQ[w.N%12].n}</b>`)).join('・')}</span> <span class="note">roda grande · média · pequena${rep.length?` · ${rep.map(n=>`${n} aparece em ${names.filter(x=>x===n).length} rodas`).join('; ')}`:''}</span>
   <p class="note">Toque para saber mais: ${mo('q:tougu','o que é 淘げる')} ${mo('q:conc','por que a concepção')} ${mo('q:nomes','os doze nomes')} ${mo('q:hata','e o 畑?')} ${mo('q:hist','história')}</p>`;
  $('tq-wheels').innerHTML=W.map(w=>{const br=w.N%12,t=TQ[br],edge=w.nb.some(x=>x%12!==br),now=age>=w.ph[0]&&age<w.ph[1];
    return `<div class="tqc${now?' now':''}"><div class="chips">${mo('w:'+w.idx,`${w.lab} · ${w.k}`)}</div>
    <div class="k">${t.n} <span class="note" style="font-size:15px">${t.y}</span></div>
    <div class="note">${B[br]} · ${AN[br]} · ${kan(w.N)} · ${w.ph[0]?`${w.ph[0]} a ${w.ph[1]} anos`:'até os 20 anos'}${now?' <b style="color:var(--red)">← a sua fase agora</b>':''}</div>
    <p><b>Virtudes</b>: ${t.v}.</p><p><b>Vícios (癖)</b>: ${t.c}.</p><p><b>Como 淘げる</b>: ${t.k}.</p>${t.f?`<p class="note">Fisionomia: ${t.f}.</p>`:''}
    <div class="chips">${mo('t:'+br,`tudo sobre ${t.n}`)}</div>
    ${edge?'<p class="note" style="color:var(--red)">Perto de uma divisa (立春 ou 節入り): um dia a mais ou a menos muda esta roda.</p>':''}</div>`}).join('');
  // passo a passo
  const cy=D.getUTCFullYear(),cj=K.msToJd(Date.UTC(cy,D.getUTCMonth(),D.getUTCDate(),12)-tz*36e5);
  const tl=[];[cy-1,cy,cy+1].forEach(Y=>K.TERMS.forEach(t=>tl.push({jd:K.termJd(Y,t[0]),nm:t[1]})));tl.sort((x,z)=>x.jd-z.jd);
  const ti=tl.findIndex((t,i)=>t.jd<=cj&&tl[i+1].jd>cj),t0=tl[ti],t1=tl[ti+1],dd=jd=>{const X=new Date(K.jdToMs(jd)+tz*36e5);return `${pad(X.getUTCDate())}/${pad(X.getUTCMonth()+1)}`};
  const yb=W[0].N%12,mb=W[1].N%12,db=W[2].N%12;
  $('tq-steps').innerHTML=`<li>Você nasceu em <b>${pad(d)}/${pad(m)}/${y}</b>. O 淘宮術 conta a partir da <b>concepção</b> ${mo('q:conc','por quê?')}: ${OFF} dias antes do nascimento (cerca de nove meses), o que dá <b>${dmy(D)}</b>.</li>
  <li><b>Ano</b> da concepção: ${q.yr}${q.yr!==cy?` (a data cai antes do 立春 de ${cy}, então conta o ano anterior)`:''}, que no ciclo de 60 é <b>${kan(W[0].N)}</b>. O caractere de baixo é <b>${B[yb]}</b>, o ${AN[yb]}, cujo 宮 é <b>${TQ[yb].n}</b>: a ${mo('w:0','roda grande')}.</li>
  <li><b>Mês</b>: ${pad(D.getUTCDate())}/${pad(D.getUTCMonth()+1)} cai no mês solar <b>${B[mb]}</b> (${AN[mb]}), que vai do ${t0.nm} (${dd(t0.jd)}) ao ${t1.nm} (${dd(t1.jd)}). 宮 <b>${TQ[mb].n}</b>: a ${mo('w:1','roda média')}.</li>
  <li><b>Dia</b>: ${dmy(D)} é o dia <b>${kan(W[2].N)}</b> no ciclo de 60 dias. Caractere de baixo <b>${B[db]}</b> (${AN[db]}), 宮 <b>${TQ[db].n}</b>: a ${mo('w:2','roda pequena')}.</li>
  <li>Resultado: <b>${names.join('・')}</b>.</li>`;
  // leitura personalizada: a roda da fase de vida atual em primeiro plano, a roda grande ao fundo
  const A=Math.floor(age),act=W.find(w=>age>=w.ph[0]&&age<w.ph[1]),big=TQ[W[0].N%12];
  const line=(w,t)=>`${mo('t:'+w.N%12,`<b>${t.n}</b> ${B[w.N%12]} ${AN[w.N%12]}`)} — ${t.v}`;
  $('tq-read').innerHTML=`<h3>Leitura do seu resultado</h3>
  ${act?`<p>Você tem <b>${A} anos</b>, fase da ${mo('w:'+act.idx,act.lab.toLowerCase())}. O temperamento mais visível agora: ${line(act,TQ[act.N%12])}.</p>
  <p><b>Ponto de atenção:</b> ${TQ[act.N%12].c}. <b>O que praticar:</b> ${TQ[act.N%12].k}.</p>`:`<p>Você tem <b>${A} anos</b>. Para depois dos 60, as fontes não dizem qual roda predomina; a roda grande segue como base.</p>`}
  ${act!==W[0]?`<p><b>Ao fundo</b>, a vida inteira, está a ${mo('w:0','roda grande')}: ${line(W[0],big)}. Vício a vigiar: ${big.c}.</p>`:`<p>A roda da sua fase é a própria roda grande, a base do temperamento: o que ela mostra agora pesa em dobro.</p>`}
  <p class="note">As outras rodas continuam presentes, em segundo plano: ${W.filter(w=>w!==act&&w!==W[0]).map(w=>`${w.k} ${TQ[w.N%12].n} (${TQ[w.N%12].v})`).join('; ')||'—'}.</p>`;
  // variante: a regra resumida (nascidos até setembro contam o ano anterior; mês e dia do nascimento)
  const aY=m<=9?y-1:y,alt=[mod(aY-4,12),c.monN%12,c.dayN%12],con=W.map(w=>w.N%12);
  const cmp=document.getElementById('tq-cmp');
  if(cmp)cmp.innerHTML=`<h3 class="h3">Experimente: duas maneiras de contar</h3>
   <p>Existe também uma contagem mais simples do 天源術: para o ano, quem nasce <b>até setembro</b> conta o ano anterior e quem nasce <b>de outubro em diante</b>, o mesmo ano; para as outras rodas, valem o <b>mês</b> e o <b>dia do nascimento</b>. O cálculo acima conta tudo pela <b>data da concepção</b> (265 dias). Compare:</p>
   <div class="scroll"><table class="pt"><thead><tr><th>Roda</th><th>Pela concepção (265 dias)</th><th>Pela regra resumida</th></tr></thead><tbody>
   ${['Roda grande · 大輪','Roda média · 中輪','Roda pequena · 小輪'].map((l,k)=>`<tr${con[k]===alt[k]?'':' class="cur"'}><td>${mo('w:'+k,l)}</td><td>${mo('t:'+con[k],`<b>${TQ[con[k]].n}</b> ${B[con[k]]} ${AN[con[k]]}`)}</td><td>${mo('t:'+alt[k],`<b>${TQ[alt[k]].n}</b> ${B[alt[k]]} ${AN[alt[k]]}`)}<br><span class="note">${['ano '+aY+(m<=9?' (nasceu até setembro: ano anterior)':' (nasceu de outubro em diante: mesmo ano)'),'mês do nascimento','dia do nascimento'][k]}</span></td></tr>`).join('')}
   </tbody></table></div>
   <p>${con.every((x,k)=>x===alt[k])?'As duas maneiras dão o mesmo resultado para você.':`Resultado: <b>${con.map(x=>TQ[x].n).join('・')}</b> pela concepção e <b>${alt.map(x=>TQ[x].n).join('・')}</b> pela regra resumida. As linhas destacadas mudam.`}</p>
   <p class="note">Para o exemplo de teste (23/12/1882), só a contagem pela concepção dá 合・豊・老; pela regra resumida daria 合・滋・緩. Compare as duas com o que você vê na pessoa, usando o guia de sinais logo abaixo.</p>`;
  const mine=new Set(W.map(w=>w.N%12));
  $('tq-table').tBodies[0].innerHTML=TQ.map((t,i)=>`<tr class="clk${mine.has(i)?' cur':''}" data-more="t:${i}"><td>${B[i]} ${AN[i]}</td><td class="kk2">${t.n} <span class="note">${t.y}</span></td><td>${TQM[i]}</td><td class="rel">${t.v}</td><td class="rel">${t.c}</td><td class="rel">${t.k}</td></tr>`).join('');
}
// ---- 畑: explicação e guia dos sinais de cada 宮 (nada é marcado nem guardado) ----
function hata(){
  const box=document.getElementById('tq-hata');if(!box)return;
  const wl=last?last.W.map((w,k)=>({k,b:w.N%12})):[],lab=k=>['roda grande','roda média','roda pequena'][k];
  const mine=i=>wl.filter(w=>w.b===i).map(w=>lab(w.k));
  box.innerHTML=`<p class="lead">As três rodas <b>nunca mudam</b>. O <b>畑</b> (“campo”) é o que aparece <b>além delas</b>, e se lê sobretudo na <b>fisionomia</b>: no rosto, no corpo e no jeito. Por isso o 畑 não sai da data e muda com o tempo.</p>
  <p>No método, as próprias rodas também se mostram na fisionomia. Para entender melhor a pessoa, compare os sinais das rodas dela, destacados abaixo, com o que você vê no rosto e no jeito. Se aparecerem sinais de outro 宮, é isso que o método chama de 畑.</p>
  <div class="scroll"><table class="pt"><thead><tr><th>宮</th><th>Fisionomia e sinais</th></tr></thead><tbody>${TQ.map((t,i)=>{const r=mine(i);return `<tr class="clk${r.length?' cur':''}" data-more="t:${i}"><td class="kk2">${t.n} <span class="note">${K.B[i]} ${K.AN[i]}</span>${r.length?`<br><span class="mtag">${r.join(', ')}</span>`:''}</td><td class="rel">${t.f}</td></tr>`}).join('')}</tbody></table></div>
  <p class="note">No 淘宮術, a leitura da fisionomia se aprende com estudo e longa experiência; aqui o guia serve para conhecer o método.</p>`;
}
// ---- 9. O proveito, na prática: reconhecer-se, compreender o outro, uma prática para hoje (nada é guardado) ----
const LB=['roda grande','roda média','roda pequena'];
function wheelsOf(y,m,d,tz){const D=new Date(Date.UTC(y,m-1,d)-OFF*864e5),q=K.pillarsAt(D.getUTCFullYear(),D.getUTCMonth()+1,D.getUTCDate(),12,0,tz,false);
  const age=(Date.now()-Date.UTC(y,m-1,d))/(365.2425*864e5);return {W:[q.ysi%12,q.monN%12,q.dayN%12],age,act:age<20?2:age<40?1:0}}
const grpOf=W=>{const g=[];W.forEach((b,k)=>{const x=g.find(z=>z.b===b);x?x.k.push(k):g.push({b,k:[k]})});return g};
const TRI=[[8,0,4],[11,3,7],[2,6,10],[5,9,1]];
function proveito(c){
  const me=document.getElementById('pv-me');if(!me||!last)return;
  const {B,AN}=K,W=last.W.map(w=>w.N%12),act=last.age<20?2:last.age<40?1:0;
  me.innerHTML=`<h3>1. Reconhecer-se</h3><p class="note">Leia com calma e pense num exemplo recente da sua vida. Não é preciso escrever nada.</p>
   ${grpOf(W).map(g=>{const t=TQ[g.b];return `<div class="pv-item${g.k.includes(act)?' now':''}"><p>${mo('t:'+g.b,`<b>${t.n}</b>`)} <span class="note">${g.k.map(k=>LB[k]).join(' e ')}${g.k.includes(act)?' · a mais visível agora':''}</span></p>
   <p><b>Em equilíbrio</b>, aparece como: ${t.v}.</p><p><b>Quando passa da medida</b>: ${t.c}.</p><p class="pv-q">Em que situação isso aparece em você?</p></div>`}).join('')}`;
  // 3. uma prática para hoje: muda a cada dia, sem guardar nada
  const t=TQ[W[act]],its=t.k.split(/;\s*/).filter(Boolean),day=Math.floor((Date.now()+c.tz*36e5)/864e5),pick=its[day%its.length];
  document.getElementById('pv-today').innerHTML=`<h3>3. Uma prática para hoje</h3><p class="pv-big">${pick.charAt(0).toUpperCase()+pick.slice(1)}.</p>
   <p class="note">Vem do “como 淘げる” da sua ${LB[act]}, ${mo('t:'+W[act],t.n)}. Amanhã a sugestão muda. ${mo('q:tougu','o que é 淘げる')}</p>`;
  other();
}
function other(){
  const out=document.getElementById('pv-out'),v=(document.getElementById('pv-o')||{}).value;if(!out||!last)return;
  if(!v){out.innerHTML='<p class="note">Coloque a data de nascimento de alguém da família, do trabalho ou de um amigo para ver como os temperamentos se encontram. O foco é entender a pessoa, não rotulá-la.</p>';return}
  const {B,AN}=K,[y,m,d]=v.split('-').map(Number),o=wheelsOf(y,m,d,K.ctx?K.ctx.tz:-3),M=last.W.map(w=>w.N%12),act=last.age<20?2:last.age<40?1:0;
  const same=[],opp=[],fam=[];
  M.forEach((a,i)=>o.W.forEach((b,j)=>{if(a===b)same.push([i,j,a]);else if(Math.abs(a-b)===6)opp.push([i,j,a,b]);else if(TRI.find(g=>g.includes(a)).includes(b))fam.push([i,j,a,b])}));
  const ot=TQ[o.W[o.act]],mt=TQ[M[act]];
  out.innerHTML=`<p class="pv-cmp"><span>Você: <b class="kk2">${M.map(b=>TQ[b].n).join('・')}</b></span><span>A outra pessoa: <b class="kk2">${o.W.map(b=>TQ[b].n).join('・')}</b></span></p>
   <p><b>Onde vocês se parecem.</b> ${same.length?[...new Set(same.map(x=>x[2]))].map(b=>`Os dois têm ${mo('t:'+b,TQ[b].n)} (${TQ[b].v}).`).join(' '):fam.length?'Nenhum 宮 em comum, mas alguns são da mesma “família” de ramos (三合), que tendem a se entender: '+[...new Set(fam.map(x=>TQ[x[2]].n+' e '+TQ[x[3]].n))].join('; ')+'.':'Nenhum 宮 em comum: cada um traz algo que o outro não tem.'}</p>
   <p><b>Onde podem se chocar.</b> ${opp.length?[...new Set(opp.map(x=>`o seu ${TQ[x[2]].n} (${LB[x[0]]}) e o ${TQ[x[3]].n} da outra pessoa (${LB[x[1]]})`))].join('; ').replace(/^o/,'O')+': são ramos opostos (冲), que puxam para lados contrários. Saber disso já ajuda a não levar para o lado pessoal.':'Nenhum par de ramos opostos (冲) entre as rodas de vocês.'}</p>
   <p><b>O que costuma estar por trás.</b> Hoje o temperamento mais visível dessa pessoa é ${mo('t:'+o.W[o.act],ot.n)}. Quando a pessoa parecer <i>${ot.c.split(';')[0]}</i>, lembre que, em equilíbrio, esse mesmo temperamento é <i>${ot.v}</i>.</p>
   <p><b>Para conviver melhor.</b> O que ajuda essa pessoa: ${ot.k.split(';')[0]}. Da sua parte (${mt.n}): ${mt.k.split(';')[0]}.</p>
   <p class="note">É uma leitura de tendências, para compreender e não para julgar. Confira sempre no jeito da própria pessoa.</p>`;
}
document.addEventListener('input',e=>{if(e.target.id==='pv-o')other()});
K.hooks.push(run);K.hooks.push(()=>hata());K.hooks.push(c=>proveito(c));if(K.ctx){run(K.ctx);hata();proveito(K.ctx)}
})();
