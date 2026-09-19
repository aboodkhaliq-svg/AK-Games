let tttSize = 3;
let tttMode = "bot";
let tttBoard = [];
let tttPlayer = "X";
let tttGameOver = false;

function createTicTacToe() {
    const container = document.getElementById("gameContainer");

    container.innerHTML = `
        <style>
            .ttt-menu {
                width: 520px;
                max-width: 94%;
                margin: 0 auto;
                text-align: center;
                padding: 10px 0;
            }

            .ttt-menu h3 {
                font-size: 30px;
                font-weight: 900;
                margin-bottom: 7px;
                letter-spacing: -.5px;
            }

            .ttt-subtitle {
                color: var(--muted);
                font-size: 15px;
                margin-bottom: 34px;
            }

            .ttt-section {
                margin-bottom: 29px;
            }

            .ttt-label {
                color: var(--muted);
                font-size: 12px;
                font-weight: 900;
                letter-spacing: 1.5px;
                margin-bottom: 12px;
            }

            .ttt-options {
                display: flex;
                justify-content: center;
                gap: 13px;
            }

            .ttt-option {
                min-width: 125px;
                padding: 14px 18px;
                border: 1px solid var(--line);
                border-radius: 11px;
                background: var(--card);
                color: var(--muted);
                font-size: 14px;
                font-weight: 800;
                cursor: pointer;
                transition: .2s ease;
            }

            .ttt-option:hover {
                transform: translateY(-2px);
                border-color: var(--accent);
                color: var(--text);
            }

            .ttt-option.active {
                background: var(--accent);
                border-color: var(--accent);
                color: white;
                box-shadow: 0 7px 20px rgba(124, 77, 255, .25);
            }

            .ttt-start {
                position: relative;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                gap: 12px;
                min-width: 225px;
                height: 54px;
                margin-top: 5px;
                padding: 0 25px;
                border: 0;
                border-radius: 12px;
                background: linear-gradient(135deg, #7c4dff, #6840e8);
                color: white;
                font-size: 14px;
                font-weight: 900;
                letter-spacing: .8px;
                cursor: pointer;
                box-shadow: 0 10px 28px rgba(124, 77, 255, .25);
                overflow: hidden;
                transition: .25s ease;
            }

            .ttt-start::before {
                content: "";
                position: absolute;
                top: 0;
                left: -100%;
                width: 70%;
                height: 100%;
                background: linear-gradient(
                    90deg,
                    transparent,
                    rgba(255,255,255,.25),
                    transparent
                );
                transform: skewX(-20deg);
                animation: tttButtonShine 3s infinite;
            }

            .ttt-start:hover {
                transform: translateY(-3px) scale(1.02);
                box-shadow: 0 15px 35px rgba(124, 77, 255, .38);
            }

            .ttt-start:active {
                transform: scale(.97);
            }

            .ttt-start-icon {
                position: relative;
                z-index: 2;
                width: 27px;
                height: 27px;
                display: grid;
                place-items: center;
                border-radius: 50%;
                background: rgba(255,255,255,.16);
                font-size: 11px;
                padding-left: 2px;
                animation: tttPlayPulse 1.5s infinite ease-in-out;
            }

            .ttt-start-text {
                position: relative;
                z-index: 2;
            }

            @keyframes tttPlayPulse {
                0%, 100% {
                    transform: scale(1);
                    box-shadow: 0 0 0 0 rgba(255,255,255,.25);
                }

                50% {
                    transform: scale(1.13);
                    box-shadow: 0 0 0 7px rgba(255,255,255,0);
                }
            }

            @keyframes tttButtonShine {
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

            .ttt {
                width: 600px;
                max-width: 100%;
                margin: auto;
                text-align: center;
                position: relative;
            }

            .ttt-status {
                margin-bottom: 16px;
                color: var(--muted);
                font-size: 14px;
                font-weight: 700;
            }

            .ttt-board {
                width: 330px;
                max-width: 90vw;
                margin: auto;
                display: grid;
                gap: 7px;
            }

            .ttt-board-5 {
                width: 390px;
            }

            .ttt-board-7 {
                width: 420px;
            }

            .ttt-cell {
                aspect-ratio: 1;
                border: 1px solid var(--line);
                border-radius: 8px;
                background: var(--card);
                color: var(--text);
                display: grid;
                place-items: center;
                padding: 0;
                font-size: 30px;
                font-weight: 900;
                cursor: pointer;
                transition: .15s;
            }

            .ttt-board-5 .ttt-cell {
                font-size: 23px;
            }

            .ttt-board-7 .ttt-cell {
                font-size: 18px;
            }

            .ttt-cell:hover {
                background: var(--card2);
                border-color: var(--accent);
                transform: scale(.97);
            }

            .ttt-cell.filled {
                cursor: default;
            }

            .ttt-result {
                position: fixed;
                inset: 0;
                z-index: 9999;
                display: grid;
                place-items: center;
                pointer-events: none;
                opacity: 0;
            }

            .ttt-result.show {
                opacity: 1;
            }

            .ttt-result-text {
                font-size: clamp(70px, 13vw, 170px);
                font-weight: 1000;
                letter-spacing: 8px;
                text-transform: uppercase;
                animation: tttResultAnimation 2s ease-in-out forwards;
                text-shadow:
                    0 0 15px rgba(255,255,255,.25),
                    0 0 45px rgba(255,255,255,.15);
            }

            .ttt-win {
                color: #4cff88;
            }

            .ttt-lost {
                color: #ff4d5e;
            }

            .ttt-draw {
                color: #ffd84d;
            }

            @keyframes tttResultAnimation {
                0% {
                    opacity: 0;
                    transform: scale(.25);
                    filter: blur(12px);
                }

                20% {
                    opacity: 1;
                    transform: scale(1.15);
                    filter: blur(0);
                }

                40% {
                    transform: scale(.95);
                }

                55% {
                    transform: scale(1.05);
                }

                75% {
                    opacity: 1;
                    transform: scale(1);
                }

                100% {
                    opacity: 0;
                    transform: scale(1.15);
                }
            }

            @media (max-width: 600px) {
                .ttt-menu {
                    width: 95%;
                }

                .ttt-options {
                    flex-wrap: wrap;
                }

                .ttt-option {
                    min-width: 105px;
                }

                .ttt-board,
                .ttt-board-5,
                .ttt-board-7 {
                    width: min(90vw, 390px);
                }
            }
        </style>

        <div class="ttt-menu">
            <h3>Tic Tac Toe</h3>
            <p class="ttt-subtitle">Choose your game</p>

            <div class="ttt-section">
                <div class="ttt-label">BOARD SIZE</div>

                <div class="ttt-options">
                    <button class="ttt-option active" onclick="selectTttSize(3,this)">
                        3 × 3
                    </button>

                    <button class="ttt-option" onclick="selectTttSize(5,this)">
                        5 × 5
                    </button>

                    <button class="ttt-option" onclick="selectTttSize(7,this)">
                        7 × 7
                    </button>
                </div>
            </div>

            <div class="ttt-section">
                <div class="ttt-label">GAME MODE</div>

                <div class="ttt-options">
                    <button class="ttt-option active" onclick="selectTttMode('bot',this)">
                        🤖 Bot
                    </button>

                    <button class="ttt-option" onclick="selectTttMode('multiplayer',this)">
                        👥 Multiplayer
                    </button>
                </div>
            </div>

            <button class="ttt-start" onclick="startTicTacToe()">
                <span class="ttt-start-icon">▶</span>
                <span class="ttt-start-text">START GAME</span>
            </button>
        </div>
    `;
}

