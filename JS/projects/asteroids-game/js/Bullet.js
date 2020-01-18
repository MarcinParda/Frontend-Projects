// statyczne właściwości klasy Bullet
// Obiekt ze wszystkimi pociskami.
Bullet.all = {};
// Liczy pociski (dzięki temu każdy ma unikatowe id)
Bullet.count = 0;
// Liczy ile aktualnie jest pocisków w grze
Bullet.active_count = 0;
// Maksymalna ilość pocisków w grze
Bullet.max = 5;
// Względna prędkość pocisku
Bullet.speed = 0.022;
// Ile klatek animacji pocisk utrzymuje się na ekranie (potem jest usuwany, bo inaczej leciałby i leciał)
Bullet.life = 35;
// konstruktor pocisku
function Bullet(){
	// jeśli ilość widocznych pocisków jest mniejsza niż maksymalna ilość pocisków
	if(Bullet.active_count<Bullet.max){
		// zwiększa ilość widocznych pocisków
		Bullet.active_count++;
		// zwiększa ilość wszystkich wystrzelonych pocisków
		Bullet.count++;
		// id pocisku to jego numer zamieniony na łańcuch znaków (musi być unikatowy)
		this.id = Bullet.count.toString();
		// Pocisk jest wstawiany do obiektu ze wszystkimi aktywnymi pociskami
		Bullet.all[this.id] = this;
		// aktualny stan życia pocisku (pocisk ma ograniczony zasięg ilością klatek zapisaną)
		this.life = 0;
		// kąt lotu, taki jak kąt statku w chwili wystrzału
		this.a = Game.ship.a;
		// pozycja taka jak pozycja pierwszego punktu statku (tam gdzie dziób statku)
		this.x = Game.ship.points[0].x;
		this.y = Game.ship.points[0].y;
	}
}
// statyczna metoda obiektu Bullet (nie metoda każdej instancji Bullet)
Bullet.draw = function(){
	// pętla for in przeszukuje wszystki pociski przechowywane w Bullet.all
	for(var b in Bullet.all){
		// Sprawdź czy pocisk trafił w jakiś kamień.
		// Dla wszystkich kamieni
		for(var r in Rock.all){
			// Zrób test kolizji z x i y pocisku
			if(Rock.all[r].hitTest(Bullet.all[b].x, Bullet.all[b].y)){
				// jeśli doszło do kolizji usun pocisk zwiększając jego life o maksymalną wartość (pocisk zostanie usunięty w następnej ifce)
				Bullet.all[b].life+=Bullet.life
				// usun kamień
				Rock.all[r].remove()
				// Przerwij testowanie kolejnych kamieni, bo pocisk już nie istnieje
				break;
			}
		}
		// czy jeszcze żyje
		if(Bullet.all[b].life>Bullet.life){
			// jeśli nie żyje zmeniejsz ilość aktywnych pocisków o jeden
			Bullet.active_count--;
			// i usuń pocisk z Bullet.all
			delete Bullet.all[b];
		}else{

			// starzeje się
			Bullet.all[b].life++;
			// leci pocisk (znowu trygonometria)
			Bullet.all[b].x += Math.sin(Math.PI/180*Bullet.all[b].a)*Bullet.speed*VAR.d;
			Bullet.all[b].y -= Math.cos(Math.PI/180*Bullet.all[b].a)*Bullet.speed*VAR.d;
			// czy się przelatuje przez krewędź ekranu
			if(Bullet.all[b].x<0){
				Bullet.all[b].x+=VAR.W;
			}else if(Bullet.all[b].x>VAR.W){
				Bullet.all[b].x-=VAR.W;
			}
			if(Bullet.all[b].y<0){
				Bullet.all[b].y+=VAR.H;
			}else if(Bullet.all[b].y>VAR.H){
				Bullet.all[b].y-=VAR.H;
			}
			// rysuj kulkę
			Game.ctx.beginPath();
			Game.ctx.arc(Bullet.all[b].x,Bullet.all[b].y,3,0,Math.PI/180*360);
			Game.ctx.closePath();
			Game.ctx.fill();
		}
	}
};