# 责任链模式（Chain of responsibility pattern）
> author: Yongjian Huang
> tags: 设计模式-行为型模式

责任链模式，将数据的处理逻辑分离到不同的接收者类中，将接收者串成一个链。避免数据与接收者耦合在一起，每个接收者都遵循单一职责的原则。
**********
```
package top.codelab.main;

import java.util.Optional;

interface Handler {
    void handler();
}

abstract class AbstractHandler implements Handler {

    private Handler next;

    void setNext(Handler next) {
        this.next = next;
    }

    Handler getNext() {
        return this.next;
    }
}

class HandlerA extends AbstractHandler {

    @Override
    public void handler() {
        System.out.println("HandlerA handler......");
        this.getNext().handler();
        System.out.println("HandlerA handler......Done");
    }
}

class HandlerB extends AbstractHandler {

    @Override
    public void handler() {
        System.out.println("HandlerB handler......");
        Optional.ofNullable(this.getNext()).ifPresent(Handler::handler);
        System.out.println("HandlerB handler......Done");
    }
}

public class Main {

    public static void main(String[] args) {
        AbstractHandler a = new HandlerA();
        AbstractHandler b = new HandlerB();
        a.setNext(b);
        a.handler();
    }
}
```
