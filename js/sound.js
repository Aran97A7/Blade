function Sound(source)
{
	this.sound = document.createElement('audio');
	this.sound.src = source;
//	this.sound.setAttribute('preload', 'auto');
	this.sound.setAttribute('controls','controls');
	this.sound.style.display = 'none';
	document.body.appendChild(this.sound);
	this.sound.autoplay;
//	this.sound.muted = 'muted';
}

Sound.prototype.play = function()
{
	this.sound.play();
}

Sound.prototype.pause = function()
{
	this.sound.pause();
}