# 代理模式（Proxy pattern）
> author: Yongjian Huang
> tags: 设计模式, 结构型模式

文章摘要
**********
装饰器模式和代理模式的区别：
- 装饰器模式，用户需要自己构建被装饰的对象，然后传递给装饰器对象。
- 代理模式，用户不需要自己创建被代理的对象。代理对象会自动创建它。
```
package top.codelab.main;

interface Image {
    void display();
}

class RealImage implements Image {

    private String filename;

    RealImage(String filename) {
        this.filename = filename;
        this.loadImageFromDisk();
    }

    private void loadImageFromDisk() {
        System.out.println("Loading......" + this.filename);
    }

    @Override
    public void display() {
        System.out.println("Displaying......" + this.filename);
    }
}

class ProxyImage implements Image {

    private String filename;
    private RealImage image;

    ProxyImage(String filename) {
        this.filename = filename;

    }

    @Override
    public void display() {
        if (this.image == null) {
            this.image = new RealImage(this.filename);
        }
        this.image.display();
    }
}

public class Main {

    public static void main(String[] args) {
        Image image001 = new ProxyImage("image_filename_001");
        Image image002 = new ProxyImage("image_filename_002");
        image001.display(); // loading necessary
        image001.display(); // loading unnecessary
        image002.display(); // loading necessary
        image002.display(); // loading unnecessary
        image001.display(); // loading unnecessary
    }
}
```
