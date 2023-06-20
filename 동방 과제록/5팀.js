var context;

var canvassizex = 900;
var canvassizey = 600;

var ballsize = 30;//플레이어크기
var ballV = [6,5,4];//플레이어속도
var ballX; var ballY;

var roonum = -1;// 0 : 메인화면 1 : 난이도 조절화면 2 : 캐릭터 선택화면 3 : 시놉시스 4 : 대화문 5 : 게임
var difficulty = 0;//난이도
var charnum = 0;//직업

var rightPressed; var leftPressed; var upPressed; var downPressed;

var isAttack;
var bullets = []; var bulletV=20; var bulletsize = 20; var bulletsize2 = 50; var bulletcul=0; var parringbulletsize = 40;

var isParring;
var parringimgs = [];
for(i=1; i<=5; i++){
	var p = new Image(); p.src = './resource/parryings0'+i+'.png';
	parringimgs[i] = p;
}
var parringattackimg = new Image(); parringattackimg.src = './resource/parringattack01.png';
var parringattackimg2 = new Image();	parringattackimg2.src = './resource/parringattack02.png';
var parringattackimg3 = new Image();	parringattackimg3.src = './resource/parringattack03.png';
var parringdmg = 100;

var score = 0;

var villans = []; var villanbullets = []; var villansizex = 50; var villansizey = 75;//적크기

var bricks = [];

var charimg = new Image(); charimg.src = './resource/char'+charnum+'1.png';
var charhitimg = new Image(); charhitimg.src = './resource/char'+charnum+'1hit.png';
var chardeathimg = new Image(); chardeathimg.src = './resource/char'+charnum+'1death.png';
var charface = new Image();
var canright = false; var canleft = false; var canup = false; var candown = false;


var bulletimg = new Image(); bulletimg.src = './resource/Attack'+charnum+'.png';
var bulletdmg = 1;

var villanimg = new Image(); villanimg.src = './resource/villan01.png';
var villanhitimg = new Image(); villanhitimg.src = './resource/villan01hit.png';
var villan2img = new Image(); villan2img.src = './resource/villan02.png';
var villan2hitimg = new Image(); villan2hitimg.src = './resource/villan02hit.png';
var villanbulletimg = new Image(); villanbulletimg.src = './resource/villan01attack.png';
var villanbullet2img = new Image(); villanbullet2img.src = './resource/villan02attack.png';
var villanbullet3img = new Image(); villanbullet3img.src = './resource/villan03attack.png';

var backimg1 = new Image(); backimg1.src = './resource/background1.png';var backimg2 = new Image(); backimg2.src = './resource/background2.png';var backimg3 = new Image(); backimg3.src = './resource/background3.png';
var back1 = 600; var back2 = 1200; var backspeed=0; var culbackspeed=0;

var maxhp = 100; var curhp=100; var hp = 100; var maxmp = 100; var mp = 100; var curmp = 100;

var bosshp=1600; var curbosshp = 0; var bosssizex=50; var bosssizey=100;
boss1 = null;
var bossimg = new Image(); bossimg.src = './resource/Boss01.png';
var bosshitimg = new Image(); bosshitimg.src = './resource/Boss01hit.png';
var bossmove;

var senarionum = 0; var deathcount = 0;

var dialog=[]; 

var face3 = new Image(); face3.src = './resource/face3.png'; 

var bar = new Image();bar.src = "./resource/bar.png";
var background = new Image();background.src = "./resource/background.png";

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
var diffalpha = 0;

var villanbulletv = 1;

parringrange = [100, 85, 70];

var isdeath=false;

var bosstext = new Image(); bosstext.src = './resource/bosstext.png';
var wave1 = new Image(); wave1.src = './resource/wave1.png';
var wave2 = new Image(); wave2.src = './resource/wave2.png';
var wave3 = new Image(); wave3.src = './resource/wave3.png';
var wave4 = new Image(); wave4.src = './resource/wave4.png';
var wave5 = new Image(); wave5.src = './resource/wave5.png';

var mainaudio = new Audio("./resource/동방요요몽01-요요몽 ~ Snow or Cherry Petal.mp3"); mainaudio.loop=true;
var gameaudio = new Audio("./resource/동방요요몽02-이상향 ~ Deep Mountain.mp3"); gameaudio.loop=true;
var bossaudio = new Audio("./resource/동방요요몽18-네크로 판타지아.mp3"); bossaudio.loop=true;
var bossaudio2 = new Audio("./resource/영지의 태양신앙.mp3"); bossaudio2.loop=true;
var vol = 0.5; var curvol = 0.1;

var isFirst = true; //처음 난이도인지

var redgage = 0;

var happyimg = new Image();happyimg.src = "./resource/책상.png";

var cautionaudio = new Audio("./resource/경고.mp3"); 
var Button1 = new Audio("./resource/Button1.wav"); 
var Poweraudio = new Audio("./resource/Power.wav"); 
var Parringaudio = new Audio("./resource/Parring.mp3");
var Attackaudio = new Audio("./resource/Attack.mp3");
var Villanaudio = new Audio("./resource/villan.mp3");
var Brickaudio = new Audio("./resource/brick.mp3");


var bossdieaudio = new Audio("./resource/boss.mp3");

var bombs = [];

let character = {
	x:450,
	y:500,
	canattack:false,
	ishit:false,hitcul:0,
	draw(){
		ballX = this.x;
		ballY = this.y;

		this.hitcul-=1;
		if (this.hitcul<=5)
			this.ishit=false;

		if(this.ishit){
			context.drawImage(charimg, this.x-ballsize/2, this.y-ballsize/2,ballsize,ballsize);
			context.globalAlpha = 0.5;
			context.drawImage(charhitimg, this.x-ballsize/2, this.y-ballsize/2,ballsize,ballsize);
			context.globalAlpha = 1;
		}
		else{
			if(isdeath){
				context.drawImage(charimg, this.x-ballsize/2, this.y-ballsize/2,ballsize,ballsize);
				context.globalAlpha = 0.5;
				context.drawImage(chardeathimg, this.x-ballsize/2, this.y-ballsize/2,ballsize,ballsize);
				context.fillStyle = 'red'; context.fillRect(0, 0, canvassizex, canvassizey);
				context.globalAlpha = 1;
			}
			else{
				context.drawImage(charimg, this.x-ballsize/2, this.y-ballsize/2,ballsize,ballsize);
			}
		}



	}
}

let parrying= {
	x:450,
	y:500,
	parringnum : 1,
	parringcul : 0,
	draw(){
		this.x = ballX; this.y = ballY;
		this.parringcul-=1;

		if(this.parringcul<=0)	this.parringnum=1;


		if(isParring){
			if(this.parringcul<=0) {
				this.parringcul=50;
				Parringaudio.play();

				for (i = 0; i < bullets.length; i++){
					if(bullets[i].isbulletParring==true){
					if ((bullets[i].x-ballX)**2+(bullets[i].y-ballY)**2<=parringrange[difficulty]**2){//패링된 총알을 다시 패링
						if(bullets[i].dmg==100 && charnum!=1){
							bullets[i].dmg=200;			bullets[i].img = parringattackimg2;
							bullets[i].score = 150;
							bullets[i].dx = (ballX-bullets[i].x)/(((ballX-bullets[i].x)**2+(ballY-bullets[i].y)**2)**0.5)*6; 
							bullets[i].dy = (ballY-bullets[i].y)/(((ballX-bullets[i].x)**2+(ballY-bullets[i].y)**2)**0.5)*6; 
						}
						else if(bullets[i].dmg>=200 && charnum!=1){
							bullets[i].dmg=300;			bullets[i].img = parringattackimg3;
							bullets[i].score = 200;
							bullets[i].dx = (ballX-bullets[i].x)/(((ballX-bullets[i].x)**2+(ballY-bullets[i].y)**2)**0.5)*7; 
							bullets[i].dy = (ballY-bullets[i].y)/(((ballX-bullets[i].x)**2+(ballY-bullets[i].y)**2)**0.5)*7; 
						}
						if(bullets[i].dmg==150 && charnum==1){
							bullets[i].dmg=300;			bullets[i].img = parringattackimg2;
							bullets[i].score = 150;
							bullets[i].dx = (ballX-bullets[i].x)/(((ballX-bullets[i].x)**2+(ballY-bullets[i].y)**2)**0.5)*6; 
							bullets[i].dy = (ballY-bullets[i].y)/(((ballX-bullets[i].x)**2+(ballY-bullets[i].y)**2)**0.5)*6; 
						}
						else if(bullets[i].dmg>=300 && charnum==1){
							bullets[i].dmg=450;			bullets[i].img = parringattackimg3;
							bullets[i].score = 200;
							bullets[i].dx = (ballX-bullets[i].x)/(((ballX-bullets[i].x)**2+(ballY-bullets[i].y)**2)**0.5)*7; 
							bullets[i].dy = (ballY-bullets[i].y)/(((ballX-bullets[i].x)**2+(ballY-bullets[i].y)**2)**0.5)*7; 
						}
						
						mp+=10;
						if(charnum==2) mp+=10;
					}
				}
			}

			for (i = 0; i < villanbullets.length; i++){
					if ((villanbullets[i].x-ballX)**2+(villanbullets[i].y-ballY)**2<=parringrange[difficulty]**2 && villanbullets[i].canparring){//적 총알 패링

						let b = new bullet(); b.x=villanbullets[i].x; b.y=villanbullets[i].y; 

						b.dx = (ballX-b.x)/(((ballX-b.x)**2+(ballY-b.y)**2)**0.5)*5; 
						b.dy = (ballY-b.y)/(((ballX-b.x)**2+(ballY-b.y)**2)**0.5)*5; 
						b.dmg = parringdmg; b.img = parringattackimg; b.isbulletParring = true;
						b.sizex = parringbulletsize;
						b.sizey = parringbulletsize;
						b.score = 100;

						bullets.push(b);

						villanbullets.splice(i,1);
						i=-1;
						mp+=10;
						if(charnum==2) mp+=10;
					}
				}
			}
			if(mp>maxmp) mp=maxmp;
			if (this.parringnum<5) this.parringnum+=1;
		}

		if(charnum==1) context.drawImage(parringimgs[this.parringnum], this.x-(parringrange[difficulty]-(parringrange[difficulty]*0.04)), this.y-(parringrange[difficulty]-(parringrange[difficulty]*0.04)),(parringrange[difficulty]+(parringrange[difficulty]*0.92)),(parringrange[difficulty]+(parringrange[difficulty]*0.92)));
		else context.drawImage(parringimgs[this.parringnum], this.x-(parringrange[difficulty]-(parringrange[difficulty]*0.36)), this.y-(parringrange[difficulty]-(parringrange[difficulty]*0.36)),parringrange[difficulty]+(parringrange[difficulty]*0.28),parringrange[difficulty]+(parringrange[difficulty]*0.28));

	}
}

