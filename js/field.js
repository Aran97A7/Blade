function Field(){
	this.fieldArray = new Array();
}

Field.prototype.deleteField = function()
{
	var originalLength = this.fieldArray.length;
	console.log(originalLength + ' fieldArray');
	for(var i = 0; i<originalLength ;i++)
		this.fieldArray.pop();
}