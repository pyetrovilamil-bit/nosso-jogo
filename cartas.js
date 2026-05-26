const cartas = [

{nome:"Hidrogênio",simbolo:"H",numero:1,familia:"Não-metal",ataque:40,defesa:30,raridade:"COMUM",curiosidade:"Elemento mais abundante do universo"},

{nome:"Hélio",simbolo:"He",numero:2,familia:"Gás Nobre",ataque:35,defesa:60,raridade:"COMUM",curiosidade:"Usado em balões"},

{nome:"Lítio",simbolo:"Li",numero:3,familia:"Metal Alcalino",ataque:50,defesa:45,raridade:"COMUM",curiosidade:"Usado em baterias"},

{nome:"Berílio",simbolo:"Be",numero:4,familia:"Metal Alcalino-terroso",ataque:52,defesa:50,raridade:"COMUM",curiosidade:"Metal leve e resistente"},

{nome:"Boro",simbolo:"B",numero:5,familia:"Semimetal",ataque:55,defesa:55,raridade:"COMUM",curiosidade:"Usado em vidros resistentes"},

{nome:"Carbono",simbolo:"C",numero:6,familia:"Não-metal",ataque:65,defesa:60,raridade:"RARO",curiosidade:"Base da vida orgânica"},

{nome:"Nitrogênio",simbolo:"N",numero:7,familia:"Não-metal",ataque:68,defesa:58,raridade:"COMUM",curiosidade:"78% do ar atmosférico"},

{nome:"Oxigênio",simbolo:"O",numero:8,familia:"Calcogênios",ataque:70,defesa:50,raridade:"COMUM",curiosidade:"21% da atmosfera terrestre"},

{nome:"Flúor",simbolo:"F",numero:9,familia:"Halogênios",ataque:72,defesa:48,raridade:"RARO",curiosidade:"Usado em cremes dentais"},

{nome:"Neônio",simbolo:"Ne",numero:10,familia:"Gás Nobre",ataque:45,defesa:70,raridade:"COMUM",curiosidade:"Usado em letreiros luminosos"},

{nome:"Sódio",simbolo:"Na",numero:11,familia:"Metal Alcalino",ataque:60,defesa:45,raridade:"COMUM",curiosidade:"Presente no sal de cozinha"},

{nome:"Magnésio",simbolo:"Mg",numero:12,familia:"Metal Alcalino-terroso",ataque:63,defesa:60,raridade:"COMUM",curiosidade:"Importante para músculos"},

{nome:"Alumínio",simbolo:"Al",numero:13,familia:"Metal Representativo",ataque:65,defesa:70,raridade:"COMUM",curiosidade:"Muito usado em latas"},

{nome:"Silício",simbolo:"Si",numero:14,familia:"Semimetal",ataque:68,defesa:72,raridade:"RARO",curiosidade:"Base dos computadores"},

{nome:"Fósforo",simbolo:"P",numero:15,familia:"Não-metal",ataque:70,defesa:60,raridade:"RARO",curiosidade:"Usado em fertilizantes"},

{nome:"Enxofre",simbolo:"S",numero:16,familia:"Calcogênios",ataque:72,defesa:62,raridade:"COMUM",curiosidade:"Tem cheiro forte"},

{nome:"Cloro",simbolo:"Cl",numero:17,familia:"Halogênios",ataque:75,defesa:58,raridade:"RARO",curiosidade:"Usado em piscinas"},

{nome:"Argônio",simbolo:"Ar",numero:18,familia:"Gás Nobre",ataque:50,defesa:80,raridade:"COMUM",curiosidade:"Usado em lâmpadas"},

{nome:"Potássio",simbolo:"K",numero:19,familia:"Metal Alcalino",ataque:78,defesa:60,raridade:"RARO",curiosidade:"Importante para nervos"},

{nome:"Cálcio",simbolo:"Ca",numero:20,familia:"Metal Alcalino-terroso",ataque:80,defesa:75,raridade:"RARO",curiosidade:"Forma ossos e dentes"},

{nome:"Escândio",simbolo:"Sc",numero:21,familia:"Metal de Transição",ataque:82,defesa:78,raridade:"RARO",curiosidade:"Usado em ligas metálicas"},

{nome:"Titânio",simbolo:"Ti",numero:22,familia:"Metal de Transição",ataque:88,defesa:92,raridade:"ÉPICO",curiosidade:"Muito resistente e leve"},

{nome:"Vanádio",simbolo:"V",numero:23,familia:"Metal de Transição",ataque:84,defesa:80,raridade:"RARO",curiosidade:"Usado em aço"},

{nome:"Cromo",simbolo:"Cr",numero:24,familia:"Metal de Transição",ataque:86,defesa:85,raridade:"RARO",curiosidade:"Dá brilho aos metais"},

{nome:"Manganês",simbolo:"Mn",numero:25,familia:"Metal de Transição",ataque:85,defesa:83,raridade:"RARO",curiosidade:"Usado em pilhas"},

{nome:"Ferro",simbolo:"Fe",numero:26,familia:"Metal de Transição",ataque:90,defesa:95,raridade:"ÉPICO",curiosidade:"Muito usado na construção"},

{nome:"Cobalto",simbolo:"Co",numero:27,familia:"Metal de Transição",ataque:88,defesa:88,raridade:"RARO",curiosidade:"Usado em baterias"},

{nome:"Níquel",simbolo:"Ni",numero:28,familia:"Metal de Transição",ataque:87,defesa:90,raridade:"RARO",curiosidade:"Resistente à corrosão"},

{nome:"Cobre",simbolo:"Cu",numero:29,familia:"Metal de Transição",ataque:86,defesa:82,raridade:"RARO",curiosidade:"Excelente condutor elétrico"},

{nome:"Zinco",simbolo:"Zn",numero:30,familia:"Metal de Transição",ataque:82,defesa:84,raridade:"COMUM",curiosidade:"Protege contra ferrugem"},

{nome:"Prata",simbolo:"Ag",numero:47,familia:"Metal de Transição",ataque:94,defesa:90,raridade:"LENDÁRIO",curiosidade:"Metal precioso brilhante"},

{nome:"Ouro",simbolo:"Au",numero:79,familia:"Metal de Transição",ataque:98,defesa:96,raridade:"LENDÁRIO",curiosidade:"Muito valioso e raro"},

{nome:"Mercúrio",simbolo:"Hg",numero:80,familia:"Metal de Transição",ataque:96,defesa:82,raridade:"ÉPICO",curiosidade:"Metal líquido"},

{nome:"Chumbo",simbolo:"Pb",numero:82,familia:"Metal Representativo",ataque:92,defesa:94,raridade:"ÉPICO",curiosidade:"Metal pesado tóxico"},

{nome:"Radônio",simbolo:"Rn",numero:86,familia:"Gás Nobre",ataque:95,defesa:90,raridade:"LENDÁRIO",curiosidade:"Elemento radioativo"},

{nome:"Frâncio",simbolo:"Fr",numero:87,familia:"Metal Alcalino",ataque:99,defesa:88,raridade:"LENDÁRIO",curiosidade:"Extremamente raro"},

{nome:"Urânio",simbolo:"U",numero:92,familia:"Actinídeos",ataque:100,defesa:95,raridade:"LENDÁRIO",curiosidade:"Usado em energia nuclear"},

{nome:"Plutônio",simbolo:"Pu",numero:94,familia:"Actinídeos",ataque:100,defesa:98,raridade:"LENDÁRIO",curiosidade:"Altamente radioativo"},

{nome:"Amerício",simbolo:"Am",numero:95,familia:"Actinídeos",ataque:97,defesa:90,raridade:"ÉPICO",curiosidade:"Usado em detectores de fumaça"},

{nome:"Einstênio",simbolo:"Es",numero:99,familia:"Actinídeos",ataque:98,defesa:92,raridade:"LENDÁRIO",curiosidade:"Nomeado em homenagem a Einstein"},

{nome:"Oganessônio",simbolo:"Og",numero:118,familia:"Gás Nobre",ataque:120,defesa:120,raridade:"MITICO",curiosidade:"Último elemento da tabela periódica"}

];
