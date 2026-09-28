import type { Unit } from "./types";

// Matematică · capitolul 2 — funcția de gradul I, funcția de gradul al II-lea,
// relațiile lui Viète. La bac: Subiectul I, la M1 și la M2.

export const functii: Unit = {
  id: "functii",
  subject: "matematica",
  title: "Funcția de gradul I și II",
  blurb: "Grafice, intersecții cu axele, vârful parabolei și relațiile lui Viète.",
  examRef: "Subiectul I",
  lessons: [
    {
      id: "functia-grad-1",
      title: "Funcția de gradul I",
      cards: [
        {
          type: "learn",
          title: "O dreaptă",
          body: "Funcția de gradul I are forma $f(x) = ax + b$, cu $a \\neq 0$. Graficul ei este o **dreaptă**.\n\nIntersecția cu axa $Oy$: pui $x = 0$ și obții punctul $(0, b)$.\n\nIntersecția cu axa $Ox$: rezolvi $f(x) = 0$, adică $x = -\\frac{b}{a}$.",
        },
        {
          type: "calc",
          prompt: "Pentru $f(x) = 2x - 6$, în ce punct $x$ intersectează graficul axa $Ox$?",
          answer: 3,
          explain: "$2x - 6 = 0$, deci $x = 3$. Punctul este $(3, 0)$.",
        },
        {
          type: "learn",
          title: "Crește sau scade?",
          body: "Semnul lui $a$ decide tot:\n\n**$a > 0$**: funcția e strict crescătoare (dreapta urcă de la stânga la dreapta).\n\n**$a < 0$**: funcția e strict descrescătoare (dreapta coboară).",
        },
        {
          type: "choice",
          prompt: "Funcția $f(x) = -3x + 1$ este:",
          options: ["strict descrescătoare", "strict crescătoare", "constantă", "nici crescătoare, nici descrescătoare"],
          answer: 0,
          explain: "Coeficientul lui $x$ este $a = -3 < 0$, deci funcția e strict descrescătoare.",
        },
        {
          type: "learn",
          title: "Un punct pe grafic",
          body: "Punctul $A(m, n)$ aparține graficului lui $f$ exact când $f(m) = n$.\n\nExemplu: $f(x) = 3x + a$ și $A(1, 5)$ e pe grafic. Atunci $f(1) = 5$, adică $3 + a = 5$, deci $a = 2$.",
        },
        {
          type: "calc",
          prompt: "Fie $f(x) = 2x + a$. Punctul $A(2, 7)$ aparține graficului lui $f$. Află $a$.",
          answer: 3,
          explain: "$f(2) = 7$, adică $4 + a = 7$, deci $a = 3$.",
        },
        {
          type: "learn",
          title: "Unde se taie două grafice",
          body: "Graficele lui $f$ și $g$ se intersectează acolo unde $f(x) = g(x)$.\n\nExemplu: $f(x) = x + 1$ și $g(x) = 3x - 5$. Din $x + 1 = 3x - 5$ iese $x = 3$, iar $f(3) = 4$. Punctul de intersecție este $(3, 4)$.",
        },
        {
          type: "calc",
          prompt: "Fie $f(x) = 2x + 1$ și $g(x) = x + 4$. Care este abscisa punctului de intersecție a graficelor?",
          answer: 3,
          explain: "$2x + 1 = x + 4$ dă $x = 3$.",
        },
        {
          type: "truefalse",
          prompt: "Pentru $f(x) = 5 - 2x$ avem $f(2) = 1$.",
          answer: true,
          explain: "$f(2) = 5 - 4 = 1$.",
        },
        {
          type: "calc",
          prompt: "Fie $f(x) = 4x - 3$. Calculează $f(1) + f(2) + f(3)$.",
          answer: 15,
          explain: "$f(1) = 1$, $f(2) = 5$, $f(3) = 9$. Suma e $15$.",
        },
      ],
    },
    {
      id: "functia-grad-2",
      title: "Funcția de gradul al II-lea",
      cards: [
        {
          type: "learn",
          title: "O parabolă",
          body: "Funcția de gradul al II-lea are forma $f(x) = ax^2 + bx + c$, cu $a \\neq 0$. Graficul ei este o **parabolă**.\n\nDacă $a > 0$, ramurile sunt în sus. Dacă $a < 0$, ramurile sunt în jos.\n\nAproape totul se leagă de **discriminant**:\n\n$$\\Delta = b^2 - 4ac$$",
        },
        {
          type: "calc",
          prompt: "Calculează $\\Delta$ pentru $f(x) = x^2 - 4x + 3$.",
          answer: 4,
          explain: "$\\Delta = (-4)^2 - 4 \\cdot 1 \\cdot 3 = 16 - 12 = 4$.",
        },
        {
          type: "learn",
          title: "Vârful parabolei",
          body: "Vârful este punctul cel mai de jos (pentru $a > 0$) sau cel mai de sus (pentru $a < 0$):\n\n$$V\\left(-\\frac{b}{2a},\\ -\\frac{\\Delta}{4a}\\right)$$\n\nOrdonata o poți afla și mai simplu: calculezi $f$ în abscisa vârfului.\n\nExemplu: $f(x) = x^2 - 4x + 3$ are $x_V = 2$ și $y_V = f(2) = -1$.",
        },
        {
          type: "calc",
          prompt: "Care este abscisa vârfului parabolei $f(x) = x^2 - 6x + 5$?",
          answer: 3,
          explain: "$x_V = -\\frac{b}{2a} = -\\frac{-6}{2} = 3$.",
        },
        {
          type: "calc",
          prompt: "Tot pentru $f(x) = x^2 - 6x + 5$: care este ordonata vârfului?",
          answer: -4,
          explain: "$y_V = f(3) = 9 - 18 + 5 = -4$.",
        },
        {
          type: "learn",
          title: "Intersecția cu axa Ox",
          body: "Rezolvi $f(x) = 0$. Semnul lui $\\Delta$ îți spune din start câte puncte sunt:\n\n**$\\Delta > 0$**: două puncte (două rădăcini reale distincte).\n\n**$\\Delta = 0$**: un singur punct, graficul atinge axa în vârf.\n\n**$\\Delta < 0$**: niciun punct.\n\nRădăcinile: $x_{1,2} = \\frac{-b \\pm \\sqrt{\\Delta}}{2a}$.",
        },
        {
          type: "choice",
          prompt: "În câte puncte intersectează graficul lui $f(x) = x^2 + 2x + 5$ axa $Ox$?",
          options: ["în niciun punct", "într-un punct", "în două puncte", "în trei puncte"],
          answer: 0,
          explain: "$\\Delta = 4 - 20 = -16 < 0$, deci ecuația $f(x) = 0$ nu are soluții reale.",
        },
        {
          type: "learn",
          title: "Minim și maxim",
          body: "Pentru $a > 0$, funcția are un **minim**, egal cu ordonata vârfului. Pentru $a < 0$ are un **maxim**, tot în vârf.\n\nExemplu: $f(x) = x^2 - 2x + 4$ are $x_V = 1$, deci valoarea minimă e $f(1) = 3$.",
        },
        {
          type: "calc",
          prompt: "Care este valoarea minimă a funcției $f(x) = x^2 + 4x + 7$?",
          answer: 3,
          explain: "$x_V = -2$, iar $f(-2) = 4 - 8 + 7 = 3$.",
        },
        {
          type: "truefalse",
          prompt: "Funcția $f(x) = -x^2 + 4$ are valoarea maximă $4$.",
          answer: true,
          explain: "$a = -1 < 0$, vârful e în $x_V = 0$, iar $f(0) = 4$.",
        },
      ],
    },
    {
      id: "viete",
      title: "Relațiile lui Viète",
      cards: [
        {
          type: "learn",
          title: "Suma și produsul, fără să rezolvi",
          body: "Dacă $x_1, x_2$ sunt soluțiile ecuației $ax^2 + bx + c = 0$, atunci:\n\n$$x_1 + x_2 = -\\frac{b}{a} \\qquad x_1 x_2 = \\frac{c}{a}$$\n\nExemplu: la $x^2 - 5x + 6 = 0$, suma e $5$ și produsul e $6$ (soluțiile sunt $2$ și $3$).",
        },
        {
          type: "calc",
          prompt: "Pentru ecuația $x^2 - 7x + 10 = 0$, cât este $x_1 x_2$?",
          answer: 10,
          explain: "$x_1 x_2 = \\frac{c}{a} = \\frac{10}{1} = 10$.",
        },
        {
          type: "learn",
          title: "Suma pătratelor",
          body: "Nu calculezi rădăcinile. Folosești identitatea:\n\n$$x_1^2 + x_2^2 = (x_1 + x_2)^2 - 2x_1 x_2$$\n\nExemplu: suma $5$ și produsul $6$ dau $25 - 12 = 13$.",
        },
        {
          type: "calc",
          prompt: "Pentru ecuația $x^2 - 3x + 1 = 0$, calculează $x_1^2 + x_2^2$.",
          answer: 7,
          explain: "Suma e $3$, produsul e $1$: $9 - 2 = 7$.",
        },
        {
          type: "learn",
          title: "Suma inverselor",
          body: "Aduci la același numitor:\n\n$$\\frac{1}{x_1} + \\frac{1}{x_2} = \\frac{x_1 + x_2}{x_1 x_2}$$",
        },
        {
          type: "calc",
          prompt: "Pentru ecuația $x^2 - 4x + 2 = 0$, calculează $\\frac{1}{x_1} + \\frac{1}{x_2}$.",
          answer: 2,
          explain: "$\\frac{4}{2} = 2$.",
        },
        {
          type: "learn",
          title: "Soluții egale",
          body: "O ecuație de gradul al II-lea are două soluții reale egale exact când $\\Delta = 0$.\n\nExemplu: $x^2 + mx + 9 = 0$ are soluții egale când $m^2 - 36 = 0$, adică $m = 6$ sau $m = -6$.",
        },
        {
          type: "choice",
          prompt: "Pentru ce valoare a lui $m$ are ecuația $x^2 + 4x + m = 0$ soluții reale egale?",
          options: ["$m = 4$", "$m = -4$", "$m = 2$", "$m = 16$"],
          answer: 0,
          explain: "$\\Delta = 16 - 4m = 0$, deci $m = 4$.",
        },
        {
          type: "truefalse",
          prompt: "Ecuația $x^2 + 1 = 0$ are soluții reale.",
          answer: false,
          explain: "$\\Delta = -4 < 0$. Un pătrat plus 1 nu poate fi niciodată 0 pentru $x$ real.",
        },
        {
          type: "calc",
          prompt: "Care este soluția pozitivă a ecuației $x^2 - x - 6 = 0$?",
          answer: 3,
          explain: "$\\Delta = 1 + 24 = 25$, $x_{1,2} = \\frac{1 \\pm 5}{2}$, adică $3$ și $-2$. Cea pozitivă e $3$.",
        },
      ],
    },
  ],
  test: [
    // gradul I
    {
      lesson: "functia-grad-1",
      type: "calc",
      prompt: "În ce punct $x$ intersectează graficul lui $f(x) = 3x - 9$ axa $Ox$?",
      answer: 3,
      explain: "$3x - 9 = 0$, deci $x = 3$.",
    },
    {
      lesson: "functia-grad-1",
      type: "calc",
      prompt: "Fie $f(x) = ax + 1$, cu $f(2) = 7$. Află $a$.",
      answer: 3,
      explain: "$2a + 1 = 7$, deci $a = 3$.",
    },
    {
      lesson: "functia-grad-1",
      type: "truefalse",
      prompt: "Funcția $f(x) = 2x + 3$ este strict crescătoare.",
      answer: true,
      explain: "$a = 2 > 0$.",
    },
    {
      lesson: "functia-grad-1",
      type: "calc",
      prompt: "Care este ordonata punctului în care graficul lui $f(x) = 5x - 2$ intersectează axa $Oy$?",
      answer: -2,
      explain: "$f(0) = -2$, deci punctul este $(0, -2)$.",
    },
    {
      lesson: "functia-grad-1",
      type: "calc",
      prompt: "Fie $f(x) = x + 2$ și $g(x) = -x + 6$. Care este abscisa punctului de intersecție a graficelor?",
      answer: 2,
      explain: "$x + 2 = -x + 6$ dă $2x = 4$, deci $x = 2$.",
    },
    // gradul II
    {
      lesson: "functia-grad-2",
      type: "calc",
      prompt: "Care este abscisa vârfului parabolei $f(x) = x^2 - 8x + 7$?",
      answer: 4,
      explain: "$x_V = -\\frac{-8}{2} = 4$.",
    },
    {
      lesson: "functia-grad-2",
      type: "calc",
      prompt: "Calculează $\\Delta$ pentru $f(x) = 2x^2 + 3x - 2$.",
      answer: 25,
      explain: "$\\Delta = 9 - 4 \\cdot 2 \\cdot (-2) = 9 + 16 = 25$.",
    },
    {
      lesson: "functia-grad-2",
      type: "truefalse",
      prompt: "Graficul funcției $f(x) = -2x^2 + x + 1$ are ramurile în sus.",
      answer: false,
      explain: "$a = -2 < 0$, deci ramurile sunt în jos.",
    },
    {
      lesson: "functia-grad-2",
      type: "calc",
      prompt: "Care este valoarea minimă a funcției $f(x) = x^2 - 2x + 5$?",
      answer: 4,
      explain: "$x_V = 1$, iar $f(1) = 1 - 2 + 5 = 4$.",
    },
    {
      lesson: "functia-grad-2",
      type: "choice",
      prompt: "În câte puncte intersectează graficul lui $f(x) = x^2 - 6x + 9$ axa $Ox$?",
      options: ["într-un punct", "în două puncte", "în niciun punct", "în trei puncte"],
      answer: 0,
      explain: "$\\Delta = 36 - 36 = 0$: graficul atinge axa doar în vârf, în $x = 3$.",
    },
    // Viète
    {
      lesson: "viete",
      type: "calc",
      prompt: "Pentru ecuația $x^2 - 9x + 14 = 0$, cât este $x_1 + x_2$?",
      answer: 9,
      explain: "$x_1 + x_2 = -\\frac{b}{a} = 9$.",
    },
    {
      lesson: "viete",
      type: "calc",
      prompt: "Pentru ecuația $x^2 - 2x - 3 = 0$, calculează $x_1^2 + x_2^2$.",
      answer: 10,
      explain: "Suma e $2$, produsul e $-3$: $4 - 2 \\cdot (-3) = 10$.",
    },
    {
      lesson: "viete",
      type: "calc",
      prompt: "Determină $m > 0$ pentru care ecuația $x^2 + mx + 16 = 0$ are soluții reale egale.",
      answer: 8,
      explain: "$\\Delta = m^2 - 64 = 0$, deci $m = \\pm 8$. Cu $m > 0$ rămâne $m = 8$.",
    },
    {
      lesson: "viete",
      type: "calc",
      prompt: "Pentru ecuația $x^2 - 6x + 3 = 0$, calculează $\\frac{1}{x_1} + \\frac{1}{x_2}$.",
      answer: 2,
      explain: "$\\frac{x_1 + x_2}{x_1 x_2} = \\frac{6}{3} = 2$.",
    },
    {
      lesson: "viete",
      type: "truefalse",
      prompt: "Dacă $\\Delta < 0$, ecuația de gradul al II-lea nu are soluții reale.",
      answer: true,
      explain: "$\\sqrt{\\Delta}$ nu există în numere reale când $\\Delta < 0$.",
    },
  ],
};
