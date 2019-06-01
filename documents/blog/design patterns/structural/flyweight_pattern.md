# 享元模式（Flyweight pattern）
> author: Yongjian Huang
> tags: 设计模式, Structural

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
    private int radius;

    public Circle(String color) {
        this.color = color;
    }

    public void setX(int x) {
        this.x = x;
    }

    public void setY(int y) {
        this.y = y;
    }

    public void setRadius(int radius) {
        this.radius = radius;
    }


    @Override
    public void draw() {
        System.out.println("Circle: Draw() [Color : " + this.color
                + ", x : " + this.x + ", y :" + this.y + ", radius :" + this.radius);
    }
}

class Factory {
    private static Map<String, Shape> map = new HashMap<>();

    public static Shape getCircle(String color) {
        return map.computeIfAbsent(color, k -> new Circle(color));
    }
}

public class Main {

    private static String[] colors = {"Red", "Green", "Blue", "White", "Black"};

    public static void main(String[] args) {
        for (int i = 0; i < 20; ++i) {
            Circle circle =
                    (Circle) Factory.getCircle(getRandomColor());
            circle.setX(getRandomX());
            circle.setY(getRandomY());
            circle.setRadius(100);
            circle.draw();
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
