package com.tunan.service;

import com.tunan.domain.User;

public interface UserService {
    public void addUser(User user);
    public User findByOpenid(String openid);
}
