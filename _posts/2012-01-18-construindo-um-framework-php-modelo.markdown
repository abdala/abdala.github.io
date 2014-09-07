---
author: abdala
comments: true
date: 2012-01-18 16:49:34+00:00
layout: post
slug: construindo-um-framework-php-modelo
title: Construindo um framework PHP – Modelo
wordpress_id: 51
categories:
- Tutoriais
tags:
- framework
- planeta
---

Quando falamos do "M" do MVC, a camada de modelo, sempre existem várias opiniões do seu papel. Acho que essa é a parte mais filosófica de todo o padrão.

Na maioria das frameworks, a parte de modelo também é a parte que faz acesso ao banco de dados. No nosso framework também vamos fazer desta maneira, mas lembre-se, isso não é uma regra. A camada de modelo não precisa obrigatoriamente fazer acesso ou ser a forma de acesso ao banco de dados. Ela pode ser para conter as nossas regras de negócio e os dados podem ser obtidos de outras fontes. Ex: arquivos e webservices.

Dica: Cuidado para não confundir validação de dados, com validação(regra) de negócio. Isso acontece com bastante frequência.

**Validação de dados** = verificar se um número é inteiro.

**Validação de negócio** = se o número for maior que 10, dividir ele por 2.

Entendido isso vamos para o que interessa. Vamos construir nossas classes de abstração de dados._Show me the code_:

biblioteca/Planeta/Banco.php

    
    class Planeta_Banco
    {
    	private $conexao;
    	private static $instancia;
    
    	public static function pegarInstancia()
    	{
    		if (!self::$instancia) {
    			self::$instancia = new Planeta_Banco();
    		}
    
    		return self::$instancia;
    	}
    
    	public function pegarConexao()
    	{
    		return $this->conexao;
    	}
    
    	private function __construct() 
    	{
    		$this->conexao = new PDO('mysql:dbname=blog;host=127.0.0.1', 
                                      'root', 
                                      '123456', 
                                      array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'UTF8'"));
    	}
    
    	private function __clone() 
    	{
    		throw Exception('Nao pode');
    	}
    }


É interessante verificar a utilização do padrão de projeto _Singleton_. Ele garante que só haverá uma única instância do objeto banco criado. Para conseguir isso, declaramos o método construtor como privado, assim, não é possível criar um novo objeto publicamente com o operador _new_. Para se criar esse objeto então, fazemos uma chamada estática(que não precisa de instância) e essa chamada vai fazer o controle de criação deste objeto.

biblioteca/Planeta/Banco/Tabela.php

    
    abstract class Planeta_Banco_Tabela
    {
    	protected $nome;
    	protected $chave;
    
    	public function pegarNome()
    	{
    		return $this->nome;
    	}
    
        /**
         *
         * @return Planeta_Banco
         */
    	public function pegarBanco()
    	{
    		return Planeta_Banco::pegarInstancia();
    	}
    
    	public function buscarTodos()
    	{
    		$sql = sprintf("SELECT * FROM %s", $this->nome);
    		return $this->pegarBanco()->pegarConexao()->query($sql)->fetchAll();
    	}
    
    	public function buscar($id)
    	{
    		$sql = sprintf("SELECT * FROM %s WHERE %s = %d", $this->nome, $this->chave, $id);
    		return $this->pegarBanco()->pegarConexao()->query($sql)->fetch();
    	}
    
    	public function excluir($id)
    	{
    		$sql = sprintf("DELETE FROM %s WHERE %s = %d", $this->nome, $this->chave, $id);
    		return $this->pegarBanco()->pegarConexao()->exec($sql);
    	}
    
    	public function inserir($dados)
    	{
    		unset($dados[$this->chave]);
    		$campos  = array_keys($dados);
    		$sql     = "INSERT INTO %s(%s) VALUES(:%s)";
    		$sql     = sprintf($sql, $this->nome, \implode(",", $campos), \implode(",:", $campos));
    
    		$confirmacao = $this->pegarBanco()->pegarConexao()->prepare($sql);
    		return $confirmacao->execute($dados);
    	}
    
    	public function atualizar($dados)
    	{
    		$set = "";
    		$id  = $dados[$this->chave];  
    
    		unset($dados[$this->chave]);
    
            $campos = array_keys($dados);
    
    		foreach ($campos as $campo) {
    			$set .= sprintf("%s = :%s, ", $campo, $campo);
    		}
    
    		$set = substr($set, 0, strlen($set)-2);
    		$sql = "UPDATE %s SET %s WHERE %s = %d";
    		$sql = sprintf($sql, $this->nome, $set, $this->chave, $id);
    
            $confirmacao = $this->pegarBanco()->pegarConexao()->prepare($sql);
    		return $confirmacao->execute($dados);
    	}
    }


Pronto! Agora vem a parte mais simples. Criar o Modelo/Tabela.

aplicacao/modelo/Postagem.php

    
    class Postagem extends Planeta_Banco_Tabela
    {
    	protected $nome  = "postagem";
    	protected $chave = "id";
    }


E vamos modificar o nosso controlador e nossa visao também:

aplicacao/controlador/ControladorInicial.php

    
    class ControladorInicial extends Planeta_Mvc_Controlador
    {
        public function acaoInicial() 
        {
            $postagem = new Postagem();
            $this->visao->dados = $postagem->buscarTodos();
            $this->renderizar();
        }
    }


aplicacao/visao/inicial/inicial.php


    
    
    <!DOCTYPE html>
    <html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta http-equiv="keywords" content="html css php planeta programacao">
        <meta http-equiv="description" content="Arquivo de demonstração">
        <title>Planeta Framework</title>
    </head>
    <body>
        <h1>Inicial do blog</h1>
        <p>Página com conteúdo dinâmico</p>
        <br />
        <?php foreach($this->dados as $dados):?>
            <div class="post-item">
                <h3><?php echo $dados['nome']?></h3>
                <p><?php echo $dados['descricao']?></p>
            </div>
            <br />
        <?php endforeach;?>
    </body>
    </html>
    



Agora é só escrever o restante das operações(inserir, atualizar e excluir). Espero que tenha gostado!
