(function () {

    window.createSnake = function (container) {

        if (!container) {
            container = document.getElementById("gameContainer");
        }

        if (!container) return;

        if (window.akSnakeInterval) {
            clearInterval(window.akSnakeInterval);
            window.akSnakeInterval = null;
        }

        container.innerHTML = `
            <div style="
                width:500px;
                max-width:88%;
                margin:auto;
                text-align:center;
            ">

                <div style="
                    display:flex;
                    justify-content:center;
                    gap:8px;
                    margin-bottom:10px;
                ">

                    <div style="
                        min-width:82px;
                        padding:7px 10px;
                        border:1px solid var(--line);
                        border-radius:9px;
                        background:var(--card);
                    ">
                        <div style="
                            color:var(--muted);
                            font-size:8px;
                            font-weight:800;
                        ">
                            SCORE
                        </div>

                        <strong
                            id="akSnakeScore"
                            style="
                                display:block;
                                font-size:16px;
                                margin-top:2px;
                            "
                        >
                            0
                        </strong>
                    </div>

                    <div style="
                        min-width:82px;
                        padding:7px 10px;
                        border:1px solid var(--line);
                        border-radius:9px;
                        background:var(--card);
                    ">
                        <div style="
                            color:var(--muted);
                            font-size:8px;
                            font-weight:800;
                        ">
                            LEVEL
                        </div>

                        <strong
                            id="akSnakeLevel"
                            style="
                                display:block;
                                font-size:16px;
                                margin-top:2px;
                            "
                        >
                            1
                        </strong>
                    </div>

                    <div style="
                        min-width:82px;
                        padding:7px 10px;
                        border:1px solid var(--line);
                        border-radius:9px;
                        background:var(--card);
                    ">
                        <div style="
                            color:var(--muted);
                            font-size:8px;
                            font-weight:800;
                        ">
                            BEST
                        </div>

                        <strong
                            id="akSnakeBest"
                            style="
                                display:block;
                                font-size:16px;
                                margin-top:2px;
                            "
                        >
                            0
                        </strong>
                    </div>

                </div>

                <div style="
                    position:relative;
                    width:min(430px,78vw);
                    aspect-ratio:1;
                    margin:auto;
                    border:1px solid var(--line);
                    border-radius:12px;
                    overflow:hidden;
                    background:#07090d;
                    box-shadow:0 12px 32px rgba(0,0,0,.32);
                ">

                    <canvas
                        id="akSnakeCanvas"
                        width="500"
                        height="500"
                        style="
                            display:block;
                            width:100%;
                            height:100%;
                        "
                    ></canvas>

                    <div
                        id="akSnakeOverlay"
                        style="
                            position:absolute;
                            inset:0;
                            display:flex;
                            align-items:center;
                            justify-content:center;
                            background:rgba(5,7,12,.82);
                            backdrop-filter:blur(5px);
                        "
                    >

                        <div style="
                            width:270px;
                            max-width:80%;
                            padding:21px;
                            border-radius:14px;
                            background:#12151e;
                            border:1px solid var(--line);
                        ">

                            <h2
                                id="akSnakeTitle"
                                style="
                                    margin:0 0 7px;
                                    font-size:23px;
                                "
                            >
                                Snake
                            </h2>

                            <p
                                id="akSnakeMessage"
                                style="
                                    color:var(--muted);
                                    font-size:12px;
                                    line-height:1.45;
                                    margin:0 0 15px;
                                "
                            >
                                Eat the food and grow your snake.
                            </p>

                            <button
                                id="akSnakeStart"
                                style="
                                    width:175px;
                                    height:43px;
                                    border:0;
                                    border-radius:9px;
                                    background:linear-gradient(135deg,#7c4dff,#6840e8);
                                    color:white;
                                    font-weight:900;
                                    cursor:pointer;
                                "
                            >
                                ▶ START GAME
                            </button>

                        </div>

                    </div>

                    <button
                        id="akSnakePause"
                        style="
                            position:absolute;
                            top:8px;
                            right:8px;
                            width:33px;
                            height:33px;
                            border:1px solid rgba(255,255,255,.12);
                            border-radius:8px;
                            background:rgba(10,12,18,.8);
                            color:white;
                            cursor:pointer;
                        "
                    >
                        ⏸
                    </button>

                </div>

                <div style="
                    margin-top:7px;
                ">

                    <button
                        id="akSnakeUp"
                        style="
                            width:36px;
                            height:30px;
                            margin-bottom:4px;
                            border:1px solid var(--line);
                            border-radius:7px;
                            background:var(--card);
                            color:white;
                            cursor:pointer;
                        "
                    >
                        ▲
                    </button>

                    <br>

                    <button
                        id="akSnakeLeft"
                        style="
                            width:36px;
                            height:30px;
                            border:1px solid var(--line);
                            border-radius:7px;
                            background:var(--card);
                            color:white;
                            cursor:pointer;
                        "
                    >
                        ◀
                    </button>

                    <button
                        id="akSnakeDown"
                        style="
                            width:36px;
                            height:30px;
                            border:1px solid var(--line);
                            border-radius:7px;
                            background:var(--card);
                            color:white;
                            cursor:pointer;
                        "
                    >
                        ▼
                    </button>

                    <button
                        id="akSnakeRight"
                        style="
                            width:36px;
                            height:30px;
                            border:1px solid var(--line);
                            border-radius:7px;
                            background:var(--card);
                            color:white;
                            cursor:pointer;
                        "
                    >
                        ▶
                    </button>

                </div>

                <div style="
                    color:var(--muted);
                    font-size:10px;
                    margin-top:6px;
                ">
                    Arrow Keys / WASD • Space to Pause
                </div>

            </div>
        `;

        var canvas =
            document.getElementById("akSnakeCanvas");

        var ctx =
            canvas.getContext("2d");

        var scoreElement =
            document.getElementById("akSnakeScore");

        var levelElement =
            document.getElementById("akSnakeLevel");

        var bestElement =
            document.getElementById("akSnakeBest");

        var overlay =
            document.getElementById("akSnakeOverlay");

        var title =
            document.getElementById("akSnakeTitle");

        var message =
            document.getElementById("akSnakeMessage");

        var startButton =
            document.getElementById("akSnakeStart");

        var pauseButton =
            document.getElementById("akSnakePause");

        var grid = 25;
        var cell = 20;

        var snake = [];

        var food = {};

        var direction = {
            x:1,
            y:0
        };

        var nextDirection = {
            x:1,
            y:0
        };

        var score = 0;
        var level = 1;

        var best =
            Number(
                localStorage.getItem("akSnakeBest") || 0
            );

        var running = false;
        var paused = false;

        bestElement.textContent = best;

        function resetGame() {

            snake = [
                {x:12,y:12},
                {x:11,y:12},
                {x:10,y:12}
            ];

            direction = {
                x:1,
                y:0
            };

            nextDirection = {
                x:1,
                y:0
            };

            score = 0;
            level = 1;

            createFood();
            updateStats();
            draw();
        }

        function createFood() {

            var valid = false;

            while (!valid) {

                food = {
                    x:Math.floor(Math.random() * grid),
                    y:Math.floor(Math.random() * grid)
                };

                valid =
                    !snake.some(function(part) {

                        return (
                            part.x === food.x &&
                            part.y === food.y
                        );

                    });
            }
        }

        function updateStats() {

            scoreElement.textContent = score;
            levelElement.textContent = level;

            if (score > best) {

                best = score;

                bestElement.textContent = best;

                localStorage.setItem(
                    "akSnakeBest",
                    best
                );
            }
        }

        function getSpeed() {

            return Math.max(
                55,
                130 - ((level - 1) * 10)
            );
        }

        function startTimer() {

            if (window.akSnakeInterval) {

                clearInterval(
                    window.akSnakeInterval
                );
            }

            window.akSnakeInterval =
                setInterval(
                    function () {

                        if (
                            running &&
                            !paused
                        ) {

                            moveSnake();
                            draw();
                        }

                    },
                    getSpeed()
                );
        }

        function startGame() {

            resetGame();

            running = true;
            paused = false;

            overlay.style.display = "none";

            pauseButton.textContent = "⏸";

            startTimer();
        }

        function moveSnake() {

            direction = nextDirection;

            var head = {
                x:
                    snake[0].x +
                    direction.x,

                y:
                    snake[0].y +
                    direction.y
            };

            if (
                head.x < 0 ||
                head.x >= grid ||
                head.y < 0 ||
                head.y >= grid
            ) {

                gameOver();

                return;
            }

            if (
                snake.some(function(part) {

                    return (
                        part.x === head.x &&
                        part.y === head.y
                    );

                })
            ) {

                gameOver();

                return;
            }

            snake.unshift(head);

            if (
                head.x === food.x &&
                head.y === food.y
            ) {

                score++;

                level =
                    Math.floor(score / 5) + 1;

                createFood();

                updateStats();

                startTimer();

            } else {

                snake.pop();
            }
        }

        function gameOver() {

            running = false;
            paused = false;

            clearInterval(
                window.akSnakeInterval
            );

            title.textContent = "GAME OVER";

            message.innerHTML =
                "Score: <strong>" +
                score +
                "</strong>";

            startButton.textContent =
                "↻ PLAY AGAIN";

            overlay.style.display = "flex";

            pauseButton.textContent = "⏸";
        }

        function togglePause() {

            if (!running) {
                return;
            }

            paused = !paused;

            if (paused) {

                title.textContent = "PAUSED";

                message.textContent =
                    "Press resume to continue.";

                startButton.textContent =
                    "▶ RESUME";

                overlay.style.display =
                    "flex";

                pauseButton.textContent =
                    "▶";

            } else {

                overlay.style.display =
                    "none";

                pauseButton.textContent =
                    "⏸";
            }
        }

        function changeDirection(x,y) {

            if (!running || paused) {
                return;
            }

            if (
                x === -direction.x &&
                y === -direction.y
            ) {
                return;
            }

            nextDirection = {
                x:x,
                y:y
            };
        }

        function draw() {

            ctx.fillStyle = "#07090d";

            ctx.fillRect(
                0,
                0,
                canvas.width,
                canvas.height
            );

            ctx.strokeStyle =
                "rgba(255,255,255,.035)";

            for (
                var i = 0;
                i <= grid;
                i++
            ) {

                ctx.beginPath();

                ctx.moveTo(
                    i * cell,
                    0
                );

                ctx.lineTo(
                    i * cell,
                    canvas.height
                );

                ctx.stroke();

                ctx.beginPath();

                ctx.moveTo(
                    0,
                    i * cell
                );

                ctx.lineTo(
                    canvas.width,
                    i * cell
                );

                ctx.stroke();
            }

            var foodX =
                food.x * cell +
                cell / 2;

            var foodY =
                food.y * cell +
                cell / 2;

            ctx.fillStyle = "#ff405c";

            ctx.shadowColor = "#ff405c";
            ctx.shadowBlur = 16;

            ctx.beginPath();

            ctx.arc(
                foodX,
                foodY,
                7,
                0,
                Math.PI * 2
            );

            ctx.fill();

            ctx.shadowBlur = 0;

            snake.forEach(
                function(part,index) {

                    var x =
                        part.x * cell;

                    var y =
                        part.y * cell;

                    ctx.fillStyle =
                        index === 0
                            ? "#8b6cff"
                            : "#6048d8";

                    ctx.shadowColor =
                        "#7c5cff";

                    ctx.shadowBlur =
                        index === 0
                            ? 14
                            : 5;

                    ctx.fillRect(
                        x + 2,
                        y + 2,
                        cell - 4,
                        cell - 4
                    );

                    ctx.shadowBlur = 0;

                    if (index === 0) {

                        ctx.fillStyle = "#ffffff";

                        ctx.beginPath();

                        ctx.arc(
                            x + 14,
                            y + 7,
                            2,
                            0,
                            Math.PI * 2
                        );

                        ctx.arc(
                            x + 14,
                            y + 13,
                            2,
                            0,
                            Math.PI * 2
                        );

                        ctx.fill();
                    }
                }
            );
        }

        startButton.onclick =
            function () {

                if (
                    paused &&
                    running
                ) {

                    togglePause();

                } else {

                    startGame();
                }
            };

        pauseButton.onclick =
            function () {

                togglePause();
            };

        document.getElementById(
            "akSnakeUp"
        ).onclick =
            function () {

                changeDirection(0,-1);
            };

        document.getElementById(
            "akSnakeDown"
        ).onclick =
            function () {

                changeDirection(0,1);
            };

        document.getElementById(
            "akSnakeLeft"
        ).onclick =
            function () {

                changeDirection(-1,0);
            };

        document.getElementById(
            "akSnakeRight"
        ).onclick =
            function () {

                changeDirection(1,0);
            };

        document.onkeydown =
            function (e) {

                var key =
                    e.key.toLowerCase();

                if (
                    key === "arrowup" ||
                    key === "w"
                ) {

                    e.preventDefault();

                    changeDirection(0,-1);
                }

                if (
                    key === "arrowdown" ||
                    key === "s"
                ) {

                    e.preventDefault();

                    changeDirection(0,1);
                }

                if (
                    key === "arrowleft" ||
                    key === "a"
                ) {

                    e.preventDefault();

                    changeDirection(-1,0);
                }

                if (
                    key === "arrowright" ||
                    key === "d"
                ) {

                    e.preventDefault();

                    changeDirection(1,0);
                }

                if (e.code === "Space") {

                    e.preventDefault();

                    togglePause();
                }
            };

        resetGame();

    };

})();