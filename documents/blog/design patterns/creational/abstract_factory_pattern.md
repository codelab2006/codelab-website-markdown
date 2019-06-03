# 抽象工厂模式（Abstract factory pattern）
> author: Yongjian Huang
> tags: 设计模式-创建型模式

抽象工厂模式，当产品分为不同的产品族时使用。此模式便于添加新的产品族，但是不便于添加新的产品。
**********
```
package top.codelab.main;

interface PC {
    void run();
}

interface Laptop {
    void run();
}

class HPPC implements PC {

    @Override
    public void run() {
        System.out.println("HP PC running...");
    }
}

class HPLaptop implements Laptop {

    @Override
    public void run() {
        System.out.println("HP Laptop running...");
    }
}

class DELLPC implements PC {

    @Override
    public void run() {
        System.out.println("DELL PC running...");
    }
}

class DELLLaptop implements Laptop {

    @Override
    public void run() {
        System.out.println("DELL Laptop running...");
    }
}

interface PCFactory {
    PC createPC();

    Laptop createLaptop();
}

class HPPCFactory implements PCFactory {

    @Override
    public PC createPC() {
        return new HPPC();
    }

    @Override
    public Laptop createLaptop() {
        return new HPLaptop();
    }
}

class DELLPCFactory implements PCFactory {

    @Override
    public PC createPC() {
        return new DELLPC();
    }

    @Override
    public Laptop createLaptop() {
        return new DELLLaptop();
    }
}

public class Main {

    public static void main(String[] args) {
        PCFactory factory;
        factory = new HPPCFactory();
        factory.createPC().run();
        factory.createLaptop().run();

        factory = new DELLPCFactory();
        factory.createPC().run();
        factory.createLaptop().run();
    }
}
```
