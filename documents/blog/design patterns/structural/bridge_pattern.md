# 桥接模式（Bridge pattern）
> author: Yongjian Huang
> tags: 设计模式-结构型模式

桥接模式，当抽象类 A 有 x 个不同的实现，接口 B 有 y 个不同的实现。
如果 A 引用 B 的实例，这时就使用桥接模式，将 A 的实现和 B 的实现分离，最终只需要 x + y 个实现类，避免由于类继承导致的类爆炸问题。如果使用同时实现 A 和 B 的方式，将产生 x * y 个实现类。
**********
```
package top.codelab.main;

interface Logger {
    void log(String message);

    static Logger info() {
        return message -> System.out.println("info: " + message);
    }

    static Logger warning() {
        return message -> System.out.println("warning: " + message);
    }
}

abstract class AbstractAccount {
    private Logger logger = Logger.info();

    void setLogger(Logger logger) {
        this.logger = logger;
    }

    void operate(String message, boolean result) {
        this.logger.log(message + " result " + result);
    }
}

class Account extends AbstractAccount {
    private int balance;

    Account(int balance) {
        this.balance = balance;
    }

    boolean isBalanceLow() {
        return this.balance < 50;
    }

    void withdraw(int amount) {
        boolean shouldPerform = this.balance >= amount;
        if (shouldPerform) {
            this.balance -= amount;
        }
        this.operate("withdraw " + amount, shouldPerform);
    }
}

public class Main {

    public static void main(String[] args) {
        Account account = new Account(100);
        account.withdraw(75);

        if (account.isBalanceLow()) {
            account.setLogger(Logger.warning());
        }

        account.withdraw(10);
        account.withdraw(100);
    }
}
```
