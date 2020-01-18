function Ship(){
	// Wszystkie wartości podaję względem wielkości okna (przechowywanej w właściwościach H i W obiektu VAR)
	// 
	// Statek to trójkąt wpisany w okrąg. O jego wielkości decyduje promień okręgu.
	this.r = 0.04;
	// Patrząc na okrąg i zakładając, że linia idąca pionowo w dół od środka okręgu idze pod kątem 0 stopni, punkt, który będzie dziobem statku jest wyznaczony przez przecięcie okręgu przez odcinek znajdujący się pod kątem 180 stopni
	// Za to rufę statku wyznaczaja przecięcie okręgu przez odcinki pod kątem 50 i -50 stopni.
	this.rear_a = 50;
	// Kąt obrotu statku
	this.a = 0;
	// X i Y dla odmiany będziemy podawali w pixelach. Pozwoli nam to potem uniknąć problemów z kierunkiem lotu i kolizjami statku, pocisków i asteroidów
	this.x = VAR.W/2;
	this.y = VAR.H/2;
	//
	//
	// 
	// dochodzi modX i modY aby przechowywać informację o ruchu statku
	// w modX i modY wartości będą przechowywane w pixelach
	this.modX = 0;
	this.modY = 0;
	// jaka jest maksymalna prędkość statku (zapisana wzgędem wielkości okna)
	this.maxMod = 0.019;
	// acc = acceleration czyli przyspieszenie statku (jak zmienia się prędkość w momencie kiedy gracz wiska strzałkę do przodu)
	// też względem wielkości canvas
	this.acc = 0.0004;
	// 
	// 
	// Statek składa się z trzech punktów, które przechowamy jako obiekty w tablicy. Narazie obiekty są puste
	this.points = [{},{},{}];
}
// Czy statek rozbił się o skały
Ship.prototype.hitTest = function(){
	// Jeśli żaden z puntów tworzących statek nie pokrywa się z żadnym z kamieni to wszystko jest OK
	for (var i = 0; i < this.points.length; i++) {
		for(var r in Rock.all){
			if(Rock.all[r].hitTest(this.points[i].x,this.points[i].y)){
				// Jeśli się pokrywa rozwal kamien i zwróć true (co jednocześnie przerwie testowanie innych kamieni).
				Rock.all[r].remove()
				return true
			}
		}
	}
	return false
}
// Metoda, która rysuje statek
Ship.prototype.draw = function() {
	// Jeśli statek nie jest zniszczony
	if(!this.destroyed){
		// Zaczynam od sprawdzenia czy statek nie rozbił się o skały
		if(this.hitTest()){
			this.destroyed = true;
			Dot.add(this.x, this.y);
			Game.stop();
		}else{
			// sprawdź czy gracz skręca statkiem
			if(Game.key_37 || Game.key_39){
				// Dodaję lub odejmuję 7 stopni w zależności czy statek skręca w lewo czy w prawo
				this.a=this.a + 7 *(Game.key_37 ? -1 : 1)
			}
			// Jeśli gracz przyspiesza statkiem
			if(Game.key_38){
				// Znowu pomaga nam trygonometria, do tego nie możemy zejść poniżej minus maksymalna prędkość i powyżej maksymalna prędkość
				this.modX = Math.max(-this.maxMod*VAR.d, Math.min(this.maxMod*VAR.d, this.modX+Math.sin(Math.PI/180*this.a)*this.acc*VAR.d))
				this.modY = Math.max(-this.maxMod*VAR.d, Math.min(this.maxMod*VAR.d, this.modY-Math.cos(Math.PI/180*this.a)*this.acc*VAR.d))
			}else{// jeśli gracz nie wciska gazu, statek sam zwalnia
				// nowy modX to 98% poprzedniego
				this.modX = this.modX*0.98
				// jeśli wartość bezwzględna modX jest mniejsza niż 0.0001 niech modX = 0
				this.modX = Math.abs(this.modX)<0.0001 ? 0 : this.modX
				// to samo dla modY
				this.modY = this.modY*0.98
				this.modY = Math.abs(this.modY)<0.0001 ? 0 : this.modY
			}
			this.x+=this.modX
			this.y+=this.modY
			// rozpocznij rysowanie ścieżki
			Game.ctx.beginPath()
			// rysowanie poszczególnych linii
			// Mimo, że statek składa się z 3 punktów pętla odtwarza się 4 razy, bo pierwszy ruch przesuwa piórko w wybrany punkt, a dopiero kolejne iteracje rysują linię
			for (var i = 0; i < 3; i++) {
				// przypisanie aktualnego kąta (różne w zależności od rysowanego punktu)
				// dziób ma 180 stopni (i==0), rufa 50 (i==1) i -50 (i==2)
				this.tmp_a = i===0 ? this.a : (this.a+180 + (i==1 ? this.rear_a : -this.rear_a));
				// aby wychudzić statek został zmieniony promień okręgu dla rufy
				// dziub (i==0) promień = r startku, rufa (i==1 albo i==2) promień = 60% r statku
				this.tmp_r = i===0 ? this.r*1 : this.r*0.6;
				// 
				// Punkty są przechowywane w tablicy obiektów.
				// Dzięki temu będziemy mogli sprawdzić czy statek rozbił się na skałach czy nie
				//
				// Znowu przypomnienie trygonometrii.
				// Promień jest przechowywany jako wartość względna dlatego wszystko trzeba pomnożyć przez VAR.d (które jest albo szerokością albo wysokością canvas – w zależności co jest krotsze)
				// Na koniec należy dodać aktualną wartość x i odpowiednio y
				this.points[i].x = (Math.sin(Math.PI/180*this.tmp_a)*this.tmp_r*VAR.d)+this.x;
				this.points[i].y = (-Math.cos(Math.PI/180*this.tmp_a)*this.tmp_r*VAR.d)+this.y;
				// Rysowanie
				// wykorzystując notację nawiasów kwadratowych przesuwamy piórko rysując linię lub nie (nie rysujemy tylko jak i==0)
				Game.ctx[i===0?'moveTo':'lineTo'](this.points[i].x,this.points[i].y);
			}
			// ostatni odcinek linii rysuje zamknięcie ścieżki
			Game.ctx.closePath()
			Game.ctx.stroke()
			//
			// rysowanie odrzutu
			if(Game.key_38 && this.draw_thrust){
				Game.ctx.beginPath();
				this.draw_thrust = false;
				for (i = 0; i < 3; i++) {
					this.tmp_a = i!=1 ? this.a+180+(i===0 ? -this.rear_a+14 : this.rear_a-14) : this.a+180;
					this.tmp_r = i==1 ? this.r : this.r*0.5;
					Game.ctx[i===0?'moveTo':'lineTo'](
						(Math.sin(Math.PI/180*this.tmp_a)*this.tmp_r*VAR.d)+this.x,
						(-Math.cos(Math.PI/180*this.tmp_a)*this.tmp_r*VAR.d)+this.y
					);
				}
				Game.ctx.stroke();
			}else if(Game.key_38 && !this.draw_thrust){
				this.draw_thrust=true;
			}
			//
			//
			//
			// Czy statek nie wyleciał za ekran
			// Wystarczy sprawdzić trzy punkty
			// Jeśli we wszystkich punktach x jest mniejszy niż zero
			if(this.points[0].x<0 && this.points[1].x<0 && this.points[2].x<0){
				// Powiększ x o szerokość ekranu powiększoną (dwa minusy dają plus) o 90% najbardziej wystającego punktu statku
				this.x+=VAR.W-Math.min(this.points[0].x,this.points[1].x,this.points[2].x)*0.9
			}else if(this.points[0].x>VAR.W && this.points[1].x>VAR.W && this.points[2].x>VAR.W){// jeśli we wszystkich punktach x jest większy niż szerokość ekranu
				// Pomniejsz x o szerokość ekranu powiększoną o 90% odległości najbardziej wystającego punktu od prawej krawędzi ekranu
				this.x-=VAR.W-(VAR.W-Math.max(this.points[0].x,this.points[1].x,this.points[2].x))*0.9
			}
			// analogicznie dla y
			if(this.points[0].y<0 && this.points[1].y<0 && this.points[2].y<0){
				this.y+=VAR.H-Math.min(this.points[0].y,this.points[1].y,this.points[2].y)*0.9
			}else if(this.points[0].y>VAR.H && this.points[1].y>VAR.H && this.points[2].y>VAR.H){
				this.y-=VAR.H-(VAR.H-Math.max(this.points[0].y,this.points[1].y,this.points[2].y))*0.9
			}
		}
	}
}
