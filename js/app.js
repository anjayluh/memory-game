//list holding all cards
let card = document.getElementsByClassName("card");
let cards = [...card];

// declaring move variable to keep count of moves
let moves = 0;
let counter = document.querySelector(".moves");

// declaring variable of matchedCards
let matchedCard = document.getElementsByClassName("match");

// array for opened cards
let openedCards = [];

// declare variables for star icons
const stars = document.querySelectorAll(".fa-star");

// close icon in modal
let closeicon = document.querySelector(".close");

// declare modal
let modal = document.getElementById("popup1")

//Timer declarations
let second = 0,
    minute = 0,
    hour = 0;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
//TODO: Display cards
function displayCard() {
    this.classList.toggle('open');
    this.classList.toggle('show');
    this.classList.toggle('disabled');
}

for (let currentCard = 0; currentCard < cards.length; currentCard++) {
    //event to listen to click and display card function
    cards[currentCard].addEventListener('click', displayCard);
    cards[currentCard].addEventListener('click', compareCard);
    cards[currentCard].addEventListener("click", congratulations);
};


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// deck of all cards in game
let deck = document.querySelector(".deck");

function startGame() {
    let shuffledCards = shuffle(cards);
    for (let a = 0; a < shuffledCards.length; a++) {
        [].forEach.call(shuffledCards, function(item) {
            deck.appendChild(item);
        });
    }
    //reset moves
    moves = 0;
    counter.innerHTML = moves;
    for (var i = 0; i < stars.length; i++) {
        stars[i].style.color = "#FFD700";
        stars[i].style.visibility = "visible";
    }
    //reset timer
    second = 0;
    minute = 0;
    hour = 0;
    let timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(startTimer.interval);
}
window.onload = startGame();

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

//TODO: Compare a pair of opened cards to see if they are a match or not
function compareCard() {
    openedCards.push(this);
    var len = openedCards.length;
    if (len === 2) {
        let carda = openedCards[0].firstElementChild;
        let cardb = openedCards[1].firstElementChild;
        //Add on the count of moves for every selection of two cards
        moveCounter();
        //Comparison if the value of card one is the same as that of card2
        if (carda.classList.value === cardb.classList.value) {
            matchCards();
        } else {
            unmatchCards();
        }
    }
};

//TODO: Add two matching cards to the openedCards array and leave them open
function matchCards() {
    openedCards[0].classList.add("match");
    openedCards[1].classList.add("match");
    openedCards[0].classList.remove("show", "open");
    openedCards[1].classList.remove("show", "open");
    openedCards = [];
}
//TODO: Flip back a pair of cards that doesn't match
function unmatchCards() {
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    disable();
    setTimeout(function() {
        openedCards[0].classList.remove("show", "open", "unmatched");
        openedCards[1].classList.remove("show", "open", "unmatched");
        enable();
        openedCards = [];
    }, 1100);
}

//TODO: Disable cards temporarily to decide if they match or not
function disable() {
    Array.prototype.filter.call(cards, function(card) {
        card.classList.add('disabled');
    });
}

//TODO: Re-enable unmatched cards and disable matched cards
function enable() {
    Array.prototype.filter.call(cards, function(card) {
        card.classList.remove('disabled');
        for (var i = 0; i < matchedCard.length; i++) {
            matchedCard[i].classList.add("disabled");
        }
    });
}

//TODO: Increment move counter
function moveCounter() {
    moves++;
    counter.innerHTML = moves;

    //start timer on first click
    if (moves == 1) {
        second = 0;
        minute = 0;
        hour = 0;
        startTimer();
    }
    // setting rates based on moves
    if (moves > 8 && moves < 12) {
        for (i = 0; i < 3; i++) {
            if (i > 1) {
                stars[i].style.visibility = "collapse";
            }
        }
    } else if (moves > 13) {
        for (i = 0; i < 3; i++) {
            if (i > 0) {
                stars[i].style.visibility = "collapse";
            }
        }
    }
}

// TODO: Calculate and display the time taken to complete the game
let timer = document.querySelector(".timer");

function startTimer() {
    interval = setInterval(function() {
        timer.innerHTML = minute + "mins " + second + "secs";
        second++;
        if (second == 60) {
            minute++;
            second = 0;
        }
        if (minute == 60) {
            hour++;
            minute = 0;
        }
    }, 1000);
}

//TODO: Display a pop up congragulations message when all cards are turned and matched
function congratulations() {
    if (matchedCard.length == 16) {
        clearInterval(startTimer.interval);
        finalTime = timer.innerHTML;

        //TODO: Show congratulations modal
        modal.classList.add("show");

        // declare star rating variable
        var starRating = document.querySelector(".stars").innerHTML;

        //showing move, rating, time on modal
        document.getElementById("finalMove").innerHTML = moves;
        document.getElementById("starRating").innerHTML = starRating;
        document.getElementById("totalTime").innerHTML = finalTime;

        //closeicon on modal
        closeModal();
    };
}


//TODO: Close the congratulations modal
function closeModal() {
    closeicon.addEventListener("click", function(e) {
        modal.classList.remove("show");
        startGame();
    });
}