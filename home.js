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

function createGameIntro(game, callback) {

    const oldIntro = document.getElementById("akGameIntro");

    if (oldIntro) {
        oldIntro.remove();
    }

    const intro = document.createElement("div");

    intro.id = "akGameIntro";

    intro.innerHTML = `
        <div class="ak-intro-content">

            <div class="ak-intro-icon">
                ${game.icon}
            </div>

            <div class="ak-intro-name">
                ${game.name}
            </div>

        </div>
    `;

    document.body.appendChild(intro);

    requestAnimationFrame(() => {
        intro.classList.add("show");
    });

    setTimeout(() => {

        intro.classList.add("hide");

        setTimeout(() => {

            intro.remove();

            if (typeof callback === "function") {
                callback();
            }

        }, 250);

    }, 850);
}

function openGame(id) {

    currentGame = id;

    const game = games.find(g => g.id === id);

    if (!game) return;

    createGameIntro(game, function () {

        document.getElementById("homePage").style.display = "none";

        document.getElementById("gamePage").classList.add("active");

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

    });
}

function restartCurrentGame() {

    if (currentGame) {
        openGame(currentGame);
    }
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

let snakeInterval = null;

function addGameIntroCSS() {

    if (document.getElementById("akGameIntroStyle")) {
        return;
    }

    const style = document.createElement("style");

    style.id = "akGameIntroStyle";

    style.textContent = `

        #akGameIntro {
            position: fixed;
            inset: 0;
            z-index: 99999;

            display: flex;
            align-items: center;
            justify-content: center;

            background:
                radial-gradient(
                    circle at center,
                    #191d2d 0%,
                    #0b0d14 55%,
                    #050609 100%
                );

            opacity: 0;

            pointer-events: none;

            transition:
                opacity .25s ease;
        }

        #akGameIntro.show {
            opacity: 1;
        }

        #akGameIntro.hide {
            opacity: 0;
        }

        .ak-intro-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            transform:
                scale(.55)
                translateY(25px);

            opacity: 0;

            animation:
                akIntroIn .65s
                cubic-bezier(.2,.8,.2,1)
                forwards;
        }

        .ak-intro-icon {
            width: 115px;
            height: 115px;

            display: flex;
            align-items: center;
            justify-content: center;

            border-radius: 28px;

            background:
                linear-gradient(
                    145deg,
                    #1d2132,
                    #0d1018
                );

            border: 1px solid
                rgba(255,255,255,.13);

            box-shadow:
                0 25px 70px
                rgba(0,0,0,.65),

                0 0 45px
                rgba(120,90,255,.18);

            font-size: 60px;

            animation:
                akIconFloat
                1s ease-in-out
                infinite alternate;
        }

        .ak-intro-name {
            margin-top: 18px;

            color: #ffffff;

            font-size: 26px;

            font-weight: 900;

            letter-spacing: .4px;

            text-shadow:
                0 4px 20px
                rgba(0,0,0,.6);
        }

        @keyframes akIntroIn {

            0% {
                transform:
                    scale(.55)
                    translateY(25px);

                opacity: 0;

                filter: blur(8px);
            }

            60% {
                transform:
                    scale(1.08)
                    translateY(0);

                opacity: 1;

                filter: blur(0);
            }

            100% {
                transform:
                    scale(1)
                    translateY(0);

                opacity: 1;

                filter: blur(0);
            }
        }

        @keyframes akIconFloat {

            from {
                transform: translateY(0);
            }

            to {
                transform: translateY(-7px);
            }
        }

        @media (max-height: 600px) {

            .ak-intro-icon {
                width: 85px;
                height: 85px;
                font-size: 44px;
                border-radius: 20px;
            }

            .ak-intro-name {
                margin-top: 12px;
                font-size: 21px;
            }
        }

    `;

    document.head.appendChild(style);
}

addGameIntroCSS();

renderGames(games);