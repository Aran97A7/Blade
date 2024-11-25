var cardClass = 'card';

function sketcher(enemySide,mySide,animationObject)
{
	this.animation = animationObject;
	console.log(this.animation.animation);

	this.drawDeck(enemySide);
	this.drawDeck(mySide);

	this.myDeck = document.getElementById('myDeck');
	this.enemyDeck = document.getElementById('enemyDeck');

	this.drawHand(enemySide);
	this.drawHand(mySide);

	this.myHand = document.getElementById('myHand');
	this.enemyHand = document.getElementById('enemyHand');

	this.drawField(enemySide);
	this.drawField(mySide);

	this.myField = document.getElementById('myField');
	this.enemyField = document.getElementById('enemyField');

	this.drawFirstScore(enemySide);
	this.drawFirstScore(mySide);

	this.drawHandCard(enemySide,enemySide.hand.handArray);
	this.drawHandCard(mySide,mySide.hand.handArray);

}


sketcher.prototype.drawDeck = function(side) //disegna il deck
{
	var whichSide = side.sideNode.id; 
	var deckNode = document.createElement('div');
		deckNode.setAttribute('class','card_covered');

	if(whichSide == 'mySide')
	{
		deckNode.setAttribute('id', 'myDeck');

	}
	else
	{
		deckNode.setAttribute('id', 'enemyDeck');
	}

	side.sideNode.appendChild(deckNode);

	var xDeck = offsetX(deckNode);
	var yDeck = offsetY(deckNode);
}

sketcher.prototype.drawField = function(side) //disegna il campo
{
	var whichSide = side.sideNode.id;
	var fieldNode = document.createElement('div');

	if(whichSide == mySide)
	{
		fieldNode.setAttribute('id', 'myField');
	}
	else
	{
		fieldNode.setAttribute('id', 'enemyField');
	}

	side.sideNode.appendChild(fieldNode);
}
		



sketcher.prototype.drawHand = function(side)
{ //disegna la mano 
	var whichSide = side.sideNode.id;
	hand = document.createElement('div');
	if(whichSide == 'mySide')
	{
		hand.setAttribute('id','myHand');
	}

	if(whichSide == 'enemySide')
	{
		hand.setAttribute('id','enemyHand');
	}
	side.sideNode.appendChild(hand);
}


sketcher.prototype.drawFirstScore = function(side)
{	
	var whichSide = side.sideNode.id;
	var scoreNode = document.createElement('div');

	if(whichSide == 'mySide')
	{
		scoreNode.setAttribute('id','myScore');
	}
	else
	{
		scoreNode.setAttribute('id','enemyScore');
	}

	side.sideNode.appendChild(scoreNode);
	var sc = document.createTextNode('0');
	scoreNode.appendChild(sc);
}



sketcher.prototype.drawHandCard = function(side,hand) //funzione iniziale per pescare le carte
{	

	if(side.sideNode.id == 'mySide')
	{
		var handNode = this.myHand;
		var deckNode = this.myDeck;
	}
	else if(side.sideNode.id == 'enemySide')
	{
		var handNode = this.enemyHand;
		var deckNode = this.enemyDeck;
	}
	else return;
//	var draw = 0;
	var pos = 0;
	var id = setInterval(fullDraw.bind(this),300);

	function  fullDraw()
	{
		if(pos == 10)
		{
			clearInterval(id);
			this.animation.effectAnimation = false;
		}
		else
		{
			this.animation.effectAnimation = true;
			draw = document.createElement('div');
			cardC = cardClass(hand[pos]);
			draw.setAttribute('class', cardC);
			if(side.sideNode.id == 'enemySide')
				this.coverCard(draw);
			this.moveCard(side,deckNode,handNode,0,0,pos*75,0,draw);
			pos++;
		}
	}
}

sketcher.prototype.dissolve = function(Node)
{
	var pos = 0;
	var id = setInterval(opacity.bind(this),2);

	function opacity()
	{
		if(pos == 100)
		{
			clearInterval(id);
			console.log(this.animation.effectAnimation);
			this.animation.effectAnimation = false;

			Node.remove();
			console.log(this.animation.effectAnimation);

		}
		else
		{
			pos++;
			Node.style.opacity = 1 - pos/100;
		}	
	}
}





sketcher.prototype.fromDeckToField = function(side,card)
{
	var fieldNode = 0;
	var deckNode = 0;
	var whichSide = side.sideNode.id;
	if(whichSide == 'mySide')
	{
		fieldNode = this.myField;
		deckNode = this.myDeck;
	}
	else if(whichSide == 'enemySide')
	{
		fieldNode = this.enemyField;
		deckNode = this.enemyDeck;
	}
	else return;

	var cardNode = document.createElement('div');
	cardNode.setAttribute('class','card' + ' ' + 'card' + '_' + card.value);

	this.moveCard(side,deckNode,fieldNode,0,0,0,0,cardNode);
}


