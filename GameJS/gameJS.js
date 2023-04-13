const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

let shuffledQuestions, currentQuestionIndex;

/**
 * Start the game by hiding the start button and shuffling the questions
 */
startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});

/**
 * Start the game by hiding the start button and shuffling the questions
 */
function startGame() {
  startButton.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove('hide');
  setNextQuestion();
}

/**
 * Set the next question
 */
function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

/**
 * Show the question and its answers
 * @param {Object} question 
 */
function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

/**
 * Reset the state of the game
 */
function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add('hide');
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

/**
 * Select an answer and set the status class
 * @param {Event} e 
 */
function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
  } else {
    startButton.innerText = 'Restart';
    startButton.classList.remove('hide');
  }
}

/**
 * Set the status class
 * @param {HTMLElement} element 
 * @param {Boolean} correct 
 */
function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
}

/**
 * Clear the status class
 * @param {HTMLElement} element 
 */
 
function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}

const questions = [
  {
    question: ' Bạn hãy cho biết lời kêu gọi cả nước của Bác Hồ: “Dù phải chiến đấu 5 năm, 10 năm, 20 năm hoặc lâu hơn nữa, chúng ta cũng kiên quyết chiến đấu đến thắng lợi hoàn toàn” được ra đời vào thời gian nào?',
    answers: [
      { text: 'Ngày 20/7/1965', correct: true },
      { text: 'Ngày 5/6/1965', correct: false },
      { text: 'Ngày 25/6/1965', correct: false },
      { text: 'Ngày 26/5/1965', correct: false }
    ]
  },
  {
    question: 'Lúc 10h45p, ngày 30/4/1975, diễn ra sự kiện cơ bản nào ở Sài Gòn?',
    answers: [
      { text: 'Dương Văn Minh đầu hàng', correct: false },
      { text: 'Chiến dịch Hồ Chí Minh toàn thắng', correct: false },
      { text: 'Xe tăng tiến vào Dinh Độc Lập', correct: true },
      { text: 'Cắm cờ trên nóc Dinh Độc Lập', correct: false }
    ]
  },
  {
    question: 'Bạn hãy cho biết tên của một chiến dịch đã mở màn cho đại thắng mùa xuân 1975?',
    answers: [
      { text: 'Chiến dịch Huế - Đà Nẵng', correct: false },
      { text: 'Chiến dịch Trị - Thiên ', correct: false },
      { text: 'Chiến dịch Tây Nguyên', correct: true }
    ]
  },
  {
    question: 'Còn cái lai quần cũng đánh” là câu nói nổi tiếng của ai?',
    answers: [
      { text: 'Nguyễn Thị Định', correct: false },
      { text: 'Nguyễn Thị Út', correct: true },
      { text: 'Nguyễn Thị Bình', correct: false },
      { text: 'Lê Thị Hồng Gấm', correct: false }
    ]
  },
  {
    question: 'Tên ngôi trường đồng chí Trần Phú đã theo học tiểu học?',
    answers: [
      { text: 'Pháp – Việt Đông Ba', correct: false },
      { text: 'Quốc học Huế', correct: true },
      { text: 'Pháp – Việt Cao Xuân Dục', correct: false },
      { text: ' Dục Thanh', correct: false }
    ]
  }
];