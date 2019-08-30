package com.tunan.controller;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.tunan.common.HttpClientUtil;
import com.tunan.domain.User;
import com.tunan.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
public class LoginController {

    @Autowired
    private UserService userService;

    @GetMapping("/hello")
    public String hello(){
        return "Hello";
    }

    @RequestMapping("/findByOpenid")
    public User findByOpenid(String openid){
        return userService.findByOpenid(openid);
    }

    @PostMapping("/wxLogin")
    public User wxLogin(String code){
        System.out.println("code" + code);
        //发送请求获取OpenId
        String url = "https://api.weixin.qq.com/sns/jscode2session";
        Map<String,String> params = new HashMap<String, String>();
        params.put("appid","wx8742a46add146dbd");
        params.put("secret","a5e527a6af7bfda61f6cd7591f148176");
        params.put("js_code",code);
        params.put("grant_type","authorization_code");
        String res = HttpClientUtil.doGet(url,params);
        System.out.println(res);

        //使用Json解析获取OpenID
        JsonParser jsonParser = new JsonParser();
        JsonObject json = jsonParser.parse(res).getAsJsonObject();
        String openid = json.get("openid").getAsString();

        //根据OpenID，查找相应用户
        User user = userService.findByOpenid(openid);
        if (user == null){   //数据库中不存在相应教师，表明新用户
            user = new User();
            user.setOpenid(openid);
            userService.addUser(user);
            return user;
        }else {
            return user;
        }
    }
}
