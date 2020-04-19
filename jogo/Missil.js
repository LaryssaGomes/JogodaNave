let velocidadeMissil = 5;
let posicoesMisseis = new Array();
let imagemMissil;

function movimentaMisseis() {
    //para cada posicao dentro da lista de posições -> mover o míssil para cima
    for (let i= posicoesMisseis.length-1 ; i >= 0 ; i = i-1) {
        let posicao = posicoesMisseis[i];
        posicao.y = posicao.y - velocidadeMissil;
        if(estaForaDaTela(posicao.y)){
            posicoesMisseis.splice(i,1);
        }
    }
}

function desenhaMisseis() {
    //para cada item da minha lista -> desenhar aquele ator
    for (let posicao of posicoesMisseis) {
        image(imagemMissil, posicao.x, posicao.y);
    }
}

function verificaColisaoMissil() {
    //para cada missil dentro do jogo
    for (let j = posicoesMisseis.length -1; j>=0 ;j =j-1) {
        posicao = posicoesMisseis[j];
        //verficar a colisao com todos os aliens
        for (let i = 0; i < quantidadeAliens; i = i + 1) {
           
            let numeroFantasia = aliens[i];
            if(alienEstaMorto(numeroFantasia)){
                continue;
            }
             let posicaoAlienDaLista = calcularPosicaoAlien(i);
             let imagemAlien = imagensAlien[numeroFantasia];
                //se o missil está para esquerda OU (||)  para direita OU  para baixo OU para cima
                if (colidiu(posicao, imagemMissil, posicaoAlienDaLista, imagemAlien)) {
                    //o alien está morto
                    aliens[i] = -1;
                    pontuacao = pontuacao + 10;//pontuação +=10;
                    posicoesMisseis.splice(j,1);
                }
            
        }
    }
}