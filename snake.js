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
