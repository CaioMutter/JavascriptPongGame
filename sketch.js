//Variveis da bolinha.
let xBolinha = 300;
let yBolinha = 200;
let diametro = 23;

//Velocidade da bolinha.
let velocidadexBolinha = 6;
let velocidadeyBolinha = 6;
let raio = diametro / 2;

//Variaveis da raquete.
let xRaquete = 3;
let yRaquete = 150;
let comprimentoRaquete = 10;
let alturaRaquete = 90;

let colisao = false;

//Variaveis da raquete do oponente.
let xRaqueteOponente = 590;
let yRaqueteOponente = 150;
let velocidadeYOponente;
let chanceDeErrar = 0;

//Variaveis placar do jogo.
let meusPontos = 0;
let oponentePontos = 0;

//Variaveis sons do jogo.
let raquetada;
let ponto;
let trilha;
let ele;

function preload() {
  trilha = loadSound("trilha.mp3")
  ponto = loadSound("ponto.mp3")
  raquetada = loadSound("raquetada.mp3")
}


function setup() {
  createCanvas(600, 400);
  trilha.loop();
}6


function draw() {
  background(0);
  mostraBolinha();
  movimentoBolinha();
  colisãoborda();
  mostraRaquete(xRaquete, yRaquete);
  movimentoRaquete();
  colisaoRaqueteBiblioteca(xRaquete, yRaquete);
  colisaoRaqueteBiblioteca(xRaqueteOponente, yRaqueteOponente);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentoRaqueteOponente();
  incluiPlacar();
  marcaPonto();
  bolinhaNaoFicaPresa();
  calculaChanceDeErrar();
  bolinhaNaoFicaPresa();
}


function mostraBolinha() { 
  circle(xBolinha, yBolinha, diametro);
}

function movimentoBolinha() {
  xBolinha += velocidadexBolinha;
  yBolinha += velocidadeyBolinha;
}

function colisãoborda() {
   
 if (xBolinha + raio> width || xBolinha - raio< 0) {
   velocidadexBolinha *= -1;
 }

 if (yBolinha + raio> height || yBolinha -raio< 0){
   velocidadeyBolinha *= -1;
 }

}

function mostraRaquete(x,y) {
  rect(x, y, comprimentoRaquete, alturaRaquete)
}

function movimentoRaquete() {
    if (keyIsDown(UP_ARROW)) {
        yRaquete -= 5;
    }
    if (keyIsDown(DOWN_ARROW)) {
        yRaquete += 5;
    }
  yRaquete = constrain(yRaquete, 2, 307);
}

function colisaoRaqueteBiblioteca(x,y) {
   colisao =
  collideRectCircle(x, y, comprimentoRaquete, alturaRaquete, xBolinha, yBolinha, raio);
  if (colisao){
    velocidadexBolinha *= -1;
    raquetada.play();
  }
}

function movimentoRaqueteOponente() {
  velocidadeYOponente = yBolinha - yRaqueteOponente - comprimentoRaquete / 2 - 30;
    yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar()
  
  yRaqueteOponente = constrain(yRaqueteOponente, 2, 307);
}

function calculaChanceDeErrar() {
  if (oponentePontos >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}

function incluiPlacar() {
  stroke(255)
  textAlign(CENTER)
  textSize(16)
  fill(color(255, 140, 0))
  rect(160, 10, 40, 20)
  fill(255)
  text(meusPontos, 180, 26);
  fill(color(255, 140, 0))
  rect(399, 10, 40, 20)
  fill(255)
  text(oponentePontos, 419, 26);
}

function marcaPonto() {
  if (xBolinha > 588) {
    meusPontos += 1;
    ponto.play();
  }
  
  if (xBolinha < 11) {
    oponentePontos += 1;
    ponto.play();
  }
  
}

function bolinhaNaoFicaPresa(){
    if (xBolinha + raio < 0){
    console.log('bolinha ficou presa');
    xBolinha = 300;
    }
}