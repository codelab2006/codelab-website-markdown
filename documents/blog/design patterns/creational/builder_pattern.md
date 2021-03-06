# 建造者模式（Builder pattern）
> author: Yongjian Huang
> tags: 设计模式-创建型模式

建造者模式，当一个对象（产品）由多个部分组成时，我们可以把对象的创建过程封装到一个 Builder 中。
可以通过传递到 Builder 的参数变化，来产生不同的产品。
**********
```
package top.codelab.main;

class PC {
    String input;
    String processer;
    String output;

    @Override
    public String toString() {
        return "PC: ".concat(this.input).concat(this.processer).concat(this.output);
    }
}

interface PCBuilder {
    PC build();

    PCBuilder setInput(String input);

    PCBuilder setProcesser(String processer);

    PCBuilder setOutput(String output);
}

class PCBuilderImpl implements PCBuilder {

    private PC model;

    PCBuilderImpl() {
        this.model = new PC();
    }

    @Override
    public PC build() {
        PC pc = new PC();
        pc.input = this.model.input;
        pc.processer = this.model.processer;
        pc.output = this.model.output;
        return pc;
    }

    @Override
    public PCBuilder setInput(String input) {
        this.model.input = input;
        return this;
    }

    @Override
    public PCBuilder setProcesser(String processer) {
        this.model.processer = processer;
        return this;
    }

    @Override
    public PCBuilder setOutput(String output) {
        this.model.output = output;
        return this;
    }
}

class BuilderDirector {
    private PCBuilder pcBuilder;

    BuilderDirector(PCBuilder pcBuilder) {
        this.pcBuilder = pcBuilder;
    }

    PC construct() {
        return this.pcBuilder.setInput("iii").setProcesser("ppp").setOutput("ooo").build();
    }
}

public class Main {

    public static void main(String[] args) {
        PC pc = new BuilderDirector(new PCBuilderImpl()).construct();
        System.out.println(pc);
    }
}
```
