// zmienna przechowująca numer aktualnego pytania (zaczynamy od 0)
let currentQuestion = 0;

// licznik poprawnych odpowiedzi
let score = 0;

// tablica na wszystkie pytania wczytane z pliku JSON
let questions = [];

// funkcja asynchroniczna wczytująca pytania z pliku questions.json
async function loadQuestions() {
    // pobiera plik questions.json z serwera (fetch działa podobnie jak AJAX)
    const response = await fetch('questions.json');
    // konwertuje pobrane dane z formatu JSON do obiektu JavaScript
    questions = await response.json();
    // wywołuje funkcję pokazującą pierwsze pytanie
    showQuestion();
}

// funkcja wyświetlająca jedno pytanie i jego odpowiedzi
function showQuestion() {
    // pobiera bieżące pytanie z tablicy
    const q = questions[currentQuestion];
    // wpisuje treść pytania do elementu HTML o id="question"
    document.getElementById('question').textContent = `${currentQuestion + 1}. ${q.question}`;

    // pobiera kontener na odpowiedzi
    const answersDiv = document.getElementById('answers');
    // czyści wcześniejsze odpowiedzi, jeśli jakieś były
    answersDiv.innerHTML = '';

    // dla każdej odpowiedzi tworzy przycisk
    q.answers.forEach((answer, index) => {
        // tworzy nowy przycisk
        const btn = document.createElement('button');
        // ustawia tekst na odpowiedź
        btn.textContent = answer;
        // dodaje klasę CSS do stylowania przycisków
        btn.classList.add('answer-btn');
        // ustawia akcję po kliknięciu — wywołanie funkcji selectAnswer z numerem odpowiedzi
        btn.onclick = () => selectAnswer(index);
        // dodaje przycisk do kontenera
        answersDiv.appendChild(btn);
    });

    // ukrywa przycisk „Dalej”, dopóki użytkownik nie wybierze odpowiedzi
    document.getElementById('next-btn').classList.add('hidden');
}

// funkcja wywoływana po kliknięciu odpowiedzi
function selectAnswer(index) {
    // pobiera aktualne pytanie
    const q = questions[currentQuestion];
    // pobiera wszystkie przyciski odpowiedzi
    const buttons = document.querySelectorAll('.answer-btn');

    // przechodzi przez każdy przycisk, żeby zaznaczyć poprawną/niepoprawną odpowiedź
    buttons.forEach((btn, i) => {
        // blokuje możliwość dalszego klikania po wyborze odpowiedzi
        btn.disabled = true;
        // jeśli to poprawna odpowiedź — koloruje na zielono
        if (i === q.correct) btn.style.background = '#90ee90'; // zielony
        // jeśli to błędna odpowiedź użytkownika — koloruje na czerwono
        if (i === index && i !== q.correct) btn.style.background = '#f08080'; // czerwony
    });

    // jeśli użytkownik wybrał poprawną odpowiedź — zwiększa wynik
    if (index === q.correct) score++;

    // pokazuje przycisk "Dalej", żeby przejść do kolejnego pytania
    document.getElementById('next-btn').classList.remove('hidden');
}

// po kliknięciu przycisku "Dalej"
document.getElementById('next-btn').onclick = () => {
    // przechodzi do kolejnego pytania
    currentQuestion++;
    // jeśli są jeszcze pytania — pokazuje następne
    if (currentQuestion < questions.length) {
        showQuestion();
    }
    // jeśli pytań już nie ma — pokazuje wynik
    else {
        showResult();
    }
};

// funkcja pokazująca końcowy wynik quizu
function showResult() {
    // ukrywa cały quiz (pytania i odpowiedzi)
    document.getElementById('quiz').classList.add('hidden');
    // pokazuje sekcję z wynikiem
    const resultDiv = document.getElementById('result');
    resultDiv.classList.remove('hidden');
    // wpisuje wynik użytkownika w formacie "Twój wynik: X / Y"
    resultDiv.textContent = `Twój wynik: ${score} / ${questions.length}`;
}

// uruchamia wczytywanie pytań po załadowaniu strony
loadQuestions();