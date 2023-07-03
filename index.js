const newDeckBtn = document.getElementById("new-deck-btn");
const newCardsBtn = document.getElementById("new-cards-btn");
const cardsSlot = document.getElementById("cards-slot");
const header = document.getElementById("header");
const cardsToPlay = document.getElementById("cards-to-play");
const computerScoreEl = document.getElementById("computer-score");
const myScoreEl = document.getElementById("my-score");

let deckId;
let myScore=0;
let computerScore=0;

newCardsBtn.disabled = true;

async function getNewDeckOfCards() {
    const response = await fetch("https://www.deckofcardsapi.com/api/deck/new/")
    data = await response.json()
    deckId=data.deck_id;
    cardsToPlay.textContent= `Remaining cards: ${data.remaining}`;
    newCardsBtn.disabled = false;
}

function getNewCards() {
    fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
        .then(resp => resp.json())
        .then(data => {
            cardsToPlay.textContent= `Remaining cards: ${data.remaining}`;

            cardsSlot.children[0].innerHTML=`
                <img src="${data.cards[0].image}" class="card">`;

            cardsSlot.children[1].innerHTML=`
                <img src="${data.cards[1].image}" class="card">`;
            header.textContent= getWinner(data.cards[0], data.cards[1]);

            if(data.remaining===0) {
                newCardsBtn.disabled = true;
                if(computerScore>myScore) {
                    header.textContent="The computer won the game!";
                } else if(myScore>computerScore) {
                    header.textContent="You won the game!";
                } else {
                    header.textContent="It's a tie game!";
                }
            };
        });
        
}

function getWinner(card1, card2) {
    const valueOptions =["2", "3", "4", "5", "6", "7", "8", "9", 
    "10", "JACK", "QUEEN", "KING", "ACE"];
    const card1Value = valueOptions.indexOf(card1.value);
    const card2Value = valueOptions.indexOf(card2.value)

    if(card1Value > card2Value) {
        computerScore++;
        computerScoreEl.textContent=`Computer score: ${computerScore}`;
        return "Computer wins";
    } else if (card1Value < card2Value) {
        myScore++;
        myScoreEl.textContent=`Your score: ${myScore}`;
        return "You win";
    } else {
        return "War!";
    }
};

newDeckBtn.addEventListener("click", getNewDeckOfCards);
newCardsBtn.addEventListener("click", getNewCards);

