// Do poczytanie o getImageData
// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D#getImageData()

// Inicjuję grę dopiero po załadowaniu całej strony
window.onload = function(){
	Game.init();
}
// Obiekt, w którym będą przechowywane „podręczne” wartości
VAR = {
	fps:60,
	W:0,
	H:0,
	lastTime:0,
	lastUpdate:-1,
	rand:function(min,max){
		return Math.floor(Math.random()*(max-min+1))+min;
	}
}
// Obiekt zawierający bazowe funckje związane z grą.
// Game nie ma konstruktora, jest jedynie obiektem grupującym funkcje.
Game = {
	// init zostanie odpalone raz po załadowaniu strony.
	init:function(){
		// Tworzę canvas
		Game.canvas = document.createElement('canvas');
		// Oraz canvas, które nigdy nie będzie dodane dodomu, na którym będą testowane kolizje kamieni z pociskami i statkiem
		Game.hit_canvas = document.createElement('canvas');
		// Przypisuję kontekst 2D do zmiennej ctx, która jest właściwością obiektu Game
		Game.ctx = Game.canvas.getContext('2d');
		// oraz kontekst 2D hit_canvas
		this.hit_ctx = this.hit_canvas.getContext('2d');
		//
		// odpalam metodę obiektu Game
		Game.layout();
		// metoda layout odpali się przy każdej zmianie wielkości okna
		window.addEventListener('resize', Game.layout, false);
		// Canvas zostaje dodany do DOM
		document.body.appendChild(Game.canvas);
		// Inicjowanie statku
		Game.ship = new Ship();
		// dodaj trzy kamienie
		for (var i = 0; i < 3; i++) {
			new Rock()
		}
		// Dodanie reakcji na guziki
		window.addEventListener('keydown', Game.onKey, false);
		window.addEventListener('keyup', Game.onKey, false);
		// rozpoczęcie pętli gry
		Game.animationLoop();
	},
	// odłącz nasłuchiwanie wciśnięcia klawiszy
	stop:function(){
		window.removeEventListener('keydown', Game.onKey);
		window.removeEventListener('keyup', Game.onKey);
	},
	// 
	// Reakcje na naciskanie guzików 
	onKey:function(ev){
		// reaguj tylko jeśli zostały wciśnięte strzałka w lewo, do góry, w prawo lub spacja
		if(ev.keyCode==37 || ev.keyCode==39 || ev.keyCode==38 || ev.keyCode==32){
			// Jeśli guzik został wciśnięty i jednocześnie nie był on wciśnięty wcześniej (w obiekcie Game zapisujemy jaki guzik jest wciśnięty, zabezpieczamy się w ten sposób przed systemowym auto-powtarzaniem wciskania guzika)
			// Zamiast notacji kropkowej (np.: Game.key_39) stosuję nawiasy kwadratowe, dzięki temu nie muszę pisać długiej ifki i sprawdzać po kolei każdej możliwości
			if(ev.type=='keydown' && !Game['key_'+ev.keyCode]){
				Game['key_'+ev.keyCode] = true;
				// Jeśli została wciśnięta strzałka w lewo lub w prawo należy wyłączyć strzałkę w przeciwną stronę
				if(ev.keyCode==37){
					Game.key_39 = false;
				}else if(ev.keyCode==39){
					Game.key_37 = false;
				}else if(ev.keyCode==32){ // jeśli została wciśnięta spacja dodaj nowy pocisk
					new Bullet();
				}
			}else if(ev.type=='keyup'){// w przypadku gdy guzik został zwolniony przypisz odpowiedniej właściwości obiektu Game false
				Game['key_'+ev.keyCode] = false;
			}

		}
	},
	// Ta metoda będzie odpalana przy każdej zmianie wielkości okna
	layout:function(ev){
		// Dla łatwiejszego pisania wielkość okna zostaje przypisana do właściwości W i H obiektu VAR
		VAR.W = window.innerWidth;
		VAR.H = window.innerHeight;
		// Wiele wielkości będzie bazowało na krótszym boku wielkości okna, dlatego można od razu przypisać go do właściwości obiektu VAR
		VAR.d = Math.min(VAR.W, VAR.H);
		// Update wielkości canvas
		Game.canvas.width = VAR.W;
		Game.canvas.height = VAR.H;
		// Po zmianie wilekości canvas resetują się kolory i grubości linii, dlatego to właśnie tutaj trzeba je zawsze na nowo definiować
		Game.ctx.fillStyle = 'white';
		Game.ctx.strokeStyle = 'white';
		Game.ctx.lineWidth = 3;
		Game.ctx.lineJoin = 'round';
		//
		//
		// Hit canvas
		Game.hit_canvas.width = VAR.W;
		Game.hit_canvas.height = VAR.H;
		// Wypełnienie kamieni na hit_canvas (do testów kolizji)
		Game.hit_ctx.fillStyle = '#ff0000';
	},
	// Funkcja, która odpala się 60 razy na sekundę
	animationLoop:function(time){
		requestAnimationFrame( Game.animationLoop );
		// ograniczenie do ilości klatek zdefiniowanych w właściwości obiektu VAR (nie więcej niż VAR.fps)
		if(time-VAR.lastTime>=1000/VAR.fps){
			VAR.lastTime = time;
			//
			// oczyszczenie canvas
			Game.ctx.clearRect(0,0,VAR.W, VAR.H);
			// Rysowanie statku
			Game.ship.draw();
			// Rysowanie pocisków
			Bullet.draw();
			// Rysowanie kamieni
			Rock.draw();
			// Rysowanie kropek
			Dot.draw();
		}
	}
}