// Hardcoded IQ-style questions (10 total)
const questions = [
    {
        question: "If you rearrange the letters 'CIFAIPC' you get the name of a:",
        options: ["City", "Ocean", "Country", "Animal"],
        correctAnswer: "Pacific"
    },
    {
        question: "What number comes next in the sequence? 2, 6, 12, 20, 30, __?",
        options: ["36", "40", "42", "56"],
        correctAnswer: "42"
    },
    {
        question: "Which one of the five is least like the other four?",
        options: ["Dog", "Mouse", "Lion", "Snake"],
        correctAnswer: "Snake"
    },
    {
        question: "Which number is the odd one out: 3, 7, 11, 18, 21?",
        options: ["18", "7", "3", "11"],
        correctAnswer: "18"
    },
    {
        question: "If all Bloops are Razzies and all Razzies are Lazzies, are all Bloops definitely Lazzies?",
        options: ["Yes", "No", "Cannot tell", "Only some"],
        correctAnswer: "Yes"
    },
    {
        question: "What is the missing number? 4, 9, 16, 25, __, 49",
        options: ["30", "36", "40", "42"],
        correctAnswer: "36"
    },
    {
        question: "Which word does not belong: Inch, Kilogram, Centimeter, Yard?",
        options: ["Kilogram", "Yard", "Inch", "Centimeter"],
        correctAnswer: "Kilogram"
    },
    {
        question: "Mary's father has five daughters: Nana, Nene, Nini, Nono. What is the fifth daughter's name?",
        options: ["Nunu", "Mary", "Nana", "None"],
        correctAnswer: "Mary"
    },
    {
        question: "If two hours ago, it was as long after one o’clock as it was before one o’clock yesterday, what time is it now?",
        options: ["11 AM", "9 AM", "12 PM", "10 AM"],
        correctAnswer: "9 AM"
    },
    {
        question: "Which is the next number? 1, 4, 9, 16, 25, __?",
        options: ["36", "35", "30", "40"],
        correctAnswer: "36"
    },

    {
        question: "What comes next in the sequence: 2, 6, 12, 20, 30?",
        options: ["36", "42", "40", "48"],
        correctAnswer: "42"
    },
    {
        question: "If you rearrange the letters 'TACOD' you get the name of a:",
        options: ["Animal", "City", "Plant", "Food"],
        correctAnswer: "Taco"
    },
    {
        question: "Which of the following is the odd one out?",
        options: ["Elephant", "Lion", "Tiger", "Shark"],
        correctAnswer: "Shark"
    },
    {
        question: "Which number is missing in the series: 5, 11, 17, 23, __, 35?",
        options: ["29", "27", "28", "30"],
        correctAnswer: "29"
    },
    {
        question: "What is the result of (2 + 3) × (5 - 2)?",
        options: ["12", "15", "20", "25"],
        correctAnswer: "15"
    },
    {
        question: "Which word can be formed from the letters of the word 'HARMONICA'?",
        options: ["Anchor", "March", "Chain", "Roman"],
        correctAnswer: "March"
    },
    {
        question: "What is the missing letter in this sequence: B, C, E, F, H, I, ___?",
        options: ["J", "K", "L", "M"],
        correctAnswer: "K"
    }

];

// Because one question’s correctAnswer is ‘Pacific’ but option has only “City”, "Ocean", etc.
// We'll fix this: For the first question, change correctAnswer to the correct option, e.g. "Ocean"
questions[0].correctAnswer = "Ocean";

// DOM elements
const questionNumberEl = document.getElementById('question-number');
const questionTextEl = document.getElementById('question-text');
const optionsEl = document.getElementById('options');
const progressBarInner = document.getElementById('progress-bar-inner');
const questionSection = document.getElementById('question-section');
const scoreSection = document.getElementById('score-section');
const scoreEl = document.getElementById('score');
const feedbackMessageEl = document.getElementById('feedback-message');
const retryBtn = document.getElementById('retry-btn');

let currentQuestionIndex = 0;
let score = 0;
let acceptingAnswers = true;

function updateProgressBar() {
    const percent = (currentQuestionIndex / questions.length) * 100;
    progressBarInner.style.width = `${percent}%`;
}

function showQuestion() {
    acceptingAnswers = true;
    const q = questions[currentQuestionIndex];
    questionNumberEl.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    questionTextEl.textContent = q.question;

    optionsEl.innerHTML = '';
    q.options.forEach(option => {
        const btn = document.createElement('button');
        btn.textContent = option;
        btn.classList.remove('correct', 'incorrect', 'disabled');
        btn.addEventListener('click', () => selectAnswer(btn, option));
        optionsEl.appendChild(btn);
    });
    updateProgressBar();
}

function selectAnswer(button, selectedOption) {
    if (!acceptingAnswers) return;
    acceptingAnswers = false;

    const correctAnswer = questions[currentQuestionIndex].correctAnswer;
    const isCorrect = selectedOption === correctAnswer;

    if (isCorrect) {
        score++;
        button.classList.add('correct');
    } else {
        button.classList.add('incorrect');
        // Highlight correct option
        Array.from(optionsEl.children).forEach(btn => {
            if (btn.textContent === correctAnswer) {
                btn.classList.add('correct');
            }
        });
    }

    // Disable all options
    Array.from(optionsEl.children).forEach(btn => {
        btn.classList.add('disabled');
    });

    // Wait 1.5 seconds and move to next question or show score
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showScore();
        }
    }, 1500);
}

function showScore() {
    questionSection.style.display = 'none';
    scoreSection.style.display = 'block';
    scoreEl.textContent = score;

    let feedback = "";
    if (score >= 9) {
        feedback = "Excellent! You have a genius-level IQ.";
    } else if (score >= 7) {
        feedback = "Great job! You have above average IQ.";
    } else if (score >= 5) {
        feedback = "Good effort! You have an average IQ.";
    } else {
        feedback = "Keep practicing to improve your IQ.";
    }
    feedbackMessageEl.textContent = feedback;
    progressBarInner.style.width = '100%';
}

retryBtn.addEventListener('click', () => {
    currentQuestionIndex = 0;
    score = 0;
    scoreSection.style.display = 'none';
    questionSection.style.display = 'block';
    updateProgressBar();
    showQuestion();
});

// Start the quiz
showQuestion();