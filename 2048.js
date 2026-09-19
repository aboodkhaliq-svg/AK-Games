function create2048(container) {

    let board = Array(16).fill(0);
    let score = 0;
    let gameOverShown = false;
    let touchStartX = 0;
    let touchStartY = 0;

    container.innerHTML = `

        <style>

            .game2048 {
                width: 100%;
                max-width: 360px;
                margin: 0 auto;
                padding: 8px 8px 18px;
                text-align: center;
            }

            .score2048 {
                font-size: 16px;
                font-weight: 800;
                margin-bottom: 10px;
            }

            .board2048 {
                width: 100%;
                max-width: 340px;
                aspect-ratio: 1;
                margin: 0 auto;

                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 5px;

                padding: 5px;

                background: #9b8a78;
                border-radius: 9px;

                box-sizing: border-box;
            }

            .tile2048 {
                width: 100%;
                height: 100%;

                min-width: 0;
                min-height: 0;

                display: flex;
                align-items: center;
                justify-content: center;

                border-radius: 6px;

                background: #b8a998;

                font-size: clamp(18px, 7vw, 30px);
                font-weight: 900;

                color: white;

                overflow: hidden;
            }

            .tile2 {
                background: #eee4da;
                color: #776e65;
            }

            .tile4 {
                background: #ede0c8;
                color: #776e65;
            }

            .tile8 {
                background: #f2b179;
            }

            .tile16 {
                background: #f59563;
            }

            .tile32 {
                background: #f67c5f;
            }

            .tile64 {
                background: #f65e3b;
            }

            .tile128 {
                background: #edcf72;
                font-size: clamp(16px, 6vw, 27px);
            }

            .tile256 {
                background: #edcc61;
                font-size: clamp(16px, 6vw, 27px);
            }

            .tile512 {
                background: #edc850;
                font-size: clamp(16px, 6vw, 27px);
            }

            .tile1024 {
                background: #edc53f;
                font-size: clamp(14px, 5vw, 24px);
            }

            .tile2048value {
                background: #edc22e;
                font-size: clamp(14px, 5vw, 23px);
            }


            .controls2048 {
                width: 156px;
                height: 106px;

                margin: 14px auto 0;

                display: grid;

                grid-template-columns:
                    repeat(3, 48px);

                grid-template-rows:
                    repeat(2, 48px);

                gap: 5px;

                justify-content: center;
            }

            .control2048 {

                width: 48px;
                height: 48px;

                padding: 0;

                border: 0;

                border-radius: 9px;

                background:
                    linear-gradient(
                        145deg,
                        #252b3a,
                        #171b25
                    );

                border: 1px solid
                    rgba(255,255,255,.1);

                color: white;

                font-size: 21px;

                font-weight: 900;

                display: flex;
                align-items: center;
                justify-content: center;

                cursor: pointer;

                touch-action: manipulation;

                user-select: none;

                -webkit-tap-highlight-color:
                    transparent;

                box-sizing: border-box;
            }

            .control2048:active {
                transform: scale(.92);
                background: #343c4f;
            }

            .up2048 {
                grid-column: 2;
                grid-row: 1;
            }

            .left2048 {
                grid-column: 1;
                grid-row: 2;
            }

            .down2048 {
                grid-column: 2;
                grid-row: 2;
            }

            .right2048 {
                grid-column: 3;
                grid-row: 2;
            }

            .help2048 {
                margin: 7px 0 0;

                color: #777;

                font-size: 10px;

                line-height: 15px;
            }


            @media (max-width: 380px) {

                .game2048 {
                    max-width: 310px;
                    padding-top: 4px;
                }

                .board2048 {
                    max-width: 290px;
                    gap: 4px;
                    padding: 4px;
                }

                .controls2048 {
                    width: 140px;
                    height: 94px;

                    grid-template-columns:
                        repeat(3, 43px);

                    grid-template-rows:
                        repeat(2, 43px);

                    gap: 4px;
                }

                .control2048 {
                    width: 43px;
                    height: 43px;
                    font-size: 19px;
                }

                .score2048 {
                    font-size: 15px;
                }

                .help2048 {
                    font-size: 9px;
                }
            }

        </style>


        <div class="game2048">

            <div class="score2048">
                Score:
                <span id="score2048">0</span>
            </div>


            <div
                class="board2048"
                id="board2048"
            ></div>


            <div class="controls2048">

                <button
                    type="button"
                    class="control2048 up2048"
                    data-direction="up"
                >
                    ↑
                </button>

                <button
                    type="button"
                    class="control2048 left2048"
                    data-direction="left"
                >
                    ←
                </button>

                <button
                    type="button"
                    class="control2048 down2048"
                    data-direction="down"
                >
                    ↓
                </button>

                <button
                    type="button"
                    class="control2048 right2048"
                    data-direction="right"
                >
                    →
                </button>

            </div>


            <p class="help2048">
                Tap arrows or swipe the board
            </p>

        </div>
    `;


    const boardElement =
        container.querySelector("#board2048");

    const scoreElement =
        container.querySelector("#score2048");


    function addTile() {

        const empty = [];

        for (let i = 0; i < board.length; i++) {

            if (board[i] === 0) {
                empty.push(i);
            }
        }

        if (!empty.length) return;

        const index =
            empty[
                Math.floor(
                    Math.random() * empty.length
                )
            ];

        board[index] =
            Math.random() < 0.9 ? 2 : 4;
    }


    function draw() {

        boardElement.innerHTML = "";

        board.forEach(value => {

            const tile =
                document.createElement("div");

            tile.className = "tile2048";

            if (value) {

                tile.textContent = value;

                if (value >= 2048) {

                    tile.classList.add(
                        "tile2048value"
                    );

                } else {

                    tile.classList.add(
                        "tile" + value
                    );
                }
            }

            boardElement.appendChild(tile);
        });

        scoreElement.textContent = score;
    }


    function move(direction) {

        if (gameOverShown) return;

        const old =
            JSON.stringify(board);


        if (direction === "left") {

            for (let row = 0; row < 4; row++) {

                let values =
                    board
                        .slice(row * 4, row * 4 + 4)
                        .filter(Boolean);

                values = merge(values);

                while (values.length < 4) {
                    values.push(0);
                }

                for (let i = 0; i < 4; i++) {

                    board[row * 4 + i] =
                        values[i];
                }
            }
        }


        if (direction === "right") {

            for (let row = 0; row < 4; row++) {

                let values =
                    board
                        .slice(row * 4, row * 4 + 4)
                        .filter(Boolean)
                        .reverse();

                values = merge(values);

                while (values.length < 4) {
                    values.push(0);
                }

                values.reverse();

                for (let i = 0; i < 4; i++) {

                    board[row * 4 + i] =
                        values[i];
                }
            }
        }


        if (
            direction === "up" ||
            direction === "down"
        ) {

            for (let col = 0; col < 4; col++) {

                let values = [];

                for (let row = 0; row < 4; row++) {

                    values.push(
                        board[row * 4 + col]
                    );
                }

                values =
                    values.filter(Boolean);

                if (direction === "down") {
                    values.reverse();
                }

                values = merge(values);

                while (values.length < 4) {
                    values.push(0);
                }

                if (direction === "down") {
                    values.reverse();
                }

                for (let row = 0; row < 4; row++) {

                    board[row * 4 + col] =
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

                gameOverShown = true;

                setTimeout(() => {

                    alert(
                        "Game Over! Score: " +
                        score
                    );

                }, 150);
            }
        }
    }


    function merge(values) {

        const result = [];

        for (
            let i = 0;
            i < values.length;
            i++
        ) {

            if (
                values[i] === values[i + 1]
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

        for (let i = 0; i < 16; i++) {

            if (
                i % 4 < 3 &&
                board[i] === board[i + 1]
            ) {
                return false;
            }

            if (
                i < 12 &&
                board[i] === board[i + 4]
            ) {
                return false;
            }
        }

        return true;
    }


    function handleKey(e) {

        const key =
            e.key.toLowerCase();

        let direction = null;

        if (
            key === "arrowleft" ||
            key === "a"
        ) {
            direction = "left";
        }

        if (
            key === "arrowright" ||
            key === "d"
        ) {
            direction = "right";
        }

        if (
            key === "arrowup" ||
            key === "w"
        ) {
            direction = "up";
        }

        if (
            key === "arrowdown" ||
            key === "s"
        ) {
            direction = "down";
        }

        if (direction) {

            e.preventDefault();

            move(direction);
        }
    }


    container.addEventListener(
        "keydown",
        handleKey
    );


    const controls =
        container.querySelectorAll(
            ".control2048"
        );


    controls.forEach(button => {

        button.addEventListener(
            "pointerdown",
            function(e) {

                e.preventDefault();

                move(
                    button.dataset.direction
                );
            }
        );
    });


    boardElement.addEventListener(
        "touchstart",
        function(e) {

            const touch =
                e.changedTouches[0];

            touchStartX =
                touch.clientX;

            touchStartY =
                touch.clientY;
        },
        { passive: true }
    );


    boardElement.addEventListener(
        "touchend",
        function(e) {

            const touch =
                e.changedTouches[0];

            const dx =
                touch.clientX -
                touchStartX;

            const dy =
                touch.clientY -
                touchStartY;

            const absX = Math.abs(dx);
            const absY = Math.abs(dy);

            if (
                Math.max(absX, absY) < 25
            ) {
                return;
            }

            if (absX > absY) {

                if (dx > 0) {
                    move("right");
                } else {
                    move("left");
                }

            } else {

                if (dy > 0) {
                    move("down");
                } else {
                    move("up");
                }
            }

        },
        { passive: true }
    );


    addTile();
    addTile();
    draw();
}