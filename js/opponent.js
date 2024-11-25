function AI()
{
	this.indexArray = new Array();
}

AI.prototype.deleteArray = function()
{
	var originalLength = this.indexArray.length;
	for(var i = 0; i < originalLength ;i++ )
	{
		this.indexArray.pop();
	}
}

AI.prototype.checkNormalCardsNumber = function(enemyHandArray)//controlla quante carte con valore ci sono
{
	var howMany = 0;
	var lastNormalCardIndex = 0;
	for(var i = 0; i < enemyHandArray.length ;i++ )
	{
		if(!isNaN(enemyHandArray[i].value))
		{
			howMany++;
			lastNormalCardIndex = enemyHandArray[i].value;

		}
	}

//	console.log(howMany + 'quanti');
	if(howMany == 1) //se c'è solo una carta con valore, allora si tiene per ultima
		return lastNormalCardIndex;
	else
		return -1;
}

AI.prototype.fillArray = function(enemyHandArray,enemyScore,myScore,enemyField)
{
	this.deleteArray();
	var checkOneLastCard = this.checkNormalCardsNumber(enemyHandArray);
//	console.log(checkOneLastCard)
	for(var i = 0; i < enemyHandArray.length; i++)
	{

		if(checkOneLastCard != i) //se l'indice dell'array non corrisponde
								  //all'indince dell'ultima carta con value								 //non l'aggiunge
		{
			if(enemyField[enemyField.length-1].show == false && enemyHandArray[i].value == 1)
			{
				this.deleteArray();
				this.indexArray.push(i);
				return;
			}
			
			if(!isNaN(enemyHandArray[i].value))
			{ //se la carta ha valore intero
//				console.log(enemyHandArray[i].value.isInteger);
				if((enemyHandArray[i].value + enemyScore) >= myScore)
				{
					this.indexArray.push(i);
				}
			}	

			if(isNaN(enemyHandArray[i].value)) //se la carta è force non è sempre ottimo inserirla
			{
				if(enemyHandArray[i].value !== 'force')
				{
					this.indexArray.push(i);
				}
				else
				{
					if(enemyScore * 2 >= myScore)
					{
						this.indexArray.push(i);
					}
				}
			}

		}
	}
	if(enemyHandArray.length == 1)
		this.indexArray.push(0);
}

AI.prototype.chooseCard = function(enemyHandArray,enemyScore,myScore,enemyField)
{
//	if(this.indexArray.length != 0)

	this.fillArray(enemyHandArray,enemyScore,myScore,enemyField);
	if(this.indexArray.length == 0)
		return -1;
	var RandomIndexOfArray = Math.floor(Math.random() * (this.indexArray.length))
	return (this.indexArray[RandomIndexOfArray]);
}

