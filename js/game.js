
var game = null;
var mySide = 'mySide';
var enemySide = 'enemySide';


function begin()
{
	game = new Game(document.getElementById('wrapper'));
}

function Game(wrapper)
{	
	//reference to eventListener functions
	this.mouseOverFunction = this.overCardHand.bind(this);
	this.mouseLeaveFunction = this.leaveOverHand.bind(this);
	this.mouseClickFunction = this.useCard.bind(this);
	this.mouseClickEnemyHand = this.useEnemyCard.bind(this);


	//creating objects
	var playground1 = wrapper.firstElementChild;
	this.createSounds();
	this.gameTheme = document.getElementById('gameTheme');

	this.playground = new Playground(playground1);
	this.enemySide = new Side(enemySide,playground1);
	this.mySide = new Side(mySide,playground1);
	this.gameLogic = new gameLogic();
	this.sketcher = new sketcher(this.enemySide,this.mySide,this.gameLogic);	

	
	this.ai = new AI();
	//the real game starts here
	this.start();


	setTimeout(this.addListenerHoverHand.bind(this),5000);
	//setTimeout(this.addListenerEnemey.bind(this),5000);


	var id = setInterval(mainLoop.bind(this),2000);

	function mainLoop()
	{	
//		console.log('fields')
//		console.log("myField");
//		console.log(this.mySide.field.fieldArray);
//		console.log("enemyField");
//		console.log(this.enemySide.field.fieldArray );

//		console.log('hands');
//		console.log("myHand");
//		console.log(this.mySide.hand.handArray);
//		console.log("enemyHand");
//		console.log(this.enemySide.hand.handArray);
//		console.log(this.gameLogic.animation);
		this.gameLogic.checkDraw(this.mySide.score.score,this.enemySide.score.score); //controlla se draw
		this.gameLogic.outOfCards(this.mySide.hand.handArray,this.enemySide.hand.handArray);//controlla se sono finite le carte
		this.gameLogic.noMoreValueCards(this.mySide.hand.handArray,this.enemySide.hand.handArray);
		this.gameLogic.chooseFirst(this.mySide.score.score,this.enemySide.score.score);//sceglie il turnOrder
		if(this.gameLogic.draw == true && this.gameLogic.animation == false && this.gameLogic.effectAnimation == false)
			{ 
				this.restart(); //carte uguali, redraw
			}
		
//		console.log(this.ai.indexArray);
		this.useEnemyCard();
		if(this.gameLogic.gameOver == true)
		{
			clearInterval(id);
			/*
			this.gameLogic.winner(this.gameLogic.myTurn,
								  this.mySide.hand.handArray,
								  this.enemySide.hand.handArray,
								  this.mySide.score.sore,
								  this.enemySide.score.score); //decreta il vincitore
			*/
			console.log(this.gameLogic.iWin + ' vincitore');
			this.sketcher.uncoverArray(this.sketcher.enemyHand);
			this.sketcher.drawWinner(this.gameLogic.iWin,this.gameLogic);
			this.gameTheme.pause();
			if(this.gameLogic.iWin == true)
			{
				this.victoryTheme.play();
			}
			else
			{
				this.defeatTheme.play();
			}
//			console.log(this.gameLogic.iWin);
			winner(this.gameLogic.iWin);
//			console.log(this.gameLogic.iWin);
			var btn = document.createElement("button");
			playground.appendChild(btn);
			btn.setAttribute("value","refresh");
			btn.innerHTML = "refresh!";
			btn.setAttribute("id","button");
			btn.onclick = function()
			{
      		 window.location.reload("Refresh");
			}

		}
	}

}

Game.prototype.createSounds = function()
{
	this.effectBlast = new Sound('./audio/effetti/BlastSound.mp3');
	this.effectBolt = new Sound('./audio/effetti/BoltSound.mp3');
	this.effectMirror = new Sound('./audio/effetti/MirrorSound.mp3');
	this.effectForce = new Sound('./audio/effetti/ForceSound.mp3');
	this.victoryTheme = new Sound('./audio/ost/VictoryTheme.mp3');
	this.defeatTheme = new Sound('./audio/ost/DefeatTheme.mp3');
}

