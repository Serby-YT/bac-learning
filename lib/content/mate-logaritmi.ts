import type { Unit } from "./types";

// Matematică · capitolul 3 — puteri, radicali, logaritmi și ecuațiile
// exponențiale / logaritmice. La bac: Subiectul I, la M1 și la M2.

export const logaritmi: Unit = {
  id: "logaritmi",
  subject: "matematica",
  title: "Puteri, radicali, logaritmi",
  blurb: "Reguli de calcul, raționalizare, logaritmi și ecuații exponențiale sau logaritmice.",
  examRef: "Subiectul I",
  lessons: [
    {
      id: "puteri-radicali",
      title: "Puteri și radicali",
      cards: [
        {
          type: "learn",
          title: "Regulile puterilor",
          body: "Pentru $a \\neq 0$:\n\n$$a^m \\cdot a^n = a^{m+n} \\qquad a^m : a^n = a^{m-n} \\qquad (a^m)^n = a^{mn}$$\n\nȘi două care se uită des: $a^0 = 1$ și $a^{-n} = \\frac{1}{a^n}$.",
        },
        {
          type: "calc",
          prompt: "Calculează $2^3 \\cdot 2^4 : 2^5$.",
          answer: 4,
          explain: "$2^{3+4-5} = 2^2 = 4$.",
        },
        {
          type: "learn",
          title: "Radicali",
          body: "$\\sqrt{a \\cdot b} = \\sqrt{a} \\cdot \\sqrt{b}$ pentru $a, b \\geq 0$. Scoți factorii de sub radical: $\\sqrt{18} = \\sqrt{9 \\cdot 2} = 3\\sqrt{2}$.\n\nAtenție: $\\sqrt{a^2} = |a|$, nu $a$.\n\nPuterea cu exponent rațional e tot un radical: $a^{\\frac{m}{n}} = \\sqrt[n]{a^m}$. De exemplu $8^{\\frac{2}{3}} = \\sqrt[3]{64} = 4$.",
        },
        {
          type: "choice",
          prompt: "Cât este $\\sqrt{18} + \\sqrt{8}$?",
          options: ["$5\\sqrt{2}$", "$\\sqrt{26}$", "$10\\sqrt{2}$", "$13$"],
          answer: 0,
          explain: "$\\sqrt{18} = 3\\sqrt{2}$ și $\\sqrt{8} = 2\\sqrt{2}$, deci suma e $5\\sqrt{2}$. Radicalii nu se adună „sub radical”.",
        },
        {
          type: "calc",
          prompt: "Calculează $27^{\\frac{1}{3}} + 16^{\\frac{1}{2}}$.",
          answer: 7,
          explain: "$\\sqrt[3]{27} = 3$ și $\\sqrt{16} = 4$, deci $7$.",
        },
        {
          type: "learn",
          title: "Raționalizarea",
          body: "Nu lași radicali la numitor. Amplifici cu radicalul sau cu **conjugatul**:\n\n$$\\frac{1}{\\sqrt{2}} = \\frac{\\sqrt{2}}{2} \\qquad \\frac{1}{\\sqrt{3} - 1} = \\frac{\\sqrt{3} + 1}{(\\sqrt{3})^2 - 1^2} = \\frac{\\sqrt{3} + 1}{2}$$",
        },
        {
          type: "choice",
          prompt: "Cât este $\\frac{2}{\\sqrt{3} + 1}$?",
          options: ["$\\sqrt{3} - 1$", "$\\sqrt{3} + 1$", "$2\\sqrt{3}$", "$\\frac{\\sqrt{3} - 1}{2}$"],
          answer: 0,
          explain: "Amplifici cu $\\sqrt{3} - 1$: $\\frac{2(\\sqrt{3} - 1)}{3 - 1} = \\sqrt{3} - 1$.",
        },
        {
          type: "calc",
          prompt: "Calculează $\\sqrt[3]{-27}$.",
          answer: -3,
          explain: "$(-3)^3 = -27$. Radicalul de ordin impar există și din numere negative.",
        },
        {
          type: "truefalse",
          prompt: "$\\sqrt{(-5)^2} = -5$",
          answer: false,
          explain: "$\\sqrt{(-5)^2} = \\sqrt{25} = 5 = |-5|$. Radicalul de ordin par e mereu pozitiv sau zero.",
        },
      ],
    },
    {
      id: "logaritmi-reguli",
      title: "Logaritmi",
      cards: [
        {
          type: "learn",
          title: "Ce e un logaritm",
          body: "$\\log_a b$ e exponentul la care ridici $a$ ca să obții $b$:\n\n$$\\log_a b = c \\iff a^c = b$$\n\nExemplu: $\\log_2 8 = 3$, pentru că $2^3 = 8$.\n\nCondiții: $a > 0$, $a \\neq 1$ și $b > 0$. Notăm $\\lg b = \\log_{10} b$.",
        },
        {
          type: "calc",
          prompt: "Calculează $\\log_3 81$.",
          answer: 4,
          explain: "$3^4 = 81$, deci $\\log_3 81 = 4$.",
        },
        {
          type: "learn",
          title: "Regulile de calcul",
          body: "$$\\log_a (xy) = \\log_a x + \\log_a y \\qquad \\log_a \\frac{x}{y} = \\log_a x - \\log_a y$$\n\n$$\\log_a x^n = n \\log_a x \\qquad \\log_a a = 1 \\qquad \\log_a 1 = 0$$\n\nLa bac, aproape orice calcul se reduce la „adun sau scad logaritmii, apoi recunosc o putere”.",
        },
        {
          type: "calc",
          prompt: "Calculează $\\log_2 12 - \\log_2 3$.",
          answer: 2,
          explain: "$\\log_2 \\frac{12}{3} = \\log_2 4 = 2$.",
        },
        {
          type: "calc",
          prompt: "Calculează $\\log_6 2 + \\log_6 3$.",
          answer: 1,
          explain: "$\\log_6 (2 \\cdot 3) = \\log_6 6 = 1$.",
        },
        {
          type: "learn",
          title: "Schimbarea bazei",
          body: "$$\\log_a b = \\frac{\\log_c b}{\\log_c a}$$\n\nExemplu: $\\log_4 8 = \\frac{\\log_2 8}{\\log_2 4} = \\frac{3}{2}$.\n\nConsecință utilă: $\\log_a b \\cdot \\log_b a = 1$.",
        },
        {
          type: "calc",
          prompt: "Calculează $\\log_9 27$.",
          answer: 1.5,
          display: "$\\frac{3}{2}$",
          explain: "$\\frac{\\log_3 27}{\\log_3 9} = \\frac{3}{2}$.",
        },
        {
          type: "calc",
          prompt: "Calculează $\\log_5 25 + \\log_2 \\frac{1}{8}$.",
          answer: -1,
          explain: "$\\log_5 25 = 2$ și $\\log_2 \\frac{1}{8} = -3$ (pentru că $2^{-3} = \\frac{1}{8}$). Suma: $-1$.",
        },
        {
          type: "truefalse",
          prompt: "$\\lg 100 = 2$",
          answer: true,
          explain: "$\\lg$ înseamnă baza 10, iar $10^2 = 100$.",
        },
        {
          type: "choice",
          prompt: "Ce condiții trebuie îndeplinite ca $\\log_a b$ să existe?",
          options: ["$a > 0$, $a \\neq 1$, $b > 0$", "$a > 0$, $b > 0$", "$a \\neq 0$, $b \\neq 0$", "$a > 1$, $b > 1$"],
          answer: 0,
          explain: "Baza e pozitivă și diferită de 1, argumentul e strict pozitiv.",
        },
      ],
    },
    {
      id: "ecuatii-exp-log",
      title: "Ecuații exponențiale și logaritmice",
      cards: [
        {
          type: "learn",
          title: "Aceeași bază",
          body: "Scrii ambii membri ca puteri ale aceluiași număr, apoi egalezi exponenții:\n\n$$2^{x+1} = 8 \\Rightarrow 2^{x+1} = 2^3 \\Rightarrow x + 1 = 3 \\Rightarrow x = 2$$",
        },
        {
          type: "calc",
          prompt: "Rezolvă ecuația $3^{x-2} = 27$.",
          answer: 5,
          explain: "$27 = 3^3$, deci $x - 2 = 3$ și $x = 5$.",
        },
        {
          type: "calc",
          prompt: "Rezolvă ecuația $5^{2x} = \\frac{1}{5}$.",
          answer: -0.5,
          display: "$-\\frac{1}{2}$",
          explain: "$\\frac{1}{5} = 5^{-1}$, deci $2x = -1$ și $x = -\\frac{1}{2}$.",
        },
        {
          type: "learn",
          title: "Substituția",
          body: "Când apar $4^x$ și $2^x$, notezi $t = 2^x$, cu $t > 0$. Atunci $4^x = t^2$.\n\nExemplu: $4^x - 3 \\cdot 2^x + 2 = 0$ devine $t^2 - 3t + 2 = 0$, cu $t = 1$ sau $t = 2$. Deci $2^x = 1 \\Rightarrow x = 0$ și $2^x = 2 \\Rightarrow x = 1$.\n\nDacă iese un $t \\leq 0$, îl arunci: $2^x$ nu e niciodată negativ.",
        },
        {
          type: "calc",
          prompt: "Care este suma soluțiilor ecuației $9^x - 4 \\cdot 3^x + 3 = 0$?",
          answer: 1,
          explain: "Cu $t = 3^x$: $t^2 - 4t + 3 = 0$, deci $t = 1$ sau $t = 3$, adică $x = 0$ sau $x = 1$. Suma: $1$.",
        },
        {
          type: "learn",
          title: "Ecuații logaritmice: condițiile întâi",
          body: "Scrii mai întâi **condițiile de existență** (argumentul strict pozitiv). Apoi aplici definiția:\n\n$$\\log_2 (x - 1) = 3 \\Rightarrow x - 1 = 2^3 \\Rightarrow x = 9$$\n\nLa final verifici că soluția respectă condiția ($9 > 1$). În barem, condițiile au punctajul lor.",
        },
        {
          type: "calc",
          prompt: "Rezolvă ecuația $\\log_3 (2x + 1) = 2$.",
          answer: 4,
          explain: "Condiția: $2x + 1 > 0$. Apoi $2x + 1 = 3^2 = 9$, deci $x = 4$, care respectă condiția.",
        },
        {
          type: "learn",
          title: "Capcana soluției în plus",
          body: "$\\log_2 x + \\log_2 (x - 2) = 3$. Condiții: $x > 0$ și $x > 2$, deci $x > 2$.\n\n$\\log_2 [x(x - 2)] = 3 \\Rightarrow x^2 - 2x = 8 \\Rightarrow x = 4$ sau $x = -2$.\n\nDoar $x = 4$ respectă condiția. Fără condiții, ai fi scris și $-2$ și ai fi pierdut puncte.",
        },
        {
          type: "calc",
          prompt: "Rezolvă ecuația $\\log_2 x + \\log_2 (x + 2) = 3$.",
          answer: 2,
          explain: "Condiția: $x > 0$. $x(x + 2) = 8$, adică $x^2 + 2x - 8 = 0$, cu soluțiile $2$ și $-4$. Rămâne $x = 2$.",
        },
        {
          type: "truefalse",
          prompt: "Ecuația $2^x = -4$ are o soluție reală.",
          answer: false,
          explain: "$2^x > 0$ pentru orice $x$ real, deci nu poate fi egal cu $-4$.",
        },
      ],
    },
  ],
  test: [
    // puteri și radicali
    {
      lesson: "puteri-radicali",
      type: "calc",
      prompt: "Calculează $(3^2)^3 : 3^4$.",
      answer: 9,
      explain: "$3^6 : 3^4 = 3^2 = 9$.",
    },
    {
      lesson: "puteri-radicali",
      type: "calc",
      prompt: "Calculează $\\sqrt{50} : \\sqrt{2}$.",
      answer: 5,
      explain: "$\\sqrt{50 : 2} = \\sqrt{25} = 5$.",
    },
    {
      lesson: "puteri-radicali",
      type: "calc",
      prompt: "Calculează $4^{\\frac{3}{2}}$.",
      answer: 8,
      explain: "$4^{\\frac{3}{2}} = (\\sqrt{4})^3 = 2^3 = 8$.",
    },
    {
      lesson: "puteri-radicali",
      type: "truefalse",
      prompt: "$a^{-2} = \\frac{1}{a^2}$ pentru orice $a \\neq 0$.",
      answer: true,
      explain: "Exponentul negativ înseamnă inversul puterii.",
    },
    // logaritmi
    {
      lesson: "logaritmi-reguli",
      type: "calc",
      prompt: "Calculează $\\log_2 32$.",
      answer: 5,
      explain: "$2^5 = 32$.",
    },
    {
      lesson: "logaritmi-reguli",
      type: "calc",
      prompt: "Calculează $\\log_3 18 - \\log_3 2$.",
      answer: 2,
      explain: "$\\log_3 9 = 2$.",
    },
    {
      lesson: "logaritmi-reguli",
      type: "calc",
      prompt: "Calculează $\\lg 2 + \\lg 50$.",
      answer: 2,
      explain: "$\\lg 100 = 2$.",
    },
    {
      lesson: "logaritmi-reguli",
      type: "truefalse",
      prompt: "$\\log_a 1 = 0$ pentru orice bază permisă $a$.",
      answer: true,
      explain: "$a^0 = 1$.",
    },
    // ecuații
    {
      lesson: "ecuatii-exp-log",
      type: "calc",
      prompt: "Rezolvă ecuația $2^{x+3} = 16$.",
      answer: 1,
      explain: "$16 = 2^4$, deci $x + 3 = 4$ și $x = 1$.",
    },
    {
      lesson: "ecuatii-exp-log",
      type: "calc",
      prompt: "Rezolvă ecuația $\\log_5 (x + 3) = 1$.",
      answer: 2,
      explain: "$x + 3 = 5$, deci $x = 2$ (și $x + 3 > 0$).",
    },
    {
      lesson: "ecuatii-exp-log",
      type: "calc",
      prompt: "Care este soluția pozitivă a ecuației $7^{x^2 - 4} = 1$?",
      answer: 2,
      explain: "$1 = 7^0$, deci $x^2 - 4 = 0$ și $x = \\pm 2$. Cea pozitivă: $2$.",
    },
    {
      lesson: "ecuatii-exp-log",
      type: "choice",
      prompt: "Rezolvă ecuația $\\log_2 (x - 3) = \\log_2 (5 - x)$.",
      options: ["$x = 4$", "$x = 1$", "$x = 8$", "nu are soluții"],
      answer: 0,
      explain: "Condiții: $3 < x < 5$. Logaritmii egali în aceeași bază dau $x - 3 = 5 - x$, deci $x = 4$, care respectă condițiile.",
    },
  ],
};
