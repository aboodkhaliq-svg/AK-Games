/* =========================================
   AK GAMES
   Complete Game Website
========================================= */


/* =========================================
   GAME DATABASE
========================================= */

const games = [
    {
        id: "tictactoe",
        name: "Tic Tac Toe",
        description: "Classic X and O strategy game.",
        category: "Board",
        icon: "❌⭕"
    },

    {
        id: "chess",
        name: "Chess",
        description: "Play a classic chess game.",
        category: "Board",
        icon: "♟️"
    },

    {
        id: "snake",
        name: "Snake",
        description: "Eat food and grow your snake.",
        category: "Arcade",
        icon: "🐍"
    },

    {
        id: "memory",
        name: "Memory Match",
        description: "Find all matching pairs.",
        category: "Puzzle",
        icon: "🧠"
    },

    {
        id: "2048",
        name: "2048",
        description: "Combine numbers to reach 2048.",
        category: "Puzzle",
        icon: "🔢"
    },

    {
        id: "reaction",
        name: "Reaction Test",
        description: "Test how fast you can react.",
        category: "Action",
        icon: "⚡"
    },

    {
        id: "clicker",
        name: "Fast Clicker",
        description: "Click as fast as possible.",
        category: "Arcade",
        icon: "👆"
    },

    {
        id: "guess",
        name: "Number Guess",
        description: "Guess the hidden number.",
        category: "Puzzle",
        icon: "🎯"
    }
];


let currentGame = null;


/* =========================================
   HOME
========================================= */

function renderGames(list = games) {

    const grid = document.getElementById("gameGrid");

    if (list.length === 0) {

        grid.innerHTML = `
            <div class="no-results">
                <h2>No games found</h2>
                <p>Try another search.</p>
            </div>
        `;

        return;
    }

    grid.innerHTML = list.map(game => `

        <div class="game-card">

            <div class="game-image">
                ${game.icon}
            </div>

            <div class="game-info">

                <h3>${game.name}</h3>

                <p>${game.description}</p>

                <div class="game-bottom">

                    <span class="category">
                        ${game.category}
                    </span>

                    <button
                        class="game-play"
                        onclick="openGame('${game.id}')"
                    >
                        PLAY
                    </button>

                </div>

            </div>

        </div>

    `).join("");
}


