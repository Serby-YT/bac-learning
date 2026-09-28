import type { Unit } from "./types";

// Română · capitolul 5 — genul dramatic, „O scrisoare pierdută” (Caragiale,
// domeniu public) și „Iona” (Sorescu, sub drepturi de autor: doar descriere).

export const dramaturgie: Unit = {
  id: "dramaturgie",
  subject: "romana",
  title: "Dramaturgia",
  blurb: "Cum se citește un text dramatic, „O scrisoare pierdută” și „Iona”.",
  examRef: "Subiectele II și III",
  lessons: [
    {
      id: "genul-dramatic",
      title: "Genul dramatic",
      cards: [
        {
          type: "learn",
          title: "Un text făcut pentru scenă",
          body: "Textul dramatic e scris ca să fie jucat. Nu are narator: povestea înaintează prin **replicile** personajelor (dialog sau monolog).\n\nSe împarte în **acte** și **scene** (sau **tablouri**). La început apare **lista personajelor**.",
        },
        {
          type: "learn",
          title: "Didascaliile",
          body: "**Indicațiile scenice** (didascaliile) sunt notațiile autorului, de obicei între paranteze: cum arată decorul, cum se mișcă personajele, ce ton au.\n\nLa Subiectul II apare des cerința „Prezintă rolul notațiilor autorului în fragmentul dat”. Răspunsul: ele arată gesturi, stări sufletești, mișcarea în scenă și, uneori, ironia autorului.",
        },
        {
          type: "choice",
          prompt: "Cum se numesc indicațiile autorului dintr-un text dramatic?",
          options: ["didascalii", "replici", "mottouri", "strofe"],
          answer: 0,
          explain: "Didascaliile (indicațiile scenice) sunt vocea directă a autorului în textul dramatic.",
        },
        {
          type: "truefalse",
          prompt: "Textul dramatic are un narator care povestește acțiunea.",
          answer: false,
          explain: "Nu are narator. Acțiunea se vede prin replici și indicații scenice.",
        },
        {
          type: "learn",
          title: "Comedia și tipurile de comic",
          body: "**Comedia** stârnește râsul prin criticarea unor defecte omenești. Are de obicei un final fericit.\n\nTipuri de comic: de **caracter** (defecte ale personajelor), de **limbaj** (greșeli, ticuri verbale), de **situație** (încurcături, coincidențe), de **nume** (nume care caracterizează), de **moravuri**.",
        },
        {
          type: "choice",
          prompt: "Un personaj repetă mereu aceeași expresie, stâlcind cuvintele. Ce tip de comic e?",
          options: ["comic de limbaj", "comic de situație", "comic de nume", "comic de moravuri"],
          answer: 0,
          explain: "Greșelile de exprimare și ticurile verbale sunt comic de limbaj.",
        },
        {
          type: "choice",
          prompt: "Cum se numește vorbirea unui personaj singur pe scenă, cu sine însuși?",
          options: ["monolog", "dialog", "didascalie", "replică"],
          answer: 0,
          explain: "Monologul e vorbirea unui singur personaj, fără interlocutor.",
        },
      ],
    },
    {
      id: "scrisoarea-pierduta",
      title: "„O scrisoare pierdută”",
      cards: [
        {
          type: "learn",
          title: "Comedia lui Caragiale",
          body: "I. L. Caragiale joacă „O scrisoare pierdută” în **1884**. E o **comedie** în patru acte, de moravuri politice.\n\nAcțiunea se petrece „în capitala unui județ de munte, în zilele noastre”, în timpul alegerilor.\n\n**Tema**: lupta pentru putere, cu șantaj, ipocrizie și demagogie.",
        },
        {
          type: "learn",
          title: "Intriga",
          body: "Nae **Cațavencu** găsește o scrisoare de amor trimisă de prefectul **Ștefan Tipătescu** către **Zoe**, soția lui **Zaharia Trahanache**, președintele comitetelor locale. Cu ea îl șantajează pe Tipătescu ca să fie ales deputat.\n\nScrisoarea, pierdută, fusese găsită întâi de **Cetățeanul turmentat**, un personaj amețit care vrea doar s-o ducă „la andrisant”. De la el ajunge la Cațavencu.",
        },
        {
          type: "choice",
          prompt: "Cine găsește scrisoarea și o folosește pentru șantaj?",
          options: ["Nae Cațavencu", "Zaharia Trahanache", "Agamiță Dandanache", "Cetățeanul turmentat"],
          answer: 0,
          explain: "Cațavencu vrea candidatura în schimbul scrisorii.",
        },
        {
          type: "learn",
          title: "Deznodământul",
          body: "Nu câștigă nimeni dintre cei care s-au certat. De la centru vine un candidat nou, **Agamiță Dandanache**, care și el ajunsese acolo tot prin șantaj, cu o scrisoare pe care o păstrează „pentru altă dată”.\n\nCațavencu își pierde scrisoarea, Cetățeanul turmentat i-o dă înapoi lui Zoe, iar toată lumea se împacă la o petrecere. Replica emblematică a lui Trahanache: „Ai puțintică răbdare”.",
        },
        {
          type: "truefalse",
          prompt: "La final, Cațavencu este ales deputat.",
          answer: false,
          explain: "E ales Agamiță Dandanache, trimis de la centru.",
        },
        {
          type: "learn",
          title: "Numele care caracterizează",
          body: "Caragiale alege numele cu intenție (comic de nume):\n\n**Cațavencu** amintește de „cață” (femeie rea, gureșă). **Trahanache** vine de la „trahana”, o cocă moale ce ia orice formă. **Farfuridi** sugerează „farfara” (om de nimic). **Dandanache** amintește de „dandana” (încurcătură).",
        },
        {
          type: "choice",
          prompt: "Ce sugerează numele „Trahanache”?",
          options: [
            "o fire moale, care se adaptează la orice",
            "curajul unui luptător",
            "bogăția și noblețea",
            "înțelepciunea unui bătrân",
          ],
          answer: 0,
          explain: "Trahanaua e o cocă moale care ia forma vasului: la fel se adaptează Trahanache.",
        },
      ],
    },
    {
      id: "iona",
      title: "„Iona”",
      cards: [
        {
          type: "learn",
          title: "Parabola lui Sorescu",
          body: "Marin Sorescu publică „Iona” în **1968**, cu subtitlul „tragedie în patru tablouri”. E o piesă **neomodernistă**, cu influențe din teatrul absurdului.\n\nPornește de la mitul biblic al profetului Iona, înghițit de un pește, dar îl transformă într-o **parabolă** despre condiția omului.\n\n**Tema**: singurătatea omului și căutarea libertății și a sensului.",
        },
        {
          type: "learn",
          title: "Un singur personaj",
          body: "Iona e un pescar, singur pe scenă aproape tot timpul. Vorbește cu sine sau cu ecoul, într-un **monolog dialogat**: se împarte în două ca să aibă cu cine să vorbească.\n\nMai apar doar doi pescari tăcuți, spre final.",
        },
        {
          type: "choice",
          prompt: "Ce formă are aproape tot discursul lui Iona?",
          options: [
            "monolog dialogat: vorbește cu sine sau cu ecoul",
            "dialog cu Dumnezeu",
            "scrisori către familie",
            "cântece populare",
          ],
          answer: 0,
          explain: "Singur, Iona se dedublează: întreabă și își răspunde singur.",
        },
        {
          type: "learn",
          title: "Tablourile și finalul",
          body: "Iona e înghițit de un pește, apoi ajunge în burta altuia și a altuia. Fiecare ieșire dă într-o nouă închisoare.\n\nÎn ultimul tablou, afară, pe o plajă, descoperă că orizontul e tot o burtă de pește. Hotărăște să-și caute libertatea înăuntrul lui: își spintecă burta. Gestul e o **sinucidere simbolică**, dar și o victorie: omul își găsește singur calea spre lumină.",
        },
        {
          type: "truefalse",
          prompt: "„Iona” are subtitlul „tragedie în patru tablouri”.",
          answer: true,
          explain: "Da, deși piesa amestecă tragicul cu ironia și absurdul.",
        },
        {
          type: "choice",
          prompt: "Ce simbolizează peștii care îl înghit pe Iona unul după altul?",
          options: [
            "limitele care îl închid pe om, una după alta",
            "hrana și bogăția",
            "prietenii lui Iona",
            "marea ca loc al vacanței",
          ],
          answer: 0,
          explain: "Fiecare pește e o nouă închisoare: lumea, societatea, propria condiție.",
        },
      ],
    },
  ],
  test: [
    // genul dramatic
    {
      lesson: "genul-dramatic",
      type: "choice",
      prompt: "În ce unități se împarte o operă dramatică?",
      options: ["acte și scene", "strofe și versuri", "capitole și paragrafe", "cânturi"],
      answer: 0,
      explain: "Acte și scene (sau tablouri).",
    },
    {
      lesson: "genul-dramatic",
      type: "choice",
      prompt: "Două personaje cu același costum sunt confundate. Ce tip de comic e?",
      options: ["comic de situație", "comic de limbaj", "comic de nume", "comic de caracter"],
      answer: 0,
      explain: "Încurcăturile și confuziile țin de comicul de situație.",
    },
    {
      lesson: "genul-dramatic",
      type: "truefalse",
      prompt: "Didascaliile pot arăta starea sufletească a unui personaj.",
      answer: true,
      explain: "De exemplu: „(furios)”, „(încurcat)”, „(cu lacrimi în ochi)”.",
    },
    // Scrisoarea
    {
      lesson: "scrisoarea-pierduta",
      type: "choice",
      prompt: "Cui îi este adresată scrisoarea de amor a lui Tipătescu?",
      options: ["Zoei Trahanache", "Otiliei", "Elei", "Anei"],
      answer: 0,
      explain: "Zoe, soția lui Zaharia Trahanache.",
    },
    {
      lesson: "scrisoarea-pierduta",
      type: "choice",
      prompt: "Cine găsește primul scrisoarea pierdută?",
      options: ["Cetățeanul turmentat", "Tipătescu", "Farfuridi", "Dandanache"],
      answer: 0,
      explain: "Cetățeanul turmentat o găsește și vrea s-o returneze. Cațavencu i-o ia.",
    },
    {
      lesson: "scrisoarea-pierduta",
      type: "choice",
      prompt: "Câte acte are „O scrisoare pierdută”?",
      options: ["patru", "trei", "cinci", "două"],
      answer: 0,
      explain: "Patru acte.",
    },
    {
      lesson: "scrisoarea-pierduta",
      type: "truefalse",
      prompt: "Agamiță Dandanache a ajuns candidat tot prin șantaj.",
      answer: true,
      explain: "Și el are o scrisoare compromițătoare, pe care o păstrează pentru altă dată.",
    },
    // Iona
    {
      lesson: "iona",
      type: "choice",
      prompt: "Ce meserie are Iona?",
      options: ["pescar", "profesor", "marinar pe un vas de război", "cizmar"],
      answer: 0,
      explain: "Iona e pescar.",
    },
    {
      lesson: "iona",
      type: "choice",
      prompt: "Cărui curent îi aparține piesa „Iona”?",
      options: ["neomodernismului", "romantismului", "realismului", "tradiționalismului"],
      answer: 0,
      explain: "Marin Sorescu face parte din generația neomodernistă a anilor '60.",
    },
    {
      lesson: "iona",
      type: "truefalse",
      prompt: "„Iona” pornește de la o poveste biblică.",
      answer: true,
      explain: "Profetul Iona, înghițit de un pește mare, din Vechiul Testament.",
    },
  ],
};
