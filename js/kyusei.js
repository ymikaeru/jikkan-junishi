// 九星気学: estrela natal do ano (本命星) e do mês (月命星), 傾斜, mapas do ano e do mês, direções, 八将神, 金神, 恵方 e afinidade
(()=>{
const K=window.KS||(window.KS={});K.hooks=K.hooks||[];
const SN=['一白水星','二黒土星','三碧木星','四緑木星','五黄土星','六白金星','七赤金星','八白土星','九紫火星'];
const SE=[4,2,0,0,2,3,3,2,1]; // elemento de cada estrela (木0 火1 土2 金3 水4)
const SD=['adaptável e paciente; flui como a água, reservado por dentro','dedicado e trabalhador; apoia os outros, espírito maternal','ativo e otimista; cheio de ideias, às vezes impulsivo','gentil e sociável; harmoniza, mas hesita','forte e central; perfil de líder, pode ser teimoso','responsável e orgulhoso; perfil de chefe, perfeccionista','alegre e eloquente; aprecia os prazeres, tende a gastar','firme e cauteloso; persistente, sabe acumular','brilhante e intuitivo; senso estético, temperamental'];
const SRO=['ippaku suisei','jikoku dosei','sanpeki mokusei','shiroku mokusei','gōō dosei','roppaku kinsei','shichiseki kinsei','happaku dosei','kyūshi kasei'];
const NUMK='一二三四五六七八九',SCOL=['branco','preto','azul-esverdeado','verde','amarelo','branco','vermelho','branco','roxo'];
const STRI=[['坎','água','norte'],['坤','terra','sudoeste'],['震','trovão','leste'],['巽','vento','sudeste'],null,['乾','céu','noroeste'],['兌','lago','oeste'],['艮','montanha','nordeste'],['離','fogo','sul']];
const SKW=['a água e o inverno, o começo de tudo; vida íntima, relações profundas','a terra e a mãe; trabalho dedicado, servir e acolher','o trovão e a primavera; novidade, impulso, som e palavras','o vento; comunicação, viagens, confiança e negócios','o centro; poder, transformação, morte e renascimento','o céu e o pai; liderança, autoridade, ação firme','o lago e o outono; alegria, prazer, conversa, dinheiro','a montanha; mudança, herança, juntar e guardar','o fogo e o verão; luz, beleza, inteligência, ser visto'];
const mo=(k,h)=>`<button type="button" class="chip mo" data-more="${k}">${h} <span aria-hidden="true">›</span></button>`;
let LAST={};
const MKR=['gōō-satsu','anken-satsu','honmei-satsu','honmei-tekisatsu','saiha · geppa','kippō','saidai kippō'];
const MK=[['五黄殺','A direção onde está o <b>五黄土星</b>, a estrela do centro, a mais forte: rege a transformação, inclusive a decomposição. Nas nove estrelas, o que se começa nessa direção tende a se estragar “por dentro”, com problemas causados por nós mesmos. Vale para todas as pessoas.'],
 ['暗剣殺','A direção <b>oposta à estrela 5</b> (五黄); o nome 暗剣 quer dizer “espada escondida”. Nas nove estrelas, traz problemas que vêm de fora e de repente, sem culpa própria. Vale para todas as pessoas. Quando a estrela 5 está no centro, não há 五黄殺 nem 暗剣殺.'],
 ['本命殺','A direção onde está a <b>sua própria estrela do ano</b> (本命星) naquele período. O 気学 a associa a problemas de saúde e de energia pessoal. Só vale para quem tem esse 本命星.'],
 ['本命的殺','A direção <b>oposta à sua estrela do ano</b> (的 = “alvo”). O 気学 a associa a erros de julgamento, a mirar no lugar errado. Só vale para quem tem esse 本命星.'],
 ['歳破・月破','O lado <b>oposto ao ramo do ano</b> (歳破) ou do mês (月破); 破 = “quebrar”. O que se faz nessa direção tende a se romper. Vale para todos. No 暦 ocupa só 15°, mas no mapa de oito direções marca a casa inteira.'],
 ['吉方','Direção onde está uma estrela cujo elemento <b>combina com o da sua estrela do ano</b>: ela gera a sua, é gerada por ela ou é do mesmo elemento. Só conta se a casa não tiver nenhuma marca desfavorável. A estrela 5 (五黄) nunca é direção favorável.'],
 ['最大吉方','O 吉方 que, além da estrela do ano, <b>combina também com a sua estrela do mês</b> (月命星). É a direção que as nove estrelas consideram mais favorável para você.']];
const DV=['Deusa da sorte do ano (歳徳神, também 年神). A direção onde ela está é o <b>恵方</b>, a direção auspiciosa do ano: é para lá que, no 節分, se come o 恵方巻 em silêncio. Muda conforme o tronco do ano, num ciclo de cinco.',
 'Associado a Júpiter (木星), que leva cerca de 12 anos para dar a volta no céu, um ramo por ano. A direção é a do próprio ramo do ano. A tradição considera bom construir e começar negócios nessa direção, mas evita disputas e cortar árvores.',
 'Divindade guerreira associada a Vênus (金星). Fica <b>três anos</b> na mesma direção (o “três anos bloqueado”, 三年塞がり): oeste nos anos 亥子丑, norte nos 寅卯辰, leste nos 巳午未 e sul nos 申酉戌. Tradicionalmente se evitam obras, mudanças e mexer na terra nessa direção.',
 'Associada a Saturno (土星) e tida como esposa do 太歳; fica dois ramos atrás do ano. A tradição evita casamentos e partos nessa direção.',
 'Associado a Mercúrio (水星); segue a regra dos 刑 entre os ramos. Evita-se mexer na terra: plantar, cavar, abrir poços.',
 'Associado a Saturno (土星); fica no ramo oposto ao do ano (破 = “romper”). Evitam-se mudanças, construções e viagens nessa direção. É o mesmo 歳破 que aparece no mapa do ano.',
 'Associado a Marte (火星). Evitam-se casamentos, mudanças e trazer animais nessa direção.',
 'Associado a 羅睺 (Rahu, um dos nodos da Lua); fica no “túmulo” (墓) do trio do ano. Evitam-se obras; a tradição dizia ser favorável a assuntos militares.',
 'Associado a 計都 (Ketu, o outro nodo da Lua); sempre oposto ao 黄幡. Evita-se trazer animais domésticos e fazer obras.',
 'Divindade muito temida no 陰陽道, ligada ao metal (金) e, por isso, às lâminas. A posição muda com o tronco do ano e ocupa vários ramos ao mesmo tempo. Evitavam-se obras, mudanças e viagens nessas direções.',
 'Variante do 金神 que segue o ramo do ano; fica sempre oposta ao 姫金神.',
 'A “princesa” do 金神: fica três ramos à frente do ano, sempre oposta ao 大金神.'];
const DVR=['toshitokujin (ehō)','taisai','daishōgun','taion','saikyō','saiha','saisetsu','ōban','hyōbi','konjin','daikonjin','himekonjin'];
const DVN=['歳徳神 (恵方)','太歳','大将軍','大陰','歳刑','歳破','歳殺','黄幡','豹尾','金神','大金神','姫金神'];
function KX(v){
  let m;
  if((m=/^st(\d)$/.exec(v))){const n=+m[1],e=SE[n-1],t=STRI[n-1],yrs=[];for(let Y=1920;Y<=2040;Y++)if(yStar(Y)===n)yrs.push(Y);
    const fr=[1,2,3,4,5,6,7,8,9].filter(x=>x!==n&&good(SE[n-1],SE[x-1]));
    return `<div class="kd-big e${e}">${NUMK[n-1]}</div><h3>Estrela ${n}, ${SCOL[n-1]}, de ${EN[e]} <span class="note">${SN[n-1]}, <i>${SRO[n-1]}</i></span></h3>
    <p><b>O nome:</b> ${SN[n-1]} (<i>${SRO[n-1]}</i>) = “estrela ${n}, ${SCOL[n-1]}, de ${EN[e]}”. Cada uma das nove estrelas junta um número, uma cor e um elemento.</p>
    <p><b>Símbolos:</b> ${SKW[n-1]}.</p>
    <p><b>Temperamento</b> (como estrela de nascimento): ${SD[n-1]}.</p>
    <p><b>Casa de origem (定位):</b> ${n===5?'o centro do quadrado, que não tem trigrama':`${t[2]}, o lugar do trigrama ${t[0]} (${t[1]}) do I Ching`}.</p>
    <p><b>Combina com</b> (gera, é gerada ou é do mesmo elemento): ${fr.map(x=>mo('k:st'+x,SN[x-1])).join(' ')} ${mo('k:afin','as relações')}</p>
    <p><b>Anos com esta estrela no centro</b> (contados do início da primavera): ${yrs.join(', ')}.</p>
    ${LAST.hon===n||LAST.getsu===n?`<p class="kd-you">É a sua ${[LAST.hon===n?'estrela do ano (本命星)':'',LAST.getsu===n?'estrela do mês (月命星)':''].filter(Boolean).join(' e a sua ')}.</p>`:''}`}
  if((m=/^m(\d)$/.exec(v)))return `<h3><i>${MKR[+m[1]]}</i> <span class="note">${MK[+m[1]][0]}</span></h3><p>${MK[+m[1]][1]}</p><p>${MK.map((x,i)=>i===+m[1]?'':mo('k:m'+i,x[0])).join(' ')} ${mo('k:dir','o que são as direções')}</p>`;
  if((m=/^d(\d+)$/.exec(v)))return `<h3><i>${DVR[+m[1]]}</i> <span class="note">${DVN[+m[1]]}</span></h3><p>${DV[+m[1]]}</p><p class="note">太歳, 大将軍, 大陰, 歳刑, 歳破, 歳殺, 黄幡 e 豹尾 são os 八将神, os “oito generais” do 陰陽道, cada um ligado a um astro. Fonte: Biblioteca Nacional da Dieta, 日本の暦.</p>`;
  if(v==='honmei')return `<h3>O que é a estrela do ano <span class="note">本命星, <i>honmeisei</i></span></h3><p>A estrela do ano (本命星, “estrela do destino principal”) é a estrela que ocupava o <b>centro</b> do quadrado no ano em que você nasceu, contado a partir do início da primavera (立春). É a base das nove estrelas: dela saem o temperamento principal e a referência para as direções.</p><p>Como as estrelas descem uma casa por ano, a mesma estrela do ano volta a cada <b>9 anos</b>. A conta: some os algarismos do ano até sobrar um só e faça 11 menos esse número; se passar de 9, tire 9.</p>${LAST.hon?`<p class="kd-you">O seu: ${mo('k:st'+LAST.hon,SN[LAST.hon-1])}</p>`:''}`;
  if(v==='getsu')return `<h3>O que é a estrela do mês <span class="note">月命星, <i>getsumeisei</i></span></h3><p>A estrela do mês (月命星) é a estrela que ocupava o centro no <b>mês solar</b> do seu nascimento, que começa no início do mês (節入り). Mostra o lado mais íntimo do temperamento e, para muitos autores, o jeito de ser na infância e na juventude.</p><p>No mês 寅 (fevereiro), o ciclo começa em 八白, 二黒 ou 五黄, conforme o grupo da estrela do ano, e desce uma estrela por mês.</p>${LAST.getsu?`<p class="kd-you">O seu: ${mo('k:st'+LAST.getsu,SN[LAST.getsu-1])}</p>`:''}`;
  if(v==='keisha')return `<h3>O que é a inclinação <span class="note">傾斜, <i>keisha</i></span></h3><p>A inclinação (傾斜) mostra para que lado o temperamento <b>pende</b>, por baixo do que aparece. Põe-se a estrela do mês no centro do quadrado e vê-se em que casa caiu a estrela do ano. Cada casa “pertence” a uma estrela, o seu 定位 (norte = 一白, sudoeste = 二黒, leste = 三碧, sudeste = 四緑, noroeste = 六白, oeste = 七赤, nordeste = 八白, sul = 九紫), e é essa estrela que dá nome ao 傾斜.</p><p>Quando as duas estrelas são iguais (同会, <i>dōkai</i>), a estrela do ano cai no centro, e cada escola usa uma regra própria; por isso o site não calcula esse caso.</p>`;
  return null;
}
// ordem do voo (飛泊) a partir do centro, e o 定位 de cada palácio
const POS=['中','乾','兌','艮','離','坎','坤','震','巽'];
const HOME={乾:6,兌:7,艮:8,離:9,坎:1,坤:2,震:3,巽:4,中:5};
const DIRP={中:'centro',乾:'noroeste',兌:'oeste',艮:'nordeste',離:'sul',坎:'norte',坤:'sudoeste',震:'leste',巽:'sudeste'};
const OPP={乾:'巽',巽:'乾',兌:'震',震:'兌',艮:'坤',坤:'艮',離:'坎',坎:'離',中:'中'};
const BPAL=['坎','艮','艮','震','巽','巽','離','坤','坤','兌','乾','乾'];
const BDIR=['norte','norte-nordeste','leste-nordeste','leste','leste-sudeste','sul-sudeste','sul','sul-sudoeste','oeste-sudoeste','oeste','oeste-noroeste','norte-noroeste'];
const LAY=[['巽','離','坤'],['震','中','兌'],['艮','坎','乾']]; // sul em cima, como nos 暦 japoneses
const mod=(a,n)=>((a%n)+n)%n;
const yStar=Y=>{const n=mod(11-mod(Y,9),9);return n===0?9:n};
const mStar=(ys,br)=>{const st=[1,4,7].includes(ys)?8:[2,5,8].includes(ys)?2:5;return mod(st-1-mod(br-2,12),9)+1};
const chart=c=>{const o={};POS.forEach((p,k)=>o[p]=mod(c-1+k,9)+1);return o};
const where=(ch,s)=>POS.find(p=>ch[p]===s);
const good=(e1,e2)=>e1===e2||mod(e1-e2,5)===1||mod(e2-e1,5)===1;
const EN=['Madeira','Fogo','Terra','Metal','Água'],EA=['a Madeira','o Fogo','a Terra','o Metal','a Água'];
const cap=t=>t[0].toUpperCase()+t.slice(1);
// imagens tradicionais: GEN[e] = como e gera o seguinte; CTL[e] = como e segura o que está duas casas adiante
const GEN=['a lenha alimenta o fogo','o fogo vira cinza, que vira terra','o metal nasce dentro da terra','o metal frio junta gotas de água','a água rega a árvore'];
const CTL=['as raízes seguram a terra','o fogo derrete o metal','a terra represa a água, como um dique','o machado corta a árvore','a água apaga o fogo']; // por elemento: 木 火 土 金 水
function relCard(me,ot,oy){
  const a=SE[me-1],b=SE[ot-1],head=`<p><b>Você:</b> ${SN[me-1]} (${EN[a]}) · <b>Outra pessoa:</b> ${SN[ot-1]} (${EN[b]}), ano ${oy} pelo 立春.</p>`;
  let t,tag;
  if(a===b){tag='比和 · mesmo elemento';t=`<p>As duas estrelas são de <b>${EN[a]}</b>. É como ${a===4?'duas águas que se juntam':a===1?'duas chamas que se juntam':a===0?'duas árvores lado a lado':a===2?'duas terras que se somam':'dois metais da mesma liga'}: vocês tendem a se entender com facilidade, com ritmo e valores parecidos.</p><p><b>O cuidado:</b> por serem iguais, podem reforçar os mesmos defeitos e faltar quem traga o que nenhum dos dois tem.</p>`}
  else if(mod(a-b,5)===1){tag='相生 · a outra pessoa apoia você';t=`<p>${cap(EA[b])} da outra pessoa <b>gera</b> ${EA[a]} que é a sua: ${GEN[b]}. Na tradição, quem gera faz o papel de “mãe”: essa pessoa tende a <b>apoiar, nutrir e incentivar</b> você, e você recebe.</p><p><b>O cuidado:</b> não ficar só recebendo; retribuir mantém a relação viva.</p>`}
  else if(mod(b-a,5)===1){tag='相生 · você apoia a outra pessoa';t=`<p>${cap(EA[a])}, que é a sua, <b>gera</b> ${EA[b]} da outra pessoa: ${GEN[a]}. Na tradição, quem gera faz o papel de “mãe”: você tende a <b>apoiar e incentivar</b> essa pessoa, e ela cresce com você.</p><p><b>O cuidado:</b> não se desgastar dando sempre; apoiar também é deixar o outro andar sozinho.</p>`}
  else if(mod(b-a,5)===2){tag='相剋 · você segura a outra pessoa';t=`<p>${cap(EA[a])}, que é a sua, <b>controla</b> ${EA[b]} da outra pessoa: ${CTL[a]}. Você tende a <b>pôr limites, corrigir e frear</b> essa pessoa, às vezes sem perceber.</p><p><b>O lado bom:</b> esse limite pode dar direção e disciplina. <b>O cuidado:</b> dosar a crítica, para que ela não se sinta sufocada.</p>`}
  else{tag='相剋 · a outra pessoa segura você';t=`<p>${cap(EA[b])} da outra pessoa <b>controla</b> ${EA[a]} que é a sua: ${CTL[b]}. Essa pessoa tende a <b>pôr limites e cobrar</b> você, às vezes sem perceber.</p><p><b>O lado bom:</b> ela pode trazer foco e disciplina. <b>O cuidado:</b> conversar sobre isso, para que a cobrança não vire peso.</p>`}
  return `<div class="card kz-rel"><h3>${tag}</h3>${head}${t}<p class="note">Nas nove estrelas, 相生 e 比和 são tidos como combinações harmoniosas e 相剋 como uma combinação que pede mais compreensão; nenhuma é boa ou ruim por si. É uma comparação simples, só pela estrela do ano. <button type="button" class="chip mo" data-more="k:afin">entenda as três relações <span aria-hidden="true">›</span></button></p></div>`;
}
// direções de um mapa para uma pessoa
function marks(ch,br,hon,getsu){
  const m={};POS.forEach(p=>m[p]={bad:[],good:0});
  const f=where(ch,5);if(f!=='中'){m[f].bad.push('五黄殺');m[OPP[f]].bad.push('暗剣殺')}
  const h=where(ch,hon);if(h!=='中'){m[h].bad.push('本命殺');m[OPP[h]].bad.push('本命的殺')}
  m[OPP[BPAL[br]]].bad.push('破');
  POS.forEach(p=>{if(p==='中'||m[p].bad.length)return;const s=ch[p];if(s===5)return;
    if(good(SE[hon-1],SE[s-1]))m[p].good=good(SE[getsu-1],SE[s-1])?2:1});
  return m;
}
function grid(ch,mk,breakName){
  return `<div class="kz-grid">${LAY.flat().map(p=>{const s=ch[p],x=mk[p],cls=x.bad.length?'bad':x.good===2?'best':x.good?'good':'';
    return `<div class="kz-cell clk ${cls}${p==='中'?' mid':''}" data-more="k:st${s}" title="Saiba mais sobre ${SN[s-1]}"><span class="note">${DIRP[p]}</span><b>${SN[s-1]}</b>${x.bad.length?`<span class="kz-t">${x.bad.map(t=>t==='破'?breakName:t).join(' · ')}</span>`:x.good===2?'<span class="kz-t">最大吉方</span>':x.good?'<span class="kz-t">吉方</span>':''}</div>`}).join('')}</div>`;
}
function run(c){
  const {$,S,B,kan,pillarsAt}=K;
  const bY=c.y+(mod(c.y-4,60)===c.ysi?0:-1); // ano pelo 立春
  const hon=yStar(bY),getsu=mStar(hon,c.monN%12);
  const kp=where(chart(getsu),hon);LAST={hon,getsu};
  const dig=[];let v=bY;while(v>9){const ds=String(v).split('').map(Number),t=ds.reduce((a,b)=>a+b,0);dig.push(`${ds.join('+')} = ${t}`);v=t}
  const r11=11-v,grp=[1,4,7].includes(hon)?'一白, 四緑 ou 七赤':[2,5,8].includes(hon)?'二黒, 五黄 ou 八白':'三碧, 六白 ou 九紫';
  const mk=mod(c.monN%12-2,12),seq=Array.from({length:mk+1},(_,i)=>`${B[(i+2)%12]} ${SN[mStar(hon,(i+2)%12)-1].slice(0,2)}`).join(' → ');
  $('kz-steps').innerHTML=`<li><b>Ano de nascimento</b>, contado pelo 立春 ${mo('c:rs','por quê?')} (quem nasceu antes de ~4 de fevereiro pertence ao ano anterior): <b>${bY}</b>.</li>
  <li>Some os algarismos até sobrar um só: ${dig.length?dig.join(' → ').replace(/= (\d+)$/,'= <b>$1</b>'):`<b>${bY}</b>`}. Faça 11 − ${v} = ${r11}${r11>9?`; passou de 9, tire 9: ${r11-9}`:''}. A sua <b>estrela do ano</b> (本命星) é ${mo('k:st'+hon,`<b>${SN[hon-1]}</b>`)} ${mo('k:honmei','o que é?')}</li>
  <li><b>Mês</b>: você nasceu no mês solar <b>${B[c.monN%12]}</b>. Para quem é ${grp}, o mês 寅 (fevereiro) começa em ${SN[mStar(hon,2)-1]} e cada mês seguinte desce uma estrela: ${seq}. A sua <b>estrela do mês</b> (月命星) é ${mo('k:st'+getsu,`<b>${SN[getsu-1]}</b>`)} ${mo('k:getsu','o que é?')}</li>
  <li><b>Temperamento de fundo</b> (傾斜) ${mo('k:keisha','o que é?')}: ponha a estrela do mês no centro do quadrado e veja em que casa caiu a estrela do ano: ${kp==='中'?'no próprio centro (同会), caso em que cada escola usa uma regra própria.':`casa ${DIRP[kp]} (${kp}), que pertence ao <b>${SN[HOME[kp]-1]}</b>.`}</li>`;
  $('kz-me').innerHTML=`<div><span class="note">本命星 · estrela do ano de nascimento (${bY}, pelo 立春)</span><div class="k">${SN[hon-1]}</div><p class="note">${SD[hon-1]}.</p><div class="chips">${mo('k:st'+hon,'tudo sobre '+SN[hon-1].slice(0,2))}${mo('k:honmei','o que é o 本命星')}</div></div>
  <div><span class="note">月命星 · estrela do mês de nascimento (${B[c.monN%12]}月, pelo 節入り)</span><div class="k">${SN[getsu-1]}</div><p class="note">${SD[getsu-1]}.</p><div class="chips">${mo('k:st'+getsu,'tudo sobre '+SN[getsu-1].slice(0,2))}${mo('k:getsu','o que é o 月命星')}</div></div>
  <div><span class="note">傾斜 · palácio do 本命星 no mapa do 月命星</span><div class="k">${kp==='中'?'同会':SN[HOME[kp]-1].slice(0,2)+'傾斜'}</div><p class="note">${kp==='中'?'本命星 e 月命星 iguais (同会): cada escola usa uma regra própria, por isso não calculo.':`本命星 cai no palácio ${kp} (${DIRP[kp]}), cujo 定位 é ${SN[HOME[kp]-1]}: o temperamento de fundo segue essa estrela. ${SD[HOME[kp]-1]}.`}</p><div class="chips">${kp!=='中'?mo('k:st'+HOME[kp],'tudo sobre '+SN[HOME[kp]-1].slice(0,2)):''}${mo('k:keisha','o que é o 傾斜')}</div></div>`;
  // mapa do ano
  const yi=$('kz-y'),nowY=new Date().getUTCFullYear();if(!yi.value)yi.value=nowY;
  const Y=Math.max(1900,Math.min(2100,+yi.value||nowY)),yb=mod(Y-4,12),ys=mod(Y-4,10),yc=yStar(Y),ych=chart(yc);
  $('kz-year').innerHTML=`<h3 class="h3">Mapa do ano ${Y} <span class="note">(${kan(mod(Y-4,60))} · ${SN[yc-1]} no centro)</span></h3>${grid(ych,marks(ych,yb,hon,getsu),'歳破')}`;
  // mapa do mês corrente (pelo 節入り)
  const now=new Date(Date.now()+c.tz*36e5),q=pillarsAt(now.getUTCFullYear(),now.getUTCMonth()+1,now.getUTCDate(),now.getUTCHours(),now.getUTCMinutes(),c.tz,false);
  const mc=mStar(yStar(q.yr),q.monN%12),mch=chart(mc);
  $('kz-month').innerHTML=`<h3 class="h3">Mapa do mês atual <span class="note">(${kan(q.monN)} · ${SN[mc-1]} no centro)</span></h3>${grid(mch,marks(mch,q.monN%12,hon,getsu),'月破')}`;
  $('kz-month').insertAdjacentHTML('beforeend',`<p class="note" style="margin-top:10px">Toque numa casa para saber mais sobre a estrela. O que significa cada marca:</p><div class="chips">${MK.map((x,i)=>mo('k:m'+i,x[0])).join('')}</div>`);
  // 八将神, 金神, 恵方 do ano escolhido
  const g3=b=>[[8,0,4],[2,6,10],[5,9,1],[11,3,7]].findIndex(x=>x.includes(b));
  const DSG=[9,0,3,6][[[11,0,1],[2,3,4],[5,6,7],[8,9,10]].findIndex(x=>x.includes(yb))];
  const KEI=[3,10,5,0,4,8,6,1,2,9,7,11],SAI=[7,1,4,10][g3(yb)],KOB=[4,10,1,7][g3(yb)];
  const KIN=[[6,7,8,9],[4,5],[0,1,2,3,6,7],[2,3,10,11],[0,1,8,9]][ys%5];
  const EHO=[['甲','leste-nordeste'],['庚','oeste-sudoeste'],['丙','sul-sudeste'],['壬','norte-noroeste'],['丙','sul-sudeste']][ys%5];
  const bd=b=>`${B[b]} (${BDIR[b]})`;
  const rows=[['歳徳神 (恵方)',`${EHO[0]} (${EHO[1]})`,'direção favorável do ano'],['太歳',bd(yb),'evitar disputas e cortes de árvores nessa direção'],['大将軍',bd(DSG),'fica 3 anos na mesma direção; evitar obras e mexer na terra'],['大陰',bd(mod(yb-2,12)),'evitar casamentos e partos (tradição)'],['歳刑',bd(KEI[yb]),'evitar mexer na terra, plantar'],['歳破',bd(mod(yb+6,12)),'oposto ao ramo do ano; evitar mudanças e obras'],['歳殺',bd(SAI),'evitar casamentos e mudanças'],['黄幡',bd(KOB),'evitar obras; bom para assuntos militares e de disputa (tradição)'],['豹尾',bd(mod(KOB+6,12)),'evitar trazer animais e obras'],['金神',KIN.map(bd).join(', '),'evitar obras, mudanças e viagens (pelo tronco do ano)'],['大金神',bd(mod(yb+9,12)),'pelo ramo do ano'],['姫金神',bd(mod(yb+3,12)),'oposto ao 大金神']];
  $('kz-dirs').innerHTML=`<h3 class="h3">Divindades das direções em ${Y} <span class="note">(八将神, 金神, 歳徳神)</span></h3><div class="scroll"><table class="pt"><thead><tr><th>Divindade</th><th>Direção</th><th>O que a tradição diz</th></tr></thead><tbody>${rows.map((r,i)=>`<tr><td class="kk2">${mo('k:d'+i,r[0])}</td><td>${r[1]}</td><td class="rel">${r[2]}</td></tr>`).join('')}</tbody></table></div>`;
  // afinidade com outra pessoa
  const ov=$('kz-o').value;
  if(ov){const [oy,om,od]=ov.split('-').map(Number),oq=pillarsAt(oy,om,od,12,0,c.tz,false),oh=yStar(oq.yr);
    $('kz-comp').innerHTML=relCard(hon,oh,oq.yr)}
  else $('kz-comp').innerHTML='';
}
// "saiba mais" do 九星 (usa a janela do kanshi.js)
K.moreFns=K.moreFns||{};
const KB=v=>({
 dir:`<h3>O que são as direções</h3><p>No 九星気学, as nove estrelas mudam de lugar todo ano e todo mês: uma fica no <b>centro</b> e as outras oito ocupam as oito <b>direções</b> (norte, nordeste, leste…). Cada estrela é de um elemento, e a sua estrela de nascimento também. Conforme a estrela que “mora” numa direção naquele período, o 気学 considera que aquela direção combina ou não com você.</p>
  <p><b>Como ler o quadrado.</b> É um mapa visto de cima, com o <b>sul em cima</b>, como nos calendários japoneses. A casa do meio é onde você está, a sua casa; as outras oito são as direções a partir dela.</p>
  <p><b style="color:var(--e0)">Verde</b>: favorável para você (吉方). <b style="color:var(--e0)">Verde forte</b> (最大吉方): combina com as suas duas estrelas, a do ano e a do mês.</p>
  <p><b style="color:var(--red)">Vermelho</b>: desfavorável. O nome escrito na casa diz o motivo: <b>五黄殺</b>, onde está a estrela 五黄, tida como a mais pesada; <b>暗剣殺</b>, o lado oposto ao 五黄; <b>本命殺</b>, onde está a sua estrela do ano; <b>本命的殺</b>, o lado oposto a ela; <b>歳破 / 月破</b>, o lado oposto ao animal do ano ou do mês.</p>
  <p><b>Na prática.</b> Serve para decidir movimentos <b>a partir da sua casa</b>: mudar de residência, viajar, fazer uma obra. Se você pensa em se mudar no ano que vem para um lugar a oeste de onde mora, mude o ano para o próximo e olhe a casa “oeste”. O mapa do ano vale para mudanças grandes; o do mês, para coisas curtas, como uma viagem.</p>`,
 afin:`<h3>As três relações entre duas estrelas</h3>
  <p>Cada estrela do 九星 pertence a um dos cinco elementos: <b>一白</b> Água; <b>二黒, 五黄, 八白</b> Terra; <b>三碧, 四緑</b> Madeira; <b>六白, 七赤</b> Metal; <b>九紫</b> Fogo. Para comparar duas pessoas, o 気学 olha como os elementos das duas estrelas se encontram. Há três possibilidades:</p>
  <p><b>1. Mesmo elemento (比和, “iguais em harmonia”).</b> Água com Água, Terra com Terra… Como duas águas que se juntam: as duas pessoas se entendem com facilidade, têm ritmo e gostos parecidos. O cuidado é que, iguais demais, podem reforçar os mesmos defeitos.</p>
  <p><b>2. Uma gera a outra (相生, “gerar”).</b> Os elementos formam uma roda em que cada um alimenta o seguinte:</p>
  <ul><li>Madeira → Fogo: a lenha alimenta o fogo;</li><li>Fogo → Terra: o fogo vira cinza, que vira terra;</li><li>Terra → Metal: o metal nasce dentro da terra;</li><li>Metal → Água: o metal frio junta gotas de água;</li><li>Água → Madeira: a água rega a árvore.</li></ul>
  <p>Quem gera faz o papel de “mãe” e quem é gerado, de “filho”: uma pessoa tende a apoiar, nutrir e incentivar a outra. Exemplo: <b>六白金星</b> (Metal) gera <b>一白水星</b> (Água), então o 六白 tende a apoiar o 一白. É considerada uma relação de apoio.</p>
  <p><b>3. Uma controla a outra (相剋, “controlar”).</b> Cada elemento segura o que está duas casas adiante na roda:</p>
  <ul><li>Madeira segura Terra: as raízes seguram a terra;</li><li>Terra segura Água: a terra represa a água, como um dique;</li><li>Água segura Fogo: a água apaga o fogo;</li><li>Fogo segura Metal: o fogo derrete o metal;</li><li>Metal segura Madeira: o machado corta a árvore.</li></ul>
  <p>Quem controla tende a pôr limites, corrigir e cobrar; quem é controlado sente o freio. Pode haver tensão, mas também disciplina e direção. Por isso se diz que pede <b>compreensão mútua</b>: funciona bem quando os dois sabem disso e dosam.</p>
  <p class="note">É uma comparação simples, só pela estrela do ano. Deixar o campo em branco não muda nada no resto da página.</p>`})[v];
K.moreFns.k=v=>KX(v)||KB(v);
K.hooks.push(run);if(K.ctx)run(K.ctx);
document.addEventListener('input',e=>{if(K.ctx&&(e.target.id==='kz-y'||e.target.id==='kz-o'))run(K.ctx)});
})();
