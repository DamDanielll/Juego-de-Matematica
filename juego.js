const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'COTG A=?',
    answers: [
      { text: 'A: Cateto Adyacente/Cateto Opuesto', correct: true},
      { text: 'B: Hipotenusa/Cateto Adyacente', correct: false},
      { text: 'C: Hipotenusa/Cateto Opuesto', correct: false},
      { text: 'D: Cateto Opuesto/Cateto Adyacente', correct: false}
    ]
  },
  {
    question: 'SEC A=?',
    answers: [
      { text: 'A: Cateto Opuesto/Hipotenusa', correct: false},
      { text: 'B: Hipotenusa/Cateto Adyacente', correct: true},
      { text: 'C: Cateto Adyacente/Cateto Opuesto', correct: false},
      { text: 'D: Cateto Adyacente/Hipotenusa', correct: false}
    ]
  },
  {
    question: 'COS A=?',
    answers: [
      { text: 'A: Hipotenusa/Cateto Adyacente', correct: false},
      { text: 'B: Cateto Adyacente/Cateto Opuesto', correct: false},
      { text: 'C: Cateto Adyacente/Hipotenusa', correct: true},
      { text: 'D: Hipotenusa/Cateto Adyacente', correct: false}
    ]
  },
  {
    question: 'Expresa el ángulo 80°, 21 Minutos, 36 Segundos en grados',
    answers: [
      { text: 'A: 81.02°', correct: false},
      { text: 'B: 82.44°', correct: false},
      { text: 'C: 80.51°', correct: false},
      { text: 'D: 80.36°', correct: true}
    ]
  },
  {
    question: 'Expresa el ángulo 76.423° en grados, minutos y segundos.',
    answers: [
      { text: 'A: 76°, 26 Minutos, 23.3 Segundos', correct: false},
      { text: 'B: 76°, 25 Minutos, 22.8 Segundos', correct: true},
      { text: 'C: 76°, 24 Minutos, 22.8 Segundos', correct: false},
      { text: 'D: 76°, 25 Minutos, 34.7 Segundos', correct: false}
    ]
  },
  {
    question: 'Expresa el ángulo 84.756° en grados, minutos y segundos.',
    answers: [
      { text: 'A: 84°, 45 Minutos, 21.6 Segundos', correct: true},
      { text: 'B: 85°, 46 Minutos, 23.4 Segunods', correct: false},
      { text: 'C: 84°, 45 Minutos, 20.2 Segundos', correct: false},
      { text: 'D: 84°, 44 Minutos, 31.5 Segundos', correct: false}
    ]
  }
]