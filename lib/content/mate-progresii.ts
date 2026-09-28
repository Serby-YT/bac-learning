import type { Unit } from "./types";

// Matematică · capitolul 1 — progresii aritmetice și geometrice.
// La bac: de obicei primul item de la Subiectul I (5 puncte), la M1 și la M2.

export const progresii: Unit = {
  id: "progresii",
  subject: "matematica",
  title: "Progresii",
  blurb: "Progresii aritmetice și geometrice: termenul general, termenul din mijloc și sumele.",
  examRef: "Subiectul I",
  lessons: [
    {
      id: "progresii-aritmetice",
      title: "Progresii aritmetice",
      cards: [
        {
          type: "learn",
          title: "Mereu același pas",
          body: "Un șir e **progresie aritmetică** dacă fiecare termen se obține din cel de dinainte adunând același număr $r$, numit **rație**.\n\n$$a_{n+1} = a_n + r$$\n\nExemplu: $3, 7, 11, 15, \\dots$ Fiecare termen e cu 4 mai mare decât precedentul, deci $r = 4$.",
        },
        {
          type: "calc",
          prompt: "Care este rația progresiei aritmetice $5, 8, 11, 14, \\dots$?",
          answer: 3,
          explain: "Scazi doi termeni vecini: $8 - 5 = 3$. Verifici: $11 - 8 = 3$.",
        },
        {
          type: "learn",
          title: "Termenul general",
          body: "Ca să ajungi de la $a_1$ la $a_n$ faci $n - 1$ pași de mărime $r$:\n\n$$a_n = a_1 + (n-1)\\,r$$\n\nExemplu: $a_1 = 2$, $r = 5$. Atunci $a_{10} = 2 + 9 \\cdot 5 = 47$.\n\nCapcana clasică: $a_1 + n \\cdot r$. Sunt $n - 1$ pași, nu $n$.",
        },
        {
          type: "calc",
          prompt: "Progresia aritmetică are $a_1 = 4$ și $r = 3$. Calculează $a_{20}$.",
          answer: 61,
          explain: "$a_{20} = a_1 + 19r = 4 + 19 \\cdot 3 = 61$.",
        },
        {
          type: "learn",
          title: "Termenul din mijloc",
          body: "Trei numere $a, b, c$ sunt termeni consecutivi ai unei progresii aritmetice exact când cel din mijloc e media celorlalte două:\n\n$$2b = a + c$$\n\nExemplu: $x - 1,\\ 5,\\ x + 3$ sunt în progresie aritmetică. Atunci $10 = 2x + 2$, deci $x = 4$.",
        },
        {
          type: "calc",
          prompt: "Numerele $3,\\ x,\\ 11$ sunt termeni consecutivi ai unei progresii aritmetice. Află $x$.",
          answer: 7,
          explain: "$2x = 3 + 11 = 14$, deci $x = 7$.",
        },
        {
          type: "learn",
          title: "Suma primilor n termeni",
          body: "Aduni primul cu ultimul termen, înmulțești cu câți termeni sunt și împarți la 2:\n\n$$S_n = \\frac{(a_1 + a_n)\\,n}{2}$$\n\nExemplu celebru: $1 + 2 + \\dots + 100 = \\frac{(1 + 100) \\cdot 100}{2} = 5050$.",
        },
        {
          type: "calc",
          prompt: "Calculează suma primilor 10 termeni ai progresiei aritmetice cu $a_1 = 1$ și $r = 2$.",
          answer: 100,
          explain: "$a_{10} = 1 + 9 \\cdot 2 = 19$, apoi $S_{10} = \\frac{(1 + 19) \\cdot 10}{2} = 100$.",
        },
        {
          type: "learn",
          title: "Rația din doi termeni oarecare",
          body: "Între $a_k$ și $a_m$ sunt $m - k$ pași:\n\n$$a_m - a_k = (m - k)\\,r$$\n\nExemplu: $a_3 = 7$ și $a_7 = 19$. Atunci $4r = 12$, deci $r = 3$, iar $a_1 = a_3 - 2r = 1$.",
        },
        {
          type: "calc",
          prompt: "Într-o progresie aritmetică $a_2 = 5$ și $a_6 = 17$. Care este rația?",
          answer: 3,
          explain: "$a_6 - a_2 = 4r$, deci $12 = 4r$ și $r = 3$.",
        },
        {
          type: "choice",
          prompt: "Care dintre șiruri este progresie aritmetică?",
          options: ["$1, 4, 7, 10$", "$1, 2, 4, 8$", "$1, 4, 9, 16$", "$2, 3, 5, 8$"],
          answer: 0,
          explain: "Doar în $1, 4, 7, 10$ diferența dintre vecini e mereu aceeași ($3$).",
        },
        {
          type: "truefalse",
          prompt: "În progresia aritmetică $2, 5, 8, \\dots$ termenul $a_{50}$ este $149$.",
          answer: true,
          explain: "$a_{50} = 2 + 49 \\cdot 3 = 149$.",
        },
      ],
    },
    {
      id: "progresii-geometrice",
      title: "Progresii geometrice",
      cards: [
        {
          type: "learn",
          title: "Mereu același factor",
          body: "Un șir e **progresie geometrică** dacă fiecare termen se obține din cel de dinainte înmulțind cu același număr $q$, numit **rație**:\n\n$$b_{n+1} = b_n \\cdot q$$\n\nExemplu: $3, 6, 12, 24, \\dots$ are $q = 2$. Primul termen și rația sunt nenule.",
        },
        {
          type: "calc",
          prompt: "Care este rația progresiei geometrice $2, 6, 18, 54, \\dots$?",
          answer: 3,
          explain: "Împarți doi termeni vecini: $6 : 2 = 3$.",
        },
        {
          type: "learn",
          title: "Termenul general",
          body: "De la $b_1$ la $b_n$ înmulțești de $n - 1$ ori cu $q$:\n\n$$b_n = b_1 \\cdot q^{\\,n-1}$$\n\nExemplu: $b_1 = 3$, $q = 2$. Atunci $b_5 = 3 \\cdot 2^4 = 48$.",
        },
        {
          type: "calc",
          prompt: "Progresia geometrică are $b_1 = 5$ și $q = 2$. Calculează $b_4$.",
          answer: 40,
          explain: "$b_4 = 5 \\cdot 2^3 = 40$.",
        },
        {
          type: "learn",
          title: "Termenul din mijloc",
          body: "Trei numere $a, b, c$ sunt termeni consecutivi ai unei progresii geometrice exact când pătratul celui din mijloc e produsul celorlalte două:\n\n$$b^2 = a \\cdot c$$\n\nExemplu: $4,\\ x,\\ 9$ cu $x > 0$. Atunci $x^2 = 36$, deci $x = 6$.",
        },
        {
          type: "calc",
          prompt: "Numerele $2,\\ x,\\ 18$ sunt termeni consecutivi ai unei progresii geometrice și $x > 0$. Află $x$.",
          answer: 6,
          explain: "$x^2 = 2 \\cdot 18 = 36$, iar din $x > 0$ rămâne $x = 6$.",
        },
        {
          type: "learn",
          title: "Suma primilor n termeni",
          body: "Pentru $q \\neq 1$:\n\n$$S_n = b_1 \\cdot \\frac{q^n - 1}{q - 1}$$\n\nExemplu: $1 + 2 + 4 + \\dots + 2^9$ are 10 termeni, deci suma e $\\frac{2^{10} - 1}{2 - 1} = 1023$.",
        },
        {
          type: "calc",
          prompt: "Calculează suma primilor 4 termeni ai progresiei geometrice cu $b_1 = 3$ și $q = 2$.",
          answer: 45,
          explain: "$S_4 = 3 \\cdot \\frac{2^4 - 1}{2 - 1} = 3 \\cdot 15 = 45$. Verificare: $3 + 6 + 12 + 24 = 45$.",
        },
        {
          type: "truefalse",
          prompt: "Șirul $1, -2, 4, -8, \\dots$ este progresie geometrică.",
          answer: true,
          explain: "Fiecare termen e precedentul înmulțit cu $q = -2$. Rația poate fi negativă.",
        },
        {
          type: "choice",
          prompt: "Într-o progresie geometrică cu termeni pozitivi, $b_1 = 2$ și $b_3 = 18$. Cât este $q$?",
          options: ["$3$", "$9$", "$4$", "$6$"],
          answer: 0,
          explain: "$b_3 = b_1 q^2$, deci $q^2 = 9$. Termenii sunt pozitivi, deci $q = 3$.",
        },
        {
          type: "calc",
          prompt: "Într-o progresie geometrică $b_2 = 6$ și $b_5 = 48$. Care este rația?",
          answer: 2,
          explain: "$b_5 = b_2 \\cdot q^3$, deci $q^3 = 8$ și $q = 2$.",
        },
      ],
    },
    {
      id: "progresii-bac",
      title: "Probleme ca la bac",
      cards: [
        {
          type: "learn",
          title: "Cum arată itemul",
          body: "La Subiectul I, progresiile vin ca o singură cerință de 5 puncte, de tipul „Determinați...” sau „Calculați suma...”.\n\nBaremul punctează separat **formula scrisă corect** și **calculul**. Scrie mereu formula înainte să înlocuiești: chiar dacă greșești o socoteală, iei o parte din puncte.",
        },
        {
          type: "calc",
          prompt: "Calculează suma $1 + 3 + 5 + \\dots + 19$.",
          answer: 100,
          explain: "Rația e 2. $19 = 1 + (n-1) \\cdot 2$ dă $n = 10$ termeni. $S = \\frac{(1 + 19) \\cdot 10}{2} = 100$.",
        },
        {
          type: "learn",
          title: "Câți termeni are suma?",
          body: "La sume de forma $1 + 4 + 7 + \\dots + 28$, pasul cel mai des sărit e numărul de termeni.\n\nÎl scoți din termenul general: $28 = 1 + (n-1) \\cdot 3$, deci $n = 10$. Abia apoi aplici formula: $S = \\frac{(1 + 28) \\cdot 10}{2} = 145$.",
        },
        {
          type: "calc",
          prompt: "Calculează suma $2 + 5 + 8 + \\dots + 29$.",
          answer: 155,
          explain: "$29 = 2 + (n-1) \\cdot 3$ dă $n = 10$. $S = \\frac{(2 + 29) \\cdot 10}{2} = 155$.",
        },
        {
          type: "calc",
          prompt: "Determină numărul real $x$ pentru care $x + 1,\\ 2x,\\ x + 5$ sunt termeni consecutivi ai unei progresii aritmetice.",
          answer: 3,
          explain: "$2 \\cdot 2x = (x + 1) + (x + 5)$, deci $4x = 2x + 6$ și $x = 3$.",
        },
        {
          type: "calc",
          prompt: "Determină numărul real pozitiv $x$ pentru care $x,\\ 6,\\ 4x$ sunt termeni consecutivi ai unei progresii geometrice.",
          answer: 3,
          explain: "$6^2 = x \\cdot 4x$, deci $4x^2 = 36$, $x^2 = 9$ și, fiind pozitiv, $x = 3$.",
        },
        {
          type: "choice",
          prompt: "Care este termenul general al unei progresii aritmetice cu primul termen $a_1$ și rația $r$?",
          options: ["$a_n = a_1 + (n-1)r$", "$a_n = a_1 + nr$", "$a_n = a_1 \\cdot r^{n-1}$", "$a_n = (a_1 + r)\\,n$"],
          answer: 0,
          explain: "Sunt $n - 1$ pași de la $a_1$ la $a_n$. Varianta cu $r^{n-1}$ este pentru progresii geometrice.",
        },
        {
          type: "calc",
          prompt: "Calculează suma primilor 5 termeni ai progresiei geometrice cu $b_1 = 1$ și $q = 3$.",
          answer: 121,
          explain: "$S_5 = \\frac{3^5 - 1}{3 - 1} = \\frac{242}{2} = 121$. Verificare: $1 + 3 + 9 + 27 + 81 = 121$.",
        },
        {
          type: "truefalse",
          prompt: "O progresie aritmetică cu rația $r = 0$ are toți termenii egali.",
          answer: true,
          explain: "Adaugi 0 la fiecare pas, deci șirul e constant.",
        },
      ],
    },
  ],
  test: [
    // progresii aritmetice
    {
      lesson: "progresii-aritmetice",
      type: "calc",
      prompt: "Progresia aritmetică are $a_1 = 7$ și $r = -2$. Calculează $a_6$.",
      answer: -3,
      explain: "$a_6 = 7 + 5 \\cdot (-2) = -3$.",
    },
    {
      lesson: "progresii-aritmetice",
      type: "calc",
      prompt: "Calculează suma primilor 5 termeni ai progresiei aritmetice cu $a_1 = 1$ și $r = 4$.",
      answer: 45,
      explain: "$a_5 = 1 + 4 \\cdot 4 = 17$, iar $S_5 = \\frac{(1 + 17) \\cdot 5}{2} = 45$.",
    },
    {
      lesson: "progresii-aritmetice",
      type: "calc",
      prompt: "Într-o progresie aritmetică $a_4 = 10$ și $a_9 = 25$. Care este rația?",
      answer: 3,
      explain: "$a_9 - a_4 = 5r$, deci $15 = 5r$ și $r = 3$.",
    },
    {
      lesson: "progresii-aritmetice",
      type: "truefalse",
      prompt: "Numerele $2, 5, 9$ sunt termeni consecutivi ai unei progresii aritmetice.",
      answer: false,
      explain: "Ar trebui $2 \\cdot 5 = 2 + 9$, dar $10 \\neq 11$.",
    },
    {
      lesson: "progresii-aritmetice",
      type: "choice",
      prompt: "Numerele $5,\\ x,\\ 13$ sunt în progresie aritmetică. Cât este $x$?",
      options: ["$9$", "$8$", "$10$", "$65$"],
      answer: 0,
      explain: "$2x = 5 + 13 = 18$, deci $x = 9$.",
    },
    // progresii geometrice
    {
      lesson: "progresii-geometrice",
      type: "calc",
      prompt: "Progresia geometrică are $b_1 = 2$ și $q = 3$. Calculează $b_4$.",
      answer: 54,
      explain: "$b_4 = 2 \\cdot 3^3 = 54$.",
    },
    {
      lesson: "progresii-geometrice",
      type: "calc",
      prompt: "Numerele $3,\\ x,\\ 12$ sunt termeni consecutivi ai unei progresii geometrice, cu $x > 0$. Află $x$.",
      answer: 6,
      explain: "$x^2 = 3 \\cdot 12 = 36$, deci $x = 6$.",
    },
    {
      lesson: "progresii-geometrice",
      type: "calc",
      prompt: "Calculează suma primilor 6 termeni ai progresiei geometrice cu $b_1 = 1$ și $q = 2$.",
      answer: 63,
      explain: "$S_6 = \\frac{2^6 - 1}{2 - 1} = 63$.",
    },
    {
      lesson: "progresii-geometrice",
      type: "truefalse",
      prompt: "În progresia geometrică cu $b_1 = 4$ și $q = \\frac{1}{2}$, termenul $b_3$ este $1$.",
      answer: true,
      explain: "$b_3 = 4 \\cdot \\left(\\frac{1}{2}\\right)^2 = 1$.",
    },
    {
      lesson: "progresii-geometrice",
      type: "choice",
      prompt: "Care este rația progresiei geometrice $81, 27, 9, 3, \\dots$?",
      options: ["$\\frac{1}{3}$", "$3$", "$-3$", "$\\frac{1}{9}$"],
      answer: 0,
      explain: "$27 : 81 = \\frac{1}{3}$. Termenii scad, dar rămân pozitivi, deci rația e între 0 și 1.",
    },
    // probleme ca la bac
    {
      lesson: "progresii-bac",
      type: "calc",
      prompt: "Calculează suma $1 + 2 + 3 + \\dots + 50$.",
      answer: 1275,
      explain: "$S = \\frac{(1 + 50) \\cdot 50}{2} = 1275$.",
    },
    {
      lesson: "progresii-bac",
      type: "calc",
      prompt: "Determină numărul real $x$ pentru care $x - 2,\\ x,\\ 2x - 3$ sunt termeni consecutivi ai unei progresii aritmetice.",
      answer: 5,
      explain: "$2x = (x - 2) + (2x - 3) = 3x - 5$, deci $x = 5$.",
    },
    {
      lesson: "progresii-bac",
      type: "calc",
      prompt: "Calculează suma $3 + 7 + 11 + \\dots + 39$.",
      answer: 210,
      explain: "$39 = 3 + (n-1) \\cdot 4$ dă $n = 10$. $S = \\frac{(3 + 39) \\cdot 10}{2} = 210$.",
    },
    {
      lesson: "progresii-bac",
      type: "truefalse",
      prompt: "Suma primelor $n$ numere naturale nenule este $\\frac{n(n+1)}{2}$.",
      answer: true,
      explain: "E o progresie aritmetică cu $a_1 = 1$, $a_n = n$: $S_n = \\frac{(1 + n)\\,n}{2}$.",
    },
    {
      lesson: "progresii-bac",
      type: "calc",
      prompt: "Calculează suma primilor 5 termeni ai progresiei geometrice cu $b_1 = 2$ și $q = -1$.",
      answer: 2,
      explain: "Termenii sunt $2, -2, 2, -2, 2$, cu suma $2$. Din formulă: $2 \\cdot \\frac{(-1)^5 - 1}{-1 - 1} = 2$.",
    },
  ],
};
