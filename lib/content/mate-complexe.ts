import type { Unit } from "./types";

// Matematică · capitolul 4 — numere complexe în formă algebrică.
// La bac: Subiectul I, la M1 și la M2 (clasa a X-a).

export const complexe: Unit = {
  id: "complexe",
  subject: "matematica",
  title: "Numere complexe",
  blurb: "Forma algebrică, puterile lui i, conjugatul, modulul și ecuațiile cu Δ negativ.",
  examRef: "Subiectul I",
  lessons: [
    {
      id: "complexe-forma",
      title: "Forma algebrică",
      cards: [
        {
          type: "learn",
          title: "Numărul i",
          body: "Numerele complexe pornesc de la un număr nou, $i$, cu proprietatea:\n\n$$i^2 = -1$$\n\nOrice număr complex se scrie $z = a + bi$, cu $a, b$ reale. $a$ este **partea reală**, $b$ este **partea imaginară** (fără $i$!).",
        },
        {
          type: "calc",
          prompt: "Care este partea imaginară a numărului $z = 3 - 4i$?",
          answer: -4,
          explain: "Partea imaginară e coeficientul lui $i$: $-4$. Nu $-4i$.",
        },
        {
          type: "learn",
          title: "Calcule",
          body: "Aduni și scazi pe componente: $(2 + 3i) + (4 - i) = 6 + 2i$.\n\nÎnmulțești ca la paranteze și înlocuiești $i^2$ cu $-1$:\n\n$$(2 + i)(1 - 3i) = 2 - 6i + i - 3i^2 = 2 - 5i + 3 = 5 - 5i$$",
        },
        {
          type: "choice",
          prompt: "Cât este $(1 + i)^2$?",
          options: ["$2i$", "$2$", "$0$", "$1 + i^2$"],
          answer: 0,
          explain: "$1 + 2i + i^2 = 1 + 2i - 1 = 2i$.",
        },
        {
          type: "calc",
          prompt: "Care este partea imaginară a numărului $(2 + i)(3 + i)$?",
          answer: 5,
          explain: "$6 + 2i + 3i + i^2 = 5 + 5i$. Partea imaginară: $5$.",
        },
        {
          type: "learn",
          title: "Puterile lui i se repetă",
          body: "$i^1 = i$, $i^2 = -1$, $i^3 = -i$, $i^4 = 1$, apoi ciclul o ia de la capăt.\n\nCa să afli $i^n$, împarți $n$ la 4 și te uiți la **rest**: restul 0 dă $1$, restul 1 dă $i$, restul 2 dă $-1$, restul 3 dă $-i$.",
        },
        {
          type: "choice",
          prompt: "Cât este $i^{2026}$?",
          options: ["$-1$", "$1$", "$i$", "$-i$"],
          answer: 0,
          explain: "$2026 = 4 \\cdot 506 + 2$. Restul 2, deci $i^{2026} = i^2 = -1$.",
        },
        {
          type: "calc",
          prompt: "Calculează $i + i^2 + i^3 + i^4$.",
          answer: 0,
          explain: "$i - 1 - i + 1 = 0$. Oricare patru puteri consecutive ale lui $i$ au suma 0.",
        },
        {
          type: "truefalse",
          prompt: "$i^4 = 1$",
          answer: true,
          explain: "$i^4 = (i^2)^2 = (-1)^2 = 1$.",
        },
      ],
    },
    {
      id: "complexe-modul",
      title: "Conjugat și modul",
      cards: [
        {
          type: "learn",
          title: "Conjugatul",
          body: "Conjugatul lui $z = a + bi$ este $\\bar{z} = a - bi$: schimbi semnul părții imaginare.\n\nProdusul lor e mereu un număr real:\n\n$$z \\cdot \\bar{z} = a^2 + b^2$$",
        },
        {
          type: "calc",
          prompt: "Pentru $z = 3 + 2i$, calculează $z \\cdot \\bar{z}$.",
          answer: 13,
          explain: "$3^2 + 2^2 = 13$.",
        },
        {
          type: "learn",
          title: "Modulul",
          body: "Modulul e „lungimea” numărului complex:\n\n$$|z| = \\sqrt{a^2 + b^2}$$\n\nExemplu: $|3 + 4i| = \\sqrt{9 + 16} = 5$.",
        },
        {
          type: "calc",
          prompt: "Calculează $|6 - 8i|$.",
          answer: 10,
          explain: "$\\sqrt{36 + 64} = \\sqrt{100} = 10$.",
        },
        {
          type: "learn",
          title: "Împărțirea",
          body: "Amplifici fracția cu conjugatul numitorului, ca numitorul să devină real:\n\n$$\\frac{1}{1 + i} = \\frac{1 - i}{(1 + i)(1 - i)} = \\frac{1 - i}{2}$$",
        },
        {
          type: "choice",
          prompt: "Cât este $\\frac{2}{1 - i}$?",
          options: ["$1 + i$", "$1 - i$", "$2 + 2i$", "$\\frac{1 + i}{2}$"],
          answer: 0,
          explain: "$\\frac{2(1 + i)}{(1 - i)(1 + i)} = \\frac{2(1 + i)}{2} = 1 + i$.",
        },
        {
          type: "calc",
          prompt: "Pentru $z = 4 - 7i$, calculează $z + \\bar{z}$.",
          answer: 8,
          explain: "$(4 - 7i) + (4 + 7i) = 8$. Suma cu conjugatul e dublul părții reale.",
        },
        {
          type: "calc",
          prompt: "Calculează $|(1 + i)^2|$.",
          answer: 2,
          explain: "$(1 + i)^2 = 2i$, iar $|2i| = 2$.",
        },
        {
          type: "truefalse",
          prompt: "Un număr complex și conjugatul său au același modul.",
          answer: true,
          explain: "$\\sqrt{a^2 + b^2} = \\sqrt{a^2 + (-b)^2}$.",
        },
      ],
    },
    {
      id: "complexe-ecuatii",
      title: "Ecuații în mulțimea C",
      cards: [
        {
          type: "learn",
          title: "Când Δ e negativ",
          body: "În numere complexe, ecuația de gradul al II-lea are soluții și când $\\Delta < 0$:\n\n$$x_{1,2} = \\frac{-b \\pm i\\sqrt{-\\Delta}}{2a}$$\n\nExemplu: $x^2 + 4 = 0 \\Rightarrow x^2 = -4 \\Rightarrow x = \\pm 2i$.",
        },
        {
          type: "choice",
          prompt: "Care sunt soluțiile ecuației $x^2 + 9 = 0$ în mulțimea numerelor complexe?",
          options: ["$\\pm 3i$", "$\\pm 3$", "doar $3i$", "nu are soluții"],
          answer: 0,
          explain: "$x^2 = -9 = 9i^2$, deci $x = \\pm 3i$.",
        },
        {
          type: "learn",
          title: "Un exemplu complet",
          body: "$x^2 - 2x + 5 = 0$: $\\Delta = 4 - 20 = -16$.\n\n$$x_{1,2} = \\frac{2 \\pm 4i}{2} = 1 \\pm 2i$$\n\nObservă că soluțiile sunt **conjugate**. Așa se întâmplă mereu când coeficienții sunt reali.",
        },
        {
          type: "calc",
          prompt: "Care este partea reală a soluțiilor ecuației $x^2 - 4x + 13 = 0$?",
          answer: 2,
          explain: "$\\Delta = 16 - 52 = -36$, $x = \\frac{4 \\pm 6i}{2} = 2 \\pm 3i$. Partea reală: $2$.",
        },
        {
          type: "learn",
          title: "Egalitatea a două numere complexe",
          body: "$a + bi = c + di$ exact când $a = c$ **și** $b = d$. Egalezi separat partea reală și partea imaginară.\n\nExemplu: $(x + 1) + (y - 2)i = 3 + i$ dă $x = 2$ și $y = 3$.",
        },
        {
          type: "calc",
          prompt: "Numerele reale $x$ și $y$ verifică $x + yi = (1 + i)(2 - i)$. Calculează $x + y$.",
          answer: 4,
          explain: "$(1 + i)(2 - i) = 2 - i + 2i - i^2 = 3 + i$, deci $x = 3$, $y = 1$ și $x + y = 4$.",
        },
        {
          type: "calc",
          prompt: "Care este produsul soluțiilor ecuației $x^2 - 2x + 5 = 0$?",
          answer: 5,
          explain: "Viète funcționează și în $\\mathbb{C}$: $x_1 x_2 = \\frac{c}{a} = 5$. Verificare: $(1 + 2i)(1 - 2i) = 1 + 4 = 5$.",
        },
        {
          type: "truefalse",
          prompt: "Dacă o ecuație de gradul al II-lea cu coeficienți reali are soluția $3 + i$, atunci are și soluția $3 - i$.",
          answer: true,
          explain: "Soluțiile complexe nereale ale unei ecuații cu coeficienți reali vin în perechi conjugate.",
        },
      ],
    },
  ],
  test: [
    // forma algebrică
    {
      lesson: "complexe-forma",
      type: "calc",
      prompt: "Care este partea reală a numărului $(1 + 2i)(2 + i)$?",
      answer: 0,
      explain: "$2 + i + 4i + 2i^2 = 0 + 5i$. Partea reală: $0$.",
    },
    {
      lesson: "complexe-forma",
      type: "choice",
      prompt: "Cât este $i^{2027}$?",
      options: ["$-i$", "$i$", "$1$", "$-1$"],
      answer: 0,
      explain: "$2027 = 4 \\cdot 506 + 3$. Restul 3, deci $i^3 = -i$.",
    },
    {
      lesson: "complexe-forma",
      type: "calc",
      prompt: "Care este partea imaginară a numărului $(3 - i) - (1 - 4i)$?",
      answer: 3,
      explain: "$(3 - 1) + (-1 + 4)i = 2 + 3i$.",
    },
    {
      lesson: "complexe-forma",
      type: "truefalse",
      prompt: "$i^3 = i$",
      answer: false,
      explain: "$i^3 = i^2 \\cdot i = -i$.",
    },
    // conjugat și modul
    {
      lesson: "complexe-modul",
      type: "calc",
      prompt: "Calculează $|5 + 12i|$.",
      answer: 13,
      explain: "$\\sqrt{25 + 144} = \\sqrt{169} = 13$.",
    },
    {
      lesson: "complexe-modul",
      type: "calc",
      prompt: "Pentru $z = 2 - 3i$, calculează $z \\cdot \\bar{z}$.",
      answer: 13,
      explain: "$2^2 + 3^2 = 13$.",
    },
    {
      lesson: "complexe-modul",
      type: "choice",
      prompt: "Cât este $\\frac{1}{i}$?",
      options: ["$-i$", "$i$", "$1$", "$-1$"],
      answer: 0,
      explain: "$\\frac{1}{i} = \\frac{i}{i^2} = \\frac{i}{-1} = -i$.",
    },
    {
      lesson: "complexe-modul",
      type: "calc",
      prompt: "Calculează $|1 - i|^2$.",
      answer: 2,
      explain: "$|1 - i|^2 = 1^2 + 1^2 = 2$.",
    },
    // ecuații
    {
      lesson: "complexe-ecuatii",
      type: "calc",
      prompt: "Ecuația $x^2 + 16 = 0$ are o soluție cu partea imaginară pozitivă. Care este partea ei imaginară?",
      answer: 4,
      explain: "$x = \\pm 4i$. Soluția $4i$ are partea imaginară $4$.",
    },
    {
      lesson: "complexe-ecuatii",
      type: "calc",
      prompt: "Care este partea reală a soluțiilor ecuației $x^2 + 2x + 2 = 0$?",
      answer: -1,
      explain: "$\\Delta = 4 - 8 = -4$, $x = \\frac{-2 \\pm 2i}{2} = -1 \\pm i$.",
    },
    {
      lesson: "complexe-ecuatii",
      type: "calc",
      prompt: "Numerele reale $a$ și $b$ verifică $(a - 1) + (b + 2)i = 4 + 5i$. Calculează $a + b$.",
      answer: 8,
      explain: "$a - 1 = 4$ dă $a = 5$; $b + 2 = 5$ dă $b = 3$. Suma: $8$.",
    },
    {
      lesson: "complexe-ecuatii",
      type: "truefalse",
      prompt: "Numărul $i$ este soluție a ecuației $x^2 + 1 = 0$.",
      answer: true,
      explain: "$i^2 + 1 = -1 + 1 = 0$.",
    },
  ],
};