class bullet{
	constructor(){
		this.x=ballX;
		this.y=ballY-10;
		this.dx = 0;
		this.dy=bulletV;
		this.dmg = bulletdmg;
		this.img = bulletimg;
		this.isbulletParring = false;
		this.sizex = bulletsize; this.sizey = bulletsize;
		this.score = 0;
	}
	draw(){
		var angle = Math.atan(this.dy/this.dx) * (180.0/Math.PI);
		if(this.dx < 0.0) {
			angle += 180.0;
		} else {
			if(this.dy<0.0) angle += 360.0;
		}
		context.save();
		context.translate(this.x,this.y);
		context.rotate(angle*Math.PI/180);
		context.drawImage(this.img, -1*this.sizex/2, -1*this.sizey/2,this.sizex,this.sizey);
		context.restore();
	}
	gobomb(){
		let b = new bomb(); b.x=this.x; b.y=this.y; b.size = 10; b.color = "white"; 
		if(this.isbulletParring){
			b.size = 30;
			if(charnum != 1){
				if(this.dmg ==100) b.color = "yellow"; 
				if(this.dmg ==200) b.color = "blue"; 
				if(this.dmg ==300) b.color = "red"; 
			}
			else{
				if(this.dmg ==150) b.color = "yellow"; 
				if(this.dmg ==300) b.color = "blue"; 
				if(this.dmg ==450) b.color = "red"; 
			}
		}

		bombs.push(b);
	}
}
class bomb{
	constructor(){
		this.cursize = 0; this.x=0; this.y=0; this.size=0; this.color="yellow";
	}
	draw(){
		context.fillStyle = this.color;
		if(this.size>this.cursize){
			this.cursize+=this.size/50;
			context.globalAlpha = Math.max(0, 1-this.cursize/this.size*2);
			context.beginPath();
			context.arc(this.x, this.y, this.cursize*2, 0, Math.PI * 2, false);
			context.globalAlpha = Math.max(0, 1-this.cursize/this.size);
			context.arc(this.x, this.y, this.cursize, 0, Math.PI * 2, false);
			context.fill();
			context.globalAlpha=1;
		}
	}
}


