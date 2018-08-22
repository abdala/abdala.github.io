---
layout: post
title:  When else is not bad? 
date:   2018-06-20 22:23:00
author: Abdala Cerqueira
categories: 
  - diversos
tags:
  - programação
  - iniciando
---

According with Rule 2 of Object Calisthenics you should not use ELSE condition. So there are some techniques to avoid using it. Like in this examples:

### 1 - Default value declaration

{% highlight php %}
<?php

$page = "index";

if (isset($_GET['page'])) {
    $page = $_GET['page'];
}

{% endhighlight %}

### 2 - Early return

{% highlight php %}
<?php

if (isset($_GET['page'])) {
    return $_GET['page'];
}

return 'index';

{% endhighlight %}

### 3 - Use CONTINUE inside loops

{% highlight php %}
<?php

foreach ($actions as $action) {
    if ($action === LEFT) {
        $object->moveLeft();

        continue;
    }

    $object->moveRight();
}

{% endhighlight %}

When a saw this techniques I was a very excited about it and I had a lot fun killing ELSES.

Nowadays I use IF conditions to express the exception behavior of my code and keep all main behavior in the first level of the function/method.

But what to do when we have two or more possible behaviors? In this case, I think it is better to use the ELSE condition. Because the code behavior is not an exception anymore. All two or more possibilities are valid behaviors.

Let's rewrite the CONTINUE example using ELSE now:

{% highlight php %}
<?php

foreach ($actions as $action) {
    if ($action === LEFT) {
        $object->moveLeft();
    } else {
        $object->moveRight();
    }
}

{% endhighlight %}

It seems better to understand, right? There is not just one main behavior. This two possibilities have the same importance in the code execution. They are valid behaviors. I always try to keep my code small and readable. Some of this small decisions make a difference in my day by day.

Let's keep it simple! Let's write less code!
