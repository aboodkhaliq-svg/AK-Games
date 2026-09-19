(function () {

    window.createChess = function (container) {

        if (!container) {
            container = document.getElementById("gameContainer");
        }

        if (!container) return;

        container.innerHTML = `
            <div style="
                width:470px;
                max-width:88%;
                margin:auto;
                text-align:center;
            ">

                <div style="
                    display:flex;
                    align-items:center;
                    justify-content:space-between;
                    width:min(420px,100%);
                    margin:0 auto 10px;
                    padding:8px 12px;
                    background:#151923;
                    border:1px solid rgba(255,255,255,.08);
                    border-radius:9px;
                    color:white;
                    font-size:13px;
                ">

                    <strong>♟ CHESS</strong>

                    <span id="chessStatus">
                        White's turn
                    </span>

                </div>

                <div
                    id="chessBoard"
                    style="
                        width:min(420px,100%);
                        aspect-ratio:1;
                        margin:auto;
                        display:grid;
                        grid-template-columns:repeat(8,1fr);
                        grid-template-rows:repeat(8,1fr);
                        border:3px solid #171a22;
                        border-radius:8px;
                        overflow:hidden;
                        box-shadow:0 12px 30px rgba(0,0,0,.35);
                    "
                ></div>

                <div style="
                    margin-top:8px;
                    color:#858b98;
                    font-size:10px;
                ">
                    Select a piece to see possible moves
                </div>

            </div>
        `;

        const board =
            document.getElementById("chessBoard");

        const status =
            document.getElementById("chessStatus");

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

        let turn = "white";


        function isWhite(piece) {

            return "♙♖♘♗♕♔".includes(piece);
        }


        function isBlack(piece) {

            return "♟♜♞♝♛♚".includes(piece);
        }


        function sameColor(a,b) {

            if (!a || !b) return false;

            return (
                (isWhite(a) && isWhite(b)) ||
                (isBlack(a) && isBlack(b))
            );
        }


        function inside(r,c) {

            return (
                r >= 0 &&
                r < 8 &&
                c >= 0 &&
                c < 8
            );
        }


        function pathClear(r1,c1,r2,c2) {

            const dr =
                Math.sign(r2-r1);

            const dc =
                Math.sign(c2-c1);

            let r = r1 + dr;
            let c = c1 + dc;

            while (
                r !== r2 ||
                c !== c2
            ) {

                if (pieces[r][c]) {
                    return false;
                }

                r += dr;
                c += dc;
            }

            return true;
        }


        function validMove(r1,c1,r2,c2) {

            if (!inside(r2,c2)) {
                return false;
            }

            const piece =
                pieces[r1][c1];

            const target =
                pieces[r2][c2];

            if (!piece) {
                return false;
            }

            if (sameColor(piece,target)) {
                return false;
            }

            const dr = r2-r1;
            const dc = c2-c1;

            const absR = Math.abs(dr);
            const absC = Math.abs(dc);


            if (piece === "♙") {

                if (
                    dc === 0 &&
                    dr === -1 &&
                    !target
                ) {
                    return true;
                }

                if (
                    dc === 0 &&
                    dr === -2 &&
                    r1 === 6 &&
                    !target &&
                    !pieces[5][c1]
                ) {
                    return true;
                }

                if (
                    absC === 1 &&
                    dr === -1 &&
                    target &&
                    isBlack(target)
                ) {
                    return true;
                }

                return false;
            }


            if (piece === "♟") {

                if (
                    dc === 0 &&
                    dr === 1 &&
                    !target
                ) {
                    return true;
                }

                if (
                    dc === 0 &&
                    dr === 2 &&
                    r1 === 1 &&
                    !target &&
                    !pieces[2][c1]
                ) {
                    return true;
                }

                if (
                    absC === 1 &&
                    dr === 1 &&
                    target &&
                    isWhite(target)
                ) {
                    return true;
                }

                return false;
            }


            if (
                piece === "♘" ||
                piece === "♞"
            ) {

                return (
                    (absR === 2 && absC === 1) ||
                    (absR === 1 && absC === 2)
                );
            }


            if (
                piece === "♗" ||
                piece === "♝"
            ) {

                return (
                    absR === absC &&
                    pathClear(
                        r1,c1,r2,c2
                    )
                );
            }


            if (
                piece === "♖" ||
                piece === "♜"
            ) {

                return (
                    (
                        dr === 0 ||
                        dc === 0
                    ) &&
                    pathClear(
                        r1,c1,r2,c2
                    )
                );
            }


            if (
                piece === "♕" ||
                piece === "♛"
            ) {

                return (
                    (
                        dr === 0 ||
                        dc === 0 ||
                        absR === absC
                    ) &&
                    pathClear(
                        r1,c1,r2,c2
                    )
                );
            }


            if (
                piece === "♔" ||
                piece === "♚"
            ) {

                return (
                    absR <= 1 &&
                    absC <= 1 &&
                    (absR + absC > 0)
                );
            }


            return false;
        }


        function canMoveTo(r,c) {

            if (!selected) {
                return false;
            }

            return validMove(
                selected.r,
                selected.c,
                r,
                c
            );
        }


        function draw() {

            board.innerHTML = "";

            for (
                let r = 0;
                r < 8;
                r++
            ) {

                for (
                    let c = 0;
                    c < 8;
                    c++
                ) {

                    const square =
                        document.createElement("div");

                    const light =
                        (r+c) % 2 === 0;

                    square.style.cssText = `
                        position:relative;
                        display:flex;
                        align-items:center;
                        justify-content:center;
                        width:100%;
                        height:100%;
                        cursor:pointer;
                        user-select:none;
                        background:${light
                            ? "#e8edf3"
                            : "#596575"};
                        transition:.12s;
                    `;


                    if (
                        selected &&
                        selected.r === r &&
                        selected.c === c
                    ) {

                        square.style.background =
                            "#d9b44a";
                    }


                    if (
                        selected &&
                        canMoveTo(r,c)
                    ) {

                        if (pieces[r][c]) {

                            square.style.boxShadow =
                                "inset 0 0 0 4px #ef5350";

                        } else {

                            const dot =
                                document.createElement("div");

                            dot.style.cssText = `
                                width:22%;
                                aspect-ratio:1;
                                border-radius:50%;
                                background:rgba(35,45,55,.48);
                                position:absolute;
                            `;

                            square.appendChild(dot);
                        }
                    }


                    const piece =
                        pieces[r][c];


                    if (piece) {

                        const pieceElement =
                            document.createElement("span");

                        pieceElement.textContent =
                            piece;


                        if (isWhite(piece)) {

                            pieceElement.style.cssText = `
                                font-family:"Segoe UI Symbol",
                                "Noto Sans Symbols 2",
                                Arial,sans-serif;
                                font-size:clamp(22px,4vw,38px);
                                line-height:1;
                                cursor:pointer;
                                user-select:none;
                                color:#ffffff;
                                text-shadow:
                                0 1px 1px #222,
                                0 2px 3px rgba(0,0,0,.7);
                            `;

                        } else {

                            pieceElement.style.cssText = `
                                font-family:"Segoe UI Symbol",
                                "Noto Sans Symbols 2",
                                Arial,sans-serif;
                                font-size:clamp(22px,4vw,38px);
                                line-height:1;
                                cursor:pointer;
                                user-select:none;
                                color:#151515;
                                text-shadow:
                                0 1px 1px rgba(255,255,255,.35),
                                0 2px 3px rgba(0,0,0,.65);
                            `;
                        }


                        square.appendChild(
                            pieceElement
                        );
                    }


                    square.onclick =
                        function () {

                            clickSquare(r,c);
                        };


                    board.appendChild(square);
                }
            }
        }


        function clickSquare(r,c) {

            const piece =
                pieces[r][c];


            if (!selected) {

                if (!piece) {
                    return;
                }


                if (
                    turn === "white" &&
                    !isWhite(piece)
                ) {
                    return;
                }


                if (
                    turn === "black" &&
                    !isBlack(piece)
                ) {
                    return;
                }


                selected = {
                    r:r,
                    c:c
                };

                draw();

                return;
            }


            if (
                selected.r === r &&
                selected.c === c
            ) {

                selected = null;

                draw();

                return;
            }


            const selectedPiece =
                pieces[selected.r][selected.c];


            if (
                sameColor(
                    selectedPiece,
                    piece
                )
            ) {

                if (
                    (
                        turn === "white" &&
                        isWhite(piece)
                    ) ||
                    (
                        turn === "black" &&
                        isBlack(piece)
                    )
                ) {

                    selected = {
                        r:r,
                        c:c
                    };

                    draw();
                }

                return;
            }


            if (
                !validMove(
                    selected.r,
                    selected.c,
                    r,
                    c
                )
            ) {

                return;
            }


            const captured =
                pieces[r][c];


            pieces[r][c] =
                pieces[selected.r][selected.c];

            pieces[selected.r][selected.c] =
                "";


            selected = null;


            if (
                captured === "♔" ||
                captured === "♚"
            ) {

                status.textContent =
                    turn === "white"
                        ? "White wins!"
                        : "Black wins!";

                draw();

                return;
            }


            turn =
                turn === "white"
                    ? "black"
                    : "white";


            status.textContent =
                turn === "white"
                    ? "White's turn"
                    : "Black's turn";


            draw();
        }


        draw();

    };

})();