class villan{
	constructor(){
		this.x1=0; this.x2=0;//생성위치
		this.y1=0; this.y2=0;//이동위치
		this.vx=0; this.vy=0;//이동속도
		this.hp=50;
		this.ishit=false; this.hitcul=0;
		this.attackcul = 100; this.maxattackcul = 100;
		this.attackcul2 = 50; this.maxattackcul2 = 100;
	}
	draw(){
		this.hitcul-=1; this.attackcul-=1; this.attackcul2-=1;
		if(this.hitcul<=5)	this.ishit=false;
		if(this.x1<this.x2) this.x1+=this.vx; if(this.x1>this.x2) this.x1-=this.vx;
		if(this.y1<this.y2) this.y1+=this.vy; if(this.y1>this.y2) this.y1-=this.vy;

		if(this.ishit){
			context.drawImage(villanimg, this.x1-villansizex/2, this.y1-villansizey/2,villansizex,villansizey);
			context.globalAlpha = 0.5;
			context.drawImage(villanhitimg, this.x1-villansizex/2, this.y1-villansizey/2,villansizex,villansizey);
			context.globalAlpha = 1;
		}
		else
			context.drawImage(villanimg, this.x1-villansizex/2, this.y1-villansizey/2,villansizex,villansizey);

		if(this.attackcul<=0){
			this.attackcul = this.maxattackcul;
			if(this.x1>0 &&  this.x1<canvassizex){
				var dx = (ballX-this.x1)/(((ballX-this.x1)**2+(ballY-this.y1)**2)**0.5); 
				var dy = (ballY-this.y1)/(((ballX-this.x1)**2+(ballY-this.y1)**2)**0.5); 
				this.attack(this.x1,this.y1,dx*5*villanbulletv,dy*5*villanbulletv);
			}
		}
		if(this.attackcul2<=0&& difficulty>0){
			this.attackcul2 = this.maxattackcul2;
			if(this.x1>0 &&  this.x1<canvassizex){
				var dx = (ballX-this.x1)/(((ballX-this.x1)**2+(ballY-this.y1)**2)**0.5); 
				var dy = (ballY-this.y1)/(((ballX-this.x1)**2+(ballY-this.y1)**2)**0.5); 
				this.attack2(this.x1,this.y1,dx*5*villanbulletv,dy*5*villanbulletv);
			}
		}
		if(difficulty==0){//난이도 노말
			context.fillStyle = 'red'; context.fillRect(this.x1-villansizex/2, this.y1-villansizey/2-10, this.hp, 10);
		}
	}
	attack(x,y,dx,dy){
		let vb = new villanbullet(); vb.x=x; vb.y=y; vb.dx=dx; vb.dy=dy; villanbullets.push(vb);
	}
	attack2(x,y,dx,dy){
		let vb = new villanbullet(); vb.x=x; vb.y=y; vb.dx=dx; vb.dy=dy; vb.canparring=false; villanbullets.push(vb);
	}
	gobomb(){
		let b = new bomb(); b.x=this.x1; b.y=this.y1; b.size = 50; bombs.push(b);
		var v = Villanaudio; v.play();
	}
}
class villan2{
	constructor(){
		this.x1=0; this.x2=0;//생성위치
		this.y1=0; this.y2=0;//이동위치
		this.vx=0; this.vy=0;//이동속도
		this.hp=500;
		this.ishit=false; this.hitcul=0;
		this.attackcul = 1; this.maxattackcul = 10; this.attackcul2 = 1; this.maxattackcul2 = 10;
		if(difficulty==1)	this.maxattackcul = 5;
		if(difficulty==2)	this.maxattackcul = 2;
	}
	draw(){
		this.hitcul-=1; this.attackcul-=1; this.attackcul2-=1;
		if(this.hitcul<=5)	this.ishit=false;
		if(this.x1<this.x2) this.x1+=this.vx; if(this.x1>this.x2) this.x1-=this.vx;
		if(this.y1<this.y2) this.y1+=this.vy; if(this.y1>this.y2) this.y1-=this.vy;

		if(this.ishit){
			context.drawImage(villan2img, this.x1-villansizex/2, this.y1-villansizey/2,villansizex,villansizey);
			context.globalAlpha = 0.5;
			context.drawImage(villan2hitimg, this.x1-villansizex/2, this.y1-villansizey/2,villansizex,villansizey);
			context.globalAlpha = 1;
		}
		else
			context.drawImage(villan2img, this.x1-villansizex/2, this.y1-villansizey/2,villansizex,villansizey);

		if(this.attackcul<=0){
			this.attackcul = this.maxattackcul;
			if(this.x1>0 &&  this.x1<canvassizex){
				var angle = Math.floor(Math.random() * 360);
				var dx = Math.cos(angle/(180.0/Math.PI)); 
				var dy = Math.sin(angle/(180.0/Math.PI));//각도를 벡터로 재변환


				this.attack2(this.x1,this.y1,dx*2*villanbulletv,dy*2*villanbulletv,false); 
			}
		}
		if(this.attackcul2<=0){
			this.attackcul2 = this.maxattackcul2;
			if(this.x1>0 &&  this.x1<canvassizex){
				var angle = Math.floor(Math.random() * 360);
				var dx = Math.cos(angle/(180.0/Math.PI)); var dy = Math.sin(angle/(180.0/Math.PI));//각도를 벡터로 재변환


				this.attack(this.x1,this.y1,dx*2*villanbulletv,dy*2*villanbulletv); 
			}
		}
		
		if(difficulty==0){//난이도 노말
			context.fillStyle = 'red'; context.fillRect(this.x1-villansizex/2, this.y1-villansizey/2-10, this.hp/10, 10);
		}
	}
	attack(x,y,dx,dy){
		let vb = new villanbullet(); vb.x=x; vb.y=y; vb.dx=dx; vb.dy=dy; villanbullets.push(vb);
	}
	attack2(x,y,dx,dy){
		let vb = new villanbullet(); vb.x=x; vb.y=y; vb.dx=dx; vb.dy=dy; vb.canparring=false; villanbullets.push(vb);
	}
	gobomb(){
		let b = new bomb(); b.x=this.x1; b.y=this.y1; b.size = 100; bombs.push(b);
		var v = Villanaudio; v.play();
	}
}
class villanbullet{
	constructor(){
		this.x=0; this.y=0;
		this.canparring=true;
		this.size = bulletsize;
		this.dmg = 10;
	}
	draw(){
		if(this.canparring)	context.drawImage(villanbulletimg, this.x-bulletsize/2, this.y-bulletsize/2,bulletsize,bulletsize);
		else context.drawImage(villanbullet2img, this.x-bulletsize/2, this.y-bulletsize/2,bulletsize,bulletsize);
	}
	gobomb(){
		let b = new bomb(); b.x=this.x; b.y=this.y; b.size = 30; 
		if(this.canparring) b.color="#FF00FF";
		else b.color="red";
		bombs.push(b);
	}
}
class villanbullet2{
	constructor(){
		this.x=0; this.y=0;
		this.canparring=true;
		this.size = bulletsize2;
	}
	draw(){
		context.drawImage(villanbullet2img, this.x-bulletsize2/2, this.y-bulletsize2/2,bulletsize2,bulletsize2);
	}
	gobomb(){
		let b = new bomb(); b.x=this.x; b.y=this.y; b.size = 50; b.color="red";
		bombs.push(b);
	}
}
class villanbullet3{
	constructor(){
		this.x=0; this.y=0;
		this.canparring=true;
		this.size = bulletsize2;
	}
	draw(){
		context.drawImage(villanbullet3img, this.x-bulletsize2/2, this.y-bulletsize2/2,bulletsize2,bulletsize2);
	}
	gobomb(){
		let b = new bomb(); b.x=this.x; b.y=this.y; b.size = 50; b.color="red";
		bombs.push(b);
	}
}
class boss{
	constructor(){
		this.x1=0; this.x2=0;//현재위치
		this.y1=0; this.y2=0;//이동위치
		this.vx=0; this.vy=0;//이동속도
		this.curhp=0; this.hp=bosshp;
		this.ishit=false; this.hitcul=0;
		this.attackcul = 100; this.maxattackcul = 100;
		this.canattack=false; this.seehp=false;
		this.shild = 0; this.shildcul = -10; this.isshild = false;
		this.shildalpha = 0; this.imgcul = 0;
	}
	getshild(){
		this.shild=300;
		this.isshild=true;
		this.shildcul=-100;
		Poweraudio.play();
	}
	showimg(){
		this.attackcul=360;
		this.imgcul = 1;
		this.shild=100000;
	}
	gobomb(){
		bossdieaudio.play();
		let b = new bomb(); b.x=this.x1; b.y=this.y1; b.size = 200; bombs.push(b);
	}
	draw(){
		this.hitcul-=1; this.attackcul-=1;
		if(this.hitcul<=5)	this.ishit=false;
		if(this.x1<this.x2) this.x1+=this.vx; if(this.x1>this.x2) this.x1-=this.vx;
		if(this.y1<this.y2) this.y1+=this.vy; if(this.y1>this.y2) this.y1-=this.vy;

		if(this.shildalpha<this.shild)
			this.shildalpha+=1;
		else
			this.shildalpha-=1;
		if(this.shildalpha<0)this.shildalpha=0;
		if(this.shild>0){
			if(this.imgcul==0){
				context.globalAlpha = this.shildalpha/500;
				context.beginPath();
				context.arc(this.x1, this.y1, bosssizex, 0, 2*Math.PI);
				context.fillStyle = 'red';
				context.fill();
				context.globalAlpha = 1;
			}
			else{
				context.globalAlpha = this.shildalpha/500;
				context.beginPath();
				context.arc(this.x1, this.y1, bosssizex*2, 0, 2*Math.PI);
				context.fillStyle = 'red';
				context.fill();
				context.globalAlpha = 1;
			}
		}
		else if(this.isshild){
			this.isshild=false;
			this.shildcul = 1000;
		}
		else if(!this.isshild && this.shildcul==0 && this.canattack){
			this.getshild();
		}
		if(this.shildcul>0)
			this.shildcul-=1;
		if(this.shildcul<=-100 && this.shildcul>=-800){
			this.shild = 300;
			context.globalAlpha = 1-this.shildcul/-800;
			context.drawImage(face3, canvassizex-800, canvassizey+this.shildcul,800,800);
			context.globalAlpha = 1;
			this.shildcul-=4;
		}
		if(this.imgcul>0){
			context.globalAlpha = 1-this.imgcul/1200;
			context.drawImage(face3, -180, canvassizey-this.imgcul+150,1000,1000);
			context.globalAlpha = 1;

			if(this.attackcul>=0){
				var dx = Math.cos(this.attackcul/2/(180.0/Math.PI)); var dy = Math.sin(this.attackcul/2/(180.0/Math.PI));//각도를 벡터로 재변환
				this.attack3(this.x1+dx*50,this.y1+dy*60,dx/2,dy/2,false);

				var dx = Math.cos((this.attackcul+360)/2/(180.0/Math.PI)); var dy = Math.sin((this.attackcul+360)/2/(180.0/Math.PI));//각도를 벡터로 재변환
				this.attack3(this.x1+dx*50,this.y1+dy*60,dx/2,dy/2,false);
			}
			else
				this.attackcul=720;


		}
		if(this.imgcul>0 && this.imgcul<1000){
			this.imgcul+=5;
		}

		if(this.ishit){
			context.drawImage(bossimg, this.x1-bosssizex/2, this.y1-bosssizey/2,bosssizex,bosssizey);
			context.globalAlpha = 0.5;
			context.drawImage(bosshitimg, this.x1-bosssizex/2, this.y1-bosssizey/2,bosssizex,bosssizey);
			context.globalAlpha = 1;
		}
		else
			context.drawImage(bossimg, this.x1-bosssizex/2, this.y1-bosssizey/2,bosssizex,bosssizey);

		if(this.attackcul<=0 && this.canattack){
			this.attackcul = this.maxattackcul;
			if(this.x1>0 && this.x1<canvassizex){
				var dx = (ballX-this.x1)/(((ballX-this.x1)**2+(ballY-this.y1)**2)**0.5); 
				var dy = (ballY-this.y1)/(((ballX-this.x1)**2+(ballY-this.y1)**2)**0.5);

				var angle = Math.atan(dy/dx) * (180.0/Math.PI);//벡터를 각도로 변환
				if(dx < 0.0)	angle += 180.0;
				else if(dy<0.0) angle += 360.0;

				var angle1 = angle+30; var angle2 = angle-30;
				//console.log(angle);
				var dx1 = Math.cos(angle1/(180.0/Math.PI)); var dy1 = Math.sin(angle1/(180.0/Math.PI));//각도를 벡터로 재변환
				var dx2 = Math.cos(angle2/(180.0/Math.PI)); var dy2 = Math.sin(angle2/(180.0/Math.PI));


				if(difficulty>0){
					this.attack2(this.x1,this.y1,dx*2*villanbulletv,dy*2*villanbulletv,false); 
					this.attack2(this.x1,this.y1,dx1*2*villanbulletv,dy1*2*villanbulletv,false);
					this.attack2(this.x1,this.y1,dx2*2*villanbulletv,dy2*2*villanbulletv,false);
				}
				if(difficulty==2){
					var angle1 = angle+60; var angle2 = angle-60;
					var dx1 = Math.cos(angle1/(180.0/Math.PI)); var dy1 = Math.sin(angle1/(180.0/Math.PI));//각도를 벡터로 재변환
					var dx2 = Math.cos(angle2/(180.0/Math.PI)); var dy2 = Math.sin(angle2/(180.0/Math.PI));
					this.attack2(this.x1,this.y1,dx1*2*villanbulletv,dy1*2*villanbulletv,false);
					this.attack2(this.x1,this.y1,dx2*2*villanbulletv,dy2*2*villanbulletv,false);
				}

				if(difficulty<1){
					for (i = 0; i < 12; i++){
						dx = Math.cos(i*30/(180.0/Math.PI)); dy = Math.sin(i*30/(180.0/Math.PI));
						this.attack(this.x1,this.y1,dx*villanbulletv,dy*villanbulletv,true);
					}
				}
				else{
					for (i = 0; i < 24; i++){
						dx = Math.cos(i*15/(180.0/Math.PI)); dy = Math.sin(i*15/(180.0/Math.PI));
						this.attack(this.x1,this.y1,dx*villanbulletv,dy*villanbulletv,true);
					}
				}
			}
		}

		if(this.attackcul==this.maxattackcul/2 && this.canattack && difficulty==2){
			if(this.x1>0 && this.x1<canvassizex){

				for (i = 0; i < 24; i++){
					dx = Math.cos((i*15+7.5)/(180.0/Math.PI)); dy = Math.sin((i*15+7.5)/(180.0/Math.PI));
					this.attack(this.x1,this.y1,dx*villanbulletv,dy*villanbulletv,false);
				}
				
			}
		}
		if(this.seehp){
			if(this.curhp<this.hp-2)	this.curhp+=2;
			else if(this.curhp>this.hp)	this.curhp-=2;
			if(this.hp<0)this.hp=0; if(this.curhp<0)this.curhp=0;
			context.globalAlpha = 0.5;
			context.fillStyle = 'red'; context.fillRect(50, 10, this.hp/2, 10);
			context.fillStyle = 'red'; context.fillRect(50, 10, this.curhp/2, 10);
			context.globalAlpha = 1;
		}
	}
	attack(x,y,dx,dy,isparring){
		let vb = new villanbullet(); vb.x=x; vb.y=y; vb.dx=dx; vb.dy=dy; vb.canparring=isparring; villanbullets.push(vb);
	}
	attack2(x,y,dx,dy,isparring){
		let vb = new villanbullet2(); vb.x=x; vb.y=y; vb.dx=dx; vb.dy=dy; vb.canparring=isparring; vb.dmg=10; villanbullets.push(vb);
	}
	attack3(x,y,dx,dy,isparring){
		let vb = new villanbullet3(); vb.x=x; vb.y=y; vb.dx=dx; vb.dy=dy; vb.canparring=isparring; vb.dmg=50; villanbullets.push(vb);
	}
}
class brick{
	constructor(){
		this.x=0; this.y=0;
		this.width=0; this.height=0;
		this.hp=100;
		this.ishit=false; this.hitcul=0;
		this.color = "green"; this.alpha=0; this.fullalpha=0.7;
	}
	draw(){
		if (this.alpha<this.fullalpha)	this.alpha+=0.01;
		else this.alpha-=0.01;
		if(this.alpha<0) this.alpha=0;
		if(this.alpha<=0) this.hp=0;
		this.hitcul-=1; 
		if(this.hitcul<=5)	this.ishit=false;

		context.fillStyle = this.color;
		if(!this.ishit)
		{
			context.globalAlpha = this.alpha;
			context.fillRect(this.x, this.y, this.width, this.height); 
			context.globalAlpha = 1;
		}
		else{
			context.fillRect(this.x, this.y, this.width, this.height); 
		}
	}
	gobomb(){
		if(this.alpha>0){
			let b = new bomb(); b.x=this.x+this.width/2; b.y=this.y+this.height/2; b.size = 50; b.color=this.color;

			bombs.push(b);
			var v = Brickaudio; v.play();
		}
	}
}


