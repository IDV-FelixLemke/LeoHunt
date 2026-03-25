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
},{
    imgsrc: "imgHints/HohenmStadtkirche.jpg",
    question: "Das ist die zweite Frage?",
    answers: [
        "Ja",
        "Nein",
        "Vielleicht",
        "Weiß ich auch nicht"
    ],
    correctAnswer: "1"
}];
var curStep = undefined;
var param = new URLSearchParams(window.location.search);
var stepIdx = param.get("step") || 0;

function init() {
    if(stepIdx >= steps.length) {
        $("#imageHint").html(`
            <h1>Herzlichen Glückwunsch</h1>
        `);
        $("#questionBox").html(`
            <h3>Das Ende der Schnitzeljagd ist erreicht.</h3>
        `);
        return;
    }
    curStep = steps[stepIdx]; // for now only one step
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
        param.set("step", stepIdx + 1);
        window.location.search = param.toString();
        console.log("Answer is correct");
        
    } else {
        console.log("Wrong Answer");
        $("#Answers .selected").addClass("wrong");
    }
}

init();
