

function Score()
{	
	this.score = 0;
}

Score.prototype.startingScore = function(side)
{
		if(isNaN(side.field.fieldArray[0].value))
			this.score = 1;
		if(isNaN(side.field.fieldArray[0].value) == false)
			this.score = side.field.fieldArray[0].value;
}

Score.prototype.addScore = function(value,side)
{
	if(isNaN(value) == true)
	{
		if((value == 'force') && (side.field.fieldArray.length != 1)) // se force viene giocato 
		{													   // come prima carta, non si raddoppia il punteggio	
			this.score = this.score * 2;
		}
		else //blast,mirror e bolt
		{
			this.score = this.score + 1;
		}
	}
	else
	{
		this.score += value;
	}
	
}

Score.prototype.subtractScore = function(value,side)
{
	if(isNaN(value) == true) //carta che non ha valore intero
	{
		if((value == 'force') && (side.field.fieldArray.length != 1)) // se force viene giocato 
		{													   // come prima carta, non si dimezza il punteggio	
			this.score = this.score/2;
		}
		else //blast,mirror e bolt
		{
			this.score = this.score - 1;
		}
	}
	else
	{
		this.score = this.score - value;
	}
}

Score.prototype.forceCard = function()
{
	this.score = this.score * 2;
}

