# 命令模式（Command pattern）
> author: Yongjian Huang
> tags: 设计模式-行为型模式

命令模式，将方法调用封装在对象中，允许我们不知道请求的操作或请求对象的情况下发出请求。
**********
```
package top.codelab.main;

import java.util.HashMap;

interface Command {
    void execute();
}

class Switch {
    private HashMap<String, Command> commandHashMap = new HashMap<>();

    void register(String commandName, Command command) {
        this.commandHashMap.put(commandName, command);
    }

    void execute(String commandName) {
        Command command = this.commandHashMap.get(commandName);
        if (command == null) {
            throw new IllegalStateException("no command registered for " + commandName);
        }
        command.execute();
    }
}

class Light {
    void turnOn() {
        System.out.println("The light is on");
    }

    void turnOff() {
        System.out.println("The light is off");
    }
}

class SwitchOnCommand implements Command {

    private Light light;

    SwitchOnCommand(Light light) {
        this.light = light;
    }

    @Override
    public void execute() {
        this.light.turnOn();
    }
}

class SwitchOffCommand implements Command {

    private Light light;

    SwitchOffCommand(Light light) {
        this.light = light;
    }

    @Override
    public void execute() {
        this.light.turnOff();
    }
}

public class Main {

    public static void main(String[] args) {
        Light light = new Light();

        Command on = new SwitchOnCommand(light);
        Command off = new SwitchOffCommand(light);

        Switch s = new Switch();
        s.register("on", on);
        s.register("off", off);

        s.execute("on");
        s.execute("off");
    }
}
```
