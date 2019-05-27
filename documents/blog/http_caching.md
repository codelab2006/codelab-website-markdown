# HTTP caching 详解
> author: Yongjian Huang
> tags: HTTP

文章摘要
**********
通过网络获取数据是一个缓慢的过程。如果重复的获取相同的数据，在网络资源利用上其实是很大的浪费，在用户体验上也会带来很大的延迟。对于浏览器这种主要通过网络来获取数据的客户端来说，缓存并重复利用之前获取的数据是如此的重要。幸运的是目前的浏览器都提供了缓存数据的功能。但是浏览器应该在何时缓存这些数据，应该将数据缓存多长时间？这就需要服务器通过 HTTP 协议来告诉浏览器，服务器通过在 HTTP Response Header 添加 Expires, Cache-Control, Last-Modified, Etag 等字段来告诉浏览器应该如何缓存数据。下面我们将逐个讲解这些字段是如何工作的。

## Expires

## Cache-Control

## Last-Modified

## Etag
