function Side(mine_enemys,playground){//una side ha un deck, una mano,un punteggio, un campo. 
									  //viene aggiunta come nodo figlio di playground 

	if(playground.childNodes.length > 2)
		return;

	this.sideNode = document.createElement('div');

	if(mine_enemys == 'mySide' || mine_enemys == 'enemySide')
		this.sideNode.setAttribute('id',mine_enemys);
	else return;

	playground.appendChild(this.sideNode);


	this.deck = new deck();
	this.hand = new Hand(this.deck.deck);
	this.field = new Field();
	this.score = new Score();


}