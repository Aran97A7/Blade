function winner(iWin)
{
	var xmlhttp = new XMLHttpRequest();

	var bool;
	if(iWin === true)
		bool = 'a';
	if(iWin === false)
		bool = 'b';

	console.log(bool);
	xmlhttp.open("GET","./PHP/winner.php?iWin="+bool);
	xmlhttp.send();
}