/*TODO: start game*/
document.querySelector(".overlay span").onclick = function () {
    document.querySelector(".overlay").style.display = "none";
    document.querySelector(".start").style.display = "block"; 
}
document.querySelector(".start #submit").onclick = function () {
    document.querySelector(".start").style.display = "none";
    let playerName = document.getElementById("name").value;
    if (playerName == null || playerName == "") {
        document.querySelector(".name span").innerHTML = "Player";
    } else {
        document.querySelector(".name span").innerHTML = playerName;
    }
    cards.forEach(card => {
        card.classList.add("is-flipped");
        setTimeout(() => {
            card.classList.remove("is-flipped");
            playtimer();
        }, 3000)
    });
}

/*TODO: shuffle cards*/

let duration = 1000,
    cardContainer = document.querySelector(".game-block"),
    cards = Array.from(cardContainer.children),
    orderRange = [...Array(cards.length).keys()]; //extract indexs of empty array in orderRange [0...19]

shuffle(orderRange); //return shuffle array

cards.forEach((card, index) => {

    card.style.order = orderRange[index];
    card.addEventListener("click", function () {
        flipCard(card);
    });
    
    
});
/*TODO: flipCard function*/
function flipCard(selectedCard) {

    selectedCard.classList.add("is-flipped");

    let allFlippedCards = cards.filter(flippedCard => flippedCard.classList.contains("is-flipped"));
    if (allFlippedCards.length === 2) {
        //check matched cards
        checkMatchedCards(allFlippedCards[0], allFlippedCards[1]);

    }

}
/*TODO: check matched cards */
function checkMatchedCards(firstElem, secondElem) {
    let wrongTries = document.querySelector(".tries span");
    if (firstElem.dataset.animals === secondElem.dataset.animals) {
        firstElem.classList.remove("is-flipped");
        secondElem.classList.remove("is-flipped");
        firstElem.classList.add("has-matched");
        secondElem.classList.add("has-matched");

        let allMatchedCards = cards.filter(matchedCard => matchedCard.classList.contains("has-matched"));
        if (allMatchedCards.length === cards.length) {
            setTimeout(() => {
                document.getElementById("complete").play();
                document.querySelector(".win").style.display = "block";
                timer.remove();
            }, duration)
        }

        document.getElementById("success").play();
    } else {
        wrongTries.innerHTML = parseInt(wrongTries.innerHTML) + 1;
        //stop clicking function
        stopClicking();
        document.getElementById("fail").play();
        setTimeout(() => {
            firstElem.classList.remove("is-flipped");
            secondElem.classList.remove("is-flipped");
        }, duration)
    }
}
/*TODO: stop clicking function*/
function stopClicking() {
    cardContainer.classList.add("no-clicking");

    setTimeout(() => {
        cardContainer.classList.remove("no-clicking");
    }, duration)
}
/*TODO: shuffle function*/
function shuffle(array) {

    let current = array.length,
        temp,
        random;

    while (current > 0) {
        random = Math.floor(Math.random() * current);
        current--;
        temp = array[current];
        array[current] = array[random];
        array[random] = temp;
    }

    return array;
}

/*timer count down*/
timer = document.getElementById("timer-display");
function playtimer(cancel) {
        let myMinutes = 3,
            mySeconds = 0,
            secondsCount = (myMinutes * 60) + (mySeconds * 1);
        let countDown = setInterval(function () {

            let minutes = Math.floor(secondsCount / 60),
                remSeconds = secondsCount % 60;

            if (remSeconds < 10) {
                remSeconds = '0' + remSeconds;
            }

            timer.innerHTML = minutes + ':' + remSeconds;

            if (secondsCount > 0) {
                secondsCount--;
            } else {
                document.getElementById("timeout").play();
                cardContainer.classList.add("no-clicking");
                document.querySelector(".restart").style.display = "block";
                clearInterval(countDown);
            }
        }, 1000);
};
let restartbtn = document.querySelectorAll(".restartbtn");
restartbtn.forEach(btn => {
    btn.onclick = function () {
        location.reload();
    }
});