Game.prototype.start = function()//prime carte - decidono il turn order
{
	this.gameLogic.animation = true;

	var myCard = this.mySide.deck.randomCard();
	var enemyCard = this.enemySide.deck.randomCard();

   		this.sketcher.fromDeckToField(this.mySide,myCard);
		this.sketcher.fromDeckToField(this.enemySide,enemyCard);

		this.mySide.field.fieldArray.push(myCard);
		this.enemySide.field.fieldArray.push(enemyCard);

		this.mySide.score.score = 0;
		this.enemySide.score.score = 0;

		this.mySide.score.startingScore(this.mySide);
		this.enemySide.score.startingScore(this.enemySide);

		this.drawScore();

//		this.gameLogic.checkDraw(this.mySide.score.score,this.enemySide.score.score);
//		var that = this;



//		this.gameLogic.animation = false;
//		setTimeout(this.setAnimation.bind(this),4000);




		/*
		(function(that){
			setTimeout(function()
			{
			that.gameLogic.animation = false;
			}
			,3000)
		}(this));
		*/
		this.gameLogic.chooseFirst(this.mySide.score, this.enemySide.score);
//		this.gameLogic.animation = false;
}

Game.prototype.setAnimation = function()
{
	this.gameLogic.animation = false;
}

Game.prototype.restart = function()
{
//	if(this.gameLogic.animaion == true)
//		return;
	this.gameLogic.animation = true;
	this.clearField();
	setTimeout(this.start.bind(this),1000);
}


Game.prototype.drawScore = function()
{
	this.sketcher.drawUpdatedScore(this.enemySide,this.enemySide.score.score);
	this.sketcher.drawUpdatedScore(this.mySide,this.mySide.score.score);
//	console.log(this.mySide.score.score)
}






Game.prototype.clearField = function()
{	

	this.sketcher.clearFieldAnimation(this.mySide,this.gameLogic);
	this.sketcher.clearFieldAnimation(this.enemySide,this.gameLogic);

	setTimeout(deleteField.bind(this),1000);
	function deleteField()
	{
		var myFieldNode = this.sketcher.myField;
		var enemyFieldNode = this.sketcher.enemyField;

		this.deleteSideField(this.mySide,myFieldNode);
		this.deleteSideField(this.enemySide, enemyFieldNode);

		this.mySide.score.score = 0;
		this.enemySide.score.score = 0;
		this.drawScore();
	}

}

Game.prototype.deleteSideField = function(side,fieldNode)
{

	while(fieldNode.firstChild)
	{
		fieldNode.removeChild(fieldNode.lastChild);
	}
	//deletes the array
	side.field.deleteField();
}

Game.prototype.addListenerHoverHand = function()
{	
	var handNode = this.sketcher.myHand;
	for(var i = 0; i < this.mySide.hand.handArray.length ;i++)
	{
	//	this.eventHandler = this.useCard.bind(this);
		handNode.childNodes[i].addEventListener('mouseover',this.mouseOverFunction,false);
		handNode.childNodes[i].addEventListener('mouseleave', this.mouseLeaveFunction,false);	
		handNode.childNodes[i].addEventListener('click',this.mouseClickFunction,false);
	}
}

Game.prototype.addListenerEnemey = function()
{
	var handNode = this.sketcher.enemyHand;
	for(var i = 0; i < this.enemySide.hand.handArray.length; i++ )
		handNode.childNodes[i].addEventListener('click',this.mouseClickEnemyHand,false);

}

