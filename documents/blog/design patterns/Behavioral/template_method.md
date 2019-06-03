# 模板方法模式（Template method pattern）
> author: Yongjian Huang
> tags: 设计模式-行为型模式

文章摘要
**********
```
package top.codelab.main;

abstract class Game {

    abstract void initialize();

    abstract void startPlay();

    abstract void endPlay();

    public final void play() {
        initialize();
        startPlay();
        endPlay();
    }
}

class Cricket extends Game {

    @Override
    void endPlay() {
        System.out.println("Cricket Game Finished!");
    }

    @Override
    void initialize() {
        System.out.println("Cricket Game Initialized! Start playing.");
    }

    @Override
    void startPlay() {
        System.out.println("Cricket Game Started. Enjoy the game!");
    }
}

class Football extends Game {

    @Override
    void endPlay() {
        System.out.println("Football Game Finished!");
    }

    @Override
    void initialize() {
        System.out.println("Football Game Initialized! Start playing.");
    }

    @Override
    void startPlay() {
        System.out.println("Football Game Started. Enjoy the game!");
    }
}

public class Main {

    public static void main(String[] args) {
        Game game = new Cricket();
        game.play();
        System.out.println();
        game = new Football();
        game.play();
    }
}
```
