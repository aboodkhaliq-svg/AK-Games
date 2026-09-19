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
