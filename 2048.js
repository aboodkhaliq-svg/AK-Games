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
