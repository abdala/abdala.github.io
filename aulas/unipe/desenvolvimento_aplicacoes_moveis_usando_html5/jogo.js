var Carta = function(valor) {
    this.renderizar = function() 
    {
        //imprimir o html da carta
    }

    this.click = function() 
    {
        //acao de click da carta    
    }
}

var Jogo = function(containerId, numeroPares) 
{    
    this.addCartas = function(carta)
    {
        
    }

    this.jogar = function()
    {
        //sortear as cartas
        //imprimir todas cartas dentro do container
    }
    
    this.fimJogo = function() {
        //verificar se o jogo terminou
    }
    
    for (i = 0; i < numeroPares; i++) {
        var numero = //gerar numero randomico
        var carta1 = new Carta(numero);
        var carta2 = new Carta(numero);

        this.addCartas(carta1);
        this.addCartas(carta2);
    }

    this.jogar();
}


var jogo = new Jogo("container", 6);
