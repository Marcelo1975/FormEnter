// Questions Array
const questions = [
    { question: 'Digite seu primeiro nome' },
    { question: 'Digite seu sobrenome' },
    { question: 'Digite seu e-mail', pattern: /\S+@\S+\.\S+/},
    { question: 'Crier uma senha', type: 'password' },
];

// Trasition Times
const shakeTime = 100; // Shake Trasition Time
const switchTime = 200; // Trasition Between Questions

// Init position at first querstion
let position = 0;

// Init Dom Elements
const formBox = document.querySelector('#form-box');
const nextBtn = document.querySelector('#next-btn');
const prevBtn = document.querySelector('#prev-btn');
const inputGroup = document.querySelector('#input-group');
const inputField = document.querySelector('#input-field');
const inputLabel = document.querySelector('#input-label');
const inputProgress = document.querySelector('#input-progress');
const progress = document.querySelector('#progress-bar');

// Events

// Get question on dom load
document.addEventListener('DOMContentLoaded', getQuestion);

// Next button click
nextBtn.addEventListener('click', validate);

// Input field enter click
inputField.addEventListener('keyup', e => {
    if(e.keyCode == 13) { 
        validate();
    }
});

//Functions

// Get Question from array & add to markup
function getQuestion() {
    // Get current question
    inputLabel.innerHTML = questions[position].question;
    // Get current type
    inputField.type = questions[position].type || 'text';
    // Get current answer
    inputField.value = questions[position].answer || '';
    // Focus on element
    inputField.focus();

    // Set progress bar width - variavel to the questions length
    progress.style.width = (position * 100) / questions.length + '%';

    // Add user icon or back arrow depending on question
    prevBtn.className = position ? 'fas fa-arrow-left' : 'fas fa-user';

    showQuestion();
}

// Display question to user
function showQuestion() {
    inputGroup.style.opacity = 1;
    inputProgress.style.transition = '';
    inputProgress.style.width = '100%';
}

// Hide question from user
function hideQuestion() {
    inputGroup.style.opacity = 0;
    inputLabel.style.marginLeft = 0;
    inputProgress.style.width = 0;
    inputProgress.style.transition = 'none';
    inputGroup.style.border = null;
}

// Validate field 
function validate() {
    // Make sure pattern matches if there is one
    if(!inputField.value.match(questions[position].pattern || /.+/)) {
        inputFail();
    } else {
        inputPass();
    }
}

// Transform to create sheke motion 
function transform(x, y) {
    formBox.style.transform = `translate(${x}px, ${y}px)`;
}

// Function input fail
function inputFail() {
    formBox.className = 'error';
    // Repeat sheke motion - set i to number of shekes
    for(let i = 0; i < 6; i++) {
        setTimeout(transform, shakeTime * i, ((i % 2) * 2 - 1) * 20, 0);
        setTimeout(transform, shakeTime * 6, 0, 0);
        inputField.focus();
    }
}

// Funciton input pass
function inputPass() {
    formBox.className = '';
    setTimeout(transform, shakeTime * 0, 0, 10);
    setTimeout(transform, shakeTime * 1, 0, 0,);

    // Store answer in array
    questions[position].answer = inputField.value;

    // Increment position
    position++;

    // If new question, hide current and get next
    if(questions[position]) {
        hideQuestion();
        getQuestion();
    } else {
        // Remove if no more questions
        hideQuestion();
        formBox.className = 'close';
        progress.style.width = '100%';

        // Form complete
        formComplete();
    }
}

// All fields complete - show h1 end
function formComplete() {
    const h1 = document.createElement('h1');
    h1.classList.add('end');
    h1.appendChild(document.createTextNode(`Obrigado ${questions[0].answer} 
    Você está registrado e receberá um e-mail em breve`));
    setTimeout(() => {
        formBox.parentElement.appendChild(h1);
        setTimeout(() => (h1.style.opacity = 1), 50);
    }, 1000);
}