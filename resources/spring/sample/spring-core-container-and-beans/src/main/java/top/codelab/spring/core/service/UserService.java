package top.codelab.spring.core.service;

import top.codelab.spring.core.model.User;

import java.util.List;

public interface UserService {
    List<User> findUsers();
}
