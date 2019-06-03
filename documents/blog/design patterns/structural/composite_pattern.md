# 组合模式（Composite pattern）
> author: Yongjian Huang
> tags: 设计模式, 结构型模式

文章摘要
**********
```
package top.codelab.main;

import java.util.ArrayList;

interface Graphic {
    void print();
}

class CompositeGraphic implements Graphic {

    private ArrayList<Graphic> childGraphics = new ArrayList<>();

    void add(Graphic graphic) {
        this.childGraphics.add(graphic);
    }

    @Override
    public void print() {
        for (Graphic graphic : this.childGraphics) {
            graphic.print();
        }
    }
}

class Ellipse implements Graphic {

    @Override
    public void print() {
        System.out.println("Ellipse");
    }
}

public class Main {

    public static void main(String[] args) {
        Ellipse ellipse1 = new Ellipse();
        Ellipse ellipse2 = new Ellipse();
        Ellipse ellipse3 = new Ellipse();
        Ellipse ellipse4 = new Ellipse();

        CompositeGraphic graphic1 = new CompositeGraphic();
        graphic1.add(ellipse1);
        graphic1.add(ellipse2);

        CompositeGraphic graphic2 = new CompositeGraphic();
        graphic2.add(ellipse3);
        graphic2.add(ellipse4);

        CompositeGraphic graphic3 = new CompositeGraphic();
        graphic3.add(graphic1);
        graphic3.add(graphic2);

        graphic3.print();
    }
}
```
