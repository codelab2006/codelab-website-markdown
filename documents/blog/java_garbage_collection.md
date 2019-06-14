# Java 垃圾回收
> author: Yongjian Huang
> tags: Java Garbage Collection

文章摘要
**********
## GC 的实现
### Serial Garbage Collector
单线程，运行时冻结所有其他线程。
### Parallel Garbage Collector
Java 8 默认 GC，多线程管理，运行时冻结所有其他线程。
### CMS Garbage Collector
多线程管理，它专为需要更短垃圾收集暂停的应用程序而设计，并且可以在应用程序运行时与垃圾收集器共享处理器资源。
### G1 Garbage Collector
为大内存多处理器环境设计，G1 收集器将取代 CMS 收集器，因为它更具性能效率。
