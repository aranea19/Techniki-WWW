const wynik = document.getElementById('wynik');

function dodajZnak(znak) {
  wynik.value += znak;
}

function oblicz() {
  try {
    wynik.value = eval(wynik.value);
  } catch {
    wynik.value = "Błąd";
  }
}

function wyczysc() {
  wynik.value = "";
}
