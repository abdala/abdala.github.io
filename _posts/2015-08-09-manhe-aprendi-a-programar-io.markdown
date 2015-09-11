---
layout: post
title:  Manhê! Aprendi a programar! I/O
date:   2015-08-09 15:50:00
author: Abdala Cerqueira
categories: 
- projetos
tags:
- programação
- dummy
- iniciando
---

Para quem ainda não leu o primeiro artigo [Manhê! Aprendi a programar!](http://abda.la/projetos/2015/02/14/manhe-aprendi-a-programar/)

## I/O

Input (Entrada) e Output (Saída). Praticamente tudo na área de computação se resume a entrada e saída. Mas tem um cara, no meio disso tudo, que é o nosso cara, no que vamos prestar mais atenção, o nome dele é: Processamento.

O processamento é responsável por entender a entrada, manipulá-la/transformá-la e gerar uma saída. Ele sempre é realizado por algum código. Esse código nós escrevemos por meio das linguagens de programação.

## Vamos para a vida real

O que pode de fato ser usado como dispositivos de entrada? Um dispositivo bem simples é o teclado. Com ele conseguimos inserir informações que irão ser processadas. Estamos cercados de dispositivos de entrada. No aparelho celular, por exemplo, existem vários: bluetooth, GPS, acelerômetro, giroscópio, sensor de luminosidade, sensor de toque, microfone, câmera etc. Assim, a partir das informações captadas por esses dispositivos, conseguimos processá-las e gerar alguma saída. As saídas podem ser percebidas de forma visual, sonora, sensitiva (vibração), impressa etc. Como exemplos de dispositivos de saída temos: tela, caixa de som, vibrador, luzes, impressora.

Então, com a linguagem de programação (software), conseguimos fazer muuuuitas coisas, mas já entendemos que ela não seria nada sem o dispositivo (hardware) para capturar entradas e gerar saídas. E isso serve também para o contrário. Por isso, os dois (hardware/software) sempre andam juntos.

Se você está lendo este site, quer dizer que você tem o necessário para começar a programar.

## Vamos construir nosso primeiro programa

Passei algum tempo pensando sobre nosso primeiro programa e em qual linguagem de programação iríamos escrevê-lo. Cheguei à seguinte conclusão: vamos escrever os programas inicias em 4 linguagens de programação: Javascript, PHP, Python e Ruby. Por quê? Porque, em algum momento, você terá que decidir qual é a sua linguagem favorita. Enquanto isso não acontece, vamos programando com essas.

A primeira coisa, antes de começar a construir o programa, é baixar e instalar a linguagem de programação no seu computador. Abaixo segue uma lista dos sites para download das linguagens:

- Javascript: [nodejs.org](https://nodejs.org)
- PHP: [php.net](http://php.net)
- Python: [python.org](https://www.python.org)
- Ruby: [ruby-lang.org](https://www.ruby-lang.org/en/)

Em alguns computadores, as linguagens já podem vir pré-instaladas. É o caso dos Macs e algumas distribuições Linux. Verifique isso antes de instalar. O processo de instalação é relativamente simples. Acredito que não existirá grandes dificuldades.

Se, a partir desse ponto, você quiser instalar somente uma linguagem, não tem problema. Estarei sempre mostrando os próximos exemplos com todas acima.

Para verificar se a instalação foi feita com sucesso, abra o terminal/prompt do seu computador - sim, é aquela tela preta com o cursor piscando - e digite:

### Javascript

`node -v` 

Saída: `v0.10.32`

### PHP

`php -v` 

Saída: `PHP 5.6.11 (cli) (built: Jul 14 2015 16:29:05)`

### Python

`python --version` 

Saída: `Python 2.7.10`

### Ruby

`ruby -v` 

Saída: `ruby 2.0.0p481 (2014-05-08 revision 45883)`

Esses comandos são usados somente para mostrar qual é a versão da linguagem de programação que você tem instalada. Se as saídas forem similares às que apresentei, está tudo certo!

## O contador de caracteres

Este será o nosso primeiro programa. Iremos informar um texto e o nosso programa dirá quantos caracteres foram encontrados.

Agora, vamos criar 4 arquivos (contar.js, contar.php, contar.py, contar.rb) com os respectivos códigos. Um em cada uma das linguagens que citei. Você pode criá-los com um editor de texto simples, como o Bloco de Notas.

### Javascript - contar.js

{% highlight javascript %}
var length = process.argv[2].length;
process.stdout.write("Total de: " + length);
{% endhighlight %}

Execução: `node contar.js Palavra`

### PHP - contar.php

{% highlight php %}
<?php
$length = strlen($argv[1]);
echo "Total de: " . $length;
{% endhighlight %}

Execução: `php contar.php Palavra`

### Python - contar.py

{% highlight python %}
import sys
length = len(sys.argv[1])
print "Total de: " + str(length)
{% endhighlight %}

Execução: `python contar.py Palavra`

### Ruby - contar.rb

{% highlight ruby %}
length = ARGV[0].length
puts "Total de: #{length}"
{% endhighlight %}

Execução: `ruby contar.rb Palavra`

## Não entendi nada!

No vídeo abaixo, explico com mais detalhes o que está acontecendo em cada programa. Assim, será mais simples o entendimento. "Dá o play, Maca!"

<iframe width="560" height="315" src="https://www.youtube.com/embed/tcQR1kUU6uQ" frameborder="0" allowfullscreen></iframe>

## Finalizando

Observe sempre a similariedade das linguagens e a forma como ela se comporta mediante o que foi executado. Não tenha medo de mudar o que foi escrito e observar as mensagens de erro. Com o tempo, elas serão suas amigas.

Gosto muito de ler códigos e, quando ele me diz o que faz, acho melhor ainda. Segue um site muito interessante para comparação entre linguagens:

- Javascript: [http://learnxinyminutes.com/docs/javascript/](http://learnxinyminutes.com/docs/javascript) (en)
- PHP: [http://learnxinyminutes.com/docs/pt-br/php-pt/](http://learnxinyminutes.com/docs/pt-br/php-pt)
- Python: [http://learnxinyminutes.com/docs/pt-br/python-pt/](http://learnxinyminutes.com/docs/pt-br/python-pt)
- Ruby: [http://learnxinyminutes.com/docs/pt-br/ruby-pt/](http://learnxinyminutes.com/docs/pt-br/ruby-pt)

Então é isso! Bom estudo e boas descobertas!