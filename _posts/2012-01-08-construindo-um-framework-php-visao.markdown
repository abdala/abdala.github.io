---
author: abdala
comments: true
date: 2012-01-08 23:54:34+00:00
layout: post
slug: construindo-um-framework-php-visao
title: Construindo um framework PHP - Visão
wordpress_id: 38
categories:
- Tutoriais
tags:
- framework
- planeta
---

Neste post vamos ver como construir e utilizar a parte de visão do nosso framework.

A visão é responsável por retornar alguma informação para o usuário(cliente). Essa informação normalmente é retornada em formato HTML, mas ela pode retornar em outros formatos também, como: JSON, XML, CSS etc.

A inclusão da visão nada mais é do que um _include _do arquivo. Vamos padronizar o local do arquivo(nome do nosso controlador) e nome(nome da ação) para facilitar a inclusão dele o código vai ficar assim:

aplicacao/controlador/ControladorInicial.php


    
    
    class ControladorInicial
    {
        public function acaoInicial() 
        {
            require "../aplicacao/visao/inicial/inicial.php";
        }
    }
    



Simples, não? Para passar os dados para a nossa visão vamos criar variáveis no controlador e acessa-lás no arquivo de visão. Desta forma:

aplicacao/controlador/ControladorInicial.php


    
    
    class ControladorInicial
    {
        public function acaoInicial() 
        {
            $titulo = "Blog Planeta Framework";
            require "../aplicacao/visao/inicial/inicial.php";
        }
    }
    



aplicacao/visao/inicial/inicial.php


    
    
    <h1></h1>
    



Mas, pense comigo, se tivermos muitos controladores e muitas ações isso vai ficando cada vez mais complexo. Então, o que vamos fazer agora e organizar tudo isso. Vamos modificar a nossa função de autoload, construir uma classe de controlador, de visão e uma MVC para cuidar de tudo isso. Você vai ver como vai ficar bem mais fácil e organizado.

Nossa classes ficarão assim:

bibiloteca/Planeta/Mvc/Visao.php


    
    
    class Planeta_Mvc_Visao
    {
    	public function renderizar($diretorio, $arquivo)
    	{
                $local  = '../aplicacao/visao/';
    	    require $local . $diretorio . '/' . $arquivo;
    	}
    }
    



bibiloteca/Planeta/Mvc/Controlador.php:


    
    
    class Planeta_Mvc_Controlador
    {
    	protected $visao;
    	
    	public function __construct() 
    	{
    		$this->visao = new Planeta_Mcv_Visao();
    	}
    	
    	public function renderizar()
    	{
    		$diretorio = strtolower(Planeta_Mcv_Visao::pegarInstancia()->pegarControlador());
    		$arquivo   = strtolower(Planeta_Mcv_Visao::pegarInstancia()->pegarAcao()) . ".php";
    		
    		$this->visao->renderizar($diretorio, $arquivo);
    	}
    }
    



bibiloteca/Planeta/Mvc.php:


    
    
    class Planeta_Mvc
    {
        /**
         * Nome do controlador
         * 
         * @var string
         */
        protected $controlador;
        
        /**
         * Nome do controlador
         * 
         * @var string
         */
        protected $acao;
        
        /**
         * Instancia única do objeto Planeta_Mvc
         * 
         * @var Planeta_Mvc
         */
    	private static $instancia;
        
        /**
         * Implementação do Singleton
         *
         * @return Planeta_Mvc 
         */
    	public static function pegarInstancia()
    	{
                    //verifica se a instância existe
    		if (!self::$instancia) {
    			self::$instancia = new Planeta_Mvc();
    		}
    		
    		return self::$instancia;
    	}
    	
        /**
         * Construtor privado para forçar o Singleton
         * 
         * @return void
         */
    	private function __construct() 
    	{}
        
        /**
         * Pega o controlador da requisição atual
         * 
         * @return string  
         */
        public function pegarControlador() 
        {
            return $this->controlador;
        }
        
        /**
         * Pega a ação da requisição atual
         * 
         * @return string  
         */
        public function pegarAcao() 
        {
            return $this->acao;
        }
    
             public function rodar()
             {
    		//pega o modulo, controlador e acao 
    		$controlador = isset($_GET['c']) ? $_GET['c'] : 'inicial';
    		$acao		 = isset($_GET['a']) ? $_GET['a'] : 'inicial';
    		
    		//padronizacao de nomes
    		$this->controlador = ucfirst(strtolower($controlador));
    		$this->acao 	   = ucfirst(strtolower($acao));
    		
                    $nomeClasseControlador = 'Controlador' . $this->controlador;
    	        $nomeAcao              = 'acao' . $this->acao;
    
                    //verifica se a classe existe
    		if (class_exists($nomeClasseControlador)) {
    			$controladorObjeto = new $nomeClasseControlador;
    			
    			//verifica se o metodo existe
    			if (method_exists($controladorObjeto, $nomeAcao)) {
    				$controladorObjeto->$nomeAcao();
    				return true;
    			}
    			throw new Exception('Acao nao existente.');
    		}
    		throw new Exception('Controlador nao existente.');
    	}
        
            private function __clone() 
    	{
    		throw Exception('Nao pode');
    	}
    }
    



bibiloteca/Planeta/CarregadorAutomatico.php:


    
    
    class Planeta_CarregadorAutomatico
    {
        /**
         * Carrega a classe se ea existir
         *
         * @param string $nomeDaClasse
         * @return boolean
         */
    	public static function carregar($nomeClasse)
    	{
                    //lista de diretorios que as classes serão pesquisadas
    		$diretorios = array('../aplicacao/controlador', 
    						    '../biblioteca');
    		
                    //transforma parte do nome da classe para diretorio
    		$nomeClasse = str_replace(array('_', '\\'), '/', $nomeClasse);
    		
                    //procura as classes nos diretorios definidos 
    		foreach ($diretorios as $diretorio) {
    			//pega o caminho real do diretorio e junta com o nome da classe
                            $localClasse = realpath($diretorio) . '/' . $nomeClasse . ".php";
                
                            //checa se o arquivo existe
    			if (file_exists($localClasse)) {
                                    //inclue o arquivo
    				require($localClasse);
                                    //returna verdadeiro quando achou e para o loop
    				return true;
    			}
    		}
    		return false;
    	}
    	
        /**
         * Resitra o método para ser usado no autoload
         */
    	public static function registrar()
    	{
    		spl_autoload_register('Planeta_CarregadorAutomatico::carregar');
    	}
    }
    



publico/index.php


    
    
    require '../biblioteca/Planeta/CarregadorAutomatico.php';
    
    Planeta_CarregadorAutomatico::registrar();
    Planeta_Mvc::pegarInstancia()->rodar();
    



Agora para fazer referência a nossas variáveis de Visão vamos adicionar atributos na classe de Visão. E como o _include_ agora está sendo feito dentro da classe de visão, no arquivo de visão iremos referenciar os atributos utilizando o _$this_. Assim:

aplicacao/controlador/ControladorInicial.php 


    
    
    class ControladorInicial extends Planeta_Mvc_Controlador
    {
        public function acaoInicial() 
        {
            $this->visao->titulo = "Blog Planeta Framework";
            $this->renderizar();
        }
    }
    



aplicacao/visao/inicial/inicial.php


    
    
    <h1>titulo?></h1>
    



Ufa! Acho que por hoje já está bom. Nos vemos no próximo post.

Um grande abraço.

Espero que tenha te ajudado.
