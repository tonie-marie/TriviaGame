$(document).ready(function() {
	var questionsAnswers;
	var right;
	var wrong;
	var unanswered;
	var currentIndex;
	var timeIsUp;

	var questionTimer = {
		time: 30,

		reset: function() {
			questionTimer.time = 30;
		},
		start: function() {
			$("#timer").html("Time Left: " + questionTimer.time);
			counter = setInterval(questionTimer.count, 1000);
		},
		stop: function() {
			clearInterval(counter);
		},
		count: function() {
			questionTimer.time--;
			$("#timer").html("Time Remaining: " + questionTimer.time);
		}
	}

	function varSet() {
		questionsAnswers = [{
			question: "What rhymes with purple?",
			answers: ["Gerbil", "Hirple", "Nothing"],
			vidcorrect: "https://www.youtube.com/watch?v=t-dLuu-ErnI",
			chosewrong: "assets/images/chosewrong.gif",
			correctanswer: 1
		}, {
			question: "Why did it take 300 years for the giant tortoise to get a scientific (i.e., Latin) name?",
			answers: ["They were incorrectly lumped in with another, very similar species", "There was controversy over who had the right to name the species", "Scientists were too busy eating them to be bothered naming them"],
			vidcorrect: "https://www.youtube.com/watch?v=zPggB4MfPnk",
			chosewrong: "assets/images/chosewrong.gif",
			correctanswer: 2
		}, {
			question: "Why were the keys in a QWERTY keyboard arranged the way they are?",
			answers: ["To make it easier to type", "To make it harder to type", "In homage to one of the fathers of computing"],
			vidcorrect: "https://www.youtube.com/watch?v=65LnvcirsM0",
			chosewrong: "assets/images/chosewrong.gif",
			correctanswer: 0
		}, {
			question: "What is the difference between a frog and a toad?",
			answers: ["Spelling", "There is no real difference", "Their secretions"],
			vidcorrect: "https://www.youtube.com/watch?v=5pfjRuaHkDU",
			chosewrong: "assets/images/chosewrong.gif",
			correctanswer: 1
		}, {
			question: "When was the First World War, first named as such?",
			answers: ["At the assassination of Arch Duke Ferdinand", "After the Second World War", "1918"],
			vidcorrect: "https://www.youtube.com/watch?v=GeDjaQNiTog",
			chosewrong: "assets/images/chosewrong.gif",
			correctanswer: 2
		}, {
			question: "How many muscles are in the fingers?",
			answers: ["0", "4", "1"],
			vidcorrect: "https://www.youtube.com/watch?v=5QsRDhZU_0E",
			chosewrong: "assets/images/chosewrong.gif",
			correctanswer: 0
		}, {
			question: "What travels the wrong way down the motorway at 12mph?",
			answers: ["An elderly man in an old Buick", "A Mobility Scooter train", "Kinematic wave"],
			vidcorrect: "https://www.youtube.com/watch?v=t4m-OJosGaI",
			chosewrong: "assets/images/chosewrong.gif",
			correctanswer: 2
		}, {
			question: "How did Captain Schlitt's Numeber 2 sink his own U Boat",
			answers: ["He was playing with a toy U Boat in the bath", "Sabotage by the British", "The toilets were tricky to use"],
			vidcorrect: "https://www.youtube.com/watch?v=Dw3Dvi0tPOM",
			chosewrong: "assets/images/chosewrong.gif",
			correctanswer: 2
		}, {
			question: "When the titanic sank, what was the first thing to happen to the crew?",
			answers: ["They were fired", "They drowned", "It was their 6-month performance review"],
			vidcorrect: "'https://www.youtube.com/watch?v=Ohp-xiQ3O2s",
			chosewrong: "assets/images/chosewrong.gif",
			correctanswer: 0
		}, {
			question: "Who invented the Theory of Relativity?",
			answers: ["Albert Einstein", "Galileo", "Isaac Newton"],
			vidcorrect: "https://www.youtube.com/watch?v=eEv5DO7QIXE",
			chosewrong: "assets/images/chosewrong.gif",
			correctanswer: 1
		}]

		right = 0;
		wrong = 0;
		unanswered = 0;

		currentIndex = -1;

		$("#question").html("<button class='btn' id='start'>Start</button>");
		$("#answer0, #answer1, #answer2").hide().off("click");

		$("#start").on("click", function(){
			nextQuestion();
		});
	}

	function askQuestions() {
		questionTimer.start();
		$("#question").html(questionsAnswers[currentIndex].question);
		$("#answer0").show().html(questionsAnswers[currentIndex].answers[0]);
		$("#answer1").show().html(questionsAnswers[currentIndex].answers[1]);
		$("#answer2").show().html(questionsAnswers[currentIndex].answers[2]);
		$("#videoHolder").hide().off("click");

		onClickAnswer();
	}

	function onClickAnswer() {
		$(".btn").on("click", function() {
			var buttonClick = parseInt($(this).attr("value"));
			if (buttonClick === questionsAnswers[currentIndex].correctanswer) {
				rightAnswer();
			}else {
				wrongAnswer();
			}
		});
	}

	function rightAnswer() {
		clearTimeout(timeIsUp);
		right++;
		questionTimer.stop();
		questionTimer.reset();
		$("#time").empty();
		$("#question").html("<h2>Correct!</h2>");
		$("#answer0, #answer1, #answer2").hide().off("click");
		$("#videoHolder").show().html("<a target ='_blank' href=" + questionsAnswers[currentIndex].vidcorrect + "><button class='btn btn-danger'>Click me for Video!</button></a>");

		timeIsUp = setTimeout(nextQuestion, 5 * 1000);
		
	}

	function wrongAnswer() {
		clearTimeout(timeIsUp);
		wrong++;
		questionTimer.stop();
		questionTimer.reset();
		$("#time").empty();
		$("#question").html("<h2>Try Again!</h2>");
		$("#answer0, #answer1, #answer2").hide().off("click");
		$('#videoHolder').show().html("The correct answer was: " + questionsAnswers[currentIndex].answers[questionsAnswers[currentIndex].correctanswer] +
      "<br><img class='gifs' src=" + questionsAnswers[currentIndex].chosewrong + ">");

		timeIsUp = setTimeout(nextQuestion, 5 * 1000);
	}

	function timesUp() {
		clearTimeout(timeIsUp);
		unanswered++;
		questionTimer.stop();
		questionTimer.reset();
		$("#time").empty();
		$("#question").html("<h2>Time's Up!</h2>");
		$("#answer0, #answer1, #answer2").hide().off("click");
		$('#videoHolder').show().html("The correct answer was: " + questionsAnswers[currentIndex].answers[questionsAnswers[currentIndex].correctanswer] +
      "<br><img class='gifs' src=" + questionsAnswers[currentIndex].chosewrong + ">");

		timeIsUp = setTimeout(nextQuestion, 4 * 1000);
	}

	function endScreen() {
		$("#time").html("<h2>Good job!</h2>");
		$("#question").html("Your results <br><br>Right: " + right + "<br>Wrong: " + wrong + "<br>Not Answered: " + unanswered);

		$("#videoHolder").html("<button class-'btn' id='playagain'>Play again?</button>");

		$("#playagain").on("click", function() {
			varSet();
			nextQuestion();
		});
	}

	function nextQuestion() {
		currentIndex++;

		if(currentIndex < questionsAnswers.length) {
			askQuestions();
			timeIsUp = setTimeout(timesUp, 30 * 1000);
		} else {
			endScreen();
		}
	}

	varSet();


})




















