# 中介者模式（Mediator pattern）
> author: Yongjian Huang
> tags: 设计模式, 行为型模式

文章摘要
**********
```
package top.codelab.main;

import java.util.LinkedList;
import java.util.List;

interface Mediator {

    void register(MessageExchange me);

    void send(MessageExchange sender, String message);
}

interface MessageExchange {

    void setMediator(Mediator mediator);

    void send(String message);

    void receive(MessageExchange sender, String message);
}

class User implements MessageExchange {

    private Mediator mediator;

    private String name;

    User(String name) {
        this.name = name;
    }

    @Override
    public void setMediator(Mediator mediator) {
        this.mediator = mediator;
    }

    @Override
    public void send(String message) {
        this.mediator.send(this, message);
    }

    @Override
    public void receive(MessageExchange sender, String message) {
        System.out.println(this.name + " receive: " + ((User) sender).name + ", message: " + message);
    }
}

class ConcreteMediator implements Mediator {

    private List<MessageExchange> list = new LinkedList<>();

    @Override
    public void register(MessageExchange me) {
        if (this.list.contains(me)) return;
        this.list.add(me);
        me.setMediator(this);
    }

    @Override
    public void send(MessageExchange sender, String message) {
        this.list.forEach(me -> {
            if (me != sender) me.receive(sender, message);
        });
    }
}

public class Main {

    public static void main(String[] args) {
        Mediator mediator = new ConcreteMediator();

        MessageExchange me1 = new User("User1");
        MessageExchange me2 = new User("User2");
        MessageExchange me3 = new User("User3");
        MessageExchange me4 = new User("User4");
        mediator.register(me1);
        mediator.register(me2);
        mediator.register(me3);
        mediator.register(me4);

        me1.send("Hi I'm User1");
        me2.send("Hi I'm User2");
        me3.send("Hi I'm User3");
        me4.send("Hi I'm User4");
    }
}
```
