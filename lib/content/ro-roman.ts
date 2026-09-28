import type { Unit } from "./types";

// Română · capitolul 4 — romanele de studiat: „Ion”, „Enigma Otiliei”,
// „Ultima noapte de dragoste, întâia noapte de război”, „Moromeții”.
// Autori încă sub drepturi de autor: descriem, nu cităm.

export const roman: Unit = {
  id: "roman",
  subject: "romana",
  title: "Romanul",
  blurb: "„Ion”, „Enigma Otiliei”, „Ultima noapte de dragoste...” și „Moromeții”.",
  examRef: "Subiectul III",
  lessons: [
    {
      id: "ion",
      title: "„Ion”",
      cards: [
        {
          type: "learn",
          title: "Romanul realist obiectiv",
          body: "Liviu Rebreanu publică „Ion” în **1920**. E un roman **realist, obiectiv**: naratorul e omniscient, la persoana a III-a, și nu își judecă personajele.\n\nAcțiunea se petrece în satul ardelean **Pripas**, la începutul secolului XX.\n\n**Tema**: pământul, și dorința obsesivă a țăranului de a-l avea.",
        },
        {
          type: "learn",
          title: "Glasul pământului, glasul iubirii",
          body: "Romanul are două părți: **„Glasul pământului”** și **„Glasul iubirii”**. Ele numesc cele două patimi ale lui Ion.\n\nIon e sărac, dar harnic și orgolios. O iubește pe **Florica**, tot săracă, dar se însoară cu **Ana**, fata bogatului Vasile Baciu, ca să pună mâna pe pământul ei.",
        },
        {
          type: "choice",
          prompt: "De ce se căsătorește Ion cu Ana?",
          options: ["pentru pământul tatălui ei", "din dragoste adevărată", "pentru că îl obligă preotul", "ca să plece din sat"],
          answer: 0,
          explain: "Ana e zestrea: Ion vrea pământurile lui Vasile Baciu. Pe Florica o iubea.",
        },
        {
          type: "learn",
          title: "Structura circulară",
          body: "Romanul începe și se termină cu imaginea **drumului** care intră și iese din satul Pripas. Cartea se deschide ca o poartă spre o lume și se închide la fel: o **structură circulară**.\n\nPrima scenă importantă e **hora** de duminică, unde apar aproape toate personajele și conflictele.",
        },
        {
          type: "truefalse",
          prompt: "Romanul „Ion” are o structură circulară, marcată de imaginea drumului.",
          answer: true,
          explain: "Drumul deschide și închide romanul.",
        },
        {
          type: "learn",
          title: "Destinul lui Ion",
          body: "Scena-cheie: Ion **sărută pământul**, ca pe o ființă iubită, după ce îl obține.\n\nDar victoria îl distruge. Ana, disprețuită, se sinucide, iar copilul lor moare. Ion se întoarce la Florica, acum soția lui George Bulbuc, iar George îl ucide.",
        },
        {
          type: "choice",
          prompt: "Cine îl ucide pe Ion?",
          options: ["George Bulbuc", "Vasile Baciu", "Titu Herdelea", "preotul Belciug"],
          answer: 0,
          explain: "George, soțul Floricăi, îl surprinde pe Ion și îl ucide.",
        },
        {
          type: "choice",
          prompt: "Ce fel de narator are romanul „Ion”?",
          options: [
            "omniscient, la persoana a III-a",
            "narator-personaj, la persoana I",
            "mai mulți naratori care își dau ștafeta",
            "nu are narator, e doar dialog",
          ],
          answer: 0,
          explain: "Rebreanu construiește un roman obiectiv: naratorul știe tot, dar nu comentează.",
        },
      ],
    },
    {
      id: "enigma-otiliei",
      title: "„Enigma Otiliei”",
      cards: [
        {
          type: "learn",
          title: "Romanul balzacian",
          body: "George Călinescu publică „Enigma Otiliei” în **1938**. E un roman **realist de tip balzacian**, cu elemente moderne.\n\nTitlul inițial era „Părinții Otiliei”, pentru că romanul urmărește și tema **paternității**, pe lângă cea a **moștenirii** și a lăcomiei.\n\nAcțiunea: Bucureștiul de la începutul secolului XX.",
        },
        {
          type: "learn",
          title: "Personajele",
          body: "**Felix Sima**, orfan, vine să locuiască la tutorele lui, **Costache Giurgiuveanu**, un bătrân avar.\n\n**Otilia Mărculescu**, fiica vitregă a lui moș Costache, e tânără, imprevizibilă, fermecătoare.\n\n**Aglae Tulea**, sora lui Costache, și familia ei vor moștenirea. **Stănică Rațiu**, ginerele Aglaei, e arivistul fără scrupule. **Leonida Pascalopol** e moșierul elegant care o iubește pe Otilia.",
        },
        {
          type: "choice",
          prompt: "Cine este Felix Sima?",
          options: ["un tânăr orfan, venit la tutorele său", "fratele Otiliei", "moșierul care o iubește pe Otilia", "ginerele Aglaei"],
          answer: 0,
          explain: "Felix e orfanul care vine în casa lui moș Costache; prin ochii lui descoperim lumea romanului.",
        },
        {
          type: "learn",
          title: "Finalul și enigma",
          body: "Moș Costache nu o înfiază legal pe Otilia. Stănică Rațiu îi fură banii, iar bătrânul moare.\n\nOtilia pleacă cu Pascalopol, iar Felix devine medic. Ani mai târziu, vede o fotografie a Otiliei, schimbată, și nu o mai recunoaște. Enigma rămâne: nimeni n-a înțeles-o cu adevărat.",
        },
        {
          type: "choice",
          prompt: "Cine îi fură banii lui moș Costache?",
          options: ["Stănică Rațiu", "Felix Sima", "Pascalopol", "Otilia"],
          answer: 0,
          explain: "Stănică, arivistul, îi ia banii, iar șocul grăbește moartea bătrânului.",
        },
        {
          type: "truefalse",
          prompt: "La final, Otilia se căsătorește cu Felix.",
          answer: false,
          explain: "Otilia pleacă cu Pascalopol. Felix își urmează cariera de medic.",
        },
      ],
    },
    {
      id: "ultima-noapte",
      title: "„Ultima noapte de dragoste...”",
      cards: [
        {
          type: "learn",
          title: "Romanul subiectiv",
          body: "Camil Petrescu publică „Ultima noapte de dragoste, întâia noapte de război” în **1930**. E un roman **modern, psihologic, subiectiv**.\n\nNaratorul e personajul principal, **Ștefan Gheorghidiu**, care povestește la **persoana I** ce trăiește și ce gândește. Autorul caută **autenticitatea**: să scrii doar ce ai trăit tu.",
        },
        {
          type: "learn",
          title: "Două părți",
          body: "**Partea I**, „Ultima noapte de dragoste”: povestea căsniciei cu **Ela** și gelozia lui Ștefan.\n\n**Partea a II-a**, „Întâia noapte de război”: experiența frontului din Primul Război Mondial.\n\nRomanul începe în primăvara lui 1916, pe front, la o discuție între ofițeri despre dragoste. Discuția îi trezește amintirile.",
        },
        {
          type: "learn",
          title: "Ștefan și Ela",
          body: "Ștefan, student la filozofie, se căsătorește cu Ela, colega lui. După ce primesc o moștenire de la unchiul Tache, Ela intră în lumea mondenă, iar Ștefan începe să se îndoiască de fidelitatea ei. Un moment important: excursia la Odobești.\n\nRăzboiul pune totul în altă lumină. La final, Ștefan îi lasă Elei casa și banii, adică tot trecutul.",
        },
        {
          type: "choice",
          prompt: "Ce sentiment îl domină pe Ștefan Gheorghidiu în prima parte a romanului?",
          options: ["gelozia", "setea de pământ", "dorința de răzbunare politică", "frica de sărăcie"],
          answer: 0,
          explain: "Prima parte e o analiză a geloziei și a îndoielii.",
        },
        {
          type: "truefalse",
          prompt: "Romanul are un narator omniscient, la persoana a III-a.",
          answer: false,
          explain: "Naratorul e Ștefan Gheorghidiu, la persoana I: romanul e subiectiv.",
        },
        {
          type: "choice",
          prompt: "În ce război se petrece a doua parte a romanului?",
          options: ["Primul Război Mondial", "Al Doilea Război Mondial", "Războiul de Independență", "Războiul Crimeii"],
          answer: 0,
          explain: "Intrarea României în Primul Război Mondial, în 1916.",
        },
      ],
    },
    {
      id: "morometii",
      title: "„Moromeții”",
      cards: [
        {
          type: "learn",
          title: "Romanul realist postbelic",
          body: "Marin Preda publică primul volum din „Moromeții” în **1955**. Acțiunea se petrece în satul **Siliștea-Gumești**, din Câmpia Dunării, cu câțiva ani înainte de Al Doilea Război Mondial.\n\n**Tema**: destrămarea familiei țărănești tradiționale și a unei lumi întregi.\n\nIncipitul spune că, atunci, timpul părea răbdător cu oamenii. Finalul volumului I întoarce ideea: timpul nu mai are răbdare.",
        },
        {
          type: "learn",
          title: "Familia Moromete",
          body: "**Ilie Moromete**, capul familiei, e un țăran ironic, contemplativ, care iubește discuțiile politice din **poiana lui Iocan**, unde se citește ziarul.\n\nSoția lui, **Catrina**. Fiii din prima căsătorie, **Paraschiv, Nilă și Achim**, vor să plece la oraș. Copiii Catrinei și ai lui Moromete: **Tita, Ilinca și Niculae**.\n\nScena **cinei**, cu toată familia la masă, arată deja tensiunile dintre ei.",
        },
        {
          type: "choice",
          prompt: "Unde se adună bărbații din sat ca să citească ziarul și să discute politică?",
          options: ["în poiana lui Iocan", "la cârciuma de la Moara cu noroc", "la primărie", "în curtea bisericii"],
          answer: 0,
          explain: "Poiana lui Iocan e locul unde Moromete își arată inteligența și ironia.",
        },
        {
          type: "learn",
          title: "Semnele destrămării",
          body: "Moromete taie **salcâmul** din spatele casei: un simbol al stabilității care se prăbușește.\n\nAchim pleacă la București cu oile familiei și nu mai trimite banii promiși. Paraschiv și Nilă fug și ei, cu restul animalelor. Moromete, care credea că poate ține totul în echilibru, rămâne învins.",
        },
        {
          type: "truefalse",
          prompt: "Tăierea salcâmului anunță simbolic destrămarea familiei Moromete.",
          answer: true,
          explain: "Salcâmul era un reper al gospodăriei. Căderea lui prevestește prăbușirea familiei.",
        },
        {
          type: "choice",
          prompt: "Cum îl caracterizezi pe Ilie Moromete?",
          options: [
            "ironic, contemplativ, atașat de o lume care dispare",
            "avar și lipsit de umor",
            "violent și obsedat de pământ, ca Ion",
            "un orășean venit la țară",
          ],
          answer: 0,
          explain: "Moromete e un țăran inteligent și ironic, care privește lumea cu detașare.",
        },
      ],
    },
  ],
  test: [
    // Ion
    {
      lesson: "ion",
      type: "choice",
      prompt: "Cum se numesc cele două părți ale romanului „Ion”?",
      options: [
        "„Glasul pământului” și „Glasul iubirii”",
        "„Ultima noapte de dragoste” și „Întâia noapte de război”",
        "„Începutul” și „Sfârșitul”",
        "„Satul” și „Orașul”",
      ],
      answer: 0,
      explain: "Numele celor două patimi ale lui Ion.",
    },
    {
      lesson: "ion",
      type: "choice",
      prompt: "În ce sat se petrece acțiunea din „Ion”?",
      options: ["Pripas", "Siliștea-Gumești", "Odobești", "Fălticeni"],
      answer: 0,
      explain: "Satul ardelean Pripas.",
    },
    {
      lesson: "ion",
      type: "truefalse",
      prompt: "Ion o iubește pe Florica, dar se căsătorește cu Ana.",
      answer: true,
      explain: "Alege pământul Anei, nu iubirea pentru Florica.",
    },
    // Enigma Otiliei
    {
      lesson: "enigma-otiliei",
      type: "choice",
      prompt: "Care era titlul inițial al romanului „Enigma Otiliei”?",
      options: ["„Părinții Otiliei”", "„Moștenirea”", "„Felix”", "„Casa din strada Antim”"],
      answer: 0,
      explain: "„Părinții Otiliei”: accentul cădea pe tema paternității.",
    },
    {
      lesson: "enigma-otiliei",
      type: "choice",
      prompt: "Ce trăsătură îl definește pe moș Costache Giurgiuveanu?",
      options: ["avariția", "generozitatea", "curajul", "ambiția politică"],
      answer: 0,
      explain: "E avarul balzacian care amână mereu înfierea Otiliei ca să nu-și piardă banii.",
    },
    {
      lesson: "enigma-otiliei",
      type: "truefalse",
      prompt: "Leonida Pascalopol este un moșier care o iubește pe Otilia.",
      answer: true,
      explain: "Da, iar la final Otilia pleacă cu el.",
    },
    // Ultima noapte
    {
      lesson: "ultima-noapte",
      type: "choice",
      prompt: "Ce studiază Ștefan Gheorghidiu?",
      options: ["filozofie", "medicină", "drept", "teologie"],
      answer: 0,
      explain: "E student la filozofie, un intelectual care analizează totul.",
    },
    {
      lesson: "ultima-noapte",
      type: "choice",
      prompt: "Cum se numește soția lui Ștefan Gheorghidiu?",
      options: ["Ela", "Otilia", "Ana", "Zoe"],
      answer: 0,
      explain: "Ela, colega lui de facultate.",
    },
    {
      lesson: "ultima-noapte",
      type: "truefalse",
      prompt: "Camil Petrescu urmărește autenticitatea: scrie doar din perspectiva a ceea ce trăiește personajul-narator.",
      answer: true,
      explain: "Autenticitatea e principiul central al romanului lui modern.",
    },
    // Moromeții
    {
      lesson: "morometii",
      type: "choice",
      prompt: "Cine pleacă primul la București cu oile familiei?",
      options: ["Achim", "Niculae", "Ilie Moromete", "Catrina"],
      answer: 0,
      explain: "Achim pleacă cu oile și nu mai trimite banii.",
    },
    {
      lesson: "morometii",
      type: "choice",
      prompt: "Care este tema romanului „Moromeții”?",
      options: [
        "destrămarea familiei țărănești tradiționale",
        "gelozia unui intelectual",
        "moștenirea unui avar",
        "maturizarea unui fiu de crai",
      ],
      answer: 0,
      explain: "Familia Moromete se destramă odată cu lumea satului tradițional.",
    },
    {
      lesson: "morometii",
      type: "truefalse",
      prompt: "Primul volum din „Moromeții” a apărut în 1920.",
      answer: false,
      explain: "În 1955. În 1920 a apărut „Ion”.",
    },
  ],
};
