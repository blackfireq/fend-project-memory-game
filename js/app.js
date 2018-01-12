const totalMatches = 8;
const totalCards = totalMatches * 2; // This must be set to an even number
let currentMatches = 0;
let numOfMoves = 0;
let currentStars = 3;
const moveCounter = document.querySelector('.moves');
let openCards = [];
let guard = document.querySelector('.guard-screen');

/*
 * Create a list that holds all of your cards
 */

function createDeck() {
	let deck = [];

	//build initial cards without symbols
	for (let i = 0; i < totalCards; i++) {

		//create card
		const card = document.createElement('li');
		card.setAttribute('class','card');
		card.setAttribute('id','card' + i);

		// create card symbol
		const cardSymbol = document.createElement('i');
		card.appendChild(cardSymbol);
		deck.push(card);
	}

	//add symbols to cards
	setSymbols(deck);

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

function displayDeck(){
 	//get link to board
 	let board = document.querySelector('.deck');

 	//create deck
 	let deck = createDeck();
 	deck.forEach(function(card){
 		board.appendChild(card);
 	});
 }

//Shuffle function from http://stackoverflow.com/a/2450976
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
displayDeck();

//start clock
let startTime = performance.now()

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

//checks which element is click if child set card to parent
function setCurrentCard(event){

 	if (event.target.nodeName === 'LI'){
  		return event.target;

  	} else if (event.target.nodeName == 'I'){
  		return event.target.parentElement;

  	}
 }

//adds the card clicked to the card array
function addCardToList(card){
 	 openCards.push(card);
  }

//used to set the symbols on the cards
function setSymbols(cards){
		//list of current symbols
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

		let symbolPosition = 0;
		let currentChild;

		//loop through cars and assign symbols
		cards.forEach(function(card){
			currentChild = card.firstElementChild;
			currentChild.setAttribute('class', 'fa ' + cardSymbols[symbolPosition] );
			symbolPosition++;

			if(symbolPosition === cardSymbols.length){
				symbolPosition = 0;
			}
		});
		return cards;
	}

//used to flip the card
function toggleCard(card){
		card.classList.toggle('flip-card');
	 	card.classList.toggle('open');
	 	card.classList.toggle('show');

	 }

//used to update the star rating
function updateStarRating(){
	const stars = document.querySelectorAll('.stars i');

	switch (numOfMoves){

		case 12 :
				stars[2].className = 'fa fa-star-o';
				currentStars--;
				break;
		case 18 :
				stars[1].className = 'fa fa-star-o';
				currentStars--;
				break;
	}
}

//used to update the number of moves tracked
function updateNumOfMoves(num){
	num !== 0 ? numOfMoves += num : numOfMoves = num ;
 	moveCounter.textContent = numOfMoves;
}

//checks if the two cards match and are not the same card
function isMatch(){
	if (openCards[0].firstElementChild.classList[1] === openCards[1].firstElementChild.classList[1] &&
			openCards[0].id !== openCards[1].id){
		return true;
	}
	return false;
}

//used when the cards match
function correctMatch(){
	for (let i = 0; i < openCards.length; i++) {
		openCards[i].classList.remove('open');
		openCards[i].classList.add('match');

	}
	currentMatches++;
}

//used when the cards don't match
function incorrectMatch(){
	for (let i = 0; i < openCards.length; i++) {
		toggleCard(openCards[i]);
	}
}

//checks if all cards have been matched
function isGameOver(){
	if(currentMatches === totalMatches){
 		return true;
 	} else {
 	}
 	return false;
}

//resets the game
function resetGame(){
	//clear deck of cards
	const deck = document.querySelector('.deck');
	for (var i = 0; i < totalCards; i++) {
		deck.firstElementChild.remove();
	}

	//reset clock
	startTime = performance.now()

	//reset moves
	updateNumOfMoves(0);

	//reset stars
	const stars = document.querySelectorAll('.stars i');
	for (var i = 0; i < stars.length; i++) {
		stars[i].className = 'fa fa-star';
	}

	//reset current current matches
	currentMatches = 0;

	//setup deck
	displayDeck();
}

//gathers the info and diplays the results of the game.
function endGame(){

	//calculate time elapse during game
	const totalTime = ((performance.now() - startTime) / 1000).toFixed(1);

	// get a link to elements
	const endGameScreen = document.querySelector('.end-game-screen');
	const endGameReplay = document.querySelector('.play-again');
	const endGameMoves = document.querySelector('.moves-results');
	const endGameStars = document.querySelector('.stars-results');
	const endGameTime = document.querySelector('.end-game-time');

	//set Moves
	endGameMoves.textContent = numOfMoves;
	//set Stars
	endGameStars.textContent = currentStars;
	//show end game screen
	endGameScreen.classList.toggle('end-game-show');
	//set time of game
	endGameTime.textContent = totalTime;

}

//selects the card and checks for a match
document.querySelector('.deck').addEventListener('click', function(event){
	//check if the element clicked is one of the cards
	if(event.target.nodeName === 'LI' || event.target.nodeName === 'I'){
		//check if is not a matched card
		if(!event.target.classList.contains('show')){
			//add card to list
		 	let currentCard = setCurrentCard(event);
		 	addCardToList(currentCard);

			//reveal card
		 	toggleCard(currentCard);

		 	// check if card it's the second card, if so check if it matches to firstcard
		 	if (openCards.length === 2) {
					guard.classList.add('show-guard');

					//check if its a match
					setTimeout(function (){
					isMatch() ? correctMatch() : incorrectMatch() ;

					//update number of moves
			 		updateNumOfMoves(1);
					updateStarRating();

					//check if game is won
					if (isGameOver()){ endGame();}
			 		//clear card holder

					openCards = [];
				}, 600);

				setTimeout(function(){guard.classList.remove('show-guard');},600);
		 	}
		}
	}
 });

//used to restart the game
document.querySelector('.restart').addEventListener('click', function(event){
	resetGame();
});

//used to restart the game
document.querySelector('.play-again').addEventListener('click', function(){
	const endGameScreen = document.querySelector('.end-game-screen');
	endGameScreen.classList.toggle('end-game-show');
	resetGame();
})
