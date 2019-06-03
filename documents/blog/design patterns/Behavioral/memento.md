# 备忘录模式（Memento pattern）
> author: Yongjian Huang
> tags: 设计模式-行为型模式

文章摘要
**********
```
package top.codelab.main;

import java.util.ArrayList;
import java.util.List;

class Memento {
    private String state;

    Memento(String state) {
        this.state = state;
    }

    String getState() {
        return this.state;
    }
}

class Originator {

    private String state;

    void setState(String state) {
        this.state = state;
    }

    String getState() {
        return this.state;
    }

    Memento saveStateToMemento() {
        return new Memento(this.state);
    }

    void getStateFromMemento(Memento Memento) {
        this.state = Memento.getState();
    }
}

class CareTaker {

    private List<Memento> mementoList = new ArrayList<>();

    void add(Memento state) {
        this.mementoList.add(state);
    }

    Memento get(int index) {
        return this.mementoList.get(index);
    }
}

public class Main {

    public static void main(String[] args) {
        Originator originator = new Originator();
        CareTaker careTaker = new CareTaker();
        originator.setState("State #1");
        originator.setState("State #2");
        careTaker.add(originator.saveStateToMemento());
        originator.setState("State #3");
        careTaker.add(originator.saveStateToMemento());
        originator.setState("State #4");

        System.out.println("Current State: " + originator.getState());
        originator.getStateFromMemento(careTaker.get(0));
        System.out.println("First saved State: " + originator.getState());
        originator.getStateFromMemento(careTaker.get(1));
        System.out.println("Second saved State: " + originator.getState());
    }
}
```
