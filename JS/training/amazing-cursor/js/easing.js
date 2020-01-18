// Wszystkie wzory bazują na wzorach Roberta Pennera (http://robertpenner.com/easing/) i zachowują klasyczne nazewnictwo.
// Ja jedynie oczyściłem kilka parametrów aby zachować czytelność.
Easing = {
	// Dwie pierwsze metowy zwracają wartość w podanym momencie trwania animacji.
	// get() zwraca wartość niecałkowitą, a getRound() zwraca zaokrągloną wartość do najbliższej liczby całkowitej.
	// 
	// type = typ easingu (easeInQuad, easeInOutQuart, easeOutExpo itd.)
	// start = wartość początkowa
	// end = wartość końcowa
	// t = aktualny moment w animacji (zazwyczaj czas, ale może być też numer klatki)
	// d = całkowity czas animacji (w tych samych jednostkach co parametr „t”)
	//
	// s (opcjonalny): o ile wartość ma przekroczyć wartość maksymalną przy Back
	// 
	get:function(type, start, end, t, d, s){
		return start+(Easing[type](Math.min(t,d),d,s)*(end-start));
	},
	getRound:function(type, start, end, t, d, s){
		return Math.round(Easing.get(type, start, end, t, d, s));
	},
	// Typy easingu
	// 
	// Schemat nazewnictwa jest prosty:
	// słowo „ease”, następnie
	// albo „In” (zwolnienie na początku)
	// albo „Out” (zwolnienie na końcu)
	// albo „InOut” (zwolnienie i na początku i na końcu)
	// następnie nazwa funkcji (Quad, Quart, Cubic itd.)
	easeInQuad: function (t, d) {
		return (t/=d)*t;
	},
	easeOutQuad: function (t, d) {
		return -(t/=d)*(t-2);
	},
	easeInOutQuad: function (t, d) {
		if ((t/=d/2) < 1) return 1/2*t*t;
		return -1/2 * ((--t)*(t-2) - 1);
	},
	easeInCubic: function (t, d) {
		return (t/=d)*t*t;
	},
	easeOutCubic: function (t, d) {
		return ((t=t/d-1)*t*t + 1);
	},
	easeInOutCubic: function (t, d) {
		if ((t/=d/2) < 1) return 1/2*t*t*t;
		return 1/2*((t-=2)*t*t + 2);
	},
	easeInQuart: function (t, d) {
		return (t/=d)*t*t*t;
	},
	easeOutQuart: function (t, d) {
		return -((t=t/d-1)*t*t*t - 1);
	},
	easeInOutQuart: function (t, d) {
		if ((t/=d/2) < 1) return 1/2*t*t*t*t;
		return -1/2 * ((t-=2)*t*t*t - 2);
	},
	easeInQuint: function (t, d) {
		return (t/=d)*t*t*t*t;
	},
	easeOutQuint: function (t, d) {
		return ((t=t/d-1)*t*t*t*t + 1);
	},
	easeInOutQuint: function (t, d) {
		if ((t/=d/2) < 1) return 1/2*t*t*t*t*t;
		return 1/2*((t-=2)*t*t*t*t + 2);
	},
	easeInSine: function (t, d) {
		return -Math.cos(t/d * (Math.PI/2));
	},
	easeOutSine: function (t, d) {
		return Math.sin(t/d * (Math.PI/2));
	},
	easeInOutSine: function (t, d) {
		return -1/2 * (Math.cos(Math.PI*t/d) - 1);
	},
	easeInExpo: function (t, d) {
		return (t==0) ? 1 : Math.pow(2, 10 * (t/d - 1));
	},
	easeOutExpo: function (t, d) {
		return (t==d) ? 1 : (-Math.pow(2, -10 * t/d) + 1);
	},
	easeInOutExpo: function (t, d) {
		if (t==0) return 0;
		if (t==d) return 1;
		if ((t/=d/2) < 1) return 1/2 * Math.pow(2, 10 * (t - 1));
		return 1/2 * (-Math.pow(2, -10 * --t) + 2);
	},
	easeInCirc: function (t, d) {
		return -(Math.sqrt(1 - (t/=d)*t) - 1);
	},
	easeOutCirc: function (t, d) {
		return Math.sqrt(1 - (t=t/d-1)*t);
	},
	easeInOutCirc: function (t, d) {
		if ((t/=d/2) < 1) return -1/2 * (Math.sqrt(1 - t*t) - 1);
		return 1/2 * (Math.sqrt(1 - (t-=2)*t) + 1);
	},
	easeInBack: function (t, d, s) {
		if (s == undefined) s = 1.70158;
		return (t/=d)*t*((s+1)*t - s);
	},
	easeOutBack: function (t, d, s) {
		if (s == undefined) s = 1.70158;
		return ((t=t/d-1)*t*((s+1)*t + s) + 1);
	},
	easeInOutBack: function (t, d, s) {
		if (s == undefined) s = 1.70158;
		if ((t/=d/2) < 1) return 1/2*(t*t*(((s*=(1.525))+1)*t - s));
		return 1/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2);
	},
	easeInBounce: function (t, d) {
		return 1 - Easing.easeOutBounce (d-t, d);
	},
	easeOutBounce: function (t, d) {
		if ((t/=d) < (1/2.75)) {
			return (7.5625*t*t);
		} else if (t < (2/2.75)) {
			return (7.5625*(t-=(1.5/2.75))*t + .75);
		} else if (t < (2.5/2.75)) {
			return (7.5625*(t-=(2.25/2.75))*t + .9375);
		} else {
			return (7.5625*(t-=(2.625/2.75))*t + .984375);
		}
	},
	easeInOutBounce: function (t, d) {
		if (t < d/2) return Easing.easeInBounce (t*2, d) * .5;
		return Easing.easeOutBounce (t*2-d, d) * .5 + .5;
	}
}