function gameLogic()
{
	this.draw = false;
	this.myTurn = true;
	this.gameOver = false;
	this.animation = false;
	this.effectAnimation = false;

	this.iWin = false;
}

gameLogic.prototype.checkDraw = function(myScore,enemyScore)
{
	if(myScore === enemyScore)
	{
		this.draw = true;
//		return true;
	}
	else
	{
		this.draw = false;
	}
//	return false;
}

gameLogic.prototype.gameOverCheck = function(myScore,enemyScore)
{
	if(this.myTurn == true && myScore < enemyScore)
	{
		this.gameOver = true;
		this.iWin = false;
//		return true;
	}
	if(this.myTurn == false && enemyScore < myScore)
	{
		this.gameOver = true;
		this.iWin = true;
	}
//	return false;
}
/*
gameLogic.prototype.winner = function(myTurn,myHandArray,enemyHandArray,myScore,enemyScore)
{
	if()
	if(myTurn == true && myHandArray.length == 0)
	{
			this.iWin = false;
			return;
	}
	if(myTurn == false && enemyHandArray.length == 0)
	{
			this.iWin = true;
			return;
	}

	if(myScore < enemyScore)
	{
		this.iWin = false;
		return;
	}
	if(enemyScore > myScore)
	{
		this.iWin = true;
		return;
	}
}
*/

gameLogic.prototype.chooseFirst = function(myScore,enemyScore)
{
 	if(myScore < enemyScore )
 	{
 		this.myTurn = true;
// 		return true;
	console.log('si');
 	}
 	else
 	{
 		this.myTurn = false;
//		return false;
		console.log('no');
 	}
}

gameLogic.prototype.outOfCards = function(myHandArray,enemyHandArray)
{
	if(this.myTurn == true && myHandArray.length == 0)
	{
		this.gameOver = true;
		this.iWin = false;
	}
	if(this.myTurn == false  && enemyHandArray.length == 0)
	{
		this.gameOver = true;
		this.iWin = true;
	}
}

gameLogic.prototype.noMoreValueCards = function(myHandArray,enemyHandArray)
{
	var numberOfValueCards = 0

	for(var i = 0; i< myHandArray.length; i++)
		if(!isNaN(myHandArray[i].value))
			numberOfValueCards++;

	if(numberOfValueCards == 0)
	{
		this.gameOver = true;
		this.iWin = false;
		return;
	}

	numberOfValueCards = 0;

	for(var i = 0; i< enemyHandArray.length;i++)
		if(!isNaN(enemyHandArray[i].value))
			numberOfValueCards ++;
	if(numberOfValueCards == 0)
	{
		this.gameOver = true;
		this.iWin = true;
		return;
	}
}