window.onload = function(){init();}

function init(){
	context = document.getElementById('canvas').getContext('2d');
	drawstart();
	volstart();
}
function volstart(){
	if(vol>curvol) curvol+=0.1; if(vol<curvol) curvol-=0.1;
	if(curvol<0) curvol=0;
	mainaudio.volume = curvol;
	gameaudio.volume = curvol;
	bossaudio.volume = curvol; bossaudio2.volume = curvol;
	setTimeout(volstart,100);
}

var buttonnum = 0;

function drawstart() {
	var startback = new Image();
	startback.src = 'resource/start_back_img.png';

    var fadeOpacity = 0; // 초기 투명도 값
    var fadeSpeed = 0.15; // 페이드 속도
    var fadeInInterval;
    var fadeOutInterval;

    startback.onload = function() {
    	context.clearRect(0, 0, canvassizex, canvassizey);
    	context.drawImage(startback, 0, 0, canvassizex, canvassizey);
    	fadeInInterval = setInterval(fadeInEffect, 100);
    };

    function fadeInEffect() {
    	context.clearRect(0, 0, canvassizex, canvassizey);
    	context.drawImage(startback, 0, 0, canvassizex, canvassizey);

    	context.font = "normal normal 35px sans-serif";
    	context.fillStyle = 'rgba(255, 0, 0, ' + fadeOpacity + ')';
    	context.fillText("- Press Z to Start -", 300, 425);

    	if (fadeOpacity < 1) {
            fadeOpacity += fadeSpeed; // 페이드인
        } else {
        	clearInterval(fadeInInterval);
        	fadeOutInterval = setInterval(fadeOutEffect, 100);
        }
    }

    function fadeOutEffect() {
    	context.clearRect(0, 0, canvassizex, canvassizey);
    	context.drawImage(startback, 0, 0, canvassizex, canvassizey);

    	context.font = "normal normal 35px sans-serif";
    	context.fillStyle = 'rgba(255, 0, 0, ' + fadeOpacity + ')';
    	context.fillText("- Press Z to Start -", 300, 425);

    	if (fadeOpacity > 0) {
            fadeOpacity -= fadeSpeed; // 페이드아웃
        } else {
        	clearInterval(fadeOutInterval);
        	fadeInInterval = setInterval(fadeInEffect, 100);
        }
    }

    document.addEventListener('keydown', handleKeyDown); //z에 대한 키 입력 이벤트 리스너 추가

    function handleKeyDown(event) {
        if (event.key === 'z' || event.key === 'Z') { //z를 누르면 페이드인, 페이드 아웃 이벤트 제거
        	clearInterval(fadeInInterval);
        	clearInterval(fadeOutInterval);
            document.removeEventListener('keydown', handleKeyDown); // 키 입력 이벤트 리스너 제거
        }
    }
}

var char2 = new Image(); char2.src='./resource/char11.png';
var char3 = new Image(); char3.src='./resource/char21.png';
function drawmain() {
	var startback = new Image();
	startback.src = 'resource/start_back_img.png';

	context.clearRect(0, 0, canvassizex, canvassizey);
	context.drawImage(startback, 0, 0, canvassizex, canvassizey);
	context.textAlign = "center";

	context.font = "normal normal 25px sans-serif";
	context.fillStyle = 'white';
	context.fillText("게임시작", 450, 350);
	context.fillText("게임방법", 450, 450);
	context.fillText("게임종료", 450, 550);

	if (buttonnum == 0) {
		context.font = "bold 25px sans-serif";
		context.fillStyle = 'red';
		context.fillText("게임시작", 450, 350);
	} else if (buttonnum == 1) {
		context.font = "bold 25px sans-serif";
		context.fillStyle = 'red';
		context.fillText("게임방법", 450, 450);
	} else if (buttonnum == 2) {
		context.font = "bold 25px sans-serif";
		context.fillStyle = 'red';
		context.fillText("게임종료", 450, 550);
	}
}
var bullet2 = new Image(); bullet2.src="resource/Attackp.png";

var guide1 = new Image(); guide1.src = "resource/guide1.png";
var guide2 = new Image(); guide2.src = "resource/guide2.png";
var guide3 = new Image(); guide3.src = "resource/guide3.png";

function drawguide() {
	context.clearRect(0, 0, canvassizex, canvassizey);
	if(buttonnum==0)	context.drawImage(guide1, 0, 0, canvassizex, canvassizey);
	if(buttonnum==1)	context.drawImage(guide2, 0, 0, canvassizex, canvassizey);
	if(buttonnum==2)	context.drawImage(guide3, 0, 0, canvassizex, canvassizey);
}

function drawdiff(){
	var easy = new Image();//적 체력바 표시,웨이브마다 hp,mp회복,  보스 패턴 약화
	easy.src = "resource/쉬움.png";
	var normal = new Image();//적 총알 속도 1.5배,추가총알 소모량 증가 
	normal.src = "resource/보통.png";
	var hard = new Image();//적 총알 속도 2배 mp소모량 증가 보스 패턴강화 보스 발악패턴
	hard.src = "resource/어려움.png";
	var backimage = new Image();
	backimage.src = "resource/diff_back_img.png";
	var title = new Image();
	title.src = "resource/난이도선택.png";

	backimage.onload = function() {
		context.clearRect(0, 0, canvassizex, canvassizey);
		context.drawImage(backimage, 0, 0, canvassizex, canvassizey);
		context.drawImage(title, 25, 25)
		context.drawImage(easy, 500, 125);
		context.drawImage(normal, 300, 275);
		context.drawImage(hard, 100, 425);

		if (buttonnum == 0) {
			var enlargedWidth = easy.width * 1.2;
			var enlargedHeight = easy.height * 1.2;
			var x = 500 - (enlargedWidth - easy.width) / 2;
			var y = 125 - (enlargedHeight - easy.height) / 2;
			easy.src = "resource/쉬움선택.png";
			easy.onload = function() {
				context.drawImage(easy, x, y, enlargedWidth, enlargedHeight);
			};
		} 
		else if (buttonnum == 1) {
			var enlargedWidth = normal.width * 1.2;
			var enlargedHeight = normal.height * 1.2;
			var x = 300 - (enlargedWidth - normal.width) / 2;
			var y = 275 - (enlargedHeight - normal.height) / 2;
			normal.src = "resource/보통선택.png";
			normal.onload = function() {
				context.drawImage(normal, x, y, enlargedWidth, enlargedHeight);
			};
		} 
		else if (buttonnum == 2) {
			var enlargedWidth = hard.width * 1.2;
			var enlargedHeight = hard.height * 1.2;
			var x = 100 - (enlargedWidth - hard.width) / 2;
			var y = 425 - (enlargedHeight - hard.height) / 2;
			hard.src = "resource/어려움선택.png";
			hard.onload = function() {
				context.drawImage(hard, x, y, enlargedWidth, enlargedHeight);
			};
		}
	};
}
var char_back_img = new Image(); char_back_img.src = "resource/char_back_img.png"
var charimg0 = new Image(); charimg0.src = "resource/face00.png"
var charimg1 = new Image(); charimg1.src = "resource/face01.png"
var charimg2 = new Image(); charimg2.src = "resource/face02.png"

