var numer= Math.floor(Math.random()*10);

var password = new Array(10);
password[0] = "BEZ PRACY NIE MA KOŁACZY";
password[1] = "Apetyt rośnie w miarę jedzenia";
password[2] = "Cel uświęca środki";
password[3] = "Co cię nie zabije to cię wzmocni";
password[4] = "Jaka praca taka płaca";
password[5] = "Jak trwoga to do Boga";
password[6] = "Lepszy wróbel w garści niż gołąb na dachu";
password[7] = "Nie chce góra przyjść do Mahometa musi Mahomet przyjść do góry";
password[8] = "Od przybytku głowa nie boli";
password[9] = "Wyśpisz się po śmierci";

var haslo = password[numer];
haslo = haslo.toUpperCase();

var dlugosc = haslo.length;
var ile_skuch = 0;

var yes = new Audio("yes.wav");
var no = new Audio("no.wav");

var haslo1 = "";

for (i=0; i<dlugosc; i++)
{
	if(haslo.charAt(i) ==" ") haslo1 = haslo1 + " ";
	else haslo1 = haslo1 + "-";
}

function wypisz_haslo()
{
	document.getElementById("plansza").innerHTML = haslo1;
}


window.onload = start;

var litery = new Array(35);

litery[0] = "A";
litery[1] = "Ą";
litery[2] = "B";
litery[3] = "C";
litery[4] = "Ć";
litery[5] = "D";
litery[6] = "E";
litery[7] = "Ę";
litery[8] = "F";
litery[9] = "G";
litery[10] = "H";
litery[11] = "I";
litery[12] = "J";
litery[13] = "K";
litery[14] = "L";
litery[15] = "Ł";
litery[16] = "M";
litery[17] = "N";
litery[18] = "Ń";
litery[19] = "O";
litery[20] = "Ó";
litery[21] = "P";
litery[22] = "Q";
litery[23] = "R";
litery[24] = "S";
litery[25] = "Ś";
litery[26] = "T";
litery[27] = "U";
litery[28] = "V";
litery[29] = "W";
litery[30] = "X";
litery[31] = "Y";
litery[32] = "Z";
litery[33] = "Ż";
litery[34] = "Ź";

function start()
{
	var tresc_diva = "";
	
	for(i=0; i<35; i++)
	{
		var element = "lit" + i;
		tresc_diva = tresc_diva + '<div onclick="sprawdz('+i+');" class="litera" id="'+element+'">'+ litery[i] +'</div>';
		if((i+1) % 7 == 0) tresc_diva = tresc_diva + '<div style="clear: both;"></div>';
	}
	
	document.getElementById("alfabet").innerHTML = tresc_diva;
	
	wypisz_haslo();
	
}


String.prototype.ustawZnak = function(miejsce, znak)
{
	if (miejsce > this.length - 1) return this.toString();
	else return this.substr(0, miejsce) + znak + this.substr(miejsce+1);
} 

function sprawdz(nr)
{
	
	var trafiona = 0;
	
	for(i=0;i<dlugosc;i++)
	{
		if(haslo.charAt(i)==litery[nr])
		{
			haslo1 = haslo1.ustawZnak(i,litery[nr]);
			trafiona = true;
		}
	}
	if(trafiona==true)
		{
			yes.play();
			var element = "lit" + nr;
			document.getElementById(element).style.background = "#050";
			document.getElementById(element).style.color = "#00c000";
			document.getElementById(element).style.border = "2px solid #00c000";
			document.getElementById(element).style.cursor = "default";
			document.getElementById(element).setAttribute("onclick",";");
			
			wypisz_haslo();
		}
	else
		{
			no.play();
			var element = "lit" + nr;
			document.getElementById(element).style.background = "#330000";
			document.getElementById(element).style.color = "#c00000";
			document.getElementById(element).style.border = "2px solid #c00000";
			document.getElementById(element).style.cursor = "default";
			document.getElementById(element).setAttribute("onclick",";");
			
			//skucha
			
			ile_skuch++;
			var obraz = "img/s"+ ile_skuch + ".jpg";
			document.getElementById("szubienica").innerHTML = '<img src="'+obraz+'" alt="" />';
		}
	
	if (ile_skuch==9)
	{
		document.getElementById("alfabet").innerHTML='Niestety przegrałeś! </br> Poprawne hasło:' + haslo + '</br></br> <span class="reset" onclick="location.reload();">JESZCZE RAZ?</span>';
	}
	
	if (haslo1==haslo)
	{
		document.getElementById("alfabet").innerHTML='Brawo wygrałeś! </br> Poprawne hasło:' + haslo + '</br></br> <span class="reset" onclick="location.reload();">JESZCZE RAZ?</span>';
	}
}

