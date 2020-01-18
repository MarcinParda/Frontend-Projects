var pole = new Array(9);
var yes = new Audio("yes.wav");

for (i=1;i<10;i++)
{
	pole[i]=0;
}

var tresc_diva = ""

window.onload = start;

var ruch=0;

function start()
{
	
	for (i=1;i<10;i++)
	{
		tresc_diva = tresc_diva + '<div class="pole" id="pole'+i+'" onclick="klik('+i+');"></div>';
		if((i%3) == 0) tresc_diva = tresc_diva + '<div style="clear: both;"></div>';
	}
	
	document.getElementById("plansza").innerHTML = tresc_diva;
	
	
	var rand= Math.floor(Math.random()*2);
	
	if (rand == 1)
		tura_wroga();
}

function klik(nr)
{
	yes.play();
	document.getElementById('pole'+nr+'').innerHTML = '<img src="kolko.png" />';
	document.getElementById('pole'+nr+'').style.background = "#484";
	document.getElementById('pole'+nr+'').style.cursor = "default";
	document.getElementById('pole'+nr+'').setAttribute("onclick",";");
	pole[nr]=1;
	ruch ++;
	sprawdz();
	
	if (ruch<9)
		tura_wroga();
	sprawdz();
	
}

function tura_wroga()
{
	
	var nr= Math.floor(Math.random()*9)+1;
	
	while(pole[nr] != 0) 
		nr= Math.floor(Math.random()*9)+1;

	//blokowanie wygranej przeciwnika
	
	//poziomo
	if((pole[1]+pole[2]+pole[3])>1)
		if(pole[1]==0) nr=1;
		else if(pole[2]==0) nr=2;
			else if(pole[3]==0) nr=3;
			
	if((pole[4]+pole[5]+pole[6])>1)
		if(pole[4]==0) nr=4;
		else if(pole[5]==0) nr=5;
			else if(pole[6]==0) nr=6;
			
	if((pole[7]+pole[8]+pole[9])>1)
		if(pole[7]==0) nr=7;
		else if(pole[8]==0) nr=8;
			else if(pole[9]==0) nr=9;
			
	//pionowo
			
	if((pole[1]+pole[4]+pole[7])>1)
		if(pole[1]==0) nr=1;
		else if(pole[4]==0) nr=4;
			else if(pole[7]==0) nr=7;
			
	if((pole[5]+pole[2]+pole[8])>1)
		if(pole[2]==0) nr=2;
		else if(pole[5]==0) nr=5;
			else if(pole[8]==0) nr=8;
			
	if((pole[3]+pole[6]+pole[9])>1)
		if(pole[3]==0) nr=3;
		else if(pole[6]==0) nr=6;
			else if(pole[9]==0) nr=9;
			
	//skos
			
	if((pole[1]+pole[5]+pole[9])>1)
		if(pole[1]==0) nr=1;
		else if(pole[5]==0) nr=5;
			else if(pole[9]==0) nr=9;
			
	if((pole[3]+pole[5]+pole[7])>1)
		if(pole[3]==0) nr=3;
		else if(pole[5]==0) nr=5;
			else if(pole[7]==0) nr=7;
			
	//dokładanie zwycięskiego krzyżyka
	
	//poziomo
	if((pole[1]+pole[2]+pole[3])==-2)
		if(pole[1]==0) nr=1;
		else if(pole[2]==0) nr=2;
			else if(pole[3]==0) nr=3;
			
	if((pole[4]+pole[5]+pole[6])==-2)
		if(pole[4]==0) nr=4;
		else if(pole[5]==0) nr=5;
			else if(pole[6]==0) nr=6;
			
	if((pole[7]+pole[8]+pole[9])==-2)
		if(pole[7]==0) nr=7;
		else if(pole[8]==0) nr=8;
			else if(pole[9]==0) nr=9;
			
	//pionowo
			
	if((pole[1]+pole[4]+pole[7])==-2)
		if(pole[1]==0) nr=1;
		else if(pole[4]==0) nr=4;
			else if(pole[7]==0) nr=7;
			
	if((pole[5]+pole[2]+pole[8])==-2)
		if(pole[2]==0) nr=2;
		else if(pole[5]==0) nr=5;
			else if(pole[8]==0) nr=8;
			
	if((pole[3]+pole[6]+pole[9])==-2)
		if(pole[3]==0) nr=3;
		else if(pole[6]==0) nr=6;
			else if(pole[9]==0) nr=9;
			
	//skos
			
	if((pole[1]+pole[5]+pole[9])==-2)
		if(pole[1]==0) nr=1;
		else if(pole[5]==0) nr=5;
			else if(pole[9]==0) nr=9;
			
	if((pole[3]+pole[5]+pole[7])==-2)
		if(pole[3]==0) nr=3;
		else if(pole[5]==0) nr=5;
			else if(pole[7]==0) nr=7;
	
	
	document.getElementById('pole'+nr+'').innerHTML = '<img src="krzyzyk.png" />';
	document.getElementById('pole'+nr+'').style.background = "#844";
	document.getElementById('pole'+nr+'').style.cursor = "default";
	document.getElementById('pole'+nr+'').setAttribute("onclick",";");
	pole[nr]=-1
	ruch ++;
	
}

function sprawdz()
{
	//warunek remisu
	if (ruch==9)
		document.getElementById("plansza").innerHTML = '<span class="color: #ddd">Remis!</span></br><span class="reset" onclick="location.reload();">Spróbować jeszcze raz?</span>';
	
	//warunki wygranej
	if(pole[1]==1 && pole[2]==1 && pole[3]==1 || 
	   pole[4]==1 && pole[5]==1 && pole[6]==1 ||
	   pole[7]==1 && pole[8]==1 && pole[9]==1 ||
	   pole[1]==1 && pole[4]==1 && pole[7]==1 ||
	   pole[2]==1 && pole[5]==1 && pole[8]==1 ||
	   pole[3]==1 && pole[6]==1 && pole[9]==1 ||
	   pole[1]==1 && pole[5]==1 && pole[9]==1 ||
	   pole[3]==1 && pole[5]==1 && pole[7]==1 )
		document.getElementById("plansza").innerHTML = '<span class="color: #ddd">Wygrana!</span></br><span class="reset" onclick="location.reload();">Spróbować jeszcze raz?</span>';
	
	//warunki przegranej
	if(pole[1]==-1 && pole[2]==-1 && pole[3]==-1 || 
	   pole[4]==-1 && pole[5]==-1 && pole[6]==-1 ||
	   pole[7]==-1 && pole[8]==-1 && pole[9]==-1 ||
	   pole[1]==-1 && pole[4]==-1 && pole[7]==-1 ||
	   pole[2]==-1 && pole[5]==-1 && pole[8]==-1 ||
	   pole[3]==-1 && pole[6]==-1 && pole[9]==-1 ||
	   pole[1]==-1 && pole[5]==-1 && pole[9]==-1 ||
	   pole[3]==-1 && pole[5]==-1 && pole[7]==-1 )
		document.getElementById("plansza").innerHTML = '<span class="color: #ddd">Przegrana!</span></br><span class="reset" onclick="location.reload();">Spróbować jeszcze raz?</span>';
}