function drawchar(){
	var title = new Image();
	var job = new Image();
	title.src = "resource/직업선택.png";
	title.onload = function() {
		context.clearRect(0,0,canvassizex,canvassizey);
		context.drawImage(char_back_img, 0, 0, canvassizex, canvassizey);
		context.drawImage(title, 25, 25);

		context.fillStyle = 'black';
		context.strokeRect(50, 175, 375, 400); 
		context.globalAlpha=0.8;
		context.fillRect(50, 175, 375, 400);

		context.font = "normal bold 25px times-new-roman";
		context.fillStyle = 'black';
		context.fillText("전사", 530, 57);
		context.fillText("마법사", 640, 57);
		context.fillText("궁수", 750, 57);
		context.strokeText("전사", 530, 57);
		context.strokeText("마법사", 640, 57);
		context.strokeText("궁수", 750, 57);

		if(buttonnum==0){
			job.src = "resource/전사선택.png";
			job.onload = function() {
				context.drawImage(charimg0, canvassizex-600, 50, 700, 700);
				context.drawImage(job, 50, 175, 375, 400);
				context.fillRect(490, 25, 80, 50);
				context.fillStyle = 'white';
				context.fillText("전사", 530, 57);
			};
		}
		else if(buttonnum==1){
			job.src = "resource/마법사선택.png";
			job.onload = function() {
				context.drawImage(charimg1, canvassizex-600, 50, 700, 700);
				context.drawImage(job, 50, 175, 375, 400);
				context.fillRect(600, 25, 80, 50);
				context.fillStyle = 'white';
				context.fillText("마법사", 640, 57);
			};
		}	
		else if(buttonnum==2){
			job.src = "resource/궁수선택.png";
			job.onload = function() {
				context.drawImage(charimg2, canvassizex-600, 50, 700, 700);
				context.drawImage(job, 50, 175, 375, 400);
				context.fillRect(710, 25, 80, 50);
				context.fillStyle = 'white';
				context.fillText("궁수", 750, 57);
			};
		}
	};
}

function drawsynopsis() {
	var backimage = new Image();
	backimage.src = "resource/synopsis.png";
	var fadeInInterval, fadeOutInterval;
	var fadeOpacity = 0;
	var fadeSpeed = 0.15;

	backimage.onload = function() {
		context.clearRect(0, 0, canvassizex, canvassizey);
		context.drawImage(backimage, 0, 0, 900, 600);
		fadeInInterval = setInterval(fadeInEffect, 100);
	};

	function fadeInEffect() {
		context.clearRect(0, 0, canvassizex, canvassizey);
		context.drawImage(backimage, 0, 0, 900, 600);

		context.font = "normal normal 35px sans-serif";
		context.fillStyle = 'rgba(255, 0, 0, ' + fadeOpacity + ')';
		context.fillText("- Press Z to Start -", 450, 533);

		if (fadeOpacity < 1) {
            fadeOpacity += fadeSpeed; // Fade-in
        } else {
        	clearInterval(fadeInInterval);
        	fadeOutInterval = setInterval(fadeOutEffect, 100);
        }
    }

    function fadeOutEffect() {
    	context.clearRect(0, 0, canvassizex, canvassizey);
    	context.drawImage(backimage, 0, 0, 900, 600);

    	context.font = "normal normal 35px sans-serif";
    	context.fillStyle = 'rgba(255, 0, 0, ' + fadeOpacity + ')';
    	context.fillText("- Press Z to Start -", 450, 533);

    	if (fadeOpacity > 0) {
            fadeOpacity -= fadeSpeed; // Fade-out
        } else {
        	clearInterval(fadeOutInterval);
        	fadeInInterval = setInterval(fadeInEffect, 100);
        }
    }

    document.addEventListener('keydown', handleKeyDown); // Add keydown event listener for 'Z' key

    function handleKeyDown(event) {
        if (event.key === 'z' || event.key === 'Z') { // If 'Z' key is pressed, clear fade-in and fade-out intervals
        	clearInterval(fadeInInterval);
        clearInterval(fadeOutInterval);
            document.removeEventListener('keydown', handleKeyDown); // Remove keydown event listener
        }
    }
}

function drawdialog(){
	context.font = "normal bold 20px sans-serif" ; context.fillStyle = "white"; context.strokeStyle = 'black';	context.textAlign = "center";
	if (dialog[0][0]=="1"){
		context.globalAlpha = 0.5;
		context.drawImage(charface, 0, canvassizey-400,800,400);
		context.globalAlpha = 1;
	}

	if (dialog[0][1]=="1"){
		context.globalAlpha = 0.5;
		context.drawImage(face3, canvassizex-600, canvassizey-500,800,800);
		context.globalAlpha = 1;
	}
	if (dialog[0][1]=="2")
		context.drawImage(face3, canvassizex-600, canvassizey-500,800,800);
	if (dialog[0][0]=="2")
		context.drawImage(charface, 0, canvassizey-400,800,400);



	context.fillStyle = 'white'; context.fillRect(100, 450, 700, 120); 
	context.fillStyle = 'black'; context.strokeRect(100, 450, 700, 120);
	context.fillText(dialog[0].slice(3), 450, 520);
	context.font = "normal normal 20px sans-serif" ;


	context.fillStyle = 'red';	context.fillText("스킵 : Enter", 800, 50);
}

var back1=-1200; var back2=-1200; var back3=-1200;


