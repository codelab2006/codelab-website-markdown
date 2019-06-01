# 桥接模式（Bridge pattern）
> author: Yongjian Huang
> tags: 设计模式, 结构型模式

文章摘要
**********
```
package top.codelab.main;

interface Logger {
    public void log(String message);

    static Logger info() {
        return message -> System.out.println("info: " + message);
    }

    static Logger warning() {
        return message -> System.out.println("warning: " + message);
    }
}

abstract class AbstractAccount {
    private Logger logger = Logger.info();

    public void setLogger(Logger logger) {
        this.logger = logger;
    }

    protected void operate(String message, boolean result) {
        this.logger.log(message + " result " + result);
    }
}

class Account extends AbstractAccount {
    private int balance;

    public Account(int balance) {
        this.balance = balance;
    }

    public boolean isBalanceLow() {
        return this.balance < 50;
    }

    public void withdraw(int amount) {
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
