# 解释器模式（Interpreter pattern）
> author: Yongjian Huang
> tags: 设计模式-行为型模式

解释器模式，给定一个语言，定义它的文法表示，并定义一个解释器，这个解释器使用该标识来解释语言中的句子。
**********
```
package top.codelab.main;

import java.util.ArrayDeque;
import java.util.HashMap;
import java.util.Map;

public class Main {

    @FunctionalInterface
    public interface Expr {

        int interpret(Map<String, Integer> context);

        static Expr plus(Expr left, Expr right) {
            return context -> left.interpret(context) + right.interpret(context);
        }

        static Expr minus(Expr left, Expr right) {
            return context -> left.interpret(context) - right.interpret(context);
        }

        static Expr variable(String name) {
            return context -> context.getOrDefault(name, 0);
        }
    }

    private static Expr parseToken(String token, ArrayDeque<Expr> stack) {
        Expr left, right;
        switch (token) {
            case "+":
                // it's necessary to remove first the right operand from the stack
                right = stack.pop();
                // ..and then the left one
                left = stack.pop();
                return Expr.plus(left, right);
            case "-":
                right = stack.pop();
                left = stack.pop();
                return Expr.minus(left, right);
            default:
                return Expr.variable(token);
        }
    }

    private static Expr parse(String expression) {
        ArrayDeque<Expr> stack = new ArrayDeque<>();
        for (String token : expression.split(" ")) {
            stack.push(parseToken(token, stack));
        }
        return stack.pop();
    }

    public static void main(final String[] args) {
        Expr expr = parse("w x z - +");
        Map<String, Integer> context = new HashMap<>();
        context.put("w", 5);
        context.put("x", 10);
        context.put("z", 42);
        int result = expr.interpret(context);
        System.out.println(result);

        expr = parse("a b c + -");
        context.clear();
        context.put("a", 5);
        context.put("b", 10);
        context.put("c", 42);
        result = expr.interpret(context);
        System.out.println(result);
    }
}
```
