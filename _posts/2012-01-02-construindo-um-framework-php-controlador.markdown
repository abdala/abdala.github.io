---
author: abdala
comments: true
layout: post
slug: construindo-um-framework-php-controlador
title: Construindo um framework PHP - Controlador
wordpress_id: 32
categories:
- Tutoriais
tags:
- framework
- planeta
---

Olá! Nesse post o nosso objetivo principal vai ser: conseguir chamar um controlador e sua ação.

A primeira coisa que vamos fazer é definir a estrutura de diretório da nossa apliação. Vamos construir uma estrutura que seja compatível com o padrão MVC. Ela ficará assim:

[![](http://abda.la/wp-content/uploads/2012/01/Screen-Shot-2012-01-02-at-4.59.51-PM.png)](http://abda.la/wp-content/uploads/2012/01/Screen-Shot-2012-01-02-at-4.59.51-PM.png)

**Aplicacao**: arquivos da nossa aplicação. O que de fato vamos desenvolver.

**Biblioteca**: arquivos auxiliares externos. Desenvolvidos por outras pessoas/empresas e que vamos utilizar na construção da nossa aplicação. Ex: Frameworks, classes de geração de PDF, geração de imagens, envio de e-mail etc.

**Público**: arquivos que vão estar na pasta pública do nosso servidor(_www_, _public_html_). É importante que nossos arquivos PHP fiquem em uma pasta que não seja pública, assim, podemos definir uma única porta de entrada para nossa aplicação, o _index.php_, e deixar os outros arquivos protegidos.

Agora vamos criar o conteúdo do arquivo _index.php_. Como ele vai ser a porta de entrada da aplicação, ele terá de ser capaz de, por meio de parâmetros, conseguir chamar os controladores. Então ficará assim:

    
    //define a função mágica de carregamento automático de classes. 
    //Essa função é chamada sempre que criamos um objeto, assim, não precisamos dar o require manualmente.
    function __autoload($nomeClasse) {
    	$dir = '../aplicacao/controlador';
        $localClasse = realpath($dir) . '/' . $nomeClasse . '.php';
    
        if (file_exists($localClasse)) {
            require($localClasse);
            return true;
        }
    	return false;
    }
    
    //define o nome padrão para o controlador e a acao
    $nomeControlador = "inicial";
    $nomeAcao        = "inicial";
    
    //verifica se existe parametro "controlador" e se ele tem valor
    if (isset($_GET['controlador']) && $_GET['controlador']) {
        $nomeControlador = $_GET['controlador'];
    }
    
    //verifica se existe parametro "acao" e se ele tem valor
    if (isset($_GET['acao']) && $_GET['acao']) {
        $nomeAcao = $_GET['acao'];
    }
    
    //padronizacao de nome
    $nomeControlador = 'Controlador' . ucfirst(strtolower($nomeControlador));
    $nomeAcao 	 = 'acao' . ucfirst(strtolower($nomeAcao));
    
    //chamada da classe(controlador) e metodo(acao)
    if (class_exists($nomeControlador)) {
    	$controlador = new $nomeControlador;
    
    	if (method_exists($controlador, $nomeAcao)) {
    	    $controlador->$nomeAcao();
    	} else {
                echo "Acao nao encontrada.";
            }
    } else {
        echo "Controlador nao encontrado.";
    }


Só falta construir o nosso controlador. Ele será bem simples e ficará dentro da pasta _aplicacao/controlador_. Segue o código:

    
    class ControladorInicial
    {
        public function acaoInicial()
        {
            echo "Sou a acao inicial";
        }
    }


Agora é chamar no browser para ver se está tudo funcionando. Acesse: _http://localhost/planeta/primeiro/publico/index.php_.

No meu repositório https://github.com/abdala/Planeta-Framework coloquei mais um controlador de exemplo.

Espero que te ajude. Abraço!
