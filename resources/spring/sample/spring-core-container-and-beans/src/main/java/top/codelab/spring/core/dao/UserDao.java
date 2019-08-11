package top.codelab.spring.core.dao;

import top.codelab.spring.core.model.User;

import java.util.List;

public interface UserDao {
    List<User> selectUsers();
}
