---
layout: post
title:  Single file, multistage 
date:   2018-12-12 22:23:00
author: Abdala Cerqueira
categories: 
  - diversos
tags:
  - programação
---

It took me time to find a reasonable docker/docker-compose configuration that is good for all my environments. I was searching for a solution to use the same Dockerfile in different environments and continue with a small/readable image.

After some tests and researches I found myself using Multistage Dockerfile a lot and it fits very well for all my need. Multistage is when you have more than one `FROM` command in the same Dockerfile.

For better understanding we have to keep in mind 2 things:

1. The latest FROM instruction will be the final image
2. We have to explicit copy files between stages

## PHP application

In this example I want to run Composer and PHPUnit to test my code, but I don't want all development dependencies and composer in the final image.

**Dockerfile:**

{% highlight bash %}
FROM alpine:3.8 as cli

COPY . /app

WORKDIR /app

RUN apk add --update composer php7-zip php7-dom php7-curl php7-xml php7-xmlwriter \
&&  composer install --no-interaction --no-dev

FROM alpine:3.8

RUN apk add --update php7-apache2

COPY --from=cli /app /app

WORKDIR /app

EXPOSE 80

CMD httpd -DFOREGROUND

{% endhighlight %}

### Using composer and running tests

To run composer commands and tests we can use docker-compose to organize it better and use the *target* option to set a specific stage to the build.

**docker-compose.yml:**

{% highlight yml %}

version: '3.4'

services:
  cli:
    build:
      context: .
      target: cli
    volumes:
      - .:/app
  app:
    build: .
    volumes:
      - .:/app
    ports:
      - 8080:80

{% endhighlight %}

Now, we can run `docker-compose run --rm cli composer update` to update composer dependencies and `docker-compose run --rm cli ./vendor/bin/phpunit` to run tests

Let's keep it simple! Let's write less code!
