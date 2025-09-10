---
layout: post
title:  Manhê! Aprendi a programar! Web
date:   2016-12-09 13:50:00
author: Abdala Cerqueira
categories: 
- projetos
tags:
- programação
- dummy
- iniciando
---

Para quem ainda não leu os primeiros artigos:

- [Manhê! Aprendi a programar!](http://binaryja.cc/projetos/2015/02/14/manhe-aprendi-a-programar)
- [Manhê! Aprendi a programar! I/O](http://binaryja.cc/projetos/2016/08/09/manhe-aprendi-a-programar-io)
- [Manhê! Aprendi a programar! Bibliotecas](http://binaryja.cc/projetos/2016/08/21/manhe-aprendi-a-programar-bibliotecas)

## Web

Não poderia deixar de lado umas das mais atuais plataformas de desenvolvimento. Desenvolver sites e sistemas web é uma necessidade de qualquer profissional nos tempos modernos.

O ganho de interação e as facilidades de atualização e compatibilidade, fazem da web uma plataforma muito simples e atrativa.

## Como funciona a internet

Basicamente temos dois atores principais: cliente e servidor. O cliente (que pode ser um navegador) faz uma requisição para o servidor (endereço/url ou IP). O servidor processa essa requisição e devolve uma resposta para o cliente. Essa resposta pode ser textual, gráfica etc.

Quando estamos desenvolvendo nossos sistemas, os dois atores estão na nossa própria máquina, mas quando queremos disponibilizar para acesso de todos, devemos colocar os scripts em um servidor real, que geralmente chamamos: servidor de produção.

## Interação com usuário

Na web a interação com o usuário pode ser realizada de diversas maneiras. A forma mais comum de entrada de dados (input) é por meio de formulários. Podemos criá-los utilizando a linguagem de formatação chamada: HTML. Essa linguagem é amplamente compreendida pelos navegadores (browsers). Sua estrutura é delimitada por tags e, cada tag, tem a sua função/representação.

O que vamos fazer nesse artigo é algo bem simples, o necessário para saber como capturamos e mostramos informações de maneira dinâmica em páginas web.

## Servidor web

A maioria das linguagens modernas já promovem mecanismos de criação de servidores web de forma embutida, sem a necessidade de instalar um software específico (ex: Apache, Nginx) para agir como servidor web. Iremos utilzar servidores web embutidos nesse artigo, mas é importante lembrar que eles devem ser usados somente em ambientes de desenvolvimento devido as suas limitações de funcionalidades.

## HTML

Vamos criar então o nosso arquivo HTML que será base de entrada para todos os exemplos. Esse arquivo vai se chamar: index.html

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Formulário</title>
    </head>
    <body>
        <form action="/capturar" method="post">
            Nome: <input name="nome"> <input type="submit">
        </form>
    </body>
</html>
```

### Passo a passo:

- `<!DOCTYPE html>` diz para o navegador que estamos utilizando HTML5
- `<html>` tag principal de um documento HTML
- `<head>` delimita as informações de cabeçalho do arquivo (meta informações)
- `<meta charset="utf-8">` define qual será o padrão de codificação utilizado
- `<title>` define o título da página
- `<body>` delimita tudo o que será visível para o usuário
- `<form>` delimita o formulário
- `<input>` tag utilizada para criação de elementos de entrada de dados. Possue vários tipos/type (Ex: text, checkbox, radio, submit)
