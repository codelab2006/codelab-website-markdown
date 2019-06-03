# 状态模式（State pattern）
> author: Yongjian Huang
> tags: 设计模式-行为型模式

**********
```
package top.codelab.main;

interface State {
    void writeName(StateContext sc, String name);
}

class LowerCaseState implements State {

    @Override
    public void writeName(StateContext sc, String name) {
        System.out.println(name.toLowerCase());
        sc.setState(new MultipleUpperCaseState());
    }
}

class MultipleUpperCaseState implements State {

    private int count = 0;

    @Override
    public void writeName(StateContext sc, String name) {
        System.out.println(name.toUpperCase());
        if (++this.count > 1) {
            sc.setState(new LowerCaseState());
        }
    }
}

class StateContext {

    private State state;

    StateContext() {
        this.state = new LowerCaseState();
    }

    void setState(State state) {
        this.state = state;
    }

    void writeName(String name) {
        this.state.writeName(this, name);
    }
}

public class Main {

    public static void main(String[] args) {
        StateContext sc = new StateContext();
        sc.writeName("Monday");
        sc.writeName("Tuesday");
        sc.writeName("Wednesday");
        sc.writeName("Thursday");
        sc.writeName("Friday");
        sc.writeName("Saturday");
        sc.writeName("Sunday");
    }
}
```