function showHome() {

    document.getElementById("homePage").style.display = "block";

    document.getElementById("gamePage").classList.remove("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function scrollToGames() {

    document.getElementById("gamesSection").scrollIntoView({
        behavior: "smooth"
    });
}


function showAllGames() {

    renderGames(games);

    document.getElementById("gamesSection").scrollIntoView({
        behavior: "smooth"
    });
}


function filterGames(category) {

    const filtered = games.filter(
        game => game.category === category
    );

    document.getElementById("homePage").style.display = "block";
    document.getElementById("gamePage").classList.remove("active");

    renderGames(filtered);

    document.getElementById("gamesSection").scrollIntoView({
        behavior: "smooth"
    });
}


function searchGames() {

    const query =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase();

    const filtered = games.filter(game =>
        game.name.toLowerCase().includes(query) ||
        game.category.toLowerCase().includes(query)
    );

    renderGames(filtered);
}


/* =========================================
   OPEN GAME
========================================= */

function openGame(id) {

    currentGame = id;

    document.getElementById("homePage").style.display = "none";

    document.getElementById("gamePage").classList.add("active");

    const game = games.find(g => g.id === id);

    document.getElementById("gameTitle").textContent = game.name;

    const container =
        document.getElementById("gameContainer");

    container.innerHTML = "";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    if (id === "tictactoe") {
        createTicTacToe(container);
    }

    if (id === "chess") {
        createChess(container);
    }

    if (id === "snake") {
        createSnake(container);
    }

    if (id === "memory") {
        createMemory(container);
    }

    if (id === "2048") {
        create2048(container);
    }

    if (id === "reaction") {
        createReaction(container);
    }

    if (id === "clicker") {
        createClicker(container);
    }

    if (id === "guess") {
        createGuess(container);
    }
}


function restartCurrentGame() {

    if (currentGame) {
        openGame(currentGame);
    }
}


/* =========================================
   TIC TAC TOE
========================================= */

function createTicTacToe(container) {

    let board = ["","","","","","","","",""];

    let player = "X";

    let gameOver = false;

    container.innerHTML = `

        <div class="ttt-wrapper">

            <div
                class="game-status"
                id="tttStatus"
            >
                Player X's turn
            </div>

            <div
                class="ttt-board"
                id="tttBoard"
            ></div>

            <button
                class="small-btn"
                onclick="restartCurrentGame()"
            >
                NEW GAME
            </button>

        </div>
    `;


    const boardElement =
        document.getElementById("tttBoard");

    function draw() {

        boardElement.innerHTML = "";

        board.forEach((value,index) => {

            const cell =
                document.createElement("button");

            cell.className = "ttt-cell";

            cell.textContent = value;

            if (value === "X") {
                cell.classList.add("x");
            }

            if (value === "O") {
                cell.classList.add("o");
            }

            cell.onclick = () => play(index);

            boardElement.appendChild(cell);
        });
    }


    function play(index) {

        if (board[index] || gameOver) {
            return;
        }

        board[index] = player;

        draw();

        const winner = checkWinner(board);

        if (winner) {

            document.getElementById("tttStatus")
                .textContent =
                winner === "draw"
                    ? "It's a draw!"
                    : `Player ${winner} wins!`;

            gameOver = true;

            return;
        }

        player = player === "X" ? "O" : "X";

        document.getElementById("tttStatus")
            .textContent =
            `Player ${player}'s turn`;
    }


    draw();
}


function checkWinner(board) {

    const combinations = [

        [0,1,2],
        [3,4,5],
        [6,7,8],

        [0,3,6],
        [1,4,7],
        [2,5,8],

        [0,4,8],
        [2,4,6]

    ];


    for (const combo of combinations) {

        const [a,b,c] = combo;

        if (
            board[a] &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {
            return board[a];
        }
    }


    if (board.every(Boolean)) {
        return "draw";
    }

    return null;
}


/* =========================================
   SNAKE
========================================= */

let snakeInterval = null;

function createSnake(container) {

    clearInterval(snakeInterval);

    container.innerHTML = `

        <div class="snake-wrapper">

            <div class="snake-score">
                Score: <span id="snakeScore">0</span>
            </div>

            <canvas
                id="snakeCanvas"
                width="400"
                height="400"
            ></canvas>

            <p style="color:#888;margin-top:15px">
                Use Arrow Keys or WASD
            </p>

        </div>
    `;


    const canvas =
        document.getElementById("snakeCanvas");

    const ctx = canvas.getContext("2d");

    const size = 20;

    let snake = [
        {x:200,y:200}
    ];

    let direction = {
        x: size,
        y: 0
    };

    let food = randomFood();

    let score = 0;

    let running = true;


    function randomFood() {

        return {
            x:
                Math.floor(
                    Math.random() * (canvas.width / size)
                ) * size,

            y:
                Math.floor(
                    Math.random() * (canvas.height / size)
                ) * size
        };
    }


    function gameLoop() {

        if (!running) return;

        const head = {
            x: snake[0].x + direction.x,
            y: snake[0].y + direction.y
        };


        if (
            head.x < 0 ||
            head.y < 0 ||
            head.x >= canvas.width ||
            head.y >= canvas.height ||
            snake.some(
                part =>
                    part.x === head.x &&
                    part.y === head.y
            )
        ) {

            running = false;

            clearInterval(snakeInterval);

            alert(`Game Over! Score: ${score}`);

            return;
        }


        snake.unshift(head);


        if (
            head.x === food.x &&
            head.y === food.y
        ) {

            score++;

            document.getElementById("snakeScore")
                .textContent = score;

            food = randomFood();

        } else {

            snake.pop();
        }


        ctx.fillStyle = "#07090d";

        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        ctx.fillStyle = "#ff4f6d";

        ctx.fillRect(
            food.x,
            food.y,
            size,
            size
        );


        snake.forEach((part,index) => {

            ctx.fillStyle =
                index === 0
                    ? "#7c5cff"
                    : "#a18cff";

            ctx.fillRect(
                part.x + 1,
                part.y + 1,
                size - 2,
                size - 2
            );
        });
    }


    document.onkeydown = function(e) {

        const key = e.key.toLowerCase();

        if (
            key === "arrowup" ||
            key === "w"
        ) {

            if (direction.y === 0) {
                direction = {x:0,y:-size};
            }
        }

        if (
            key === "arrowdown" ||
            key === "s"
        ) {

            if (direction.y === 0) {
                direction = {x:0,y:size};
            }
        }

        if (
            key === "arrowleft" ||
            key === "a"
        ) {

            if (direction.x === 0) {
                direction = {x:-size,y:0};
            }
        }

        if (
            key === "arrowright" ||
            key === "d"
        ) {

            if (direction.x === 0) {
                direction = {x:size,y:0};
            }
        }
    };


    snakeInterval =
        setInterval(gameLoop, 110);
}


/* =========================================
   MEMORY GAME
========================================= */

function createMemory(container) {

    const emojis = [
        "🍎","🍎",
        "🍕","🍕",
        "🚀","🚀",
        "⚽","⚽",
        "🎮","🎮",
        "🔥","🔥",
        "🐱","🐱",
        "⭐","⭐"
    ];


    emojis.sort(() => Math.random() - .5);


    container.innerHTML = `

        <div class="memory-wrapper">

            <div class="memory-info">
                Matches: <span id="memoryMatches">0</span> / 8
            </div>

            <div
                class="memory-grid"
                id="memoryGrid"
            ></div>

        </div>
    `;


    const grid =
        document.getElementById("memoryGrid");

    let first = null;

    let second = null;

    let locked = false;

    let matches = 0;


    emojis.forEach((emoji,index) => {

        const card =
            document.createElement("button");

        card.className = "memory-card";

        card.dataset.emoji = emoji;

        card.dataset.index = index;

        card.textContent = emoji;

        card.onclick = () => flip(card);

        grid.appendChild(card);
    });


    function flip(card) {

        if (
            locked ||
            card === first ||
            card.classList.contains("matched")
        ) {
            return;
        }

        card.classList.add("flipped");


        if (!first) {

            first = card;

            return;
        }


        second = card;

        locked = true;


        if (
            first.dataset.emoji ===
            second.dataset.emoji
        ) {

            first.classList.add("matched");
            second.classList.add("matched");

            matches++;

            document.getElementById(
                "memoryMatches"
            ).textContent = matches;

            resetTurn();

        } else {

            setTimeout(() => {

                first.classList.remove("flipped");

                second.classList.remove("flipped");

                resetTurn();

            },700);
        }
    }


    function resetTurn() {

        first = null;

        second = null;

        locked = false;

        if (matches === 8) {

            setTimeout(() => {
                alert("🎉 You matched everything!");
            },300);
        }
    }
}


/* =========================================
   2048
========================================= */

function create2048(container) {

    let board = Array(16).fill(0);

    let score = 0;


    container.innerHTML = `

        <div class="game2048">

            <div class="score2048">
                Score:
                <span id="score2048">0</span>
            </div>

            <div
                class="board2048"
                id="board2048"
            ></div>

            <p style="color:#888;margin-top:15px">
                Use Arrow Keys or WASD
            </p>

        </div>
    `;


    const boardElement =
        document.getElementById("board2048");


    function addTile() {

        const empty = board
            .map((v,i) => v === 0 ? i : null)
            .filter(v => v !== null);

        if (!empty.length) return;

        const index =
            empty[
                Math.floor(
                    Math.random() * empty.length
                )
            ];

        board[index] =
            Math.random() < .9 ? 2 : 4;
    }


    function draw() {

        boardElement.innerHTML = "";

        board.forEach(value => {

            const tile =
                document.createElement("div");

            tile.className = "tile2048";

            if (value) {

                tile.textContent = value;

                tile.classList.add(
                    value >= 2048
                        ? "tile2048value"
                        : `tile${value}`
                );
            }

            boardElement.appendChild(tile);
        });


        document.getElementById(
            "score2048"
        ).textContent = score;
    }


    function move(direction) {

        let old =
            JSON.stringify(board);


        if (direction === "left") {

            for (let row=0;row<4;row++) {

                let values =
                    board
                        .slice(row*4,row*4+4)
                        .filter(Boolean);

                values =
                    merge(values);

                while(values.length < 4) {
                    values.push(0);
                }

                for(let i=0;i<4;i++) {
                    board[row*4+i] = values[i];
                }
            }
        }


        if (direction === "right") {

            for (let row=0;row<4;row++) {

                let values =
                    board
                        .slice(row*4,row*4+4)
                        .filter(Boolean)
                        .reverse();

                values =
                    merge(values);

                while(values.length < 4) {
                    values.push(0);
                }

                values.reverse();

                for(let i=0;i<4;i++) {
                    board[row*4+i] = values[i];
                }
            }
        }


        if (
            direction === "up" ||
            direction === "down"
        ) {

            for(let col=0;col<4;col++) {

                let values = [];

                for(let row=0;row<4;row++) {

                    values.push(
                        board[row*4+col]
                    );
                }

                values = values.filter(Boolean);

                if(direction === "down") {
                    values.reverse();
                }

                values = merge(values);

                while(values.length < 4) {
                    values.push(0);
                }

                if(direction === "down") {
                    values.reverse();
                }

                for(let row=0;row<4;row++) {

                    board[row*4+col] =
                        values[row];
                }
            }
        }


        if (
            JSON.stringify(board) !== old
        ) {

            addTile();

            draw();

            if (isGameOver()) {

                setTimeout(() => {
                    alert(
                        `Game Over! Score: ${score}`
                    );
                },100);
            }
        }
    }


    function merge(values) {

        let result = [];

        for(let i=0;i<values.length;i++) {

            if (
                values[i] === values[i+1]
            ) {

                values[i] *= 2;

                score += values[i];

                result.push(values[i]);

                i++;

            } else {

                result.push(values[i]);
            }
        }

        return result;
    }


    function isGameOver() {

        if (board.includes(0)) {
            return false;
        }

        for(let i=0;i<16;i++) {

            if (
                i % 4 < 3 &&
                board[i] === board[i+1]
            ) {
                return false;
            }

            if (
                i < 12 &&
                board[i] === board[i+4]
            ) {
                return false;
            }
        }

        return true;
    }


    document.onkeydown = function(e) {

        const key = e.key.toLowerCase();

        if(
            key === "arrowleft" ||
            key === "a"
        ) move("left");

        if(
            key === "arrowright" ||
            key === "d"
        ) move("right");

        if(
            key === "arrowup" ||
            key === "w"
        ) move("up");

        if(
            key === "arrowdown" ||
            key === "s"
        ) move("down");
    };


    addTile();

    addTile();

    draw();
}


/* =========================================
   CHESS
========================================= */

function createChess(container) {

    const pieces = [

        ["♜","♞","♝","♛","♚","♝","♞","♜"],

        ["♟","♟","♟","♟","♟","♟","♟","♟"],

        ["","","","","","","",""],

        ["","","","","","","",""],

        ["","","","","","","",""],

        ["","","","","","","",""],

        ["♙","♙","♙","♙","♙","♙","♙","♙"],

        ["♖","♘","♗","♕","♔","♗","♘","♖"]

    ];


    let selected = null;

    let turn = "White";


    container.innerHTML = `

        <div class="chess-wrapper">

            <div
                class="chess-status"
                id="chessStatus"
            >
                White's turn
            </div>

            <div
                class="chess-board"
                id="chessBoard"
            ></div>

        </div>
    `;


    const board =
        document.getElementById("chessBoard");


    function draw() {

        board.innerHTML = "";


        pieces.forEach((row,r) => {

            row.forEach((piece,c) => {

                const square =
                    document.createElement("div");

                square.className =
                    "chess-square " +
                    ((r+c)%2 === 0
                        ? "light"
                        : "dark");


                square.textContent = piece;


                if(
                    selected &&
                    selected.r === r &&
                    selected.c === c
                ) {

                    square.classList.add(
                        "selected"
                    );
                }


                square.onclick = () =>
                    clickSquare(r,c);


                board.appendChild(square);
            });
        });
    }


    function isWhite(piece) {

        return "♙♖♘♗♕♔"
            .includes(piece);
    }


    function isBlack(piece) {

        return "♟♜♞♝♛♚"
            .includes(piece);
    }


    function clickSquare(r,c) {

        const piece = pieces[r][c];


        if(selected) {

            pieces[r][c] =
                pieces[selected.r][selected.c];

            pieces[selected.r][selected.c] = "";

            selected = null;

            turn =
                turn === "White"
                    ? "Black"
                    : "White";

            document.getElementById(
                "chessStatus"
            ).textContent =
                `${turn}'s turn`;

            draw();

            return;
        }


        if(!piece) return;


        if(
            turn === "White" &&
            !isWhite(piece)
        ) return;


        if(
            turn === "Black" &&
            !isBlack(piece)
        ) return;


        selected = {
            r,
            c
        };

        draw();
    }


    draw();
}


/* =========================================
   REACTION TEST
========================================= */

function createReaction(container) {

    container.innerHTML = `

        <div style="
            width:500px;
            max-width:100%;
            text-align:center;
        ">

            <h2 id="reactionText">
                Click START
            </h2>

            <p style="
                color:#888;
                margin:15px 0 25px;
            ">
                Wait for the box to turn green,
                then click as quickly as possible.
            </p>

            <button
                id="reactionButton"
                class="play-btn"
            >
                START
            </button>

            <div
                id="reactionResult"
                style="
                    margin-top:25px;
                    font-size:22px;
                    font-weight:bold;
                "
            ></div>

        </div>
    `;


    const button =
        document.getElementById(
            "reactionButton"
        );

    const text =
        document.getElementById(
            "reactionText"
        );

    const result =
        document.getElementById(
            "reactionResult"
        );


    let startTime = 0;

    let waiting = false;

    let timer;


    button.onclick = function() {

        if(!waiting && startTime === 0) {

            text.textContent =
                "Wait...";

            button.textContent =
                "WAIT";

            button.style.background =
                "#ff4f6d";

            timer = setTimeout(() => {

                waiting = true;

                startTime =
                    performance.now();

                text.textContent =
                    "CLICK NOW!";

                button.textContent =
                    "CLICK";

                button.style.background =
                    "#2de38b";

            }, Math.random()*3000 + 1500);

            return;
        }


        if(!waiting && startTime === 0) {

            return;
        }


        if(waiting) {

            const time =
                Math.round(
                    performance.now() -
                    startTime
                );

            result.textContent =
                `Your reaction time: ${time} ms`;

            waiting = false;

            startTime = 0;

            button.textContent =
                "PLAY AGAIN";

            button.style.background =
                "";

            text.textContent =
                "Try again!";

            return;
        }
    };
}


/* =========================================
   CLICKER
========================================= */

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


/* =========================================
   NUMBER GUESS
========================================= */

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


/* =========================================
   INITIAL LOAD
========================================= */

renderGames(games);