Game.prototype.useEnemyCard = function()
{
	if(this.gameLogic.myTurn == true ||
	   this.gameLogic.gameOver == true ||
	   this.gameLogic.animation == true ||
	   this.gameLogic.draw == true ||
	   this.gameLogic.effectAnimation == true) //condizione in cui la carta NON può essere giocata
		return;

	var handNode = this.sketcher.enemyHand;
	var fieldNode = this.sketcher.enemyField;
	var howManyCards = fieldNode.childNodes.length;
	var index = this.ai.chooseCard(this.enemySide.hand.handArray,
									this.enemySide.score.score,
									this.mySide.score.score,
									this.enemySide.field.fieldArray);
	console.log(index);
	if(index == -1)
	{
		this.gameLogic.gameOver = true;
		console.log('nessuna mossa valida');
		this.gameLogic.iWin = true;
		return;
	} //indice del node selezionato
	var checkBlast = false; //se la carta giocata è una blast,ci sono regole di turno diverse



	var card = this.enemySide.hand.handArray[index];
	this.sketcher.uncoverCard(handNode.childNodes[index]);

	if(card.value == 'blast')
		checkBlast = true;
	
	//controlla se l'ultima carta sul campo è coperta e se la carta giocata è la numero 1 
	if(this.enemySide.field.fieldArray[howManyCards-1].show == false && card.value != 1 ) //in questo caso la carta giocata sostituisce 
	{																					  //la carta coperta
		this.enemySide.field.fieldArray.pop();
		howManyCards -= 1;
		fieldNode.removeChild(fieldNode.lastChild);
		this.enemySide.field.fieldArray.push(card);
	}
	else if(this.enemySide.field.fieldArray[howManyCards-1].show == false && card.value == 1) //la carta uno riporta in gioco la carta coperta
	{
		this.reviveCard(this.enemySide,handNode.childNodes[index]);
		this.enemySide.score.score -= 1;
	}
	else
	{
	this.enemySide.field.fieldArray.push(card); //nessun caso particolare, la carta viene giocata normalmente
	}

	this.enemySide.hand.handArray.splice(index,1);


	if(isNaN(card.value)) //carta speciale
	{
		this.useSkillCard(card,this.enemySide,handNode.childNodes[index],this.gameLogic);
	}
	else
	{
		this.sketcher.moveCard(this.enemySide,handNode,fieldNode,handNode.childNodes[index].offsetLeft,0,75*(howManyCards),0,handNode.childNodes[index]);
		this.enemySide.score.addScore(card.value);
		this.drawScore();
	}

	//evt.target.removeEventListener('click',this.mouseClickEnemyHand);

//	this.gameLogic.animation = false; //animazione finita
	if(checkBlast) //se la carta giocata è una blast
	{
		return;
	}
	this.gameLogic.checkDraw(this.mySide.score.score,this.enemySide.score.score);  
	this.gameLogic.gameOverCheck(this.mySide.score.score , this.enemySide.score.score);
	this.gameLogic.myTurn = true;
}

/*
Game.prototype.useEnemyCard = function(evt)
{
	if(this.gameLogic.myTurn == true ||
	   this.gameLogic.gameOver == true ||
	   this.gameLogic.animation == true ||
	   this.gameLogic.draw == true) //condizione in cui la carta può essere giocata
		return;

	var handNode = this.sketcher.enemyHand;
	var fieldNode = this.sketcher.enemyField;
	var howManyCards = fieldNode.childNodes.length;
	var index = Array.from(evt.target.parentNode.children).indexOf(evt.target); //indice del node selezionato
	var checkBlast = false; //se la carta giocata è una blast,ci sono regole di turno diverse

	var card = this.enemySide.hand.handArray[index];
	if(card.value == 'blast')
		checkBlast = true;
	
	//controlla se l'ultima carta sul campo è coperta e se la carta giocata è la numero 1 
	if(this.enemySide.field.fieldArray[howManyCards-1].show == false && card.value != 1 ) //in questo caso la carta giocata sostituisce 
	{																					  //la carta coperta
		this.enemySide.field.fieldArray.pop();
		howManyCards -= 1;
		fieldNode.removeChild(fieldNode.lastChild);
		this.enemySide.field.fieldArray.push(card);
	}
	else if(this.enemySide.field.fieldArray[howManyCards-1].show == false && card.value == 1) //la carta uno riporta in gioco la carta coperta
	{
		this.reviveCard(this.enemySide,evt.target);
		this.enemySide.score.score -= 1;
	}
	else
	{
	this.enemySide.field.fieldArray.push(card); //nessun caso particolare, la carta viene giocata normalmente
	}

	this.enemySide.hand.handArray.splice(index,1);


	if(isNaN(card.value)) //carta speciale
	{
		this.useSkillCard(card,this.enemySide,evt.target,this.gameLogic);
	}
	else
	{
		this.sketcher.moveCard(this.enemySide,handNode,fieldNode,evt.target.offsetLeft,0,75*(howManyCards),0,evt.target);
		this.enemySide.score.addScore(card.value);
		this.drawScore();
	}

	evt.target.removeEventListener('click',this.mouseClickEnemyHand);

//	this.gameLogic.animation = false; //animazione finita
	if(checkBlast) //se la carta giocata è una blast
	{
		return;
	}
	this.gameLogic.checkDraw(this.mySide.score.score,this.enemySide.score.score);  
	this.gameLogic.gameOverCheck(this.enemySide.score.score,this.mySide.score.score);
	this.gameLogic.myTurn = true;
}
*/



