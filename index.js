const steps = [{
    imgsrc: "imgHints/HohenmStadtkirche.jpg",
    question: "Aus welchem Jahr stammt die Glocke neben der Kirche?",
    answers: [
        "1805",
        "1903",
        "die Zukunft",
        "2011"
    ],
    correctAnswer: "2"
}];
var curStep = undefined;

function init() {
    curStep = steps[0]; // for now only one step
    $("#imageHint img").attr("src", curStep.imgsrc);
    $("#Question").text(curStep.question);
    let answers = '';
    curStep.answers.forEach((ans,idx) => {
        answers += `
            <li data-answer="${idx+1}">${ans}</li>
        `;
    });
    $("#Answers").html(answers);
    
    $("#Answers li").each((idx, elem) => {
        let answer = $(elem).data("answer");
        $(elem).on("click", () => {
            $("#Answers li").removeClass("selected");
            $(elem).addClass("selected");
        })
    })
}

function checkAnswer() {
    let answer = $("#Answers .selected").data("answer");
    if(!answer) return;
    if(curStep.correctAnswer == answer) {
        $("#Answers .selected").addClass("correct");
        console.log("Answer is correct");
    } else {
        console.log("Wrong Answer");
        $("#Answers .selected").addClass("wrong");
    }
}

init();
