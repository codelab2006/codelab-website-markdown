# 装饰器模式（Decorator pattern）
> author: Yongjian Huang
> tags: 设计模式, Structural

文章摘要
*********
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

    public WeaponDecorator(Weapon weapon) {
        this.weapon = weapon;
    }

    public int getDamage() {
        return this.weapon.getDamage();
    }
}

class FireWeapon extends WeaponDecorator {

    public FireWeapon(Weapon weapon) {
        super(weapon);
    }

    @Override
    public int getDamage() {
        return (int) (super.getDamage() * 2.0);
    }
}

class IceWeapon extends WeaponDecorator {

    public IceWeapon(Weapon weapon) {
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
