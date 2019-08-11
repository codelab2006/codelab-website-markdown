package top.codelab.spring.core.service.impl;

import top.codelab.spring.core.dao.UserDao;
import top.codelab.spring.core.model.User;
import top.codelab.spring.core.service.UserService;

import java.util.List;

public class UserServiceImpl implements UserService {

    private UserDao userDao;

    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }

    @Override
    public List<User> findUsers() {
        return this.userDao.selectUsers();
    }
}
