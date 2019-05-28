# HTTP caching 详解
> author: Yongjian Huang
> tags: HTTP

通过网络从服务器获取数据是一个缓慢的过程。如果重复的从服务器获取相同的数据，这将会对网络资源造成浪费。对于浏览器这种主要通过网络来获取数据的客户端来说，缓存并重复利用之前获取的数据是如此的重要。幸运的是目前的浏览器都提供了缓存数据的功能。但是浏览器应该在何时缓存数据，应该将数据缓存多长时间？这就需要服务器通过 HTTP 协议来告诉浏览器，服务器通过在 HTTP Response Header 添加 Expires, Cache-Control, Last-Modified, Etag 等字段来通知浏览器应该如何缓存数据。
**********
## Expires

服务器通过在 HTTP Response Header 中添加一个 Expires 字段（例如：`Expires: Mon, 27 May 2019 14:06:06 GMT`）来通知浏览器缓存当前请求的数据，并在指定的过期时间之前如果再次需要相同的数据请从缓存中取，不必再向服务器发送请求。而这个过期时间就是 Expires 字段的值，这里是 `Mon, 27 May 2019 14:06:06 GMT`。我们来看一个具体的例子：
1. 浏览器向服务器发送了一个 Request 我们称它为 Request A（URL为 `http://127.0.0.1:3000/`）
2. 服务器返回了一个 Response 我们称它为 Response A（注意 Response Header 中有一个 Expires 字段 `Expires: Mon, 27 May 2019 14:39:56 GMT`）

    ![Image](/codelab-website/resources/http_caching/expires_1st_response.png)

3. 假设浏览器在收到 Response A 之后，在 `Mon, 27 May 2019 14:39:56 GMT` 之前又发送了一个相同的 Request 我们称它为 Request B（URL为 `http://127.0.0.1:3000/`）
4. 这次服务器“返回”了一个相同的 Response 我们称它为 Response B

    ![Image](/codelab-website/resources/http_caching/expires_2nd_response.png)

请注意第二次的返回我打了引号，以及 Response B 的 Status Code: 200 后面的括号中的内容 “from disk cache”。没错，其实 Response B 并不是服务器返回的，因为浏览器根本就没有发送 Request B 给服务器，Response B 其实是浏览器缓存的 Response A。大家可能会问，你怎么知道 Request B 没有发出去？我们从浏览器的 Network 视图看见它是一个有效的请求呀！要回答这个问题你们可以使用类似 Fiddler 这样的代理工具去验证，看看是否有请求通过了代理，这里就不再验证。为什么浏览器没有发送 Request B，而是从缓存中直接取用 Response A 呢？因为 Request B 是在 `Mon, 27 May 2019 14:39:56 GMT` 之前，也就是 Response A 过期之前发送的。浏览器发现请求的是相同的数据（URL为 `http://127.0.0.1:3000/`），数据已经缓存并且没有过期，所以就重复使用它们。

## Cache-Control

## Last-Modified

## Etag
