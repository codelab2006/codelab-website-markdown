# 装饰器模式（Decorator pattern）
> author: Yongjian Huang
> tags: 设计模式, 结构型模式

文章摘要
*********
装饰器模式和代理模式的区别：装
- 饰器模式，用户需要自己构建被装饰的对象，然后传递给装饰器对象。
- 代理模式，用户不需要自己创建被代理的对象。代理对象会自动创建它。
```
package top.codelab.main;

interface Weapon {
    int getDamage();
}

class Arrow implements Weapon {

    public int getDamage() {
        return 10;
    }
}

class Javelin implements Weapon {

    public int getDamage() {
        return 20;
    }
}

abstract class WeaponDecorator implements Weapon {
    private Weapon weapon;

    WeaponDecorator(Weapon weapon) {
        this.weapon = weapon;
    }

    public int getDamage() {
        return this.weapon.getDamage();
    }
}

class FireWeapon extends WeaponDecorator {

    FireWeapon(Weapon weapon) {
        super(weapon);
    }

    @Override
    public int getDamage() {
        return (int) (super.getDamage() * 2.0);
    }
}

class IceWeapon extends WeaponDecorator {

    IceWeapon(Weapon weapon) {
        super(weapon);
    }

    @Override
    public int getDamage() {
        return (int) (super.getDamage() * 1.5);
    }
}

public class Main {

    public static void main(String[] args) {
        Arrow arrow = new Arrow();
        Weapon fireArrow = new FireWeapon(arrow);
        Weapon iceArrow = new IceWeapon(arrow);

        Javelin javelin = new Javelin();
        Weapon fireJavelin = new FireWeapon(javelin);
        Weapon iceJavelin = new IceWeapon(javelin);

        System.out.println(fireArrow.getDamage());
        System.out.println(iceArrow.getDamage());
        System.out.println(fireJavelin.getDamage());
        System.out.println(iceJavelin.getDamage());
    }
}
```
