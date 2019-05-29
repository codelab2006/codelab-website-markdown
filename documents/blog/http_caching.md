# HTTP caching 详解
> author: Yongjian Huang
> tags: HTTP

浏览器从服务器获取数据是一个缓慢的过程，如果重复获取相同的数据，对网络资源是很大的浪费（最常见的就是数据流量资源的浪费）。幸运的是浏览器都提供了缓存数据的功能，数据从服务器返回后被浏览器缓存起来，当再一次需要时，直接从缓存中获取，即加快了数据获取速度，又节约了网络资源。但是如果浏览器盲目的缓存数据，当服务器端数据发生变化时，缓存的数据不能及时的得到更新，这将出现浏览器和服务器数据不同步的问题。这对于某些行业的应用来说是不可接受的。所以浏览器该在什么时候缓存数据，该如何缓存数据，这就需要服务器给出指示。服务器可以在 HTTP Response Header 里添加 Expires, Cache-Control, Last-Modified, Etag 等字段来告诉浏览器如何缓存数据。
**********
## Expires

服务器可以在 HTTP Response Header 里添加 Expires 字段来告诉浏览器，请缓存当前请求的数据，并且在过期时间之前，如果再一次需要这些数据，就从缓存中获取，不必再发送请求给服务器。这个过期时间就是该字段的值，例如：
```
    Expires: Wed, 29 May 2019 14:30:48 GMT
```
如果浏览器在 29 May 2019 14:30:48 GMT 之前再次需要相同的数据，就不会再发送请求，而是直接从缓存获取。

我们来看一个具体的例子，浏览器向服务器发送了一个 GET Request 获取数据。服务器返回了一个 Response，注意到 Response Header 中包含了一个 `Expires` 字段，值为 `Mon, 27 May 2019 14:39:56 GMT` 如下图所示：

![Image](https://raw.githubusercontent.com/codelab2006/codelab-website-markdown/master/resources/http_caching/expires_1st_response.png)

这就意味着服务器通知浏览器在 `Mon, 27 May 2019 14:39:56 GMT` 之前如果需要相同的数据，请直接从缓存中获取。

接下来我们让浏览器再一次请求相同的数据（当前的时间是在 `Mon, 27 May 2019 14:39:56 GMT` 之前），这时我们从浏览器开发者工具的 Network 视图仍然可以看到一个 GET Request 被发送，并且接收到由服务器“返回”（这里我特意用了引号）的 Response。但是请注意，`Status Code: 200 OK` 后面的括号里的内容。没错，这个 Response 是浏览器从自己的 disk cache 中获取的，而这个 GET Request 也没有被真正的发送出去（你们可以使用类似 Fiddle 的代理工具去验证是否有请求被发送）。如下图所示：

![Image](https://raw.githubusercontent.com/codelab2006/codelab-website-markdown/master/resources/http_caching/expires_2nd_response.png)

我们通过上面的例子可以很清晰的知道 `Expires` 字段是如何工作的。如果你们希望浏览器在某个过期时间之前都使用缓存的数据，请使用 `Expires` 字段。

*(什么？你们还想知道在过期时间之后获取相同的数据会怎么样？那当然是真的发送请求给服务器获取数据啦，请自己验证......)*

## Cache-Control

