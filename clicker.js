function createClicker(container) {

    container.innerHTML = `

        <style>

            .clicker-game {
                width: 560px;
                max-width: 92%;
                margin: auto;
                text-align: center;
                padding: 8px 10px 20px;
            }

            .clicker-title {
                font-size: 28px;
                font-weight: 900;
                margin-bottom: 6px;
            }

            .clicker-subtitle {
                color: #858995;
                font-size: 13px;
                margin-bottom: 18px;
            }

            .clicker-timer {
                width: 125px;
                height: 125px;
                margin: 0 auto 16px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                background:
                    radial-gradient(
                        circle,
                        #171b2b 0%,
                        #111521 68%,
                        #0d1018 100%
                    );
                border: 5px solid #7c5cff;
                box-shadow:
                    0 0 28px rgba(124,92,255,.28),
                    inset 0 0 20px rgba(124,92,255,.08);
                position: relative;
                transition:
                    border-color .2s ease,
                    box-shadow .2s ease,
                    transform .2s ease;
            }

            .timer-number {
                display: block;
                font-size: 52px;
                line-height: 48px;
                font-weight: 1000;
                color: #ffffff;
                height: 52px;
                margin: 0;
                padding: 0;
            }

            .timer-label {
                display: block;
                margin-top: 3px;
                font-size: 9px;
                line-height: 12px;
                letter-spacing: 2px;
                color: #858995;
                font-weight: 800;
            }

            .clicker-timer.warning {
                border-color: #ff5555;
                box-shadow:
                    0 0 35px rgba(255,85,85,.38),
                    inset 0 0 20px rgba(255,85,85,.08);
                animation:
                    timerPulse .45s infinite alternate;
            }

            .clicker-score-label {
                color: #858995;
                font-size: 10px;
                letter-spacing: 2px;
                font-weight: 800;
                margin-bottom: 2px;
            }

            .clicker-score {
                font-size: 52px;
                line-height: 54px;
                font-weight: 1000;
                color: #ffffff;
                margin-bottom: 20px;
                transition: transform .08s ease;
            }

            .clicker-score.pop {
                transform: scale(1.16);
            }

            .click-button {
                width: 300px;
                height: 135px;
                max-width: 90%;
                border: none;
                border-radius: 28px;
                background:
                    linear-gradient(
                        145deg,
                        #8b6cff,
                        #6544e8
                    );
                color: white;
                font-size: 29px;
                font-weight: 1000;
                letter-spacing: 1px;
                cursor: pointer;
                box-shadow:
                    0 13px 0 #4931b0,
                    0 20px 32px rgba(0,0,0,.35);
                transition:
                    transform .08s ease,
                    box-shadow .08s ease,
                    filter .2s ease;
                user-select: none;
                -webkit-tap-highlight-color: transparent;
            }

            .click-button:hover {
                filter: brightness(1.08);
                transform: translateY(-2px);
            }

            .click-button:active {
                transform:
                    translateY(9px)
                    scale(.97);
                box-shadow:
                    0 4px 0 #4931b0,
                    0 9px 20px rgba(0,0,0,.3);
            }

            .click-button.playing {
                background:
                    linear-gradient(
                        145deg,
                        #7658ff,
                        #5535d8
                    );
            }

            .clicker-message {
                min-height: 18px;
                margin-top: 16px;
                color: #858995;
                font-size: 12px;
            }


            /* FINAL SCORE OVERLAY */

            .click-result {
                position: fixed;
                inset: 0;
                z-index: 9999;

                display: flex;
                align-items: center;
                justify-content: center;

                background:
                    rgba(3,5,10,.82);

                backdrop-filter: blur(8px);

                opacity: 0;
                pointer-events: none;

                transition:
                    opacity .25s ease;
            }

            .click-result.show {
                opacity: 1;
                pointer-events: auto;
            }

            .click-result-box {

                width: 390px;
                max-width: 88%;

                padding: 38px 28px 30px;

                border-radius: 28px;

                text-align: center;

                background:
                    linear-gradient(
                        145deg,
                        #1b2030,
                        #10131d
                    );

                border: 1px solid
                    rgba(255,255,255,.12);

                box-shadow:
                    0 30px 90px
                    rgba(0,0,0,.65),

                    0 0 50px
                    rgba(124,92,255,.15);

                transform:
                    scale(.7)
                    translateY(30px);

                transition:
                    transform .35s
                    cubic-bezier(.2,.8,.2,1);
            }

            .click-result.show
            .click-result-box {

                transform:
                    scale(1)
                    translateY(0);
            }

            .result-small {
                color: #858995;

                font-size: 12px;

                letter-spacing: 3px;

                font-weight: 800;

                margin-bottom: 8px;
            }

            .result-score {

                font-size: 96px;

                line-height: 1;

                font-weight: 1000;

                color: #ffffff;

                text-shadow:
                    0 0 30px
                    rgba(124,92,255,.45);

                margin: 5px 0 10px;

                animation:
                    resultScoreIn .5s
                    cubic-bezier(.2,.8,.2,1);
            }

            .result-label {

                color: #7c5cff;

                font-size: 16px;

                font-weight: 900;

                letter-spacing: 2px;

                margin-bottom: 25px;
            }

            .result-close {

                width: 54px;
                height: 54px;

                border-radius: 50%;

                border: 1px solid
                    rgba(255,255,255,.15);

                background:
                    #171b27;

                color: white;

                font-size: 25px;

                font-weight: 700;

                cursor: pointer;

                transition:
                    transform .15s ease,
                    background .15s ease;
            }

            .result-close:hover {

                background: #242a3b;

                transform:
                    scale(1.08);
            }

            @keyframes resultScoreIn {

                0% {
                    transform:
                        scale(.2);

                    opacity: 0;
                }

                60% {
                    transform:
                        scale(1.15);

                    opacity: 1;
                }

                100% {
                    transform:
                        scale(1);
                }
            }

            @keyframes timerPulse {

                from {
                    transform: scale(1);
                }

                to {
                    transform: scale(1.06);
                }
            }

            @keyframes timerNumberPop {

                0% {
                    transform: scale(.75);
                    opacity: .3;
                }

                60% {
                    transform: scale(1.15);
                    opacity: 1;
                }

                100% {
                    transform: scale(1);
                    opacity: 1;
                }
            }

            .timer-pop {
                animation:
                    timerNumberPop .25s ease;
            }


            @media (max-height: 700px) {

                .clicker-game {
                    transform: scale(.88);
                    transform-origin: top center;
                }

                .clicker-timer {
                    width: 110px;
                    height: 110px;
                }

                .timer-number {
                    font-size: 46px;
                    line-height: 44px;
                    height: 46px;
                }

                .click-button {
                    height: 120px;
                }
            }


            @media (max-width: 500px) {

                .clicker-title {
                    font-size: 23px;
                }

                .clicker-timer {
                    width: 110px;
                    height: 110px;
                }

                .timer-number {
                    font-size: 45px;
                    line-height: 43px;
                    height: 45px;
                }

                .click-button {
                    width: 250px;
                    height: 125px;
                    font-size: 25px;
                }

                .result-score {
                    font-size: 75px;
                }
            }

        </style>


        <div class="clicker-game">

            <div class="clicker-title">
                FAST CLICKER
            </div>

            <div class="clicker-subtitle">
                Click as fast as you can in 10 seconds
            </div>


            <div
                class="clicker-timer"
                id="clickTimer"
            >

                <div
                    class="timer-number"
                    id="timerNumber"
                >
                    10
                </div>

                <div class="timer-label">
                    SECONDS
                </div>

            </div>


            <div class="clicker-score-label">
                CLICKS
            </div>

            <div
                class="clicker-score"
                id="clickScore"
            >
                0
            </div>


            <button
                id="clickButton"
                class="click-button"
            >
                START
            </button>


            <div
                class="clicker-message"
                id="clickMessage"
            >
                Press START to begin
            </div>

        </div>


        <div
            class="click-result"
            id="clickResult"
        >

            <div class="click-result-box">

                <div class="result-small">
                    TIME'S UP
                </div>

                <div
                    class="result-score"
                    id="resultScore"
                >
                    0
                </div>

                <div class="result-label">
                    CLICKS
                </div>

                <button
                    class="result-close"
                    id="resultClose"
                    title="Close"
                >
                    ×
                </button>

            </div>

        </div>
    `;


    const button =
        document.getElementById("clickButton");

    const scoreElement =
        document.getElementById("clickScore");

    const timer =
        document.getElementById("clickTimer");

    const timerNumber =
        document.getElementById("timerNumber");

    const message =
        document.getElementById("clickMessage");

    const result =
        document.getElementById("clickResult");

    const resultScore =
        document.getElementById("resultScore");

    const resultClose =
        document.getElementById("resultClose");


    let score = 0;
    let time = 10;
    let playing = false;
    let interval = null;


    function updateTimer() {

        timerNumber.textContent = time;

        timerNumber.classList.remove(
            "timer-pop"
        );

        void timerNumber.offsetWidth;

        timerNumber.classList.add(
            "timer-pop"
        );


        if (time <= 3) {

            timer.classList.add(
                "warning"
            );

        } else {

            timer.classList.remove(
                "warning"
            );
        }
    }


    function startGame() {

        score = 0;
        time = 10;
        playing = true;

        scoreElement.textContent = "0";

        button.textContent = "CLICK!";

        button.classList.add("playing");

        message.textContent =
            "CLICK THE BUTTON AS FAST AS POSSIBLE!";

        timer.classList.remove("warning");

        updateTimer();

        interval = setInterval(() => {

            time--;

            updateTimer();

            if (time <= 0) {

                clearInterval(interval);

                interval = null;

                playing = false;

                timerNumber.textContent = "0";

                timer.classList.remove(
                    "warning"
                );

                button.textContent = "START";

                button.classList.remove(
                    "playing"
                );

                message.textContent =
                    "Round finished!";

                showFinalScore();
            }

        }, 1000);
    }


    function showFinalScore() {

        resultScore.textContent =
            score;

        result.classList.add("show");
    }


    function closeFinalScore() {

        result.classList.remove("show");

        button.textContent = "START";

        message.textContent =
            "Press START to play again.";
    }


    button.onclick = function() {

        if (!playing) {

            startGame();

            return;
        }


        score++;

        scoreElement.textContent =
            score;


        scoreElement.classList.remove(
            "pop"
        );

        void scoreElement.offsetWidth;

        scoreElement.classList.add(
            "pop"
        );
    };


    resultClose.onclick = function() {

        closeFinalScore();
    };
}