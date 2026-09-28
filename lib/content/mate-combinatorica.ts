import type { Unit } from "./types";

// Matematică · capitolul 5 — metode de numărare, binomul lui Newton,
// probabilități și calcul cu procente. La bac: Subiectul I, la M1 și la M2.

export const combinatorica: Unit = {
  id: "combinatorica",
  subject: "matematica",
  title: "Combinatorică și probabilități",
  blurb: "Permutări, aranjamente, combinări, binomul lui Newton, probabilități și procente.",
  examRef: "Subiectul I",
  lessons: [
    {
      id: "permutari-aranjamente",
      title: "Permutări și aranjamente",
      cards: [
        {
          type: "learn",
          title: "Permutări: toți, în ordine",
          body: "În câte moduri poți așeza $n$ obiecte în ordine? În $n!$ moduri (se citește „n factorial”):\n\n$$P_n = n! = 1 \\cdot 2 \\cdot 3 \\cdots n$$\n\nExemplu: 4 cărți pe un raft: $4! = 24$ de ordini. Prin convenție, $0! = 1$.",
        },
        {
          type: "calc",
          prompt: "În câte moduri se pot așeza 5 elevi pe 5 scaune?",
          answer: 120,
          explain: "$P_5 = 5! = 120$.",
        },
        {
          type: "learn",
          title: "Aranjamente: câțiva, în ordine",
          body: "Alegi $k$ din $n$ **și ordinea contează** (primul, al doilea...):\n\n$$A_n^k = \\frac{n!}{(n-k)!}$$\n\nExemplu: câte numere de 3 cifre distincte poți forma cu cifrele $\\{1, 2, 3, 4\\}$? $A_4^3 = 4 \\cdot 3 \\cdot 2 = 24$.",
        },
        {
          type: "calc",
          prompt: "Calculează $A_6^2$.",
          answer: 30,
          explain: "$A_6^2 = \\frac{6!}{4!} = 6 \\cdot 5 = 30$.",
        },
        {
          type: "calc",
          prompt: "Din 10 elevi se aleg un șef și un adjunct de clasă. În câte moduri?",
          answer: 90,
          explain: "Ordinea contează (șef ≠ adjunct): $A_{10}^2 = 10 \\cdot 9 = 90$.",
        },
        {
          type: "learn",
          title: "Numărul de funcții",
          body: "Dacă $A$ are $m$ elemente și $B$ are $n$ elemente, există $n^m$ funcții $f: A \\to B$: fiecare dintre cele $m$ elemente își alege imaginea din $n$ variante.\n\nExemplu: $f: \\{1, 2, 3\\} \\to \\{a, b\\}$ are $2^3 = 8$ variante.",
        },
        {
          type: "calc",
          prompt: "Câte funcții $f: \\{1, 2\\} \\to \\{1, 2, 3, 4\\}$ există?",
          answer: 16,
          explain: "$4^2 = 16$: fiecare dintre cele 2 elemente are 4 imagini posibile.",
        },
        {
          type: "calc",
          prompt: "Calculează $\\frac{6!}{4!}$.",
          answer: 30,
          explain: "$\\frac{6!}{4!} = 6 \\cdot 5 = 30$. Simplifici, nu calculezi factorialele întregi.",
        },
        {
          type: "truefalse",
          prompt: "$0! = 0$",
          answer: false,
          explain: "Prin definiție, $0! = 1$.",
        },
      ],
    },
    {
      id: "combinari-binom",
      title: "Combinări și binomul lui Newton",
      cards: [
        {
          type: "learn",
          title: "Combinări: ordinea nu contează",
          body: "Alegi $k$ din $n$, dar ordinea nu contează (o echipă, o submulțime):\n\n$$C_n^k = \\frac{n!}{k!\\,(n-k)!}$$\n\nExemplu: 2 elevi din 5 pentru un proiect: $C_5^2 = 10$.",
        },
        {
          type: "calc",
          prompt: "Calculează $C_6^2$.",
          answer: 15,
          explain: "$\\frac{6 \\cdot 5}{2} = 15$.",
        },
        {
          type: "learn",
          title: "Scurtături",
          body: "$C_n^k = C_n^{n-k}$: să alegi 8 din 10 e același lucru cu a alege cei 2 care rămân.\n\n$C_n^0 = C_n^n = 1$ și $C_n^1 = n$.\n\nO mulțime cu $n$ elemente are în total $2^n$ submulțimi, iar $C_n^k$ dintre ele au exact $k$ elemente.",
        },
        {
          type: "calc",
          prompt: "Calculează $C_{10}^8$.",
          answer: 45,
          explain: "$C_{10}^8 = C_{10}^2 = \\frac{10 \\cdot 9}{2} = 45$.",
        },
        {
          type: "calc",
          prompt: "Câte submulțimi are mulțimea $\\{a, b, c, d\\}$?",
          answer: 16,
          explain: "$2^4 = 16$ (inclusiv mulțimea vidă și mulțimea întreagă).",
        },
        {
          type: "learn",
          title: "Binomul lui Newton",
          body: "$$(a + b)^n = C_n^0 a^n + C_n^1 a^{n-1} b + \\dots + C_n^n b^n$$\n\nTermenul general: $T_{k+1} = C_n^k\\, a^{n-k}\\, b^k$.\n\nDezvoltarea are $n + 1$ termeni, iar suma coeficienților binomiali este $2^n$.",
        },
        {
          type: "calc",
          prompt: "Câți termeni are dezvoltarea $(x + 2)^7$?",
          answer: 8,
          explain: "$n + 1 = 8$ termeni.",
        },
        {
          type: "calc",
          prompt: "Care este suma coeficienților binomiali din dezvoltarea $(a + b)^5$?",
          answer: 32,
          explain: "$C_5^0 + C_5^1 + \\dots + C_5^5 = 2^5 = 32$.",
        },
        {
          type: "choice",
          prompt: "Dintr-o clasă de 20 de elevi se aleg 3 pentru olimpiadă. Ce folosești?",
          options: ["$C_{20}^3$", "$A_{20}^3$", "$P_{20}$", "$20^3$"],
          answer: 0,
          explain: "Cei 3 formează un grup, fără ordine între ei: combinări.",
        },
      ],
    },
    {
      id: "probabilitati-procente",
      title: "Probabilități și procente",
      cards: [
        {
          type: "learn",
          title: "Probabilitatea",
          body: "Când toate cazurile sunt la fel de probabile:\n\n$$P = \\frac{\\text{numărul de cazuri favorabile}}{\\text{numărul de cazuri posibile}}$$\n\nExemplu: la aruncarea unui zar, $P(\\text{număr par}) = \\frac{3}{6} = \\frac{1}{2}$.",
        },
        {
          type: "learn",
          title: "Itemul clasic de bac",
          body: "„Calculați probabilitatea ca, alegând un număr din mulțimea numerelor naturale de două cifre, acesta să fie divizibil cu 5.”\n\nCazuri posibile: de la 10 la 99, adică **90**. Cazuri favorabile: $10, 15, \\dots, 95$, adică **18**. $P = \\frac{18}{90} = \\frac{1}{5}$.\n\nÎn barem, numărul de cazuri posibile și cel de cazuri favorabile se punctează separat.",
        },
        {
          type: "calc",
          prompt: "Alegi un număr natural de două cifre. Care este probabilitatea să fie divizibil cu 10?",
          answer: 0.1,
          display: "$\\frac{1}{10}$",
          explain: "Favorabile: $10, 20, \\dots, 90$, adică 9. Posibile: 90. $P = \\frac{9}{90} = \\frac{1}{10}$.",
        },
        {
          type: "calc",
          prompt: "Alegi un element din mulțimea $\\{1, 2, \\dots, 20\\}$. Care este probabilitatea să fie număr prim?",
          answer: 0.4,
          display: "$\\frac{2}{5}$",
          explain: "Numerele prime: $2, 3, 5, 7, 11, 13, 17, 19$, adică 8. $P = \\frac{8}{20} = \\frac{2}{5}$.",
        },
        {
          type: "learn",
          title: "Procente",
          body: "$p\\%$ din $x$ înseamnă $\\frac{p}{100} \\cdot x$.\n\nO scumpire cu $p\\%$ înmulțește prețul cu $1 + \\frac{p}{100}$; o ieftinire cu $p\\%$ îl înmulțește cu $1 - \\frac{p}{100}$.\n\nExemplu: 200 de lei scumpit cu 10% devine $200 \\cdot 1{,}1 = 220$ de lei.",
        },
        {
          type: "calc",
          prompt: "Un produs costă 250 de lei și se ieftinește cu 20%. Cât costă după ieftinire?",
          answer: 200,
          unit: "lei",
          explain: "$250 \\cdot 0{,}8 = 200$ de lei.",
        },
        {
          type: "calc",
          prompt: "După o ieftinire cu 20%, un produs costă 160 de lei. Cât costa inițial?",
          answer: 200,
          unit: "lei",
          explain: "$x \\cdot 0{,}8 = 160$, deci $x = 200$ de lei.",
        },
        {
          type: "truefalse",
          prompt: "O scumpire cu 10% urmată de o ieftinire cu 10% readuce prețul la valoarea inițială.",
          answer: false,
          explain: "$x \\cdot 1{,}1 \\cdot 0{,}9 = 0{,}99x$. Prețul final e cu 1% mai mic.",
        },
      ],
    },
  ],
  test: [
    // permutări și aranjamente
    {
      lesson: "permutari-aranjamente",
      type: "calc",
      prompt: "Calculează $A_5^3$.",
      answer: 60,
      explain: "$5 \\cdot 4 \\cdot 3 = 60$.",
    },
    {
      lesson: "permutari-aranjamente",
      type: "calc",
      prompt: "Calculează $4! + 3!$.",
      answer: 30,
      explain: "$24 + 6 = 30$.",
    },
    {
      lesson: "permutari-aranjamente",
      type: "calc",
      prompt: "Câte funcții $f: \\{1, 2\\} \\to \\{1, 2, 3\\}$ există?",
      answer: 9,
      explain: "$3^2 = 9$.",
    },
    {
      lesson: "permutari-aranjamente",
      type: "truefalse",
      prompt: "$A_n^n = n!$",
      answer: true,
      explain: "$\\frac{n!}{0!} = n!$: să aranjezi toate elementele e o permutare.",
    },
    // combinări și binom
    {
      lesson: "combinari-binom",
      type: "calc",
      prompt: "Calculează $C_7^2$.",
      answer: 21,
      explain: "$\\frac{7 \\cdot 6}{2} = 21$.",
    },
    {
      lesson: "combinari-binom",
      type: "calc",
      prompt: "Calculează $C_8^6$.",
      answer: 28,
      explain: "$C_8^6 = C_8^2 = \\frac{8 \\cdot 7}{2} = 28$.",
    },
    {
      lesson: "combinari-binom",
      type: "calc",
      prompt: "Câți termeni are dezvoltarea $(x - 1)^{10}$?",
      answer: 11,
      explain: "$n + 1 = 11$.",
    },
    {
      lesson: "combinari-binom",
      type: "truefalse",
      prompt: "$C_n^0 = 1$ pentru orice număr natural $n$.",
      answer: true,
      explain: "Există o singură submulțime cu 0 elemente: mulțimea vidă.",
    },
    // probabilități și procente
    {
      lesson: "probabilitati-procente",
      type: "calc",
      prompt: "Se aruncă un zar. Care este probabilitatea să apară un număr mai mare decât 4?",
      answer: 1 / 3,
      tolerance: 0.005,
      display: "$\\frac{1}{3}$",
      explain: "Favorabile: 5 și 6. $P = \\frac{2}{6} = \\frac{1}{3}$.",
    },
    {
      lesson: "probabilitati-procente",
      type: "calc",
      prompt: "Alegi un element din $\\{1, 2, \\dots, 20\\}$. Care este probabilitatea să fie pătrat perfect?",
      answer: 0.2,
      display: "$\\frac{1}{5}$",
      explain: "Pătratele perfecte: $1, 4, 9, 16$. $P = \\frac{4}{20} = \\frac{1}{5}$.",
    },
    {
      lesson: "probabilitati-procente",
      type: "calc",
      prompt: "Un produs de 150 de lei se scumpește cu 20%. Cât costă după scumpire?",
      answer: 180,
      unit: "lei",
      explain: "$150 \\cdot 1{,}2 = 180$ de lei.",
    },
    {
      lesson: "probabilitati-procente",
      type: "truefalse",
      prompt: "25% din 80 este 20.",
      answer: true,
      explain: "$\\frac{25}{100} \\cdot 80 = 20$.",
    },
  ],
};
