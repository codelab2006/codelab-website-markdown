# 原型模式（Prototype pattern）
> author: Yongjian Huang
> tags: 设计模式-创建型模式

原型模式，用于创建具有相同原型的重复的对象。
特别是当对象的创建代价较大时，原型模式可以帮助我们有效的提高性能。
**********
```
package top.codelab.main;

abstract class PC implements Cloneable {

    private String logo;
    private byte[] bs;

    PC(String logo, byte[] bs) {
        this.logo = logo;
        this.bs = bs;
    }

    abstract void run();

    @Override
    public PC clone() throws CloneNotSupportedException {
        return (PC) super.clone();
    }
}

class HPPC extends PC {

    HPPC(String logo, byte[] bs) {
        super(logo, bs);
    }

    @Override
    void run() {
        System.out.println(this.logo.concat(" HP PC running..."));
    }
}

class DELLPC extends PC {

    DELLPC(String logo, byte[] bs) {
        super(logo, bs);
    }

    @Override
    void run() {
        System.out.println(this.logo.concat(" DELL PC running..."));
    }
}

public class Main {

    public static void main(String[] args) throws CloneNotSupportedException {
        long l = System.currentTimeMillis();
        PC hpPC;
        hpPC = new HPPC("HP", new byte[100000]);
        for (int i = 0; i < 10000000; i++) {
            PC cloneHPPC = hpPC.clone();
            cloneHPPC.run();
        }
        System.out.println(System.currentTimeMillis() - l);

        l = System.currentTimeMillis();
        for (int i = 0; i < 10000000; i++) {
            hpPC = new HPPC("HP", new byte[100000]);
        }
        System.out.println(System.currentTimeMillis() - l);

        PC dellPC = new DELLPC("DELL");
        PC cloneDELLPC = dellPC.clone();
        cloneDELLPC.run();
    }
}
···
