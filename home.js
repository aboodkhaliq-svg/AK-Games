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

renderGames(games);
