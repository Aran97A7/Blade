function swapSameLengthArrays(a,b)
{
	for(var i = 0; i < a.length ; i++)
	{
		var temp = a[i];
		a[i] = b[i];
		b[i] = temp;
	}
}

function offsetX(id){
	return id.offsetLeft;
}

function offsetY(id){
	return id.offsetTop;
}

function cardClass(card)
{
	return 'card' + ' ' + 'card' + '_' + card.value;
}