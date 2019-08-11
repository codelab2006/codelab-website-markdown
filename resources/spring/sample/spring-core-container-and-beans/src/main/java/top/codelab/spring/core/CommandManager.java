package top.codelab.spring.core;

public abstract class CommandManager {

    void process() {
        Command command = this.createCommand();
        command.execute();
    }

    abstract Command createCommand();
}
