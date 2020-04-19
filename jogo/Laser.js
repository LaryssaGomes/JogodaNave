let imagemLaser;
let velocidadeLaser = 5;
let lasers = new Array();

function verificaColisaoLaser(){
    for(let laser of lasers){
        if(colidiu(laser, imagemLaser,posicaoNave, imagemNave )){
            //ir para cena de derrota
            cenaAtual = cenas.derrota;
        }
    }
}

function desenhaLasers() {
    for (let laser of lasers) {
        image(imagemLaser, laser.x, laser.y);
    }
}

function movimentaLasers() {
    for (let i = lasers.length-1 ; i >= 0 ; i = i-1) {//i--
        let laser = lasers[i];
        laser.y = laser.y + velocidadeLaser;
        if(estaForaDaTela(laser.y) == true){
            //Tirar o laser da lista
            lasers.splice(i, 1);

        }
    }
}