sketcher.prototype.drawUpdatedScore = function(side,score)
{	
	var scoreNode = null;
	var whichSide = side.sideNode.id;
	if(whichSide == 'mySide')
	{
		scoreNode = document.getElementById('myScore');
	}
	else if(whichSide == 'enemySide')
	{
		scoreNode = document.getElementById('enemyScore');
	}
	else return;

	scoreNode.firstChild.nodeValue = score;
}



sketcher.prototype.moveCard = function(side,srcParent,dstParent,initialOffsetX,initialOffsetY,finalOffsetX,finalOffsetY,node)
{//funzione generale per muovere le carte          offsetX/Y posizione rispetto al box di arrivo
	var xSrc = srcParent.offsetLeft + initialOffsetX;
	var ySrc = srcParent.offsetTop + initialOffsetY;

	var xDst = dstParent.offsetLeft;
	var yDst = dstParent.offsetTop; 


	side.sideNode.appendChild(node);
	node.style.left = xSrc + 'px';
	node.style.top = ySrc + 'px';

	var pos = 0;
	var id = setInterval(frame.bind(this),2);
	this.animation.animation = true;
//	console.log(this.animation.animation);
	function frame()
	{
		if(pos == 50)
		{	
			dstParent.appendChild(node);
			node.style.left = finalOffsetX + 'px';
			node.style.top = finalOffsetY + 'px';
			this.animation.animation = false;
		//	console.log(this.animation.animation);
			clearInterval(id);
		}
		else
		{
			pos++;
			node.style.left = (xSrc + ((xDst - xSrc + finalOffsetX) / 100 ) * pos *2) + 'px';
			node.style.top =  (ySrc + ((yDst - ySrc  + finalOffsetY) /100 ) * pos *2) + 'px';
		}
	}
}



sketcher.prototype.shift = function(node,negativeY)
{
	Y = negativeY;
	var pos = 0;
	var id = setInterval(frame,5);
	function frame()
	{
		if(pos == 75)
		{
			clearInterval(id);
		}
		else
		{
			pos++;
			node.style.transform = "translate(" + ( -1 * pos) + "px," + Y * pos + "px)";
		}
	}
}

sketcher.prototype.drawWinner = function(iWin) // da modificare
{
	var winDraw = document.createElement('div');
	var playgroundNode = document.getElementById('playground');
		playgroundNode.appendChild(winDraw);
		winDraw.setAttribute('id','win');

	var colorClass='color';

	if(iWin == true)
	{
		text = 'You Win';
	}
	else
	{
		text = 'You Lose';
	}
	

	winDraw.className = 'win'+' '+colorClass;
	var textNode = document.createTextNode(text);
	winDraw.appendChild(textNode);

//	setTimeout(this.dissolve.bind(this),3500,winDraw,logicObject);
}

/*
sketcher.prototype.deleteTurnMessage = function(node)
{	
	var holder = 0;		
	var pos = 1;
	var size = 50;
	var id = setInterval(frame,2);
	function frame()
		{
			if(pos == 1000)
			{
				clearInterval(id);
				node.remove();
			}
			else
			{	
				if(pos > 500)
				{
					var holder = pos-500;
					node.style.fontSize = 80 - 80*(holder/500) + 'px';
					node.style.opacity = 1 - holder/500;
				}
				pos++;
			}
		}
}
*/

sketcher.prototype.clearFieldAnimation = function(side)
{	

	var fieldNode = 0;
	if(side.sideNode.id == 'mySide')
	{
		fieldNode = this.myField;
	}
	else
	{
		fieldNode = enemyField;
	}

	var vortex = document.createElement('div');
		vortex.setAttribute('class','vortex');
		fieldNode.appendChild(vortex);
//done sum shit

	var initialOffsetX = 0;
	var originalFieldLenght = fieldNode.children.length -1;
	console.log(originalFieldLenght + ' fieldNode');
	for(var i = originalFieldLenght ; i >= 0;i--)
	{	
		initialOffsetX = 75*(fieldNode.children.length -1);
		this.moveCard(side,fieldNode,fieldNode,initialOffsetX,0,400,0,fieldNode.childNodes[i]);
	}

//	logicObject.animation = false;

}

sketcher.prototype.coverCard = function(cardNode)
{
	cardNode.classList.add('card_covered');
}

sketcher.prototype.uncoverCard = function(cardNode)
{
	cardNode.classList.remove('card_covered');
}


