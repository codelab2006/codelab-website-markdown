# 抽象工厂模式（Abstract factory pattern）
> author: Yongjian Huang
> tags: 设计模式-创建型模式

文章摘要
**********
```
package top.codelab.main;

interface PC {
    void run();
}

class HPPC implements PC {

    @Override
    public void run() {
        System.out.println("HP PC running...");
    }
}

class DELLPC implements PC {

    @Override
    public void run() {
        System.out.println("DELL PC running...");
    }
}

interface PCFactory {
    PC createPC();
}

class HPPCFactory implements PCFactory {

    @Override
    public PC createPC() {
        return new HPPC();
    }
}

class DELLPCFactory implements PCFactory {

    @Override
    public PC createPC() {
        return new DELLPC();
    }
}

public class Main {

    public static void main(String[] args) {
        PCFactory factory;
        factory = new HPPCFactory();
        factory.createPC().run();

        factory = new DELLPCFactory();
        factory.createPC().run();
    }
}
```
