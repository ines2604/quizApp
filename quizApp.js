$(document).ready(function(){
    var time=20;
    var score=0;
    var marks=0
    var pour=0
    var questionNumber=0;
    var timerInterval;
    var data=[
        {
           "Quiz": "Q1) What does HTML stand for?",
           "option1": "Hypertext Markup Language",
           "option2": "Hyperlink and Text Markup Language",
           "option3": "Hypertext and Media Language",
           "option4": "Hypertext Markup Locator",
           "answer" : "Hypertext Markup Language",
           "ver": false,
           "selectedAnswer": false
        },
        {
            "Quiz": "Q2) Which HTML tag is used to define a paragraph?",
            "option1": "<para>",
            "option2": "<paragraph>",
            "option3": "<text>",
            "option4": "<p>",
            "answer" : "<p>",
            "ver": false,
            "selectedAnswer": false
         },
         {
            "Quiz": "Q3) What does CSS stand for?",
            "option1": "Creative Style Sheets",
            "option2": "Cascading Style Sheets",
            "option3": "Cascading Style Scripts",
            "option4": "Creative Styling Sheets",
            "answer" : "Cascading Style Sheets",
            "ver": false,
            "selectedAnswer": false
         },
         {
            "Quiz": "Q4)Which property is used to change the background color in CSS?",
            "option1": "background-color",
            "option2": "bgcolor",
            "option3": "color",
            "option4": "background",
            "answer" : "background-color",
            "ver": false,
            "selectedAnswer": false
         },
         {
            "Quiz": "Q5) How can you include an external CSS file in an HTML document?",
            "option1": "<css src='styles.css'></css>",
            "option2": "<style src='styles.css'></style>",
            "option3": "<link rel='stylesheet' href='styles.css'>",
            "option4": "<script src='styles.css'></script>",
            "answer" : "<link rel='stylesheet' href='styles.css'>",
            "ver": false,
            "selectedAnswer": false
         }
    ]

    function accueilPage(){
        $('.footer').hide();
        $(".resPage").hide();
        $("#timeRest").text("20");
        $("#nbQuestions").text(questionNumber);
        $(".question").hide();
    }

    accueilPage()

    function startQuiz(){
        $('.footer').show();
        $('#prev').hide();
        $("#end").hide();
        $("#start").hide();
        $('.question').show();
        questionNumber += 1;
        $("#nbQuestions").text(questionNumber);
        $("#text").text(data[0].Quiz);
        $("#option1").text(data[0].option1);
        $("#option2").text(data[0].option2);
        $("#option3").text(data[0].option3);
        $("#option4").text(data[0].option4);
        startTimer(); // Démarrer le timer lors du début du quiz
    }

    function startTimer() {
        time = 20; // Réinitialiser le temps pour chaque question
        clearInterval(timerInterval); // Effacer tout intervalle précédent
        timerInterval = setInterval(updataTime, 1000); // Commencer le décompte
    }

    function updataTime(){
        if(time > 0){
            time--;
            $("#timeRest").text(time < 10 ? '0' + time : time);
        } else {
            clearInterval(timerInterval);
            suivant(); // Passer automatiquement à la question suivante
        }
    }

    $(".play").on("click", startQuiz);

    $('.question').on("click", function(){
        $(".question").removeClass('active');
        $(this).addClass('active');
        if($(this).text() == data[questionNumber-1].answer){
            data[questionNumber-1].ver = true;
        } else {
            data[questionNumber-1].ver = false;
        }
    });

    function suivant(){
        if ($('.question.active').length === 0 && time!=0) {
            alert('Please select an option before proceeding.');
            return;
        }
        startTimer(); // Redémarrer le timer à chaque nouvelle question
        $("#timeRest").text("20");
        time=20
        $('#prev').show();
        $(".question").removeClass('active');
        $("#text").text(data[questionNumber].Quiz);
        $("#option1").text(data[questionNumber].option1);
        $("#option2").text(data[questionNumber].option2);
        $("#option3").text(data[questionNumber].option3);
        $("#option4").text(data[questionNumber].option4);
        questionNumber += 1;
        $("#nbQuestions").text(questionNumber);
        if(questionNumber == 5){
            $("#next").hide();
            $("#end").show();
        }
    }

    $("#next").on("click", suivant);

    function prev(){
        startTimer(); // Redémarrer le timer pour la question précédente
        $("#timeRest").text("20");
        time=30
        $('#prev').show();
        $("#next").show();
        questionNumber -= 2;
        $(".question").removeClass('active');
        $("#text").text(data[questionNumber].Quiz);
        $("#option1").text(data[questionNumber].option1);
        $("#option2").text(data[questionNumber].option2);
        $("#option3").text(data[questionNumber].option3);
        $("#option4").text(data[questionNumber].option4);
        questionNumber += 1;
        $("#nbQuestions").text(questionNumber);
        if(questionNumber == 1){
            $("#prev").hide();
        }
    }

    $("#prev").on("click", prev);

    function resultat(){
        clearInterval(timerInterval); // Arrêter le timer lorsqu'on affiche les résultats
        $('.start').hide();
        $('.body').hide();
        $('.footer').hide();
        $(".resPage").show();
        for(let i = 0; i < 5; i++){
            if(data[i].ver == true){
                marks += 5;
                score += 1;
                pour += 20;
            }
        }
        $("#marks").text(marks);
        $("#pour").text(pour + "%");
        $("#score").text(score);
    }

    $("#end").on("click", resultat);
});