function drawgame(){
	context.clearRect(0,0,canvassizex,canvassizey);
	back1+=1*backspeed; back2+=2*backspeed; back3+=3*backspeed;
	if (culbackspeed>backspeed) backspeed+=0.01;  else if (culbackspeed<backspeed) backspeed-=0.01; 
	if (back1>=0) {back1=-1200;} if (back2>=0) {back2=-1200;} if (back3>=0) {back3=-1200;}//배경이 끝까지 내려오면 다시 위로보냄
	context.drawImage(backimg1, 0, back1,900,1800); context.drawImage(backimg2, 0, back2,900,1800); context.drawImage(backimg3, 0, back3,900,1800);//무한배경생성

	context.globalAlpha = redgage/2;
	context.fillStyle = 'red'; context.fillRect(0, 0, canvassizex, canvassizey);

	context.globalAlpha = 1;

	if(senarionum==2)
		context.drawImage(wave1, 800,550,100,50);
	if(senarionum==3)
		context.drawImage(wave2, 800,550,100,50);
	if(senarionum==4)
		context.drawImage(wave3, 800,550,100,50);
	if(senarionum==5)
		context.drawImage(bosstext, 800,550,100,50);
	if(senarionum==6)
		context.drawImage(bosstext, 800,550,100,50);

	canright = true; canleft = true; canup = true; candown = true;
	for (i = 0; i < bricks.length; i++){
		if (character.x+ballV[difficulty]+ballsize/2>=bricks[i].x && character.x+ballV[difficulty]+ballsize<=bricks[i].x+bricks[i].width && character.y>=bricks[i].y && character.y<=bricks[i].y+bricks[i].height)	canright = false;
		if (character.x-ballV[difficulty]-ballsize/2>=bricks[i].x && character.x-ballV[difficulty]-ballsize/2<=bricks[i].x+bricks[i].width && character.y>=bricks[i].y && character.y<=bricks[i].y+bricks[i].height)	canleft = false;
		if (character.x>=bricks[i].x && character.x<=bricks[i].x+bricks[i].width && character.y-ballV[difficulty]-ballsize/2>=bricks[i].y && character.y-ballV[difficulty]-ballsize/2<=bricks[i].y+bricks[i].height)	canup = false;
		if (character.x>=bricks[i].x && character.x<=bricks[i].x+bricks[i].width && character.y+ballV[difficulty]+ballsize/2>=bricks[i].y && character.y+ballV[difficulty]+ballsize/2<=bricks[i].y+bricks[i].height)	candown = false;
	}

	if(rightPressed && character.x <canvassizex-ballsize/4 && canright){character.x+=ballV[difficulty];}//캐릭터 이동
	if(leftPressed && character.x >ballsize/4 && canleft){character.x-=ballV[difficulty];}
	if(upPressed && character.y > ballsize/4 && canup){character.y-=ballV[difficulty];}
	if(downPressed && character.y < canvassizey-ballsize/4&& candown){character.y+=ballV[difficulty];}

	if(setburest != null && boss1){
		var dx = (boss1.x1-character.x)/(((boss1.x1-character.x)**2+(boss1.y1-character.y)**2)**0.5); 
		var dy = (boss1.y1-character.y)/(((boss1.x1-character.x)**2+(boss1.y1-character.y)**2)**0.5); 

		character.x+=dx;	character.y+=dy;

	}

	character.draw();//캐릭터 생성
	parrying.draw();
	if(isAttack && bulletcul<=0 && character.canattack && mp>0 && hp>0){//총알생성
		for(i=-10; i<20; i+=10){
			let b = new bullet();	b.x+=i; b.score = 1; bullets.push(b);
		}
		bulletcul=15;
		mp-=2+3*difficulty;
		Attackaudio.currentTime=0;
		Attackaudio.play();
	}
	bulletcul-=2;


	for (i = 0; i < bullets.length; i++){
		var ishit = false;
		if (bullets[i].y<0 || bullets[i].y>canvassizey || bullets[i].x>canvassizex || bullets[i].x<0){//총알이 맵 끝까지 가면 제거
			if(bullets[i].isbulletParring==false){
				bullets.splice(i,1);
				i=-1;
				continue;
			}
			else{
				if(bullets[i].y<0) {bullets[i].dy =  -1*Math.abs(bullets[i].dy)};
				if(bullets[i].y>canvassizey) {bullets.splice(i,1);	i=-1;	continue;};
				if(bullets[i].x<0) {bullets[i].dx =  -1*Math.abs(bullets[i].dx)};
				if(bullets[i].x>canvassizex) {bullets[i].dx =  Math.abs(bullets[i].dx)};
			}
		}

		for (j = 0; j < villans.length; j++){
			if ((bullets[i].x-villans[j].x1)**2+(bullets[i].y-villans[j].y1)**2<=villansizex**2){//적과 총알의 거리 계산
				villans[j].hp-=bullets[i].dmg;//거리가 가까우면 체력깎음
				score += bullets[i].score*(difficulty+1);
				if (villans[j].hitcul<=0){
					villans[j].hitcul = 10;
					villans[j].ishit=true;
				}
				ishit=true;
				continue;
			}
		}
		if (boss1 && !ishit &&((bullets[i].x-boss1.x1)**2+(bullets[i].y-boss1.y1)**2<=villansizex**2)){//적과 총알의 거리 계산
			if (boss1.shild>0){
				if(bullets[i].isbulletParring)
					boss1.shild-=bullets[i].dmg;
			}
			else{
				boss1.hp-=bullets[i].dmg;//거리가 가까우면 체력깎음
				score += bullets[i].score*2*(difficulty+1);
				if (boss1.hitcul<=0){
					boss1.hitcul = 10;
					boss1.ishit=true;
				}
			}
			
			ishit=true;
		}

		for (j = 0; j < bricks.length; j++){
			if ((bullets[i].x>=bricks[j].x)&&(bullets[i].x<=bricks[j].x+bricks[j].width)&&(bullets[i].y>=bricks[j].y)&&(bullets[i].y<=bricks[j].y+bricks[j].height)){//벽돌과 총알의 거리 계산
				if(bullets[i].isbulletParring){
					if (bricks[j].hitcul<=0){
						bricks[j].hitcul = 10;
						bricks[j].ishit=true;
					}
					var a = bullets[i].x-bricks[j].x; var b = bricks[j].x+bricks[j].width-bullets[i].x; var c = bullets[i].y-bricks[j].y; var d = bricks[j].y+bricks[j].height-bullets[i].y;
					if(a==Math.min(a,b,c,d) || b==Math.min(a,b,c,d))
						bullets[i].dx*=-1;
					if(c==Math.min(a,b,c,d) || d==Math.min(a,b,c,d))
						bullets[i].dy*=-1;
					bricks[j].hp-=bullets[i].dmg;
					if (bricks[j].hp<=0) 
					{
						if (bricks[j].color == "green") 
						{
							score += 100;
						}
						else if (bricks[j].color == "blue") 
						{
							score += 200;
						}
						else if (bricks[j].color == "red") 
						{
							score += 300;
						}
					}
				}
				else
					ishit=true;
				continue;
			}
		}
		if(ishit==false){//적 맞혓으면 총알제거
			bullets[i].y-=bullets[i].dy; bullets[i].x-=bullets[i].dx;
			bullets[i].draw();
		}
		else{
			bullets[i].gobomb();
			bullets.splice(i,1);
			i=-1;
		}
	}
	for (i = 0; i < villans.length; i++){//적 생성
		if(villans[i].hp<=0){
			villans[i].gobomb();
			deathcount-=1;
			villans.splice(i,1);
			i=-1;
			continue;
		}
		villans[i].draw();
	}
	for (i = 0; i < bricks.length; i++){//벽돌 생성
		if(bricks[i].hp<=0){
			bricks[i].gobomb();
			bricks.splice(i,1);
			i=-1;
			continue;
		}
		bricks[i].draw();
	}
	for (i = 0; i < villanbullets.length; i++){
		var ishit = false;
		if (villanbullets[i].y>canvassizey*2 || villanbullets[i].y<-1*canvassizey || villanbullets[i].x>canvassizex*2 || villanbullets[i].x<-1*canvassizex){//총알이 맵 끝까지 가면 제거
			villanbullets.splice(i,1);
			i=-1;
			continue;
		}
		if(!isdeath)
		if ((villanbullets[i].x-ballX)**2+(villanbullets[i].y-ballY)**2<=(villanbullets[i].size/2)**2){//캐릭터와 적총알의 거리 계산
			if (character.hitcul<=0){
				character.hitcul = 20;
					hp-=villanbullets[i].dmg;//거리가 가까우면 체력깎음
					character.ishit=true;
				}
				ishit=true;
			}
			if(setburest){
			if (boss1 && (villanbullets[i].x-boss1.x2)**2+(villanbullets[i].y-boss1.y2)**2<=(villanbullets[i].size)**2){//광폭화시
				if (boss1.hitcul<=0){
					boss1.hitcul = 10;
					boss1.ishit=true;
				}
				boss1.hp-=1.5;
				ishit=true;
			}
		}
		if(ishit==false){//캐릭터 맞혓으면 총알제거
			villanbullets[i].x+=villanbullets[i].dx; villanbullets[i].y+=villanbullets[i].dy;
			villanbullets[i].draw();
		}
		else{
			villanbullets[i].gobomb();
			villanbullets.splice(i,1);
			i=-1;
		}
	}
	for (i = 0; i < bombs.length; i++){
		if(bombs[i].cursize>=bombs[i].size){
			bombs.splice(i,1);
			i-=1;
		}
		else
			bombs[i].draw();
	}

	if(hp>curhp) curhp+=1; if(hp<curhp) curhp-=1; if(mp>curmp) curmp+=1; if(mp<curmp) curmp-=1;

	context.globalAlpha = 0.5;
	context.fillStyle = 'black'; context.strokeRect(50, canvassizey-50, maxhp, 10);//체력바 생성
	context.fillStyle = 'white'; context.fillRect(50, canvassizey-50, maxhp, 10);
	context.fillStyle = 'red'; context.fillRect(50, canvassizey-50, hp, 10);
	context.fillStyle = 'red'; context.fillRect(50, canvassizey-50, curhp, 10);

	context.fillStyle = 'black'; context.strokeRect(50, canvassizey-30, maxmp, 10);//총알바 생성
	context.fillStyle = 'white'; context.fillRect(50, canvassizey-30, maxmp, 10);
	context.fillStyle = 'blue'; context.fillRect(50, canvassizey-30, mp, 10);
	context.fillStyle = 'blue'; context.fillRect(50, canvassizey-30, curmp, 10);

	if(hp<0) hp=0; if(mp<0) mp=0;
	if(hp==0 && !isdeath){isdeath = true; setTimeout(recurssion,5000); ballV[difficulty]/=2;}
	context.globalAlpha = 1;

	if(diffalpha>0){
		if(diffalpha>500)
			context.globalAlpha = (1000-diffalpha)/500;
		else
			context.globalAlpha = 1-(500-diffalpha)/500;
		diffalpha-=5;
		context.font = "normal normal 50px times-new-roman";
		context.fillStyle = 'white'; context.fillRect(canvassizex/2-150, canvassizey/2-50, 300, 100);
		context.fillStyle = 'black';
		if(difficulty==0)	context.fillText("EASY", canvassizex/2, canvassizey/2+20);
		if(difficulty==1)	context.fillText("NORMAL", canvassizex/2, canvassizey/2+20);
		if(difficulty==2)	context.fillText("HARD", canvassizex/2, canvassizey/2+20);
		context.globalAlpha = 1;
	}
	context.font = "normal normal 20px times-new-roman";
	context.fillStyle = "black";
	context.fillText("score: " + score, 80, 50);
	id = setTimeout(drawgame,10); 
	if(boss1){
		boss1.draw();
	}

	if(happy) context.drawImage(happyimg, 0, 0,canvassizex,canvassizey);

	if(whitegage>curwhitegage) curwhitegage+=0.01; if(whitegage<curwhitegage) curwhitegage-=0.01;
	if(curwhitegage<0)curwhitegage=0;
	context.globalAlpha = curwhitegage;
	context.fillStyle = 'white'; context.fillRect(0, 0, canvassizex, canvassizey);
	context.globalAlpha = 1;



	if(dialog.length>0){
		drawdialog();
	}
}



