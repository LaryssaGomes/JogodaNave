let cenas = {
    jogo : 0,
    vitoria : 1,
    derrota: 2
}
let pontuacao = 0;
let trilhaSonora;
let cenaAtual = 0;
let deltaTime = 0;
let ultimaChamada =0;
//preparando o ambiente de trabalho
//carrengado as fantasias do nosso jogo
function preload() {
    // carregando imagens
    trilhaSonora = loadSound("audio/Trilha.mp3");
    imagemNave = loadImage("imagens/Nave.png");
    imagemLaser = loadImage("imagens/laser.png")
    imagemMissil = loadImage("imagens/Missil.png");

    imagensAlien.push(loadImage("imagens/Alien1.png"));
    imagensAlien.push(loadImage("imagens/Alien2.png"));
    imagensAlien.push(loadImage("imagens/Alien3.png"));
}

//Quando meu jogo começa
function setup() {
    // criando um palco com 900 de largura e 600 de altura
    createCanvas(900, 600);
    inicializarNave();
    //trilhaSonora.loop();
    inicializarAliens();
}

//desenhando nosso atores - igual ao bloco "sempre" do scracth
function draw() {
    // pintar o fundo do palco de cinza
    background(100);

    if(cenaAtual == cenas.jogo){
       desenharCenaJogo();
    }else if(cenaAtual == cenas.vitoria){
        desenharCenaVitoria();
    }if(cenaAtual == cenas.derrota){
        desenharCenaDerrota();
    }
}
function calcularDeltaTimes(){
    let tempoAtual = millis();//milli da o tempo em milli segundos
    deltaTime = tempoAtual - ultimaChamada;
    ultimaChamada = tempoAtual;
    deltaTime = deltaTime / 1000;// aqui convertemos do milli para segundos
  
}

function desenharCenaJogo(){
    if(todosAliensEstaoMortos() == true){
        cenaAtual = cenas.vitoria;
    }
    calcularDeltaTimes();
    movimentaMisseis();
    movimentarNave();
    desenharNave();
    recarregarMissil();
    verificaColisaoMissil();
    verificaColisaoLaser();
    movimentarAlien();
    desenhaAlien();
    desenhaMisseis();
    adicionarDisparosDosAliens();
    movimentaLasers();
    desenhaLasers();
    fill(255);
    textAlign(LEFT);
    textSize(30);
    text("Pontuação: " + pontuacao, 10, 80);
}

function desenharCenaVitoria(){
    textSize(80);
    textAlign(CENTER);
    text("Parabéns", width / 2, height / 2);
}

function desenharCenaDerrota(){
    textSize(80);
    textAlign(CENTER);
    text("Game Over", width / 2, height / 2);
}

//quando o mouse for pressionado
function mousePressed() {
    if(cenaAtual == cenas.jogo){
        atirar();
    }else{
        reiniciar();
    }
}

function colidiu(posicaoObjeto, imagemObjeto, posicaOutro, imagemOutro) {
    if ((posicaoObjeto.x + imagemObjeto.width < posicaOutro.x ||
        posicaoObjeto.x > posicaOutro.x + imagemOutro.width ||
        posicaoObjeto.y > posicaOutro.y + imagemOutro.height ||
        posicaoObjeto.y + imagemObjeto.height < posicaOutro.y)) {
        return false;
    }
    return true
}

function estaForaDaTela(posicaoY){
    if(posicaoY < 0 || posicaoY > height){
        return true;
    }
    return false;
}

function reiniciar(){
    cenaAtual = cenas.jogo;
    lasers = new Array();
    posicoesMisseis = new Array();
    aliens = new Array();
    inicializarAliens();
    pontuacao = 0;
}