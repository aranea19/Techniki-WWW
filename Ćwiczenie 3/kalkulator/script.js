///////////////////////////
// KALKULATOR
///////////////////////////

const wynik = document.getElementById('wynik');

// funkcja klasyczna do dodawania znaków
function dodajZnak(znak) {
  wynik.value += znak;
}

// funkcja obliczająca wynik (strzałkowa)
const oblicz = () => {
  if (!wynik.value) { // falsy sprawdzenie
    alert("Brak wartości do obliczenia!");
    return;
  }
  try {
    wynik.value = eval(wynik.value); // dynamiczne typowanie
  } catch {
    wynik.value = "Błąd";
  }
}

// Funkcja resetująca wynik
function wyczysc() {
  wynik.value = "";
}




///////////////////////////
// INNE ZAGADNIENIA (EKSPERYMENT)
///////////////////////////

// HOISTING
console.log("Hoisting funcHoist():", funcHoist());
function funcHoist() {
  return "Hoisting działa!";
}

// TDZ
// console.log(myLet); //  ReferenceError - TDZ
let myLet = 10;
const myConst = 20;

// prymitywy vs obiekty / referencja vs wartość
const num = 5;           // prymityw
const obj = { val: 5 };  // obiekt
const objRef = obj;      // referencja
objRef.val = 10;
console.log("obj.val po zmianie przez referencję:", obj.val);
console.log("typeof null:", typeof null);

// == vs ===
let test = 10;
if (test == "10") console.log("== porównanie działa");
if (test === 10) console.log("=== porównanie działa");

// rest parameter i for…of
function dodajWiele(...znaki) {
  for (const z of znaki) {
    dodajZnak(z);
  }
}

// for…in na obiekcie
const sampleObj = { a: 1, b: 2, c: 3 };
for (const key in sampleObj) {
  console.log(`key: ${key}, value: ${sampleObj[key]}`);
}

// funkcja z this w obiekcie
const calculator = {
  wynik: "",
  dodaj: function(znak) {
    this.wynik += znak;
    console.log("this.wynik:", this.wynik);
  }
};

// demonstracja wartości vs referencji
let prim1 = 5;
let prim2 = prim1;
prim2 = 10;
console.log("Prymitywy:", prim1, prim2); // 5,10

let obj1 = { a: 1 };
let obj2 = obj1;
obj2.a = 99;
console.log("Obiekty:", obj1.a, obj2.a); // 99,99
