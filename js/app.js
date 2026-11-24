{
const S='甲乙丙丁戊己庚辛壬癸',B='子丑寅卯辰巳午未申酉戌亥';
const SK=['きのえ','きのと','ひのえ','ひのと','つちのえ','つちのと','かのえ','かのと','みずのえ','みずのと'];
const SO=['こう','おつ','へい','てい','ぼ','き','こう','しん','じん','き'];
const BK=['ね','うし','とら','う','たつ','み','うま','ひつじ','さる','とり','いぬ','い'];
const BO=['し','ちゅう','いん','ぼう','しん','し','ご','び','しん','ゆう','じゅつ','がい'];
const AN=['Rato','Boi','Tigre','Coelho','Dragão','Serpente','Cavalo','Cabra','Macaco','Galo','Cão','Javali'];
const EL=['木','火','土','金','水'],ELP=['Madeira','Fogo','Terra','Metal','Água'];
const BE=[4,2,0,0,2,1,1,2,3,3,2,4];
const $=id=>document.getElementById(id);
const SRM=['kinoe','kinoto','hinoe','hinoto','tsuchinoe','tsuchinoto','kanoe','kanoto','mizunoe','mizunoto'],BRM=['ne','ushi','tora','u','tatsu','mi','uma','hitsuji','saru','tori','inu','i'];
const roma=n=>SRM[n%10]+'-'+BRM[n%12];
const mod=(a,n)=>((a%n)+n)%n;
const idx=(s,b)=>mod(6*s-5*b,60);
const kan=n=>S[n%10]+B[n%12];
const yomi=n=>SK[n%10]+BK[n%12];
const rad=Math.PI/180;
function sunLon(jd){
  const T=(jd-2451545)/36525;
  const L0=280.46646+36000.76983*T+0.0003032*T*T;
  const M=(357.52911+35999.05029*T-0.0001537*T*T)*rad;
  const C=(1.914602-0.004817*T-0.000014*T*T)*Math.sin(M)+(0.019993-0.000101*T)*Math.sin(2*M)+0.000289*Math.sin(3*M);
  const O=(125.04-1934.136*T)*rad;
  return mod(L0+C-0.00569-0.00478*Math.sin(O),360);
}
const msToJd=ms=>ms/864e5+2440587.5;
const jdToMs=jd=>(jd-2440587.5)*864e5;
function termJd(Y,L){
  let jd=msToJd(Date.UTC(Y,2,20,12))+mod(L,360)/0.98565;
  if(L>=270)jd-=365.2422;
  for(let i=0;i<6;i++){jd+=(mod(L-sunLon(jd)+180,360)-180)/0.98565}
  return jd;
}
const TERMS=[[285,'小寒',1],[315,'立春',2],[345,'啓蟄',3],[15,'清明',4],[45,'立夏',5],[75,'芒種',6],[105,'小暑',7],[135,'立秋',8],[165,'白露',9],[195,'寒露',10],[225,'立冬',11],[255,'大雪',0]];
const pad=n=>String(n).padStart(2,'0');

// ---- 占い data ----
const ZOU=[9,5,0,1,4,2,3,5,6,7,4,8]; // 蔵干 本気
const TS=['比肩','劫財','食神','傷官','偏財','正財','偏官','正官','偏印','印綬'];
const TSD={比肩:'independência, autonomia e firmeza; segue o próprio caminho',劫財:'competitividade, ousadia e jogo de cintura social',食神:'prazer de viver, criatividade tranquila e generosidade',傷官:'talento, sensibilidade e senso crítico afiado',偏財:'dinheiro em movimento, sociabilidade e espírito de serviço',正財:'constância, economia e lealdade',偏官:'ação, coragem e impulso para enfrentar desafios',正官:'ordem, responsabilidade e reputação',偏印:'originalidade, intuição e gosto pelo incomum',印綬:'estudo, sabedoria e apoio dos mais velhos'};
const tsei=(d,x)=>TS[mod(Math.floor(x/2)-Math.floor(d/2),5)*2+((d%2)===(x%2)?0:1)];
const U12=['長生','沐浴','冠帯','建禄','帝旺','衰','病','死','墓','絶','胎','養'];
const U12D=['começo promissor, crescimento natural','charme e instabilidade, busca de liberdade','autoconfiança e vontade de se mostrar','maturidade estável, trabalho sólido','auge de força, espírito de líder','calma experiente, conselheiro','sensibilidade e imaginação','profundidade e concentração','acumula, guarda e preserva','mudanças bruscas, recomeços','potencial e curiosidade','afeto e proteção, cresce cercado de apoio'];
const CS=[11,6,2,9,2,9,5,0,8,3];
const u12=(s,b)=>U12[s%2?mod(CS[s]-b,12):mod(b-CS[s],12)];
const NAT=['海中金','炉中火','大林木','路傍土','剣鋒金','山頭火','澗下水','城頭土','白鑞金','楊柳木','泉中水','屋上土','霹靂火','松柏木','長流水','砂中金','山下火','平地木','壁上土','金箔金','覆燈火','天河水','大駅土','釵釧金','桑柘木','大渓水','沙中土','天上火','石榴木','大海水'];
const NATP=['ouro no fundo do mar','fogo da fornalha','madeira da grande floresta','terra à beira do caminho','metal da ponta da espada','fogo no alto da montanha','água do riacho','terra da muralha','metal branco (estanho)','madeira do salgueiro','água da fonte','terra do telhado','fogo do relâmpago','madeira de pinheiro','água do rio longo','ouro na areia','fogo ao pé da montanha','madeira da planície','terra da parede','folha de ouro','fogo da lamparina','água do rio celeste','terra da grande estrada','metal do grampo de cabelo','madeira da amoreira','água do grande vale','terra da areia','fogo do céu','madeira da romãzeira','água do grande oceano'];
const DM=[['Árvore grande','reto, idealista e com espírito de líder; gosta de crescer e proteger os outros. Pode ser teimoso e ter dificuldade de dobrar-se.'],['Flor e trepadeira','flexível, diplomático e persistente; se adapta e cresce apoiado nas relações. Às vezes depende demais do ambiente.'],['Sol','alegre, generoso e expansivo; aquece quem está perto e gosta de estar em evidência. Pode ser impaciente.'],['Chama de vela','sensível, intuitivo e dedicado; ilumina de perto, com calor humano e espírito artístico. Oscila com as emoções.'],['Montanha','estável, confiável e tolerante; os outros se apoiam nele. Lento para mudar de posição.'],['Terra de cultivo','cuidadoso, prático e nutridor; faz as coisas crescerem com paciência. Tende a se preocupar demais.'],['Aço e espada','decidido, justo e direto; enfrenta problemas de frente. Pode soar duro.'],['Joia','refinado, estético e orgulhoso; brilha quando lapidado pelas dificuldades. Sensível a críticas.'],['Oceano e grande rio','livre, inteligente e aventureiro, de visão ampla; não gosta de amarras. Pode se dispersar.'],['Chuva e orvalho','sereno, paciente e intuitivo; age em silêncio e nutre tudo ao redor. Às vezes fecha-se demais.']];
const KS=['一白水星','二黒土星','三碧木星','四緑木星','五黄土星','六白金星','七赤金星','八白土星','九紫火星'];
const KSD=['adaptável e perseverante, flui como a água','dedicado e trabalhador, sustenta os outros','ativo e direto, cheio de ideias novas','sociável e gentil, bom em harmonizar','forte e determinado, centro das atenções','responsável e orgulhoso, perfil de líder','alegre e eloquente, aprecia os prazeres','firme e cauteloso, bom em acumular','brilhante e intuitivo, ligado à estética'];
const kyusei=y=>KS[mod(11-mod(y,9),9)===0?8:mod(11-mod(y,9),9)-1];

// ---- Tabelas clássicas (com fonte) ----
// 地支藏干 completo: 淵海子平《又地支藏遁歌》
const HID=[[9],[9,7,5],[0,2,4],[1],[1,4,9],[6,2,4],[3,5],[1,5,3],[6,8,4],[7],[7,3,4],[8,0]];
// 人元司令: 子平真詮
const SIREI=[[[8,10],[9,20]],[[9,9],[7,3],[5,18]],[[4,7],[2,7],[0,16]],[[0,10],[1,20]],[[1,9],[9,3],[4,18]],[[4,5],[6,9],[2,16]],[[2,10],[5,9],[3,11]],[[3,9],[1,3],[5,18]],[[4,10],[8,3],[6,17]],[[6,10],[7,20]],[[7,9],[3,3],[4,18]],[[4,7],[0,5],[8,18]]];
const sirei=(b,days)=>{let a=0;for(const [s,n] of SIREI[b]){a+=n;if(days<a)return s}return SIREI[b][SIREI[b].length-1][0]};
// 調候用神: 窮通宝鑑 (用神提要). Linhas 甲..癸; colunas 寅..丑
const TK=[['丙癸','庚丙丁戊己','庚丁壬','癸庚丁','癸庚丁','癸庚丁','庚丁壬','庚丁丙','庚甲丁壬癸','庚丁丙戊','丁庚丙','丁庚丙'],
['丙癸','丙癸','癸丙戊','癸','癸丙','癸丙','丙癸己','癸丙丁','癸辛','丙戊','丙','丙'],
['壬庚','壬己','壬甲','壬癸庚','壬庚','壬庚','壬戊','壬癸','甲壬','甲戊庚壬','壬戊己','壬甲'],
['甲庚','庚甲','甲庚','甲庚','壬庚癸','甲壬庚','甲庚丙戊','甲庚丙戊','甲庚戊','甲庚','甲庚','甲庚'],
['丙甲癸','丙甲癸','甲丙癸','甲丙癸','壬甲丙','癸丙甲','丙癸甲','丙癸','甲丙癸','甲丙','丙甲','丙甲'],
['丙庚甲','甲癸丙','丙癸甲','癸丙','癸丙','癸丙','丙癸','丙癸','甲丙癸','丙甲戊','丙甲戊','丙甲戊'],
['戊甲壬丙丁','丁甲庚丙','甲丁壬癸','壬戊丙丁','壬癸','丁甲','丁甲','丁甲丙','甲壬','丁丙','丁甲丙','丙丁甲'],
['己壬庚','壬甲','壬甲','壬甲癸','壬己癸','壬庚甲','壬甲戊','壬甲','壬甲','壬丙','丙戊壬甲','丙壬戊己'],
['庚丙戊','戊辛庚','甲庚','壬辛庚癸','癸庚辛','辛甲','戊丁','甲庚','甲丙','戊丙庚','戊丙','丙丁甲'],
['辛丙','庚辛','丙辛甲','辛','庚辛壬癸','庚辛壬癸','丁','辛丙','辛甲壬癸','庚辛戊丁','丙辛','丙丁']];
// 格局 e seus 喜忌: 子平真詮《論用神》(順用・逆用) + 淵海子平「官怕傷,財怕劫,印綬見財」
// grupos: 0 比劫, 1 食傷, 2 財, 3 官殺, 4 印
const KK={正官格:['Estrutura da Autoridade','valoriza ordem, cargos e reputação; cresce dentro de instituições',[2,4],[1],'正官'],
七殺格:['Estrutura do Desafio','pressão que vira poder quando bem controlada; coragem nas crises',[1],[2],'偏官'],
正財格:['Estrutura do Dinheiro fixo','constrói patrimônio com constância e responsabilidade',[1,3],[0],'正財'],
偏財格:['Estrutura do Dinheiro móvel','faro para negócios, contatos e oportunidades',[1,3],[0],'偏財'],
正印格:['Estrutura do Saber','aprendizado, títulos e apoio de mentores',[3,0],[2],'印綬'],
偏印格:['Estrutura da Intuição','ideias originais, especialização, caminhos fora do comum',[3,0],[2],'偏印'],
食神格:['Estrutura do Prazer','criatividade tranquila, generosidade e bom gosto',[0,2],[4],'食神'],
傷官格:['Estrutura do Talento','talento forte, expressão e senso crítico',[4,2],[3],'傷官'],
建禄格:['Estrutura da Autossuficiência','vence pelo próprio esforço, sem depender de herança',[3,2,1],[],''],
陽刃格:['Estrutura da Lâmina','força máxima que precisa de disciplina para render',[3],[],''],
月劫格:['Estrutura do Rival','energia competitiva que precisa de rumo e de resultados',[3,2,1],[],'']};
const ROKU=[2,3,5,6,5,6,8,9,11,0],JIN={0:3,2:6,4:6,6:9,8:0};
const KNAME={正官:'正官格',偏官:'七殺格',正財:'正財格',偏財:'偏財格',印綬:'正印格',偏印:'偏印格',食神:'食神格',傷官:'傷官格'};
// 神殺
const TENOTSU=[[1,7],[0,8],[11,9],[11,9],[1,7],[0,8],[1,7],[2,6],[5,3],[5,3]]; // 甲戊庚牛羊,乙己鼠猴,丙丁豬雞,壬癸兔蛇,辛虎馬
const SANGO=[[8,0,4,4],[11,3,7,0],[2,6,10,1],[5,9,1,3]]; // 申子辰水 亥卯未木 寅午戌火 巳酉丑金
const sg=b=>SANGO.find(x=>x.slice(0,3).includes(b));
const ekiba=b=>mod(sg(b)[0]+6,12),touka=b=>mod(sg(b)[0]+1,12),kagai=b=>sg(b)[2];
const KAIGOU=[idx(4,10),idx(6,10),idx(6,4),idx(8,4)];
const KEI=[[2,5],[5,8],[8,2],[1,10],[10,7],[7,1],[0,3],[3,0]],SELF=[4,6,9,11];
const isKei=(a,b)=>KEI.some(([x,y])=>(x===a&&y===b)||(x===b&&y===a))||(a===b&&SELF.includes(a));
// Português simples
const TSP={比肩:'Parceiro',劫財:'Rival',食神:'Prazer',傷官:'Talento',偏財:'Dinheiro móvel',正財:'Dinheiro fixo',偏官:'Desafio',正官:'Autoridade',偏印:'Intuição',印綬:'Saber'};
const tsl=t=>`${TSP[t]} (${t})`;
const U12P={長生:'Nascimento',沐浴:'Instabilidade',冠帯:'Juventude',建禄:'Maturidade',帝旺:'Auge',衰:'Calmaria',病:'Sensibilidade',死:'Quietude',墓:'Reserva',絶:'Ruptura',胎:'Gestação',養:'Cuidado'};
const ul=u=>`${U12P[u]} (${u})`;
const GRPP=['aliados (比劫)','expressão (食傷)','dinheiro (財)','disciplina (官殺)','apoio e estudo (印)'];
const EM=['crescimento, estudo e planos · verde, leste','expressão, visibilidade e entusiasmo · vermelho, sul','estabilidade, base e confiança · amarelo e bege, centro','decisão, disciplina e organização · branco e dourado, oeste','inteligência, comunicação e flexibilidade · preto e azul-escuro, norte'];
const VER=['','Período difícil: melhor ir devagar.','Pede cautela.','Equilibrado, com altos e baixos.','Favorável.','Muito favorável.'];
const LABM={'com o dia':'casa, saúde e relacionamento','com o mês':'trabalho e ambiente','com o ano':'família e raízes','com a hora':'filhos e projetos'};

function eqTime(ms){
  const D=new Date(ms),y0=Date.UTC(D.getUTCFullYear(),0,1),doy=Math.floor((ms-y0)/864e5)+1,hr=D.getUTCHours()+D.getUTCMinutes()/60;
  const g=2*Math.PI/365*(doy-1+(hr-12)/24);
  return 229.18*(0.000075+0.001868*Math.cos(g)-0.032077*Math.sin(g)-0.014615*Math.cos(2*g)-0.040849*Math.sin(2*g));
}
function pillarsFrom(utc,loc,z23){
  const D=new Date(loc),y=D.getUTCFullYear(),m=D.getUTCMonth()+1,d=D.getUTCDate(),h=D.getUTCHours();
  const bjd=msToJd(utc),lon=sunLon(bjd);
  const yr=(m<=2&&lon<315&&lon>=240)?y-1:y;
  const ysi=mod(yr-4,60),ys=ysi%10,ycal=mod(y-4,60);
  const k=Math.floor(mod(lon-315,360)/30);
  const monN=idx(mod(ys*2+2+k,10),mod(k+2,12));
  const shift=(z23&&h>=23)?1:0;
  const dayN=mod(Date.UTC(y,m-1,d)/864e5+2440588+shift+49,60);
  const hb=Math.floor(((h+1)%24)/2);
  const sd=(h>=23&&!shift)?(dayN+1)%10:dayN%10;
  const hourN=idx(mod((sd%5)*2+hb,10),hb);
  const L=mod(315+30*k,360);let jd=bjd-mod(lon-L,360)/0.98565;
  for(let i=0;i<6;i++)jd+=(mod(L-sunLon(jd)+180,360)-180)/0.98565;
  return {yr,ysi,ycal,monN,dayN,hourN,since:bjd-jd,loc};
}
const pillarsAt=(y,m,d,h,mi,tz,z23)=>pillarsFrom(Date.UTC(y,m-1,d,h,mi)-tz*36e5,Date.UTC(y,m-1,d,h,mi),z23);

function kaku(P,noH,ds,srs){
  const mb=P[2]%12,vis=[2,3].concat(noH?[]:[0]).map(i=>P[i]%10),t=x=>tsei(ds,x),main=ZOU[mb];
  if(mb===ROKU[ds])return {k:'建禄格',via:`o mês ${B[mb]} é o 祿, a raiz mais forte do seu dia`};
  if(ds%2===0&&JIN[ds]===mb)return {k:'陽刃格',via:`o mês ${B[mb]} é o 羊刃, o ponto de força máxima do seu dia`};
  if(t(main)==='劫財')return {k:'月劫格',via:`o tronco principal do mês ${B[mb]} é um Rival (劫財)`};
  const cand=[main,...HID[mb].filter(x=>x!==main)].filter(x=>!['比肩','劫財'].includes(t(x)));
  const tou=cand.find(x=>vis.includes(x));
  if(tou!==undefined)return {k:KNAME[t(tou)],via:`${S[tou]}, escondido no mês ${B[mb]}, aparece entre os troncos visíveis (透干)`};
  if(t(main)==='比肩')return {k:'建禄格',via:`o mês ${B[mb]} reforça o seu próprio elemento`};
  const pick=cand.includes(srs)?srs:main;
  return {k:KNAME[t(pick)],via:`nenhum tronco do mês aparece; vale ${pick===srs?'o que governa o dia do nascimento (司令)':'o tronco principal do mês'}, ${S[pick]}`};
}
function analyze(P,noH,srs){
  const ds=P[1]%10,de=ds>>1,use=[0,1,2,3].filter(i=>!(i===0&&noH));
  const rel=e=>mod(e-de,5);
  const rei=[0,4].includes(rel(BE[P[2]%12]));
  const roots=use.filter(i=>HID[P[i]%12].some(s=>(s>>1)===de));
  const chi=roots.length>0;
  const st=use.filter(i=>i!==1).map(i=>P[i]%10);
  const sup=st.filter(s=>[0,4].includes(rel(s>>1))).length;
  const sei=sup>0&&sup>=st.length-sup;
  const score=(rei?1:0)+(chi?1:0)+(sei?1:0),strong=score>=2;
  const g=[0,0,0,0,0];
  st.forEach(s=>g[rel(s>>1)]++);
  use.forEach(i=>{const z=i===2?srs:ZOU[P[i]%12];g[rel(z>>1)]+=i===2?2:1});
  let fy=strong?(g[4]>g[0]?2:3):((g[2]>g[1]&&g[2]>g[3])?0:4);
  const mb=P[2]%12,tk=[...TK[ds][mod(mb-2,12)]].map(c=>S.indexOf(c));
  const ext=[5,6,7,11,0,1].includes(mb),tkE=tk[0]>>1,tkEls=new Set(tk.map(x=>x>>1));
  const cb=ext?([5,6,7].includes(mb)?1:4):-1;
  if(cb>=0&&mod(de+fy,5)===cb&&!tkEls.has(cb))fy=(strong?[1,2,3]:[4,0]).find(r=>mod(de+r,5)!==cb);
  const fyE=mod(de+fy,5);
  const K=kaku(P,noH,ds,srs),KD=KK[K.k];
  const wt=[0,1,2,3,4].map(e=>{const r=rel(e);
    const a=e===tkE?(ext?2:1.5):tkEls.has(e)?.5:0;
    const b=((strong?[1,2,3]:[0,4]).includes(r)?1:-1)+(e===fyE?.25:0);
    const c=KD[2].includes(r)?.75:KD[3].includes(r)?-.75:0;
    const d=(e===cb&&!tkEls.has(e))?-2:0;
    return {a,b,c,d,t:a+b+c+d}});
  const good=new Set([0,1,2,3,4].filter(e=>wt[e].t>0)),bad=[0,1,2,3,4].filter(e=>!good.has(e));
  const visTs=new Set(st.map(s=>tsei(ds,s)));
  return {ds,de,rei,chi,sei,score,strong,roots,sup,stN:st.length,g,fy,fyE,tk,tkE,ext,cb,good,bad,srs,mb,K,KD,wt,visTs,use,P};
}
function mkC(P,noH,dayN){
  const nb=[[dayN%12,'com o dia',1,dayN],[P[2]%12,'com o mês',.5,P[2]],[P[3]%12,'com o ano',.5,P[3]]];
  if(!noH)nb.push([P[0]%12,'com a hora',.5,P[0]]);
  return {kb:mod(10-2*Math.floor(dayN/10),12),nb,all:nb.map(x=>x[0])};
}
const hhmm=ms=>{const D=new Date(ms);return pad(D.getUTCHours())+':'+pad(D.getUTCMinutes())};
const sgn=v=>(v<0?'− ':'+ ')+Math.abs(Math.round(v));
const chip=(t,on)=>`<span class="chip"${on?' style="border-color:var(--red);color:var(--red)"':''}>${t}</span>`;

// 天干相剋 (mesma polaridade, um controla o outro), 冲, 天剋地冲, 方合
const stK=(a,b)=>a%2===b%2&&[2,3].includes(mod((a>>1)-(b>>1),5));
const isCh=(a,b)=>Math.abs(a-b)===6;
const tkdc=(M,N)=>isCh(M%12,N%12)&&stK(M%10,N%10);
const HOU=[[2,3,4,0],[5,6,7,1],[8,9,10,3],[11,0,1,4]];
// Peso de cada tronco oculto do ramo = dias que ele governa no 人元司令 (子平真詮), só entre os 蔵干 do 淵海子平
const ZWT=HID.map((h,b)=>{const m=new Map(SIREI[b]),tot=h.reduce((a,z)=>a+(m.get(z)||0),0);return h.map(z=>[z,tot?(m.get(z)||0)/tot:1/h.length])});
const deL=lab=>lab.replace('com o ','do ').replace('com a ','da ');
function judge(N,A,c,ext=[]){
  const s=N%10,b=N%12,p=tsei(A.ds,s),u=u12(A.ds,b);
  const w=e=>Math.max(-1.5,Math.min(2,A.wt[e].t));
  const zk=ZWT[b],se=s>>1,be=BE[b],tou=new Set(c.nb.filter(x=>x[2]!==1).map(x=>x[3]%10));
  const root=zk.some(([z])=>(z>>1)===se),cut=mod(se-be,5)===2,cover=mod(be-se,5)===2;
  const sk=(root?1.25:1)*(cut?.75:1),bk=cover?.75:1;
  let sc=sk*w(se)+bk*zk.reduce((a,[z,q])=>a+q*(tou.has(z)?1.5:1)*w(z>>1),0);const fl=[];
  // avisos: t = "Título (termo clássico): detalhe", v = peso na nota (0 = só informativo)
  const add=(v,t)=>{sc+=v;fl.push({t,v})},note=t=>fl.push({t,v:0});
  const has=t=>A.visTs.has(t)||A.KD[4]===t,KT=A.KD[4];
  // padrões clássicos com nome: pelo tronco (peso 1) e pelo tronco principal do ramo (peso 0,5)
  const P0=p,seen=new Set();
  for(const [p,k] of [[P0,1],[tsei(A.ds,ZOU[b]),.5]]){
  const pa=(v,t)=>{const key=t.split(' (')[0];if(seen.has(key))return;seen.add(key);add(v*k,k<1?t.replace('):','; pelo ramo):'):t)};
  if((has('傷官')&&p==='正官')||(KT==='正官'&&p==='傷官'))pa(-1,'Atrito com autoridades (傷官見官): cuidado com chefes, contratos e questões legais');
  if(has('食神')&&p==='偏印')pa(-.75,'Planos travados (梟神奪食): cuide da saúde e da alimentação');
  if((KT==='正財'||KT==='偏財')&&(p==='比肩'||p==='劫財')&&A.strong)pa(-.75,'Risco de perder dinheiro por meio de outros (比劫奪財): evite empréstimos, fianças e sócios duvidosos');
  if((KT==='印綬'||KT==='偏印')&&(p==='正財'||p==='偏財')&&!A.strong)pa(-.75,'Ganho rápido contra estabilidade (財破印): não troque o seguro pelo incerto');
  if((has('正官')&&p==='偏官')||(has('偏官')&&p==='正官'))pa(-.5,'Cobranças de todos os lados (官殺混雑): direção confusa');
  if(has('偏官')&&p==='食神')pa(.75,'Pressão sob controle (食神制殺): você lida bem com desafios');
  if(has('偏官')&&(p==='印綬'||p==='偏印')&&!has('食神'))pa(.5,'Pressão que vira aprendizado (殺印相生): pode trazer título ou promoção');
  if(KT==='正官'&&(p==='印綬'||p==='偏印'))pa(.75,'Reconhecimento (官印相生): cargos e certificações');
  if((KT==='正財'||KT==='偏財')&&p==='正官'&&A.strong)pa(.5,'Dinheiro que gera posição (財生官): ganhos que trazem status');
  if((KT==='食神'||KT==='傷官')&&(p==='正財'||p==='偏財')&&A.strong)pa(.5,'Talento que vira renda (食傷生財): sua habilidade dá dinheiro');
  if(KT==='傷官'&&(p==='印綬'||p==='偏印')&&!A.strong)pa(.5,'Talento disciplinado pelo estudo (傷官配印): bom para se formar');
  }
  if(Math.abs(s-A.ds)===5)note('Encontro ou acordo importante (干合 com o dia): relacionamentos e parcerias');
  // 干合 com os outros troncos do mapa: amarra (合絆) ou neutraliza (合去)
  c.nb.filter(x=>x[2]!==1).forEach(([,lab,,M])=>{const t=M%10;if(Math.abs(s-t)===5){const ge=A.good.has(t>>1);add(ge?-.5:.25,`${ge?'Algo que te ajuda fica travado':'Algo que te pesa é neutralizado'} em ${LABM[lab]} (干合 ${deL(lab)}・${ge?'合絆':'合去'})`)}});
  // pilares e ramos
  c.nb.forEach(([x,lab,wt,M])=>{
    const ge=A.good.has(BE[x]),day=wt===1;
    if(N===M)add(day?-.75:-.25,`Situações que se repetem em ${LABM[lab]} (伏吟 ${deL(lab)}): sensação de estagnação`);
    else if(tkdc(N,M))add(day?-1.25:-.6,`Mudança forte em ${LABM[lab]} (天剋地冲 ${deL(lab)}): algo inesperado vira a mesa`);
    else if(isCh(b,x))add(ge?-wt:.5*wt,`${ge?'Abalo':'Mudança que alivia'} em ${LABM[lab]} (冲 ${deL(lab)}): ${ge?'mexe em algo que te ajuda':'tira do caminho algo que te pesa'}`);
    else if((b+x)%12===1){
      if(day){if(ge)note('Encontros e parcerias, com ressalva (支合・合絆): a união trava algo que te ajuda');else add(.5,'Encontros e parcerias (支合 com o dia): bom para se aproximar das pessoas')}
      else add(ge?-.25:.25,`${ge?'Algo que te ajuda fica travado':'Algo que te pesa é neutralizado'} em ${LABM[lab]} (支合 ${deL(lab)}・${ge?'合絆':'合去'})`);
    }
    if(day&&isKei(b,x))add(-.5,'Tensões e burocracia (刑 com o dia): ajustes em casa, saúde ou papéis');
    if(day&&(b+x)%12===7)add(-.5,'Atritos discretos (害 com o dia): pequenos desgastes em casa e nas relações');
  });
  const all=c.all.concat(ext);
  const H=HOU.find(x=>x.slice(0,3).includes(b));
  if(H.slice(0,3).filter(x=>x!==b).every(x=>all.includes(x))){const ge=A.good.has(H[3]);add(ge?.75:-.75,`Muita energia de ${ELP[H[3]]} (方合 de ${EL[H[3]]}): ${ge?'ótimo para você':'pesa para você'}`)}
  const G=sg(b),others=G.slice(0,3).filter(x=>x!==b);
  if(others.every(x=>all.includes(x))){const ge=A.good.has(G[3]);add(ge?.75:-.75,`Muita energia de ${ELP[G[3]]} (三合 de ${EL[G[3]]}): ${ge?'ótimo para você':'pesa para você'}`)}
  if(TENOTSU[A.ds].includes(b))add(.5,'Ajuda de pessoas influentes (天乙貴人): apoio na hora certa');
  if(b===ekiba(A.P[3]%12)||b===ekiba(A.P[1]%12))note('Movimento (駅馬): viagens, mudança de casa ou de emprego');
  if(b===touka(A.P[3]%12)||b===touka(A.P[1]%12))note('Vida social e romance em alta (桃花): popularidade');
  if(b===c.kb||b===c.kb+1)add(-.5,'Hora de preparar, não de estrear (空亡): evite grandes começos');
  return {ts:p,u,E:U12E[u],fl,sc,st:Math.max(1,Math.min(5,Math.round(3+sc*.55))),es:s>>1,eb:BE[b]};
}
const U12E={胎:3,養:6,長生:9,沐浴:7,冠帯:10,建禄:11,帝旺:12,衰:8,病:4,死:2,墓:5,絶:1};
const PER={比肩:'bom para agir por conta própria e firmar posição; cuidado com teimosia e gastos com amigos',劫財:'competição e parcerias: ganhos e perdas vêm por meio de pessoas',食神:'prazer, criatividade, saúde e lazer; ritmo mais tranquilo',傷官:'talento em evidência e vontade de mudar; cuidado com as palavras',偏財:'dinheiro circulando, negócios, vida social e romance',正財:'renda estável, poupança e vida familiar; construir aos poucos',偏官:'pressão e desafios; exige coragem, e mudanças de trabalho são comuns',正官:'reconhecimento, cargos e responsabilidade; siga as regras',偏印:'ideias novas, estudos incomuns, viagens; pode haver instabilidade',印綬:'estudo, certificações e apoio de mentores; bom para se preparar'};
const stars=n=>`<span style="color:var(--red);letter-spacing:1px;white-space:nowrap" aria-label="${n} de 5">${'★'.repeat(n)}<span style="opacity:.25">${'★'.repeat(5-n)}</span></span>`;
const elm=(j,A)=>[j.es,j.eb].map(e=>`${EL[e]}${A.good.has(e)?'○':'×'}`).join(' ');

function calc(){
  const dv=$('d').value;if(!dv)return;
  const [y,m,d]=dv.split('-').map(Number);
  const [h,mi]=($('t').value||'12:00').split(':').map(Number);
  const tz=+$('tz').value,noH=$('nh').checked,dst=$('dst').checked?1:0;
  const lon=parseFloat($('lon').value),sol=$('sol').checked&&isFinite(lon);
  const civ=Date.UTC(y,m-1,d,h,mi),utc=civ-(tz+dst)*36e5;
  const lc=sol?(lon-tz*15)*4:0,eq=sol?eqTime(utc):0;
  const loc=utc+tz*36e5+(lc+eq)*6e4;
  const r=pillarsFrom(utc,loc,$('z23').checked);
  const L=new Date(loc),dayMoved=L.getUTCDate()!==d;
  $('solar').innerHTML=noH?'Hora desconhecida: o pilar da hora fica fora das contas.':`Hora usada: ${pad(h)}:${pad(mi)} no relógio${dst?' − 60 min (horário de verão)':''}${sol?` ${sgn(lc)} min (posição da cidade) ${sgn(eq)} min (variação do sol na época do ano) = <b>hora solar ${hhmm(loc)}</b> (真太陽時)`:' — <b>sem correção solar</b>'}${dayMoved?` · com isso, o dia de nascimento passa a ser ${pad(L.getUTCDate())}/${pad(L.getUTCMonth()+1)}`:''}.`;
  const {ysi,ycal,monN,dayN,hourN}=r;
  const yearN=$('ym').value==='jan'?ycal:ysi;
  const P=[hourN,dayN,monN,ysi];
  const srs=sirei(monN%12,Math.floor(r.since));
  const A=analyze(P,noH,srs);A.since=r.since;
  render([['Hora',hourN],['Dia',dayN],['Mês',monN],['Ano',yearN]],dayN,noH,A);
  const F=forecast({utc,y,m,d,tz,noH,P,dayN,A});
  reading(P,dayN,noH,r.yr,tz,A,F);
  summary(A,F,dayN);
  ['r-sum','r-day','r-ts','r-12','r-el','r-ss','r-luck','f-dy','f-ly','f-lm'].forEach(id=>{$(id).innerHTML=pl($(id).innerHTML)});
  PRO={P,noH,A,F,lonS:sunLon(msToJd(utc)),y,tz};pro();
  window.KS.ctx={y,m,d,h,mi,tz,utc,loc,P,noH,dayN,monN,yearN,ysi,sex:$('sx').value};window.KS.hooks.forEach(f=>{try{f(window.KS.ctx)}catch(e){console.error(e)}});
  const diff=ycal!==ysi?` Atenção: você nasceu antes do 立春 (início do ano tradicional, ~4/fev), então pelo calendário comum o ano seria <b>${kan(ycal)}</b>.`:'';
  const nmP=N=>`<b>${kan(N)}</b> (<i>${roma(N)}</i>, ${AN[N%12]} de ${ELP[Math.floor(N/2)%5]})`;
  $('sum').innerHTML=`Ano ${nmP(yearN)}, mês ${nmP(monN)}, dia ${nmP(dayN)}${noH?'':`, hora ${nmP(hourN)}`}.${diff}`;
  terms(y,tz);
  sel=yearN%60;grid();years();
}
function render(list,dayN,noH,A){
  const ds=dayN%10,kb=mod(10-2*Math.floor(dayN/10),12);
  $('pl').innerHTML=list.map(([t,n],i)=>{
    const s=n%10,b=n%12,es=Math.floor(s/2),eb=BE[b],z=i===2?A.srs:ZOU[b];
    const kuu=(b===kb||b===kb+1)&&i!==1?' · Vazio (空亡)':'';
    return `<div class="p${i===1?' main':''}${i===0&&noH?' off':''}"><span class="no">#${n+1}</span><div class="t">${t}</div>
    <div class="tsei">${i===1?'Você (日主)':tsl(tsei(ds,s))}</div>
    <div class="kj"><span class="e${es}">${S[s]}</span><span class="e${eb}">${B[b]}</span></div>
    <div class="rd"><i>${roma(n)}</i></div><div class="on">${AN[b]} de ${ELP[es]}</div>
    <div class="tags"><span class="tag e${es}">${ELP[es]} ${s%2?'yin':'yang'}</span><span class="tag e${eb}">${AN[b]}</span></div>
    <div class="meta"><span>Escondidos (蔵干): ${HID[b].map(x=>x===z?`<b>${S[x]}</b>`:S[x]).join(' ')} → ${TSP[tsei(ds,z)]}${i===2?' (司令)':''}</span><span>Energia: <b>${ul(u12(ds,b))}</b>${kuu}</span><span>納音 ${NAT[n>>1]}</span></div></div>`}).join('');
}
// ---- Leitura simples: helpers ----
// tira os parênteses que contêm kanji/kana (o termo clássico fica só no modo estudioso)
const pl=h=>h.replace(/\s*[(（][^()（）]*[぀-ヿ㐀-鿿][^()（）]*[)）]/g,'');
const nome=N=>`${AN[N%12]} de ${ELP[(N%10)>>1]}`;
const elmP=(j,A)=>[...new Set([j.es,j.eb])].map(e=>`${ELP[e]} <b style="color:var(${A.good.has(e)?'--e0':'--red'})">${A.good.has(e)?'✓':'✗'}</b>`).join(' · ');
const flH=(fl,n,short)=>{
  const a=[...fl].sort((p,q)=>Math.abs(q.v)-Math.abs(p.v)),sh=a.slice(0,n),rest=a.length-sh.length;
  return sh.map(f=>`<span class="fx"><i class="${f.v>0?'up':f.v<0?'dn':''}">${f.v>0?'▲':f.v<0?'▼':'•'}</i>${short?f.t.split(':')[0]:f.t}</span>`).join('')+(rest>0?`<span class="fx">+${rest} detalhe${rest>1?'s':''} no modo estudioso</span>`:'');
};
function reading(P,dayN,noH,yr,tz,A,F){
  const ds=dayN%10,use=P.filter((_,i)=>!(i===0&&noH));
  $('r-day').innerHTML=`<div class="big e${ds>>1}">${S[ds]}</div><h3>Quem você é: ${DM[ds][0]}</h3><p>Seu elemento é <b>${ELP[ds>>1]} ${ds%2?'yin':'yang'}</b>: ${DM[ds][1]}</p>`;
  const ok=v=>v?'<b style="color:var(--e0)">sim ✓</b>':'<b style="color:var(--red)">não ✗</b>';
  const cell=v=>v>0?'<b style="color:var(--e0)">○</b>':v<0?'<b style="color:var(--red)">×</b>':'–';
  const gN=[...A.good].map(e=>ELP[e]),bN=A.bad.map(e=>ELP[e]);
  const lst=a=>a.length>1?a.slice(0,-1).join(', ')+' e '+a[a.length-1]:a[0]||'';
  const yjMain=`<h3>O que te favorece</h3>
  <p><b>Sua força: ${A.strong?'forte':'contida'}</b>. ${A.strong?'Você tem energia própria de sobra e se equilibra quando gasta essa energia: trabalho, produção, responsabilidades.':'Sua energia própria é mais contida, e você se equilibra quando recebe apoio: estudo, mentores, aliados.'}</p>
  <p><b>Elementos que te ajudam</b>: ${[...A.good].map(e=>`<br>${chip(ELP[e],true)} <span class="note">${EM[e]}</span>`).join('')}</p>
  <p><b>Elementos que pesam</b>: ${A.bad.map(e=>chip(ELP[e])).join(' ')||'—'}</p>
  <p>Na prática: anos, meses e fases que trazem ${lst(gN)} tendem a ser bons para você${bN.length?`; os que trazem ${lst(bN)} pedem mais cuidado`:''}.</p>`;
  const yjTech=`<details class="gl"><summary>Como isso foi calculado</summary>
  <p><b>1. Sua força: ${A.strong?'forte (身強)':'contida (身弱)'}</b>, ${A.score} de 3 critérios.</p>
  <ul class="li"><li>Nasceu na estação do seu elemento ou na que o alimenta? ${ok(A.rei)} <span class="note">(得令: mês ${B[A.mb]}, estação de ${ELP[BE[A.mb]]})</span></li>
  <li>Tem raízes nos ramos? ${ok(A.chi)} <span class="note">(得地: ${A.chi?A.roots.map(i=>B[P[i]%12]+' '+['da hora','do dia','do mês','do ano'][i]).join(', '):'nenhuma'})</span></li>
  <li>Tem apoio entre os troncos? ${ok(A.sei)} <span class="note">(得勢: ${A.sup} de ${A.stN})</span></li></ul>
  <p><b>2. Sua estrutura: ${A.KD[0]}</b> (${A.K.k}): ${A.KD[1]}. <span class="note">Definida porque ${A.K.via}.</span></p>
  <p><b>3. O clima do nascimento</b>: para ${S[ds]} nascido no mês ${B[A.mb]}, o 窮通宝鑑 recomenda ${A.tk.map((s,i)=>i===0?`<b>${S[s]}</b> (${ELP[s>>1]})`:S[s]).join(', ')}.${A.ext?' Mês de clima extremo: isso pesa mais.':''}</p>
  <p><b>Como cada método vê cada elemento</b></p>
  <div class="scroll"><table class="mt"><thead><tr><th>Elemento</th><th>Clima</th><th>Força</th><th>Estrutura</th><th>Resultado</th></tr></thead><tbody>
  ${A.wt.map((w,e)=>`<tr><td>${EL[e]} ${ELP[e]}</td><td>${cell(w.a+w.d)}</td><td>${cell(w.b)}</td><td>${cell(w.c)}</td><td><b>${A.good.has(e)?'ajuda':'pesa'}</b></td></tr>`).join('')}</tbody></table></div>
  <p class="note">Casos raros (従格, 化格), em que a lógica se inverte, não são detectados.</p></details>`;
  $('r-yj').innerHTML=pl(yjMain)+yjTech;
  const cnt={};const add=t=>cnt[t]=(cnt[t]||0)+1;
  P.forEach((n,i)=>{if(i===0&&noH)return;if(i!==1)add(tsei(ds,n%10));add(tsei(ds,i===2?A.srs:ZOU[n%12]))});
  const top=Object.entries(cnt).sort((a,b)=>b[1]-a[1]);
  const mainTs=tsei(ds,A.srs);
  $('r-ts').innerHTML=`<h3>Seus talentos</h3><p class="note">Cada parte do seu mapa tem um tipo de relação com você. As mais frequentes mostram seus talentos naturais.</p><p>Seu talento principal é <b>${TSP[mainTs]}</b>: ${TSD[mainTs]}.</p>
  <div class="chips">${top.map(([t,c])=>`<span class="chip"><b>${TSP[t]}</b> ×${c}</span>`).join('')}</div>
  ${top.slice(0,3).filter(([t])=>t!==mainTs).map(([t])=>`<p><b>${TSP[t]}</b>: ${TSD[t]}.</p>`).join('')}`;
  const per=['velhice e filhos','você e o cônjuge','juventude e trabalho','infância e família'];
  $('r-12').innerHTML=`<h3>Sua energia em cada fase da vida</h3>${P.map((n,i)=>i===0&&noH?'':`<p><b>${per[i][0].toUpperCase()+per[i].slice(1)}</b>: ${U12P[u12(ds,n%12)]} — ${U12D[U12.indexOf(u12(ds,n%12))]}.</p>`).join('')}`;
  const e=[0,0,0,0,0];use.forEach(n=>{e[(n%10)>>1]++;e[BE[n%12]]++});
  const mx=Math.max(...e),miss=e.map((v,i)=>v?null:i).filter(v=>v!==null);
  $('r-el').innerHTML=`<h3>Equilíbrio dos elementos</h3><div class="bars">${e.map((v,i)=>`<div class="bar e${i}"><span>${ELP[i]}</span><div class="tr"><i style="width:${v/Math.max(mx,1)*100}%"></i></div><span class="n">${v}</span></div>`).join('')}</div>
  <p>Quantas vezes cada elemento aparece nos ${use.length*2} caracteres do seu mapa.${miss.length?` Falta ${miss.map(i=>ELP[i]).join(' e ')}${miss.some(i=>A.good.has(i))?'; como é um elemento que te ajuda, os períodos que o trazem tendem a ser bons':''}.`:''}</p>`;
  // 神殺
  const c=mkC(P,noH,dayN),kb=c.kb,all=c.all;
  const ss=[];
  if(all.some(b=>TENOTSU[ds].includes(b)))ss.push(['Pessoa influente (天乙貴人)','ajuda de pessoas importantes; proteção em momentos difíceis']);
  const yb=P[3]%12,db=dayN%12;
  if(all.some(b=>b!==yb&&b===ekiba(yb))||all.some(b=>b!==db&&b===ekiba(db)))ss.push(['Movimento (駅馬)','vida em movimento: viagens, mudanças, trabalho que circula']);
  if(all.some(b=>b!==yb&&b===touka(yb))||all.some(b=>b!==db&&b===touka(db)))ss.push(['Charme (桃花)','popularidade, vida social intensa e romance']);
  if(all.some(b=>b!==yb&&b===kagai(yb))||all.some(b=>b!==db&&b===kagai(db)))ss.push(['Guarda-sol (華蓋)','lado artístico ou espiritual; gosto por estudos profundos e momentos a sós']);
  if(KAIGOU.includes(dayN))ss.push(['Estrela de comando (魁罡)','personalidade forte e decidida; vive os extremos']);
  $('r-ss').innerHTML=`<h3>Estrelas especiais</h3>${ss.length?ss.map(([a,b])=>`<p><b>${a}</b>: ${b}.</p>`).join(''):'<p>Nenhuma das estrelas principais aparece no seu mapa.</p>'}
  <p><b>Vazio</b>: anos e meses de ${AN[kb]} e ${AN[kb+1]} pedem mais preparo e menos estreias.</p>
  <p><b>Estrela do ano</b>: ${KSD[KS.indexOf(kyusei(yr))]} (${kyusei(yr)}).</p>`;
  const n=new Date(Date.now()+tz*36e5);
  const t=pillarsAt(n.getUTCFullYear(),n.getUTCMonth()+1,n.getUTCDate(),n.getUTCHours(),n.getUTCMinutes(),tz,false);
  const cl=(lab,N,j)=>`<div><span class="note">${lab}</span><div class="k">${kan(N)}</div><div class="note">${nome(N)}</div>${stars(j.st)}<p class="note">${VER[j.st]} ${TSP[j.ts]}: ${PER[j.ts]}.</p></div>`;
  $('r-luck').innerHTML=`<h3>Agora</h3><div class="luck">${cl(`Ano ${t.yr}`,t.ysi,F.yearJ(t.ysi,t.yr))}${cl('Mês atual',t.monN,F.monthJ(t.monN,t.ysi,t.yr,Date.now()))}${cl('Hoje',t.dayN,judge(t.dayN,A,c))}</div>`;
}
// Interação entre dois períodos (ano × fase, mês × ano). 滴天髓:「休咎繫乎運，尤繫乎歲」
const WYD={a:'O ano',b:'a fase',bd:'da fase',t:'歳運併臨',p:'ela'},WMY={a:'O mês',b:'o ano',bd:'do ano',t:'併臨',p:'ele'};
function inter(N,D,A,w,W){
  const out=[],s=N%10,b=N%12,ds=D%10,db=D%12,gd=e=>A.good.has(e);
  if(N===D){const g=gd(s>>1)&&gd(BE[b]),bd=!gd(s>>1)&&!gd(BE[b]);out.push([g?.5*w:bd?-w:-.25*w,`${W.a} repete ${W.b} (${W.t}): o efeito ${g?'dobra a seu favor':bd?'dobra, e pesa para você':'se intensifica, com altos e baixos'}`])}
  else if(tkdc(N,D))out.push([-.75*w,`${W.a} bate de frente com ${W.b} (天剋地冲): viradas bruscas e mudanças forçadas`]);
  else if(isCh(b,db)){const ge=gd(BE[db]);out.push([ge?-.5*w:.25*w,`${W.a} choca ${W.b} (冲): ${ge?`tira força do que ${W.p} traz de bom`:`alivia o que ${W.p} tem de pesado`}`])}
  else if((b+db)%12===1)out.push([0,`${W.a} combina com ${W.b} (支合): o tema ${W.bd} fica mais ativo`]);
  if(Math.abs(s-ds)===5){const ge=gd(ds>>1);out.push([ge?-.25*w:.25*w,`${W.a} combina com ${W.b} (干合): ${ge?'trava algo que te ajuda':'neutraliza algo que pesa'}`])}
  return out;
}
// soma normalizada: o período mais o contexto (fase ou ano) com peso k, dividido por 1+k para manter a escala
const mix=(j,k,ctx,items)=>{const sc=(j.sc+k*ctx+items.reduce((a,x)=>a+x[0],0))/(1+k);return {...j,sc,fl:[...j.fl,...items.map(x=>({t:x[1],v:x[0]}))],st:Math.max(1,Math.min(5,Math.round(3+sc*.55)))}};
function forecast(o){
  const {utc,y,m,d,tz,noH,P,dayN,A}=o,c=mkC(P,noH,dayN);
  const bjd=msToJd(utc),lon=sunLon(bjd);
  const fwd=(P[3]%2===0)===($('sx').value==='m');
  const k=Math.floor(mod(lon-315,360)/30);
  const L=mod(315+30*(fwd?k+1:k),360);
  let jd=bjd+(fwd?mod(L-lon,360):-mod(lon-L,360))/0.98565;
  for(let i=0;i<6;i++)jd+=(mod(L-sunLon(jd)+180,360)-180)/0.98565;
  const days=Math.abs(jd-bjd),sa=days/3,say=Math.floor(sa),sam=Math.round((sa-say)*12);
  const nowMs=Date.now(),age=(nowMs-Date.UTC(y,m-1,d))/(365.2425*864e5);
  const dec=Array.from({length:9},(_,i)=>{const N=mod(P[2]+(fwd?i+1:-(i+1)),60),a0=sa+10*i;return {N,a0,y0:Math.floor(y+(m-1)/12+a0),j:judge(N,A,c),cur:age>=a0&&age<a0+10}});
  const bMs=Date.UTC(y,m-1,d),dyAtYear=yy=>dec.find(x=>yy>=x.y0&&yy<=x.y0+9),dyAtMs=t=>{const a=(t-bMs)/(365.2425*864e5);return dec.find(x=>a>=x.a0&&a<x.a0+10)};
  // ano lido dentro da fase de 10 anos; mês lido dentro do ano
  const yearJ=(N,yy)=>{const D=dyAtYear(yy),j=judge(N,A,c,D?[D.N%12]:[]);return D?mix(j,.4,D.j.sc,inter(N,D.N,A,1,WYD)):j};
  const monthJ=(N,yN,yy,t)=>{const D=dyAtMs(t),yj=yearJ(yN,yy),j=judge(N,A,c,[yN%12].concat(D?[D.N%12]:[]));return mix(j,.3,yj.sc,inter(N,yN,A,.5,WMY))};
  $('f-dy').innerHTML=`<h3>Fases de 10 anos</h3><p>A vida se divide em fases de 10 anos, cada uma com um clima próprio. Sua primeira fase começa aos <b>${say} ano${say===1?'':'s'}${sam?` e ${sam} ${sam===1?'mês':'meses'}`:''}</b>.</p>
  <div class="dy scroll">${dec.map(x=>`<div class="dyc${x.cur?' cur':''}"><span class="note">${Math.floor(x.a0)} a ${Math.floor(x.a0)+9} anos · ${x.y0}–${x.y0+9}</span>
  <div class="k">${kan(x.N)}</div><div class="note">${nome(x.N)}</div><div>${stars(x.j.st)} <span class="note">${elmP(x.j,A)}</span></div>
  <p><b>${VER[x.j.st]}</b> Tema: <b>${TSP[x.j.ts]}</b> — ${PER[x.j.ts]}.</p>
  <div class="note">Energia: ${U12P[x.j.u]}</div><div class="eb"><i style="width:${x.j.E/12*100}%"></i></div>
  ${flH(x.j.fl,3)}${x.cur?'<p class="note" style="color:var(--red)">Você está aqui</p>':''}</div>`).join('')}</div>
  <p class="note">✓ elemento que te ajuda · ✗ elemento que pesa · ▲ ponto a favor · ▼ ponto de atenção.</p>`;
  const now=new Date(nowMs+tz*36e5),Y=now.getUTCFullYear();
  const yrs=Array.from({length:10},(_,i)=>{const yy=Y+i,N=mod(yy-4,60);return {yy,N,D:dyAtYear(yy),j:yearJ(N,yy)}});
  $('f-ly').innerHTML=`<h3>Ano a ano</h3><div class="scroll"><table class="stack"><thead><tr><th>Ano</th><th>Período</th><th>Sorte</th><th>O que esperar</th></tr></thead><tbody>${yrs.map((x,i)=>`<tr${i===0?' class="nowr"':''}><td>${x.yy}</td><td><b>${kan(x.N)}</b><br><span class="note">${nome(x.N)}<br>${elmP(x.j,A)}</span></td><td>${stars(x.j.st)}</td><td><b>${VER[x.j.st]}</b> ${TSP[x.j.ts]}: ${PER[x.j.ts]}.${flH(x.j.fl,3)}</td></tr>`).join('')}</tbody></table></div><p class="note">A nota de cada ano já considera a fase de 10 anos em que ele cai. O ano tradicional começa por volta de 4 de fevereiro.</p>`;
  const tj=[];[Y-1,Y,Y+1].forEach(yy=>TERMS.forEach(t=>tj.push(termJd(yy,t[0]))));tj.sort((a,b)=>a-b);
  const nj=msToJd(nowMs);let s0=tj.findIndex((v,i)=>v<=nj&&tj[i+1]>nj);
  const ms=tj.slice(s0,s0+12).map(j=>{const dt=new Date(jdToMs(j)+tz*36e5),q=pillarsAt(dt.getUTCFullYear(),dt.getUTCMonth()+1,dt.getUTCDate(),dt.getUTCHours(),dt.getUTCMinutes()+30,tz,false);return {dt,N:q.monN,j:monthJ(q.monN,q.ysi,q.yr,jdToMs(j)+36e5)}});
  $('f-lm').innerHTML=`<h3>Mês a mês</h3><div class="scroll"><table class="stack"><thead><tr><th>A partir de</th><th>Período</th><th>Sorte</th><th>Destaque</th></tr></thead><tbody>${ms.map((x,i)=>`<tr${i===0?' class="nowr"':''}><td>${pad(x.dt.getUTCDate())}/${pad(x.dt.getUTCMonth()+1)}/${x.dt.getUTCFullYear()}</td><td><b>${kan(x.N)}</b><br><span class="note">${nome(x.N)}</span></td><td>${stars(x.j.st)}</td><td>${TSP[x.j.ts]}${flH(x.j.fl,2,true)}</td></tr>`).join('')}</tbody></table></div><p class="note">O mês tradicional começa entre os dias 4 e 8, não no dia 1.</p>`;
  return {dec,yrs,yearJ,monthJ,sa,fwd,bMs};
}
function summary(A,F,dayN){
  const ds=dayN%10,cur=F.dec.find(x=>x.cur),y0=F.yrs[0];
  const good=F.yrs.slice(1).find(x=>x.j.st>=4),bad=F.yrs.slice(1).find(x=>x.j.st<=2);
  const nextDec=F.dec[F.dec.indexOf(cur)+1];
  $('r-sum').innerHTML=`<h3>Resumo da sua leitura</h3>
  <p><b>Você é ${DM[ds][0]}</b>, do elemento ${ELP[ds>>1]}: ${DM[ds][1].split(';')[0].split('.')[0]}.</p>
  <p><b>Seu ponto forte</b>: ${A.KD[0]} — ${A.KD[1]}.</p>
  <p><b>Sua energia</b>: ${A.strong?'você tem força própria de sobra e cresce quando a coloca para trabalhar: produzir, ganhar, assumir responsabilidades.':'sua força própria é mais contida, e você cresce com apoio: estudo, mentores e boas parcerias.'}</p>
  <p><b>O que te ajuda</b>: ${[...A.good].map(e=>`<b>${ELP[e]}</b> (${EM[e].split(' · ')[0]})`).join('; ')}.</p>
  ${cur?`<p><b>A fase atual</b> (${Math.floor(cur.a0)} a ${Math.floor(cur.a0)+9} anos, ${nome(cur.N)}): ${stars(cur.j.st)} ${VER[cur.j.st]} Tema: ${TSP[cur.j.ts]} — ${PER[cur.j.ts]}.${nextDec?` A próxima fase, a partir de ${nextDec.y0}, é ${VER[nextDec.j.st].toLowerCase()}`:''}</p>`:''}
  <p><b>Este ano</b> (${y0.yy}): ${stars(y0.j.st)} ${VER[y0.j.st]} ${good?` Próximo ano de destaque: <b>${good.yy}</b>.`:''}${bad?` Ano que pede cautela: <b>${bad.yy}</b>.`:''}</p>`;
}
function terms(Y,tz){
  $('sy').textContent=Y;
  $('sk').tBodies[0].innerHTML=TERMS.map(([L,nm,bi])=>{
    const dt=new Date(jdToMs(termJd(Y,L))+tz*36e5);
    return `<tr><td>${B[bi]}月</td><td>${nm}</td><td class="r">${pad(dt.getUTCDate())}/${pad(dt.getUTCMonth()+1)} ${pad(dt.getUTCHours())}:${pad(dt.getUTCMinutes())}</td></tr>`}).join('');
}
// ---- Modo estudioso (専門表示): tudo listado, sem notas ----
const PO=[[0,9],[1,4],[2,11],[3,6],[5,8],[7,10]]; // 六破
const isPo=(a,b)=>PO.some(([x,y])=>(x===a&&y===b)||(x===b&&y===a));
const BUN=[5,6,8,9,8,9,11,0,2,3]; // 文昌貴人: 甲巳 乙午 丙戊申 丁己酉 庚亥 辛子 壬寅 癸卯
const KINYO=[4,5,7,8,7,8,10,11,1,2]; // 金輿: dois ramos depois do 祿
const TENTOKU='丁申壬辛亥甲癸寅丙乙巳庚'; // 天徳貴人, do 寅月 ao 丑月
const GETTOKU=[8,0,2,6]; // 月徳貴人 pela ordem de SANGO: 申子辰壬 亥卯未甲 寅午戌丙 巳酉丑庚
const KAN5=[2,3,4,0,1]; // 干合化: 甲己土 乙庚金 丙辛水 丁壬木 戊癸火
const SHI6={0:2,2:0,3:1,4:3,5:4,6:1}; // 支合化: 子丑土 寅亥木 卯戌火 辰酉金 巳申水 午未火
const TSA={比肩:'比',劫財:'劫',食神:'食',傷官:'傷',偏財:'才',正財:'財',偏官:'殺',正官:'官',偏印:'梟',印綬:'印'};
const PN=['時柱','日柱','月柱','年柱'],PS=['時','日','月','年'];
let PRO=null;
function shensha(N,i,P){
  const s=N%10,b=N%12,ds=P[1]%10,o=[],kb=mod(10-2*Math.floor(P[1]/10),12);
  if(TENOTSU[ds].includes(b))o.push('天乙貴人');
  if(BUN[ds]===b)o.push('文昌貴人');
  if(KINYO[ds]===b)o.push('金輿');
  if(ROKU[ds]===b)o.push('建禄');
  if(ds%2===0&&JIN[ds]===b)o.push('羊刃');
  const refs=[[P[3]%12,3],[P[1]%12,1]].filter(([,k])=>k!==i).map(([r])=>r);
  [['駅馬',ekiba],['桃花',touka],['華蓋',kagai],['劫煞',r=>mod(sg(r)[0]+9,12)],['亡神',r=>mod(sg(r)[0]+3,12)]].forEach(([nm,fn])=>{if(refs.some(r=>fn(r)===b))o.push(nm)});
  const tt=TENTOKU[mod(P[2]%12-2,12)];if(tt===S[s]||tt===B[b])o.push('天徳貴人');
  if(GETTOKU[SANGO.findIndex(x=>x.slice(0,3).includes(P[2]%12))]===s)o.push('月徳貴人');
  if(i===1&&KAIGOU.includes(N))o.push('魁罡');
  if(i!==1&&(b===kb||b===kb+1))o.push('空亡');
  return o;
}
function pairRel(X,Y){
  const a=X%10,b=Y%10,x=X%12,y=Y%12,o=[];
  if(X===Y)o.push('伏吟');
  if(Math.abs(a-b)===5)o.push(`干合${EL[KAN5[Math.min(a,b)]]}`);
  if(Math.abs(a-b)===6)o.push('干冲');
  if(tkdc(X,Y))o.push('天剋地冲');else if(isCh(x,y))o.push('冲');
  if((x+y)%12===1)o.push(`支合${EL[SHI6[Math.min(x,y)]]}`);
  if(isKei(x,y))o.push(x===y?'自刑':'刑');
  if((x+y)%12===7)o.push('害');
  if(isPo(x,y))o.push('破');
  const g=sg(x);if(x!==y&&g.slice(0,3).includes(y)&&(x===g[1]||y===g[1]))o.push(`半合${EL[g[3]]}`);
  return o;
}
function groups(bs){
  const o=[],h=x=>bs.includes(x),nm=g=>g.slice(0,3).map(x=>B[x]).join('');
  SANGO.forEach(g=>{if(g.slice(0,3).every(h))o.push(`三合${EL[g[3]]}局(${nm(g)})`)});
  HOU.forEach(g=>{if(g.slice(0,3).every(h))o.push(`方合${EL[g[3]]}(${nm(g)})`)});
  if([2,5,8].every(h))o.push('三刑(寅巳申)');
  if([1,10,7].every(h))o.push('三刑(丑戌未)');
  return o;
}
const newGroups=(base,add)=>{const g0=groups(base);return groups(base.concat(add)).filter(g=>!g0.includes(g))};
const relsTo=(N,P,use)=>use.map(i=>{const r=pairRel(N,P[i]);return r.length?`<b>${PS[i]}</b> ${r.join('・')}`:''}).filter(Boolean);
const zangS=(b,ds,main)=>ZWT[b].map(([z])=>{const t=`<span class="e${z>>1}">${S[z]}</span>${TSA[tsei(ds,z)]}`;return z===main?`<b>${t}</b>`:t}).join(' ');
const dmy=D=>`${pad(D.getUTCDate())}/${pad(D.getUTCMonth()+1)}/${D.getUTCFullYear()}`;
function pro(){
  const on=proOn;$('pro-band').hidden=!on;$('simple-read').hidden=on;$('simple-fc').hidden=on;if(!on||!PRO)return;
  const {P,noH,A,F,lonS,y,tz}=PRO,ds=P[1]%10,use=[0,1,2,3].filter(i=>!(i===0&&noH)),nat=use.map(i=>P[i]%12);
  const kb=mod(10-2*Math.floor(P[1]/10),12),yes=v=>v?'○':'×';
  // 胎元: tronco do mês +1, ramo do mês +3 · 命宮: põe a hora de nascimento no palácio do sol (pelo 中気) e conta até 卯
  const tai=idx(mod(P[2]%10+1,10),mod(P[2]%12+3,12));
  const sp=mod(10-Math.floor(lonS/30),12),mg=noH?null:mod(sp+3-P[0]%12,12);
  const mgN=mg===null?null:idx(mod((P[3]%10)*2+2+mod(mg-2,12),10),mg);
  $('pro-head').innerHTML=`<span>日主 <b>${S[ds]}</b> ${EL[ds>>1]}${ds%2?'陰':'陽'}</span><span><b>${A.strong?'身強':'身弱'}</b> 得令${yes(A.rei)} 得地${yes(A.chi)} 得勢${yes(A.sei)}</span><span>格局 <b>${A.K.k}</b></span><span>調候 ${A.tk.map(s=>S[s]).join('')}</span><span>喜 <b>${[...A.good].map(e=>EL[e]).join('')}</b></span><span>忌 ${A.bad.map(e=>EL[e]).join('')||'—'}</span><span>空亡 ${B[kb]}${B[kb+1]}</span><span>司令 ${S[A.srs]} <span class="note">(${Math.floor(A.since)+1}º dia após o 節入り)</span></span>`;
  const cols=[[PN[0],noH?null:P[0],0],[PN[1],P[1],1],[PN[2],P[2],2],[PN[3],P[3],3],['胎元',tai,-1],['命宮',mgN,-1]];
  const rows=[
    ['通変星',(N,i)=>i===1?'<b>日主</b>':tsei(ds,N%10)],
    ['天干',N=>`<span class="kk e${(N%10)>>1}">${S[N%10]}</span>`],
    ['地支',N=>`<span class="kk e${BE[N%12]}">${B[N%12]}</span>`],
    ['蔵干',(N,i)=>zangS(N%12,ds,i===2?A.srs:ZOU[N%12])],
    ['蔵干通変星',(N,i)=>tsei(ds,i===2?A.srs:ZOU[N%12])+(i===2?' <span class="note">(司令)</span>':'')],
    ['十二運',N=>u12(ds,N%12)],
    ['納音',N=>NAT[N>>1]],
    ['神殺',(N,i)=>shensha(N,i,P).join('<br>')||'—']];
  $('pro-chart').innerHTML=`<thead><tr><th></th>${cols.map(c=>`<th>${c[0]}</th>`).join('')}</tr></thead><tbody>${rows.map(([lab,f])=>`<tr><th>${lab}</th>${cols.map(([,N,i])=>`<td>${N===null?'—':f(N,i)}</td>`).join('')}</tr>`).join('')}</tbody>`;
  const nr=[];
  for(let a=0;a<use.length;a++)for(let c2=a+1;c2<use.length;c2++){const i=use[a],j=use[c2],r=pairRel(P[i],P[j]);if(r.length)nr.push(`<li><b>${PN[i]}–${PN[j]}</b>: ${r.map(x=>/合/.test(x)&&Math.abs(i-j)>1?x+'<sup>※</sup>':x).join('・')}</li>`)}
  groups(nat).forEach(g=>nr.push(`<li>${g}</li>`));
  $('pro-rel').innerHTML=nr.join('')||'<li>Nenhuma relação entre os pilares.</li>';
  // 大運
  const {dec,sa,fwd,bMs}=F,nowY=new Date(Date.now()+tz*36e5).getUTCFullYear();
  $('pro-dy-info').innerHTML=`${fwd?'順行':'逆行'} · 立運 ${Math.floor(sa)} anos e ${Math.round((sa-Math.floor(sa))*12)} meses · 交運 em ${dmy(new Date(bMs+sa*365.2425*864e5))}`;
  $('pro-dy').tBodies[0].innerHTML=dec.map(x=>{const N=x.N,r=relsTo(N,P,use).concat(newGroups(nat,[N%12]));
    return `<tr${x.cur?' class="cur"':''}><td class="mono">${Math.floor(x.a0)}–${Math.floor(x.a0)+9}</td><td class="mono">${x.y0}–${x.y0+9}</td><td class="kk2">${kan(N)}</td><td>${tsei(ds,N%10)}</td><td>${zangS(N%12,ds,ZOU[N%12])}</td><td>${u12(ds,N%12)}</td><td>${NAT[N>>1]}</td><td>${shensha(N,-1,P).join(' ')||'—'}</td><td class="rel">${r.join('<br>')||'—'}</td></tr>`}).join('');
  // 小運: parte do pilar da hora, na mesma direção do 大運, uma casa por ano (idade à moda antiga, 数え)
  const nS=Math.max(1,Math.floor(sa)+1);
  $('pro-sy').innerHTML=noH?'<p class="note">O 小運 parte do pilar da hora: informe a hora de nascimento.</p>':`<div class="scroll"><table class="pt"><thead><tr><th>Idade (数え)</th><th>Ano</th><th>干支</th><th>通変星</th><th>十二運</th><th>Relações com o mapa</th></tr></thead><tbody>${Array.from({length:nS},(_,k)=>{const N=mod(P[0]+(fwd?k+1:-(k+1)),60),r=relsTo(N,P,use);return `<tr><td class="mono">${k+1}</td><td class="mono">${y+k}</td><td class="kk2">${kan(N)}</td><td>${tsei(ds,N%10)}</td><td>${u12(ds,N%12)}</td><td class="rel">${r.join('<br>')||'—'}</td></tr>`}).join('')}</tbody></table></div>`;
  // 流年
  const yi=$('pro-y');if(!yi.value)yi.value=nowY;
  const y0=Math.max(1900,Math.min(2089,+yi.value||nowY));
  $('pro-ly').tBodies[0].innerHTML=Array.from({length:12},(_,k)=>{const yy=y0+k,N=mod(yy-4,60),D=dec.find(x=>yy>=x.y0&&yy<=x.y0+9);
    const r=relsTo(N,P,use).concat(newGroups(nat.concat(D?[D.N%12]:[]),[N%12]));
    const rd=D?pairRel(N,D.N):[];
    return `<tr${yy===nowY?' class="cur"':''}><td class="mono">${yy}<br><span class="note">${yy-y} anos</span></td><td class="kk2">${kan(N)}</td><td>${tsei(ds,N%10)}</td><td>${zangS(N%12,ds,ZOU[N%12])}</td><td>${u12(ds,N%12)}</td><td>${shensha(N,-1,P).join(' ')||'—'}</td><td class="rel">${r.join('<br>')||'—'}</td><td class="rel">${D?`<b>${kan(D.N)}</b>${rd.length?' '+rd.join('・'):''}`:'小運'}</td></tr>`}).join('');
}
let sel=42;
function grid(){
  $('g').innerHTML=Array.from({length:60},(_,n)=>`<button type="button" class="cell${n===sel?' on':''}" data-n="${n}">${kan(n)}<small>${n+1}</small></button>`).join('');
}
function years(){
  const cur=new Date().getFullYear(),ys=[];
  for(let y=1900;y<=2100;y++)if(mod(y-4,60)===sel)ys.push(y);
  $('yr').innerHTML=`<b>${kan(sel)}</b> (${yomi(sel)}, ${AN[sel%12]}): `+ys.map(y=>`<span class="${Math.abs(y-cur)<1?'now':''}">${y}</span>`).join('');
}
$('g').addEventListener('click',e=>{const c=e.target.closest('.cell');if(!c)return;sel=+c.dataset.n;grid();years()});
function setNow(){
  const tz=+$('tz').value,n=new Date(Date.now()+tz*36e5);
  $('d').value=`${n.getUTCFullYear()}-${pad(n.getUTCMonth()+1)}-${pad(n.getUTCDate())}`;
  $('t').value=`${pad(n.getUTCHours())}:${pad(n.getUTCMinutes())}`;
  calc();
}
$('city').addEventListener('change',()=>{const o=$('city').selectedOptions[0];if(o.dataset.lon){$('lon').value=o.dataset.lon;$('tz').value=o.dataset.tz}});
$('lon').addEventListener('input',()=>{$('city').value='x'});
$('f').addEventListener('input',calc);$('f').addEventListener('change',calc);
$('f').addEventListener('submit',e=>e.preventDefault());
$('now').addEventListener('click',setNow);
// o site não guarda nada no navegador; apaga o que versões anteriores tinham salvo
try{localStorage.removeItem('pro');localStorage.removeItem('tq-obs')}catch(e){}
let proOn=false;
const setMode=v=>{proOn=v;$('m-s').setAttribute('aria-pressed',String(!v));$('m-p').setAttribute('aria-pressed',String(v));pro()};
$('m-s').addEventListener('click',()=>setMode(false));
$('m-p').addEventListener('click',()=>setMode(true));
setMode(proOn);
$('pro-y').addEventListener('input',pro);
// API para os módulos (淘宮術, 九星, 姓名判断, 易): registram-se em KS.hooks e recebem KS.ctx a cada cálculo
window.KS=Object.assign(window.KS||{},{hooks:(window.KS&&window.KS.hooks)||[],mod,idx,S,B,AN,EL,ELP,SK,BK,kan,yomi,pad,dmy,sunLon,msToJd,jdToMs,termJd,TERMS,pillarsAt,$});
setNow();
}
