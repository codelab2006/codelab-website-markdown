package top.codelab.spring.core;

public class EventHandler {

    private PrototypeEvent prototypeEvent;
    private SingletonEvent singletonEvent;

    public void setPrototypeEvent(PrototypeEvent prototypeEvent) {
        this.prototypeEvent = prototypeEvent;
    }

    public void setSingletonEvent(SingletonEvent singletonEvent) {
        this.singletonEvent = singletonEvent;
    }

    void handle() {
        System.out.println(this.prototypeEvent);
        System.out.println(this.singletonEvent);
    }
}
