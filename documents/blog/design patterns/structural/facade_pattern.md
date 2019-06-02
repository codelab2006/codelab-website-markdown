# 外观模式（Facade pattern）
> author: Yongjian Huang
> tags: 设计模式, 结构型模式

文章摘要
*********
```
package top.codelab.main;

class CPU {
    void execute() {
        System.out.println("CPU execute......");
    }
}

class Memory {
    void read() {
        System.out.println("Memory read......");
    }
}

class HardDrive {
    void read() {
        System.out.println("HardDrive read......");
    }
}

class Computer {
    private CPU cpu;
    private Memory memory;
    private HardDrive hardDrive;

    Computer() {
        this.cpu = new CPU();
        this.memory = new Memory();
        this.hardDrive = new HardDrive();
    }

    void run() {
        this.hardDrive.read();
        this.memory.read();
        this.cpu.execute();
    }
}

public class Main {

    public static void main(String[] args) {
        Computer computer = new Computer();
        computer.run();
    }
}
```
