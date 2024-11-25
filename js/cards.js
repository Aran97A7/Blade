function Card(value)
{
	this.value = value;
	this.show = true;
}

Card.prototype.checkShow = function()
{
	if(this.show == true)
	{
		return true;
	}
	else
	{
		return false;
	}
}