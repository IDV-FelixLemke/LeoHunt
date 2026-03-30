const steps = [{
    imgsrc: "imgHints/WhatsApp Image 2026-03-30 at 17.47.19.jpeg",
    question: "Welche Öffnungszeiten hat dieser Ort am Samstag?",
    answers: [
        "08:00 bis 20:00",
        "Samstag ist geschlossen",
        "08:00 bis 14:00",
        "10:00 bis 16:00"
    ],
    correctAnswer: "3"
},{
    imgsrc: "imgHints/WhatsApp Image 2026-03-30 at 17.52.13.jpeg",
    question: "Neben diesem Wahrzeichen ist ein Jugendclub. Welche Hausnummer hat das Gebäude?",
    answers: [
        "19",
        "21",
        "119",
        "17a"
    ],
    correctAnswer: "1"
},{
    imgsrc: "imgHints/WhatsApp Image 2026-03-30 at 17.54.31.jpeg",
    question: "An diesem Ort gibt es eine Bushaltestelle. Welche Linie fährt Montag bis Freitag um 9:44 Uhr?",
    answers: [
        "Es fahren keine Busse mehr.",
        "Linie 798",
        "Linie 800",
        "RB13 nach Gera"
    ],
    correctAnswer: "2"
},{
    imgsrc: "imgHints/WhatsApp Image 2026-03-30 at 17.55.12.jpeg",
    question: "Das Haus kennt ihr. Aber wie viele Sitzreihen gibt es in dem Amphietheater?",
    answers: [
        "325 Reihen",
        "11 Reihen",
        "15 Reihen",
        "Die werden je nach Veranstaltung aufgebaut."
    ],
    correctAnswer: "2"
},{
    imgsrc: "imgHints/WhatsApp Image 2026-03-30 at 17.59.06.jpeg",
    question: "Am Eingang zu diesem Gebäude gibt es viele Plakte. Mit welchen Motto wird für den Boys/Girls Day Werbung gemacht?",
    answers: [
        "Ich kann alles werden, was ich will!",
        "Endlich ein Tag ohne Schule.",
        "Heute schon gearbeitet?",
        "Dein Tag, Dein Weg"
    ],
    correctAnswer: "4"
},{
    imgsrc: "imgHints/WhatsApp Image 2026-03-30 at 18.05.13.jpeg",
    question: "Noch ein Wahrzeichen von Hohenmölsen. Dort steht ein Glocke, die vor dem Tagebaubagger gerettet wurde. Wann und aus welchem Ort wurde sie gerettet?",
    answers: [
        "1990 aus Taucha",
        "1997 aus Großgrimma",
        "2001 aus Leipzig",
        "2010 aus Jaucha"
    ],
    correctAnswer: "2"
},{
    imgsrc: "imgHints/WhatsApp Image 2026-03-30 at 18.09.15.jpeg",
    question: "Ja, wo ist denn dieses Gebäude? Und: welches Instrument sieht man ganz oben im Fenster?",
    answers: [
        "Eine Gitarre",
        "Eine Orgel",
        "Eine Mundharmonika",
        "Da ist gar kein Instrument im Fenster"
    ],
    correctAnswer: "1"
},{
    imgsrc: "imgHints/Stadtpark.jpg",
    question: "Nun seid ihr schon ganz nah. Folgt genau den Anweisungen hier:",
    answers: [
        "1. Geht zum höchsten Punkt an diesem Ort.",
        "2. Haltet Ausschau nach dem Baum mit kaputter Rinde und Vogelhaus. Geht zu diesem Baum.",
        "3. Wendet euren Blick Richtung Westen (Feld) und schreitet voran, bis ihr einen alten Steinofen entdeckt.",
        "4. Untersucht den Steinofen, um den letzten Hinweis zu finden.",
        "5. Ihr seid dem Hinweis gefolgt? Dann schließt die Schatzsuche ab!"
    ],
    type: "steps"
}];
var curStep = undefined;
var param = new URLSearchParams(window.location.search);
var stepIdx = param.get("step") || 0;
var subStep = 1;

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
    if(!curStep.type) curStep.type = "Question";
    
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
    
    if(curStep.type === "steps") {
        $("#bCheckAnswer").text("Weiter");
        hideAnswers();
    }
}

function hideAnswers() {
    $("#Answers li").each((idx, elem) => {
        if(idx >= subStep) {
            $(elem).addClass("hidden");
        } else {
            $(elem).removeClass("hidden");
        }
    });
}

function checkAnswer() {
    if(curStep.type === "steps") {
        if(subStep + 1 == curStep.answers.length) {
            $("#bCheckAnswer").text("Abschließen");
        }
        if(subStep  == curStep.answers.length) {
            $("#bCheckAnswer").text("Abschließen");
            param.set("step", parseInt(stepIdx) + 1);
            window.location.search = param.toString();
            return;
        }
        subStep++;
        hideAnswers();
        return;
    }

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
    if(curStep && curStep.type === "steps" && subStep > 1) {
        subStep--;
        hideAnswers();
        return;
    }

    if (navigation.canGoBack) {
        navigation.back();
    }
}

init();