//inizio animazioni bolt
sketcher.prototype.boltAnimation = function(strikedNode,boltNode,side)
{	
	this.animation.effectAnimation = true;

	if(side.sideNode.id == 'mySide')
	{
		var Hand = this.myHand;
		var SideNode = side.sideNode;
		var Field = myField;
	
		var otherFieldNode = this.enemyField;
		var otherSideNode =  document.getElementById('enemySide');

		var xNCard = enemyField.childNodes.length * 75;  //numero di carte dell'avversario
														 //serve per avere l'offset del beamNode
	}
	else
	{
		var Hand = this.enemyHand;
		var SideNode = side.sideNode;
		var Field = this.enemyField;
	

		var otherFieldNode = this.myField;
		var otherSideNode =  document.getElementById('mySide');

		var xNCard = myField.childNodes.length * 75;
	}

	var howManyCards = Field.childNodes.length;


	var xBoltNode = boltNode.offsetLeft;
	var yBoltNode = boltNode.offsetTop;



	this.moveCard(side,Hand,Field,xBoltNode,yBoltNode,75*howManyCards,0,boltNode);

	var xField = myField.offsetLeft;  //myField ed enemyField hanno lo stesso xOffset
	
	var xTotal = xField + xNCard;

	var beamNode = document.createElement('div');
		beamNode.setAttribute('id','lightning');


		strikedNode.append(beamNode);
	//	beamNode.style.left = xTotal + 'px';
	//	beamNode.style.top = 100 + 'px';
		beamNode.style.transform = 'translate(0px,-75px)';


	var aura = document.createElement('div');
		aura.setAttribute('id','boltAura');
		boltNode.append(aura);

	setTimeout(this.clearBoltAnimation.bind(this),1500,boltNode,beamNode);
}

sketcher.prototype.clearBoltAnimation = function(boltNode,beamNode)
{
	boltNode.removeChild(boltNode.firstChild);
	beamNode.remove();
//	this.coverCard(boltNode);
	setTimeout(this.removeBoltCard.bind(this),1000,boltNode);
}

sketcher.prototype.removeBoltCard = function(boltNode)
{
	this.dissolve(boltNode);
//	logicObject.animation = false;
//	boltNode.remove();
}
//fine animazioni bolt

//inizio animazioni blast
sketcher.prototype.blastAnimation = function(blastNode,side,handIndex)
{
	this.animation.effectAnimation = true;
	var hand = null;
	var field = null;

	var otherHand = null;
	if(side.sideNode.id == 'mySide')
	{
		var hand = this.myHand;
		var field = this.myField;
//		side = document.getElementById('mySide');

		otherHand = this.enemyHand;
	}
	else
	{
		var hand = this.enemyHand;
		var field = this.enemyField;
//		side = document.getElementById('enemySide');

		var otherHand = this.myHand;
	}
	var howManyCards = field.childNodes.length;

	var xBlastNode = blastNode.offsetLeft;
	var yBlastNode = blastNode.offsetTop;

	this.moveCard(side,hand,field,xBlastNode,yBlastNode,75*howManyCards,0,blastNode);
//side,srcParent,dstParent,initialOffsetX,initialOffsetY,finalOffsetX,finalOffsetY,node
	
	var tornado = document.createElement('div');
	tornado.setAttribute('class','tornado');
	otherHand.children[handIndex].append(tornado);
	setTimeout(this.clearBlastAnimation.bind(this),3000,blastNode,otherHand,handIndex);

}

sketcher.prototype.clearBlastAnimation = function(blastNode,handNode,cardIndex)
{
		this.dissolve(blastNode);
//		blastNode.remove();
		handNode.removeChild(handNode.childNodes[cardIndex]);

//		logicObject.animation = false;
//		console.log(cardIndex);
}

//inizio animazioni force

sketcher.prototype.forceAnimation = function(forceNode,side)
{	
	this.animation.effectAnimation = true;

	if(side.sideNode.id == 'mySide')
	{
		var hand = this.myHand;
		var field = this.myField;
	}
	else
	{
		var hand = this.enemyHand;
		var field = this.enemyField;
	}

	var howManyCards = field.childNodes.length;


	var xforceNode = forceNode.offsetLeft;
	var yforceNode = forceNode.offsetTop;

	this.moveCard(side,hand,field,xforceNode,yforceNode,75*howManyCards,0,forceNode);

	var purpleWall = document.createElement('div');
		purpleWall.setAttribute('class','purpleWall');
		forceNode.appendChild(purpleWall)

	forceNode.classList.add('forceAura');

	this.forceEffects(purpleWall);

	setTimeout(this.removeForceBorder.bind(this),1000,forceNode);

}

