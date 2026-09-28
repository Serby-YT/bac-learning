import type { Unit } from "./types";

// Matematică · capitolul 6 — vectori în plan și geometrie analitică
// (panta, ecuația dreptei, distanțe, arii). La bac: Subiectul I, la M1 și la M2.

export const geometrie: Unit = {
  id: "geometrie",
  subject: "matematica",
  title: "Vectori și geometrie analitică",
  blurb: "Vectori, mijlocul unui segment, panta și ecuația dreptei, distanțe și arii.",
  examRef: "Subiectul I",
  lessons: [
    {
      id: "vectori",
      title: "Vectori în plan",
      cards: [
        {
          type: "learn",
          title: "Vectorul dintre două puncte",
          body: "Un vector se scrie $\\vec{v} = a\\vec{i} + b\\vec{j}$, unde $a$ și $b$ sunt coordonatele lui.\n\nVectorul de la $A$ la $B$ se obține scăzând coordonatele lui $A$ din cele ale lui $B$:\n\n$$\\overrightarrow{AB} = (x_B - x_A)\\vec{i} + (y_B - y_A)\\vec{j}$$",
        },
        {
          type: "calc",
          prompt: "Fie $A(1, 2)$ și $B(4, 6)$. Care este coeficientul lui $\\vec{i}$ în $\\overrightarrow{AB}$?",
          answer: 3,
          explain: "$x_B - x_A = 4 - 1 = 3$. Vectorul întreg: $\\overrightarrow{AB} = 3\\vec{i} + 4\\vec{j}$.",
        },
        {
          type: "learn",
          title: "Operații",
          body: "Aduni vectorii pe componente și înmulțești fiecare componentă cu scalarul.\n\nExemplu: $\\vec{u} = 2\\vec{i} + 3\\vec{j}$ și $\\vec{v} = \\vec{i} - \\vec{j}$. Atunci $\\vec{u} + \\vec{v} = 3\\vec{i} + 2\\vec{j}$ și $2\\vec{u} = 4\\vec{i} + 6\\vec{j}$.",
        },
        {
          type: "calc",
          prompt: "Fie $\\vec{u} = 3\\vec{i} - \\vec{j}$ și $\\vec{v} = -\\vec{i} + 4\\vec{j}$. Care este coeficientul lui $\\vec{j}$ în $\\vec{u} + 2\\vec{v}$?",
          answer: 7,
          explain: "$-1 + 2 \\cdot 4 = 7$.",
        },
        {
          type: "learn",
          title: "Coliniari și perpendiculari",
          body: "Pentru $\\vec{u} = a\\vec{i} + b\\vec{j}$ și $\\vec{v} = c\\vec{i} + d\\vec{j}$:\n\n**Coliniari** (paraleli) când coordonatele sunt proporționale: $\\frac{a}{c} = \\frac{b}{d}$, adică $ad - bc = 0$.\n\n**Perpendiculari** când produsul scalar e zero: $ac + bd = 0$.",
        },
        {
          type: "calc",
          prompt: "Determină $m$ pentru care vectorii $\\vec{u} = 2\\vec{i} + 3\\vec{j}$ și $\\vec{v} = 4\\vec{i} + m\\vec{j}$ sunt coliniari.",
          answer: 6,
          explain: "$\\frac{2}{4} = \\frac{3}{m}$, deci $2m = 12$ și $m = 6$.",
        },
        {
          type: "calc",
          prompt: "Determină $m$ pentru care vectorii $\\vec{u} = 3\\vec{i} + 2\\vec{j}$ și $\\vec{v} = m\\vec{i} - 6\\vec{j}$ sunt perpendiculari.",
          answer: 4,
          explain: "$3m + 2 \\cdot (-6) = 0$, deci $3m = 12$ și $m = 4$.",
        },
        {
          type: "learn",
          title: "Mijlocul unui segment",
          body: "Mijlocul $M$ al segmentului $AB$ are coordonatele mediile coordonatelor:\n\n$$M\\left(\\frac{x_A + x_B}{2},\\ \\frac{y_A + y_B}{2}\\right)$$",
        },
        {
          type: "calc",
          prompt: "Fie $A(2, 5)$ și $B(6, 1)$. Care este abscisa mijlocului segmentului $AB$?",
          answer: 4,
          explain: "$\\frac{2 + 6}{2} = 4$. Mijlocul este $M(4, 3)$.",
        },
        {
          type: "truefalse",
          prompt: "Vectorii $2\\vec{i} + \\vec{j}$ și $-\\vec{i} + 2\\vec{j}$ sunt perpendiculari.",
          answer: true,
          explain: "$2 \\cdot (-1) + 1 \\cdot 2 = 0$.",
        },
      ],
    },
    {
      id: "dreapta",
      title: "Ecuația dreptei",
      cards: [
        {
          type: "learn",
          title: "Panta",
          body: "Panta dreptei $AB$ măsoară cât urcă dreapta la fiecare pas spre dreapta:\n\n$$m_{AB} = \\frac{y_B - y_A}{x_B - x_A}$$\n\nExemplu: $A(1, 1)$, $B(3, 5)$ dau $m = \\frac{4}{2} = 2$.",
        },
        {
          type: "calc",
          prompt: "Care este panta dreptei care trece prin $A(0, 2)$ și $B(2, 8)$?",
          answer: 3,
          explain: "$\\frac{8 - 2}{2 - 0} = 3$.",
        },
        {
          type: "learn",
          title: "Dreapta printr-un punct, cu pantă dată",
          body: "$$y - y_A = m(x - x_A)$$\n\nExemplu: prin $A(1, 2)$ cu panta $3$: $y - 2 = 3(x - 1)$, adică $y = 3x - 1$.",
        },
        {
          type: "choice",
          prompt: "Care este ecuația dreptei care trece prin $A(0, 1)$ și are panta $2$?",
          options: ["$y = 2x + 1$", "$y = x + 2$", "$y = 2x - 1$", "$y = -2x + 1$"],
          answer: 0,
          explain: "$y - 1 = 2(x - 0)$, deci $y = 2x + 1$.",
        },
        {
          type: "learn",
          title: "Paralele și perpendiculare",
          body: "Două drepte sunt **paralele** când au aceeași pantă: $m_1 = m_2$.\n\nSunt **perpendiculare** când produsul pantelor e $-1$: $m_1 \\cdot m_2 = -1$.",
        },
        {
          type: "calc",
          prompt: "Care este panta unei drepte perpendiculare pe dreapta $y = 2x + 3$?",
          answer: -0.5,
          display: "$-\\frac{1}{2}$",
          explain: "$2 \\cdot m = -1$, deci $m = -\\frac{1}{2}$.",
        },
        {
          type: "calc",
          prompt: "Determină $a$ pentru care dreapta $y = (a - 1)x + 2$ este paralelă cu dreapta $y = 3x$.",
          answer: 4,
          explain: "Pante egale: $a - 1 = 3$, deci $a = 4$.",
        },
        {
          type: "learn",
          title: "Un punct pe dreaptă",
          body: "Un punct e pe dreaptă exact când coordonatele lui verifică ecuația.\n\nExemplu: $A(2, m)$ e pe dreapta $y = 3x - 4$ când $m = 3 \\cdot 2 - 4 = 2$.",
        },
        {
          type: "calc",
          prompt: "Punctul $A(m, 5)$ aparține dreptei $y = 2x - 1$. Află $m$.",
          answer: 3,
          explain: "$5 = 2m - 1$, deci $m = 3$.",
        },
        {
          type: "truefalse",
          prompt: "Dreptele $y = x + 1$ și $y = -x + 5$ sunt perpendiculare.",
          answer: true,
          explain: "$1 \\cdot (-1) = -1$.",
        },
      ],
    },
    {
      id: "distante-arii",
      title: "Distanțe și arii",
      cards: [
        {
          type: "learn",
          title: "Distanța dintre două puncte",
          body: "E teorema lui Pitagora pe diferențele de coordonate:\n\n$$AB = \\sqrt{(x_B - x_A)^2 + (y_B - y_A)^2}$$\n\nExemplu: $A(1, 1)$, $B(4, 5)$: $AB = \\sqrt{9 + 16} = 5$.",
        },
        {
          type: "calc",
          prompt: "Calculează distanța dintre $A(0, 0)$ și $B(6, 8)$.",
          answer: 10,
          explain: "$\\sqrt{36 + 64} = 10$.",
        },
        {
          type: "calc",
          prompt: "Calculează lungimea segmentului $AB$, unde $A(-1, 2)$ și $B(2, 6)$.",
          answer: 5,
          explain: "$\\sqrt{3^2 + 4^2} = 5$.",
        },
        {
          type: "learn",
          title: "Centrul de greutate",
          body: "Centrul de greutate $G$ al triunghiului $ABC$ are coordonatele mediile celor trei vârfuri:\n\n$$G\\left(\\frac{x_A + x_B + x_C}{3},\\ \\frac{y_A + y_B + y_C}{3}\\right)$$",
        },
        {
          type: "calc",
          prompt: "Fie $A(1, 2)$, $B(3, 4)$, $C(5, 0)$. Care este abscisa centrului de greutate?",
          answer: 3,
          explain: "$\\frac{1 + 3 + 5}{3} = 3$.",
        },
        {
          type: "learn",
          title: "Aria unui triunghi din coordonate",
          body: "$$\\mathcal{A} = \\frac{|\\Delta|}{2}, \\quad \\Delta = x_A(y_B - y_C) + x_B(y_C - y_A) + x_C(y_A - y_B)$$\n\n(E determinantul cu liniile $x, y, 1$, dezvoltat.) Dacă $\\Delta = 0$, punctele sunt **coliniare**.\n\nCând un unghi e drept și catetele stau pe axe, e mai simplu: aria = produsul catetelor supra 2.",
        },
        {
          type: "calc",
          prompt: "Calculează aria triunghiului cu vârfurile $O(0, 0)$, $A(6, 0)$ și $B(0, 4)$.",
          answer: 12,
          explain: "Triunghi dreptunghic în $O$, cu catetele 6 și 4: $\\frac{6 \\cdot 4}{2} = 12$.",
        },
        {
          type: "calc",
          prompt: "Calculează aria triunghiului cu vârfurile $A(1, 1)$, $B(5, 1)$ și $C(1, 4)$.",
          answer: 6,
          explain: "$\\Delta = 1(1 - 4) + 5(4 - 1) + 1(1 - 1) = 12$, deci aria e $6$. (Sau: catete 4 și 3.)",
        },
        {
          type: "truefalse",
          prompt: "Punctele $A(1, 2)$, $B(2, 4)$ și $C(3, 6)$ sunt coliniare.",
          answer: true,
          explain: "Pantele $AB$ și $BC$ sunt ambele 2, deci punctele sunt pe aceeași dreaptă, $y = 2x$.",
        },
      ],
    },
  ],
  test: [
    // vectori
    {
      lesson: "vectori",
      type: "calc",
      prompt: "Fie $A(2, -1)$ și $B(5, 3)$. Care este coeficientul lui $\\vec{j}$ în $\\overrightarrow{AB}$?",
      answer: 4,
      explain: "$3 - (-1) = 4$.",
    },
    {
      lesson: "vectori",
      type: "calc",
      prompt: "Determină $m$ pentru care vectorii $\\vec{i} + 2\\vec{j}$ și $3\\vec{i} + m\\vec{j}$ sunt coliniari.",
      answer: 6,
      explain: "$\\frac{1}{3} = \\frac{2}{m}$, deci $m = 6$.",
    },
    {
      lesson: "vectori",
      type: "truefalse",
      prompt: "Vectorii $4\\vec{i} - 2\\vec{j}$ și $2\\vec{i} - \\vec{j}$ sunt coliniari.",
      answer: true,
      explain: "$4 \\cdot (-1) - (-2) \\cdot 2 = 0$: primul e dublul celui de-al doilea.",
    },
    {
      lesson: "vectori",
      type: "calc",
      prompt: "Fie $A(-2, 4)$ și $B(4, 0)$. Care este ordonata mijlocului segmentului $AB$?",
      answer: 2,
      explain: "$\\frac{4 + 0}{2} = 2$.",
    },
    // dreapta
    {
      lesson: "dreapta",
      type: "calc",
      prompt: "Care este panta dreptei care trece prin $A(1, 3)$ și $B(4, 9)$?",
      answer: 2,
      explain: "$\\frac{9 - 3}{4 - 1} = 2$.",
    },
    {
      lesson: "dreapta",
      type: "calc",
      prompt: "Care este panta unei drepte perpendiculare pe $y = -3x + 1$?",
      answer: 1 / 3,
      tolerance: 0.005,
      display: "$\\frac{1}{3}$",
      explain: "$-3 \\cdot m = -1$, deci $m = \\frac{1}{3}$.",
    },
    {
      lesson: "dreapta",
      type: "choice",
      prompt: "Care este ecuația dreptei care trece prin $A(1, 4)$ și are panta $-1$?",
      options: ["$y = -x + 5$", "$y = x + 3$", "$y = -x + 3$", "$y = -x - 5$"],
      answer: 0,
      explain: "$y - 4 = -(x - 1)$, deci $y = -x + 5$.",
    },
    {
      lesson: "dreapta",
      type: "calc",
      prompt: "Determină $a$ pentru care dreapta $y = 2ax + 1$ este paralelă cu $y = 6x - 2$.",
      answer: 3,
      explain: "$2a = 6$, deci $a = 3$.",
    },
    // distanțe și arii
    {
      lesson: "distante-arii",
      type: "calc",
      prompt: "Calculează distanța dintre $A(2, 3)$ și $B(8, 11)$.",
      answer: 10,
      explain: "$\\sqrt{6^2 + 8^2} = 10$.",
    },
    {
      lesson: "distante-arii",
      type: "calc",
      prompt: "Fie $A(0, 0)$, $B(3, 6)$, $C(6, 3)$. Care este ordonata centrului de greutate?",
      answer: 3,
      explain: "$\\frac{0 + 6 + 3}{3} = 3$.",
    },
    {
      lesson: "distante-arii",
      type: "calc",
      prompt: "Calculează aria triunghiului cu vârfurile $O(0, 0)$, $A(8, 0)$ și $B(0, 5)$.",
      answer: 20,
      explain: "$\\frac{8 \\cdot 5}{2} = 20$.",
    },
    {
      lesson: "distante-arii",
      type: "truefalse",
      prompt: "Punctele $A(0, 0)$, $B(1, 1)$ și $C(2, 3)$ sunt coliniare.",
      answer: false,
      explain: "Panta $AB$ e 1, panta $BC$ e 2. Nu sunt pe aceeași dreaptă.",
    },
  ],
};
