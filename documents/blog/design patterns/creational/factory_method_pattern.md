# 工厂方法模式（Factory method pattern）
> author: Yongjian Huang
> tags: 设计模式, 创建型模式

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

abstract class PCFactory {
    protected abstract PC makePC();

    PC createPC() {
        return this.makePC();
    }
}

class HPPCFactory extends PCFactory {

    @Override
    protected PC makePC() {
        return new HPPC();
    }
}

class DELLPCFactory extends PCFactory {

    @Override
    protected PC makePC() {
        return new DELLPC();
    }
}

public class Main {

    public static void main(String[] args) {
        PCFactory hpPCFactory = new HPPCFactory();
        PC hpPC = hpPCFactory.createPC();
        hpPC.run();
        PCFactory dellPCFactory = new DELLPCFactory();
        PC dellPC = dellPCFactory.createPC();
        dellPC.run();
    }
}
```