Game.prototype.useCard = function(evt)
{
	if(this.gameLogic.myTurn == false ||
	   this.gameLogic.gameOver == true ||
	   this.gameLogic.animation == true ||
	   this.gameLogic.draw == true	||
	   this.gameLogic.effectAnimation == true)
		return;

	var handNode = this.sketcher.myHand;
	var fieldNode = this.sketcher.myField;
	var howManyCards = fieldNode.childNodes.length;
	var index = Array.from(evt.target.parentNode.children).indexOf(evt.target);
	var card = this.mySide.hand.handArray[index];
	var checkBlast = false;

	if(card.value == 'blast') //se la carta è una blast allora ci sono regole di turno diverse
		var checkBlast = true;

	if((this.mySide.field.fieldArray[this.mySide.field.fieldArray.length-1].show == false) && (card.value != 1) )
	{	//se l'ultima carta sul terreno non è coperta la carta da giocare è diversa dall'1
		this.mySide.field.fieldArray.pop();
		howManyCards -= 1;
		fieldNode.removeChild(fieldNode.lastChild);
		this.mySide.field.fieldArray.push(card);
	}
	else if(this.mySide.field.fieldArray[howManyCards-1].show == false && card.value == 1)
	{	// se la carta sul terreno è coperta ed la carta giocata è 1, allora si ravviva l'utlima carta
		this.reviveCard(this.mySide,evt.target);
		this.mySide.score.score -= 1;
	}
	else
	{
	this.mySide.field.fieldArray.push(card);
	}

	this.mySide.hand.handArray.splice(index,1); //toglie la carta dall'array mano

	if(isNaN(card.value))
	{
		this.useSkillCard(card,this.mySide,evt.target,this.gameLogic);
		//event.target.remove();
	}
	else 
	{
		this.sketcher.moveCard(this.mySide,handNode,fieldNode,evt.target.offsetLeft,0,75*(howManyCards),0,evt.target);
		this.mySide.score.addScore(card.value);
		this.drawScore();
	}

	// giocata la carta, rimuovo i listeners
	evt.target.removeEventListener('mouseover',this.mouseOverFunction);
	evt.target.removeEventListener('mouseleave',this.mouseLeaveFunction);
	evt.target.removeEventListener('click',this.mouseClickFunction);

//	this.gameLogic.animation = false;
	if(checkBlast)
	{
		return;
	} 
	this.gameLogic.checkDraw(this.mySide.score.score,this.enemySide.score.score);
	this.gameLogic.gameOverCheck(this.mySide.score.score,this.enemySide.score.score);
	this.gameLogic.myTurn = false;


}

Game.prototype.useSkillCard = function(card,side,selectedNode)
{
	switch(card.value)
	{
		case "bolt":
			this.useBolt(side,selectedNode);
			this.effectBolt.play();
		break;

		case "blast":
			this.useBlast(side,selectedNode);
			this.effectBlast.play();
		break;

		case "force":
			this.useForce(side,selectedNode);
			this.effectForce.play();
		break;

		case "mirror":
			this.useMirror(side,selectedNode);
			this.effectMirror.play();
		break;

	}
}

Game.prototype.reviveCard = function(side,specialOne)
{	
	var card = 0;
	if(side.sideNode.id == mySide)
	{
		var fieldNode = this.sketcher.myField;
		card = this.mySide.field.fieldArray[this.mySide.field.fieldArray.length -1];
		card.show = true;
		this.mySide.score.addScore(card.value,this.mySide);
	}
	else
	{
		var fieldNode = this.sketcher.enemyField;
		card = this.enemySide.field.fieldArray[this.enemySide.field.fieldArray.length -1];
		card.show = true;
		this.enemySide.score.addScore(card.value,this.ememySide);
	}

	this.drawScore();
//	this.sketcher.uncoverCard(fieldNode.lastChild);
	this.sketcher.reviveAnimation(side,specialOne,this.gameLogic);
}