sketcher.prototype.removeForceBorder = function(forceNode)
{
	forceNode.classList.remove('forceAura');
	this.animation.effectAnimation = false;
}

sketcher.prototype.forceEffects = function(purpleWall)
{
	var pos = 1;
	var id = setInterval(frame.bind(this),2);

	function frame()
		{
			if(pos == 1000)
			{
				this.animation.effectAnimation = false;
				clearInterval(id);
			}
			else
			{	
				if(pos < 500)
				{
					purpleWall.style.opacity = (pos/500); 
				}
				if(pos > 500)
				{
					purpleWall.style.opacity = 1 - (pos/500);
				}
				pos++;
			}
		}
}

//fine animazioni force

sketcher.prototype.coverArray = function(childNodesToCover)
{
	for(var i = 0; i < childNodesToCover.childElementCount ; i++)
	{
		this.coverCard(childNodesToCover.childNodes[i])
	}
}

sketcher.prototype.uncoverArray = function(childNodesToUncover)
{
	for(var i = 0; i < childNodesToUncover.childElementCount ; i++)
	{
		this.uncoverCard(childNodesToUncover.childNodes[i])
	}
}

sketcher.prototype.mirrorAnimation = function(side,mirrorNode)
{
	this.animation.effectAnimation = true;

	if(side.sideNode.id == 'mySide')
	{
	var srcParent = this.myHand;
	var dstParent = this.myField;
	var otherField = this.enemyField;
	}
	else
	{
	var srcParent = this.enemyHand;
	var dstParent = this.enemyField;
	var otherField = this.myField;
	}
	var howManyCards = dstParent.childNodes.length;
	var xIniOffset = mirrorNode.offsetLeft;
	var yIniOffset = mirrorNode.offsetTop;


	this.coverArray(myField);
	this.coverArray(enemyField);

	this.moveCard(side,srcParent,dstParent,xIniOffset,yIniOffset,75*howManyCards,0,mirrorNode);

	var actualMirror = document.createElement('div');
	actualMirror.setAttribute('class','actualMirror');
	var playground = document.getElementById('playground');
	playground.appendChild(actualMirror);


//	setTimeout(this.dissolve,2000,mirrorNode);
	setTimeout(this.clearMirrorAnimation.bind(this),2000,actualMirror,mirrorNode);
}


sketcher.prototype.clearMirrorAnimation = function(actualMirror,mirrorNode)
{
	var playground = document.getElementById('playground');

	var myField = this.myField;
	var enemyField = this.enemyField;

	this.swapField();
	this.uncoverArray(myField);
	this.uncoverArray(enemyField);
	this.coverCard(mirrorNode);
	this.dissolve(mirrorNode);
	this.dissolve(actualMirror);

	
//	actualMirror.remove();
//	logicObject.animation = false;
} 

sketcher.prototype.swapField = function()
{
	var myField = this.myField;
	var enemyField = this.enemyField;

	for(var i = 0 ; i < myField.childElementCount ; i++)
	{
		if(enemyField.childNodes[i] == null || myField.childNodes[i] == null)
			break;
		enemyField.insertBefore(myField.childNodes[i],enemyField.childNodes[i]);
		myField.insertBefore(enemyField.childNodes[i+1],myField.childNodes[i]);

	}
}




sketcher.prototype.reviveAnimation = function(side,oneNode)
{
	this.animation.effectAnimation = true;

	if(side.sideNode.id == 'mySide')
	{
		var fieldNode = this.myField;
		var handNode = this.myHand;
		var y = -1;
		howManyCards = fieldNode.childNodes.length -1;
	}
	else
	{
		var fieldNode = this.enemyField; 
		var handNode = this.enemyHand;
		var y = 1;
		howManyCards = fieldNode.childNodes.length ;
	}
	var xShift = -1 * (howManyCards ) * 75;
	var howManyCards = fieldNode.childNodes.length;

	var xIniOffset = oneNode.offsetLeft;
	var yIniOffset = oneNode.offsetTop;

//	oneNode.style.transform = 'translate(375px,90px)';
	//setTimeout(this.moveCard.bind(this),5000,side,fieldNode,fieldNode,xIniOffset,yIniOffset,xShift,yShift,oneNode);
	setTimeout(this.shift.bind(this),1500,oneNode,y);
	setTimeout(this.uncoverCard.bind(this),2000,fieldNode.childNodes[howManyCards - 1]);
	setTimeout(this.reviveAnimationCancel.bind(this),3000,oneNode);

}

sketcher.prototype.reviveAnimationCancel = function(oneNode)
{
	this.dissolve(oneNode);
	this.animation.effectAnimation = false;
//	animationCheck = false;
//	oneNode.remove();
}