package com.tunan.service;

import com.tunan.dao.UserDao;
import com.tunan.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service(value = "UserService")
public class UserServiceImpl implements UserService {
    @Autowired
    private UserDao userDao;

    @Override
    public void addUser(User user) {
        userDao.addUser(user);
    }

    @Override
    public User findByOpenid(String openid){
        return userDao.findByOpenid(openid);
    }
}
