// importuje wersję AJV obsługującą standard JSON Schema draft 2020-12
const Ajv2020 = require("ajv/dist/2020");

// moduł 'fs' pozwala czytać pliki z dysku (File System)
const fs = require("fs");

// tworzy instancję walidatora AJV w trybie bez ścisłych ograniczeń
// strict: false — oznacza, że AJV nie będzie zgłaszał błędów dla drobnych nieścisłości w schemacie
const ajv = new Ajv2020({ strict: false });

// wczytuje zawartość pliku questions.schema.json jako tekst i zamienia na obiekt JS
const schema = JSON.parse(fs.readFileSync("./questions.schema.json", "utf-8"));

// wczytuje plik questions.json (z danymi quizu) i konwertuje na obiekt JS
const data = JSON.parse(fs.readFileSync("./questions.json", "utf-8"));

// kompiluje schemat — czyli AJV tworzy funkcję, która potrafi sprawdzić dane względem schematu
const validate = ajv.compile(schema);

// uruchamia walidację — sprawdza, czy dane z questions.json pasują do reguł ze schematu
const valid = validate(data);

// jeśli dane są poprawne, wypisuje komunikat sukcesu w konsoli
if (valid) {
    console.log("✅ Dane są poprawne względem schematu!");
}
// jeśli dane są niepoprawne, pokazuje błędy walidacji (co dokładnie jest źle)
else {
    console.error("❌ Błędy walidacji:", validate.errors);
}