# 享元模式（Flyweight pattern）
> author: Yongjian Huang
> tags: 设计模式, 结构型模式

文章摘要
*********
```
package top.codelab.main;

import java.util.HashMap;
import java.util.Map;

interface Shape {
    void draw();
}

class Circle implements Shape {
    private String color;
    private int x;
    private int y;

    Circle(String color) {
        this.color = color;
    }

    Circle setX(int x) {
        this.x = x;
        return this;
    }

    Circle setY(int y) {
        this.y = y;
        return this;
    }

    @Override
    public void draw() {
        int radius = 100;
        System.out.println("Circle: Draw() [Color : " + this.color
                + ", x : " + this.x + ", y :" + this.y + ", radius :" + radius);
    }
}

class Factory {
    private static Map<String, Shape> map = new HashMap<>();

    static Shape getCircle(String color) {
        return map.computeIfAbsent(color, k -> new Circle(color));
    }
}

public class Main {

    private static String[] colors = {"Red", "Green", "Blue", "White", "Black"};

    public static void main(String[] args) {
        for (int i = 0; i < 20; ++i) {
            Shape c = ((Circle) Factory.getCircle(getRandomColor())).setX(getRandomX()).setY(getRandomY());
            c.draw();
        }
    }

    private static String getRandomColor() {
        return colors[(int) (Math.random() * colors.length)];
    }

    private static int getRandomX() {
        return (int) (Math.random() * 100);
    }

    private static int getRandomY() {
        return (int) (Math.random() * 100);
    }
}
```
