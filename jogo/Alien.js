const tamanhoDoAlien = 100;
let chanceDeAtirar = 0.005;
let imagensAlien = new Array();
let aliens = new Array();
const distanciaDoTopo = 150;

let deslocamentoAlien = 0;
let quantidadeAliens = 15;
let velocidadeAlien = 2;
let colunas = 6;

function inicializarAliens(){
    for (let i = 0; i < quantidadeAliens; i = i + 1) {
        //faça algo
        let numeroFantasia = Math.floor(random(imagensAlien.length));
        aliens.push(numeroFantasia);
    }
}

function desenhaAlien() {
    for (let i = 0; i < quantidadeAliens; i = i + 1) {
        let numeroFantasia = aliens[i];
        //se o numero da fantasia for diferente(!=) de -1 
        if (alienEstaMorto(numeroFantasia) == false) {
            //desenha o alien
            let posicao = calcularPosicaoAlien(i);
            image(imagensAlien[numeroFantasia], posicao.x, posicao.y);
        }
    }
}

function movimentarAlien() {
    deslocamentoAlien = deslocamentoAlien + velocidadeAlien;
    let indeDoUltimoAlien = Math.min(colunas -1,quantidadeAliens-1);
    let posicaoUltimoAlien = calcularPosicaoAlien(indeDoUltimoAlien);
    let posicaoPrimeiroAlien = calcularPosicaoAlien(0);
    let imagemUltimoAlien = imagensAlien[0];
    if (posicaoUltimoAlien.x + imagemUltimoAlien.width > 900 || posicaoPrimeiroAlien.x < 0) {
        velocidadeAlien = velocidadeAlien * -1;
    }
}

function calcularPosicaoAlien(indiceAlien) {
    let posicao = createVector();
    let linha = Math.floor(indiceAlien/colunas);
    let coluna = indiceAlien % colunas;
    posicao.x = coluna * tamanhoDoAlien + deslocamentoAlien;
    posicao.y = linha* tamanhoDoAlien + distanciaDoTopo;
    return posicao;
}

function alienEstaMorto(fantasia) {
    return fantasia == -1;
}

function todosAliensEstaoMortos() {
    for (let alien of aliens) {
        if (alienEstaMorto(alien) == false) {
            return false;
        }
    }
    return true;
}

function adicionarDisparosDosAliens() {
    for (let i = 0; i < quantidadeAliens; i++) {
        if (alienEstaMorto(aliens[i]) == true) {
            continue;
        }

        if (deveAtirar()) {
            let posicaoAlien = calcularPosicaoAlien(i);
            lasers.push(posicaoAlien);
        }
    }
}

function deveAtirar() {
    return Math.random() < chanceDeAtirar;
}