function selectTttSize(size, button) {
    tttSize = size;

    button.parentElement
        .querySelectorAll(".ttt-option")
        .forEach(btn => btn.classList.remove("active"));

    button.classList.add("active");
}

function selectTttMode(mode, button) {
    tttMode = mode;

    button.parentElement
        .querySelectorAll(".ttt-option")
        .forEach(btn => btn.classList.remove("active"));

    button.classList.add("active");
}

function startTicTacToe() {
    tttBoard = Array(tttSize * tttSize).fill("");
    tttPlayer = "X";
    tttGameOver = false;

    const container = document.getElementById("gameContainer");

    container.innerHTML = `
        <div class="ttt">
            <div class="ttt-status" id="tttStatus">
                ${tttMode === "bot" ? "Your turn — X" : "Player X's turn"}
            </div>

            <div
                class="ttt-board ttt-board-${tttSize}"
                style="grid-template-columns:repeat(${tttSize},1fr)"
                id="tttBoard"
            ></div>

            <div id="tttResult" class="ttt-result"></div>
        </div>
    `;

    renderTicTacToe();
}

function renderTicTacToe() {
    const board = document.getElementById("tttBoard");

    if (!board) {
        return;
    }

    board.innerHTML = tttBoard.map((value, index) => `
        <button
            class="ttt-cell ${value ? "filled" : ""}"
            onclick="tttMove(${index})"
        >
            ${value}
        </button>
    `).join("");
}

