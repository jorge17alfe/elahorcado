$(document).ready(() => {
    alphabet()
    const btnAlphabet = $(".btn_alphabet");
    const imgAhorcado = $("#img_ahorcado");
    const btnReset = $("#restart");
    let addLetter = '';
    let wordFinal = '';
    let wordFinalArray = [];
    let selectLetter = {};
    let selectLetterResult = [];
    let wordHidden = [];
    let template = [];
    let status = false;
    let lettersError = {};
    let resultLettersError = []
    let lettersCorrect = {};
    var toWin = 0;
    var toLost = 0;


    btnAlphabet.attr("disabled", "disabled");
    imgAhorcado.attr("src", "./assets/img/ahorcado/ahorcado0.png");
    imgAhorcado.css({
        "width": "75%"
    })


    btnReset.on("click", () => {
        resultGame()
        btnReset.html("Reiniciar Juego")
        imgAhorcado.attr("src", "./assets/img/ahorcado/ahorcado0.png");
        resetGame();
        btnAlphabet.removeAttr("disabled");
        getWord();
        drawLowbar();
    })

    btnAlphabet.each((letter) => {
        $(btnAlphabet[letter]).on("click", () => {
            addLetter = $(btnAlphabet[letter]).text();
            startGame();
        })
    })

    function alphabet() {
        var alphabetPos = [];
        var alphabet = [];
        var btnAlpha = ''
        for (var i = 97; i <= 122; i++) {
            alphabetPos.push(i)
        }
        alphabetPos.push(225, 233, 237, 243, 250);
        for (var i = 0; i < alphabetPos.length; i++) {
            alphabet.push(String.fromCharCode(alphabetPos[i]))
        }
        $(alphabet).each(e => {
            btnAlpha += "<button class='btn_alphabet btn btn-sm btn-outline-info  col-sm-1 col-1  pl-1' style='margin:4px' >" + alphabet[e] + "</button>"
        })
        $("#alphabet").append(btnAlpha)


    }

    function getWord() {
        const words = [
            ["coronavirus", "A partir del año 2020 soy muy famoso."],
            ["restaurante", "Se come muy bien."],
            ["murciélago", "Ratón volador."],
            ["edificio", "Es muy alto y hay muchos en la ciudad."],
            ["escritorio", "Hacen sobre mi las tareas del cole."],
            ["ordenador", "Sirve para hacer un montón de tareas informáticas."],
            ["baloncesto", "Se juega con una pelota botando."],
            ["autobus", "Es un medio de transporte."],
        ]
        var positionRand = Math.floor(Math.random() * words.length)
        wordFinal = words[positionRand][0];
        $("#show_trace").html("<strong>PISTA : </strong>" + words[positionRand][1])
    }

    function resetGame() {
        wordFinal = '';
        wordFinalArray = [];
        addLetter = '';
        selectLetter = {};
        wordHidden = [];
        template = [];
        status = false;
        lettersError = {};
        lettersCorrect = {};
        $("h3").remove()
        $("#letters_choosse").html('')
        $("#response").html('');
    }

    function drawLowbar() {
        if (status === false) {
            $("#show_hidden_word").html('');
            template = ['']
            for (var i = 0; i < wordFinal.length; i++) {
                wordFinalArray[i] = wordFinal[i];
                wordHidden[i] = ("_");
                template += wordHidden[i] + " ";
            }
            $("#show_hidden_word").html(template)
            status = true
        }
    }

    function startGame() {
        getLetter()
        injectLetter()
        printImg()
        printLetters()
        resultPlay()
    }

    function getLetter() {
        if (selectLetterResult.includes(addLetter)) {
            $("#response").removeClass("bg-success").addClass("bg-danger").html("Letra Repetida");
            setTimeout(() => {
                $("#response").html("");
            }, 2000)
            $(".perder_sound")[0].play();
        } else {
            selectLetter[addLetter] = addLetter;
            selectLetterResult = Object.values(selectLetter)
        }
    }

    function injectLetter() {
        template = ['']
        count = 0;
        for (var i = 0; i < wordFinalArray.length; i++) {
            if (addLetter === wordFinalArray[i]) {
                lettersCorrect[addLetter] = addLetter;
                wordHidden[i] = wordFinalArray[i];
                template += wordHidden[i] + " "
            } else {
                template += wordHidden[i] + " ";
                count++
            }
        }
        if (count === wordFinalArray.length) {
            lettersError[addLetter] = addLetter;
            $(".perder_sound")[0].play();
        } else {
            $(".perder_sound")[2].play();
        }
        $("#show_hidden_word").html("<strong>" + template + "</strong>")
    }

    function printLetters() {
        var result = '';
        var resultLettersCorrect = [];
        var resultLettersError = [];
        resultLettersCorrect = Object.keys(lettersCorrect);
        resultLettersError = Object.keys(lettersError);

        result += "<div class='text-success'><p class='mb-0'><i class='fas fa-check ' > </i> "
        $(resultLettersCorrect).each(element => {
            result += resultLettersCorrect[element] + ", ";
        })
        result += "</p></div>"
        result += "<div class='text-danger'><p class='mb-0'><i class='fas fa-times '> </i> "
        $(resultLettersError).each(element => {
            result += resultLettersError[element] + ", ";
        })
        result += "</p></div>"
        $("#letters_choosse").html(result)
    }

    function printImg() {
        resultLettersError = Object.keys(lettersError);
        imgAhorcado.attr("src", "./assets/img/ahorcado/ahorcado" + resultLettersError.length + ".png");

    }

    function resultPlay() {
        if (resultLettersError.length === 8) {
            $("#response").fadeIn().removeClass("bg-success").addClass("bg-danger").html("Perdiste...Bot..!<br> La respuesta es: <strong>'" + wordFinal + "'</strong>");
            $("#input_letter").attr("disabled", "disabled");
            btnAlphabet.attr("disabled", "disabled");
            $(".perder_sound")[1].play();
            toLost++;
            resultGame()
        }
        var data2 = 0;
        $(wordHidden).each((k, v) => {
            if (wordHidden[k] === wordFinal[k])[
                data2++
            ]
        })
        if (data2 === wordFinal.length) {
            $("#response").fadeIn().removeClass("bg-danger").addClass("bg-success").html("Ganaste...Bot....!!!<br>FELICIDADES...!!!");
            $("#input_letter").attr("disabled", "disabled");
            btnAlphabet.attr("disabled", "disabled");
            $(".perder_sound")[3].play();
            toWin++;
            resultGame()
        }
    }

    function resultGame() {
        var result = '';
        result += "<p  class='mb-0'><span class='text-success font-weight-bold '><i class='fas fa-trophy'></i> = " + toWin + "</span> <br>"
        result += " <span class='text-danger font-weight-bold '><i class='fas fa-window-close'></i> = " + toLost + "</span></p>"
        $("#result_game").html(result)
    }
})