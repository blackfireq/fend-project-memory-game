const cardSymbols = [
	'fa-diamond',
	'fa-paper-plane-o',
	'fa-anchor',
	'fa-bolt',
	'fa-cube',
	'fa-bomb',
	'fa-leaf',
	'fa-bicycle'
];

const totalMatches = cardSymbols.length;
const totalCards = totalMatches * 2; // This must be set to an even number
let currentMatches = 0;
let numOfMoves = 0;
const moveCounter = document.querySelector('.moves');
/*
 * Create a list that holds all of your cards
 */

function createDeck() {
	let deck = [];
	let symbolPosition = 0;

	//build initial cards without symbols
	for (let i = 0; i < totalCards; i++) {
		
		//create card
		const card = document.createElement('li');
		card.setAttribute('class','card');
		
		// create card symbol
		const cardSymbol = document.createElement('i');
		card.appendChild(cardSymbol);
		deck.push(card);
	}

	// add symbols to cards
	let currentChild;
	deck.forEach(function(card){
		currentChild = card.firstElementChild;
		currentChild.setAttribute('class', 'fa ' + cardSymbols[symbolPosition] );
		symbolPosition++;

		if(symbolPosition === cardSymbols.length){
			symbolPosition = 0;
		}
	});

	//shuffle cards
	shuffle(deck);

	
	return deck;

};

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

function DisplayDeck(){
 	//get link to board
 	let board = document.querySelector('.deck');

 	//create deck
 	let deck = createDeck();
 	deck.forEach(function(card){
 		board.appendChild(card);
 	});
 }


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


//load game
DisplayDeck();

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

let openCards = [];
let currentCard;
document.querySelector('.deck').addEventListener('click', function(event){ 
 	//highlight card
 	setCurrentCard(event);

 	toggleCard(currentCard);

 	//add card to list
 	openCards.push(currentCard);
 	
 	// check if card is the second card, if so check if it matches to firstcard
 	if (openCards.length === 2) {
 		if(isMatch()){
 			matchCards();
 			currentMatches++;
 		} else {
 			for (var i = 0; i < openCards.length; i++) {
 				toggleCard(openCards[i]);
 			}
 		}

 		//update number of moves
 		updateNumOfMoves();

 		//reset cards


 		//clear card holder
 		openCards = [];
 	} 

 	//check if game is over
 	isGameOver();

 });

function toggleCard(card){
 	card.classList.toggle('open');
 	card.classList.toggle('show');
 
 }
 
function isMatch(){
	console.log(openCards[0].firstElementChild.classList[1] +' vs '+ openCards[1].firstElementChild.classList[1]);
	if ( openCards[0].firstElementChild.classList[1] === openCards[1].firstElementChild.classList[1]){
		console.log('its a match');
		return true;
	}
	return false;
}

function matchCards(){
	for (var i = 0; i < openCards.length; i++) {
		toggleCard(openCards[i]);
		openCards[i].classList.add('match');

	}
}

function updateNumOfMoves(){
	numOfMoves++;
 	moveCounter.textContent = numOfMoves;
}

function isGameOver(){
	if(currentMatches >= totalMatches){
 		console.log('Game is over!');
 		return true;
 	}
 	return false;
}

function setCurrentCard(event){

	if (event.target.nodeName === 'LI'){
 		console.log('parent');
 		currentCard = event.target;
 		
 	} else if (event.target.nodeName == 'I'){
 		console.log('child');
 		currentCard = event.target.parentElement;
 	
 	}
}