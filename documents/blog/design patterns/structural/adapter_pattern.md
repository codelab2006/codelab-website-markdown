# 适配器模式（Adapter pattern）
> author: Yongjian Huang
> tags: 设计模式, 结构型模式

文章摘要
**********
```
package top.codelab.main;

interface LightningPhone {
    void recharge();

    void useLightning();
}

interface MicroUsbPhone {
    void recharge();

    void useMicroUsb();
}

class Iphone implements LightningPhone {
    private boolean connector;

    @Override
    public void useLightning() {
        this.connector = true;
        System.out.println("Lightning connected");
    }

    @Override
    public void recharge() {
        if (this.connector) {
            System.out.println("Recharge started");
            System.out.println("Recharge finished");
        } else {
            System.out.println("Connect Lightning first");
        }
    }
}

class Android implements MicroUsbPhone {
    private boolean connector;

    @Override
    public void useMicroUsb() {
        this.connector = true;
        System.out.println("MicroUsb connected");
    }

    @Override
    public void recharge() {
        if (this.connector) {
            System.out.println("Recharge started");
            System.out.println("Recharge finished");
        } else {
            System.out.println("Connect MicroUsb first");
        }
    }
}

class LightningToMicroUsbAdapter implements MicroUsbPhone {

    private LightningPhone lightningPhone;

    public LightningToMicroUsbAdapter(LightningPhone lightningPhone) {
        this.lightningPhone = lightningPhone;
    }

    @Override
    public void recharge() {
        System.out.println("MicroUsb connected");
        this.lightningPhone.useLightning();
    }

    @Override
    public void useMicroUsb() {
        this.lightningPhone.recharge();
    }
}

public class Main {

    static void rechargeMicroUsbPhone(MicroUsbPhone phone) {
        phone.useMicroUsb();
        phone.recharge();
    }

    static void rechargeLightningPhone(LightningPhone phone) {
        phone.useLightning();
        phone.recharge();
    }

    public static void main(String[] args) {
        Android android = new Android();
        Iphone iPhone = new Iphone();

        System.out.println("Recharging android with MicroUsb");
        rechargeMicroUsbPhone(android);

        System.out.println("Recharging iPhone with Lightning");
        rechargeLightningPhone(iPhone);

        System.out.println("Recharging iPhone with MicroUsb");
        rechargeMicroUsbPhone(new LightningToMicroUsbAdapter(iPhone));
    }
}
···
