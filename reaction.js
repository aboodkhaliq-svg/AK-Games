function createReaction(container) {

    container.innerHTML = `

        <style>

            .reaction-game {
                width: 560px;
                max-width: 92%;
                height: 100%;
                min-height: 430px;
                margin: 0 auto;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                text-align: center;
                padding: 15px 0 25px;
            }

            .reaction-light {
                width: 82px;
                height: 205px;
                padding: 13px 10px;
                margin: 0 auto 20px;
                border-radius: 22px;
                background: #080a0f;
                border: 2px solid #2b303b;
                box-shadow:
                    0 12px 30px rgba(0,0,0,.35),
                    inset 0 0 18px rgba(255,255,255,.025);
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
                position: relative;
            }

            .reaction-light::after {
                content: "";
                position: absolute;
                bottom: -29px;
                width: 22px;
                height: 30px;
                border-radius: 0 0 6px 6px;
                background: #080a0f;
                border-left: 2px solid #242934;
                border-right: 2px solid #242934;
            }

            .reaction-bulb {
                width: 55px;
                height: 55px;
                border-radius: 50%;
                background: #171a22;
                border: 2px solid #303542;
                transition:
                    background .25s ease,
                    box-shadow .25s ease,
                    transform .25s ease;
            }

            .reaction-bulb.red.active {
                background: #ff405c;
                border-color: #ff7185;
                box-shadow:
                    0 0 12px #ff405c,
                    0 0 30px rgba(255,64,92,.7);
                transform: scale(1.05);
            }

            .reaction-bulb.green.active {
                background: #25e58b;
                border-color: #70f4b5;
                box-shadow:
                    0 0 14px #25e58b,
                    0 0 35px rgba(37,229,139,.8),
                    0 0 65px rgba(37,229,139,.3);
                transform: scale(1.08);
                animation: reactionGreenPulse .8s infinite;
            }

            @keyframes reactionGreenPulse {

                0%, 100% {
                    box-shadow:
                        0 0 14px #25e58b,
                        0 0 35px rgba(37,229,139,.8),
                        0 0 65px rgba(37,229,139,.3);
                }

                50% {
                    box-shadow:
                        0 0 20px #25e58b,
                        0 0 48px rgba(37,229,139,.95),
                        0 0 80px rgba(37,229,139,.4);
                }

            }

            .reaction-title {
                font-size: 25px;
                line-height: 1.2;
                margin: 20px 0 8px;
                font-weight: 900;
            }

            .reaction-description {
                color: var(--muted);
                font-size: 13px;
                line-height: 1.5;
                margin: 0 auto 20px;
                max-width: 390px;
            }

            .reaction-button {
                width: 220px;
                height: 52px;
                border: 0;
                border-radius: 12px;
                background: linear-gradient(
                    135deg,
                    #7c4dff,
                    #6840e8
                );
                color: white;
                font-size: 14px;
                font-weight: 900;
                letter-spacing: .6px;
                cursor: pointer;
                box-shadow:
                    0 10px 25px rgba(124,77,255,.25);
                transition: .2s ease;
                position: relative;
                overflow: hidden;
            }

            .reaction-button::before {
                content: "";
                position: absolute;
                top: 0;
                left: -100%;
                width: 65%;
                height: 100%;
                background: linear-gradient(
                    90deg,
                    transparent,
                    rgba(255,255,255,.25),
                    transparent
                );
                transform: skewX(-20deg);
                animation: reactionButtonShine 3s infinite;
            }

            @keyframes reactionButtonShine {

                0% {
                    left: -100%;
                }

                35% {
                    left: 140%;
                }

                100% {
                    left: 140%;
                }

            }

            .reaction-button:hover {
                transform: translateY(-2px);
                box-shadow:
                    0 14px 30px rgba(124,77,255,.38);
            }

            .reaction-button:active {
                transform: scale(.97);
            }

            .reaction-button.waiting {
                background: linear-gradient(
                    135deg,
                    #e93656,
                    #b92340
                );

                box-shadow:
                    0 10px 25px rgba(233,54,86,.3);
            }

            .reaction-button.go {
                background: linear-gradient(
                    135deg,
                    #25e58b,
                    #16b96c
                );

                box-shadow:
                    0 10px 30px rgba(37,229,139,.35);

                animation: reactionClickPulse .8s infinite;
            }

            @keyframes reactionClickPulse {

                0%, 100% {
                    transform: scale(1);
                }

                50% {
                    transform: scale(1.035);
                }

            }

            .reaction-result {
                min-height: 30px;
                margin-top: 14px;
                font-size: 16px;
                font-weight: 800;
            }

            .reaction-ms {
                color: #25e58b;
                font-size: 22px;
            }

            .reaction-too-early {
                color: #ff405c;
            }

            @media (max-height: 700px) {

                .reaction-game {
                    min-height: 390px;
                    padding: 5px 0 15px;
                }

                .reaction-light {
                    width: 72px;
                    height: 175px;
                    padding: 10px 8px;
                    margin-bottom: 14px;
                }

                .reaction-bulb {
                    width: 46px;
                    height: 46px;
                }

                .reaction-title {
                    font-size: 22px;
                    margin-top: 15px;
                }

                .reaction-description {
                    margin-bottom: 14px;
                }

                .reaction-button {
                    height: 48px;
                }

            }

            @media (max-width: 600px) {

                .reaction-game {
                    width: 94%;
                    min-height: 400px;
                }

                .reaction-light {
                    width: 76px;
                    height: 190px;
                }

                .reaction-bulb {
                    width: 50px;
                    height: 50px;
                }

                .reaction-button {
                    width: 210px;
                }

            }

        </style>

        <div class="reaction-game">

            <div class="reaction-light">

                <div
                    id="reactionRed"
                    class="reaction-bulb red active">
                </div>

                <div
                    class="reaction-bulb">
                </div>

                <div
                    id="reactionGreen"
                    class="reaction-bulb green">
                </div>

            </div>

            <h2
                id="reactionText"
                class="reaction-title">
                Get Ready
            </h2>

            <p class="reaction-description">
                Wait for the traffic light to turn green,
                then click as quickly as possible.
            </p>

            <button
                id="reactionButton"
                class="reaction-button">
                ▶ START
            </button>

            <div
                id="reactionResult"
                class="reaction-result">
            </div>

        </div>
    `;


    const button =
        document.getElementById("reactionButton");

    const text =
        document.getElementById("reactionText");

    const result =
        document.getElementById("reactionResult");

    const red =
        document.getElementById("reactionRed");

    const green =
        document.getElementById("reactionGreen");


    let startTime = 0;

    let waiting = false;

    let gameStarted = false;

    let timer;


    button.onclick = function() {


        if (!gameStarted) {

            gameStarted = true;

            waiting = false;

            startTime = 0;

            result.textContent = "";

            red.classList.add("active");

            green.classList.remove("active");

            text.textContent =
                "Get Ready...";

            button.textContent =
                "WAIT...";

            button.classList.add("waiting");

            button.classList.remove("go");


            timer = setTimeout(() => {

                red.classList.remove("active");

                green.classList.add("active");

                waiting = true;

                startTime =
                    performance.now();

                text.textContent =
                    "CLICK NOW!";

                button.textContent =
                    "⚡ CLICK!";

                button.classList.remove(
                    "waiting"
                );

                button.classList.add(
                    "go"
                );

            }, Math.random() * 3000 + 1500);


            return;
        }


        if (!waiting) {

            clearTimeout(timer);

            gameStarted = false;

            startTime = 0;

            red.classList.remove("active");

            green.classList.remove("active");

            text.textContent =
                "Too Early!";

            result.innerHTML = `
                <span class="reaction-too-early">
                    ❌ TOO EARLY
                </span>
            `;

            button.textContent =
                "▶ TRY AGAIN";

            button.classList.remove(
                "waiting"
            );

            button.classList.remove(
                "go"
            );

            red.classList.add("active");

            return;
        }


        if (waiting) {

            const time =
                Math.round(
                    performance.now() -
                    startTime
                );

            waiting = false;

            gameStarted = false;

            startTime = 0;

            green.classList.remove("active");

            red.classList.add("active");

            text.textContent =
                "Great Reaction!";

            result.innerHTML = `
                Your reaction time:
                <span class="reaction-ms">
                    ${time} ms
                </span>
            `;

            button.textContent =
                "▶ PLAY AGAIN";

            button.classList.remove(
                "waiting"
            );

            button.classList.remove(
                "go"
            );

            return;
        }

    };

}