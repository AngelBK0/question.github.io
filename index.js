const questions = [
    {
        question: "Do you eat vegetables every day?",
        optionA: "Yes, I eat them at every meal.",
        optionB: "No",
        optionC: "5 days",
        optionD: "7 days",
        correctOption: "optionD"
    },

    {
        question: "How often do you exercise?",
        optionA: "I exercise every day.",
        optionB: "I exercise 3-4 times a week.",
        optionC: "I exercise once a week.",
        optionD: "I don’t exercise at all.",
        correctOption: "optionA"
    },

    {
		question: "How many hours do you sleep each night?",
        optionA: "7-8 hours",
        optionB: "6-7 hours",
        optionC: "4-6 hours",
        optionD: "Less than 4 hours",
        correctOption: "optionA"
    },

    {
		question: "What do you drink more often?",
        optionA: "I drink water all the time.",
        optionB: "I drink soda mostly.",
        optionC: "I drink coffee every day.",
        optionD: "I drink tea every day.",
        correctOption: "optionA"
    },

    {
		question: "Do you take breaks during the day?",
        optionA: "Yes, I take regular breaks to relax or stretch.",
        optionB: "I take breaks only when I’m tired.",
        optionC: "I never take breaks.",
        optionD: "I take a break when I feel like it.",
        correctOption: "optionA"
    },

    {
		question: "How often do you eat fast food?",
        optionA: "Never",
        optionB: "Once or twice a month",
        optionC: "1-2 times a week",
        optionD: "Almost every day",
        correctOption: "optionA"
    },

    {
		question: "Do you eat sugary snacks or drinks?",
        optionA: "I avoid them completely.",
        optionB: "I eat them occasionally.",
        optionC: "I eat sugary snacks sometimes.",
        optionD: "I eat sugary snacks every day.",
        correctOption: "optionA"
    },

    {
		question: "How do you manage stress?",
        optionA: "I use relaxation techniques like meditation or deep breathing.",
        optionB: "I manage stress okay, but sometimes it’s hard.",
        optionC: "I get stressed often, but I try to relax.",
        optionD: "I feel stressed all the time.",
        correctOption: "optionA"
    },

    {
		question: "Do you smoke or use tobacco products?",
        optionA: "No, I don’t smoke or use tobacco.",
        optionB: "I don’t smoke but sometimes I use tobacco products.",
        optionC: "I smoke occasionally.",
        optionD: "Yes, I smoke regularly.",
        correctOption: "optionA"
    },

    {
		question: "Do you go for medical check-ups regularly?",
        optionA: "Yes, I go for check-ups every year.",
        optionB: "I go for check-ups every 2-3 years.",
        optionC: "I only go when I feel sick.",
        optionD: "I don’t go for check-ups at all.",
        correctOption: "optionA"
    },
//12
    {
        question: "Random",
        optionA: "a",
        optionB: "b",
        optionC: "c",
        optionD: "d",
        correctOption: "optionA"
    },

 
]



let shuffledQuestions = [] // Arreglo vacío para almacenar las preguntas seleccionadas aleatoriamente

function handleQuestions() {
    // Función para barajar las preguntas y agregar 10 preguntas a shuffledQuestions
    while (shuffledQuestions.length < 10) { // Solo seleccionamos 10 preguntas
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}

let questionNumber = 1
let playerScore = 0  
let wrongAttempt = 0 
let indexNumber = 0

// Función para mostrar la siguiente pregunta
function NextQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("player-score").innerHTML = playerScore
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;
}

function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber] // Obtiene la pregunta actual 
    const currentQuestionAnswer = currentQuestion.correctOption // Obtiene la respuesta correcta
    const options = document.getElementsByName("option"); // Obtiene todas las opciones de respuesta

    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            correctOption = option.labels[0].id
        }
    })
   
    // Comprobar si se ha seleccionado una opción
    if (!options[0].checked && !options[1].checked && !options[2].checked && !options[3].checked) {
        document.getElementById('option-modal').style.display = "flex"
    }

    // Comprobar si la respuesta seleccionada es correcta
    options.forEach((option) => {
        if (option.checked && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "green"
            playerScore += 10  // Asignamos 10 puntos por una respuesta correcta
            indexNumber++
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            document.getElementById(wrongLabelId).style.backgroundColor = "red"
            document.getElementById(correctOption).style.backgroundColor = "green"
            wrongAttempt++
            indexNumber++
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }
    })
}

// Función para manejar el siguiente paso y la visualización de la siguiente pregunta
function handleNextQuestion() {
    checkForAnswer()
    unCheckRadioButtons()
    setTimeout(() => {
        if (indexNumber < 10) { // Solo hay 10 preguntas
            NextQuestion(indexNumber)
        }
        else {
            handleEndGame()
        }
        resetOptionBackground()
    }, 1000);
}

// Función para reiniciar el fondo de las opciones
function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}

// Función para desmarcar las opciones de respuesta
function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

// Función para finalizar el juego y mostrar los resultados
function handleEndGame() {
    let remark = null
    let remarkColor = null

    // Verificación de la calificación del jugador y comentarios
    if (playerScore <= 30) {
        remark = "Bad Grades, Keep Practicing."
        remarkColor = "red"
    }
    else if (playerScore > 30 && playerScore <= 50) {
        remark = "Average Grades, You can do better."
        remarkColor = "orange"
    }
    else if (playerScore > 50) {
        remark = "Excellent, Keep the good work going."
        remarkColor = "green"
    }

    // Mostrar el puntaje y los comentarios
    const playerGrade = (playerScore / 100) * 100
    document.getElementById('remarks').innerHTML = remark
    document.getElementById('remarks').style.color = remarkColor
    document.getElementById('grade-percentage').innerHTML = playerGrade
    document.getElementById('wrong-answers').innerHTML = wrongAttempt
    document.getElementById('right-answers').innerHTML = playerScore
    document.getElementById('score-modal').style.display = "flex"
}

// Función para cerrar el modal de resultados y reiniciar el juego
function closeScoreModal() {
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    shuffledQuestions = []
    NextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none"
}

// Función para cerrar el modal de advertencia (si no se selecciona ninguna respuesta)
function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"
}