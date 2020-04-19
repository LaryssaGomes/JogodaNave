const tempoEntreDisparos = .9; //tempo em segundos
let imagemNave;
let posicaoNave;
let possoAtirar;
let cronometroRecarregar = tempoEntreDisparos;

function inicializarNave(){
    possoAtirar = true;
    posicaoNave = createVector(400, 500);
}

function desenharNave(){
      //desenhar a nave
      image(imagemNave, posicaoNave.x, posicaoNave.y);
}

function movimentarNave(){
    //centralizando a posição da nave
    posicaoNave.x = mouseX - imagemNave.width / 2;
}

function atirar(){
    if(possoAtirar == true){//== true e facultativo o possoAtira,pois se acondição no if for verdadeiro o codigo será executado
        posicoesMisseis.push(createVector(mouseX - imagemMissil.width / 2, posicaoNave.y));
        possoAtirar = false;
    }
}

function recarregarMissil(){
    if(possoAtirar == false){// essa condição pode ser feita assim if(!possoAtirar)
        cronometroRecarregar = cronometroRecarregar-deltaTime;
        if(cronometroRecarregar < 0){
            possoAtirar = true;
            cronometroRecarregar = tempoEntreDisparos;
        }
    }
}