---
author: abdala
comments: true
date: 2012-05-01 19:19:03+00:00
layout: post
slug: testando-um-framework-php
title: Testando um framework PHP
wordpress_id: 76
tags:
- ant
- ci
- framework
- integracao
- phpunit
- planeta
- travis
---

Quando resolvi fazer a palestra sobre PHPUnit para o FLISOL, tive a ideia de também escrever os testes unitários em português para o Planeta Framework. Assim poderia esclarecer algumas dúvidas que tinha e ainda divulgar um bom material sobre testes.

Então escrevi todos os testes unitários. O interessante quando se escreve testes é que acabamos mudando a estrutura do código, deixando-a mais clara e mais fácil de ser testada. Isso é muito bom para planejamento de futuras arquiteturas e projetos.

Quando pensei que tinha acabado, resolvi colocar algumas ferramentas de validação, métrica e documentação. Peguei alguns exemplos do Sebastian Bergmann e coloquei as ferramentas para serem executadas por meio do Ant. É muito legal ver o resultado disso tudo rodando.

Para finalizar com estilo livre, quando subi para o Github, lembrei que poderia colocá-lo para rodar no servidor de integração contínua: Travis (travis-ci.org). Após dolorosas 14 tentativas, ele ficou verdinho. Nada como uma bolinha verde para o dia ficar feliz!

Todos os arquivos de configuração utilizados e todos os testes já estão disponíveis no Github: [https://github.com/abdala/Planeta-Framework](https://github.com/abdala/Planeta-Framework).

Estude com carinho! E se tiver alguma sugestão de aperfeiçoamento da nossa ferramenta de estudo: fork, fork, fork!

Abraço!
