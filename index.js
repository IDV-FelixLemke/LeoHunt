const steps = [{
    imgsrc: "imgHints/HohenmStadtkirche.jpg",
    question: "Aus welchem Jahr stammt die Glocke neben der Kirche?",
    answers: [
        "1805",
        "1903",
        "die Zukunft",
        "2011"
    ],
    correctAnswer: "1"
},{
    imgsrc: "imgHints/Agricolagymnasium_Hohenmölsen,_Sachsen-Anhalt,_Amphitheater.jpg",
    question: "Wie viele Sitzreihen hat das Amphitheater?",
    answers: [
        "Nur eine",
        "15 Reihen",
        "100 Reihen",
        "Soweit kann ich nicht zählen"
    ],
    correctAnswer: "2"
}];
var curStep = undefined;
var param = new URLSearchParams(window.location.search);
var stepIdx = param.get("step") || 0;

function init() {
    if(stepIdx >= steps.length) {
//         
        $("#imageHint img").attr("src", "./img/bjorn-pierre--clf0K7plGM-unsplash.jpg");
        $("#bCheckAnswer").addClass("hidden");
        $("#questionBox").html(`
            <div class="successMsg">
                <h1>Glückwunsch</h1>
                <h3>Ihr habt es geschafft!</h3>
                <p>Jetzt viel Spaß mit dem Schatz.</p>
            </div>
        `);
        return;
    }
    if(stepIdx == 0) {
        $("#bBack").addClass("hidden");
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
        param.set("step", parseInt(stepIdx) + 1);
        window.location.search = param.toString();
    } else {
        $("#Answers .selected").addClass("wrong");
    }
}

function navBack() {
    if (navigation.canGoBack) {
        navigation.back();
    }
}

init();
