let score = 0;
let currentQuestion = 0;
let userScore = {
    correct: 0,
    incorrect: -1,
};
let questions = [
  {
    title: "What is the correct term for a paintball gun?",
    answers: ['Paintball gun','Paintball marker','Paint shooter','Pew pew pew'],
    correct: 1
  },
  {
    title: "What is a paintball made of?",
    answers: ['Paint', 'Food coloring', 'Gelatin', 'Rubber'],
    correct: 2
  },
  {
    title: "What is the maximum feet per second a marker can shoot that is safe for playing paintball?",
    answers: ['200 fps', '300 fps', '400 fps', '150 fps'],
    correct: 1
  },
  {
    title: "In the NXL tournament paintball league, how many balls per second are you allowed to shoot?",
    answers: ['30 bps', '25 bps', '13.5 bps', 'No Limit!'],
    correct: 2
  },
  {
    title: "In NXL tournament paintball, how many players are on the field during a X-ball match?(hint add up both teams)",
    answers: ['6 players', '50 players', '20 players', '10 players'],
    correct: 3
  },
];

// event listeners

$('.js-start').click(function(event){
  event.preventDefault();
  $('.js-start').hide();
  $('.js-quiz').show();
  showQuestion();
  });
$('.js-quiz form').on('click','input',function(){
    $('.selected').removeClass('selected');
    $(this).addClass('selected');
  });

$('.js-quiz button').click(function(event){
    event.preventDefault(); 
    if($('input.selected').length){
      let guess = parseInt($('input.selected').attr('id'));
      checkAnswer(guess);
    } else {
      alert('Please select an answer.');
    }
  });
$('.js-final button').click(function(event){
    event.preventDefault();
    restartQuiz();
});


// functions

function showQuestion(){
  let question = questions[currentQuestion];
    $('.js-quiz h2').text(question.title);
    $('.js-quiz form').html('');
  for(let i=0; i<question.answers.length; i++){
    $('.js-quiz form').append("<input id='"+i+"' class='answer' type='button' role='button' tabindex='0'>"+question.answers[i]+"</input>");
  }
  let questionCount = `<legend> Question ${currentQuestion + 1}/5:<legend>`;
$('.js-counter').html(questionCount);
  
};

function checkAnswer(guess){
  let question = questions[currentQuestion];
  if(question.correct === guess){
    score++;
    userScore.correct++
  } else {
    userScore.incorrect++
  };
// console.log(userScore); <--used to test
$('.results-counter').html(`<p>Correct: ${userScore.correct} | Incorrect: ${userScore.incorrect}</p>`);
  currentQuestion = currentQuestion + 1;
  if (currentQuestion >= questions.length){
  showSummary();
  } else
  showQuestion();
};
function showSummary(){
  $('.js-quiz').hide();
  $('.js-final').show();
  $('.js-final p').text("Congrats you scored "+score+" out of "+questions.length+" correct!")

};
function restartQuiz(){
    $('.js-final').hide();
    $('.js-start').show();
    score = 0;
    currentQuestion = 0;
    userScore = {
    correct: 0,
    incorrect: 0,
    };
    

    showQuestion();
};

// callbacks

function handlePaintballQuiz() {
  showQuestion();
  checkAnswer();
  showSummary();
  restartQuiz();

};


$(handlePaintballQuiz);
