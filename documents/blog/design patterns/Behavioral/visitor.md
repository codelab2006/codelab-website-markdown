# 访问者模式（Visito pattern）
> author: Yongjian Huang
> tags: 设计模式-行为型模式

**********
被访问者 accept 之后，访问者才能访问（处理）被访问者。因此控制权交由被访问者。
```
package top.codelab.main;

import java.util.ArrayList;
import java.util.List;

interface Department {

    void visit(FullTimeEmployee employee);

    void visit(PartTimeEmployee employee);
}

class FinanceDepartment implements Department {

    @Override
    public void visit(FullTimeEmployee employee) {
        System.out.println("FinanceDepartment handle FullTimeEmployee employee " + employee.getName());
    }

    @Override
    public void visit(PartTimeEmployee employee) {
        System.out.println("FinanceDepartment handle PartTimeEmployee employee " + employee.getName());
    }
}

class HRDepartment implements Department {

    @Override
    public void visit(FullTimeEmployee employee) {
        System.out.println("HRDepartment handle FullTimeEmployee employee " + employee.getName());
    }

    @Override
    public void visit(PartTimeEmployee employee) {
        System.out.println("HRDepartment handle PartTimeEmployee employee " + employee.getName());
    }
}

interface Employee {
    void accept(Department handler);
}

class FullTimeEmployee implements Employee {

    private String name;

    FullTimeEmployee(String name) {
        this.name = name;
    }

    String getName() {
        return this.name;
    }

    @Override
    public void accept(Department handler) {
        handler.visit(this);
    }
}

class PartTimeEmployee implements Employee {

    private String name;

    PartTimeEmployee(String name) {
        this.name = name;
    }

    String getName() {
        return this.name;
    }

    @Override
    public void accept(Department handler) {
        handler.visit(this);
    }
}

public class Main {

    public static void main(String[] args) {
        Department financeDepartment = new FinanceDepartment();
        Department HRDepartment = new HRDepartment();

        List<Employee> employeeList = new ArrayList<>();
        employeeList.add(new FullTimeEmployee("Full E 1"));
        employeeList.add(new FullTimeEmployee("Full E 2"));
        employeeList.add(new PartTimeEmployee("Part E 1"));
        employeeList.add(new PartTimeEmployee("Part E 2"));

        employeeList.forEach(e -> {
            e.accept(financeDepartment);
            e.accept(HRDepartment);
        });
    }
}
```
