
function Hand(deck)
{
	this.handArray = new Array();
	for(var i=0 ; i<10 ; i++){
		var j = Math.floor(Math.random()*(deck.length -1)); //pesco una carta a caso
		this.handArray[i] = new Card(deck[j]);
		deck.splice(j,1); //elimino la carta dal deck
		
	}
}