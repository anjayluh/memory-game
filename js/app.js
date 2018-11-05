/*
 * Create a list that holds all of your cards
 */
let card = document.getElementsByClassName("card");
let cards = [...card];

// declaring move variable
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

function displayCard() {
    this.classList.toggle('open');
    this.classList.toggle('show');
    this.classList.toggle('disabled');
}

for (let currentCard = 0; currentCard < cards.length; currentCard++) {
    //event to listen to click and display card function
    cards[currentCard].addEventListener('click', displayCard);
    cards[currentCard].addEventListener('click', compareCard);
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

//OpenedCards is an array that I add an opened pair of cards to and compare them.
function compareCard() {
    openedCards.push(this);
    var len = openedCards.length;
    if (len === 2) {
        let carda = openedCards[0].firstElementChild;
        let cardb = openedCards[1].firstElementChild;
        moveCounter();
        if (carda.classList.value === cardb.classList.value) {
            matchCards();
        } else {
            unmatchCards();
        }
    }
};

//for when cards match
function matchCards() {
    openedCards[0].classList.add("match");
    openedCards[1].classList.add("match");
    openedCards[0].classList.remove("show", "open");
    openedCards[1].classList.remove("show", "open");
    openedCards = [];
}
//for when cards don't match
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

//disable cards temporarily
function disable() {
    Array.prototype.filter.call(cards, function(card) {
        card.classList.add('disabled');
    });
}

//enable cards and disable matched cards
function enable() {
    Array.prototype.filter.call(cards, function(card) {
        card.classList.remove('disabled');
        for (var i = 0; i < matchedCard.length; i++) {
            matchedCard[i].classList.add("disabled");
        }
    });
}

//Increment move counter
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

// Time taken to complete the game

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

//pop up a congragulations message when all cards are turned and matched
function congratulations() {
    if (matchedCard.length == 16) {
        clearInterval(startTimer.interval);
        finalTime = timer.innerHTML;

        // show congratulations modal
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


// Close the congratulations modal
function closeModal() {
    closeicon.addEventListener("click", function(e) {
        modal.classList.remove("show");
        startGame();
    });
}

// loop to add event listeners to each card
for (var i = 0; i < cards.length; i++) {
    card = cards[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click", compareCard);
    card.addEventListener("click", congratulations);
};