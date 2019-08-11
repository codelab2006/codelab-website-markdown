package top.codelab.spring.core.dao.impl;

import top.codelab.spring.core.dao.UserDao;
import top.codelab.spring.core.model.User;

import java.util.Arrays;
import java.util.List;

public class UserDaoImpl implements UserDao {

    @Override
    public List<User> selectUsers() {
        return Arrays.asList(new User("user-1"), new User("user-2"));
    }
}
