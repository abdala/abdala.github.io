---
layout: post
title:  Manhê! Aprendi a programar! Bibliotecas
date:   2016-08-20 15:50:00
author: Abdala Cerqueira
categories: 
- projetos
tags:
- programação
- dummy
- iniciando
---

Para quem ainda não leu os primeiros artigos:

- [Manhê! Aprendi a programar!](http://binaryja.cc/manhe-aprendi-a-programar)
- [Manhê! Aprendi a programar! I/O](http://binaryja.cc/manhe-aprendi-a-programar-io)

## Bibliotecas

Quando estamos aprendendo a programar, uma das coisas que descobrimos é que a escolha de uma biblioteca pode agilizar o desenvolvimento, mas pode também causar alguns transtornos. 

A escolha e a utilização de uma biblioteca pode parecer uma tarefa simples, mas muitas vezes é bem trabalhosa. Aprender sua Application Programming Interface (API), lidar com dependências, atualizações, falhas de segurança e por aí vai... Com isso em mente, colocando na balança, na maioria dos casos, a utilização de uma biblioteca ainda traz mais vantagens, principalmente quando não dominamos o problema resolvido por ela.

Veja como exemplo as bibliotecas que vamos utilizar neste artigo: não precisamos de fato saber como a manipulação da imagem é realizada. Iremos apenas utilizar uma biblioteca que fará toda a parte mais complicada para nós.

## Gerenciando bibliotecas

Imagine um cenário onde temos várias bibliotecas sendo utilizadas. Agora pense no quanto seria difícil mantê-las atualizadas e manter todos os relacionamentos e conflitos que podem acontecer. Sem contar ainda o conflito com relação à versão da linguagem utilizada.

É... Se você pensar um pouquinho, já dá para notar que isso é um baita problema. Mas trago boas notícias. É um baita problema já resolvido.

Na maioria das linguagens de programação, já existem gerenciadores de pacotes/bibliotecas. Esse é o caso das linguagens que estamos utilizando.

Iremos usar os seguintes gerenciadores:

- Javascript: [npm](https://www.npmjs.com/)
- PHP: [composer](http://getcomposer.org)
- Python: [pip](https://pypi.python.org/pypi/pip/)
- Ruby: [gem](https://rubygems.org/)

Em alguns computadores, os gerenciadores já podem vir pré-instalados. É o caso dos Macs e de algumas distribuições Linux. Verifique isso antes de instalar.

Se, a partir desse ponto, você quiser instalar somente um gerenciador, não tem problema. Os próximos exemplos serão mostrados sempre com todos os gerenciadores acima.

Para verificar se a instalação foi feita com sucesso, abra o terminal/prompt do seu computador - sim, é aquela tela preta com o cursor piscando - e digite:

### Javascript

`npm -v` Saída: `3.10.6`

### PHP

`composer -V` Saída: `Composer version 1.2.0 2016-07-19 01:28:52`

### Python

`pip --version` Saída: `pip 1.5.4 from /usr/lib/python2.7/dist-packages (python 2.7)`

### Ruby

`gem -v` Saída: `2.6.6`

Esses comandos são usados somente para mostrar qual é a versão do gerenciador instalado. Se as saídas forem similares às apresentadas, está tudo certo!

## Manipulado imagens

Pensando em coisas que podem ser de fato úteis, vamos construir um programa para redimensionar imagens.

Agora, vamos criar 4 arquivos (redimensionar.js, redimensionar.php, redimensionar.py, redimensionar.rb) com os respectivos códigos. Você pode criá-los com um editor de texto simples, como o Bloco de Notas.

Antes de executar os arquivos, precisamos instalar as bibliotecas que serão utilizadas:

- Javascript: `npm install resize-img`
- PHP: `composer require imagine/imagine` (necessário ter a biblioteca Imagick ou GD instalada na máquina)
- Python: `pip install Pillow`
- Ruby: `gem install mini_magick` (necessário ter a biblioteca Imagick instalada na máquina)

Tenha paciência! Esses comandos podem demorar para ser executados, pois o download das bibliotecas será feito. Só assim conseguiremos utilizá-las. Na programação não existe mágica. O código sempre terá que estar em algum lugar para ser executado. Cada gerenciador irá armazenar o código em um lugar diferente. Consulte a documentação do gerenciador para localizar os arquivos caso tenha curiosidade.

Repare que, no início de cada arquivo, estamos importando (import/require) os códigos da biblioteca para poder utilizá-los. Dessa maneira, todas as funções, classes e métodos estarão disponíveis para serem chamados.

Uma boa biblioteca sempre terá uma documentação clara e atualizada. Ninguém quer ficar adivinhando como uma biblioteca funciona, por isso, é mais que necessário ter uma referência confiável da sua utilização.

Nos códigos abaixo, estamos fazendo exatamente a mesma coisa:

1. Importando a bibiloteca
2. Carregando a imagem
3. Redimensionado a imagem para o tamanho de 120x120
4. Salvando a imagem com um nome diferente

### Javascript - redimensionar.js

{% highlight javascript %}
const fs = require('fs');
const resizeImg = require('resize-img');

const imagem = fs.readFileSync('imagem.jpg');

resizeImg(imagem, {width: 120, height: 120}).then(buf => {
    fs.writeFileSync('imagem-120x120.jpg', buf);
});
{% endhighlight %}

Execução: `node redimensionar.js`

### PHP - redimensionar.php

{% highlight php %}
<?php
require 'vendor/autoload.php';

$imagem = new Imagine\Imagick\Imagine();

$imagem->open('imagem.jpg')
       ->resize(new Imagine\Image\Box(120, 120))
       ->save('image120x120.jpg');
{% endhighlight %}

Execução: `php redimensionar.php`

### Python - redimensionar.py

{% highlight python %}
import PIL
from PIL import Image

imagem = Image.open('imagem.jpg')
imagem = imagem.resize((120, 120), PIL.Image.ANTIALIAS)
imagem.save('imagem120x120.jpg')
{% endhighlight %}

Execução: `python redimensionar.py`

### Ruby - redimensionar.rb

{% highlight ruby %}
require 'mini_magick'

imagem = MiniMagick::Image.open("imagem.jpg")
imagem.resize "120x120"
imagem.write "imagem120x120.jpg"
{% endhighlight %}

Execução: `ruby redimensionar.rb`

## Finalizando

Todos os códigos fazem referência à mesma imagem: imagem.jpg, que deve estar localizada na mesma pasta dos códigos. Isso quer dizer que nosso programa está limitado a redimensionar somente essa imagem. No artigo anterior, vimos como poderíamos passar parâmetros para nosso código. Então, fica aqui o desafio: fazer o nosso código funcionar de maneira dinâmica, passando por parâmetro a imagem que será redimensionada. Assim, poderemos redimensionar qualquer imagem passada.

Então é isso! Bom estudo e boas descobertas!
