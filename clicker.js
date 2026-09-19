function createClicker(container) {

    container.innerHTML = `

        <div style="
            text-align:center;
        ">

            <h2>
                FAST CLICKER
            </h2>

            <p
                id="clickTime"
                style="
                    color:#888;
                    margin:15px 0;
                "
            >
                Click as many times as possible
                in 10 seconds.
            </p>

            <div style="
                font-size:50px;
                font-weight:900;
                margin:20px;
                color:#7c5cff;
            "
            id="clickScore">
                0
            </div>

            <button
                id="clickButton"
                class="play-btn"
            >
                START
            </button>

        </div>
    `;


    const button =
        document.getElementById(
            "clickButton"
        );

    const scoreElement =
        document.getElementById(
            "clickScore"
        );

    const timeElement =
        document.getElementById(
            "clickTime"
        );


    let score = 0;

    let time = 10;

    let playing = false;

    let interval;


    button.onclick = function() {

        if(!playing) {

            playing = true;

            score = 0;

            time = 10;

            scoreElement.textContent =
                score;

            button.textContent =
                "CLICK!";

            interval =
                setInterval(() => {

                    time--;

                    timeElement.textContent =
                        `Time: ${time}s`;

                    if(time <= 0) {

                        clearInterval(interval);

                        playing = false;

                        button.textContent =
                            `FINAL SCORE: ${score}`;

                        timeElement.textContent =
                            "Time's up!";

                    }

                },1000);

        } else {

            score++;

            scoreElement.textContent =
                score;
        }
    };
}
