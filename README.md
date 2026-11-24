# Os dez troncos e os doze ramos (十干十二支)

Site de estudo, em português, para experimentar e aprofundar o antigo calendário de 十干十二支 (*jikkan jūnishi*) a partir de uma data de nascimento. É um roteiro em partes:

- **Os dez troncos**: os cinco elementos em yang e yin (*kinoe*, *kinoto*…).
- **Os três yang**: o par 丙午 (*hi-no-e-uma*) e a decomposição de qualquer um dos 60 pares.
- **Os doze ramos**: ano, mês, dia e hora do nascimento, com o cálculo passo a passo, os seus animais, o equilíbrio dos elementos e um resumo da personalidade.
- **As três rodas** (天源術): os ramos do ano, do mês e do dia da concepção (nascimento − 265 dias).
- **O campo e a fisionomia** (畑): guia dos sinais de cada um dos doze nomes.
- **Os doze nomes** (滋 結 演 豊 奮 止 合 老 緩 堕 煉 実).
- **O aprimoramento do caráter** (淘宮術): virtudes, vícios e o que praticar.
- **O I Ching** (易): tiragem com varetas ou moedas, o hexagrama arrumado nos blocos de cálculo (算木) e as oito forças (八力).
- **O proveito, na prática**: reconhecer-se, compreender o outro e uma prática para o dia.
- Também: as nove estrelas (九星気学), a leitura do nome (姓名判断) e os quatro pilares (四柱推命), como referência.

É uma consulta pontual: **nada é guardado** no navegador e nenhum dado é enviado a lugar nenhum.

## Arquivos

```
index.html        página
css/style.css     estilos
js/app.js         calendário (troncos, ramos, 節入り, hora solar) e os quatro pilares
js/kanshi.js      os dez troncos e os doze ramos, fichas de "saiba mais"
js/toukyu.js      as três rodas, o campo, os doze nomes, o aprimoramento e o proveito
js/kyusei.js      as nove estrelas e as direções
js/eki.js         o I Ching
js/seimei.js      a leitura do nome
js/strokes.js     tabela de traços dos kanji (gerada a partir do Unihan, Unicode)
favicon.svg       ícone
```

Não há etapa de compilação: HTML, CSS e JavaScript puros. As fontes vêm do Google Fonts; sem internet, o site usa as fontes do sistema.

## Rodar localmente

Abra `index.html` no navegador ou sirva a pasta:

```
python -m http.server 8000
```

e acesse http://localhost:8000.

## Fontes

As regras de cálculo e as fontes de cada método estão listadas no próprio site, nas seções "Fontes" de cada parte e em "Fontes gerais".