function recurssion(){
	isdeath=false;
	hp = maxhp/2;
	ballV[difficulty]*=2;
}


function SenarioManager(){
	if(senarionum==0){
		setTimeout(Senario1,1000);
		//setTimeout(Senario5,1000);
		diffalpha = 1000;
		deathcount=100;
		senarionum=1;
		//senarionum=5;
	}
	else if(senarionum==1){
		if(deathcount==0){
			setTimeout(Senario2,1000);
			senarionum+=1;
			deathcount = 3;
		}
	}
	else if(senarionum==2){
		if(deathcount==0){
			for(i=0; i<villanbullets.length; i++)
				villanbullets[i].gobomb();
			for(i=0; i<bullets.length; i++)
				bullets[i].gobomb();
			villanbullets = []; bullets = [];
			for(i=0; i<bricks.length; i+=1)
				bricks[i].fullalpha = 0;
			setTimeout(Senario3,2000);
			senarionum+=1;
			deathcount = 5;
		}
	}
	else if(senarionum==3){
		if(deathcount==0){
			for(i=0; i<villanbullets.length; i++)
				villanbullets[i].gobomb();
			for(i=0; i<bullets.length; i++)
				bullets[i].gobomb();
			bullets = [];
			villanbullets = [];
			for(i=0; i<bricks.length; i+=1)
				bricks[i].fullalpha = 0;
			setTimeout(Senario4,1000);
			senarionum=4;
			deathcount = 1;
		}
	}
	else if(senarionum==4){
		if(deathcount==0){
			for(i=0; i<villanbullets.length; i++)
				villanbullets[i].gobomb();
			for(i=0; i<bullets.length; i++)
				bullets[i].gobomb();
			villanbullets = []; bullets = [];
			for(i=0; i<bricks.length; i+=1)
				bricks[i].fullalpha = 0;
			setTimeout(Senario5,1000);
			senarionum=5;
			deathcount = 1;
			character.canattack=false;
		}
	}
	else if(senarionum==5){
		if(boss1 && boss1.hp==0){
			boss1.gobomb();
			for(i=0; i<villanbullets.length; i++)
				villanbullets[i].gobomb();
			for(i=0; i<bullets.length; i++)
				bullets[i].gobomb();
			villanbullets = []; bullets = [];
			for(i=0; i<bricks.length; i+=1)	bricks[i].fullalpha = 0;
				setTimeout(dialog3,1000);
			boss1.x2=canvassizex/2; boss1.y2=100;
			senarionum=6;
			deathcount = 1;
			boss1.canattack = false;
			character.canattack=false;
			clearInterval(bossmove);
		}
	}
	setTimeout(SenarioManager,100);
}
function Senario1(){
	culbackspeed = 0;
	b = new boss();
	b.x1=canvassizex/2; b.x2=canvassizex/2; b.y1=0; b.y2=100; b.vx=1; b.vy=1;
	boss1 = b;
	setTimeout(dialog1,1000);
}
function dialog1(){
	if(isFirst)
		dialog = ["02 안녕안녕","21 너는...?","12 내 이름은 유카리야. 나를 이기면 원래 세상으로 돌려보내줄게.","21 뭐라고?","12 잘 따라와봐~"];
	else
		dialog = ["02 또 왔구나","21 잠깐 기다려!","12 따라와봐~"];
	setTimeout(enddialog1,1000);
}
function enddialog1(){
	if(dialog.length==0){
		mainaudio.pause();
		gameaudio.currentTime = 0;
		bossaudio.pause();
		gameaudio.play();
		vol = 0.5;
		boss1.y2=-100;
		culbackspeed = 2;
		character.canattack=true;
		setTimeout(startSenario2,5000);
	}
	else
		setTimeout(enddialog1,1000);
}
function startSenario2(){
	deathcount=0;
	boss1 = null;
}

function Senario2(){
	let v = new villan(); v.x1=0; v.y1=0; v.x2=100; v.y2=100; v.vx=2; v.vy=2; villans.push(v);
	v = new villan(); v.x1=450; v.y1=0; v.x2=450; v.y2=100; v.vx=2; v.vy=2; villans.push(v);
	v = new villan(); v.x1=900; v.y1=0; v.x2=800; v.y2=100; v.vx=2; v.vy=2; villans.push(v);

	let b = new brick();
	for(i=0; i<5; i+=1){
		b = new brick(); b.x=50+i*175; b.y=200; b.width=100; b.height=25;  bricks.push(b);
	}
	for(i=0; i<3; i+=1){
		b = new brick(); b.x=100+i*275; b.y=250; b.width=150; b.height=30;  b.color="blue"; b.hp=200; bricks.push(b);
	}
}
function Senario3(){
	if(difficulty==0)  {hp=maxhp;mp=maxmp;}
	let v = new villan(); v.x1=-600; v.y1=100; v.x2=150; v.y2=100; v.vx=2; v.vy=2; villans.push(v);
	v = new villan(); v.x1=-450; v.y1=100; v.x2=300; v.y2=100; v.vx=2; v.vy=2; villans.push(v);
	v = new villan(); v.x1=-300; v.y1=100; v.x2=450; v.y2=100; v.vx=2; v.vy=2; villans.push(v);
	v = new villan(); v.x1=-150; v.y1=100; v.x2=600; v.y2=100; v.vx=2; v.vy=2; villans.push(v);
	v = new villan(); v.x1=0; v.y1=100; v.x2=750; v.y2=100; v.vx=2; v.vy=2; villans.push(v);
	let b = new brick();
	for(i=0; i<5; i+=1){
		b = new brick(); b.x=50+i*175; b.y=200; b.width=100; b.height=25;  b.color="blue"; b.hp=200; bricks.push(b);
	}
	for(i=0; i<3; i+=1){
		b = new brick(); b.x=100+i*275; b.y=250; b.width=150; b.height=25;  b.color="red"; b.hp=500; bricks.push(b);
	}
}
function Senario4(){
	if(difficulty==0)  {hp=maxhp;mp=maxmp;}
	v = new villan2(); v.x1=450; v.y1=0; v.x2=450; v.y2=100; v.vx=2; v.vy=2; villans.push(v);
}
function Senario5(){
	if(difficulty==0) {hp=maxhp;mp=maxmp;}
	b = new boss();
	b.x1=canvassizex/2; b.x2=canvassizex/2; b.y1=0; b.y2=100; b.vx=1; b.vy=1;
	boss1 = b;
	culbackspeed = 1;
	setTimeout(dialog2,1000);
}
function dialog2(){
	vol = 0;
	if(isFirst)
		dialog = ["02 의외로 잘 따라오는구나","21 널 이기면 원래 세상으로 돌아갈 수 있다는거지?","12 이길 수 있다면 말이야!"];
	else
		dialog = ["02 문답무용!"];
	setTimeout(enddialog2,1000);
}
function enddialog2(){
	if(dialog.length==0){
		bossaudio.currentTime = 0;
		vol = 0.5;
		gameaudio.pause();
		bossaudio.play();
		boss1.canattack = true;
		culbackspeed = 2;
		character.canattack=true;
		bossmove = setInterval(move,5000);
		boss1.seehp=true;
		boss1.getshild();
		if (difficulty>=1){
			for(i=0; i<5; i+=1){
				b = new brick(); b.x=50+i*175; b.y=200; b.width=100; b.height=25;  b.color="blue"; b.hp=200; bricks.push(b);
			}
		}
		if (difficulty>=2){
			for(i=0; i<4; i+=1){
				b = new brick(); b.x=100+i*175; b.y=350; b.width=100; b.height=25;  b.color="red"; b.hp=200; bricks.push(b);
			}
		}
	}
	else
		setTimeout(enddialog2,1000);
}
function dialog3(){
	vol = 0;
	if(difficulty<2){
		dialog = ["20 해치웠나?","12 아직 멀었어","12 강해져서 돌아와!"];
		setTimeout(enddialog3,1000);
	}
	else{
		dialog = ["20 이번엔 해치웠나?","12 축하해","12 너와 싸우는 데에 힘을 소모해서 내 세상이 힘을 잃고 있어","12 내 세상은 곧 사라질 거야...","12 하지만 그건 너도 마찬가지야!!"];
		boss1.x2=450; boss1.y2=300;
		setTimeout(enddialog4,1000);
	}
}
function enddialog3(){
	if(dialog.length==0){
		boss1.x2=450; boss1.y2=-100;
		culbackspeed = 5;
		character.canattack=false;
		setTimeout(startSenario1,5000);
	}
	else
		setTimeout(enddialog3,1000);
}
function enddialog4(){
	if(dialog.length==0){
		cautionaudio.play();
		mainaudio.pause()
		gameaudio.pause()
		bossaudio.pause()
		bossaudio2.play()
		vol = 0.5;
		hp=maxhp; mp=maxmp;
		boss1.x1=450; boss1.y1=300;
		boss1.x2=450; boss1.y2=300;
		culbackspeed = 10;
		boss1.hp = bosshp;
		boss1.showimg();
		outburst();
		senarioend();
	}
	else
		setTimeout(enddialog4,1000);
}
var whitegage=0;
var curwhitegage=0;

