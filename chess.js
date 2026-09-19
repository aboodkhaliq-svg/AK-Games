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
