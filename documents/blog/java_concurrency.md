# Java 并发编程
> author: Yongjian Huang
> tags: Java Concurrency

文章摘要
**********
## Concurrency
### Processes and Threads
### Thread Objects
#### Defining and Starting a Thread
有两种方式创建线程：
- 创建一个实现了 Runnable 接口的类。将这个类的实例作为参数传给 Thread 类的构造函数。
```
class RunnableImpl implements Runnable {

    private int i = 0;

    @Override
    public void run() {
        while (this.i < 100) {
            System.out.println("RunnableImpl: " + this.i++);
        }
    }
}
```
- 创建一个 Thread 的子类。
```
class SubThread extends Thread {

    private int i = 0;

    @Override
    public void run() {
        while (this.i < 100) {
            System.out.println("SubThread: " + this.i++);
        }
    }
}
```
无论使用哪种方式，都需要调用 Thread 类实例的 start 方法去启动线程。
```
public class Main {

    public static void main(String[] args) {
        Thread runnableImpl = new Thread(new RunnableImpl());
        runnableImpl.start();

        Thread subThread = new SubThread();
        subThread.start();
    }
}
```
我该使用哪种方式？官方推荐使用第一种方式，因为 Java 中的类只支持单继承，使用 Runnable 接口可以使 RunnableImpl 从 Thread 以外的类继承，第二种方式你必须接受你的类是 Thread 的子类的事实。而且第一种方式可以把 Runnable 的任务和执行任务的 Thread 对象分离。这样更灵活。
#### Pausing Execution with Sleep
Thread.sleep 方法会将当前的线程暂停一段时间，这段时间有多长，通过传入的参数决定。在线程暂停期间，处理器的时间可用于其他的线程或者其他的应用程序。
#### Interrupts
线程如何支持中断，取决于它当前在做什么。如果它经常调用了会抛出 InterruptedException 异常的方法，它只需要在 catch 此异常之后返回，即可中断执行。例如：sleep interrupted
```
Thread sleepInterrupt = new Thread(new Runnable() {
    private String[] importantInfo = {
            "Mares eat oats",
            "Does eat oats",
            "Little lambs eat ivy",
            "A kid will eat ivy too"
    };

    @Override
    public void run() {
        for (String s : this.importantInfo) {
            try {
                //Pause for 4 seconds
                Thread.sleep(4000);
                //Print a message
                System.out.println(s);
            } catch (InterruptedException e) {
                return;
            }
        }
    }
});
sleepInterrupt.start();
Thread.sleep(10000);
sleepInterrupt.interrupt();
```
如果线程没有调用会抛出 InterruptedException 的方法，它必须调用 Thread.interrupted 去检查自己是否已经被终止。
```
Thread interrupt = new Thread(new Runnable() {
    @Override
    public void run() {
        while (true) {
            if (Thread.interrupted()) {
                break;
            }
        }
    }
});
interrupt.start();
Thread.sleep(2000);
interrupt.interrupt();
```
Interrupt 的内部机制是通过设置一个内部的标记来实现。调用目标线程实例的 interrupt 方法设置此标记，当目标线程调用 Thread.interrupted 方法检查标记之后，标记的值会被重置。但时当调用目标线程实例的 isInterrupted 方法检查标记之后，标记不会被重置。
```
Thread threadCheckinterrupt = new Thread(() -> {
    while (true) {
        if (Thread.interrupted()) {
            System.out.println(Thread.interrupted()); // false
            break;
        }
    }
});
threadCheckinterrupt.start();
Thread.sleep(2000);
threadCheckinterrupt.interrupt();
```
```
Thread instanceCheckInterrupt = new Thread() {
    @Override
    public void run() {
        while (true) {
            if (this.isInterrupted()) {
                System.out.println(Thread.interrupted()); // true
                break;
            }
        }
    }
};
instanceCheckInterrupt.start();
Thread.sleep(2000);
instanceCheckInterrupt.interrupt();
```
#### Joins
允许一个线程等待另一个线程完成后再继续执行。
```
Thread t1 = new Thread(() -> {
    try {
        System.out.println("before sleep...");
        Thread.sleep(2000);
        System.out.println("after sleep...");
    } catch (InterruptedException e) {
        e.printStackTrace();
    }
});
t1.start();
t1.join();
System.out.println("main...");
```
### Synchronization
#### Thread Interference
```
class Counter {
    private int c = 0;
    public void increment() {
        c++;
    }
    public void decrement() {
        c--;
    }
    public int value() {
        return c;
    }
}
```
Counter 类是非线程安全的，c++ 表达式可以被分为三步来执行：

1. 读取 c 的当前值
2. 将读取的值加 1
3. 将修改后的值写入变量 c

c-- 表达式也同样如此。
假设现在线程 A 调用了 increment 方法的同时线程 B 调用了 decrement 方法，这时可能出现一下的执行序列：
1. Thread A: Retrieve c.
2. Thread B: Retrieve c.
3. Thread A: Increment retrieved value; result is 1.
4. Thread B: Decrement retrieved value; result is -1.
5. Thread A: Store result in c; c is now 1.
6. Thread B: Store result in c; c is now -1.
#### Memory Consistency Errors
#### Synchronized Methods
#### Intrinsic Locks and Synchronization
#### Atomic Access
### Liveness
#### Deadlock
```
package top.codelab.main;

class Friend {
    private final String name;

    Friend(String name) {
        this.name = name;
    }

    private String getName() {
        return this.name;
    }

    synchronized void bow(Friend bower) {
        System.out.format("%s: %s"
                        + "  has bowed to me!%n",
                this.name, bower.getName());
        bower.bowBack(this);
    }

    private synchronized void bowBack(Friend bower) {
        System.out.format("%s: %s"
                        + " has bowed back to me!%n",
                this.name, bower.getName());
    }
}

public class Main {

    public static void main(String[] args) {
        final Friend alphonse =
                new Friend("Alphonse");
        final Friend gaston =
                new Friend("Gaston");
        new Thread(() -> alphonse.bow(gaston)).start();
        new Thread(() -> gaston.bow(alphonse)).start();
    }
}
```
#### Starvation and Livelock
- Starvation
假设一个对象的一个 synchronized 方法需要执行很长的时间，如果一个线程频繁的调用此方法，其他需要频繁同步访问同一对象的线程通常会被阻止。
- Livelock
### Guarded Blocks
### Immutable Objects
#### A Synchronized Class Example
#### A Strategy for Defining Immutable Objects
### High Level Concurrency Objects
#### Lock Objects
#### Executors
##### Executor Interfaces
- Executor
- ExecutorService
- ScheduledExecutorService
##### Thread Pools
##### Fork/Join
#### Concurrent Collections
#### Atomic Variables
#### Concurrent Random Numbers