function tttMove(index) {
    if (tttGameOver || tttBoard[index]) {
        return;
    }

    if (tttMode === "bot" && tttPlayer !== "X") {
        return;
    }

    tttBoard[index] = tttPlayer;

    renderTicTacToe();

    if (checkTttWinner(tttPlayer)) {
        if (tttMode === "bot" && tttPlayer === "X") {
            finishTicTacToe("WIN");
        } else if (tttMode === "multiplayer") {
            finishTicTacToe("WIN");
        }

        return;
    }

    if (tttBoard.every(cell => cell !== "")) {
        finishTicTacToe("DRAW");
        return;
    }

    if (tttMode === "bot") {
        tttPlayer = "O";

        document.getElementById("tttStatus").textContent =
            "🤖 Bot's turn...";

        setTimeout(tttBotMove, 350);
    } else {
        tttPlayer = tttPlayer === "X" ? "O" : "X";

        document.getElementById("tttStatus").textContent =
            `Player ${tttPlayer}'s turn`;
    }
}

function tttBotMove() {
    if (tttGameOver) {
        return;
    }

    const emptyCells = [];

    tttBoard.forEach((cell, index) => {
        if (cell === "") {
            emptyCells.push(index);
        }
    });

    if (!emptyCells.length) {
        finishTicTacToe("DRAW");
        return;
    }

    let move = findWinningMove("O");

    if (move === -1) {
        move = findWinningMove("X");
    }

    if (move === -1) {
        move = findBestBotMove(emptyCells);
    }

    tttBoard[move] = "O";

    renderTicTacToe();

    if (checkTttWinner("O")) {
        finishTicTacToe("LOST");
        return;
    }

    if (tttBoard.every(cell => cell !== "")) {
        finishTicTacToe("DRAW");
        return;
    }

    tttPlayer = "X";

    document.getElementById("tttStatus").textContent =
        "Your turn — X";
}

function findWinningMove(player) {
    for (let i = 0; i < tttBoard.length; i++) {
        if (tttBoard[i] !== "") {
            continue;
        }

        tttBoard[i] = player;

        const wins = checkTttWinner(player);

        tttBoard[i] = "";

        if (wins) {
            return i;
        }
    }

    return -1;
}

function findBestBotMove(emptyCells) {
    const center = Math.floor(tttBoard.length / 2);

    if (tttBoard[center] === "") {
        return center;
    }

    const corners = [
        0,
        tttSize - 1,
        tttSize * (tttSize - 1),
        tttSize * tttSize - 1
    ];

    const availableCorners = corners.filter(
        index => tttBoard[index] === ""
    );

    if (availableCorners.length) {
        return availableCorners[
            Math.floor(Math.random() * availableCorners.length)
        ];
    }

    return emptyCells[
        Math.floor(Math.random() * emptyCells.length)
    ];
}

function checkTttWinner(player) {
    const size = tttSize;
    const winLength = size === 3 ? 3 : 4;

    const directions = [
        [0, 1],
        [1, 0],
        [1, 1],
        [1, -1]
    ];

    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {

            if (tttBoard[row * size + col] !== player) {
                continue;
            }

            for (const [rowDirection, colDirection] of directions) {
                let count = 1;

                for (let step = 1; step < winLength; step++) {
                    const nextRow = row + rowDirection * step;
                    const nextCol = col + colDirection * step;

                    if (
                        nextRow < 0 ||
                        nextRow >= size ||
                        nextCol < 0 ||
                        nextCol >= size
                    ) {
                        break;
                    }

                    if (
                        tttBoard[nextRow * size + nextCol] === player
                    ) {
                        count++;
                    } else {
                        break;
                    }
                }

                if (count >= winLength) {
                    return true;
                }
            }
        }
    }

    return false;
}

function finishTicTacToe(result) {
    if (tttGameOver) {
        return;
    }

    tttGameOver = true;

    const status = document.getElementById("tttStatus");
    const resultBox = document.getElementById("tttResult");

    if (!status || !resultBox) {
        setTimeout(() => {
            createTicTacToe();
        }, 500);

        return;
    }

    if (result === "WIN") {
        if (tttMode === "bot") {
            status.textContent = "🎉 You Win!";
        } else {
            status.textContent = `🎉 Player ${tttPlayer} Wins!`;
        }
    }

    if (result === "LOST") {
        status.textContent = "🤖 Bot Wins!";
    }

    if (result === "DRAW") {
        status.textContent = "Game Draw!";
    }

    resultBox.innerHTML = `
        <div class="ttt-result-text ttt-${result.toLowerCase()}">
            ${result}
        </div>
    `;

    requestAnimationFrame(() => {
        resultBox.classList.add("show");
    });

    setTimeout(() => {
        resultBox.classList.remove("show");
    }, 2100);

    setTimeout(() => {
        createTicTacToe();
    }, 2600);
}