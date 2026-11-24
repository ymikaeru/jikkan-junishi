// Seu 十干十二支: resultado claro, cartões simples, "saiba mais" clicável e o cálculo passo a passo
(()=>{
const K=window.KS||(window.KS={});K.hooks=K.hooks||[];
const S='甲乙丙丁戊己庚辛壬癸',B='子丑寅卯辰巳午未申酉戌亥';
const SR=['きのえ','きのと','ひのえ','ひのと','つちのえ','つちのと','かのえ','かのと','みずのえ','みずのと'];
const SRL=['kinoe','kinoto','hinoe','hinoto','tsuchinoe','tsuchinoto','kanoe','kanoto','mizunoe','mizunoto'];
const BRK=['ね','うし','とら','う','たつ','み','うま','ひつじ','さる','とり','いぬ','い'];
const BR=['ne','ushi','tora','u','tatsu','mi','uma','hitsuji','saru','tori','inu','i'];
const AN=['Rato','Boi','Tigre','Coelho','Dragão','Serpente','Cavalo','Cabra','Macaco','Galo','Cão','Javali'];
const BE=[4,2,0,0,2,1,1,2,3,3,2,4];
const HOUR=['23h–1h','1h–3h','3h–5h','5h–7h','7h–9h','9h–11h','11h–13h','13h–15h','15h–17h','17h–19h','19h–21h','21h–23h'];
const MST=['~7 dez','~6 jan','~4 fev','~6 mar','~5 abr','~6 mai','~6 jun','~7 jul','~8 ago','~8 set','~8 out','~7 nov'];
const DIR=['norte','norte-nordeste','leste-nordeste','leste','leste-sudeste','sul-sudeste','sul','sul-sudoeste','oeste-sudoeste','oeste','oeste-noroeste','norte-noroeste'];
const SEA=['meio do inverno','fim do inverno','começo da primavera','meio da primavera','fim da primavera','começo do verão','meio do verão','fim do verão','começo do outono','meio do outono','fim do outono','começo do inverno'];
const NAT=['esperto, trabalhador e poupador','paciente, firme e honesto','corajoso, generoso e orgulhoso','gentil, pacífico e querido','enérgico, ousado e ambicioso','refinado, educado e reservado','alegre, aberto e impulsivo','bondoso, cuidadoso e preocupado','ágil, prestativo e esperto','inteligente, hábil e falante','leal, persistente e sério','direto, rápido e decidido'];
const TQN='滋結演豊奮止合老緩堕煉実',TQR=['ji','ketsu','en','ho','fun','to','go','ro','kan','da','ren','u'];
const ELP=['Madeira','Fogo','Terra','Metal','Água'],ELK='木火土金水';
const EA=['a Madeira','o Fogo','a Terra','o Metal','a Água'],DA=['da madeira','do fogo','da terra','do metal','da água'];
const cap=t=>t[0].toUpperCase()+t.slice(1);
const cyc=e=>`${cap(EA[e])} alimenta ${EA[(e+1)%5]} e controla ${EA[(e+2)%5]}. Quem alimenta ${EA[e]}: ${EA[(e+4)%5]}. Quem controla ${EA[e]}: ${EA[(e+3)%5]}.`;
const EM=['crescimento, planos e iniciativa','entusiasmo, expressão e calor humano','estabilidade, confiança e cuidado','decisão, firmeza e organização','inteligência, adaptação e profundidade'];
// imagem na natureza e fase do crescimento das plantas (explicações tradicionais: 史記 律書, 漢書 律暦志, 説文解字)
const SIMG=['uma árvore grande, reta','a erva e a trepadeira, flexíveis','o sol','a chama da vela e do fogão','a montanha','a terra de cultivo','o metal bruto, o machado','a joia, o metal lapidado','o mar e os grandes rios','a chuva e o orvalho'];
const SGROW=['a semente rompe a casca (甲 = casca, armadura)','o broto sai curvado, ainda frágil (乙 = curvo)','a planta se abre ao sol e se mostra (丙 ≈ 炳, brilhar)','a planta fica forte e firme (丁 ≈ 壮, robusto)','a planta fica viçosa, frondosa (戊 ≈ 茂)','a planta ganha forma definida (己 ≈ 紀, ordem)','o fruto endurece; começa a mudança (庚 ≈ 更, mudar)','o fruto amadurece; tudo se renova (辛 ≈ 新, novo)','a vida se forma por dentro, como numa gestação (壬 ≈ 妊)','a semente espera para brotar de novo (癸 ≈ 揆, medir)'];
const BGROW=['a semente começa a se multiplicar sob a terra (子 ≈ 孳)','o broto ainda está preso, enrolado (丑 ≈ 紐, laço)','o broto se mexe e começa a sair (寅 ≈ 演, estender)','a planta rompe o solo e se cobre de folhas (卯 ≈ 茂)','tudo se agita e cresce com força (辰 ≈ 震, sacudir)','o crescimento chega ao auge (巳 ≈ 已, completo)','no auge do yang nasce o yin: a virada (午 ≈ 忤, contrariar)','os frutos ganham sabor (未 ≈ 味)','o corpo da planta está formado (申 ≈ 身, corpo)','a colheita: tudo amadurece (酉 ≈ 老, maduro)','a planta murcha e se recolhe (戌 ≈ 滅, apagar)','a vida se guarda dentro da semente (亥 ≈ 核, caroço)'];
const ED=[{s:'primavera',d:'leste',c:'verde-azulado (青)',t:'azedo',o:'fígado',v:'仁, a benevolência'},{s:'verão',d:'sul',c:'vermelho',t:'amargo',o:'coração',v:'礼, a cortesia'},{s:'o fim de cada estação (土用)',d:'centro',c:'amarelo',t:'doce',o:'baço e estômago',v:'信, a confiança'},{s:'outono',d:'oeste',c:'branco',t:'picante',o:'pulmões',v:'義, a retidão'},{s:'inverno',d:'norte',c:'preto',t:'salgado',o:'rins',v:'智, a sabedoria'}];
const CON={
 yy:['Yang e yin','<p>São as duas faces de tudo. <b>Yang</b> é o lado ativo, claro, que se expande: o dia, o sol, o verão. <b>Yin</b> é o lado receptivo, escuro, que recolhe: a noite, a lua, o inverno. Um não existe sem o outro, e um se transforma no outro.</p><p>Nos <b>troncos</b>, 甲 丙 戊 庚 壬 são yang, os “irmãos mais velhos” (兄, <i>e</i>), e 乙 丁 己 辛 癸 são yin, os “irmãos mais novos” (弟, <i>to</i>). Daí os nomes em japonês: 甲 = <i>ki-no-e</i>, “o irmão mais velho da madeira”; 乙 = <i>ki-no-to</i>, “o irmão mais novo da madeira”.</p><p>Nos <b>ramos</b>, 子 寅 辰 午 申 戌 são yang e 丑 卯 巳 未 酉 亥 são yin.</p>'],
 rs:['Por que o ano começa no “início da primavera” (立春, risshun)','<p>Este calendário segue o <b>sol</b>, não a lua nem o calendário civil. O ano começa no <b>início da primavera</b> (立春, <i>risshun</i>), quando o sol chega a 315° na sua trajetória aparente, por volta de <b>4 de fevereiro</b>.</p><p>Por isso quem nasce em janeiro ou nos primeiros dias de fevereiro pertence ao <b>ano anterior</b>: o seu animal é o do ano que estava terminando.</p>'],
 se:['O que é o início do mês (節入り, setsuiri)','<p>O ano solar se divide em 24 marcos (二十四節気, <i>nijūshi sekki</i>). Doze deles abrem os meses: o início da primavera (立春) abre o mês do Tigre, o despertar dos insetos (啓蟄) abre o do Coelho, a claridade pura (清明) abre o do Dragão, e assim por diante.</p><p>O momento em que um mês começa é o <b>節入り</b> (<i>setsuiri</i>). Ele cai entre os dias 4 e 8 de cada mês do calendário civil e muda um pouco de ano para ano, por isso o site calcula o instante exato.</p>'],
 c6:['O ciclo de 60 pares','<p>Os 10 troncos e os 12 ramos andam juntos, um passo de cada vez: 甲子 (<i>kinoe-ne</i>), 乙丑 (<i>kinoto-ushi</i>), 丙寅 (<i>hinoe-tora</i>)… Como 10 e 12 só voltam a coincidir depois de <b>60</b> passos, o ciclo tem 60 pares.</p><p>Tronco yang sempre cai com ramo yang, e yin com yin: por isso não existe, por exemplo, Madeira yang com Boi (甲丑).</p><p>O mesmo ciclo conta <b>anos, meses, dias e horas</b>. Aos 60 anos de idade a pessoa volta ao par do ano em que nasceu: é o <i>kanreki</i> (還暦).</p>'],
 rel:['Como os caracteres se relacionam','<p><b>Entre elementos.</b> No <b>相生</b> (“gerar”) um elemento alimenta o seguinte: Madeira → Fogo → Terra → Metal → Água → Madeira. É fluxo e apoio. No <b>相剋</b> (“controlar”) um elemento segura o que está duas casas adiante: Madeira → Terra → Água → Fogo → Metal → Madeira. É tensão, mas também limite e disciplina. Elementos iguais (<b>比和</b>) se reforçam.</p><p><b>Entre ramos.</b> Ramos <b>opostos</b> (冲, seis casas de distância, como Rato e Cavalo) se puxam em direções contrárias. Certos <b>pares</b> (六合, como Rato e Boi) se unem. Os <b>trios</b> (三合, como Macaco, Rato e Dragão) se juntam num só elemento.</p>'],
 el:['Os cinco elementos','<p>Madeira, Fogo, Terra, Metal e Água não são só materiais: são cinco <b>movimentos</b> da energia, que se sucedem como as estações. A Madeira é o crescimento da primavera, o Fogo o auge do verão, o Metal o recolhimento do outono, a Água o repouso do inverno, e a Terra a passagem entre uma estação e outra.</p><p>Cada tronco e cada ramo pertence a um elemento. Contar quantos de cada aparecem nos seus caracteres mostra o que predomina e o que falta.</p>']};
const ET=[{p:'tem ideais e vontade de crescer, e toma a iniciativa',x:'pode ficar teimoso e impaciente',c:'fazer planos, começar coisas novas, ter metas'},
 {p:'é caloroso e entusiasmado, e se expressa com facilidade',x:'pode ser impulsivo e se dispersar',c:'mostrar-se, expressar o que sente, buscar alegria'},
 {p:'é estável e confiável, e cuida dos outros',x:'pode ficar lento ou preocupado demais',c:'ter rotina e constância, cuidar da base'},
 {p:'é decidido, justo e organizado',x:'pode ficar rígido ou duro',c:'decidir, organizar, pôr limites claros'},
 {p:'é inteligente, adaptável e profundo',x:'pode ficar inconstante ou fechado',c:'estudar, refletir, ser flexível'}];
const mod=(a,n)=>((a%n)+n)%n;
const ART=i=>i===5||i===7?'a':'o',DE=i=>i===5||i===7?'da':'do'; // Serpente e Cabra são femininos
const genR=(a,b)=>a===b?'eq':mod(b-a,5)===1?'gen':mod(a-b,5)===1?'genby':mod(b-a,5)===2?'ctl':'ctlby';
const SG=[[8,0,4,4],[11,3,7,0],[2,6,10,1],[5,9,1,3]]; // 三合: 申子辰 Água, 亥卯未 Madeira, 寅午戌 Fogo, 巳酉丑 Metal
const more=(key,html,cls='')=>`<button type="button" class="chip mo ${cls}" data-more="${key}">${html} <span aria-hidden="true">›</span></button>`;
let ctx=null;const PL=['ano','mês','dia','hora'];
const where=(k,v)=>ctx?ctx.P.map((N,i)=>(k==='s'?N%10:k==='b'?N%12:null)===v?PL[i]:null).filter(Boolean):[];
function stemHTML(i){const e=i>>1,yn=i%2,w=where('s',i);
  return `<div class="kd-big e${e}">${S[i]}</div><h3><i>${SRL[i]}</i> · ${ELP[e]} ${yn?'yin':'yang'} <span class="note">tronco ${S[i]}</span></h3>
  <p><b>Elemento:</b> ${more('e:'+e,`<span class="e${e}">${ELP[e]} ${ELK[e]}</span>`)} · <b>${yn?'yin':'yang'}</b>, o “irmão ${yn?'mais novo (弟 to)':'mais velho (兄 e)'}” ${DA[e]}. ${more('c:yy','yang e yin')}</p>
  <p><b>Imagem na natureza:</b> ${SIMG[i]}.</p>
  <p><b>O que o caractere conta:</b> ${SGROW[i]}. Os dez troncos, em ordem, descrevem a vida de uma planta, da semente à nova semente.</p>
  <p><b>Irmão:</b> ${more('s:'+(i^1),`${S[i^1]} <i>${SRL[i^1]}</i>`)}, a outra metade do mesmo elemento.</p>
  <p><b>No ciclo dos elementos:</b> ${cyc(e)} ${more('c:rel','relações')}</p>
  ${w.length?`<p class="kd-you">No seu mapa: tronco do <b>${w.join(', ')}</b>.</p>`:''}`}
function branchHTML(i){const e=BE[i],w=where('b',i),g=SG.find(x=>x.slice(0,3).includes(i)),opp=(i+6)%12,par=mod(1-i,12);
  return `<div class="kd-big e${e}">${B[i]}</div><h3>${AN[i]} · <i>${BR[i]}</i> <span class="note">ramo ${B[i]}</span></h3>
  <p><b>Elemento:</b> ${more('e:'+e,`<span class="e${e}">${ELP[e]} ${ELK[e]}</span>`)} · <b>${i%2?'yin':'yang'}</b></p>
  <p><b>No tempo:</b> ${SEA[i]}; o mês começa ${MST[i]}; a hora vai das ${HOUR[i]}. <b>Direção:</b> ${DIR[i]}.</p>
  <p><b>O que o caractere conta:</b> ${BGROW[i]}. Os doze ramos acompanham o ano das plantas mês a mês.</p>
  <p><b>Natureza do animal:</b> ${NAT[i]}. Na arte do <i>tōkyū</i> este ramo se chama <b>${TQN[i]}</b> (<i>${TQR[i]}</i>).</p>
  <p><b>Relações:</b> oposto (冲) ${more('b:'+opp,`${B[opp]} ${AN[opp]}`)} · par (六合) ${more('b:'+par,`${B[par]} ${AN[par]}`)} · trio (三合) ${g.slice(0,3).map(x=>`${B[x]} ${AN[x]}`).join(', ')}, que forma ${ELP[g[3]]}. ${more('c:rel','relações')}</p>
  ${w.length?`<p class="kd-you">No seu mapa: ramo do <b>${w.join(', ')}</b>.</p>`:''}`}
function elemHTML(e){const d=ED[e],st=[2*e,2*e+1],br=BE.map((x,i)=>x===e?i:null).filter(x=>x!==null);
  const cnt=ctx?ctx.P.reduce((a,N)=>a+((N%10)>>1===e)+(BE[N%12]===e),0):0;
  return `<div class="kd-big e${e}">${ELK[e]}</div><h3>${ELP[e]} <span class="note">elemento ${ELK[e]}</span></h3>
  <p><b>O que representa:</b> ${EM[e]}.</p>
  <p><b>Estação:</b> ${d.s} · <b>Direção:</b> ${d.d} · <b>Cor:</b> ${d.c} · <b>Sabor:</b> ${d.t} · <b>Órgão:</b> ${d.o} · <b>Virtude:</b> ${d.v}.</p>
  <p><b>Troncos:</b> ${st.map(i=>more('s:'+i,`${S[i]} <i>${SRL[i]}</i>`)).join(' ')} · <b>Ramos:</b> ${br.map(i=>more('b:'+i,`${B[i]} ${AN[i]}`)).join(' ')}</p>
  <p><b>No ciclo:</b> ${cyc(e)} ${more('c:rel','relações')} ${more('c:el','os cinco elementos')}</p>
  ${ctx?`<p class="kd-you">No seu mapa: ${cnt?`aparece <b>${cnt}</b> ${cnt===1?'vez':'vezes'}`:'<b>não aparece</b>'}.</p>`:''}`}
// 木 e 火 são os elementos yang, 金 e 水 os yin, e a Terra fica no meio (陰陽五行)
const EYY=['yang','yang','meio','yin','yin'],ERD=['ki','hi','tsuchi','ka','mizu'];
function yangHTML(N,short){const s=N%10,b=N%12,e=s>>1,parts=[[ERD[e],`${ELP[e]} (${ELK[e]})`,EYY[e]],[s%2?'to':'e',s%2?'irmão mais novo (弟)':'irmão mais velho (兄)',s%2?'yin':'yang'],[BR[b],`${AN[b]} (${B[b]})`,b%2?'yin':'yang']];
  const ny=parts.filter(x=>x[2]==='yang').length,nn=parts.filter(x=>x[2]==='yin').length;
  const verdict=ny===3?'<b>três partes yang</b>':nn===3?'<b>três partes yin</b>':`${ny} yang e ${nn} yin${parts[0][2]==='meio'?' (a Terra fica no meio)':''}`;
  return `<span class="ypair"><b class="kk2">${S[s]}${B[b]}</b> <i>${parts.map(x=>x[0]).join('-no-').replace(/-no-(e|to)-no-/,'-no-$1-')}</i>: ${parts.map(x=>`<span class="yp ${x[2]}">${x[1]} · ${x[2]}</span>`).join(' + ')} → ${verdict}${N===42?'. É o par de yang mais acentuado: o Fogo é o elemento mais yang e o Cavalo é o ramo do auge do verão.':N===59?'. É o par de yin mais acentuado: a Água é o elemento mais yin e o Javali, o ramo do começo do inverno.':''}</span>`}
function openMore(key){const [k,v]=key.split(':'),dl=document.getElementById('kd');
  const fn=K.moreFns&&K.moreFns[k];
  document.getElementById('kd-body').innerHTML=fn?fn(v):k==='s'?stemHTML(+v):k==='b'?branchHTML(+v):k==='e'?elemHTML(+v):`<h3>${CON[v][0]}</h3>${CON[v][1]}`;
  if(!dl.open)dl.showModal();dl.scrollTop=0}
function ensureDialog(){if(document.getElementById('kd'))return;
  document.body.insertAdjacentHTML('beforeend','<dialog id="kd" class="kd" aria-label="Saiba mais"><form method="dialog"><button class="kd-x" aria-label="Fechar">×</button></form><div id="kd-body"></div></dialog>');
  const dl=document.getElementById('kd');dl.addEventListener('click',e=>{if(e.target===dl)dl.close()});
  document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-more]');if(b){e.preventDefault();openMore(b.dataset.more)}});
  // as tabelas do "Comece aqui" também abrem o saiba mais
  document.querySelectorAll('[data-s]').forEach(el=>{el.dataset.more='s:'+el.dataset.s;el.classList.add('clk')});document.querySelectorAll('[data-b]').forEach(el=>{el.dataset.more='b:'+el.dataset.b;el.classList.add('clk')})}
function run(c){
  ensureDialog();
  const {$,kan,yomi,pad,dmy}=K,[hourN,dayN,monN,ysi]=c.P;
  const P=[ysi,monN,dayN].concat(c.noH?[]:[hourN]);ctx={P};
  const yy=c.y+(mod(c.y-4,60)===ysi?0:-1);
  const fmt=jd=>{const X=new Date(K.jdToMs(jd)+c.tz*36e5);return `${pad(X.getUTCDate())}/${pad(X.getUTCMonth()+1)}/${X.getUTCFullYear()} ${pad(X.getUTCHours())}:${pad(X.getUTCMinutes())}`};
  const bj=K.msToJd(c.utc),tl=[];[c.y-1,c.y,c.y+1].forEach(Y=>K.TERMS.forEach(t=>tl.push({jd:K.termJd(Y,t[0]),nm:t[1]})));tl.sort((a,b)=>a.jd-b.jd);
  const ti=tl.findIndex((t,i)=>t.jd<=bj&&tl[i+1].jd>bj),t0=tl[ti],t1=tl[ti+1];
  const L=new Date(c.loc),ld=Date.UTC(L.getUTCFullYear(),L.getUTCMonth(),L.getUTCDate()),diff=Math.round((ld-Date.UTC(2000,0,1))/864e5);
  const ys=ysi%10,mb=monN%12,y0=[2,4,6,8,0][ys%5],ds=dayN%10,h0=[0,2,4,6,8][ds%5],hb=hourN%12;
  const mseq=Array.from({length:mod(mb-2,12)+1},(_,k)=>kan(K.idx(mod(y0+k,10),mod(2+k,12))));
  const hseq=Array.from({length:hb+1},(_,k)=>kan(K.idx(mod(h0+k,10),k)));
  const LASTD='庚辛壬癸甲乙丙丁戊己';
  const steps=[
   `<li>O ano tradicional começa no <b>立春</b> ${more('c:rs','por quê?')}, e o de ${c.y} foi em ${fmt(K.termJd(c.y,315))}. Você nasceu em ${pad(c.d)}/${pad(c.m)}/${c.y}, ${yy===c.y?'depois':'antes'} dele: conta o ano <b>${yy}</b>.</li>
    <li><b>Tronco</b> pelo último algarismo do ano (4 甲, 5 乙, 6 丙, 7 丁, 8 戊, 9 己, 0 庚, 1 辛, 2 壬, 3 癸): ${yy} termina em ${mod(yy,10)} → <b>${LASTD[mod(yy,10)]}</b>.</li>
    <li><b>Ramo</b>: ${yy} − 4 = ${yy-4}; dividido por 12 sobra ${mod(yy-4,12)}. Contando a partir de 子 = 0 (子 丑 寅 卯 辰 巳 午 未 申 酉 戌 亥) → <b>${B[mod(yy-4,12)]}</b>.</li>`,
   `<li>O mês começa no <b>節入り</b> ${more('c:se','o que é?')}, não no dia 1. O seu nascimento caiu entre o ${t0.nm} (${fmt(t0.jd)}) e o ${t1.nm} (${fmt(t1.jd)}): mês <b>${B[mb]}</b>.</li>
    <li><b>Tronco</b>: o mês 寅 (fevereiro) começa num tronco fixo, conforme o tronco do ano: 甲・己 → 丙寅; 乙・庚 → 戊寅; 丙・辛 → 庚寅; 丁・壬 → 壬寅; 戊・癸 → 甲寅 (regra 五虎遁). O seu ano é ${S[ys]}: ${mseq.join(' → ')}.</li>`,
   `<li>Os dias seguem o ciclo de 60 sem nunca parar ${more('c:c6','o ciclo de 60')}. Referência: 01/01/2000 foi <b>戊午</b>.</li>
    <li>${dmy(new Date(ld))} está ${Math.abs(diff)} dias ${diff>=0?'depois':'antes'} dessa data. Tirando os ciclos completos de 60 (${diff} = ${Math.floor(diff/60)} × 60 + ${mod(diff,60)}), ${mod(diff,60)===1?'sobra 1 passo':`sobram ${mod(diff,60)} passos`} para a frente a partir de 戊午 → <b>${kan(dayN)}</b>.</li>
    ${L.getUTCDate()!==c.d?`<li>Pela hora solar, o dia de nascimento passa a ser ${dmy(new Date(ld))}.</li>`:''}`,
   `<li>Hora usada: <b>${pad(L.getUTCHours())}:${pad(L.getUTCMinutes())}</b> (hora solar do local de nascimento). Cada ramo cobre duas horas: 子 23h–1h, 丑 1h–3h … → <b>${B[hb]}</b>.</li>
    <li><b>Tronco</b>: a hora 子 começa num tronco fixo, conforme o tronco do dia: 甲・己 → 甲子; 乙・庚 → 丙子; 丙・辛 → 戊子; 丁・壬 → 庚子; 戊・癸 → 壬子 (regra 五鼠遁). O seu dia é ${S[ds]}: ${hseq.join(' → ')}.</li>`];
  const name=N=>`${AN[N%12]} de ${ELP[(N%10)>>1]}`;
  const card=(i,N)=>{const s=N%10,b=N%12;return `<div class="ksc"><span class="note">${['Ano','Mês','Dia','Hora'][i]}</span>
    <div class="kj2"><span class="e${s>>1}">${S[s]}</span><span class="e${BE[b]}">${B[b]}</span></div>
    <div class="ksn">${name(N)} <span class="pill ${N%2?'yin':'yang'}">${N%2?'yin':'yang'}</span></div>
    <div class="note">${yomi(N)} · nº ${N+1} de 60</div>
    <div class="chips">${more('s:'+s,`<b>${S[s]}</b> <span class="e${s>>1}">${ELP[s>>1]}</span> ${s%2?'yin':'yang'}`)}${more('b:'+b,`<b>${B[b]}</b> ${AN[b]}`)}</div>
    <p class="note">Natureza do animal: ${NAT[b]}.</p>
    <details class="more"><summary>Ver o cálculo</summary><ol class="calc">${steps[i]}<li>Juntos: <b>${kan(N)}</b>.</li></ol></details></div>`};
  $('ks-cards').innerHTML=P.map((N,i)=>card(i,N)).join('')+(c.noH?'<div class="ksc off"><span class="note">Hora</span><p>Sem a hora de nascimento, este pilar fica de fora.</p></div>':'');
  // contagens
  const e=[0,0,0,0,0];let yang=0;P.forEach(N=>{e[(N%10)>>1]++;e[BE[N%12]]++;if(N%2===0)yang+=2});
  const tot=P.length*2,mx=Math.max(...e),miss=e.map((v,i)=>v?null:i).filter(v=>v!==null),top=e.map((v,i)=>v===mx?i:null).filter(v=>v!==null);
  const elc=i=>more('e:'+i,`<span class="e${i}">${ELP[i]}</span>`);
  // resumo
  let sum=document.getElementById('ks-sum');if(!sum){$('ks-cards').insertAdjacentHTML('beforebegin','<div class="card ks-sum" id="ks-sum"></div>');sum=document.getElementById('ks-sum')}
  sum.innerHTML=`<h3>Em resumo</h3><ul class="ks-list">${P.map((N,i)=>`<li><b>${['Ano','Mês','Dia','Hora'][i]}</b> <span class="kk2">${kan(N)}</span> — ${name(N)}, ${N%2?'yin':'yang'}</li>`).join('')}</ul>
   <p>Elemento que mais aparece: ${top.map(elc).join(' e ')}${miss.length?` · ausente: ${miss.map(elc).join(' e ')}`:' · todos os elementos aparecem'} · ${yang>tot-yang?'predomina o <b>yang</b>':yang<tot-yang?'predomina o <b>yin</b>':'yang e yin em <b>equilíbrio</b>'}.</p>
   <p class="note">Toque em qualquer botão com “›” para saber mais: ${more('c:yy','yang e yin')} ${more('c:el','os cinco elementos')} ${more('c:c6','o ciclo de 60')} ${more('c:rs','o 立春')}</p>`;
  // relações entre os seus pilares
  const RT={gen:'alimenta',genby:'é alimentado por',ctl:'controla',ctlby:'é controlado por',eq:'tem o mesmo elemento que'};
  const RS={gen:'相生 · apoio, fluxo',genby:'相生 · apoio, fluxo',ctl:'相剋 · tensão, disciplina',ctlby:'相剋 · tensão, disciplina',eq:'比和 · reforço'};
  const lab=['ano','mês','dia','hora'],de=['do ano','do mês','do dia','da hora'],art=['o ano','o mês','o dia','a hora'],rel=[];
  for(let i=0;i+1<P.length;i++){const a=P[i]%10,b=P[i+1]%10,r=genR(a>>1,b>>1);rel.push(`<li>Tronco ${de[i]} <b>${S[a]}</b> (${ELP[a>>1]}) ${RT[r]} o ${de[i+1]} <b>${S[b]}</b> (${ELP[b>>1]}) — <span class="note">${RS[r]}</span></li>`)}
  const bs=P.map(N=>N%12);
  for(let i=0;i<bs.length;i++)for(let j=i+1;j<bs.length;j++){const a=bs[i],b=bs[j];
    if(Math.abs(a-b)===6)rel.push(`<li>Ramos ${de[i]} e ${de[j]}, <b>${B[a]}</b> e <b>${B[b]}</b>, são <b>opostos</b> (冲) — <span class="note">forças que puxam para lados contrários; movimento, mudança</span></li>`);
    else if((a+b)%12===1)rel.push(`<li>Ramos ${de[i]} e ${de[j]}, <b>${B[a]}</b> e <b>${B[b]}</b>, formam um <b>par</b> (六合) — <span class="note">união, apoio mútuo</span></li>`);
    else if(a===b)rel.push(`<li>${cap(art[i])} e ${art[j]} têm o mesmo ramo, <b>${B[a]}</b> — <span class="note">a natureza do ${AN[a]} aparece em dobro</span></li>`)}
  SG.forEach(g=>{const h=g.slice(0,3).filter(x=>bs.includes(x));if(h.length===3)rel.push(`<li>Os ramos <b>${g.slice(0,3).map(x=>B[x]).join(' ')}</b> formam um <b>trio</b> completo (三合) — <span class="note">juntos reforçam a ${ELP[g[3]]}</span></li>`);else if(h.length===2&&h.includes(g[1]))rel.push(`<li>Os ramos <b>${h.map(x=>B[x]).join(' e ')}</b> são dois do trio ${g.slice(0,3).map(x=>B[x]).join('')} (半合) — <span class="note">tendem à ${ELP[g[3]]}</span></li>`)});
  $('ks-bal').innerHTML=`<div class="card"><h3>Os cinco elementos nos seus ${tot} caracteres ${more('c:el','?')}</h3><div class="bars">${e.map((v,i)=>`<div class="bar e${i}"><span>${elc(i)}</span><div class="tr"><i style="width:${v/Math.max(mx,1)*100}%"></i></div><span class="n">${v}</span></div>`).join('')}</div>
    <p><b>O que mais aparece</b> marca o seu jeito de ser: ${top.map(i=>`<b class="e${i}">${ELP[i]}</b> (${EM[i]})`).join(' e ')}.</p>
    ${miss.length?`<p><b>O que falta</b> costuma ser o que se precisa cultivar: ${miss.map(i=>`<b class="e${i}">${ELP[i]}</b> (${EM[i]})`).join(' e ')}.</p>`:'<p>Todos os elementos aparecem: um mapa bem distribuído.</p>'}</div>
   <div class="card"><h3>Yang e yin ${more('c:yy','?')}</h3><p><b>${yang}</b> caracteres yang e <b>${tot-yang}</b> yin: ${yang>tot-yang?'predomina o <b>yang</b>, o lado ativo, expansivo e de iniciativa':yang<tot-yang?'predomina o <b>yin</b>, o lado receptivo, reflexivo e de constância':'yang e yin em <b>equilíbrio</b>'}.</p>
    <p class="note">Num par do ciclo de 60, tronco e ramo têm sempre a mesma polaridade, então cada pilar é inteiro yang ou inteiro yin: ${P.map((N,i)=>`${lab[i]} ${N%2?'yin':'yang'}`).join(' · ')}.${P.includes(42)?' O par 丙午 junta Fogo yang (丙) e o Cavalo (午), ramo de Fogo e também yang: o par de yang mais acentuado do ciclo.':''}</p></div>
   <div class="card"><h3>Como os seus caracteres se relacionam ${more('c:rel','?')}</h3><ul class="ks-rel">${rel.join('')||'<li>Nenhuma relação especial entre os seus ramos.</li>'}</ul></div>`;
  // os seus animais: os ramos do nascimento e das três rodas da concepção
  const ka=document.getElementById('ks-anim');
  if(ka){const marks=[...P.map((N,i)=>[N%12,['ano','mês','dia','hora'][i]]),...(K.tqW||[]).map((b,k)=>[b,['roda grande','roda média','roda pequena'][k]])];
    const by=Array.from({length:12},(_,i)=>marks.filter(x=>x[0]===i).map(x=>x[1])),n=by.filter(x=>x.length).length;
    ka.innerHTML=`<p>Nos <b>${marks.length}</b> marcos do seu nascimento (ano, mês, dia${c.noH?'':' e hora'}, e as três rodas da concepção) aparecem <b>${n}</b> das doze naturezas. Todo ser humano carrega um pouco de todas; estas são as que marcam você.</p>
    <div class="anim">${by.map((t,i)=>`<button type="button" class="an${t.length?' on':''}" data-more="b:${i}"><b>${AN[i]}</b><span class="note">${B[i]} · ${TQN[i]}</span>${t.length?`<span class="mtag">${t.join(', ')}</span>`:''}</button>`).join('')}</div>
    ${by.some(x=>x.length>1)?`<p class="note">Aparecem mais de uma vez: ${by.map((t,i)=>t.length>1?`${AN[i]} (${t.join(', ')})`:'').filter(Boolean).join('; ')}.</p>`:''}
    <p class="note">Toque num animal para ver a natureza dele, o ramo e o nome no 淘宮術.</p>`}
  // quantos yang tem cada par (o exemplo clássico é o 丙午: hi yang, e yang, uma yang)
  if(!document.getElementById('ks-yang'))$('ks-bal').insertAdjacentHTML('afterend','<h3 class="h3">Experimente: quantos yang tem um par?</h3><div class="card" id="ks-yang"></div>');
  const ky=document.getElementById('ks-yang');
  if(!ky.dataset.ok){ky.dataset.ok='1';ky.innerHTML=`<p>O nome japonês de cada par já conta a sua história: <b>elemento</b> + <i>no</i> + <b>e</b> ou <b>to</b> + <b>animal</b>. Cada parte é yang ou yin. O exemplo clássico é o <b>丙午</b>, <i>hi-no-e-uma</i>: <i>hi</i> (Fogo) é yang, <i>e</i> (irmão mais velho) é yang e <i>uma</i> (Cavalo) é yang: três partes yang.</p>
   <div id="ks-yang-me"></div>
   <p><label>Experimente qualquer par: <select id="ks-yang-sel">${Array.from({length:60},(_,n)=>`<option value="${n}">${n+1}. ${S[n%10]}${B[n%12]} · ${SR[n%10]}${BRK[n%12]}</option>`).join('')}</select></label></p>
   <div id="ks-yang-out"></div>
   <details class="more"><summary>O 丙午 na história</summary><p>Desde o período Edo corria no Japão a superstição de que mulheres nascidas num ano 丙午 teriam um temperamento forte demais. Ela pesou tanto que, em 1966, o último ano 丙午, os nascimentos no Japão caíram cerca de 25%. O ano de 2026 é de novo um ano 丙午. Pelo cálculo, ele apenas junta três partes yang; o resto é costume.</p></details>`;
   document.getElementById('ks-yang-sel').addEventListener('change',e=>{document.getElementById('ks-yang-out').innerHTML=yangHTML(+e.target.value)});
   document.getElementById('ks-yang-sel').value='42';document.getElementById('ks-yang-out').innerHTML=yangHTML(42)}
  document.getElementById('ks-yang-me').innerHTML=`<p><b>Os seus pilares:</b></p>${P.map((N,i)=>`<div class="yrow"><span class="note">${['Ano','Mês','Dia','Hora'][i]}</span> ${yangHTML(N,true)}</div>`).join('')}`;
  // resumo da personalidade e próximos anos
  if(!document.getElementById('ks-pers'))$('ks-bal').insertAdjacentHTML('afterend','<h3 class="h3">Resumo da personalidade</h3><div class="card ks-pers" id="ks-pers"></div><h3 class="h3">Os próximos anos</h3><div class="card" id="ks-prev"></div>');
  const yS=ysi%10,yB=ysi%12,mB=monN%12,dB=dayN%12,dom=top[0];
  $('ks-pers').innerHTML=`<p><b>A base.</b> Você nasceu num ano ${DE(yB)} ${more('b:'+yB,`<b>${name(ysi)}</b>`)} (${kan(ysi)}). O animal do ano é o traço mais conhecido de cada pessoa: ${NAT[yB]}. O tronco do ano, ${more('s:'+yS,`<b>${S[yS]}</b>`)}, traz a imagem de ${SIMG[yS]}, ${yS%2?'vivida de forma suave e interior (yin)':'vivida de forma aberta e direta (yang)'}.</p>
   <p><b>Outras facetas.</b> O mês acrescenta ${ART(mB)} ${more('b:'+mB,AN[mB])} (${NAT[mB]}) e o dia, ${ART(dB)} ${more('b:'+dB,AN[dB])} (${NAT[dB]})${c.noH?'':`; a hora, ${ART(hb)} ${more('b:'+hb,AN[hb])} (${NAT[hb]})`}.</p>
   <p><b>Força principal.</b> O elemento que mais aparece é ${more('e:'+dom,`<b>${ELP[dom]}</b>`)}: você ${ET[dom].p}. Na medida certa é a sua força; em excesso, ${ET[dom].x}.</p>
   <p><b>O que equilibraria.</b> ${miss.length?miss.map(i=>`Falta ${more('e:'+i,`<b>${ELP[i]}</b>`)}: vale cultivar ${ET[i].c}`).join('. ')+'.':`Todos os elementos aparecem; o ponto de cuidado é não deixar ${ELP[dom].toLowerCase()} dominar demais.`}</p>
   <p><b>Ritmo.</b> ${yang>tot-yang?'Predomina o yang: tende a agir primeiro e refletir depois, com energia para começar.':yang<tot-yang?'Predomina o yin: tende a observar antes de agir, com constância para terminar o que começa.':'Yang e yin em equilíbrio: alterna bem ação e reflexão.'}</p>
   <p class="note">Leitura simbólica tradicional, para reflexão, não um retrato fechado. O 淘宮術, logo abaixo, lê o temperamento pela data da concepção, por isso os animais de lá podem ser outros.</p>`;
  const nq=(()=>{const n=new Date(Date.now()+c.tz*36e5);return K.pillarsAt(n.getUTCFullYear(),n.getUTCMonth()+1,n.getUTCDate(),12,0,c.tz,false)})();
  const rows=Array.from({length:12},(_,k)=>{const Y=nq.yr+k,N=mod(Y-4,60),b=N%12,es=(N%10)>>1,eb=BE[b],fl=[];
    if(b===yB)fl.push(['up','Ano do seu animal (年男・年女): fecha um ciclo de 12 anos e abre outro; bom para recomeços']);
    else if(Math.abs(b-yB)===6)fl.push(['dn','Ano oposto ao seu animal (冲): movimento e mudança; pede flexibilidade']);
    else if((b+yB)%12===1)fl.push(['up','Ano do par do seu animal (六合): encontros e apoio']);
    else if(SG.find(g=>g.slice(0,3).includes(b)).slice(0,3).includes(yB))fl.push(['up','Ano do trio do seu animal (三合): cooperação; as coisas fluem em grupo']);
    [...new Set([es,eb])].forEach(e=>{if(miss.includes(e))fl.push(['up',`Traz ${ELP[e]}, que falta no seu mapa: chance de equilíbrio`]);else if(top.includes(e))fl.push(['dn',`Reforça ${ELP[e]}, que já predomina: cuidado com o excesso`])});
    if(Y-yy===60)fl.push(['up','還暦: o ciclo de 60 anos se completa e você volta ao par do nascimento']);
    return `<tr${k===0?' class="cur"':''}><td class="mono">${Y}${k===0?'<br><span class="note">agora</span>':''}</td><td>${more('b:'+b,`<b>${kan(N)}</b> ${name(N)}`)}</td><td class="rel">${fl.length?fl.map(([t,x])=>`<span class="fx"><i class="${t}">${t==='up'?'▲':'▼'}</i> ${x}</span>`).join(''):'<span class="note">Ano neutro em relação ao seu mapa.</span>'}</td></tr>`}).join('');
  $('ks-prev').innerHTML=`<p class="note" style="margin-top:0">A tradição popular olha o ano que chega pelo seu animal e pelos seus elementos: o ano do próprio animal, o ano oposto, os anos “amigos” e os elementos que o ano traz. Cada ano vai de um 立春 ao seguinte.</p>
   <div class="scroll"><table class="pt"><thead><tr><th>Ano</th><th>干支</th><th>O que a tradição destaca para você</th></tr></thead><tbody>${rows}</tbody></table></div>
   <p class="note">É uma leitura simples, pelos ramos e elementos do ano. Uma análise mais detalhada, ano a ano e mês a mês, está no 四柱推命, recolhido no fim da página, como referência.</p>`;
  // marcar nas tabelas do "Comece aqui\"
  document.querySelectorAll('[data-s],[data-b]').forEach(el=>{el.classList.remove('mine');const t=el.querySelector('.mtag');if(t)t.remove()});
  P.forEach((N,i)=>{[['s',N%10],['b',N%12]].forEach(([k,v])=>{const el=document.querySelector(`[data-${k}="${v}"]`);if(!el)return;el.classList.add('mine');let t=el.querySelector('.mtag');if(!t){t=document.createElement('span');t.className='mtag';(el.tagName==='TR'?el.lastElementChild:el).appendChild(t)}t.textContent=(t.textContent?t.textContent+', ':'')+lab[i]})});
}
K.hooks.push(run);if(K.ctx)run(K.ctx);
})();