Game.prototype.useBolt = function(side,boltNode)
{	

	var fieldNode = null;
	var lastCardIndex = 0;
	var currentScore = 0;
	if(side.sideNode.id == mySide) //distingue il giocatore che usa il bolt
	{
		fieldNode = this.sketcher.enemyField; //field di chi Riceve il bolt
		lastCardIndex = this.enemySide.field.fieldArray.length - 1;
		this.enemySide.field.fieldArray[lastCardIndex].show = false;
		this.enemySide.score.subtractScore(this.enemySide.field.fieldArray[lastCardIndex].value,side); 		
	}
	else
	{
		fieldNode = this.sketcher.myField;
		lastCardIndex = this.mySide.field.fieldArray.length - 1;
		this.mySide.field.fieldArray[lastCardIndex].show = false;
		this.mySide.score.subtractScore(this.mySide.field.fieldArray[lastCardIndex].value,side);
	}
	

		//animazioni
	this.drawScore();
	this.sketcher.coverCard(fieldNode.children[lastCardIndex]);
	this.sketcher.boltAnimation(fieldNode.children[lastCardIndex],boltNode,side,this.gameLogic)

	//rimuove bolt dal field array
	if(side.sideNode.id == mySide)
	{
		this.mySide.field.fieldArray.pop();
	}
	else
	{
		this.enemySide.field.fieldArray.pop();
	}

}

Game.prototype.useBlast = function(side,blastNode)
{
	var randomIndex = 0;
	
	if(side.sideNode.id == mySide)
	{
		var enemyHand = this.sketcher.enemyHand;
		var handLen = this.enemySide.hand.handArray.length;
		randomIndex = Math.floor(Math.random() * (handLen));
		this.enemySide.hand.handArray.splice(randomIndex,1);
	}
	else
	{
		var hand = this.sketcher.myHand;
		var handLen = this.mySide.hand.handArray.length;
		randomIndex = Math.floor(Math.random() * (handLen));
		this.mySide.hand.handArray.splice(randomIndex,1);
	}
	//animations
	this.sketcher.blastAnimation(blastNode,side,randomIndex,this.gameLogic);

	if(side.sideNode.id == mySide)
	{
		this.mySide.field.fieldArray.pop();
	}
	else
	{
		this.enemySide.field.fieldArray.pop();
	}

}

Game.prototype.useForce = function(side,forceNode)
{
	side.score.forceCard();
	this.drawScore();
	//animation
	this.sketcher.forceAnimation(forceNode,side,this.gameLogic);
}

Game.prototype.swapScore = function()
{
	var temp = this.mySide.score.score;
	this.mySide.score.score = this.enemySide.score.score;
	this.enemySide.score.score = temp; 
}

Game.prototype.useMirror = function(side,selectedNode)
{	
	//controllo la side
	if(side.sideNode.id == 'mySide')
	{
		var otherSide = this.enemySide;
	}
	else
	{
		var otherSide = this.mySide;
	}

	var alreadyPopped = false //controllo se ho già aliminato la carta mirror  dall'array

	if(this.mySide.field.fieldArray.length != this.enemySide.field.fieldArray.length)
	{
		if(side.sideNode.id == mySide)
		{
			this.mySide.field.fieldArray.pop();
			alreadyPopped = true;
		}
		else
		{
			this.enemySide.field.fieldArray.pop();
			alreadyPopped = true;
		}
	}
	this.swapScore();
	swapSameLengthArrays(this.mySide.field.fieldArray, this.enemySide.field.fieldArray);

	if(alreadyPopped == false)
	{
		otherSide.field.fieldArray.pop();
	}
//	console.log(this.mySide.field.fieldArray);
//	console.log(this.enemySide.field.fieldArray);
	//animations
	this.sketcher.mirrorAnimation(side,selectedNode,this.gameLogic);
	setTimeout(this.drawScore.bind(this),1000);

}



Game.prototype.leaveOverHand = function(evt)
{
	var top = evt.target.offsetTop;
	evt.target.style.top = top + 20 + 'px';
}

Game.prototype.overCardHand = function(evt)
{
	var top = evt.target.offsetTop;
	evt.target.style.top = top - 20 + 'px';
}

