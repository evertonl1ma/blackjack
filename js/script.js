(function() {
	var cards= ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];
	var suits= ["clubs", "hearts", "spades", "diamonds"];
	var cardsList= document.querySelector("#cards-list");
	var btnStart= document.querySelector("#get-card");
	var btnStand= document.querySelector("#stand");
	var message= document.querySelector("#message");
	var playAgain= document.querySelector("#play-again");

	function makeDeck(cards, suits) {
		var deck= [];
		cards.forEach(function(elem, index) {
			for(var i= 0; i < suits.length; i++) {
				var card= {};
				card.name= elem + "of" + suits[i];
				if(index > 9) {
					card.value= 10;
				} else {
					card.value= index + 1;
				}
				deck.push(card);
			}
		});
		return deck;
		console.log(deck);
	}

	function Player(score) {
		this.myCards= [];
		this.score= 0;
	}

	Player.prototype.getCard = function(cards, number) {
		var self = this;

		for(var i=0; i<number; i++) {
			var cardIndex = Math.floor(Math.random()*cards.length);
			self.myCards.push(cards.splice(cardIndex, 1)[0]);
		}
	};

	Player.prototype.getScore = function() {
		var self = this;

		self.score = 0;
		self.myCards.forEach(function(elem) {
			self.score += elem.value;
		});
	};

	Player.prototype.printCard = function() {
		var self = this;
		var cardHolder, cardTopValue, cardBottomValue, cardSuit;
		cardsList.innerHTML = '';

		self.myCards.forEach(function(elem, index) {
			var card = elem.name.charAt(0);
			if (card === '1') {
				card = '10';
			}

			cardHolder = document.createElement('div');
			cardHolder.classList.add('card');

			cardTopValue = document.createElement('span');
			cardTopValue.classList.add('card__top-value');
			cardTopValue.innerHTML = card;

			cardBottomValue = document.createElement('span');
			cardBottomValue.classList.add('card__bottom-value');
			cardBottomValue.innerHTML = card;

			cardSuit = document.createElement('span');
			cardSuit.classList.add('card__suit');

			if (elem.name.includes('clubs')) {
				cardSuit.innerHTML = '&clubs;';
				cardHolder.style.color = 'black';
			} else if (elem.name.includes('hearts')) {
				cardSuit.innerHTML = '&hearts;';
				cardHolder.style.color = 'red';
			} else if (elem.name.includes('spades')) {
				cardSuit.innerHTML = '&spades;';
				cardHolder.style.color = 'black';
			} else {
				cardSuit.innerHTML = '&diams;';
				cardHolder.style.color = 'red';
			}

			cardHolder.appendChild(cardTopValue);
			cardHolder.appendChild(cardSuit);
			cardHolder.appendChild(cardBottomValue);

			cardsList.appendChild(cardHolder);
		});
	};

	Player.prototype.checkStatus = function() {
		var self = this;
		console.log(self);

		playAgain.addEventListener('click', function() {
			self.myCards = [];
			self.score = 0;
			cardsList.innerHTML = '';
			message.innerHTML = '';
			btnStart.removeAttribute('disabled');
			btnStand.removeAttribute('disabled');
			btnStart.style.opacity = 1;
			btnStand.style.opacity = 1;
		});

		if (self.score === 21) {
			message.innerHTML = 'Hey, you are quite lucky!!!';
			btnStart.setAttribute('disabled', 'disabled');
			btnStart.style.opacity = 0.4;
			btnStand.setAttribute('disabled', 'disabled');
			btnStand.style.opacity = 0.4;
			message.style.display = 'block';
		} else if (self.score > 21) {
			message.innerHTML = 'Sorry, but you lose...';
			btnStart.setAttribute('disabled', 'disabled');
			btnStart.style.opacity = 0.4;
			btnStand.setAttribute('disabled', 'disabled');
			btnStand.style.opacity = 0.4;
			message.style.display = 'block';
		}
	};

	Player.prototype.stand = function() {
		var self = this;

		message.innerHTML = 'Okay, I get it... Your score is ' + self.score;
		message.style.display = 'block';
		btnStart.setAttribute('disabled', 'disabled');
		btnStart.style.opacity = 0.4;
		btnStand.style.opacity = 0.4;
	};
	// Create Deck and Player...
	var deck = makeDeck(cards, suits);
	var user = new Player();

	btnStart.addEventListener('click', function() {
		user.getCard(deck, 1);
		user.printCard();
		user.getScore();
		user.checkStatus();
	});

	btnStand.addEventListener('click', function() {
		user.stand();
	});

})();