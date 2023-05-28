const cors = require('cors');
const express = require('express');
const app = express();
app.use(cors());

const port = 8080;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});

// Define the Morse code mappings for English letters, numbers, and symbols
const morseCodeMappings = {
    // English letters, numbers, and symbols
    A: ".-",
    B: "-...",
    C: "-.-.",
    D: "-..",
    E: ".",
    F: "..-.",
    G: "--.",
    H: "....",
    I: "..",
    J: ".---",
    K: "-.-",
    L: ".-..",
    M: "--",
    N: "-.",
    O: "---",
    P: ".--.",
    Q: "--.-",
    R: ".-.",
    S: "...",
    T: "-",
    U: "..-",
    V: "...-",
    W: ".--",
    X: "-..-",
    Y: "-.--",
    Z: "--..",
    0: "-----",
    1: ".----",
    2: "..---",
    3: "...--",
    4: "....-",
    5: ".....",
    6: "-....",
    7: "--...",
    8: "---..",
    9: "----.",
    ".": ".-.-.-",
    ",": "--..--",
    "?": "..--..",
    "'": ".----.",
    "!": "-.-.--",
    "/": "-..-.",
    "(": "-.--.",
    ")": "-.--.-",
    "&": ".-...",
    ":": "---...",
    ";": "-.-.-.",
    "=": "-...-",
    "+": ".-.-.",
    "-": "-....-",
    _: "..--.-",
    '"': ".-..-.",
    $: "...-..-",
    "@": ".--.-.",
    " ": " "
};

// Define the Morse code mappings for English letters, numbers, and symbols
const reversedMorseCodeMappings = {
    // English letters, numbers, and symbols
    ".-": "A",
    "-...": "B",
    "-.-.": "C",
    "-..": "D",
    ".": "E",
    "..-.": "F",
    "--.": "G",
    "....": "H",
    "..": "I",
    ".---": "J",
    "-.-": "K",
    ".-..": "L",
    "--": "M",
    "-.": "N",
    "---": "O",
    ".--.": "P",
    "--.-": "Q",
    ".-.": "R",
    "...": "S",
    "-": "T",
    "..-": "U",
    "...-": "V",
    ".--": "W",
    "-..-": "X",
    "-.--": "Y",
    "--..": "Z",
    "-----": "0",
    ".----": "1",
    "..---": "2",
    "...--": "3",
    "....-": "4",
    ".....": "5",
    "-....": "6",
    "--...": "7",
    "---..": "8",
    "----.": "9",
    ".-.-.-": ".",
    "--..--": ",",
    "..--..": "?",
    ".----.": "'",
    "-.-.--": "!",
    "-..-.": "/",
    "-.--.": "(",
    "-.--.-": ")",
    ".-...": "&",
    "---...": ":",
    "-.-.-.": ";",
    "-...-": "=",
    ".-.-.": "+",
    "-....-": "-",
    "..--.-": "_",
    ".-..-.": '"',
    "...-..-": "$",
    ".--.-.": "@",
    " ": "/"
};

function strToMorse(letters) {
    const result = [];

    for (let i = 0; i < letters.length; i++) {
        const letter = letters[i].toUpperCase();
        const morseCode = morseCodeMappings[letter];
        
        if (morseCode) {
            result.push(morseCode);
        } else {
            result.push(letter);
        }
        result.push(' ');
    }
    console.log(result);
    return result;
}

const splitWithReplace = (str, separator, replacer) => {
    const result = [];
    let word = '';
    for (c of str) {
        if (c == separator) {
            result.push(word);
            result.push(replacer);
            word = '';
        } else {
            word += c;
        }
    }
    result.push(word);
    return result;
}

const morseToStr = (morse) => {
    morse = splitWithReplace(morse, " ", " ");
    console.log(morse);
    const result = [];

    for (let c of morse) {
        const letter = c.toUpperCase();
        const str = reversedMorseCodeMappings[letter];

        if (str) {
            result.push(str);
        } else {
            result.push(letter);
        }
    }

    return result;
}

app.get('/', (req, res) => {
    res.send('MainPage');
});

app.get('/incode', (req, res) => {
    res.send(strToMorse(req.query.str).join(''));
});

app.get('/decode', (req, res) => {
    res.send(morseToStr(req.query.str));
})