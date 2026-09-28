import type { Unit } from "./types";

// Română · capitolul 3 — basmul cult și nuvela: „Povestea lui Harap-Alb”,
// „Moara cu noroc”, „Alexandru Lăpușneanul”. Autori în domeniul public, deci
// citatele scurte sunt în regulă.

export const basmNuvela: Unit = {
  id: "basm-nuvela",
  subject: "romana",
  title: "Basmul și nuvela",
  blurb: "„Povestea lui Harap-Alb”, „Moara cu noroc” și „Alexandru Lăpușneanul”.",
  examRef: "Subiectul III",
  lessons: [
    {
      id: "harap-alb",
      title: "„Povestea lui Harap-Alb”",
      cards: [
        {
          type: "learn",
          title: "Basmul cult",
          body: "Ion Creangă publică „Povestea lui Harap-Alb” în 1877, în revista **Convorbiri literare**.\n\nE un **basm cult**: are autor, iar fantasticul e povestit cu umor, cu oralitate și cu personaje care se poartă ca niște țărani moldoveni.\n\n**Tema**: drumul maturizării. Fiul cel mic al craiului pleacă neștiutor și ajunge, prin probe, un om pregătit să fie împărat.",
        },
        {
          type: "choice",
          prompt: "Care este tema basmului „Povestea lui Harap-Alb”?",
          options: ["drumul maturizării eroului", "iubirea imposibilă", "setea de bani", "războiul"],
          answer: 0,
          explain: "E un basm al inițierii: eroul învață, prin încercări, ce înseamnă să fii om și conducător.",
        },
        {
          type: "learn",
          title: "Cum începe",
          body: "Incipitul e o formulă tipică: „Amu cică era odată...”.\n\nCraiul are trei feciori. Fratele lui, Verde-Împărat, n-are decât fete și îi cere un nepot care să-i urmeze la tron. Mezinul trece proba de curaj de la pod, unde tatăl lui, îmbrăcat într-o piele de urs, își încerca fiii.",
        },
        {
          type: "truefalse",
          prompt: "La pod, fiul craiului îl înfruntă pe tatăl său, deghizat în urs.",
          answer: true,
          explain: "Craiul își încearcă fiii îmbrăcat într-o piele de urs. Doar mezinul trece proba.",
        },
        {
          type: "learn",
          title: "Spânul și noul nume",
          body: "Deși tatăl îl sfătuise să se ferească de omul spân, fiul craiului îl ia ca slugă. Spânul îl păcălește să coboare într-o fântână și îi schimbă rolurile: fiul de crai devine sluga lui și primește numele **Harap-Alb**.\n\nNumele e un oximoron: „harap” înseamnă rob negru, dar el e alb. Rob și fiu de crai în același timp.\n\nSpânul e personajul negativ, dar și un „rău necesar”: fără el, eroul nu ar fi trecut prin probe și nu s-ar fi maturizat.",
        },
        {
          type: "choice",
          prompt: "Ce înseamnă numele „Harap-Alb”?",
          options: [
            "rob alb: un oximoron pentru fiul de crai ajuns slugă",
            "cavaler alb, adică erou fără pată",
            "numele de familie al craiului",
            "o poreclă dată de Sfânta Duminică",
          ],
          answer: 0,
          explain: "„Harap” = rob (negru). Numele arată condiția lui nouă: fiu de crai, dar slugă.",
        },
        {
          type: "learn",
          title: "Probele și ajutoarele",
          body: "Spânul îi cere trei probe: salata din Grădina Ursului, pielea cu pietre scumpe a Cerbului și fata Împăratului Roș.\n\nEroul e ajutat de **Sfânta Duminică**, de cal și de cinci tovarăși ciudați: **Gerilă, Flămânzilă, Setilă, Ochilă și Păsări-Lăți-Lungilă**.\n\nLa final, fata Împăratului Roș dezvăluie adevărul. Spânul îi taie capul lui Harap-Alb, calul îl pedepsește pe Spân, iar fata îl învie pe erou. Urmează nunta.",
        },
        {
          type: "choice",
          prompt: "Care dintre personaje NU se numără printre tovarășii lui Harap-Alb?",
          options: ["Spânul", "Gerilă", "Ochilă", "Setilă"],
          answer: 0,
          explain: "Spânul e antagonistul. Gerilă, Flămânzilă, Setilă, Ochilă și Păsări-Lăți-Lungilă sunt tovarășii.",
        },
        {
          type: "truefalse",
          prompt: "„Povestea lui Harap-Alb” este un basm popular, fără autor cunoscut.",
          answer: false,
          explain: "E basm cult: autorul e Ion Creangă.",
        },
      ],
    },
    {
      id: "moara-cu-noroc",
      title: "„Moara cu noroc”",
      cards: [
        {
          type: "learn",
          title: "Nuvela psihologică",
          body: "Ioan Slavici publică „Moara cu noroc” în volumul **„Novele din popor”** (1881).\n\nE o **nuvelă psihologică realistă**: urmărește cum se schimbă, pas cu pas, sufletul unui om prins de dorința de a se îmbogăți.\n\n**Tema**: consecințele dorinței de îmbogățire, care distruge liniștea și familia.",
        },
        {
          type: "learn",
          title: "Avertismentul de la început",
          body: "Nuvela se deschide cu vorbele bătrânei, soacra lui Ghiță:\n\n„Omul să fie mulțumit cu sărăcia sa, căci, dacă e vorba, nu bogăția, ci liniștea colibei tale te face fericit.”\n\nGhiță, cizmar sărac, nu ascultă. Ia în arendă cârciuma de la Moara cu noroc, un han izolat la răscruce de drumuri.",
        },
        {
          type: "choice",
          prompt: "Cine rostește cuvintele din incipitul nuvelei, despre mulțumirea cu sărăcia?",
          options: ["bătrâna, soacra lui Ghiță", "Ana", "Lică Sămădăul", "jandarmul Pintea"],
          answer: 0,
          explain: "Bătrâna deschide și închide nuvela: vocea înțelepciunii tradiționale.",
        },
        {
          type: "learn",
          title: "Ghiță și Lică",
          body: "La cârciumă apare **Lică Sămădăul**, șeful porcarilor, un om periculos care controlează drumurile. Ghiță se lasă atras treptat în afacerile lui murdare, de dragul banilor.\n\nSe îndepărtează de soția lui, **Ana**, și încearcă să joace la două capete, colaborând și cu jandarmul **Pintea**.\n\nConflictul e mai ales **interior**: între omul cinstit care a fost și omul lacom care devine.",
        },
        {
          type: "choice",
          prompt: "Ce fel de conflict domină nuvela?",
          options: [
            "un conflict interior, în sufletul lui Ghiță",
            "un conflict între două familii boierești",
            "un conflict între generații",
            "un conflict între țări",
          ],
          answer: 0,
          explain: "Nuvela e psihologică: centrul e lupta dintre cinstea și lăcomia lui Ghiță.",
        },
        {
          type: "learn",
          title: "Finalul",
          body: "Finalul e tragic. Ghiță o ucide pe Ana, care se dăduse lui Lică. Ghiță e împușcat din ordinul lui Lică, iar Lică, încolțit de Pintea, se sinucide lovindu-se cu capul de un copac. Hanul arde.\n\nBătrâna, care fusese plecată, rămâne cu copiii și închide povestea: „Simțeam eu că n-o să iasă bine; dar așa le-a fost dată!”",
        },
        {
          type: "truefalse",
          prompt: "La finalul nuvelei, Ghiță și Lică supraviețuiesc, iar hanul este vândut.",
          answer: false,
          explain: "Ana, Ghiță și Lică mor, iar hanul arde. Doar bătrâna și copiii supraviețuiesc.",
        },
        {
          type: "choice",
          prompt: "Unde se află cârciuma de la Moara cu noroc?",
          options: ["la o răscruce de drumuri, izolată", "în centrul Bucureștiului", "pe malul mării", "într-un sat de munte, lângă biserică"],
          answer: 0,
          explain: "Hanul e izolat, la răscruce: un loc al tentației și al pericolului.",
        },
      ],
    },
    {
      id: "lapusneanul",
      title: "„Alexandru Lăpușneanul”",
      cards: [
        {
          type: "learn",
          title: "Nuvela istorică romantică",
          body: "Costache Negruzzi publică „Alexandru Lăpușneanul” în 1840, în primul număr al revistei **Dacia literară**.\n\nE o **nuvelă istorică romantică**, inspirată din cronica lui Grigore Ureche: a doua domnie a lui Alexandru Lăpușneanu în Moldova.\n\n**Tema**: lupta pentru putere și cruzimea tiranului.",
        },
        {
          type: "learn",
          title: "Patru capitole, patru mottouri",
          body: "Fiecare capitol are un motto care rezumă ce urmează:\n\n**I.** „Dacă voi nu mă vreți, eu vă vreu...” (întoarcerea la tron)\n\n**II.** „Ai să dai samă, doamnă!” (doamna Ruxanda și răzbunarea)\n\n**III.** „Capul lui Moțoc vrem...” (uciderea boierilor și a lui Moțoc)\n\n**IV.** „De mă voi scula, pre mulți am să popesc și eu...” (sfârșitul tiranului)",
        },
        {
          type: "choice",
          prompt: "Care este mottoul primului capitol?",
          options: [
            "„Dacă voi nu mă vreți, eu vă vreu...”",
            "„Capul lui Moțoc vrem...”",
            "„Ai să dai samă, doamnă!”",
            "„De mă voi scula, pre mulți am să popesc și eu...”",
          ],
          answer: 0,
          explain: "E răspunsul lui Lăpușneanu către boierii care îi spun că țara nu-l vrea.",
        },
        {
          type: "learn",
          title: "Personajele",
          body: "**Alexandru Lăpușneanu**: domnitor crud, viclean, însetat de răzbunare. Un personaj romantic, excepțional în rău.\n\n**Doamna Ruxanda**: soția lui, blândă, care îi cere să oprească vărsarea de sânge.\n\n**Moțoc**: boier trădător și lingușitor, dat pe mâna mulțimii.\n\n**Spancioc și Stroici**: boierii tineri care fug și așteaptă răzbunarea.",
        },
        {
          type: "truefalse",
          prompt: "Moțoc este un boier trădător, pe care Lăpușneanu îl dă pe mâna mulțimii.",
          answer: true,
          explain: "Mulțimea cere „capul lui Moțoc”, iar domnitorul i-l dă, ca să scape el.",
        },
        {
          type: "learn",
          title: "Scena ospățului și finalul",
          body: "Lăpușneanu invită boierii la un ospăț și îi ucide pe 47 dintre ei. Din capetele lor face o piramidă, „leac de frică” pentru doamna Ruxanda.\n\nLa final, bolnav, se călugărește și îi amenință pe toți. Doamna Ruxanda, sfătuită de mitropolit și de Spancioc și Stroici, îl **otrăvește**.",
        },
        {
          type: "choice",
          prompt: "Cum moare Alexandru Lăpușneanu?",
          options: ["otrăvit", "în luptă", "executat de mulțime", "de bătrânețe, în liniște"],
          answer: 0,
          explain: "Doamna Ruxanda îi dă otrava, la îndemnul mitropolitului și al boierilor Spancioc și Stroici.",
        },
        {
          type: "choice",
          prompt: "Din ce sursă istorică s-a inspirat Negruzzi?",
          options: ["cronica lui Grigore Ureche", "Biblia", "basmele culese de Richard Kunisch", "presa vremii"],
          answer: 0,
          explain: "Negruzzi a pornit de la letopisețul lui Grigore Ureche.",
        },
      ],
    },
  ],
  test: [
    // Harap-Alb
    {
      lesson: "harap-alb",
      type: "choice",
      prompt: "În ce revistă a apărut „Povestea lui Harap-Alb”?",
      options: ["Convorbiri literare", "Dacia literară", "Sburătorul", "Gândirea"],
      answer: 0,
      explain: "În Convorbiri literare, în 1877.",
    },
    {
      lesson: "harap-alb",
      type: "choice",
      prompt: "Cine îl ajută pe fiul craiului încă de la începutul drumului, deghizată în cerșetoare?",
      options: ["Sfânta Duminică", "fata Împăratului Roș", "Ruxanda", "Cătălina"],
      answer: 0,
      explain: "Sfânta Duminică e ajutorul care îl sfătuiește pe erou.",
    },
    {
      lesson: "harap-alb",
      type: "truefalse",
      prompt: "Spânul poate fi văzut ca un „rău necesar” pentru maturizarea eroului.",
      answer: true,
      explain: "Fără probele impuse de Spân, eroul n-ar fi trecut prin inițiere.",
    },
    {
      lesson: "harap-alb",
      type: "choice",
      prompt: "Ce probă NU îi cere Spânul lui Harap-Alb?",
      options: ["să ucidă un balaur", "să aducă salata din Grădina Ursului", "să aducă pielea Cerbului", "să o aducă pe fata Împăratului Roș"],
      answer: 0,
      explain: "Probele sunt salata, pielea cerbului și fata Împăratului Roș.",
    },
    // Moara cu noroc
    {
      lesson: "moara-cu-noroc",
      type: "choice",
      prompt: "Cine este Lică Sămădăul?",
      options: ["șeful porcarilor, om periculos", "fratele Anei", "jandarmul din zonă", "hangiul dinaintea lui Ghiță"],
      answer: 0,
      explain: "Lică e sămădău: șeful porcarilor, care controlează drumurile.",
    },
    {
      lesson: "moara-cu-noroc",
      type: "choice",
      prompt: "În ce volum a apărut „Moara cu noroc”?",
      options: ["„Novele din popor”", "„Poemele luminii”", "„Cuvinte potrivite”", "„Joc secund”"],
      answer: 0,
      explain: "„Novele din popor” (1881).",
    },
    {
      lesson: "moara-cu-noroc",
      type: "truefalse",
      prompt: "Înainte de a lua cârciuma, Ghiță era cizmar.",
      answer: true,
      explain: "Da, un cizmar sărac care vrea mai mult.",
    },
    // Lăpușneanul
    {
      lesson: "lapusneanul",
      type: "choice",
      prompt: "Câți boieri sunt uciși la ospăț?",
      options: ["47", "12", "100", "3"],
      answer: 0,
      explain: "47 de boieri, ale căror capete fac piramida.",
    },
    {
      lesson: "lapusneanul",
      type: "choice",
      prompt: "Ce specie literară este „Alexandru Lăpușneanul”?",
      options: ["nuvelă istorică romantică", "basm cult", "roman realist", "comedie"],
      answer: 0,
      explain: "Nuvelă istorică, scrisă în spirit romantic, cu o construcție clasică, în patru capitole.",
    },
    {
      lesson: "lapusneanul",
      type: "truefalse",
      prompt: "Spancioc și Stroici sunt boierii care îl susțin pe Lăpușneanu până la capăt.",
      answer: false,
      explain: "Ei fug și se întorc la final ca să-i grăbească sfârșitul.",
    },
  ],
};
