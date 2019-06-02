# 原型模式（Prototype pattern）
> author: Yongjian Huang
> tags: 设计模式, 创建型模式

文章摘要
**********
```
package top.codelab.main;

abstract class PC implements Cloneable {

    String logo;

    PC(String logo) {
        this.logo = logo;
    }

    abstract void run();

    @Override
    public PC clone() throws CloneNotSupportedException {
        return (PC) super.clone();
    }
}

class HPPC extends PC {

    HPPC(String logo) {
        super(logo);
    }

    @Override
    void run() {
        System.out.println(this.logo.concat(" HP PC running..."));
    }
}

class DELLPC extends PC {

    DELLPC(String logo) {
        super(logo);
    }

    @Override
    void run() {
        System.out.println(this.logo.concat(" DELL PC running..."));
    }
}

public class Main {

    public static void main(String[] args) throws CloneNotSupportedException {
        PC hpPC = new HPPC("HP");
        PC cloneHPPC = hpPC.clone();
        cloneHPPC.run();

        PC dellPC = new DELLPC("DELL");
        PC cloneDELLPC = dellPC.clone();
        cloneDELLPC.run();
    }
}
···
