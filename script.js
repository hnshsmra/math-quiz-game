let score = 0;
let timeLeft = 60;
let timer;
let correctAnswer;

const timerCircle = document.getElementById("timer-progress");
const circleLength = 2 * Math.PI * 90;
timerCircle.style.strokeDasharray = circleLength;
timerCircle.style.strokeDashoffset = 0;

// Generate random question
function generateQuestion() {
    const num1 = Math.floor(Math.random()*10)+1;
    const num2 = Math.floor(Math.random()*10)+1;
    const operatorIndex = Math.floor(Math.random()*3);

    switch(operatorIndex){
        case 0: correctAnswer = num1+num2; break;
        case 1: correctAnswer = num1-num2; break;
        case 2: correctAnswer = num1*num2; break;
    }

    const operator = ['+','-','*'][operatorIndex];
    const questionCircle = document.getElementById("question-circle");
    document.getElementById("question").textContent = `${num1} ${operator} ${num2}`;

    // Glow animation
    questionCircle.classList.add("glow");
    setTimeout(()=> questionCircle.classList.remove("glow"),500);
}

// Timer
function startTimer() {
    clearInterval(timer);
    timerCircle.style.strokeDashoffset = 0;
    timeLeft = 60;

    timer = setInterval(()=>{
        timeLeft--;
        const offset = circleLength*(1 - timeLeft/60);
        timerCircle.style.strokeDashoffset = offset;

        if(timeLeft>30) timerCircle.className="green";
        else if(timeLeft>15) timerCircle.className="orange";
        else timerCircle.className="red";

        if(timeLeft<=0){
            clearInterval(timer);
            gameOver();
        }
    },1000);
}

// Check answer
function checkAnswer() {
    const inputField = document.getElementById("input");
    const userAnswer = parseFloat(inputField.value);
    const questionCircle = document.getElementById("question-circle");
    const scoreDisplay = document.getElementById("score");

    if(inputField.value===""){
        document.getElementById("result").style.color="orange";
        document.getElementById("result").textContent="Please enter an answer!";
        return;
    }

    if(userAnswer===correctAnswer){
        score++;
        document.getElementById("result").style.color="#00ff00";
        document.getElementById("result").textContent="Correct!";
        questionCircle.classList.add("correct");
        scoreDisplay.classList.add("score-pop");
        showConfetti();
    } else {
        document.getElementById("result").style.color="#ff3d3d";
        document.getElementById("result").textContent=`Incorrect! Correct answer: ${correctAnswer}`;
        questionCircle.classList.add("wrong");
    }

    scoreDisplay.textContent=score;
    inputField.value="";
    generateQuestion();
    inputField.focus();

    setTimeout(()=>{
        questionCircle.classList.remove("correct","wrong");
        scoreDisplay.classList.remove("score-pop");
    },500);
}

// Confetti
function showConfetti(){
    const container=document.getElementById("question-circle-container");
    for(let i=0;i<15;i++){
        const confetti=document.createElement("div");
        confetti.classList.add("confetti-piece");
        confetti.style.left=`${Math.random()*200}px`;
        confetti.style.backgroundColor=`hsl(${Math.random()*360},70%,50%)`;
        container.appendChild(confetti);
        setTimeout(()=>confetti.remove(),1000);
    }
}

// Game over
function gameOver(){
    document.getElementById("input").disabled=true;
    document.getElementById("submit-button").disabled=true;
    document.getElementById("result").textContent="";
    document.getElementById("final-score").textContent=score;
    document.getElementById("game-over-screen").style.display="block";
}

// Start game
function startGame(){
    score=0;
    document.getElementById("score").textContent=score;
    document.getElementById("input").disabled=false;
    document.getElementById("submit-button").disabled=false;
    document.getElementById("input").value="";
    document.getElementById("result").textContent="";
    document.getElementById("game-over-screen").style.display="none";
    generateQuestion();
    startTimer();
    document.getElementById("input").focus();
}

// Auto start
window.onload=startGame;
