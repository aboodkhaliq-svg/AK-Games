function createGuess(container) {

    const number =
        Math.floor(
            Math.random() * 100
        ) + 1;


    let attempts = 0;


    container.innerHTML = `

        <div style="
            text-align:center;
            width:450px;
            max-width:100%;
        ">

            <h2>GUESS THE NUMBER</h2>

            <p style="
                color:#888;
                margin:15px 0 25px;
            ">
                I'm thinking of a number from 1 to 100.
            </p>

            <input
                id="guessInput"
                type="number"
                min="1"
                max="100"
                placeholder="Enter number"
                style="
                    width:100%;
                    padding:15px;
                    background:#0d1017;
                    border:1px solid #292e3a;
                    color:white;
                    border-radius:8px;
                    outline:none;
                "
            >

            <button
                id="guessButton"
                class="play-btn"
                style="margin-top:15px"
            >
                GUESS
            </button>

            <div
                id="guessResult"
                style="
                    margin-top:25px;
                    font-size:18px;
                    font-weight:bold;
                "
            ></div>

        </div>
    `;


    const input =
        document.getElementById(
            "guessInput"
        );

    const button =
        document.getElementById(
            "guessButton"
        );

    const result =
        document.getElementById(
            "guessResult"
        );


    button.onclick = function() {

        const guess =
            Number(input.value);

        if(
            guess < 1 ||
            guess > 100
        ) {

            result.textContent =
                "Enter a number between 1 and 100.";

            return;
        }


        attempts++;


        if(guess === number) {

            result.textContent =
                `🎉 Correct! You got it in ${attempts} attempts.`;

            button.disabled = true;

        } else if(guess < number) {

            result.textContent =
                "📈 Too low! Try a higher number.";

        } else {

            result.textContent =
                "📉 Too high! Try a lower number.";
        }
    };


    input.addEventListener(
        "keydown",
        e => {

            if(e.key === "Enter") {
                button.click();
            }

        }
    );
}
