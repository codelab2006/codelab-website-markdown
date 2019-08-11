package top.codelab.spring.core;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import top.codelab.spring.core.service.UserService;

public class Application {

    public static void main(String[] args) {
        ApplicationContext context = new ClassPathXmlApplicationContext("services.xml");
        System.out.println(context.getBean("userService", UserService.class).findUsers());

        CommandManager cm = context.getBean("commandManager", CommandManager.class);
        cm.process();
        cm.process();

        EventHandler eh = context.getBean("eventHandler", EventHandler.class);
        eh.handle();
        eh.handle();
    }
}
