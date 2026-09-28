import type { Unit } from "./types";

// Matematică · capitolul 7 — valori trigonometrice, formule și rezolvarea
// triunghiului. La bac: ultimul item de la Subiectul I, la M1 și la M2.

export const trigonometrie: Unit = {
  id: "trigonometrie",
  subject: "matematica",
  title: "Trigonometrie",
  blurb: "Valorile de reținut, formulele de bază, teorema sinusurilor și a cosinusului.",
  examRef: "Subiectul I",
  lessons: [
    {
      id: "valori-trig",
      title: "Valori de reținut",
      cards: [
        {
          type: "learn",
          title: "Unghiurile de 30°, 45°, 60°",
          body: "$$\\sin 30° = \\frac{1}{2} \\qquad \\sin 45° = \\frac{\\sqrt{2}}{2} \\qquad \\sin 60° = \\frac{\\sqrt{3}}{2}$$\n\nLa cosinus, aceleași valori în ordine inversă: $\\cos 30° = \\frac{\\sqrt{3}}{2}$, $\\cos 45° = \\frac{\\sqrt{2}}{2}$, $\\cos 60° = \\frac{1}{2}$.\n\nȘi $\\operatorname{tg} x = \\frac{\\sin x}{\\cos x}$, deci $\\operatorname{tg} 45° = 1$.",
        },
        {
          type: "calc",
          prompt: "Cât este $\\cos 60°$?",
          answer: 0.5,
          display: "$\\frac{1}{2}$",
          explain: "$\\cos 60° = \\sin 30° = \\frac{1}{2}$.",
        },
        {
          type: "learn",
          title: "0°, 90°, 180°",
          body: "$\\sin 0° = 0$, $\\cos 0° = 1$.\n\n$\\sin 90° = 1$, $\\cos 90° = 0$.\n\n$\\sin 180° = 0$, $\\cos 180° = -1$.",
        },
        {
          type: "calc",
          prompt: "Calculează $\\sin 90° + \\cos 180°$.",
          answer: 0,
          explain: "$1 + (-1) = 0$.",
        },
        {
          type: "learn",
          title: "Unghiuri obtuze",
          body: "Pentru unghiuri între 90° și 180° folosești suplementul:\n\n$$\\sin(180° - x) = \\sin x \\qquad \\cos(180° - x) = -\\cos x$$\n\nExemplu: $\\sin 150° = \\sin 30° = \\frac{1}{2}$, iar $\\cos 120° = -\\cos 60° = -\\frac{1}{2}$.",
        },
        {
          type: "choice",
          prompt: "Cât este $\\cos 150°$?",
          options: ["$-\\frac{\\sqrt{3}}{2}$", "$\\frac{\\sqrt{3}}{2}$", "$-\\frac{1}{2}$", "$\\frac{1}{2}$"],
          answer: 0,
          explain: "$\\cos 150° = -\\cos 30° = -\\frac{\\sqrt{3}}{2}$.",
        },
        {
          type: "calc",
          prompt: "Calculează $\\sin 120° - \\sin 60°$.",
          answer: 0,
          explain: "$\\sin 120° = \\sin(180° - 60°) = \\sin 60°$, deci diferența e $0$.",
        },
        {
          type: "calc",
          prompt: "Calculează $2\\sin 30° + \\cos 0°$.",
          answer: 2,
          explain: "$2 \\cdot \\frac{1}{2} + 1 = 2$.",
        },
        {
          type: "truefalse",
          prompt: "$\\operatorname{tg} 45° = 1$",
          answer: true,
          explain: "$\\sin 45° = \\cos 45°$, deci raportul e 1.",
        },
      ],
    },
    {
      id: "formule-trig",
      title: "Formule de bază",
      cards: [
        {
          type: "learn",
          title: "Formula fundamentală",
          body: "$$\\sin^2 x + \\cos^2 x = 1$$\n\nDacă știi $\\sin x$, afli $\\cos x$ (și invers). Semnul îl alegi după cadran: pentru $x$ între 0° și 90°, ambele sunt pozitive.\n\nExemplu: $\\sin x = \\frac{3}{5}$, $x$ ascuțit: $\\cos^2 x = 1 - \\frac{9}{25} = \\frac{16}{25}$, deci $\\cos x = \\frac{4}{5}$.",
        },
        {
          type: "calc",
          prompt: "Știind că $\\sin x = \\frac{4}{5}$ și $x \\in (0°, 90°)$, calculează $\\cos x$.",
          answer: 0.6,
          display: "$\\frac{3}{5}$",
          explain: "$\\cos^2 x = 1 - \\frac{16}{25} = \\frac{9}{25}$, iar $x$ e ascuțit, deci $\\cos x = \\frac{3}{5}$.",
        },
        {
          type: "calc",
          prompt: "Pentru același $x$ ($\\sin x = \\frac{4}{5}$, $\\cos x = \\frac{3}{5}$), calculează $\\operatorname{tg} x$.",
          answer: 4 / 3,
          tolerance: 0.005,
          display: "$\\frac{4}{3}$",
          explain: "$\\frac{4/5}{3/5} = \\frac{4}{3}$.",
        },
        {
          type: "learn",
          title: "Unghiul dublu",
          body: "$$\\sin 2x = 2\\sin x \\cos x$$\n\n$$\\cos 2x = \\cos^2 x - \\sin^2 x = 1 - 2\\sin^2 x = 2\\cos^2 x - 1$$",
        },
        {
          type: "calc",
          prompt: "Știind că $\\sin x = \\frac{3}{5}$ și $\\cos x = \\frac{4}{5}$, calculează $\\sin 2x$.",
          answer: 0.96,
          display: "$\\frac{24}{25}$",
          explain: "$2 \\cdot \\frac{3}{5} \\cdot \\frac{4}{5} = \\frac{24}{25}$.",
        },
        {
          type: "calc",
          prompt: "Pentru același $x$, calculează $\\cos 2x$.",
          answer: 0.28,
          display: "$\\frac{7}{25}$",
          explain: "$\\frac{16}{25} - \\frac{9}{25} = \\frac{7}{25}$.",
        },
        {
          type: "learn",
          title: "Unghiuri complementare",
          body: "Dacă două unghiuri au suma 90°, sinusul unuia e cosinusul celuilalt:\n\n$$\\sin(90° - x) = \\cos x$$\n\nExemplu: $\\sin 20° - \\cos 70° = 0$. La bac apare des sub forma „arătați că... = 0”.",
        },
        {
          type: "calc",
          prompt: "Calculează $\\sin 40° - \\cos 50°$.",
          answer: 0,
          explain: "$\\sin 40° = \\cos 50°$, pentru că $40° + 50° = 90°$.",
        },
        {
          type: "choice",
          prompt: "Care formulă este corectă?",
          options: ["$\\cos 2x = 1 - 2\\sin^2 x$", "$\\cos 2x = 2\\sin^2 x - 1$", "$\\cos 2x = 1 + 2\\sin^2 x$", "$\\cos 2x = 2\\sin x \\cos x$"],
          answer: 0,
          explain: "Din $\\cos^2 x - \\sin^2 x$ înlocuiești $\\cos^2 x = 1 - \\sin^2 x$ și obții $1 - 2\\sin^2 x$.",
        },
        {
          type: "truefalse",
          prompt: "$\\sin^2 17° + \\cos^2 17° = 1$",
          answer: true,
          explain: "Formula fundamentală e adevărată pentru orice unghi.",
        },
      ],
    },
    {
      id: "triunghi",
      title: "Rezolvarea triunghiului",
      cards: [
        {
          type: "learn",
          title: "În triunghiul dreptunghic",
          body: "Pentru un unghi ascuțit:\n\n$$\\sin = \\frac{\\text{cateta opusă}}{\\text{ipotenuză}} \\qquad \\cos = \\frac{\\text{cateta alăturată}}{\\text{ipotenuză}}$$\n\nExemplu: catetele 3 și 4, ipotenuza 5. Unghiul opus catetei 3 are sinusul $\\frac{3}{5}$.",
        },
        {
          type: "calc",
          prompt: "Un triunghi dreptunghic are ipotenuza 10 și un unghi ascuțit $B$ cu $\\sin B = 0{,}6$. Cât măsoară cateta opusă lui $B$?",
          answer: 6,
          explain: "Cateta opusă $= 10 \\cdot 0{,}6 = 6$.",
        },
        {
          type: "learn",
          title: "Teorema sinusurilor",
          body: "În orice triunghi:\n\n$$\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C} = 2R$$\n\nunde $R$ e raza cercului circumscris. Exemplu: $a = 6$, $A = 30°$ dau $2R = \\frac{6}{1/2} = 12$, deci $R = 6$.",
        },
        {
          type: "calc",
          prompt: "În triunghiul $ABC$, $BC = 8$ și $A = 30°$. Calculează raza cercului circumscris.",
          answer: 8,
          explain: "$2R = \\frac{8}{\\sin 30°} = 16$, deci $R = 8$.",
        },
        {
          type: "learn",
          title: "Teorema cosinusului",
          body: "Generalizează teorema lui Pitagora:\n\n$$a^2 = b^2 + c^2 - 2bc\\cos A$$\n\nO folosești când știi două laturi și unghiul dintre ele.",
        },
        {
          type: "calc",
          prompt: "În triunghiul $ABC$, $AB = 8$, $AC = 5$ și $A = 60°$. Calculează $BC$.",
          answer: 7,
          explain: "$BC^2 = 64 + 25 - 2 \\cdot 8 \\cdot 5 \\cdot \\frac{1}{2} = 49$, deci $BC = 7$.",
        },
        {
          type: "learn",
          title: "Aria cu sinus",
          body: "$$\\mathcal{A} = \\frac{b \\cdot c \\cdot \\sin A}{2}$$\n\nDouă laturi și unghiul dintre ele. Exemplu: $b = 4$, $c = 6$, $A = 30°$: aria e $\\frac{4 \\cdot 6 \\cdot \\frac{1}{2}}{2} = 6$.",
        },
        {
          type: "calc",
          prompt: "În triunghiul $ABC$, $AB = 8$, $AC = 5$ și $A = 30°$. Calculează aria.",
          answer: 10,
          explain: "$\\frac{8 \\cdot 5 \\cdot \\frac{1}{2}}{2} = 10$.",
        },
        {
          type: "truefalse",
          prompt: "În triunghiul $ABC$ dreptunghic în $A$, avem $\\sin^2 B + \\sin^2 C = 1$.",
          answer: true,
          explain: "$C = 90° - B$, deci $\\sin C = \\cos B$ și suma devine $\\sin^2 B + \\cos^2 B = 1$.",
        },
      ],
    },
  ],
  test: [
    // valori
    {
      lesson: "valori-trig",
      type: "calc",
      prompt: "Calculează $\\sin 30° + \\cos 60°$.",
      answer: 1,
      explain: "$\\frac{1}{2} + \\frac{1}{2} = 1$.",
    },
    {
      lesson: "valori-trig",
      type: "choice",
      prompt: "Cât este $\\sin 135°$?",
      options: ["$\\frac{\\sqrt{2}}{2}$", "$-\\frac{\\sqrt{2}}{2}$", "$\\frac{\\sqrt{3}}{2}$", "$\\frac{1}{2}$"],
      answer: 0,
      explain: "$\\sin 135° = \\sin(180° - 45°) = \\sin 45° = \\frac{\\sqrt{2}}{2}$.",
    },
    {
      lesson: "valori-trig",
      type: "calc",
      prompt: "Calculează $\\cos 0° - \\sin 90°$.",
      answer: 0,
      explain: "$1 - 1 = 0$.",
    },
    {
      lesson: "valori-trig",
      type: "truefalse",
      prompt: "$\\cos 120° = \\frac{1}{2}$",
      answer: false,
      explain: "$\\cos 120° = -\\cos 60° = -\\frac{1}{2}$.",
    },
    // formule
    {
      lesson: "formule-trig",
      type: "calc",
      prompt: "Știind că $\\cos x = \\frac{5}{13}$ și $x \\in (0°, 90°)$, calculează $\\sin x$.",
      answer: 12 / 13,
      tolerance: 0.005,
      display: "$\\frac{12}{13}$",
      explain: "$\\sin^2 x = 1 - \\frac{25}{169} = \\frac{144}{169}$, deci $\\sin x = \\frac{12}{13}$.",
    },
    {
      lesson: "formule-trig",
      type: "calc",
      prompt: "Știind că $\\sin x = 0{,}6$ și $\\cos x = 0{,}8$, calculează $\\operatorname{tg} x$.",
      answer: 0.75,
      display: "$\\frac{3}{4}$",
      explain: "$\\frac{0{,}6}{0{,}8} = \\frac{3}{4}$.",
    },
    {
      lesson: "formule-trig",
      type: "calc",
      prompt: "Calculează $\\sin 2x$ pentru $x = 45°$.",
      answer: 1,
      explain: "$2 \\cdot \\frac{\\sqrt{2}}{2} \\cdot \\frac{\\sqrt{2}}{2} = 1$. Verificare: $\\sin 90° = 1$.",
    },
    {
      lesson: "formule-trig",
      type: "truefalse",
      prompt: "$\\cos 2x = \\cos^2 x - \\sin^2 x$",
      answer: true,
      explain: "E formula cosinusului unghiului dublu.",
    },
    // triunghi
    {
      lesson: "triunghi",
      type: "calc",
      prompt: "În triunghiul $ABC$, $BC = 10$ și $A = 30°$. Calculează raza cercului circumscris.",
      answer: 10,
      explain: "$2R = \\frac{10}{1/2} = 20$, deci $R = 10$.",
    },
    {
      lesson: "triunghi",
      type: "calc",
      prompt: "În triunghiul $ABC$, $AB = 3$, $AC = 8$ și $A = 60°$. Calculează $BC$.",
      answer: 7,
      explain: "$BC^2 = 9 + 64 - 2 \\cdot 3 \\cdot 8 \\cdot \\frac{1}{2} = 49$, deci $BC = 7$.",
    },
    {
      lesson: "triunghi",
      type: "calc",
      prompt: "În triunghiul $ABC$, $AB = AC = 6$ și $A = 90°$. Calculează aria.",
      answer: 18,
      explain: "$\\frac{6 \\cdot 6 \\cdot \\sin 90°}{2} = 18$.",
    },
    {
      lesson: "triunghi",
      type: "calc",
      prompt: "În triunghiul $ABC$, $AB = 4$, $AC = 4$ și $A = 60°$. Calculează $BC$.",
      answer: 4,
      explain: "$BC^2 = 16 + 16 - 16 = 16$, deci $BC = 4$: triunghiul e echilateral.",
    },
  ],
};
