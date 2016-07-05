$(document).ready(function() {
    var gezien = false,
        clicked = false,
        do_not_show_again = false,
        timeouts = [];
    var $zoek = $("#zoek"),
        $actie = $("#actie"),
        $ia = $("#ia"),
        $ib = $("#ib"),
        $madeby = $("#madeby"),
        $lijst = $("#lijst"),
        $h1 = $("h1"),
        $content = $(".content"),
        $reeks = $("#reeks"),
        $info = $("#info");

    $zoek.on("keyup focus", actie);
    $reeks.on("keyup", "input", reeks_actie);

    function actie() {
        //verkrijg het getal
        pot_priem = $zoek.val();
        //centreer de content
        center();
        // kijk of het getal daadwerkelijk een priemgetal is
        //toon het resultaat
        priem_display(pot_priem);
    }

    function reeks_actie() {
        // verkrijg punt alpha en punt beta
        alpha = parseInt($ia.val());
        beta = parseInt($ib.val());
        //toon de priemgetallen in een lijst
        //laat de button zien die  de resultaten te voorschijnen kan halen
        start_display();
        // als het getal zeer groot is waarschuw de gebruiker daarvoor
        priem_reeks();
    }

    function start_display() {
        if (timeouts[0] !== undefined)
            for (var i = 0; i < timeouts.length; i++) {
                clearTimeout(timeouts[i]);
            }
            //quick reset of the timer array you just cleared
        timeouts = [];

        if (beta > 0) {
            $actie.addClass("active");
        } else if ($lijst.css('display') == 'none') {
            $actie.removeClass("active");
        }
    }

    function priem_reeks() {
        $("#lijst a").text("");
        for (alpha; alpha < beta; alpha++) {
            cb(alpha);
        }
    }

    function cb(prime) {
        timeouts.push(setTimeout(() => {
            if (priem_zoek(prime)) {
                $("#lijst a").append(" " + prime);
            }
        }, 0));
    }

    // priem actie functie
    function center() {
        $zoek.css("text-align", "center");
        if (pot_priem == "") {
            $zoek.css("text-align", "left");
        }
    }

    function priem_zoek(x) {
        const HALF = x / 2;
        if (x == 2 || x == 3) {
            return true;
        } else {
            if (HALF % 1 != 0 && x != 1) {
                for (c = 2; HALF > c; c++) {
                    if (x / c % 1 == 0) {
                        return false;
                    }
                }
                return true;
            } else {
                return false;
            }
        }
    }

    function priem_display(x) {
        if (priem_zoek(x)) {
            $h1.text("This is a prime number");
        } else {
            $h1.text("This is not a prime number");
        }
    }

    $actie.click(function() {

        var a = $ia.val();
        var b = $ib.val();

        if (b > 0 || $lijst.css('display') == 'block') {
            if (clicked) {
                clicked = false;
                $lijst.fadeOut(500);
                $("h1,#priemen").slideDown(500);
                $actie.attr("value", "start");
                $content.removeClass("navmenu").addClass("content");
                $("#reeks").css("margin-top", "3%")
            } else {
                clicked = true;
                $("h1,#priemen").hide();
                $content.addClass("navmenu").removeClass("content");
                $("#reeks").css("margin-top", "0")
                $actie.attr("value", "return");
                $lijst.fadeIn(500);


            }
        }
    });
    $("body").delegate("input", "focus blur", function() {
        if (screen.width < 551 || screen.height < 720) {
            $madeby.toggle();
            $info.removeClass("toLeft");
            $("#madeby a:last-child").hide();
            $("#madeby a:first-child").show();
        }
    });
    $madeby.click(function() {
        $info.toggleClass("toLeft");
        $("#madeby a").toggle(300);
    });
});