function senarioend(){
	if(hp<=0){//배드엔딩
		villanbullets=[];
		boss1 = null;
		whitegage = 1;
		vol = 0;
		setTimeout(badend,5000);
	}
	else if(boss1.hp<=0){
		villanbullets=[];
		boss1 = null;
		whitegage = 1;
		vol = 0;
		setTimeout(happyend,5000);
	}
	else
		setTimeout(senarioend,100);
}
function badend(){
	dialog = ["20 ...","20 어떻게 된거지?","12 너는 여기서 빠져나갈 수 없어","21 뭐라고??","12 우린 영원히 함께야...","21 안돼!!!!!!","00 점수 : "+score+"점 /  배드엔딩"];
}
var happy = false;
function happyend(){
	happy = true;
	whitegage = 0;
	dialog = ["00 여기는?","00 ...","00 다 꿈이었나?","00 이제 재밌는 웹 프로그래밍 과제를 해야겠다!","00 점수 : "+score+"점 /  해피엔딩"];
}

function startSenario1(){
	boss1 = null;
	hp=maxhp; mp=maxmp;
	difficulty+=1;
	villanbulletv = 1+ difficulty*0.5;
	senarionum=0;
	isFirst = false;
}

function move(){
	var rand = Math.floor(Math.random() * 3);
	if(rand==0){
		boss1.x2 = canvassizex/3;
	}
	else if(rand==1){
		boss1.x2 = canvassizex/2;
	}
	else if(rand==2){
		boss1.x2 = (canvassizex/3)*2;
	} 
	rand = Math.floor(Math.random() * 3);
	if(rand==0){
		boss1.y2 = 100;
	}
	else if(rand==1){
		boss1.y2 = 150;
	}
	else if(rand==2){
		boss1.y2 = 200;
	} 
	boss1.dx = Math.abs(boss1.x2-boss1.x1)/20
	boss1.dy = Math.abs(boss1.y2-boss1.y1)/20
}

var setburest = null;
var burstangle = 0; var burstspeed = 0;
function outburst(){
	if(boss1){
		culbackspeed+=1; redgage=1-(boss1.hp/bosshp);
		for(i=0; i<360; i+=30){
			let vb = new villanbullet();  vb.canparring=false; vb.img = villanbullet2img;

			var angle = Math.floor(i)+burstangle;
		var x = Math.cos(angle/(180.0/Math.PI)); 	var y = Math.sin(angle/(180.0/Math.PI));//각도를 벡터로 재변환

		vb.x=x*500+boss1.x2; vb.y=y*500+boss1.y2; 

		var dx = (boss1.x2-vb.x)/(((boss1.x2-vb.x)**2+(boss1.y2-vb.y)**2)**0.5); 
		var dy = (boss1.y2-vb.y)/(((boss1.x2-vb.x)**2+(boss1.y2-vb.y)**2)**0.5); 

		vb.dx=dx; vb.dy=dy; villanbullets.push(vb);	

	}
}

setburest = setTimeout(outburst,1000-burstspeed);
console.log(burstspeed);
burstangle-=5; burstspeed+=3;
}







function keyDownHandler(e) {
	if(e.key == 37 || e.key == "ArrowRight") {
		rightPressed = true;
		if(buttonnum<2){
			buttonnum+=1;
			if(roonum==-2) drawguide();
			else if(roonum==0) drawmain();
			else if(roonum==1) drawdiff();
			else if(roonum==2) drawchar();
			if(roonum<=2){
				Button1.currentTime=0;
				Button1.play();
			}
		}
	}
	else if(e.key == 39 || e.key == "ArrowLeft") {
		leftPressed = true;
		if(buttonnum>0){
			buttonnum-=1;
			if(roonum==-2) drawguide();
			else if(roonum==0) drawmain();
			else if(roonum==1) drawdiff();
			else if(roonum==2) drawchar();
			if(roonum<=2){
				Button1.currentTime=0;
				Button1.play();
			}
		}
	}
	if(e.key == 38 || e.key == "ArrowUp") {
		upPressed = true;
		if(buttonnum>0){
			buttonnum-=1;
			if(roonum==-2) drawguide();
			else if(roonum==0) drawmain();
			else if(roonum==1) drawdiff();
			else if(roonum==2) drawchar();
			if(roonum<=2){
				Button1.currentTime=0;
				Button1.play();
			}
		}
	}
	if(e.key == 40 || e.key == "ArrowDown") {
		downPressed = true;
		if(buttonnum<2){
			buttonnum+=1;
			if(roonum==-2) drawguide();
			else if(roonum==0) drawmain();
			else if(roonum==1) drawdiff();
			else if(roonum==2) drawchar();
			if(roonum<=2){
				Button1.currentTime=0;
				Button1.play();
			}
		}
	}
	if(e.key == 13 || e.key == "Enter") {
		if(dialog.length>0){
			dialog=[];
			Button1.currentTime=0;	Button1.play();
		}
	}
	if(e.key == 90 || e.key == "z") {
		isAttack = true;
		if(dialog.length>0){
			dialog = dialog.slice(1);
			Button1.currentTime=0;	Button1.play();
		}
		if(roonum==-2){
			roonum=0;
			buttonnum=1;
			vol = 0.5;
			mainaudio.play();
			drawmain();
			Button1.currentTime=0;	Button1.play();
		}
		else if(roonum==-1){
			roonum=0;
			vol = 0.5;
			mainaudio.play();
			drawmain();
			Button1.currentTime=0;	Button1.play();
		}
		else if(roonum==0 && buttonnum==0){
			buttonnum=0;
			roonum=1;
			drawdiff();
			Button1.currentTime=0;	Button1.play();
		}
		else if(roonum==0 && buttonnum==1){
			buttonnum=0;
			drawguide();
			roonum=-2;
			Button1.currentTime=0;	Button1.play();
		}
		else if(roonum==0 && buttonnum==2){
			window.close();
			Button1.currentTime=0;	Button1.play();
		}
		else if(roonum==1){
			difficulty = buttonnum;//난이도
			villanbulletv = 1+ difficulty*0.5;
			buttonnum=0;
			roonum=2;
			drawchar();
			Button1.currentTime=0;	Button1.play();
		}
		else if(roonum==2){
			Button1.currentTime=0;	Button1.play();
			charnum = buttonnum;//직업
			charimg.src = './resource/char'+charnum+'1.png';
			charhitimg.src = './resource/char'+charnum+'1hit.png';
			chardeathimg.src = './resource/char'+charnum+'1death.png';
			bulletimg.src = './resource/Attack'+charnum+'.png';
			charface.src = './resource/face'+charnum+'.png';

			for(i=1; i<=5; i++){
				var p = new Image(); p.src = './resource/parryings'+(charnum)+i+'.png';
				parringimgs[i] = p;
			}
			parringattackimg.src = './resource/parringattack'+charnum+'1.png';
			parringattackimg2.src = './resource/parringattack'+charnum+'2.png';
			parringattackimg3.src = './resource/parringattack'+charnum+'3.png';
			if (charnum==0){hp=200; maxhp=200; ballV[difficulty]*=1.5;}
			if (charnum==1){parringdmg=150; parringrange[difficulty]*=1.5;}
			if (charnum==2){bulletdmg=1.5; maxmp=200; mp=200;}

			buttonnum=0;
			roonum=3;
			vol = 0;
			
			drawsynopsis();
		}
		else if(roonum==3){
			Button1.currentTime=0;	Button1.play();
			roonum=5;
			drawgame();
			SenarioManager();
		}
	}
	if(e.key == 88 || e.key == "x") {
		if(hp>0)
			isParring = true;
	}
}

function keyUpHandler(e) {
	if(e.key == 37 || e.key == "ArrowRight") {
		rightPressed = false;
	}
	if(e.key == 39 || e.key == "ArrowLeft") {
		leftPressed = false;
	}
	if(e.key == 38 || e.key == "ArrowUp") {
		upPressed = false;
	}
	if(e.key == 40 || e.key == "ArrowDown") {
		downPressed = false;
	}
	if(e.key == 90 || e.key == "z") {
		isAttack = false;
	}
	if(e.key == 88 || e.key == "x") {
		isParring = false;
	}
}