function deck(){

	this.deck = [1,1,1,2,2,2,3,3,3,4,4,4,5,5,5,6,6,6,7,7,7,
	'bolt','bolt','bolt','blast','force','mirror','mirror','mirror'];
}

deck.prototype.randomCard = function()
{
	var r = Math.floor(Math.random() * (this.deck.length));
	var drawnCard = new Card(this.deck[r]);
	this.deck.splice(r,1);
	return drawnCard;
}