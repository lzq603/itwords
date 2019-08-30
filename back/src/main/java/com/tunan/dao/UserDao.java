package com.tunan.dao;

import com.tunan.domain.User;

public interface UserDao {
    public void addUser(User user);
    public User findByOpenid(String openid);
}
