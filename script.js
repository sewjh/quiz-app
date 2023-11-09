// let quizText = document.getElementById("quiz-text");
// let replaceQuizBtn = document.querySelector("#replaceBtn");

const quiz = new Quiz(questions);

let trueIcon = '<div class="icon"><i class="fas fa-check"></i></div>';
let falseIcon = '<div class="icon"><i class="fas fa-times"></i></div>';
let startBtn = document.querySelector(".btn-start");
let scoreBox = document.querySelector(".score-box");
let timerText = document.querySelector(".timer-text");
let timerSecond = document.querySelector(".timer-second");

startBtn.addEventListener("click", function(){
    document.querySelector(".quiz-box").classList.add("active");
    startBtn.classList.add("inactive");
    console.log(quiz.displayQuestion());
    getQuestion(quiz.displayQuestion());
    showQuestionAmount(quiz.questionID + 1, quiz.questions.length);
    timer(10);
    timerLine();
})

function getQuestion(question) {
    this.question = `<span>${question.text}</span>`;
    let options = ``;

    for (let answer in question.options){
        options += `
        <div class="option">
        <span><b>${answer}</b>: ${question.options[answer]}</span>
        </div>
        `;
    }

    const optionList = document.querySelector(".option-list");

    document.querySelector(".question-text").innerHTML = this.question;
    optionList.innerHTML = options;

    const option = optionList.querySelectorAll(".option");

    for (let opt of option) {
        opt.setAttribute("onclick", "optionSelected(this)");
    }
}

function optionSelected(option) {
    clearInterval(counter);
    clearInterval(counterLine);
    let answer = option.querySelector("span b").textContent; // seçili parametrenin yazı içeriğini almak
    let question = quiz.displayQuestion();
    if (question.checkQuestion(answer) == true) {
        quiz.correctAnswers += 1;
        option.classList.add("correct");
        option.insertAdjacentHTML("beforeend", trueIcon);
    } else {
        option.classList.add("incorrect");
        option.insertAdjacentHTML("beforeend", falseIcon);
    }

    for (let i = 0; i < document.querySelectorAll(".option-list .option").length; i++) {
        document.querySelectorAll(".option-list .option")[i].classList.add("disabled");
    }

    document.querySelector(".next-button").classList.add("show");
}

document.querySelector(".next-button").addEventListener("click", function() {
    if (quiz.questions.length - 1 > quiz.questionID) {
        quiz.questionID += 1;
        console.log(quiz.displayQuestion());
        getQuestion(quiz.displayQuestion());
        clearInterval(counter);
        timer(10);
        clearInterval(counterLine);
        timerLine();
        showQuestionAmount(quiz.questionID + 1, quiz.questions.length);
        document.querySelector(".next-button").classList.remove("show");
    } else {
        document.querySelector(".quiz-box").classList.remove("active");
        scoreBox.classList.add("active");
        document.querySelector(".next-button").classList.remove("show");
        showScore(quiz.questions.length, quiz.correctAnswers);
    }
})

function showQuestionAmount(questionOrder, questionAmount) {
    let tag = `<span class="badge bg-warning">${questionOrder} / ${questionAmount}</span>`;
    document.querySelector(".quiz-box .question-index").innerHTML = tag;
}

function showScore(totalQuestion, correctAnswers) {
    let tag = `Toplam ${totalQuestion} sorudan ${correctAnswers} doğru cevap verdiniz.`;
    document.querySelector(".score-box .score-text").innerHTML = tag;
}

document.querySelector(".btn-finish").addEventListener("click", function() {
    window.location.reload(); // sayfayı yenilemek
})

document.querySelector(".btn-replay").addEventListener("click", function() {
    quiz.questionID = 0;
    quiz.correctAnswers = 0;
    document.querySelector(".score-box").classList.remove("active");
    document.querySelector(".btn-start").click();
})

let counter;
function timer(time) {
    counter = setInterval(timeFunction, 1000); // sayacı bir değişkene aktarmak

    function timeFunction() {
        timerSecond.textContent = time;
        time--;

        if(time < 0) {
            clearInterval(counter); // sayacı durdurmak
            timerText.textContent = "Süre bitti!";

            for (let option of document.querySelector(".option-list").children) {
                option.classList.add("disabled");
                if (option.querySelector("span b").textContent == quiz.displayQuestion().correct) {
                    option.classList.add("correct");
                    option.insertAdjacentHTML("beforeend", trueIcon);
                }
            }
            document.querySelector(".next-button").classList.add("show");
        }
    }
}

let counterLine;
function timerLine() {
    let lineWidth = 0;
    counterLine = setInterval(timerLineAnimation, 25);

    function timerLineAnimation() {
        lineWidth += 1;
        document.querySelector(".timer-line").style.width = lineWidth + "px";
        
        if (lineWidth > 449) {
            clearInterval(counterLine);
        }
    }
}