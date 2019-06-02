# 观察者模式（Observer pattern）
> author: Yongjian Huang
> tags: 设计模式, 行为型模式

文章摘要
**********
中介者模式和观察者模式的区别：
- 中介者模式，对象A通过对象B与调用对象C
- 观察者模式，观察目标对象，目标对象发生变化时，调用观察者的方法通知观察者
```
package top.codelab.main;

import java.util.ArrayList;
import java.util.List;

abstract class Observer {

    Subject subject;

    abstract void update();
}

class Subject {

    private List<Observer> observers = new ArrayList<>();
    private int state;

    int getState() {
        return this.state;
    }

    void setState(int state) {
        this.state = state;
        this.notifyAllObservers();
    }

    void attach(Observer observer) {
        this.observers.add(observer);
    }

    private void notifyAllObservers() {
        for (Observer observer : this.observers) {
            observer.update();
        }
    }
}

class BinaryObserver extends Observer {

    BinaryObserver(Subject subject) {
        this.subject = subject;
        this.subject.attach(this);
    }

    @Override
    public void update() {
        System.out.println("Binary String: "
                + Integer.toBinaryString(this.subject.getState()));
    }
}

class OctalObserver extends Observer {

    OctalObserver(Subject subject) {
        this.subject = subject;
        this.subject.attach(this);
    }

    @Override
    public void update() {
        System.out.println("Octal String: "
                + Integer.toOctalString(this.subject.getState()));
    }
}

class HexaObserver extends Observer {

    HexaObserver(Subject subject) {
        this.subject = subject;
        this.subject.attach(this);
    }

    @Override
    public void update() {
        System.out.println("Hex String: "
                + Integer.toHexString(this.subject.getState()).toUpperCase());
    }
}

public class Main {

    public static void main(String[] args) {
        Subject subject = new Subject();

        new HexaObserver(subject);
        new OctalObserver(subject);
        new BinaryObserver(subject);

        System.out.println("First state change: 15");
        subject.setState(15);
        System.out.println("Second state change: 10");
        subject.setState(10);
    }
}
```
