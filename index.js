function init() {
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
    console.log("Is answer", answer, "correct?");
}

init();
