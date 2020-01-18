// Tu wszystko jak poprzednio
Dot.all = {};
Dot.count = 0;
function Dot(x,y){
	// Ten sam mechanizm
	Dot.count++;
	this.id = 'd_'+Dot.count;
	Dot.all[this.id] = this;
	this.x = x;
	this.y = y;
	// jak długo będzie widoczny punkt
	this.d = 0;
	// jak się przesuwa
	this.mod_x = VAR.rand(3,7)*(VAR.rand(0,1) ? 1 : -1);
	this.mod_y = VAR.rand(3,7)*(VAR.rand(0,1) ? 1 : -1);
}
Dot.prototype.draw = function(){
	this.x+=this.mod_x;
	this.y+=this.mod_y;
	this.d+=1;
	Game.ctx.fillRect(this.x,this.y,3,3);
	// Jeśli d przekroczy 25, usun punkt
	if(this.d>25){
		delete Dot.all[this.id];
	}
};
// Metody obiektu Dot
Dot.add = function(x,y){
	// dodawanie losowej ilości kropek w określonym punkcie
	var n = VAR.rand(4,9);
	for(var i=0;i<n;i++){
		new Dot(x,y);
	}
};
// Rysowanie wszystkich kropek
Dot.draw = function(){
	for(var d in Dot.all){
		Dot.all[d].draw();
	}
};