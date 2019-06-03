# 策略模式（Strategy pattern）
> author: Yongjian Huang
> tags: 设计模式-行为型模式

**********
```
package top.codelab.main;

interface Strategy {
    int doOperation(int n1, int n2);
}

class Add implements Strategy {

    @Override
    public int doOperation(int n1, int n2) {
        return n1 + n2;
    }
}

class Substract implements Strategy {

    @Override
    public int doOperation(int n1, int n2) {
        return n1 - n2;
    }
}

class Multiply implements Strategy {

    @Override
    public int doOperation(int n1, int n2) {
        return n1 * n2;
    }
}

class Divide implements Strategy {

    @Override
    public int doOperation(int n1, int n2) {
        return n1 / n2;
    }
}

class Context {

    private Strategy strategy;

    Context(Strategy strategy) {
        this.strategy = strategy;
    }

    int executeStrategy(int num1, int num2) {
        return this.strategy.doOperation(num1, num2);
    }
}

public class Main {

    public static void main(String[] args) {
        Context context = new Context(new Add());
        System.out.println("2 + 2 = " + context.executeStrategy(2, 2));

        context = new Context(new Substract());
        System.out.println("10 - 5 = " + context.executeStrategy(10, 5));

        context = new Context(new Multiply());
        System.out.println("10 * 5 = " + context.executeStrategy(10, 5));

        context = new Context(new Divide());
        System.out.println("10 / 5 = " + context.executeStrategy(10, 5));
    }
}
```
